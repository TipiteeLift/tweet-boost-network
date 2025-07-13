import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MessageSquare, Share, Trophy } from "lucide-react";

export const ProfileActivity = () => {
  const activities = [
    {
      id: 1,
      type: "tweet",
      action: "Published a new tweet",
      description: "Shared insights about crypto market trends",
      timestamp: "2 hours ago",
      icon: MessageSquare,
      color: "text-primary",
      engagements: { likes: 45, comments: 12, shares: 8 }
    },
    {
      id: 2,
      type: "achievement",
      action: "Unlocked achievement",
      description: "Level 5 Explorer milestone reached",
      timestamp: "1 day ago",
      icon: Trophy,
      color: "text-warning"
    },
    {
      id: 3,
      type: "interaction",
      action: "Received 25 likes",
      description: "On your tweet about DeFi protocols",
      timestamp: "2 days ago",
      icon: Heart,
      color: "text-destructive"
    },
    {
      id: 4,
      type: "share",
      action: "Content was shared",
      description: "Your analysis was shared 15 times",
      timestamp: "3 days ago",
      icon: Share,
      color: "text-success"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative">
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg bg-background border ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{activity.action}</h3>
                    <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  
                  {activity.engagements && (
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-destructive" />
                        <span>{activity.engagements.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-primary" />
                        <span>{activity.engagements.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Share className="w-3 h-3 text-success" />
                        <span>{activity.engagements.shares}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {index < activities.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-8 bg-border"></div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};