
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Communities } from "@/components/Communities";
import { Analytics } from "@/components/Analytics";
import { Testimonials } from "@/components/Testimonials";
import { RecentTweetsShowcase } from "@/components/RecentTweetsShowcase";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

export const HomePage = ({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) => {
  const [activeTab, setActiveTab] = useState("features");
  const { user, signInWithX, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithX();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={handleSignIn} user={user} activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* If user is logged in, show a sign out option prominently */}
      {user && (
        <div className="bg-primary/5 border-b">
          <div className="container py-3 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              You are signed in as {user.email}
            </span>
            <Button 
              onClick={signOut}
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
            >
              Sign Out
            </Button>
          </div>
        </div>
      )}
      
      <main>
        <Hero onGetStarted={handleGetStarted} />
        
        <RecentTweetsShowcase />
        
        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b">
            <div className="container">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 my-4">
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="communities">Communities</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="features" className="mt-0">
            <Features />
          </TabsContent>
          <TabsContent value="communities" className="mt-0">
            <Communities />
          </TabsContent>
          <TabsContent value="analytics" className="mt-0">
            <Analytics />
          </TabsContent>
        </Tabs>
        
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your X Following?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of creators already growing their X following through strategic engagement and authentic connections.
            </p>
            <Button variant="hero" size="xl" onClick={handleGetStarted}>
              Start Growing Today
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow" />
                <span className="text-lg font-bold">LiftX</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting X users for mutual growth and authentic engagement.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/features" className="block hover:text-primary transition-colors">Features</Link>
                <Link to="/communities" className="block hover:text-primary transition-colors">Communities</Link>
                <Link to="/analytics" className="block hover:text-primary transition-colors">Analytics</Link>
                <Link to="/pricing" className="block hover:text-primary transition-colors">Pricing</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Communities</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/communities" className="block hover:text-primary transition-colors">InfoFi</Link>
                <Link to="/communities" className="block hover:text-primary transition-colors">Content Airdrops</Link>
                <Link to="/communities" className="block hover:text-primary transition-colors">DeFi</Link>
                <Link to="/communities" className="block hover:text-primary transition-colors">Web3 Builders</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/help" className="block hover:text-primary transition-colors">Help Center</Link>
                <Link to="/contact" className="block hover:text-primary transition-colors">Contact Us</Link>
                <Link to="/api-docs" className="block hover:text-primary transition-colors">API Docs</Link>
                <Link to="/status" className="block hover:text-primary transition-colors">Status</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left text-sm text-muted-foreground mb-4 md:mb-0">
              © 2024 LiftX. All rights reserved. Built for the X community.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
          </div>
          
        </div>
      </footer>
    </div>
  );
};
