import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabNavigation } from "@/components/ProfileTabNavigation";
import { ProfileStatsCards } from "@/components/ProfileStatsCards";
import { ProfileOverview } from "@/components/ProfileOverview";
import { ProfileActivity } from "@/components/ProfileActivity";
import { ProfileAnalytics } from "@/components/ProfileAnalytics";
import { ProfileAchievements } from "@/components/ProfileAchievements";
import { ProfileSettings } from "@/components/ProfileSettings";

const Profile = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <ProfileOverview />;
      case "activity":
        return <ProfileActivity />;
      case "analytics":
        return <ProfileAnalytics />;
      case "achievements":
        return <ProfileAchievements />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <ProfileOverview />;
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto p-6">
          <div className="space-y-6">
            {/* Profile Header */}
            <ProfileHeader />
            
            {/* Horizontal Navigation Tabs */}
            <ProfileTabNavigation 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />
            
            {/* Active Section Content */}
            {renderActiveSection()}
            
            {/* Bottom Cards Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProfileStatsCards />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;