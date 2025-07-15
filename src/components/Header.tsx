
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/AuthButton";
import { useAuth } from "@/hooks/useAuth";

interface HeaderProps {
  onSignIn?: () => void;
  user?: any;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const Header = ({ onSignIn, user, activeTab, onTabChange }: HeaderProps) => {
  const { user: authUser, signOut } = useAuth();
  const currentUser = authUser || user;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
          <span className="text-xl font-bold">LiftX</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Welcome back!
              </span>
              <Button 
                onClick={signOut}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={onSignIn} variant="default">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
