import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

interface TweetRequest {
  content: string;
  community: string;
  tags: string[];
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

    const { content, community, tags }: TweetRequest = await req.json()

    // Validate input
    if (!content || !community) {
      return new Response(
        JSON.stringify({ error: 'Content and community are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (content.length > 280) {
      return new Response(
        JSON.stringify({ error: 'Tweet content must be 280 characters or less' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Check if user has enough points (10 points required)
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('points')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile || profile.points < 10) {
      return new Response(
        JSON.stringify({ error: 'Insufficient points. 10 points required to submit tweet.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Insert the tweet
    const { data: tweet, error: tweetError } = await supabaseClient
      .from('tweets')
      .insert({
        user_id: user.id,
        content: content,
        community: community,
        tags: tags || [],
        points_value: Math.floor(Math.random() * 3) + 3, // Random points between 3-5
      })
      .select()
      .single()

    if (tweetError) {
      return new Response(
        JSON.stringify({ error: 'Failed to submit tweet', details: tweetError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Deduct points from user
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ points: profile.points - 10 })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Failed to update user points:', updateError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        tweet: tweet,
        message: 'Tweet submitted successfully! You earned engagement points.' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in submit-tweet function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})