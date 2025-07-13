import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Zap, 
  Target, 
  MessageCircle, 
  Share2, 
  Heart,
  TrendingUp,
  Users,
  Award
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  progress: number;
  description: string;
  icon: any;
  color: 'primary' | 'success' | 'warning' | 'secondary';
  nextMilestone: string;
  xpRequired: number;
  currentXp: number;
}

export const SkillProgression = () => {
  const { toast } = useToast();
  const skills: Skill[] = [
    {
      name: "Engagement Master",
      level: 4,
      progress: 75,
      description: "Expertise in creating engaging content",
      icon: Heart,
      color: 'primary',
      nextMilestone: "10,000 total likes received",
      xpRequired: 2500,
      currentXp: 1875
    },
    {
      name: "Community Builder",
      level: 3,
      progress: 60,
      description: "Growing and nurturing communities",
      icon: Users,
      color: 'success',
      nextMilestone: "Moderate 3 active communities",
      xpRequired: 3000,
      currentXp: 1800
    },
    {
      name: "Content Creator",
      level: 5,
      progress: 90,
      description: "Creating valuable original content",
      icon: MessageCircle,
      color: 'warning',
      nextMilestone: "100 viral posts (>1k engagements)",
      xpRequired: 1000,
      currentXp: 900
    },
    {
      name: "Influencer",
      level: 2,
      progress: 35,
      description: "Building influence and reach",
      icon: TrendingUp,
      color: 'secondary',
      nextMilestone: "25,000 profile views",
      xpRequired: 5000,
      currentXp: 1750
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' };
      case 'success': return { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' };
      case 'warning': return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
      case 'secondary': return { bg: 'bg-secondary/10', text: 'text-secondary-foreground', border: 'border-secondary/20' };
      default: return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' };
    }
  };

  return (
    <Card className="gradient-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-primary" />
          <span>Skill Progression</span>
          <Badge variant="secondary" className="ml-auto bg-primary/10 text-primary">
            4 Skills Unlocked
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => {
          const colors = getColorClasses(skill.color);
          return (
            <div key={skill.name} className="relative">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
                  <skill.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold flex items-center space-x-2">
                        <span>{skill.name}</span>
                        <Badge variant="outline" className={`${colors.text} border-current text-xs`}>
                          Level {skill.level}
                        </Badge>
                      </h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">XP Progress</span>
                      <span className="font-medium">{skill.currentXp.toLocaleString()} / {skill.xpRequired.toLocaleString()} XP</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Next milestone: {skill.nextMilestone}
                    </p>
                  </div>
                </div>
              </div>
              
              {index < skills.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-6 bg-border"></div>
              )}
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full" 
            size="sm"
            onClick={() => {
              toast({
                title: "All Milestones",
                description: "Opening complete milestones view...",
              });
            }}
          >
            <Target className="w-4 h-4 mr-2" />
            View All Milestones
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};