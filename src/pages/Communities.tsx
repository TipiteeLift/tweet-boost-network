import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, TrendingUp, ArrowLeft, User, Home } from "lucide-react";

export default function Communities() {
  const communities = [
    { name: "InfoFi", members: "12.5K", trend: "+15%", active: true },
    { name: "Airdrops", members: "8.2K", trend: "+8%", active: false },
    { name: "DeFi", members: "25.1K", trend: "+22%", active: false },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
          </div>
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold">Communities</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {communities.map((community) => (
            <Card key={community.name} className={community.active ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {community.name}
                  {community.active && <Badge variant="default">Active</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{community.members}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-success">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{community.trend}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}