import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Users, Zap, Target, Calendar } from "lucide-react";

const analyticsData = [
  {
    title: "Engagement Rate",
    value: "12.5%",
    change: "+2.3%",
    trend: "up",
    description: "Average engagement across all your tweets"
  },
  {
    title: "Follower Growth",
    value: "147",
    change: "+23",
    trend: "up", 
    description: "New followers this week"
  },
  {
    title: "Points Earned",
    value: "2,341",
    change: "+156",
    trend: "up",
    description: "Total points from community interactions"
  },
  {
    title: "Community Rank",
    value: "#23",
    change: "+5",
    trend: "up",
    description: "Your ranking in active communities"
  }
];

const insights = [
  {
    icon: Target,
    title: "Peak Engagement Hours",
    description: "Your best engagement happens between 2-4 PM EST. Schedule your most important tweets during this window.",
    metric: "3x higher engagement"
  },
  {
    icon: Users,
    title: "Top Performing Content",
    description: "Educational threads about DeFi perform 40% better than other content types in your communities.",
    metric: "40% better performance"
  },
  {
    icon: Calendar,
    title: "Optimal Posting Frequency",
    description: "You get the best results posting 3-4 times per day with 2-hour intervals between posts.",
    metric: "Best frequency: 3-4 posts/day"
  }
];

export const Analytics = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful 
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Analytics</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your growth, understand your audience, and optimize your content strategy with detailed insights.
          </p>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {analyticsData.map((metric, index) => (
            <Card key={index} className="relative overflow-hidden border-0 bg-gradient-card">
              <CardHeader className="pb-2">
                <CardDescription className="text-sm">{metric.title}</CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl font-bold">{metric.value}</CardTitle>
                  <Badge variant={metric.trend === "up" ? "default" : "destructive"} className="text-xs">
                    {metric.change}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">{metric.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Growth Chart Placeholder */}
        <Card className="mb-12 border-0 bg-gradient-card">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <CardTitle>Growth Overview</CardTitle>
            </div>
            <CardDescription>Your performance over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Engagement Rate</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Follower Growth</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Content Quality Score</span>
                  <span>91%</span>
                </div>
                <Progress value={91} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Community Participation</span>
                  <span>68%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">
            AI-Powered <span className="text-primary">Insights</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => {
              const IconComponent = insight.icon;
              return (
                <Card key={index} className="border-0 bg-gradient-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <CardDescription className="text-sm leading-relaxed">
                      {insight.description}
                    </CardDescription>
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {insight.metric}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};