import { WeeklyEngagementChart } from "@/components/WeeklyEngagementChart";
import { SkillProgression } from "@/components/SkillProgression";
import { SocialConnections } from "@/components/SocialConnections";

export const ProfileOverview = () => {
  return (
    <div className="space-y-6">
      {/* Weekly Engagement Chart */}
      <WeeklyEngagementChart />
      
      {/* Skills and Social Connections - Full Width */}
      <div className="space-y-6">
        <SkillProgression />
        <SocialConnections />
      </div>
    </div>
  );
};