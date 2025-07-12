
import { DashboardLayout } from "@/components/DashboardLayout";
import { EnhancedProfileHeader } from "@/components/EnhancedProfileHeader";
import { WeeklyEngagementChart } from "@/components/WeeklyEngagementChart";
import { SkillProgression } from "@/components/SkillProgression";
import { SocialConnections } from "@/components/SocialConnections";
import { AchievementShowcase } from "@/components/AchievementShowcase";
import { ProfileNavigation } from "@/components/ProfileNavigation";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Navigation */}
          <div className="lg:col-span-1">
            <ProfileNavigation />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Header */}
            <EnhancedProfileHeader />
            
            {/* Weekly Engagement Chart */}
            <WeeklyEngagementChart />
            
            {/* Skills and Social Connections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillProgression />
              <SocialConnections />
            </div>
            
            {/* Achievement Showcase */}
            <AchievementShowcase />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
