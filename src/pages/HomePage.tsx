import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Communities } from "@/components/Communities";
import { Analytics } from "@/components/Analytics";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";

export const HomePage = ({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) => {
  const [activeTab, setActiveTab] = useState("features");
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
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
      
      <main>
        <Hero onGetStarted={handleGetStarted} />
        
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
                <div>Features</div>
                <div>Communities</div>
                <div>Analytics</div>
                <div>Pricing</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Communities</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>InfoFi</div>
                <div>Content Airdrops</div>
                <div>DeFi</div>
                <div>Web3 Builders</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>API Docs</div>
                <div>Status</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 LiftX. All rights reserved. Built for the X community.
          </div>
        </div>
      </footer>
    </div>
  );
};