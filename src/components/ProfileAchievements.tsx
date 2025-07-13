import { AchievementShowcase } from "@/components/AchievementShowcase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Star, Award } from "lucide-react";

export const ProfileAchievements = () => {
  const upcomingAchievements = [
    {
      name: "Viral Creator",
      description: "Get 10,000 likes on a single post",
      progress: 73,
      current: 7300,
      target: 10000,
      icon: Star,
      rarity: "Epic"
    },
    {
      name: "Community Leader",
      description: "Help 100 community members",
      progress: 45,
      current: 45,
      target: 100,
      icon: Award,
      rarity: "Rare"
    },
    {
      name: "Streak Master",
      description: "Maintain a 30-day posting streak",
      progress: 40,
      current: 12,
      target: 30,
      icon: Target,
      rarity: "Legendary"
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'text-warning border-warning/20 bg-warning/10';
      case 'Epic': return 'text-primary border-primary/20 bg-primary/10';
      case 'Rare': return 'text-secondary border-secondary/20 bg-secondary/10';
      default: return 'text-muted-foreground border-border bg-muted/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievement Showcase */}
      <AchievementShowcase />

      {/* Progress Towards New Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Progress Towards New Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {upcomingAchievements.map((achievement) => (
            <div key={achievement.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg border ${getRarityColor(achievement.rarity)}`}>
                    <achievement.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                  {achievement.rarity}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">
                    {achievement.current.toLocaleString()} / {achievement.target.toLocaleString()}
                  </span>
                </div>
                <Progress value={achievement.progress} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {achievement.progress}% completed
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievement Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            Achievement Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <p className="text-2xl font-bold text-primary">12</p>
              <p className="text-sm text-muted-foreground">Total Achievements</p>
            </div>
            <div className="text-center p-4 bg-warning/5 rounded-lg">
              <p className="text-2xl font-bold text-warning">3</p>
              <p className="text-sm text-muted-foreground">Legendary</p>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <p className="text-2xl font-bold text-secondary">5</p>
              <p className="text-sm text-muted-foreground">Epic</p>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <p className="text-2xl font-bold text-success">4</p>
              <p className="text-sm text-muted-foreground">Rare</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};