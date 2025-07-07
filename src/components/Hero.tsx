import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-background.jpg";

interface HeroProps {
  onGetStarted?: () => void;
}

export const Hero = ({ onGetStarted }: HeroProps) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 container text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
          Grow Your X Following
          <br />
          <span className="text-3xl md:text-5xl">Together</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Join LiftX to connect with niche communities like InfoFi and content creators. 
          Earn points by engaging with tweets, unlock submission privileges, and grow your X presence through mutual support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="xl" onClick={handleGetStarted}>
            Get Started Free
          </Button>
          <Button variant="outline" size="xl">
            Learn More
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-success">2.5M+</div>
            <div className="text-sm text-muted-foreground">Tweet Interactions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-warning">95%</div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};