import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TweetComposer } from "./TweetComposer";
import { SettingsModal } from "./SettingsModal";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
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
  const location = useLocation();
  const [isTweetComposerOpen, setIsTweetComposerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const navigationItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Communities", path: "/communities" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  const engagementProgress = Math.min((12 / 15) * 100, 100);
  const dailyGoalProgress = 80;

  return (
    <div className="w-64 bg-card border-r border-border h-full flex flex-col">
      {/* User Info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png" 
            alt="Tipitee avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-sm">Tipitee</div>
            <div className="text-xs text-muted-foreground">@about_crypto</div>
          </div>
        </div>
        
        <div className="mt-3 flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{userPoints.toLocaleString()}</div>
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
            <NavLink key={index} to={item.path}>
              <Button
                variant={location.pathname === item.path ? "default" : "ghost"}
                className="w-full justify-start"
                size="sm"
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            </NavLink>
          ))}
        </nav>

        {/* Submit Tweet Button */}
        <Button 
          className="w-full mt-6" 
          size="sm"
          onClick={() => setIsTweetComposerOpen(true)}
          disabled={userPoints < 10}
        >
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
        <Button 
          variant="ghost" 
          className="w-full justify-start" 
          size="sm"
          onClick={() => setIsSettingsOpen(true)}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
      
      <TweetComposer 
        isOpen={isTweetComposerOpen}
        onClose={() => setIsTweetComposerOpen(false)}
        userPoints={userPoints}
      />
      
      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};