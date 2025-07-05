import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Trophy, 
  Star, 
  Calendar, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Edit,
  Share,
  Award,
  Target,
  Zap
} from "lucide-react";

export default function Profile() {
  const achievements = [
    {
      id: "early-adopter",
      name: "Early Adopter",
      description: "Joined in the first month",
      icon: "🚀",
      rarity: "Legendary",
      dateEarned: "Jan 15, 2024",
      points: 500
    },
    {
      id: "engagement-master",
      name: "Engagement Master",
      description: "Reached 10,000 total engagements",
      icon: "⭐",
      rarity: "Epic",
      dateEarned: "Feb 20, 2024",
      points: 1000
    },
    {
      id: "community-builder",
      name: "Community Builder",
      description: "Helped grow 3 communities",
      icon: "🏗️",
      rarity: "Rare",
      dateEarned: "Mar 5, 2024",
      points: 750
    }
  ];

  const recentActivity = [
    {
      type: "achievement",
      description: "Earned 'Top Contributor' badge in InfoFi",
      timestamp: "2 hours ago",
      points: 250
    },
    {
      type: "engagement",
      description: "Your tweet got 100+ likes",
      timestamp: "5 hours ago",
      points: 50
    },
    {
      type: "milestone",
      description: "Reached 15-day engagement streak",
      timestamp: "1 day ago",
      points: 100
    },
    {
      type: "community",
      description: "Joined DeFi Analytics community",
      timestamp: "2 days ago",
      points: 25
    }
  ];

  const stats = [
    { label: "Total Points", value: "999,999", change: "+2,500 this week", icon: Star },
    { label: "Engagement Rate", value: "87.3%", change: "+5.2% this month", icon: TrendingUp },
    { label: "Communities", value: "5", change: "Recently joined DeFi", icon: Users },
    { label: "Achievements", value: "24", change: "3 unlocked this month", icon: Trophy }
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img 
                    src="/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png" 
                    alt="Tipitee avatar"
                    className="w-20 h-20 rounded-full border-4 border-primary/20"
                  />
                  <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary">
                    Level 5
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <h1 className="text-3xl font-bold">Tipitee</h1>
                    <p className="text-muted-foreground text-lg">@about_crypto</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      <Calendar className="w-3 h-3 mr-1" />
                      12-day streak
                    </Badge>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Trophy className="w-3 h-3 mr-1" />
                      Top 1% User
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-2" />
                  Share Profile
                </Button>
                <Button size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                    <div className="text-xs text-success font-medium">{stat.change}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="relative overflow-hidden border-2 border-primary/20">
                  <div className="absolute top-2 right-2">
                    <Badge 
                      variant="secondary"
                      className={
                        achievement.rarity === 'Legendary' ? 'bg-yellow-500/10 text-yellow-500' :
                        achievement.rarity === 'Epic' ? 'bg-purple-500/10 text-purple-500' :
                        'bg-blue-500/10 text-blue-500'
                      }
                    >
                      {achievement.rarity}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="text-center space-y-3">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-bold text-lg">{achievement.name}</h3>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-muted-foreground">Earned {achievement.dateEarned}</div>
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          +{achievement.points} points
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          activity.type === 'achievement' ? 'bg-yellow-500/10 text-yellow-500' :
                          activity.type === 'engagement' ? 'bg-pink-500/10 text-pink-500' :
                          activity.type === 'milestone' ? 'bg-green-500/10 text-green-500' :
                          'bg-blue-500/10 text-blue-500'
                        }`}>
                          {activity.type === 'achievement' && <Award className="w-4 h-4" />}
                          {activity.type === 'engagement' && <MessageCircle className="w-4 h-4" />}
                          {activity.type === 'milestone' && <Target className="w-4 h-4" />}
                          {activity.type === 'community' && <Users className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        +{activity.points}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "InfoFi", role: "Top Contributor", members: "12.5K", joined: "Jan 2024", active: true },
                { name: "Airdrops", role: "Member", members: "8.2K", joined: "Feb 2024", active: false },
                { name: "DeFi", role: "Moderator", members: "25.1K", joined: "Dec 2023", active: true },
              ].map((community, index) => (
                <Card key={index} className={community.active ? "border-primary" : ""}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold">{community.name}</h3>
                        {community.active && <Badge variant="default">Active</Badge>}
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Role:</span>
                          <span className="font-medium">{community.role}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Members:</span>
                          <span>{community.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Joined:</span>
                          <span>{community.joined}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}