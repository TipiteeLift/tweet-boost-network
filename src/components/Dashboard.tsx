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
  const [showOnboarding, setShowOnboarding] = useState(() => {
    // Show onboarding if user is new (less than 10 points)
    return profile?.points === 0;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Welcome to LiftX</h1>
          <p className="text-muted-foreground">Please sign in to access your dashboard</p>
          <Button onClick={() => window.location.href = '/'}>
            Go to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <DashboardSidebar userPoints={profile.points} userLevel={`Level ${profile.level}`} />
      
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