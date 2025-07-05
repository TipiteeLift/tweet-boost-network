import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Award, Target } from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  progress?: number;
  maxProgress?: number;
  unlocked: boolean;
  points: number;
}

export const AchievementShowcase = () => {
  const featuredAchievements: Achievement[] = [
    {
      id: "streak-master",
      name: "Streak Master",
      description: "Maintain a 30-day engagement streak",
      icon: "🔥",
      rarity: "Epic",
      progress: 12,
      maxProgress: 30,
      unlocked: false,
      points: 1000
    },
    {
      id: "viral-tweet",
      name: "Viral Sensation",
      description: "Get 1000+ likes on a single tweet",
      icon: "🚀",
      rarity: "Legendary",
      progress: 847,
      maxProgress: 1000,
      unlocked: false,
      points: 2500
    },
    {
      id: "community-leader",
      name: "Community Leader",
      description: "Become a moderator in any community",
      icon: "👑",
      rarity: "Epic",
      unlocked: true,
      points: 1500
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Legendary': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'Epic': return 'bg-purple-500/10 text-purple-500 border-purple-500/30';
      case 'Rare': return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      default: return 'bg-gray-500/10 text-gray-500 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Featured Achievements
        </h3>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
              achievement.unlocked ? 'border-success' : 'border-muted'
            } ${achievement.unlocked ? '' : 'opacity-75'}`}
          >
            <div className="absolute top-2 right-2">
              <Badge 
                variant="outline"
                className={getRarityColor(achievement.rarity)}
              >
                {achievement.rarity}
              </Badge>
            </div>
            
            {achievement.unlocked && (
              <div className="absolute top-2 left-2">
                <div className="p-1 rounded-full bg-success">
                  <Award className="w-3 h-3 text-white" />
                </div>
              </div>
            )}
            
            <CardContent className="p-6 text-center space-y-3">
              <div className="text-4xl filter grayscale-0">
                {achievement.icon}
              </div>
              
              <div>
                <h4 className="font-bold">{achievement.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </div>
              
              {achievement.progress !== undefined && achievement.maxProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.maxProgress}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <Star className="w-3 h-3 mr-1" />
                  {achievement.points}
                </Badge>
                {achievement.unlocked && (
                  <Badge variant="default" className="bg-success">
                    Unlocked!
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};