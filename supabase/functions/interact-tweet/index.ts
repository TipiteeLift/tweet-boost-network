import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

interface InteractionRequest {
  tweet_id: string;
  interaction_type: 'like' | 'comment' | 'share';
}

const INTERACTION_POINTS = {
  like: 1,
  comment: 2,
  share: 3
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { tweet_id, interaction_type }: InteractionRequest = await req.json()

    // Validate input
    if (!tweet_id || !interaction_type) {
      return new Response(
        JSON.stringify({ error: 'Tweet ID and interaction type are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!['like', 'comment', 'share'].includes(interaction_type)) {
      return new Response(
        JSON.stringify({ error: 'Invalid interaction type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user already interacted with this tweet in this way
    const { data: existingInteraction } = await supabaseClient
      .from('user_interactions')
      .select('id')
      .eq('user_id', user.id)
      .eq('tweet_id', tweet_id)
      .eq('interaction_type', interaction_type)
      .single()

    if (existingInteraction) {
      return new Response(
        JSON.stringify({ error: 'You have already performed this interaction on this tweet' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert the interaction (this will trigger the database function to update counts and points)
    const { data: interaction, error: interactionError } = await supabaseClient
      .from('user_interactions')
      .insert({
        user_id: user.id,
        tweet_id: tweet_id,
        interaction_type: interaction_type,
        points_earned: INTERACTION_POINTS[interaction_type]
      })
      .select()
      .single()

    if (interactionError) {
      return new Response(
        JSON.stringify({ error: 'Failed to record interaction', details: interactionError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get updated tweet data
    const { data: updatedTweet, error: tweetError } = await supabaseClient
      .from('tweets')
      .select('likes_count, comments_count, shares_count')
      .eq('id', tweet_id)
      .single()

    if (tweetError) {
      console.error('Failed to fetch updated tweet data:', tweetError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        interaction: interaction,
        updated_counts: updatedTweet,
        points_earned: INTERACTION_POINTS[interaction_type],
        message: `${interaction_type} recorded! You earned ${INTERACTION_POINTS[interaction_type]} points.`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in interact-tweet function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})