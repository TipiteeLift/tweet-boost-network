import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NotificationCenter } from "./NotificationCenter";
import { LiveFeedModal } from "./LiveFeedModal";
import { AuthButton } from "./AuthButton";
import { Search, Calendar, Activity } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import liftxLogo from "/lovable-uploads/229e81d6-4d7e-4e2b-beb1-5b2ba6059af6.png";

export const DashboardHeader = () => {
  const [isLiveFeedOpen, setIsLiveFeedOpen] = useState(false);
  const { todayStats } = useAuth();
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img src={liftxLogo} alt="LiftX" className="h-8 w-8" />
            <span className="text-xl font-bold">LiftX</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search tweets, users, communities..." 
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {todayStats && (
            <Badge variant="secondary" className="bg-warning/10 text-warning shrink-0">
              <Calendar className="w-3 h-3 mr-1" />
              {todayStats.likes + todayStats.comments + todayStats.shares} interactions today
            </Badge>
          )}
          
          <NotificationCenter />
          
          <Button variant="outline" size="sm" className="shrink-0">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setIsLiveFeedOpen(true)}
            className="shrink-0"
          >
            <Activity className="w-4 h-4 mr-2" />
            Live Feed
          </Button>
          
          <AuthButton />
        </div>
      </div>
      
      <LiveFeedModal 
        isOpen={isLiveFeedOpen} 
        onClose={() => setIsLiveFeedOpen(false)} 
      />
    </div>
  );
};