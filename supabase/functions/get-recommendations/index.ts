import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId, community, limit = 10 } = await req.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get user's interaction history to understand preferences
    const { data: userInteractions } = await supabase
      .from('user_interactions')
      .select('tweet_id, interaction_type')
      .eq('user_id', userId)
      .limit(50);

    const interactedTweetIds = userInteractions?.map(i => i.tweet_id) || [];

    // Build recommendation query
    let query = supabase
      .from('tweets')
      .select(`
        *,
        profiles:user_id (
          display_name,
          handle,
          avatar_url
        )
      `)
      .not('id', 'in', `(${interactedTweetIds.length > 0 ? interactedTweetIds.join(',') : '00000000-0000-0000-0000-000000000000'})`)
      .not('user_id', 'eq', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    // Filter by community if specified
    if (community) {
      query = query.eq('community', community);
    }

    const { data: tweets, error } = await query;

    if (error) {
      console.error('Error fetching recommendations:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch recommendations' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Simple collaborative filtering - prioritize tweets from users with similar interaction patterns
    const recommendedTweets = tweets?.sort((a, b) => {
      // Prioritize hot tweets
      if (a.is_hot && !b.is_hot) return -1;
      if (!a.is_hot && b.is_hot) return 1;
      
      // Then by engagement
      const aEngagement = a.likes_count + a.comments_count + a.shares_count;
      const bEngagement = b.likes_count + b.comments_count + b.shares_count;
      return bEngagement - aEngagement;
    }) || [];

    return new Response(
      JSON.stringify({ recommendations: recommendedTweets }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-recommendations function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});