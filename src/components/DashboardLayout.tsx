
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
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <DashboardHeader />
        
        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
      
      {/* Right Insights Sidebar */}
      <div className="w-80 border-l border-border bg-background flex flex-col max-h-screen">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            <div className="max-w-full">
              <LeaderboardWidget compact />
            </div>
            <div className="max-w-full">
              <ChallengeTracker />
            </div>
            <div className="max-w-full">
              <InsightsSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
