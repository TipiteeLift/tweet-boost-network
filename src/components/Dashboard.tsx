import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share, MessageCircle, BarChart3, Trophy, Activity, Users, TrendingUp, Star } from "lucide-react";

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

  const mockAchievements = [
    {
      id: "engagement-master",
      title: "Engagement Master",
      description: "Reach 10,000 total engagements",
      progress: 8750,
      max: 10000,
      completed: false,
      badge: "Early Adopter"
    },
    {
      id: "streak-30",
      title: "30-Day Streak",
      description: "Maintain activity for 30 consecutive days",
      progress: 12,
      max: 30,
      completed: false,
      badge: "Top Engager"
    },
    {
      id: "community-leader",
      title: "Community Leader",
      description: "Reach 1,000 followers",
      progress: 1000,
      max: 1000,
      completed: true,
      badge: "Community Builder"
    }
  ];

  const mockActivity = [
    {
      id: "1",
      action: "Liked a tweet from @cryptodev about InfoFi protocols",
      timestamp: "1/22/2024, 11:30:00 AM",
      points: 1
    },
    {
      id: "2", 
      action: "Earned the \"Community Leader\" badge",
      timestamp: "1/21/2024, 4:45:00 PM",
      points: 100
    },
    {
      id: "3",
      action: "Joined the DeFi Innovators community",
      timestamp: "1/20/2024, 10:15:00 AM",
      points: 5
    },
    {
      id: "4",
      action: "Posted a tweet about InfoFi that received 847 engagements",
      timestamp: "1/19/2024, 3:30:00 PM",
      points: 10
    },
    {
      id: "5",
      action: "Commented on a trending discussion in the Airdrops community",
      timestamp: "1/18/2024, 12:20:00 PM",
      points: 2
    }
  ];

  const weeklyData = [
    { day: "Dec 16", value: 15 },
    { day: "Dec 17", value: 23 },
    { day: "Dec 18", value: 18 },
    { day: "Dec 19", value: 32 },
    { day: "Dec 20", value: 28 },
    { day: "Dec 21", value: 41 },
    { day: "Dec 22", value: 35 }
  ];

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
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Achievements
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Quick Stats */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Tweets Submitted</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">23</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Communities</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">5</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Longest Streak</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">15 days</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">487</div>
                          <div className="text-sm text-muted-foreground">Total Engagements</div>
                        </div>
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">127</div>
                          <div className="text-sm text-muted-foreground">This Week</div>
                        </div>
                        <TrendingUp className="w-5 h-5 text-success" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">5</div>
                          <div className="text-sm text-muted-foreground">Communities</div>
                        </div>
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold">12</div>
                          <div className="text-sm text-muted-foreground">Day Streak</div>
                        </div>
                        <Star className="w-5 h-5 text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Weekly Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Weekly Activity
                      <span className="text-sm font-normal text-success">+12.5%</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end h-32 space-x-2">
                      {weeklyData.map((day, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <div 
                            className="bg-primary rounded-t w-full"
                            style={{ height: `${(day.value / 50) * 100}%`, minHeight: '8px' }}
                          />
                          <div className="text-xs text-muted-foreground mt-2 text-center">
                            <div className="font-medium">{day.value}</div>
                            <div>{day.day.split(' ')[1]}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Engagement Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-pink-500" />
                        <div>
                          <div className="text-lg font-bold">245</div>
                          <div className="text-sm text-muted-foreground">Likes Given</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Share className="w-5 h-5 text-green-500" />
                        <div>
                          <div className="text-lg font-bold">132</div>
                          <div className="text-sm text-muted-foreground">Retweets</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MessageCircle className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="text-lg font-bold">110</div>
                          <div className="text-sm text-muted-foreground">Comments</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                {/* Featured Badges */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Featured Badges</h2>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 px-3 py-1">
                      Early Adopter
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 px-3 py-1">
                      Top Engager
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500 px-3 py-1">
                      Community Builder
                    </Badge>
                  </div>
                </div>

                {/* All Achievements */}
                <div>
                  <h2 className="text-xl font-bold mb-4">All Achievements</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAchievements.map((achievement) => (
                      <Card key={achievement.id} className={achievement.completed ? "border-success" : ""}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            {achievement.completed && <Trophy className="w-5 h-5 text-yellow-500" />}
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{achievement.progress}/{achievement.max}</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-500 ${
                                  achievement.completed ? 'bg-success' : 'bg-primary'
                                }`}
                                style={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {mockActivity.map((activity) => (
                      <Card key={activity.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                            </div>
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              +{activity.points}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Quick Stats at bottom */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Tweets Submitted</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">23</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Communities</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">5</div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-primary" />
                          <span className="text-sm text-muted-foreground">Longest Streak</span>
                        </div>
                        <div className="text-2xl font-bold mt-2">15 days</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4">Analytics Dashboard</h2>
                  
                  {/* Cross-Platform Analytics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-6">
                        <div>
                          <div className="text-2xl font-bold">15.6K</div>
                          <div className="text-sm text-muted-foreground">Total Reach</div>
                          <div className="text-xs text-success">+12.5%</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div>
                          <div className="text-2xl font-bold">2.4K</div>
                          <div className="text-sm text-muted-foreground">Total Engagement</div>
                          <div className="text-xs text-success">+8.3%</div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div>
                          <div className="text-2xl font-bold">87.3%</div>
                          <div className="text-sm text-muted-foreground">Avg Engagement Rate</div>
                          <div className="text-xs text-success">+5.7%</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Platform Performance */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                              <MessageCircle className="w-4 h-4 text-blue-500" />
                            </div>
                            <span className="font-medium">Twitter</span>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">1.2K engagements</div>
                            <div className="text-xs text-success">+15.3%</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};