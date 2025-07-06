import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  avatar?: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  community: string;
  timestamp: string;
  tags: string[];
  isHot?: boolean;
  points?: number;
}

export const useTweets = (community: string = 'all') => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [interactions, setInteractions] = useState<Record<string, { liked: boolean; commented: boolean; shared: boolean }>>({});

  const fetchTweets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('get-tweets', {
        body: { community }
      });

      if (error) {
        console.error('Error fetching tweets:', error);
        return;
      }

      setTweets(data.tweets || []);
    } catch (error) {
      console.error('Error fetching tweets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInteraction = async (tweetId: string, type: 'like' | 'comment' | 'share') => {
    try {
      const currentInteractions = interactions[tweetId] || { liked: false, commented: false, shared: false };
      const interactionKey = type === 'like' ? 'liked' : type === 'comment' ? 'commented' : 'shared';
      
      // Prevent duplicate interactions
      if (currentInteractions[interactionKey]) {
        return;
      }

      const { data, error } = await supabase.functions.invoke('interact-tweet', {
        body: {
          tweet_id: tweetId,
          interaction_type: type
        }
      });

      if (error) {
        console.error('Error recording interaction:', error);
        return;
      }

      // Update local interactions state
      setInteractions(prev => ({
        ...prev,
        [tweetId]: {
          ...currentInteractions,
          [interactionKey]: true
        }
      }));

      // Update tweet counts locally
      if (data.updated_counts) {
        setTweets(prev => prev.map(tweet => 
          tweet.id === tweetId 
            ? {
                ...tweet,
                likes: data.updated_counts.likes_count,
                comments: data.updated_counts.comments_count,
                shares: data.updated_counts.shares_count
              }
            : tweet
        ));
      }

      // Show success message
      if (data.message) {
        // You could add a toast notification here
        console.log(data.message);
      }

    } catch (error) {
      console.error('Error handling interaction:', error);
    }
  };

  const submitTweet = async (content: string, community: string, tags: string[]) => {
    try {
      const { data, error } = await supabase.functions.invoke('submit-tweet', {
        body: {
          content,
          community,
          tags
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to submit tweet');
      }

      // Refresh tweets after successful submission
      await fetchTweets();
      
      return { success: true, message: data.message };
    } catch (error: any) {
      console.error('Error submitting tweet:', error);
      throw new Error(error.message || 'Failed to submit tweet');
    }
  };

  useEffect(() => {
    fetchTweets();
  }, [community]);

  return {
    tweets,
    loading,
    interactions,
    handleInteraction,
    submitTweet,
    refreshTweets: fetchTweets
  };
};