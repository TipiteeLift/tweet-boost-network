import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Star, Heart, MessageCircle, Users } from "lucide-react";

interface Notification {
  id: string;
  type: 'achievement' | 'engagement' | 'community' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  points?: number;
}

export const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "achievement",
      title: "New Achievement!",
      message: "You've reached 1,000 total points! Keep up the great work.",
      timestamp: "2 min ago",
      read: false,
      points: 100
    },
    {
      id: "2",
      type: "engagement",
      title: "Hot Tweet Alert",
      message: "Your tweet about InfoFi got 50+ likes! Earning bonus points.",
      timestamp: "15 min ago",
      read: false,
      points: 25
    },
    {
      id: "3",
      type: "community",
      title: "New Community Member",
      message: "Welcome to the DeFi Innovators community!",
      timestamp: "1 hour ago",
      read: true
    },
    {
      id: "4",
      type: "system",
      title: "Weekly Summary",
      message: "Your engagement this week: 127 points (+15.3%)",
      timestamp: "2 hours ago",
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'achievement': return Star;
      case 'engagement': return Heart;
      case 'community': return Users;
      default: return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'text-yellow-500';
      case 'engagement': return 'text-pink-500';
      case 'community': return 'text-blue-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-hidden z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 max-h-64 overflow-y-auto">
            <div className="space-y-1">
              {notifications.map((notification) => {
                const IconComponent = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-4 cursor-pointer transition-colors ${
                      !notification.read 
                        ? 'bg-primary/5 border-l-2 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full bg-muted ${getIconColor(notification.type)}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {notification.points && (
                            <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                              +{notification.points}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};