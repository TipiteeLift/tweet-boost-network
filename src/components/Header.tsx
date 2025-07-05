import { Button } from "@/components/ui/button";
import liftxLogo from "@/assets/liftx-logo.png";

interface HeaderProps {
  onSignIn?: () => void;
  user?: { name: string; avatar: string; points: number } | null;
}

export const Header = ({ onSignIn, user }: HeaderProps) => {
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
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#communities" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Communities
          </a>
          <a href="#analytics" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Analytics
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-success font-semibold">{user.points} points</div>
              </div>
              <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
            </div>
          ) : (
            <Button variant="hero" size="lg" onClick={onSignIn}>
              Sign in with X
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};