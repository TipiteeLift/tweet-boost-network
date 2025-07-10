
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, RefreshCw, Wifi, Bug, HelpCircle, Zap, Settings, MessageSquare } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Common Login Issues",
    description: "Resolve problems with signing into your LiftX account.",
    readTime: "3 min read",
    icon: AlertTriangle,
    content: [
      "If you're having trouble logging in, first check that you're using the correct email and password.",
      "Try resetting your password using the 'Forgot Password' link on the login page.",
      "Clear your browser cache and cookies, then try logging in again.",
      "Disable browser extensions that might interfere with the login process.",
      "If you have 2FA enabled, make sure your authenticator app is generating the correct code.",
      "Contact support if you continue to experience login issues after trying these steps."
    ]
  },
  {
    id: 2,
    title: "Post Scheduling Problems",
    description: "Fix issues with scheduling and publishing your social media posts.",
    readTime: "4 min read",
    icon: RefreshCw,
    content: [
      "Post scheduling issues are often related to social media platform connections or permissions.",
      "Check that your social media accounts are still properly connected in your settings.",
      "Verify that LiftX has the necessary permissions to post on your behalf.",
      "Ensure your scheduled posts comply with platform guidelines and character limits.",
      "Check your timezone settings to make sure posts are scheduled for the correct time.",
      "If posts aren't publishing, try reconnecting your social media accounts."
    ]
  },
  {
    id: 3,
    title: "Connection and Sync Issues",
    description: "Troubleshoot problems with platform connections and data synchronization.",
    readTime: "5 min read",
    icon: Wifi,
    content: [
      "Connection issues can prevent LiftX from accessing your social media data and posting content.",
      "Go to your Connected Accounts settings and check the status of each platform connection.",
      "If a connection shows as 'Error' or 'Disconnected', click to reconnect it.",
      "Make sure you're granting all requested permissions when connecting accounts.",
      "Some platforms require periodic re-authentication - this is normal for security reasons.",
      "If data isn't syncing, try manually refreshing your statistics in the dashboard."
    ]
  },
  {
    id: 4,
    title: "Performance and Loading Issues",
    description: "Resolve slow loading times and performance problems.",
    readTime: "3 min read",
    icon: Zap,
    content: [
      "Slow performance can be caused by various factors including internet connection and browser issues.",
      "Check your internet connection speed and stability.",
      "Clear your browser cache and cookies to remove stored data that might slow things down.",
      "Disable unnecessary browser extensions that might be consuming resources.",
      "Try using LiftX in an incognito/private browsing window to rule out extension conflicts.",
      "If problems persist, try using a different browser or device."
    ]
  },
  {
    id: 5,
    title: "Analytics Not Updating",
    description: "Fix issues with analytics data not reflecting recent activity.",
    readTime: "4 min read",
    icon: Bug,
    content: [
      "Analytics data may take some time to update due to social media platform API limitations.",
      "Most platforms update data every 15-30 minutes, so recent activity might not appear immediately.",
      "Check that your social media accounts are still properly connected and authorized.",
      "Some platforms have rate limits that can delay data updates during high usage periods.",
      "Try manually refreshing your analytics dashboard using the refresh button.",
      "If data hasn't updated for several hours, contact support for assistance."
    ]
  },
  {
    id: 6,
    title: "Mobile App Issues",
    description: "Troubleshoot problems with the LiftX mobile application.",
    readTime: "3 min read",
    icon: MessageSquare,
    content: [
      "Mobile app issues can often be resolved by updating to the latest version.",
      "Check your app store for available updates and install them.",
      "Restart the app completely by closing it and reopening it.",
      "Clear the app cache in your phone's settings if performance is slow.",
      "Make sure you have a stable internet connection (WiFi or cellular data).",
      "If the app crashes frequently, try restarting your phone and updating your device's operating system."
    ]
  }
];

interface TroubleshootingArticlesProps {
  selectedArticle?: number;
  onBack?: () => void;
  onArticleSelect?: (articleId: number) => void;
}

export const TroubleshootingArticles = ({ selectedArticle, onBack, onArticleSelect }: TroubleshootingArticlesProps) => {
  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Troubleshooting
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
