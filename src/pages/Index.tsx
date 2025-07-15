import { useState, useEffect } from "react";
import { HomePage } from "./HomePage";
import { Dashboard } from "@/components/Dashboard";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, profile, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && profile) {
      setCurrentView('dashboard');
    } else if (!loading && !user) {
      setCurrentView('home');
    }
  }, [user, profile, loading]);

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
  };

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow animate-pulse mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (currentView === 'dashboard' && user && profile) {
    const dashboardUser = {
      name: profile.display_name,
      points: profile.points,
      level: `Level ${profile.level}`
    };
    return <Dashboard user={dashboardUser} />;
  }

  return <HomePage onNavigateToDashboard={handleNavigateToDashboard} />;
};

export default Index;
