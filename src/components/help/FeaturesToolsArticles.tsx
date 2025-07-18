
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, BarChart, Calendar, Target, Sparkles, Bot, Camera, TrendingUp } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Content Scheduler",
    description: "Schedule your posts for optimal engagement times across all platforms.",
    readTime: "4 min read",
    icon: Calendar,
    content: [
      "The Content Scheduler helps you plan and automate your social media posts for maximum impact.",
      "Choose the best times to post based on your audience's activity patterns.",
      "Schedule posts up to 30 days in advance and maintain consistent posting schedules.",
      "Preview your content before it goes live and make last-minute adjustments.",
      "Track scheduled posts and get notifications when they're published.",
      "Bulk scheduling allows you to plan entire weeks of content in advance."
    ]
  },
  {
    id: 2,
    title: "AI Content Assistant",
    description: "Get AI-powered suggestions for captions, hashtags, and content ideas.",
    readTime: "5 min read",
    icon: Bot,
    content: [
      "Our AI Content Assistant analyzes trending topics and your audience preferences.",
      "Generate engaging captions that match your brand voice and style.",
      "Get hashtag suggestions that will increase your content's discoverability.",
      "Receive content ideas based on what's performing well in your niche.",
      "Optimize your content for different platforms with platform-specific recommendations.",
      "The AI learns from your successful posts to provide better suggestions over time."
    ]
  },
  {
    id: 3,
    title: "Analytics Dashboard",
    description: "Track your growth with detailed analytics and insights.",
    readTime: "6 min read",
    icon: BarChart,
    content: [
      "The Analytics Dashboard provides comprehensive insights into your social media performance.",
      "Track key metrics like engagement rate, reach, impressions, and follower growth.",
      "Identify your best-performing content and understand what resonates with your audience.",
      "Monitor competitor performance and benchmark your growth against industry standards.",
      "Export reports and share insights with your team or clients.",
      "Set up custom alerts for significant changes in your metrics."
    ]
  },
  {
    id: 4,
    title: "Growth Optimizer",
    description: "Automatically optimize your strategy based on performance data.",
    readTime: "4 min read",
    icon: TrendingUp,
    content: [
      "The Growth Optimizer uses machine learning to improve your social media strategy.",
      "Automatically adjust posting times based on when your audience is most active.",
      "Receive personalized recommendations for content types and topics.",
      "Get alerts when trending opportunities arise in your niche.",
      "Track your optimization score and see how changes impact your growth.",
      "The system continuously learns and adapts to improve your results."
    ]
  }
];

interface FeaturesToolsArticlesProps {
  selectedArticle?: number;
  onBack?: () => void;
  onArticleSelect?: (articleId: number) => void;
}

export const FeaturesToolsArticles = ({ selectedArticle, onBack, onArticleSelect }: FeaturesToolsArticlesProps) => {
  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Features & Tools
        </Button>
        
        <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-700 p-8">
          <div className="flex items-center gap-3 mb-4">
            <article.icon className="h-6 w-6 text-primary" />
            <span className="text-sm text-gray-400">{article.readTime}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4 text-white">{article.title}</h1>
          <p className="text-lg text-gray-300 mb-8">{article.description}</p>
          
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-300 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card 
          key={article.id} 
          className="hover:shadow-md transition-all duration-300 cursor-pointer bg-gray-800 border-gray-700 hover:bg-gray-750"
          onClick={() => onArticleSelect?.(article.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <article.icon className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg text-white">{article.title}</CardTitle>
                  <p className="text-sm text-gray-400 mt-1">{article.readTime}</p>
                </div>
              </div>
              <ArrowLeft className="h-4 w-4 rotate-180 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{article.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
