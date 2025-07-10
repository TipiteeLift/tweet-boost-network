
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Users, Trophy, Settings } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Welcome to LiftX - Your First Steps",
    description: "Learn the basics of LiftX and how to get started with your social media growth journey.",
    readTime: "3 min read",
    icon: Play,
    content: [
      "LiftX is a social media growth platform designed to help you build authentic engagement and grow your following organically.",
      "To get started, simply create your account and connect your social media profiles.",
      "Our AI-powered system will analyze your content and provide personalized recommendations.",
      "Set your growth goals and let LiftX guide you through the process step by step.",
      "The dashboard provides you with real-time analytics to track your progress and optimize your strategy."
    ]
  },
  {
    id: 2,
    title: "Setting Up Your Profile",
    description: "Complete your profile setup to maximize your growth potential.",
    readTime: "5 min read", 
    icon: Users,
    content: [
      "A complete profile is essential for building trust and attracting followers.",
      "Upload a professional profile picture that represents your brand or personality.",
      "Write a compelling bio that clearly states what you do and what value you provide.",
      "Add your website, location, and other relevant contact information.",
      "Choose your niche and interests to help our algorithm connect you with the right audience.",
      "Regular profile updates help maintain engagement and show you're active."
    ]
  },
  {
    id: 3,
    title: "Understanding the Points System",
    description: "Learn how our points system works and how to earn rewards.",
    readTime: "4 min read",
    icon: Trophy,
    content: [
      "LiftX uses a points-based system to gamify your social media growth journey.",
      "Earn points by completing daily challenges, engaging with content, and achieving milestones.",
      "Points can be redeemed for premium features, analytics insights, and exclusive content.",
      "The more active you are, the more points you'll earn and the faster you'll grow.",
      "Check your points balance in the dashboard and track your progress over time.",
      "Bonus points are awarded for consistent daily activity and community participation."
    ]
  },
  {
    id: 4,
    title: "Basic Settings and Preferences",
    description: "Customize LiftX to match your preferences and workflow.",
    readTime: "3 min read",
    icon: Settings,
    content: [
      "Access your settings from the main menu to customize your LiftX experience.",
      "Set your posting schedule preferences and timezone for optimal timing.",
      "Choose your notification preferences to stay informed without being overwhelmed.",
      "Configure privacy settings to control who can see your profile and activities.",
      "Set up integrations with your favorite social media management tools.",
      "Enable or disable specific features based on your needs and preferences."
    ]
  }
];

interface GettingStartedArticlesProps {
  selectedArticle?: number;
  onBack?: () => void;
  onArticleSelect?: (articleId: number) => void;
}

export const GettingStartedArticles = ({ selectedArticle, onBack, onArticleSelect }: GettingStartedArticlesProps) => {
  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Getting Started
        </Button>
        
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="flex items-center gap-3 mb-4">
            <article.icon className="h-6 w-6 text-primary" />
            <span className="text-sm text-gray-500">{article.readTime}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{article.description}</p>
          
          <div className="prose prose-lg max-w-none">
            {article.content.map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
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
          className="hover:shadow-md transition-all duration-300 cursor-pointer bg-white border-gray-200"
          onClick={() => onArticleSelect?.(article.id)}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <article.icon className="h-5 w-5 text-primary" />
                <div>
                  <CardTitle className="text-lg text-gray-900">{article.title}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{article.readTime}</p>
                </div>
              </div>
              <ArrowLeft className="h-4 w-4 rotate-180 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{article.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
