import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  Star, 
  TrendingUp, 
  Users, 
  Target,
  Zap,
  Award,
  Crown
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change: string;
  icon: any;
  progress?: number;
  trend: 'up' | 'down' | 'neutral';
  color: 'primary' | 'success' | 'warning' | 'secondary';
}

export const EnhancedStatsGrid = () => {
  const stats: StatItem[] = [
    { 
      label: "Total Points", 
      value: "999,999", 
      change: "+2,500 this week", 
      icon: Star, 
      progress: 85,
      trend: 'up',
      color: 'primary'
    },
    { 
      label: "Engagement Rate", 
      value: "87.3%", 
      change: "+5.2% this month", 
      icon: TrendingUp, 
      progress: 87,
      trend: 'up',
      color: 'success'
    },
    { 
      label: "Communities", 
      value: "5", 
      change: "Recently joined DeFi", 
      icon: Users, 
      progress: 50,
      trend: 'up',
      color: 'secondary'
    },
    { 
      label: "Achievements", 
      value: "24", 
      change: "3 unlocked this month", 
      icon: Trophy, 
      progress: 75,
      trend: 'up',
      color: 'warning'
    },
    {
      label: "Streak Days",
      value: "12",
      change: "Personal best: 18 days",
      icon: Target,
      progress: 67,
      trend: 'up',
      color: 'primary'
    },
    {
      label: "Level Progress",
      value: "Level 5",
      change: "2,500 XP to Level 6",
      icon: Crown,
      progress: 45,
      trend: 'up',
      color: 'success'
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'bg-primary/10 text-primary border-primary/20';
      case 'success': return 'bg-success/10 text-success border-success/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      case 'secondary': return 'bg-secondary/10 text-secondary-foreground border-secondary/20';
      default: return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="stats-card border-0 relative overflow-hidden slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-success">{getTrendIcon(stat.trend)}</span>
                  <span className="text-muted-foreground">{stat.change}</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl border ${getColorClasses(stat.color)}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            
            {stat.progress && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{stat.progress}%</span>
                </div>
                <Progress value={stat.progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};