import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Home, 
  Users, 
  User, 
  MessageSquare, 
  Link, 
  BarChart3,
  Settings 
} from "lucide-react";

interface DashboardSidebarProps {
  userPoints: number;
  userLevel: string;
}

export const DashboardSidebar = ({ userPoints, userLevel }: DashboardSidebarProps) => {
  const navigationItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Users, label: "Communities", active: false },
    { icon: User, label: "Profile", active: false },
  ];

  const engagementProgress = Math.min((12 / 15) * 100, 100);
  const dailyGoalProgress = 80;

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">AC</span>
          </div>
          <div>
            <div className="font-semibold text-sm">About Crypto</div>
            <div className="text-xs text-muted-foreground">@about_crypto</div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">999,999</div>
            <div className="text-xs text-muted-foreground">Points</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-success">5</div>
            <div className="text-xs text-muted-foreground">Level</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant={item.active ? "default" : "ghost"}
              className="w-full justify-start"
              size="sm"
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>

        {/* Submit Tweet Button */}
        <Button className="w-full mt-6" size="sm">
          + Submit Tweet
        </Button>

        {/* Additional Menu Items */}
        <div className="mt-6 space-y-2">
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <MessageSquare className="w-4 h-4 mr-2" />
            Community Chat
          </Button>
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <Link className="w-4 h-4 mr-2" />
            Social Integration
          </Button>
        </div>

        {/* Today's Progress */}
        <div className="mt-6 p-3 bg-muted rounded-lg">
          <div className="text-sm font-medium mb-3">Today's Progress</div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Engagements</span>
                <span className="text-success">12/15</span>
              </div>
              <Progress value={engagementProgress} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Daily Goal</span>
                <span>80%</span>
              </div>
              <Progress value={dailyGoalProgress} className="h-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" className="w-full justify-start" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
};