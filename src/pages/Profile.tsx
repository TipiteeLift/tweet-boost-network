import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileNavigation } from "@/components/ProfileNavigation";
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
        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Navigation */}
            <div className="lg:col-span-1">
              <ProfileNavigation 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Profile Header */}
              <ProfileHeader />
              
              {/* Active Section Content */}
              {renderActiveSection()}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;