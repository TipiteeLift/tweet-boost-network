import { useState } from "react";
import { HomePage } from "./HomePage";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');
  const [user] = useState({
    name: "John Doe",
    points: 7,
    level: "Growth Starter"
  });

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
  };

  if (currentView === 'dashboard') {
    return <Dashboard user={user} />;
  }

  return <HomePage onNavigateToDashboard={handleNavigateToDashboard} />;
};

export default Index;
