import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";

export const HomePage = ({ onNavigateToDashboard }: { onNavigateToDashboard: () => void }) => {
  const [user, setUser] = useState<{ name: string; avatar: string; points: number } | null>(null);

  const handleSignIn = () => {
    // Mock sign-in - in real app this would integrate with X API
    setUser({
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      points: 25
    });
    setTimeout(() => {
      onNavigateToDashboard();
    }, 1000);
  };

  const handleGetStarted = () => {
    handleSignIn();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={handleSignIn} user={user} />
      
      <main>
        <Hero onGetStarted={handleGetStarted} />
        <Features />
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Grow Your X Following?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of creators already growing their audience through mutual support and genuine engagement.
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