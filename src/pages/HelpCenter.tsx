import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, MessageCircle, Book, Shield, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const helpCategories = [
  {
    icon: MessageCircle,
    title: "Getting Started",
    description: "Learn the basics of using LiftX",
    articles: 12
  },
  {
    icon: Book,
    title: "Features & Tools",
    description: "Explore all available features",
    articles: 8
  },
  {
    icon: Shield,
    title: "Account & Security",
    description: "Manage your account settings",
    articles: 6
  },
  {
    icon: Settings,
    title: "Troubleshooting",
    description: "Common issues and solutions",
    articles: 15
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
  return (
    <div className="min-h-screen bg-background">
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
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Help
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Center</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Find answers to your questions and learn how to get the most out of LiftX.
            </p>
            
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search help articles..." 
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                <CardHeader className="text-center">
                  <category.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">{category.description}</p>
                  <p className="text-xs text-primary font-medium">{category.articles} articles</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Popular Articles</h2>
            <div className="space-y-4">
              {popularArticles.map((article, index) => (
                <Card key={index} className="hover:shadow-card transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{article}</span>
                      <ArrowLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;