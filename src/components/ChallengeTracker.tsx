import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Target, Clock, Star, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Challenge {
  id: string;
  title: string;
  description: string;
  points_reward: number;
  target_value: number;
  challenge_type: string;
  time_limit_hours?: number;
  created_at: string;
  expires_at?: string;
}

interface UserChallenge {
  id: string;
  challenge_id: string;
  current_progress: number;
  is_completed: boolean;
  completed_at?: string;
  challenge: Challenge;
}

export const ChallengeTracker = () => {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChallenges = async () => {
    if (!user) return;
    
    try {
      // For now, use mock data since challenges table isn't in types yet
      const mockChallenges: UserChallenge[] = [
        {
          id: '1',
          challenge_id: '1',
          current_progress: 3,
          is_completed: false,
          challenge: {
            id: '1',
            title: 'Social Butterfly',
            description: 'Like 10 tweets today',
            points_reward: 50,
            target_value: 10,
            challenge_type: 'likes',
            created_at: new Date().toISOString(),
            expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          }
        },
        {
          id: '2',
          challenge_id: '2',
          current_progress: 1,
          is_completed: false,
          challenge: {
            id: '2',
            title: 'Engagement Master',
            description: 'Comment on 5 tweets',
            points_reward: 100,
            target_value: 5,
            challenge_type: 'comments',
            created_at: new Date().toISOString()
          }
        }
      ];
      
      setChallenges(mockChallenges);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, [user]);

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case 'likes':
        return <Target className="w-4 h-4" />;
      case 'comments':
        return <Trophy className="w-4 h-4" />;
      case 'shares':
        return <Zap className="w-4 h-4" />;
      default:
        return <Star className="w-4 h-4" />;
    }
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-warning';
    if (progress >= 50) return 'bg-primary';
    return 'bg-muted-foreground';
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Sign in to view challenges</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-warning" />
            <span>Active Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-muted rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-warning" />
          <span>Active Challenges</span>
          <Badge variant="secondary">{challenges.length}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.length === 0 ? (
          <div className="text-center py-6">
            <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
            <p className="text-muted-foreground">No active challenges</p>
            <p className="text-xs text-muted-foreground">Check back later for new challenges!</p>
          </div>
        ) : (
          challenges.map((userChallenge) => {
            const challenge = userChallenge.challenge;
            const progress = Math.min((userChallenge.current_progress / challenge.target_value) * 100, 100);
            
            return (
              <div
                key={userChallenge.id}
                className="p-4 rounded-lg border border-border hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {getChallengeIcon(challenge.challenge_type)}
                    </div>
                     <div className="min-w-0 flex-1">
                       <h4 className="font-medium text-sm truncate">{challenge.title}</h4>
                       <p className="text-xs text-muted-foreground truncate">{challenge.description}</p>
                     </div>
                  </div>
                  
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      {challenge.points_reward}pts
                    </Badge>
                    {challenge.expires_at && (
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {getTimeRemaining(challenge.expires_at)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      {userChallenge.current_progress} / {challenge.target_value}
                    </span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  
                  <Progress 
                    value={progress} 
                    className="h-2"
                  />
                  
                  {progress >= 100 && !userChallenge.is_completed && (
                    <Button size="sm" className="w-full mt-2">
                      Claim Reward
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};