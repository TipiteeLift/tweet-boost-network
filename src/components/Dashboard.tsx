import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { InsightsSidebar } from "./InsightsSidebar";
import { TweetFeed } from "./TweetFeed";
import { AchievementShowcase } from "./AchievementShowcase";

interface DashboardProps {
  user: { name: string; points: number; level: string };
}

export const Dashboard = ({ user }: DashboardProps) => {
  const [userPoints, setUserPoints] = useState(user.points);
  const [interactions, setInteractions] = useState<Record<string, { liked: boolean; commented: boolean; shared: boolean }>>({});

  const handleInteraction = (tweetId: string, type: 'like' | 'comment' | 'share') => {
    const pointsMap = { like: 1, comment: 2, share: 3 };
    const currentInteractions = interactions[tweetId] || { liked: false, commented: false, shared: false };
    
    if (!currentInteractions[type === 'like' ? 'liked' : type === 'comment' ? 'commented' : 'shared']) {
      setUserPoints(prev => prev + pointsMap[type]);
      setInteractions(prev => ({
        ...prev,
        [tweetId]: {
          ...currentInteractions,
          [type === 'like' ? 'liked' : type === 'comment' ? 'commented' : 'shared']: true
        }
      }));
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <DashboardSidebar userPoints={userPoints} userLevel={user.level} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />
        
        {/* Content Layout */}
        <div className="flex-1 flex">
          {/* Tweet Feed */}
          <div className="flex-1 flex flex-col">
            <TweetFeed onInteraction={handleInteraction} interactions={interactions} />
            
            {/* Achievement Showcase */}
            <div className="p-4 border-t border-border">
              <AchievementShowcase />
            </div>
          </div>
          
          {/* Right Insights Sidebar */}
          <InsightsSidebar />
        </div>
      </div>
    </div>
  );
};