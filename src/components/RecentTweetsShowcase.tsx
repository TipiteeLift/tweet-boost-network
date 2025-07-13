import { useTweets } from "@/hooks/useTweets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const RecentTweetsShowcase = () => {
  const { tweets, loading } = useTweets();
  
  // Show only the 3 most recent tweets for the showcase
  const recentTweets = tweets.slice(0, 3);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Community Activity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our community members are sharing and engaging with right now
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-64">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (recentTweets.length === 0) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recent Community Activity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be the first to share content and start engaging with our community!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Recent Community Activity
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our community members are sharing and engaging with right now
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recentTweets.map((tweet) => (
            <Card key={tweet.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={tweet.avatar} alt={tweet.author} />
                    <AvatarFallback>
                      {tweet.author.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm font-semibold">{tweet.author}</CardTitle>
                    <p className="text-xs text-muted-foreground">@{tweet.handle}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed line-clamp-3">
                  {tweet.content}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {tweet.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="text-xs">
                    {tweet.community}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between pt-2 text-muted-foreground">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{tweet.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{tweet.comments}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Share className="h-3 w-3" />
                      <span>{tweet.shares}</span>
                    </div>
                  </div>
                  {tweet.isHot && (
                    <Badge variant="destructive" className="text-xs">
                      🔥 Hot
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};