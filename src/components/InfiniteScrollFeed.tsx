
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share, MoreHorizontal, Star, Flame, Loader2, ExternalLink } from "lucide-react";
import { useTweets } from "@/hooks/useTweets";
import { useAuth } from "@/hooks/useAuth";

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

interface InfiniteScrollFeedProps {
  community: string;
  searchTerm?: string;
}

export const InfiniteScrollFeed = ({ community, searchTerm }: InfiniteScrollFeedProps) => {
  const [page, setPage] = useState(1);
  const [allTweets, setAllTweets] = useState<Tweet[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);
  
  const { tweets, loading, interactions, handleInteraction } = useTweets(community);
  const { user } = useAuth();

  // Initialize tweets on first load
  useEffect(() => {
    if (tweets.length > 0 && page === 1) {
      setAllTweets(tweets);
    }
  }, [tweets, page]);

  // Infinite scroll logic
  const loadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) return;
    
    setIsLoadingMore(true);
    
    // Simulate API call with pagination
    try {
      // In a real app, this would be an API call with pagination
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, just duplicate existing tweets with new IDs
      const newTweets = tweets.map((tweet, index) => ({
        ...tweet,
        id: `${tweet.id}-page${page}-${index}`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        shares: Math.floor(Math.random() * 50),
      }));
      
      if (newTweets.length > 0) {
        setAllTweets(prev => [...prev, ...newTweets]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
      
      // Stop loading after 3 pages for demo
      if (page >= 3) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more tweets:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, page, tweets]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoadingMore && !loading) {
          loadMore();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loadMore, hasMore, isLoadingMore, loading]);

  // Filter tweets by search term
  const filteredTweets = searchTerm 
    ? allTweets.filter(tweet => 
        tweet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tweet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : allTweets;

  // Helper function to check if content is a Twitter URL
  const isTwitterUrl = (content: string) => {
    const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/;
    return twitterRegex.test(content);
  };

  // Helper function to generate mock tweet content from URL
  const generateMockTweetContent = (url: string) => {
    const match = url.match(/\/(\w+)\/status\/(\d+)/);
    if (!match) return null;
    
    const username = match[1];
    const tweetId = match[2];
    
    // Generate mock content based on common crypto tweet patterns
    const mockContents = [
      "🚀 Major update coming to the DeFi space! This could be a game changer for the entire ecosystem. What are your thoughts? #DeFi #Crypto",
      "💡 Just discovered an incredible alpha opportunity that could 10x your portfolio. The fundamentals look absolutely solid! #Alpha #CryptoGems", 
      "📊 Market analysis shows we're at a critical support level. This could be the perfect entry point for long-term holders. #TechnicalAnalysis",
      "🔥 Breaking: New partnership announcement that could revolutionize how we think about blockchain technology! #Blockchain #Innovation",
      "⚡ InfoFi is the future! Real-time data monetization is going to change everything. Early adopters will be rewarded. #InfoFi #Web3"
    ];
    
    // Use tweet ID to consistently pick the same mock content
    const contentIndex = parseInt(tweetId.slice(-1)) % mockContents.length;
    return {
      content: mockContents[contentIndex],
      originalUrl: url,
      username: username
    };
  };

  if (loading && page === 1) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading tweets...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTweets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {searchTerm ? `No tweets found for "${searchTerm}"` : 'No tweets found'}
          </p>
        </div>
      ) : (
        <>
          {filteredTweets.map((tweet) => {
            const tweetInteractions = interactions[tweet.id] || { liked: false, commented: false, shared: false };
            const isUrl = isTwitterUrl(tweet.content);
            
            return (
              <Card key={tweet.id} className="p-4 animate-fade-in hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex space-x-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                      {tweet.avatar ? (
                        <img 
                          src={tweet.avatar} 
                          alt={`${tweet.author} avatar`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span className="text-sm font-semibold">
                          {tweet.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 min-w-0">
                          <span className="font-semibold truncate">{tweet.author}</span>
                          <span className="text-muted-foreground text-sm truncate">{tweet.handle}</span>
                          <span className="text-muted-foreground text-sm">•</span>
                          <span className="text-muted-foreground text-sm flex-shrink-0">{tweet.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                            {tweet.community}
                          </Badge>
                          {tweet.isHot && (
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-500">
                              <Flame className="w-3 h-3 mr-1" />
                              Hot
                            </Badge>
                          )}
                          {tweet.points && (
                            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                              <Star className="w-3 h-3 mr-1" />
                              {tweet.points}pts
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content */}
                      {isUrl ? (
                        <div className="mb-3">
                          {(() => {
                            const mockTweet = generateMockTweetContent(tweet.content);
                            return mockTweet ? (
                              <div className="space-y-3">
                                <p className="text-sm leading-relaxed">{mockTweet.content}</p>
                                <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
                                  <div className="flex items-center space-x-2">
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                    <span className="text-xs text-muted-foreground">
                                      Original tweet from @{mockTweet.username}
                                    </span>
                                  </div>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => window.open(tweet.content, '_blank')}
                                  >
                                    View Original
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="text-sm mb-3 leading-relaxed">{tweet.content}</p>
                            );
                          })()}
                        </div>
                      ) : (
                        <p className="text-sm mb-3 leading-relaxed">{tweet.content}</p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {tweet.tags.map((tag, index) => (
                          <span key={index} className="text-primary text-sm hover:underline cursor-pointer">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Engagement Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-pink-500 transition-colors ${tweetInteractions.liked ? 'text-pink-500' : ''}`}
                            onClick={() => {
                              handleInteraction(tweet.id, 'like');
                            }}
                            aria-label={`${tweetInteractions.liked ? 'Unlike' : 'Like'} tweet by ${tweet.author}`}
                          >
                            <Heart className={`w-4 h-4 mr-1 transition-all ${tweetInteractions.liked ? 'fill-current scale-110' : ''}`} />
                            {tweet.likes.toLocaleString()}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-blue-500 transition-colors ${tweetInteractions.commented ? 'text-blue-500' : ''}`}
                            onClick={() => {
                              handleInteraction(tweet.id, 'comment');
                            }}
                            aria-label={`Comment on tweet by ${tweet.author}`}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {tweet.comments.toLocaleString()}
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`text-muted-foreground hover:text-green-500 transition-colors ${tweetInteractions.shared ? 'text-green-500' : ''}`}
                            onClick={() => {
                              handleInteraction(tweet.id, 'share');
                            }}
                            aria-label={`Share tweet by ${tweet.author}`}
                          >
                            <Share className="w-4 h-4 mr-1" />
                            {tweet.shares.toLocaleString()}
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span>+{tweet.points}pts per action</span>
                          {isUrl && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="text-xs h-auto p-0"
                              onClick={() => window.open(tweet.content, '_blank')}
                            >
                              View on X
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          
          {/* Loading indicator for infinite scroll */}
          {isLoadingMore && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading more tweets...</span>
            </div>
          )}
          
          {/* Intersection observer target */}
          <div ref={observerRef} className="h-4" />
          
          {/* End of feed indicator */}
          {!hasMore && filteredTweets.length > 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <p className="text-sm">You've reached the end of the feed!</p>
              <p className="text-xs">Check back later for new content.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
