import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CommunityFilters } from "@/components/CommunityFilters";
import { CommunityLeaderboard } from "@/components/CommunityLeaderboard";
import { Users, TrendingUp, ArrowLeft, User, Home, UserPlus, UserMinus } from "lucide-react";

export default function Communities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  
  const communities = [
    { 
      id: 1,
      name: "InfoFi", 
      members: "12.5K", 
      trend: "+15%", 
      active: true,
      joined: true,
      description: "Information Finance community focused on data monetization",
      category: "trending"
    },
    { 
      id: 2,
      name: "Airdrops", 
      members: "8.2K", 
      trend: "+8%", 
      active: false,
      joined: false,
      description: "Get the latest airdrop opportunities and strategies",
      category: "featured"
    },
    { 
      id: 3,
      name: "DeFi", 
      members: "25.1K", 
      trend: "+22%", 
      active: false,
      joined: false,
      description: "Decentralized Finance protocols and yield farming",
      category: "trending"
    },
    { 
      id: 4,
      name: "NFT Traders", 
      members: "6.3K", 
      trend: "+5%", 
      active: false,
      joined: false,
      description: "NFT trading strategies and market analysis",
      category: "all"
    }
  ];

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      activeFilter === "all" ||
      (activeFilter === "joined" && community.joined) ||
      (activeFilter === "trending" && community.category === "trending") ||
      (activeFilter === "featured" && community.category === "featured");
    
    return matchesSearch && matchesFilter;
  });

  const handleJoinLeave = (communityId: number) => {
    // In a real app, this would make an API call
    console.log(`Toggle join/leave for community ${communityId}`);
  };

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
        
        {/* Filters */}
        <CommunityFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Communities Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCommunities.map((community, index) => (
                <Card 
                  key={community.id} 
                  className={`
                    hover:shadow-lg transition-all duration-300 animate-fade-in hover-scale
                    ${community.active ? "border-primary shadow-primary/10" : ""}
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {community.name}
                      <div className="flex items-center space-x-2">
                        {community.active && <Badge variant="default">Active</Badge>}
                        {community.joined && <Badge variant="secondary" className="bg-success/10 text-success">Joined</Badge>}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{community.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{community.members}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-success">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-sm font-medium">{community.trend}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      variant={community.joined ? "outline" : "default"}
                      onClick={() => handleJoinLeave(community.id)}
                    >
                      {community.joined ? (
                        <>
                          <UserMinus className="w-4 h-4 mr-2" />
                          Leave Community
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Community
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {filteredCommunities.length === 0 && (
              <Card className="p-8 text-center">
                <CardContent>
                  <div className="text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No communities found matching your criteria.</p>
                    <p className="text-sm mt-2">Try adjusting your search or filter settings.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CommunityLeaderboard />
            
            {/* Community Stats */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Communities</span>
                  <span className="font-bold">{communities.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Joined</span>
                  <span className="font-bold text-success">{communities.filter(c => c.joined).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Now</span>
                  <span className="font-bold text-primary">{communities.filter(c => c.active).length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}