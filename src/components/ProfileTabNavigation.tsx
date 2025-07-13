import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Activity,
  BarChart3,
  Trophy,
  Settings
} from "lucide-react";

interface ProfileTabNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const ProfileTabNavigation = ({ activeSection, onSectionChange }: ProfileTabNavigationProps) => {
  const navigationItems = [
    { label: "Overview", id: "overview", icon: User },
    { label: "Activity", id: "activity", icon: Activity },
    { label: "Analytics", id: "analytics", icon: BarChart3 },
    { label: "Achievements", id: "achievements", icon: Trophy },
    { label: "Settings", id: "settings", icon: Settings }
  ];

  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-xl p-2 border border-primary/10">
      <div className="flex flex-wrap gap-1">
        {navigationItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Button 
              key={item.id}
              variant={isActive ? "default" : "ghost"} 
              className={`flex-1 min-w-0 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-primary/10 text-foreground'
              }`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {isActive && (
                <Badge variant="secondary" className="ml-2 bg-primary-foreground/20 text-xs flex-shrink-0">
                  Active
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};