import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Crown, Star, Medal } from "lucide-react";

export const CommunityLeaderboard = () => {
  const topMembers = [
    {
      rank: 1,
      name: "CryptoWhale",
      avatar: "/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png",
      points: 15420,
      community: "InfoFi",
      badge: "Legend"
    },
    {
      rank: 2,
      name: "DeFiExplorer",
      avatar: "/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png",
      points: 12350,
      community: "DeFi",
      badge: "Expert"
    },
    {
      rank: 3,
      name: "AirdropHunter",
      avatar: "/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png",
      points: 9870,
      community: "Airdrops",
      badge: "Pro"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Trophy className="w-5 h-5 text-amber-600" />;
      default:
        return <Star className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Legend":
        return "bg-yellow-500/10 text-yellow-500";
      case "Expert":
        return "bg-purple-500/10 text-purple-500";
      case "Pro":
        return "bg-blue-500/10 text-blue-500";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-primary" />
          <span>Community Leaders</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topMembers.map((member, index) => (
          <div
            key={member.name}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                {getRankIcon(member.rank)}
                <span className="font-bold text-lg">#{member.rank}</span>
              </div>
              <Avatar className="w-8 h-8">
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
               <div className="min-w-0 flex-1">
                 <div className="font-semibold text-sm truncate">{member.name}</div>
                 <div className="text-xs text-muted-foreground truncate">{member.community}</div>
               </div>
            </div>
            <div className="text-right space-y-1">
              <div className="font-bold text-primary">{member.points.toLocaleString()}</div>
              <Badge className={getBadgeColor(member.badge)} variant="secondary">
                {member.badge}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};