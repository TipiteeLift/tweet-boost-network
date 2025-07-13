import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart3,
  Calendar,
  Heart,
  MessageSquare,
  Share,
  Star
} from "lucide-react";

export const ProfileStatsCards = () => {
  const stats = [
    { label: "Posts", value: "245", icon: MessageSquare, color: "text-primary" },
    { label: "Likes", value: "1.2k", icon: Heart, color: "text-destructive" },
    { label: "Shares", value: "453", icon: Share, color: "text-success" },
    { label: "Streak", value: "12", icon: Star, color: "text-warning" }
  ];

  return (
    <>
      {/* Quick Stats Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-lg bg-background/50">
                <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
                  <stat.icon className="w-4 h-4 mr-1" />
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tweet gained 25 new likes</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Reached Level 5 milestone</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New follower: @cryptodev</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};