import { WeeklyEngagementChart } from "@/components/WeeklyEngagementChart";
import { SkillProgression } from "@/components/SkillProgression";
import { SocialConnections } from "@/components/SocialConnections";

export const ProfileOverview = () => {
  return (
    <div className="space-y-6">
      {/* Weekly Engagement Chart */}
      <WeeklyEngagementChart />
      
      {/* Skills and Social Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SkillProgression />
        <SocialConnections />
      </div>
    </div>
  );
};