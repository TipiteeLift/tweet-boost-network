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
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const url = new URL(req.url)
    const community = url.searchParams.get('community')
    const limit = parseInt(url.searchParams.get('limit') || '20')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    let query = supabaseClient
      .from('tweets')
      .select(`
        *,
        profiles!tweets_user_id_fkey (
          display_name,
          handle,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    // Filter by community if specified
    if (community && community !== 'all') {
      query = query.eq('community', community)
    }

    const { data: tweets, error: tweetsError } = await query

    if (tweetsError) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch tweets', details: tweetsError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Transform the data to match the frontend format
    const formattedTweets = tweets?.map(tweet => ({
      id: tweet.id,
      author: tweet.profiles?.display_name || 'Unknown User',
      handle: tweet.profiles?.handle || '@unknown',
      avatar: tweet.profiles?.avatar_url || null,
      content: tweet.content,
      likes: tweet.likes_count,
      comments: tweet.comments_count,
      shares: tweet.shares_count,
      community: tweet.community,
      timestamp: formatTimestamp(tweet.created_at),
      tags: tweet.tags || [],
      isHot: tweet.is_hot || false,
      points: tweet.points_value
    })) || []

    return new Response(
      JSON.stringify({ tweets: formattedTweets }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in get-tweets function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function formatTimestamp(timestamp: string): string {
  const now = new Date()
  const tweetTime = new Date(timestamp)
  const diffInMs = now.getTime() - tweetTime.getTime()
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

  if (diffInHours >= 24) {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d`
  } else if (diffInHours >= 1) {
    return `${diffInHours}h`
  } else if (diffInMinutes >= 1) {
    return `${diffInMinutes}m`
  } else {
    return 'now'
  }
}