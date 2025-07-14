import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.3'
import { corsHeaders } from '../_shared/cors.ts'

const X_BEARER_TOKEN = Deno.env.get('X_BEARER_TOKEN')

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!X_BEARER_TOKEN) {
      return new Response(
        JSON.stringify({ error: 'X_BEARER_TOKEN not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const url = new URL(req.url)
    const community = url.searchParams.get('community') || 'all'
    const limit = parseInt(url.searchParams.get('limit') || '10')

    // Map communities to X search queries
    const communityQueries: { [key: string]: string } = {
      'all': 'fitness OR workout OR gym lang:en -is:retweet',
      'trending': 'fitness trends OR workout trends lang:en -is:retweet',
      'featured': 'fitness motivation OR workout inspiration lang:en -is:retweet has:media',
      'joined': 'fitness community OR gym life lang:en -is:retweet'
    }

    const query = communityQueries[community] || communityQueries['all']
    
    const response = await fetch(
      `https://api.twitter.com/2/tweets/search/recent?query=${encodeURIComponent(query)}&max_results=${limit}&tweet.fields=author_id,created_at,public_metrics,text&user.fields=name,username,profile_image_url&expansions=author_id`,
      {
        headers: {
          'Authorization': `Bearer ${X_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.error('X API Error:', response.status, await response.text())
      return new Response(
        JSON.stringify({ tweets: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    
    if (!data.data) {
      return new Response(
        JSON.stringify({ tweets: [] }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create user lookup for author details
    const users = data.includes?.users || []
    const userLookup = users.reduce((acc: any, user: any) => {
      acc[user.id] = user
      return acc
    }, {})

    // Transform X tweets to match our format
    const formattedTweets = data.data.map((tweet: any) => {
      const author = userLookup[tweet.author_id]
      const metrics = tweet.public_metrics || {}
      
      return {
        id: `x_${tweet.id}`,
        author: author?.name || 'X User',
        handle: `@${author?.username || 'unknown'}`,
        avatar: author?.profile_image_url || null,
        content: tweet.text,
        likes: metrics.like_count || 0,
        comments: metrics.reply_count || 0,
        shares: metrics.retweet_count || 0,
        community: community,
        timestamp: formatTimestamp(tweet.created_at),
        tags: extractHashtags(tweet.text),
        isHot: metrics.like_count > 100,
        points: 0, // X tweets don't give points
        source: 'x',
        x_tweet_id: tweet.id
      }
    })

    return new Response(
      JSON.stringify({ tweets: formattedTweets }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )

  } catch (error) {
    console.error('Error in fetch-x-tweets function:', error)
    return new Response(
      JSON.stringify({ tweets: [] }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
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

function extractHashtags(text: string): string[] {
  const hashtags = text.match(/#\w+/g) || []
  return hashtags.slice(0, 3) // Limit to 3 hashtags
}