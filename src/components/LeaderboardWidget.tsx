import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeaderboardEntry {
  user_id: string;
  display_name: string;
  handle: string;
  avatar_url?: string;
  points: number;
  level?: number;
}

interface LeaderboardWidgetProps {
  community?: string;
  compact?: boolean;
}

export const LeaderboardWidget = ({ community, compact = false }: LeaderboardWidgetProps) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'all-time'>('weekly');
  const [loading, setLoading] = useState(false);

  const fetchLeaderboard = async (selectedTimeframe: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('get-leaderboards', {
        body: { timeframe: selectedTimeframe, community, limit: compact ? 5 : 10 }
      });

      if (error) throw error;
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(timeframe);
  }, [timeframe, community]);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="w-5 h-5 text-warning" />;
      case 2:
        return <Trophy className="w-5 h-5 text-muted-foreground" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-500" />;
      default:
        return <Award className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const LeaderboardContent = () => (
    <div className="space-y-3">
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent mx-auto"></div>
        </div>
      ) : leaderboard.length > 0 ? (
        leaderboard.map((entry, index) => (
          <div key={entry.user_id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-center w-8 h-8">
              {index < 3 ? getRankIcon(index + 1) : (
                <span className="text-sm font-medium text-muted-foreground">#{index + 1}</span>
              )}
            </div>
            
            <Avatar className="w-8 h-8">
              <AvatarImage src={entry.avatar_url} alt={entry.display_name} />
              <AvatarFallback>{entry.display_name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">{entry.display_name}</div>
              <div className="text-xs text-muted-foreground">@{entry.handle}</div>
            </div>
            
            <div className="text-right">
              <div className="font-semibold text-sm text-primary">{entry.points}</div>
              {entry.level && (
                <Badge variant="outline" className="text-xs">L{entry.level}</Badge>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-4 text-muted-foreground">
          No leaderboard data available
        </div>
      )}
    </div>
  );

  if (compact) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-warning" />
            <span>Top Performers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LeaderboardContent />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-warning" />
          <span>Leaderboard</span>
          {community && (
            <Badge variant="secondary">{community}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="mb-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="all-time">All Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value={timeframe} className="mt-4">
            <LeaderboardContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};