import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Trophy, 
  Edit, 
  Share, 
  Star,
  Crown,
  Zap,
  Target
} from "lucide-react";

export const EnhancedProfileHeader = () => {
  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/5">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      <CardContent className="p-8 relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-glow rounded-full blur-md opacity-30 animate-pulse"></div>
              <img 
                src="/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png" 
                alt="Tipitee avatar"
                className="w-24 h-24 rounded-full border-4 border-primary/20 relative z-10 shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-primary to-primary-glow p-2 rounded-full border-4 border-background shadow-lg">
                <Crown className="w-4 h-4 text-white" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Tipitee
                </h1>
                <p className="text-muted-foreground text-lg">@about_crypto</p>
              </div>
              
              <div className="flex items-center space-x-3 flex-wrap">
                <Badge variant="secondary" className="bg-success/10 text-success pulse-glow">
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
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
              <Share className="w-4 h-4 mr-2" />
              Share Profile
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-primary to-primary-glow hover:scale-105 transition-transform shadow-lg">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
        
        {/* Level Progress Section */}
        <div className="bg-background/50 backdrop-blur-sm rounded-xl p-6 border border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Level 5 → Level 6</h3>
            </div>
            <div className="text-sm text-muted-foreground">
              2,500 / 5,000 XP
            </div>
          </div>
          
          <Progress value={50} className="h-3 mb-3" />
          
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">2,500 XP to next level</span>
            <div className="flex items-center space-x-1 text-success">
              <Target className="w-3 h-3" />
              <span>On track for Level 6!</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};