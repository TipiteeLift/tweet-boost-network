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
    const url = new URL(req.url);
    const timeframe = url.searchParams.get('timeframe') || 'all-time'; // daily, weekly, all-time
    const community = url.searchParams.get('community');
    const limit = parseInt(url.searchParams.get('limit') || '10');

    let startDate: string | null = null;
    const now = new Date();

    // Calculate start date based on timeframe
    switch (timeframe) {
      case 'daily':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
        break;
      case 'weekly':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
        break;
      default:
        startDate = null; // all-time
    }

    let query;

    if (timeframe === 'all-time') {
      // For all-time, use the points directly from profiles
      query = supabase
        .from('profiles')
        .select('display_name, handle, avatar_url, points, level')
        .order('points', { ascending: false })
        .limit(limit);
    } else {
      // For time-based leaderboards, calculate points from interactions
      let interactionsQuery = supabase
        .from('user_interactions')
        .select(`
          user_id,
          points_earned,
          profiles:user_id (
            display_name,
            handle,
            avatar_url,
            level
          )
        `)
        .order('created_at', { ascending: false });

      if (startDate) {
        interactionsQuery = interactionsQuery.gte('created_at', startDate);
      }

      if (community) {
        // Filter by community through tweets
        interactionsQuery = interactionsQuery
          .select(`
            user_id,
            points_earned,
            profiles:user_id (
              display_name,
              handle,
              avatar_url,
              level
            ),
            tweets:tweet_id (
              community
            )
          `)
          .eq('tweets.community', community);
      }

      const { data: interactions, error: interactionsError } = await interactionsQuery;

      if (interactionsError) {
        console.error('Error fetching interactions:', interactionsError);
        return new Response(
          JSON.stringify({ error: 'Failed to fetch leaderboard data' }),
          { 
            status: 500, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }

      // Aggregate points by user
      const userPoints = new Map();
      interactions?.forEach(interaction => {
        const userId = interaction.user_id;
        const currentPoints = userPoints.get(userId) || 0;
        userPoints.set(userId, currentPoints + interaction.points_earned);
      });

      // Create leaderboard entries
      const leaderboardData = Array.from(userPoints.entries())
        .map(([userId, points]) => {
          const interaction = interactions?.find(i => i.user_id === userId);
          return {
            user_id: userId,
            points,
            ...interaction?.profiles
          };
        })
        .sort((a, b) => b.points - a.points)
        .slice(0, limit);

      return new Response(
        JSON.stringify({ 
          leaderboard: leaderboardData,
          timeframe,
          community 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { data: profiles, error } = await query;

    if (error) {
      console.error('Error fetching leaderboard:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch leaderboard data' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        leaderboard: profiles,
        timeframe,
        community 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-leaderboards function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});