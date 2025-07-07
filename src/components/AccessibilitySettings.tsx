import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Accessibility, 
  Eye, 
  Type, 
  Focus, 
  Volume2, 
  Palette,
  MousePointer,
  Info
} from "lucide-react";
import { useAccessibility } from "./AccessibilityProvider";

export const AccessibilitySettings = () => {
  const { settings, updateSetting } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  const settingsConfig = [
    {
      key: 'highContrast' as const,
      title: 'High Contrast Mode',
      description: 'Increases contrast for better visibility',
      icon: Palette,
      category: 'Visual'
    },
    {
      key: 'reducedMotion' as const,
      title: 'Reduce Motion',
      description: 'Minimizes animations and transitions',
      icon: MousePointer,
      category: 'Motion'
    },
    {
      key: 'largeText' as const,
      title: 'Large Text',
      description: 'Increases font size throughout the app',
      icon: Type,
      category: 'Visual'
    },
    {
      key: 'focusVisible' as const,
      title: 'Enhanced Focus',
      description: 'Shows clear focus indicators for keyboard navigation',
      icon: Focus,
      category: 'Navigation'
    },
    {
      key: 'screenReaderMode' as const,
      title: 'Screen Reader Optimizations',
      description: 'Optimizes interface for screen readers',
      icon: Volume2,
      category: 'Assistive Technology'
    }
  ];

  const categories = [...new Set(settingsConfig.map(s => s.category))];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Open accessibility settings">
          <Accessibility className="w-4 h-4 mr-2" />
          Accessibility
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Accessibility className="w-5 h-5 text-primary" />
            <span>Accessibility Settings</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Info Card */}
          <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    These settings help make LiftX more accessible. Changes are saved automatically 
                    and sync across your devices.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings by Category */}
          {categories.map(category => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-3 flex items-center space-x-2">
                <span>{category}</span>
                <Badge variant="secondary" className="text-xs">
                  {settingsConfig.filter(s => s.category === category).length}
                </Badge>
              </h3>
              
              <div className="space-y-3">
                {settingsConfig
                  .filter(setting => setting.category === category)
                  .map(setting => (
                    <Card key={setting.key} className="transition-colors hover:bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start space-x-3 flex-1">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <setting.icon className="w-5 h-5 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{setting.title}</h4>
                                {settings[setting.key] && (
                                  <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                                    Active
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {setting.description}
                              </p>
                            </div>
                          </div>
                          
                          <Switch
                            checked={settings[setting.key]}
                            onCheckedChange={(checked) => updateSetting(setting.key, checked)}
                            aria-label={`Toggle ${setting.title}`}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}

          {/* Keyboard Shortcuts Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Keyboard Shortcuts</CardTitle>
              <CardDescription>
                Navigate LiftX efficiently with these keyboard shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Navigate tweets</span>
                  <Badge variant="outline" className="text-xs">↑ ↓</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Like tweet</span>
                  <Badge variant="outline" className="text-xs">L</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Comment</span>
                  <Badge variant="outline" className="text-xs">C</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Share tweet</span>
                  <Badge variant="outline" className="text-xs">S</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open settings</span>
                  <Badge variant="outline" className="text-xs">Alt + ,</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Search</span>
                  <Badge variant="outline" className="text-xs">Ctrl + K</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              onClick={() => {
                Object.keys(settings).forEach(key => {
                  updateSetting(key as keyof typeof settings, false);
                });
              }}
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};