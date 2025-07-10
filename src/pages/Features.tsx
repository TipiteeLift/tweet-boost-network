import { Header } from "@/components/Header";
import { Features as FeaturesComponent } from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={() => {}} user={null} activeTab="features" onTabChange={() => {}} />
      
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
              Powerful Features for
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> X Growth</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Discover all the tools and features that make LiftX the ultimate platform for growing your X presence.
            </p>
          </div>
        </div>
        
        <FeaturesComponent />
      </main>
    </div>
  );
};

export default Features;