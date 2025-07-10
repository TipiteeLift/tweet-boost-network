
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, RefreshCw, Wifi, Settings, HelpCircle, Bug, Zap, Database, Shield, Users, Lock, CheckCircle, XCircle, Clock, Mail } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Common Login Issues",
    description: "Troubleshoot problems with signing in to your LiftX account.",
    readTime: "3 min read",
    icon: Lock,
    content: [
      "Login issues are among the most common problems users experience, but they're usually easy to resolve.",
      "First, ensure you're using the correct email address and password. Double-check for typos and case sensitivity.",
      "If you've forgotten your password, use the 'Forgot Password' link to reset it via email.",
      "Clear your browser's cache and cookies, then try logging in again with a fresh browser session.",
      "Check if your account has been temporarily locked due to multiple failed login attempts.",
      "Ensure your internet connection is stable and try accessing LiftX from a different browser or device.",
      "If you're using two-factor authentication, make sure your authenticator app is working correctly.",
      "Contact our support team if the issue persists after trying these solutions."
    ]
  },
  {
    id: 2,
    title: "Content Not Publishing",
    description: "Fix issues with your posts not appearing on social media platforms.",
    readTime: "4 min read",
    icon: XCircle,
    content: [
      "When your content doesn't publish as expected, there are several potential causes to investigate.",
      "Verify that your social media accounts are still properly connected to LiftX.",
      "Check if your social media platforms have updated their API or terms of service.",
      "Ensure your content complies with platform guidelines (character limits, image sizes, etc.).",
      "Review your posting schedule to confirm the content was set to publish at the right time.",
      "Check your account's posting permissions and ensure LiftX has the necessary access.",
      "Look for any error messages in your activity log or notifications.",
      "Try republishing the content manually to see if it resolves the issue."
    ]
  },
  {
    id: 3,
    title: "Analytics Not Loading",
    description: "Resolve problems with your analytics dashboard not displaying data.",
    readTime: "3 min read",
    icon: BarChart,
    content: [
      "Analytics loading issues can be frustrating, but they're often related to data synchronization.",
      "Wait a few minutes and refresh the page, as analytics data may take time to process.",
      "Check if you have sufficient data for the selected time period (some metrics require minimum activity).",
      "Verify that your connected social media accounts are active and generating data.",
      "Clear your browser cache and cookies, then reload the analytics dashboard.",
      "Try switching to a different time range to see if data appears for other periods.",
      "Ensure your account has the necessary permissions to access analytics data.",
      "Contact support if analytics remain unavailable after 24 hours."
    ]
  },
  {
    id: 4,
    title: "Account Connection Problems",
    description: "Fix issues connecting your social media accounts to LiftX.",
    readTime: "5 min read",
    icon: Wifi,
    content: [
      "Account connection issues can prevent LiftX from accessing your social media data and posting content.",
      "Start by disconnecting and reconnecting the problematic social media account.",
      "Ensure you're logged into the correct social media account before connecting to LiftX.",
      "Check if the social media platform is experiencing outages or API issues.",
      "Verify that you have admin permissions for business accounts you're trying to connect.",
      "Clear your browser's cache and cookies before attempting to reconnect.",
      "Try connecting from a different browser or in incognito/private mode.",
      "Make sure you complete the entire authorization process without closing the popup window.",
      "Review your social media account's connected apps settings to ensure LiftX has proper permissions."
    ]
  },
  {
    id: 5,
    title: "Performance Issues",
    description: "Improve slow loading times and app responsiveness.",
    readTime: "4 min read",
    icon: Zap,
    content: [
      "Slow performance can significantly impact your LiftX experience, but there are ways to improve it.",
      "Check your internet connection speed and stability using a speed test tool.",
      "Close unnecessary browser tabs and applications that might be consuming system resources.",
      "Clear your browser's cache, cookies, and temporary files regularly.",
      "Try using LiftX in a different browser to see if the issue is browser-specific.",
      "Disable browser extensions that might interfere with LiftX's functionality.",
      "Ensure your browser is updated to the latest version for optimal performance.",
      "If using a mobile device, close other apps running in the background.",
      "Consider using LiftX during off-peak hours when server load might be lower."
    ]
  },
  {
    id: 6,
    title: "Missing Features or Options",
    description: "Find features that seem to be missing from your account.",
    readTime: "3 min read",
    icon: HelpCircle,
    content: [
      "Sometimes features might appear missing due to account settings or subscription limitations.",
      "Check your account subscription level to ensure you have access to the features you're looking for.",
      "Review your account settings to see if certain features have been disabled.",
      "Look for features in different menu locations, as the interface may have been updated.",
      "Clear your browser cache and reload the page to ensure you're seeing the latest interface.",
      "Check if there are any announcements about feature updates or maintenance.",
      "Verify that your account permissions allow access to the specific features.",
      "Contact support if you believe you should have access to features that aren't appearing."
    ]
  },
  {
    id: 7,
    title: "Notification Problems",
    description: "Fix issues with email notifications and in-app alerts.",
    readTime: "3 min read",
    icon: Mail,
    content: [
      "Notification issues can cause you to miss important updates about your social media activity.",
      "Check your notification settings in your LiftX account preferences.",
      "Verify that your email address is correct and confirmed in your account settings.",
      "Look in your email spam/junk folder for LiftX notifications.",
      "Add LiftX's email addresses to your email whitelist or contacts.",
      "Check if your email provider has any filters blocking automated emails.",
      "Review your browser's notification permissions for the LiftX website.",
      "Test notifications by triggering a simple action and checking if you receive an alert.",
      "Update your communication preferences if you want to change notification frequency."
    ]
  },
  {
    id: 8,
    title: "Data Sync Issues",
    description: "Resolve problems with data not syncing between platforms.",
    readTime: "4 min read",
    icon: RefreshCw,
    content: [
      "Data synchronization ensures your information stays consistent across all connected platforms.",
      "Check the last sync time in your account settings to see when data was last updated.",
      "Manually trigger a sync by disconnecting and reconnecting your social media accounts.",
      "Verify that all your social media accounts are active and accessible.",
      "Check if there are any API rate limits that might be affecting data synchronization.",
      "Look for any error messages in your activity log that might indicate sync problems.",
      "Ensure your connected accounts haven't changed passwords or security settings.",
      "Wait for the next automatic sync cycle, which typically occurs every few hours.",
      "Contact support if data hasn't synced for more than 24 hours."
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
        <Button variant="ghost" onClick={onBack} className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Troubleshooting
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
