import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { InsightsSidebar } from "./InsightsSidebar";
import { TweetFeed } from "./TweetFeed";
import { AchievementShowcase } from "./AchievementShowcase";
import { WeeklyEngagementChart } from "./WeeklyEngagementChart";
import { StatisticsGrid } from "./StatisticsGrid";
import { LeaderboardWidget } from "./LeaderboardWidget";
import { ChallengeTracker } from "./ChallengeTracker";
import { OnboardingFlow } from "./OnboardingFlow";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DashboardProps {
  user: { name: string; points: number; level: string };
}

export const Dashboard = ({ user: legacyUser }: DashboardProps) => {
  const { user, profile, loading } = useAuth();
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Mock user data for development - remove when X auth is implemented
  const mockProfile = {
    points: 125,
    level: 3,
    display_name: "Demo User",
    handle: "@demo_user"
  };

  const currentProfile = profile || mockProfile;
  const userPoints = currentProfile.points;
  const userLevel = `Level ${currentProfile.level}`;

  return (
    <>
      <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <DashboardSidebar userPoints={userPoints} userLevel={userLevel} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />
        
        {/* Content Layout */}
        <div className="flex-1 flex flex-col">
          {/* Tweet Feed with all content */}
          <TweetFeed />
          
          {/* Achievement Showcase */}
          <div className="p-4 border-t border-border">
            <AchievementShowcase />
          </div>
        </div>
      </div>
      
      {/* Right Insights Sidebar */}
      <div className="w-80 border-l border-border bg-background overflow-y-auto">
        <div className="p-4 space-y-6">
          <LeaderboardWidget compact />
          <ChallengeTracker />
          <InsightsSidebar />
        </div>
      </div>
      </div>
      
      {/* Onboarding Flow */}
      <OnboardingFlow 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </>
  );
};