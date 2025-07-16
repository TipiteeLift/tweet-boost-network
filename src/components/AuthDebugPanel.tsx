import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, RefreshCw } from "lucide-react";

export const AuthDebugPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, profile, loading } = useAuth();

  const handleManualRefresh = async () => {
    console.log("🔄 Manual session refresh triggered");
    try {
      const { data, error } = await supabase.auth.refreshSession();
      console.log("📊 Manual refresh result:", { data, error });
    } catch (error) {
      console.error("❌ Manual refresh failed:", error);
    }
  };

  const checkAuthStatus = async () => {
    console.log("🔍 Manual auth status check...");
    const { data: { session }, error } = await supabase.auth.getSession();
    console.log("📋 Current session:", { session, error });
    
    const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
    console.log("👤 Current user:", { user: currentUser, error: userError });
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          variant="outline"
          size="sm"
          className="bg-background/80 backdrop-blur"
        >
          <Eye className="w-4 h-4 mr-2" />
          Auth Debug
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-background/95 backdrop-blur border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Auth Debug Panel</CardTitle>
            <Button
              onClick={() => setIsVisible(false)}
              variant="ghost"
              size="sm"
            >
              <EyeOff className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-xs">
          <div>
            <strong>Status:</strong>
            <div className="flex gap-2 mt-1">
              <Badge variant={user ? "default" : "secondary"}>
                User: {user ? "✅" : "❌"}
              </Badge>
              <Badge variant={profile ? "default" : "secondary"}>
                Profile: {profile ? "✅" : "❌"}
              </Badge>
              <Badge variant={loading ? "outline" : "secondary"}>
                Loading: {loading ? "🔄" : "✅"}
              </Badge>
            </div>
          </div>

          <div>
            <strong>Current URL:</strong>
            <div className="text-muted-foreground break-all">
              {window.location.href}
            </div>
          </div>

          <div>
            <strong>Origin:</strong>
            <div className="text-muted-foreground">
              {window.location.origin}
            </div>
          </div>

          <div>
            <strong>Redirect URL:</strong>
            <div className="text-muted-foreground">
              {window.location.origin}/
            </div>
          </div>

          {user && (
            <div>
              <strong>User Info:</strong>
              <div className="text-muted-foreground">
                Email: {user.email}<br />
                ID: {user.id?.slice(0, 8)}...
              </div>
            </div>
          )}

          {profile && (
            <div>
              <strong>Profile:</strong>
              <div className="text-muted-foreground">
                Name: {profile.display_name}<br />
                Handle: {profile.handle}<br />
                Points: {profile.points}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleManualRefresh}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              Refresh
            </Button>
            <Button
              onClick={checkAuthStatus}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              Check Status
            </Button>
          </div>

          <div className="text-xs text-muted-foreground">
            Check console for detailed logs
          </div>
        </CardContent>
      </Card>
    </div>
  );
};