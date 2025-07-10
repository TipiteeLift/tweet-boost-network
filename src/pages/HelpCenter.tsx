
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageCircle, Book, Shield, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { GettingStartedArticles } from "@/components/help/GettingStartedArticles";
import { FeaturesToolsArticles } from "@/components/help/FeaturesToolsArticles";
import { AccountSecurityArticles } from "@/components/help/AccountSecurityArticles";
import { TroubleshootingArticles } from "@/components/help/TroubleshootingArticles";

const helpCategories = [
  {
    icon: MessageCircle,
    title: "Getting Started",
    description: "Learn the basics of using LiftX",
    articles: 12,
    id: "getting-started"
  },
  {
    icon: Book,
    title: "Features & Tools",
    description: "Explore all available features",
    articles: 8,
    id: "features-tools"
  },
  {
    icon: Shield,
    title: "Account & Security",
    description: "Manage your account settings",
    articles: 6,
    id: "account-security"
  },
  {
    icon: Settings,
    title: "Troubleshooting",
    description: "Common issues and solutions",
    articles: 15,
    id: "troubleshooting"
  }
];

const popularArticles = [
  "How to submit your first tweet",
  "Understanding the points system",
  "Joining communities effectively",
  "Setting up your profile",
  "Best practices for engagement"
];

const HelpCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedArticle(null);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handleArticleSelect = (articleId: number) => {
    setSelectedArticle(articleId);
  };

  const renderArticleComponent = () => {
    switch (selectedCategory) {
      case "getting-started":
        return <GettingStartedArticles selectedArticle={selectedArticle || undefined} onBack={handleBackToArticles} onArticleSelect={handleArticleSelect} />;
      case "features-tools":
        return <FeaturesToolsArticles selectedArticle={selectedArticle || undefined} onBack={handleBackToArticles} onArticleSelect={handleArticleSelect} />;
      case "account-security":
        return <AccountSecurityArticles selectedArticle={selectedArticle || undefined} onBack={handleBackToArticles} onArticleSelect={handleArticleSelect} />;
      case "troubleshooting":
        return <TroubleshootingArticles selectedArticle={selectedArticle || undefined} onBack={handleBackToArticles} onArticleSelect={handleArticleSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onSignIn={() => {}} user={null} activeTab="" onTabChange={() => {}} />
      
      <main className="pt-16">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          {!selectedCategory ? (
            <>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                  Help
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Center</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
                  Find answers to your questions and learn how to get the most out of LiftX.
                </p>
                
                <div className="max-w-md mx-auto relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search help articles..." 
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {helpCategories.map((category, index) => (
                  <Card 
                    key={index} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-gray-200 hover:border-primary/20"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <CardHeader className="text-center">
                      <category.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                      <CardTitle className="text-lg text-gray-900">{category.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                      <p className="text-xs text-primary font-medium">{category.articles} articles</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Popular Articles</h2>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <Card key={index} className="hover:shadow-md transition-all duration-300 cursor-pointer bg-white border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{article}</span>
                          <ArrowLeft className="h-4 w-4 rotate-180 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              {!selectedArticle && (
                <div className="mb-8">
                  <Button variant="ghost" onClick={handleBackToCategories} className="mb-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Help Center
                  </Button>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {helpCategories.find(cat => cat.id === selectedCategory)?.title}
                  </h1>
                  <p className="text-gray-600">
                    {helpCategories.find(cat => cat.id === selectedCategory)?.description}
                  </p>
                </div>
              )}
              {renderArticleComponent()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
