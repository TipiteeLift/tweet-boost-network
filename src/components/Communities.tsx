import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, Zap, Globe } from "lucide-react";

const communities = [
  {
    name: "InfoFi",
    description: "Connect with DeFi enthusiasts and learn about the latest protocols, yield farming strategies, and market insights.",
    members: "12.5K",
    engagement: "High",
    tags: ["DeFi", "Yield Farming", "Protocols"],
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Content Airdrops",
    description: "Stay updated on the latest airdrops, token distributions, and crypto opportunities. Share alpha and grow together.",
    members: "8.3K",
    engagement: "Very High",
    tags: ["Airdrops", "Alpha", "Tokens"],
    icon: Zap,
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Web3 Builders",
    description: "A community for developers, entrepreneurs, and innovators building the future of decentralized applications.",
    members: "15.2K",
    engagement: "Medium",
    tags: ["Development", "dApps", "Innovation"],
    icon: Globe,
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Crypto Twitter",
    description: "General crypto discussion, market analysis, news, and community interactions for all crypto enthusiasts.",
    members: "25.7K",
    engagement: "High",
    tags: ["Trading", "News", "Analysis"],
    icon: Users,
    gradient: "from-orange-500 to-red-500"
  }
];

export const Communities = () => {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Thriving 
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Communities</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with like-minded creators in specialized communities. Share knowledge, support each other, and grow your network.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communities.map((community, index) => {
            const IconComponent = community.icon;
            return (
              <Card key={index} className="relative overflow-hidden group hover:shadow-card transition-all duration-300 border-0 bg-gradient-card">
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${community.gradient}`} />
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${community.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-semibold">{community.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-muted-foreground">{community.members} members</span>
                          <Badge variant={community.engagement === "Very High" ? "default" : community.engagement === "High" ? "secondary" : "outline"} className="text-xs">
                            {community.engagement}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {community.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Can't find the right community?</p>
          <Button variant="hero">
            Request New Community
          </Button>
        </div>
      </div>
    </section>
  );
};