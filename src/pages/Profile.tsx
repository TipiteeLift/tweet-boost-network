import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/5fc8467f-6f6f-4e3d-9854-14000093ad62.png" 
                alt="Tipitee avatar"
                className="w-16 h-16 rounded-full"
              />
              <div>
                <CardTitle>Tipitee</CardTitle>
                <p className="text-muted-foreground">@about_crypto</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">999,999</div>
                <div className="text-sm text-muted-foreground">Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success">5</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Active Communities</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">InfoFi</Badge>
                <Badge variant="outline">Airdrops</Badge>
                <Badge variant="outline">DeFi</Badge>
              </div>
            </div>
            
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}