import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NotificationCenter } from "./NotificationCenter";
import { LiveFeedModal } from "./LiveFeedModal";
import { AuthButton } from "./AuthButton";
import { FeedbackForm } from "./FeedbackForm";
import { Bell, Search, Calendar, Activity } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export const DashboardHeader = () => {
  const [isLiveFeedOpen, setIsLiveFeedOpen] = useState(false);
  const { todayStats } = useAuth();
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">L</span>
            </div>
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
        <div className="flex items-center space-x-4">
          {todayStats && (
            <Badge variant="secondary" className="bg-warning/10 text-warning">
              <Calendar className="w-3 h-3 mr-1" />
              {todayStats.likes + todayStats.comments + todayStats.shares} interactions today
            </Badge>
          )}
          
          <FeedbackForm />
          
          <NotificationCenter />
          
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setIsLiveFeedOpen(true)}
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