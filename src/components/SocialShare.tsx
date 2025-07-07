import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Share2, Twitter, Copy, Download, Trophy, Star, Target } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Achievement {
  id: string;
  title: string;
  description: string;
  badge_icon: string;
  points_required: number;
  unlocked_at?: string;
}

interface SocialShareProps {
  type: 'achievement' | 'leaderboard' | 'points';
  data?: Achievement | { rank: number; points: number };
  trigger?: React.ReactNode;
}

export const SocialShare = ({ type, data, trigger }: SocialShareProps) => {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const generateShareText = () => {
    if (!profile) return '';

    switch (type) {
      case 'achievement':
        const achievement = data as Achievement;
        return `🏆 Just unlocked "${achievement?.title}" on @LiftX_Platform! 
        
${achievement?.description} 

Building my X following through authentic engagement. Join me! 

#LiftX #TwitterGrowth #SocialMedia`;

      case 'leaderboard':
        const leaderboardData = data as { rank: number; points: number };
        return `🚀 Ranked #${leaderboardData?.rank} on @LiftX_Platform with ${leaderboardData?.points} points! 
        
Growing my X following through mutual support and engagement. 💪

Want to grow together? Join the community!

#LiftX #TwitterGrowth #Community`;

      case 'points':
        return `📈 Hit ${profile.points} points on @LiftX_Platform! 
        
Level ${profile.level} and climbing! 🎯

Growing my X following through authentic engagement and community support.

#LiftX #TwitterGrowth #Progress`;

      default:
        return `🚀 Growing my X following with @LiftX_Platform! 

Join the community of creators supporting each other's growth! 

#LiftX #TwitterGrowth #Community`;
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(generateShareText());
    const url = encodeURIComponent(window.location.origin);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
      toast({
        title: "Copied to clipboard",
        description: "Share text copied successfully!",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  const downloadAsBadge = () => {
    // Create a simple badge image using canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 400;
    canvas.height = 200;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 400, 200);
    gradient.addColorStop(0, '#8B5CF6');
    gradient.addColorStop(1, '#3B82F6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 200);

    // Text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    
    if (type === 'achievement') {
      const achievement = data as Achievement;
      ctx.fillText('🏆 Achievement Unlocked!', 200, 60);
      ctx.font = '18px Arial';
      ctx.fillText(achievement?.title || 'New Achievement', 200, 100);
    } else if (type === 'leaderboard') {
      const leaderboardData = data as { rank: number; points: number };
      ctx.fillText(`🏅 Rank #${leaderboardData?.rank}`, 200, 60);
      ctx.font = '18px Arial';
      ctx.fillText(`${leaderboardData?.points} Points`, 200, 100);
    } else {
      ctx.fillText(`⭐ Level ${profile?.level}`, 200, 60);
      ctx.font = '18px Arial';
      ctx.fillText(`${profile?.points} Points`, 200, 100);
    }

    ctx.font = '14px Arial';
    ctx.fillText('LiftX - Grow Together', 200, 150);

    // Download
    const link = document.createElement('a');
    link.download = `liftx-${type}-badge.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const getShareIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-5 h-5 text-warning" />;
      case 'leaderboard':
        return <Target className="w-5 h-5 text-success" />;
      default:
        return <Star className="w-5 h-5 text-primary" />;
    }
  };

  const getShareTitle = () => {
    switch (type) {
      case 'achievement':
        return 'Share Achievement';
      case 'leaderboard':
        return 'Share Ranking';
      default:
        return 'Share Progress';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getShareIcon()}
            <span>{getShareTitle()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Preview */}
          <Card>
            <CardContent className="p-4">
              <div className="text-sm whitespace-pre-line text-muted-foreground">
                {generateShareText()}
              </div>
            </CardContent>
          </Card>

          {/* Share Options */}
          <div className="space-y-3">
            <Button onClick={shareToTwitter} className="w-full" size="lg">
              <Twitter className="w-5 h-5 mr-2" />
              Share on X (Twitter)
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              
              <Button variant="outline" onClick={downloadAsBadge}>
                <Download className="w-4 h-4 mr-2" />
                Download Badge
              </Button>
            </div>
          </div>

          {/* Tips */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground">
              💡 Tip: Sharing your progress helps grow the LiftX community and can earn you bonus engagement!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};