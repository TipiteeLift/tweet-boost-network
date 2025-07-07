import { Button } from "@/components/ui/button";
import liftxLogo from "/lovable-uploads/229e81d6-4d7e-4e2b-beb1-5b2ba6059af6.png";
import { AuthButton } from "./AuthButton";
import type { User } from '@supabase/supabase-js';

interface HeaderProps {
  onSignIn?: () => void;
  user?: User | null;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Header = ({ onSignIn, user, activeTab, onTabChange }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={liftxLogo} alt="LiftX" className="h-8 w-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            LiftX
          </span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => onTabChange?.("features")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "features" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Features
          </button>
          <button 
            onClick={() => onTabChange?.("communities")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "communities" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Communities
          </button>
          <button 
            onClick={() => onTabChange?.("analytics")}
            className={`text-sm font-medium transition-colors ${
              activeTab === "analytics" ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
          >
            Analytics
          </button>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <AuthButton />
          ) : (
            <Button variant="hero" size="lg" onClick={onSignIn}>
              Sign in with Google
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};