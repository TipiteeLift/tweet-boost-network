import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

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

    // Get or create user profile
    let { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (profileError && profileError.code === 'PGRST116') {
      // Profile doesn't exist, create one
      const { data: newProfile, error: insertError } = await supabaseClient
        .from('profiles')
        .insert({
          user_id: user.id,
          display_name: user.user_metadata?.display_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
          handle: '@' + (user.user_metadata?.username || user.email?.split('@')[0] || 'user'),
          avatar_url: user.user_metadata?.avatar_url || null,
          twitter_handle: user.user_metadata?.twitter_handle || null,
          points: 100, // Starting points
          level: 1
        })
        .select()
        .single()

      if (insertError) {
        return new Response(
          JSON.stringify({ error: 'Failed to create profile', details: insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      profile = newProfile
    } else if (profileError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profile', details: profileError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get user interactions count for today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const { data: todayInteractions, error: interactionsError } = await supabaseClient
      .from('user_interactions')
      .select('interaction_type')
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString())

    const todayStats = {
      likes: todayInteractions?.filter(i => i.interaction_type === 'like').length || 0,
      comments: todayInteractions?.filter(i => i.interaction_type === 'comment').length || 0,
      shares: todayInteractions?.filter(i => i.interaction_type === 'share').length || 0
    }

    // Calculate level based on points
    const level = Math.floor(profile.points / 100) + 1

    // Update level if it changed
    if (level !== profile.level) {
      await supabaseClient
        .from('profiles')
        .update({ level })
        .eq('user_id', user.id)
      
      profile.level = level
    }

    return new Response(
      JSON.stringify({ 
        profile: {
          ...profile,
          level
        },
        today_stats: todayStats
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in get-profile function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})