
import { useState } from "react";
import { DashboardLayout } from "./DashboardLayout";
import { TweetFeed } from "./TweetFeed";
import { AchievementShowcase } from "./AchievementShowcase";
import { OnboardingFlow } from "./OnboardingFlow";

interface DashboardProps {
  user: { name: string; points: number; level: string };
}

export const Dashboard = ({ user: legacyUser }: DashboardProps) => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  return (
    <>
      <DashboardLayout>
        <div className="flex-1 flex flex-col">
          {/* Tweet Feed with all content */}
          <TweetFeed />
          
          {/* Achievement Showcase */}
          <div className="p-4 border-t border-border">
            <AchievementShowcase />
          </div>
        </div>
      </DashboardLayout>
      
      {/* Onboarding Flow */}
      <OnboardingFlow 
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />
    </>
  );
};
