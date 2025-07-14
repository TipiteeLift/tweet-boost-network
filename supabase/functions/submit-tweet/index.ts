
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

interface TweetRequest {
  content: string;
  community: string;
  tags: string[];
  periodHours?: number;
  preferredInteractions?: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('=== Submit Tweet Function Started ===')
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    console.log('Supabase client created')

    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    console.log('User check:', user ? `User found: ${user.id}` : 'No user', userError)

    if (userError || !user) {
      console.log('Unauthorized access attempt')
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const requestBody = await req.json()
    console.log('Request body:', requestBody)
    
    const { content, community, tags, periodHours = 24, preferredInteractions = ['like'] }: TweetRequest = requestBody

    console.log('Parsed values:', { content, community, tags, periodHours, preferredInteractions })

    // Validate input - content is now a Twitter URL
    if (!content || !community) {
      console.log('Missing required fields')
      return new Response(
        JSON.stringify({ error: 'Tweet URL and community are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Validate Twitter URL format
    const twitterRegex = /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/\w+\/status\/\d+/;
    if (!twitterRegex.test(content)) {
      console.log('Invalid Twitter URL format')
      return new Response(
        JSON.stringify({ error: 'Please provide a valid Twitter/X URL' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Twitter URL validation passed')

    // Check if user has enough points (10 points required)
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('points')
      .eq('user_id', user.id)
      .maybeSingle()

    console.log('Profile check:', profile, profileError)

    if (profileError || !profile || profile.points < 10) {
      console.log('Insufficient points or profile error')
      return new Response(
        JSON.stringify({ error: 'Insufficient points. 10 points required to submit tweet.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Points check passed, user has:', profile.points)

    // Check if this tweet URL has already been submitted
    const { data: existingTweet, error: checkError } = await supabaseClient
      .from('tweets')
      .select('id')
      .eq('content', content)
      .maybeSingle()

    console.log('Existing tweet check:', existingTweet, checkError)

    if (checkError) {
      console.error('Database error checking for existing tweet:', checkError)
      return new Response(
        JSON.stringify({ error: 'Database error checking for existing tweet' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    if (existingTweet) {
      console.log('Tweet already exists')
      return new Response(
        JSON.stringify({ error: 'This tweet has already been submitted' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('No existing tweet found, proceeding with insert')

    // Insert the tweet
    const { data: tweet, error: tweetError } = await supabaseClient
      .from('tweets')
      .insert({
        user_id: user.id,
        content: content,
        community: community,
        tags: tags || [],
        points_value: Math.floor(Math.random() * 3) + 3, // Random points between 3-5
        period_hours: periodHours,
        preferred_interactions: preferredInteractions,
      })
      .select()
      .single()

    console.log('Tweet insert result:', tweet, tweetError)

    if (tweetError) {
      console.error('Failed to insert tweet:', tweetError)
      return new Response(
        JSON.stringify({ error: 'Failed to submit tweet', details: tweetError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Tweet inserted successfully')

    // Deduct points from user
    const { error: updateError } = await supabaseClient
      .from('profiles')
      .update({ points: profile.points - 10 })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Failed to update user points:', updateError)
    } else {
      console.log('User points updated successfully')
    }

    console.log('=== Submit Tweet Function Completed Successfully ===')

    return new Response(
      JSON.stringify({ 
        success: true, 
        tweet: tweet,
        message: 'Tweet link submitted successfully! You earned engagement points.' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in submit-tweet function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
