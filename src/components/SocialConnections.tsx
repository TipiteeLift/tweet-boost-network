import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  UserPlus, 
  MessageCircle, 
  Star,
  Award,
  Crown,
  Zap
} from "lucide-react";

interface Connection {
  id: string;
  username: string;
  handle: string;
  avatar: string;
  mutualConnections: number;
  status: 'following' | 'mutual' | 'suggested';
  level: number;
  points: number;
  specialty: string;
}

export const SocialConnections = () => {
  const connections: Connection[] = [
    {
      id: "1",
      username: "CryptoKing",
      handle: "@cryptoking",
      avatar: "CK",
      mutualConnections: 12,
      status: 'mutual',
      level: 6,
      points: 1250000,
      specialty: "DeFi Expert"
    },
    {
      id: "2", 
      username: "DeFiQueen",
      handle: "@defiqueen",
      avatar: "DQ",
      mutualConnections: 8,
      status: 'following',
      level: 5,
      points: 1100000,
      specialty: "Yield Farming"
    },
    {
      id: "3",
      username: "AlphaHunter",
      handle: "@alphahunter", 
      avatar: "AH",
      mutualConnections: 15,
      status: 'mutual',
      level: 4,
      points: 890000,
      specialty: "Market Analysis"
    },
    {
      id: "4",
      username: "NFTCollector",
      handle: "@nftcollector",
      avatar: "NC",
      mutualConnections: 5,
      status: 'suggested',
      level: 3,
      points: 650000,
      specialty: "NFT Trends"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'mutual': return 'bg-success/10 text-success';
      case 'following': return 'bg-primary/10 text-primary';
      case 'suggested': return 'bg-warning/10 text-warning';
      default: return 'bg-secondary/10 text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'mutual': return 'Mutual';
      case 'following': return 'Following';
      case 'suggested': return 'Suggested';
      default: return 'Connect';
    }
  };

  const getLevelIcon = (level: number) => {
    if (level >= 6) return <Crown className="w-3 h-3" />;
    if (level >= 4) return <Award className="w-3 h-3" />;
    if (level >= 2) return <Star className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  return (
    <Card className="gradient-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-primary" />
            <span>Social Connections</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            247 Connections
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {connections.map((connection) => (
          <div key={connection.id} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-primary/10 hover:bg-background/80 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {connection.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background border-2 border-background rounded-full p-1">
                  {getLevelIcon(connection.level)}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <p className="font-semibold">{connection.username}</p>
                  <Badge variant="outline" className="text-xs">
                    Level {connection.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{connection.handle}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs bg-secondary/10">
                    {connection.specialty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {connection.mutualConnections} mutual connections
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${getStatusColor(connection.status)}`}>
                {getStatusText(connection.status)}
              </Badge>
              
              {connection.status === 'suggested' && (
                <Button size="sm" variant="outline" className="h-8" asChild>
                  <button>
                    <UserPlus className="w-3 h-3 mr-1" />
                    Connect
                  </button>
                </Button>
              )}
              
              {connection.status !== 'suggested' && (
                <Button size="sm" variant="ghost" className="h-8" asChild>
                  <button>
                    <MessageCircle className="w-3 h-3" />
                  </button>
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t border-border">
          <Button variant="outline" className="w-full" size="sm" asChild>
            <button>
              <Users className="w-4 h-4 mr-2" />
              View All Connections
            </button>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};