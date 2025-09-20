
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { LogOut, User, Settings } from "lucide-react";

export const AuthButton = () => {
  const { user, profile, signOut, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/auth');
  };

  const handleSignOut = async () => {
    console.log("🚪 AuthButton: Starting sign-out process...");
    try {
      await signOut();
      console.log("✅ AuthButton: Sign-out successful");
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      console.error("❌ AuthButton: Sign-out error:", error);
      toast({
        title: "Sign Out Error",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="w-8 h-8 bg-muted animate-pulse rounded-full" />;
  }

  if (!user || !profile) {
    return (
      <div className="flex items-center gap-2">
        <Button onClick={handleSignIn} variant="default">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Prominent Sign Out Button */}
      <Button 
        onClick={handleSignOut}
        variant="destructive"
        size="sm"
        className="flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </Button>
      
      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2 p-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.display_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium">{profile.display_name}</span>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-xs">
                  {profile.points} pts
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Level {profile.level}
                </Badge>
              </div>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-2">
            <p className="text-sm font-medium">{profile.display_name}</p>
            <p className="text-xs text-muted-foreground">{profile.handle}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {profile.points} points
              </Badge>
              <Badge variant="outline" className="text-xs">
                Level {profile.level}
              </Badge>
              {profile.twitter_handle && (
                <Badge variant="outline" className="text-xs">
                  {profile.twitter_handle}
                </Badge>
              )}
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
