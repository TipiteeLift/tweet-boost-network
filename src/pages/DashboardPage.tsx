import { useAuth } from "@/hooks/useAuth";
import { Dashboard } from "@/components/Dashboard";

const DashboardPage = () => {
  const { user, profile } = useAuth();
  
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Please sign in to access the dashboard</p>
        </div>
      </div>
    );
  }

  const dashboardUser = {
    name: profile.display_name,
    points: profile.points,
    level: `Level ${profile.level}`
  };

  return <Dashboard user={dashboardUser} />;
};

export default DashboardPage;