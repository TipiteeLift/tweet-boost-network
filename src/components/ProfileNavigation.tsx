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

interface ProfileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ProfileNavigation = ({ activeSection, onSectionChange }: ProfileNavigationProps) => {
  const navigationItems = [
    { label: "Overview", id: "overview", icon: User },
    { label: "Activity", id: "activity", icon: Activity },
    { label: "Analytics", id: "analytics", icon: BarChart3 },
    { label: "Achievements", id: "achievements", icon: Trophy },
    { label: "Settings", id: "settings", icon: Settings }
  ];

  const stats = [
    { label: "Posts", value: "245", icon: MessageSquare, color: "text-primary" },
    { label: "Likes", value: "1.2k", icon: Heart, color: "text-destructive" },
    { label: "Shares", value: "453", icon: Share, color: "text-success" },
    { label: "Streak", value: "12", icon: Star, color: "text-warning" }
  ];

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center text-sm">
            <BarChart3 className="w-4 h-4 mr-2 text-primary" />
            Quick Stats
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`flex items-center justify-center mb-1 ${stat.color}`}>
                  <stat.icon className="w-3 h-3 mr-1" />
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card className="bg-gradient-to-br from-secondary/5 to-primary/5 border-primary/10">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-primary" />
            Profile Sections
          </h3>
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Button 
                  key={item.id}
                  variant={isActive ? "default" : "ghost"} 
                  className={`w-full justify-start text-sm ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10 text-foreground'
                  }`}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {isActive && (
                    <Badge variant="secondary" className="ml-auto bg-primary-foreground/20 text-xs">
                      Active
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3 flex items-center text-sm">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-success"></div>
              <div className="flex-1">
                <p className="text-xs">Tweet gained 25 new likes</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="flex-1">
                <p className="text-xs">Reached Level 5 milestone</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 p-2 rounded-lg bg-background/50">
              <div className="w-2 h-2 rounded-full bg-warning"></div>
              <div className="flex-1">
                <p className="text-xs">New follower: @cryptodev</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};