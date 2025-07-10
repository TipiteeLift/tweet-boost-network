import { Header } from "@/components/Header";
import { Analytics as AnalyticsComponent } from "@/components/Analytics";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={() => {}} user={null} activeTab="analytics" onTabChange={() => {}} />
      
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
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Advanced
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Analytics</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Track your growth, understand your audience, and optimize your content strategy with powerful analytics.
            </p>
          </div>
        </div>
        
        <AnalyticsComponent />
      </main>
    </div>
  );
};

export default Analytics;