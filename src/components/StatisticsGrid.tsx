import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, Users, Calendar, Target, Zap } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<{ className?: string }>;
  gradient?: boolean;
}

export const StatisticsGrid = () => {
  const stats: StatCard[] = [
    {
      title: "Total Points",
      value: "999,999",
      change: "+5",
      changeType: "positive",
      icon: Star,
      gradient: true
    },
    {
      title: "This Week",
      value: "127",
      change: "+15.3%",
      changeType: "positive",
      icon: TrendingUp
    },
    {
      title: "Communities",
      value: "5",
      change: "Active",
      changeType: "neutral",
      icon: Users
    },
    {
      title: "Day Streak",
      value: "12",
      change: "🔥 Hot",
      changeType: "positive",
      icon: Calendar
    }
  ];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-warning';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
            stat.gradient ? 'bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20' : ''
          }`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${stat.gradient ? 'text-primary' : ''}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
                <div className={`text-xs font-medium ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.gradient ? 'bg-primary/20' : 'bg-muted'}`}>
                <stat.icon className={`w-5 h-5 ${stat.gradient ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};