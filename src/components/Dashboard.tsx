import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share, MessageCircle } from "lucide-react";

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  community: string;
  timestamp: string;
}

interface DashboardProps {
  user: { name: string; points: number; level: string };
}

const mockTweets: Tweet[] = [
  {
    id: "1",
    author: "Alex Rivera",
    handle: "@alexinfofi",
    content: "Just discovered an amazing DeFi protocol that's about to launch their airdrop! The tokenomics look incredibly solid and the team has a proven track record. This could be huge for the InfoFi community! 🚀",
    likes: 24,
    comments: 8,
    shares: 12,
    community: "InfoFi",
    timestamp: "2h ago"
  },
  {
    id: "2", 
    author: "Sarah Chen",
    handle: "@sarahcrypto",
    content: "PSA: New airdrop opportunity from a Layer 2 project! Requirements are simple - just interact with their testnet. Expected value could be $500+ based on similar drops. Link in thread below 👇",
    likes: 45,
    comments: 15,
    shares: 28,
    community: "Airdrops",
    timestamp: "4h ago"
  },
  {
    id: "3",
    author: "Marcus Dev",
    handle: "@marcusbuilds",
    content: "Building in public day 127: Just shipped a new feature for our DeFi dashboard. The community feedback has been incredible - over 1000 users signed up in the first week! Web3 builders are the best 💪",
    likes: 67,
    comments: 23,
    shares: 34,
    community: "InfoFi",
    timestamp: "6h ago"
  }
];

export const Dashboard = ({ user }: DashboardProps) => {
  const [userPoints, setUserPoints] = useState(user.points);
  const [interactions, setInteractions] = useState<Record<string, { liked: boolean; commented: boolean; shared: boolean }>>({});

  const handleInteraction = (tweetId: string, type: 'like' | 'comment' | 'share') => {
    const pointsMap = { like: 1, comment: 2, share: 3 };
    const currentInteractions = interactions[tweetId] || { liked: false, commented: false, shared: false };
    
    if (!currentInteractions[type === 'like' ? 'liked' : type === 'comment' ? 'commented' : 'shared']) {
      setUserPoints(prev => prev + pointsMap[type]);
      setInteractions(prev => ({
        ...prev,
        [tweetId]: {
          ...currentInteractions,
          [type === 'like' ? 'liked' : type === 'comment' ? 'commented' : 'shared']: true
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>
                  <Badge variant="secondary" className="bg-success text-success-foreground">
                    {userPoints} points
                  </Badge>
                  <div className="text-xs mt-1">{user.level}</div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium mb-2">Progress to Tweet Submission</div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min((userPoints / 10) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {userPoints >= 10 ? "✅ Ready to submit!" : `${10 - userPoints} points needed`}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Communities</div>
                    <div className="space-y-1">
                      <Badge variant="outline" className="text-xs">InfoFi</Badge>
                      <Badge variant="outline" className="text-xs">Airdrops</Badge>
                      <Badge variant="outline" className="text-xs">DeFi</Badge>
                    </div>
                  </div>

                  {userPoints >= 10 && (
                    <Button variant="success" className="w-full">
                      Submit Tweet
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">Community Feed</h1>
                <p className="text-muted-foreground">Engage with tweets to earn points and grow together</p>
              </div>

              <div className="space-y-4">
                {mockTweets.map((tweet) => {
                  const tweetInteractions = interactions[tweet.id] || { liked: false, commented: false, shared: false };
                  
                  return (
                    <Card key={tweet.id} className="hover:shadow-card transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white font-semibold text-sm">
                              {tweet.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{tweet.author}</div>
                              <div className="text-xs text-muted-foreground">{tweet.handle} • {tweet.timestamp}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tweet.community}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-sm mb-4 leading-relaxed">{tweet.content}</p>
                        
                        <div className="flex items-center space-x-6">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInteraction(tweet.id, 'like')}
                            className={`text-xs ${tweetInteractions.liked ? 'text-pink-500' : 'text-muted-foreground'}`}
                            disabled={tweetInteractions.liked}
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {tweet.likes} (+1pt)
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInteraction(tweet.id, 'comment')}
                            className={`text-xs ${tweetInteractions.commented ? 'text-blue-500' : 'text-muted-foreground'}`}
                            disabled={tweetInteractions.commented}
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {tweet.comments} (+2pts)
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleInteraction(tweet.id, 'share')}
                            className={`text-xs ${tweetInteractions.shared ? 'text-green-500' : 'text-muted-foreground'}`}
                            disabled={tweetInteractions.shared}
                          >
                            <Share className="w-4 h-4 mr-1" />
                            {tweet.shares} (+3pts)
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Analytics */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Today's Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Points Earned</span>
                      <span className="font-semibold text-success">+{userPoints - user.points}</span>  
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Interactions</span>
                      <span className="font-semibold">
                        {Object.values(interactions).reduce((acc, curr) => 
                          acc + (curr.liked ? 1 : 0) + (curr.commented ? 1 : 0) + (curr.shared ? 1 : 0), 0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Rank</span>
                      <span className="font-semibold text-primary">#47</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: "Elena V.", points: 2100 },
                      { name: "Ryan T.", points: 1920 },
                      { name: "David P.", points: 1650 }
                    ].map((leader, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground">#{index + 1}</span>
                          <span>{leader.name}</span>
                        </div>
                        <span className="font-semibold text-success">{leader.points}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};