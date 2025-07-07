import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Trophy, 
  Users, 
  Target,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingFlow = ({ isOpen, onClose }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to LiftX!",
      description: "Your mutual growth platform for X",
      content: (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-r from-primary to-primary-glow rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-muted-foreground">
            LiftX helps you grow your X following through authentic engagement and community support.
          </p>
        </div>
      )
    },
    {
      title: "How to Earn Points",
      description: "Engage with tweets to earn points and unlock features",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Heart className="w-6 h-6 text-red-500" />
              <div>
                <div className="font-medium">Like tweets</div>
                <div className="text-sm text-muted-foreground">+1 point per like</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <MessageCircle className="w-6 h-6 text-blue-500" />
              <div>
                <div className="font-medium">Comment on tweets</div>
                <div className="text-sm text-muted-foreground">+2 points per comment</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
              <Share2 className="w-6 h-6 text-green-500" />
              <div>
                <div className="font-medium">Share tweets</div>
                <div className="text-sm text-muted-foreground">+3 points per share</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Join Communities",
      description: "Connect with like-minded creators in specialized communities",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">InfoFi</div>
                    <div className="text-sm text-muted-foreground">DeFi enthusiasts</div>
                  </div>
                  <Badge variant="secondary">12.5K members</Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium">Content Airdrops</div>
                    <div className="text-sm text-muted-foreground">Alpha & opportunities</div>
                  </div>
                  <Badge variant="secondary">8.3K members</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground">
            Each community has its own feed with relevant content and opportunities.
          </p>
        </div>
      )
    },
    {
      title: "Compete & Achieve",
      description: "Track your progress and compete with others",
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <Trophy className="w-16 h-16 text-warning" />
          </div>
          <div className="text-center space-y-2">
            <h4 className="font-semibold">Leaderboards & Achievements</h4>
            <p className="text-sm text-muted-foreground">
              Compete in daily, weekly, and all-time leaderboards. Unlock achievements and badges as you reach milestones.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="font-semibold text-primary">Level Up</div>
              <div className="text-xs text-muted-foreground">Gain XP & unlock features</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/30">
              <div className="font-semibold text-success">Earn Badges</div>
              <div className="text-xs text-muted-foreground">Show your achievements</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're All Set!",
      description: "Ready to start growing your X following",
      content: (
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 mx-auto text-success" />
          <div className="space-y-2">
            <h4 className="font-semibold">Ready to Go!</h4>
            <p className="text-sm text-muted-foreground">
              Start engaging with tweets in your dashboard to earn your first points and level up your profile.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
            <p className="text-sm font-medium">
              💡 Tip: Check out the Analytics tab to track your growth and engagement patterns!
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onClose();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currentStepData.title}
          </DialogTitle>
          <p className="text-center text-muted-foreground text-sm">
            {currentStepData.description}
          </p>
        </DialogHeader>

        <div className="py-6">
          {currentStepData.content}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-4">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-primary' 
                  : index < currentStep 
                    ? 'bg-success' 
                    : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            size="sm"
          >
            Previous
          </Button>
          
          <Button onClick={handleNext} size="sm">
            {isLastStep ? (
              <>
                Get Started
                <CheckCircle className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Skip option */}
        {!isLastStep && (
          <div className="text-center">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Skip tutorial
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};