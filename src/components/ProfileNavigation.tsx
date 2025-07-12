import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Calendar, 
  Trophy, 
  Star,
  Activity,
  BarChart3,
  Settings,
  Heart,
  MessageSquare,
  Share
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const ProfileNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navigationItems = [
    { label: "Overview", path: "/profile", icon: User },
    { label: "Activity", path: "/profile/activity", icon: Activity },
    { label: "Analytics", path: "/profile/analytics", icon: BarChart3 },
    { label: "Achievements", path: "/profile/achievements", icon: Trophy },
    { label: "Settings", path: "/profile/settings", icon: Settings }
  ];

  const stats = [
    { label: "Posts", value: "245", icon: MessageSquare, color: "text-blue-500" },
    { label: "Likes", value: "1.2k", icon: Heart, color: "text-red-500" },
    { label: "Shares", value: "453", icon: Share, color: "text-green-500" },
    { label: "Streak", value: "12", icon: Star, color: "text-yellow-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-primary" />
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`flex items-center justify-center mb-2 ${stat.color}`}>
                  <stat.icon className="w-4 h-4 mr-1" />
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card className="border-0 bg-gradient-to-br from-secondary/5 to-primary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <User className="w-4 h-4 mr-2 text-primary" />
            Profile Sections
          </h3>
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link key={item.path} to={item.path}>
                  <Button 
                    variant={isActive ? "default" : "ghost"} 
                    className={`w-full justify-start ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10'}`}
                    size="sm"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {isActive && (
                      <Badge variant="secondary" className="ml-auto bg-primary-foreground/20">
                        Active
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="flex-1">
                <p className="text-sm">Tweet gained 25 new likes</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex-1">
                <p className="text-sm">Reached Level 5 milestone</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="flex-1">
                <p className="text-sm">New follower: @cryptodev</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};