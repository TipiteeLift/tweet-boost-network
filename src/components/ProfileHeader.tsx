import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Share, 
  Edit, 
  Calendar,
  Trophy,
  Star,
  Zap,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ProfileHeader = () => {
  const { toast } = useToast();

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Profile link copied!",
      description: "Profile link has been copied to clipboard.",
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Edit profile functionality coming soon!",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/10">
      <CardContent className="p-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          {/* Profile Info */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-2xl font-bold">
                🧠
              </div>
              <div className="absolute -bottom-1 -right-1 bg-warning rounded-full p-1">
                <Trophy className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h1 className="text-3xl font-bold">Tipitee</h1>
                <p className="text-muted-foreground">@about_crypto</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <Calendar className="w-3 h-3 mr-1" />
                  12-day streak
                </Badge>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Trophy className="w-3 h-3 mr-1" />
                  Top 1% User
                </Badge>
                <Badge variant="secondary" className="bg-warning/10 text-warning">
                  <Star className="w-3 h-3 mr-1" />
                  Level 5 Explorer
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleShareProfile}>
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button onClick={handleEditProfile}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Level Progress */}
        <div className="mt-8 bg-background/50 rounded-lg p-6 border border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Level 5 → Level 6</h3>
            </div>
            <span className="text-sm text-muted-foreground">2,500 / 5,000 XP</span>
          </div>
          
          <Progress value={50} className="h-3 mb-3" />
          
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">2,500 XP to next level</span>
            <div className="flex items-center gap-1 text-success">
              <Target className="w-3 h-3" />
              <span>On track for Level 6!</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};