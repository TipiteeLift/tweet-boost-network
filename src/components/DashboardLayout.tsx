
import { DashboardSidebar } from "./DashboardSidebar";
import { DashboardHeader } from "./DashboardHeader";
import { InsightsSidebar } from "./InsightsSidebar";
import { LeaderboardWidget } from "./LeaderboardWidget";
import { ChallengeTracker } from "./ChallengeTracker";
import { useAuth } from "@/hooks/useAuth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { profile } = useAuth();
  
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
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <DashboardSidebar userPoints={userPoints} userLevel={userLevel} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DashboardHeader />
        
        {/* Content */}
        <div className="flex-1">
          {children}
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
  );
};
