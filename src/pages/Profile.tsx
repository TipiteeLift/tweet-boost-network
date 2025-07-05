import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnhancedProfileHeader } from "@/components/EnhancedProfileHeader";
import { EnhancedStatsGrid } from "@/components/EnhancedStatsGrid";
import { SkillProgression } from "@/components/SkillProgression";
import { SocialConnections } from "@/components/SocialConnections";
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

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Enhanced Profile Header */}
        <EnhancedProfileHeader />

        {/* Enhanced Stats Grid */}
        <EnhancedStatsGrid />

        {/* Profile Tabs */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="connections">Network</TabsTrigger>
            <TabsTrigger value="communities">Communities</TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="achievement-card border-2 border-primary/20">
                  <div className="absolute top-2 right-2 z-10">
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
                  <CardContent className="p-6 relative z-10">
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
                <Card key={index} className="hover:bg-muted/50 transition-colors duration-200">
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

          <TabsContent value="skills" className="space-y-6">
            <SkillProgression />
          </TabsContent>

          <TabsContent value="connections" className="space-y-6">
            <SocialConnections />
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