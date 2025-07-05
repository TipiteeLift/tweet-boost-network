import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommunityLeaderboard } from "./CommunityLeaderboard";
import { TrendingUp, Users, Clock } from "lucide-react";

export const InsightsSidebar = () => {
  const weeklyActivity = [
    { day: "M", active: true },
    { day: "T", active: false },
    { day: "W", active: true },
    { day: "T", active: true },
    { day: "F", active: false },
    { day: "S", active: true },
    { day: "S", active: false },
  ];

  const trendingTags = [
    { tag: "#InfoFi", active: true, trend: "+23%" },
    { tag: "#DataEconomy", active: false, trend: "+15%" },
    { tag: "#Web3", active: false, trend: "+8%" },
  ];

  const peakHours = [
    { time: "9-11 AM", active: false },
    { time: "2-4 PM", active: true },
    { time: "7-9 PM", active: false },
  ];

  return (
    <div className="w-80 p-4 space-y-4">
      {/* Community Leaderboard */}
      <CommunityLeaderboard />
      
      {/* #InfoFi Insights */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            #InfoFi Insights
            <Badge variant="secondary" className="bg-success/10 text-success text-xs">
              +23.5% this week
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Growth Rate & Engagement */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="w-4 h-4 text-muted-foreground mr-1" />
              </div>
              <div className="text-lg font-bold text-success">+23.5%</div>
              <div className="text-xs text-muted-foreground">Growth Rate</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-muted-foreground mr-1" />
              </div>
              <div className="text-lg font-bold text-warning">87.3%</div>
              <div className="text-xs text-muted-foreground">Engagement</div>
            </div>
          </div>

          {/* Weekly Activity Calendar */}
          <div>
            <div className="text-sm font-medium mb-2">Weekly Activity</div>
            <div className="grid grid-cols-7 gap-1">
              {weeklyActivity.map((day, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                  <div 
                    className={`w-6 h-6 rounded-sm mx-auto ${
                      day.active ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="text-right text-xs text-muted-foreground mt-1">
              Mon → Sun
            </div>
          </div>

          {/* Trending Tags */}
          <div>
            <div className="text-sm font-medium mb-2">Trending Tags</div>
            <div className="space-y-2">
              {trendingTags.map((item, index) => (
                <div 
                  key={index}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    item.active ? 'bg-primary/10 border border-primary/20' : 'bg-muted/50 hover:bg-muted'
                  }`}
                >
                  <Badge 
                    variant={item.active ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.tag}
                  </Badge>
                  <span className="text-xs text-success font-medium">{item.trend}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Peak Hours */}
          <div>
            <div className="text-sm font-medium mb-2">Peak Hours</div>
            <div className="space-y-1">
              {peakHours.map((hour, index) => (
                <div 
                  key={index}
                  className={`text-xs p-2 rounded ${
                    hour.active ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
                  }`}
                >
                  <Clock className="w-3 h-3 inline mr-1" />
                  {hour.time}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between">
            #InfoFi
            <Badge variant="outline" className="text-xs">
              Last 7 days
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-2xl font-bold">Analytics</div>
            <div className="text-sm text-muted-foreground mt-1">
              Detailed insights coming soon
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};