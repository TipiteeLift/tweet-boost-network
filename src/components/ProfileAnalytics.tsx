import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WeeklyEngagementChart } from "@/components/WeeklyEngagementChart";
import { BarChart3, TrendingUp, Users, Eye, Target } from "lucide-react";

export const ProfileAnalytics = () => {
  const analyticsData = [
    {
      title: "Profile Views",
      value: "12,543",
      change: "+15.3%",
      period: "vs last month",
      icon: Eye,
      color: "text-primary"
    },
    {
      title: "Engagement Rate",
      value: "8.7%",
      change: "+2.1%",
      period: "vs last week",
      icon: TrendingUp,
      color: "text-success"
    },
    {
      title: "Followers Growth",
      value: "+247",
      change: "+12%",
      period: "this month",
      icon: Users,
      color: "text-warning"
    },
    {
      title: "Content Reach",
      value: "45.2K",
      change: "+8.9%",
      period: "vs last month",
      icon: Target,
      color: "text-secondary"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((item) => (
          <Card key={item.title}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <item.icon className={`w-4 h-4 ${item.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {item.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.period}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Engagement Chart */}
      <WeeklyEngagementChart />

      {/* Detailed Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Detailed Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
              <div>
                <h3 className="font-semibold">Best Performing Content</h3>
                <p className="text-sm text-muted-foreground">Your crypto analysis post</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">2.3K</p>
                <p className="text-xs text-muted-foreground">Total engagements</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-success/5 rounded-lg">
              <div>
                <h3 className="font-semibold">Peak Engagement Time</h3>
                <p className="text-sm text-muted-foreground">2:00 PM - 4:00 PM EST</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-success">67%</p>
                <p className="text-xs text-muted-foreground">Above average</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};