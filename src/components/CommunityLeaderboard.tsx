import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Crown, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  handle: string;
  points: number;
  change: number;
  avatar?: string;
}

export const CommunityLeaderboard = () => {
  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "CryptoKing",
      handle: "@cryptoking",
      points: 1250000,
      change: 5,
      avatar: "CK"
    },
    {
      rank: 2,
      username: "DeFiQueen", 
      handle: "@defiqueen",
      points: 1100000,
      change: -1,
      avatar: "DQ"
    },
    {
      rank: 3,
      username: "Tipitee",
      handle: "@about_crypto", 
      points: 999999,
      change: 2,
      avatar: "T"
    },
    {
      rank: 4,
      username: "AlphaHunter",
      handle: "@alphahunter",
      points: 890000,
      change: -2,
      avatar: "AH"
    },
    {
      rank: 5,
      username: "InfoFiGuru",
      handle: "@infofiguru",
      points: 780000,
      change: 1,
      avatar: "IG"
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "border-l-yellow-500 bg-yellow-500/5";
      case 2: return "border-l-gray-400 bg-gray-400/5";
      case 3: return "border-l-amber-600 bg-amber-600/5";
      default: return "border-l-muted";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-yellow-500" />
          <span>Community Leaderboard</span>
          <Badge variant="secondary" className="ml-auto">
            Weekly
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {leaderboard.map((entry) => (
          <div 
            key={entry.rank}
            className={`flex items-center space-x-3 p-3 rounded-lg border-l-4 transition-all duration-200 hover:bg-muted/50 ${getRankColor(entry.rank)} ${
              entry.handle === '@about_crypto' ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8">
              {getRankIcon(entry.rank)}
            </div>
            
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {entry.avatar}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="font-semibold truncate">{entry.username}</p>
                {entry.handle === '@about_crypto' && (
                  <Badge variant="default" className="text-xs">You</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground truncate">{entry.handle}</p>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-sm">
                {entry.points.toLocaleString()}
              </div>
              <div className={`text-xs flex items-center ${
                entry.change > 0 ? 'text-success' : entry.change < 0 ? 'text-destructive' : 'text-muted-foreground'
              }`}>
                {entry.change > 0 ? '↗' : entry.change < 0 ? '↘' : '→'} {Math.abs(entry.change)}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            Your rank: #3 in InfoFi community
          </p>
        </div>
      </CardContent>
    </Card>
  );
};