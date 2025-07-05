import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Share, MessageCircle } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Points System",
    description: "Earn points for every interaction: 1 for likes, 2 for comments, 3 for shares. Unlock tweet submission at 10 points.",
    gradient: "from-pink-500 to-red-500"
  },
  {
    icon: Share,
    title: "Community Focused",
    description: "Join niche communities like InfoFi and content airdrops. Connect with like-minded creators and grow together.",
    gradient: "from-blue-500 to-purple-500"
  },
  {
    icon: MessageCircle,
    title: "Real Engagement",
    description: "Get genuine interactions from community members. No bots, just real people supporting each other's growth.",
    gradient: "from-green-500 to-blue-500"
  }
];

export const Features = () => {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for 
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Growth</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build meaningful connections and grow your X presence authentically.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`} />
                
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};