import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, Users, TrendingUp, Zap } from "lucide-react";

interface LiveFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LiveUpdate {
  id: string;
  type: 'engagement' | 'user_join' | 'trending' | 'achievement';
  message: string;
  timestamp: Date;
  user?: string;
  community?: string;
}

export const LiveFeedModal = ({ isOpen, onClose }: LiveFeedModalProps) => {
  const [updates, setUpdates] = useState<LiveUpdate[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Simulate live connection
      setIsConnected(true);
      
      // Simulate live updates
      const interval = setInterval(() => {
        const mockUpdates: LiveUpdate[] = [
          {
            id: Date.now().toString(),
            type: 'engagement',
            message: '@cryptodev liked your tweet about InfoFi protocols',
            timestamp: new Date(),
            user: 'cryptodev',
            community: 'InfoFi'
          },
          {
            id: (Date.now() + 1).toString(),
            type: 'user_join',
            message: 'New member joined DeFi Innovators community',
            timestamp: new Date(),
            community: 'DeFi'
          },
          {
            id: (Date.now() + 2).toString(),
            type: 'trending',
            message: '#Web3 is trending with +45% engagement',
            timestamp: new Date()
          },
          {
            id: (Date.now() + 3).toString(),
            type: 'achievement',
            message: 'You unlocked "Engagement Master" badge!',
            timestamp: new Date()
          }
        ];

        const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)];
        setUpdates(prev => [randomUpdate, ...prev.slice(0, 19)]);
      }, 3000);

      return () => {
        clearInterval(interval);
        setIsConnected(false);
      };
    }
  }, [isOpen]);

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'engagement': return Activity;
      case 'user_join': return Users;
      case 'trending': return TrendingUp;
      case 'achievement': return Zap;
      default: return Activity;
    }
  };

  const getUpdateColor = (type: string) => {
    switch (type) {
      case 'engagement': return 'text-blue-500';
      case 'user_join': return 'text-green-500';
      case 'trending': return 'text-orange-500';
      case 'achievement': return 'text-purple-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Activity className="w-5 h-5" />
            <span>Live Feed</span>
            <Badge 
              variant={isConnected ? "default" : "secondary"}
              className={isConnected ? "bg-green-500" : ""}
            >
              {isConnected ? "🟢 Live" : "🔴 Offline"}
            </Badge>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-primary">24</div>
                <div className="text-xs text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-success">156</div>
                <div className="text-xs text-muted-foreground">Live Actions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-warning">8</div>
                <div className="text-xs text-muted-foreground">Trending</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-lg font-bold text-purple-500">12</div>
                <div className="text-xs text-muted-foreground">New Badges</div>
              </CardContent>
            </Card>
          </div>

          {/* Live Updates */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            <h3 className="font-semibold text-sm text-muted-foreground">Real-time Updates</h3>
            {updates.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Waiting for live updates...</p>
              </div>
            ) : (
              updates.map((update) => {
                const IconComponent = getUpdateIcon(update.type);
                return (
                  <div
                    key={update.id}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 animate-fade-in"
                  >
                    <div className={`p-2 rounded-full bg-background ${getUpdateColor(update.type)}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{update.message}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {update.timestamp.toLocaleTimeString()}
                        </span>
                        {update.community && (
                          <Badge variant="outline" className="text-xs">
                            {update.community}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};