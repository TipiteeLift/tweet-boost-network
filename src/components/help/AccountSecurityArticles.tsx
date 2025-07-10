
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Key, Lock, Eye, UserCheck, Smartphone } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Account Security Best Practices",
    description: "Keep your LiftX account secure with these essential security tips.",
    readTime: "5 min read",
    icon: Shield,
    content: [
      "Account security is crucial for protecting your social media growth data and personal information.",
      "Use a strong, unique password that combines uppercase letters, lowercase letters, numbers, and symbols.",
      "Never share your login credentials with anyone, including team members or assistants.",
      "Regularly review your account activity and log out of devices you no longer use.",
      "Keep your email address up to date to receive important security notifications.",
      "Enable account recovery options and keep your backup information current."
    ]
  },
  {
    id: 2,
    title: "Two-Factor Authentication Setup",
    description: "Add an extra layer of security to your account with 2FA.",
    readTime: "4 min read",
    icon: Smartphone,
    content: [
      "Two-factor authentication (2FA) significantly improves your account security.",
      "Enable 2FA in your account settings under the Security section.",
      "Choose between SMS-based 2FA or authenticator app (recommended for better security).",
      "Download an authenticator app like Google Authenticator or Authy on your phone.",
      "Scan the QR code or enter the setup key to link your account with the authenticator app.",
      "Always save your backup codes in a secure location in case you lose access to your phone."
    ]
  },
  {
    id: 3,
    title: "Managing Connected Accounts",
    description: "Safely connect and manage your social media accounts.",
    readTime: "3 min read",
    icon: UserCheck,
    content: [
      "LiftX connects to your social media accounts to provide growth insights and automation.",
      "We use secure OAuth protocols to connect to platforms like Twitter, Instagram, and LinkedIn.",
      "Your login credentials are never stored on our servers - only secure access tokens.",
      "You can revoke access to any connected account at any time from your settings.",
      "Regularly review your connected accounts and remove any you no longer use.",
      "If you suspect unauthorized access, immediately revoke all connections and change your passwords."
    ]
  },
  {
    id: 4,
    title: "Password Management",
    description: "Create and maintain strong passwords for your account.",
    readTime: "4 min read",
    icon: Key,
    content: [
      "A strong password is your first line of defense against unauthorized access.",
      "Use a unique password for your LiftX account that you don't use anywhere else.",
      "Consider using a password manager to generate and store complex passwords securely.",
      "Change your password immediately if you suspect it may have been compromised.",
      "Avoid using personal information like birthdays, names, or common words in your password.",
      "Update your password regularly, at least every 6 months for optimal security."
    ]
  },
  {
    id: 5,
    title: "Privacy Settings Guide",
    description: "Control who can see your profile and activity on LiftX.",
    readTime: "3 min read",
    icon: Eye,
    content: [
      "Privacy settings give you control over your visibility and data sharing on LiftX.",
      "Choose whether your profile is public or visible only to your connections.",
      "Control which analytics and insights are shared with the LiftX community.",
      "Decide if you want to appear in leaderboards and public statistics.",
      "Manage email preferences and notification settings to reduce unwanted communications.",
      "Review and update your privacy settings regularly as your needs change."
    ]
  }
];

interface AccountSecurityArticlesProps {
  selectedArticle?: number;
  onBack?: () => void;
  onArticleSelect?: (articleId: number) => void;
}

export const AccountSecurityArticles = ({ selectedArticle, onBack, onArticleSelect }: AccountSecurityArticlesProps) => {
  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 text-gray-300 hover:text-white hover:bg-gray-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Account & Security
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
