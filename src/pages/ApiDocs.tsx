import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Key, Book, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/tweets",
    description: "Retrieve tweets from communities",
    auth: true
  },
  {
    method: "POST",
    endpoint: "/api/tweets",
    description: "Submit a new tweet",
    auth: true
  },
  {
    method: "GET",
    endpoint: "/api/profile",
    description: "Get user profile information",
    auth: true
  },
  {
    method: "POST",
    endpoint: "/api/interactions",
    description: "Record tweet interactions",
    auth: true
  }
];

const features = [
  {
    icon: Code,
    title: "RESTful API",
    description: "Simple, intuitive REST endpoints"
  },
  {
    icon: Key,
    title: "Authentication",
    description: "Secure API key authentication"
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Comprehensive guides and examples"
  },
  {
    icon: Zap,
    title: "Real-time",
    description: "WebSocket support for live updates"
  }
];

const ApiDocs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header onSignIn={() => {}} user={null} activeTab="" onTabChange={() => {}} />
      
      <main className="pt-16">
        <div className="container py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
          
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              API
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Documentation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Build powerful integrations with the LiftX API. Access tweets, manage profiles, and track engagement programmatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">API Endpoints</h2>
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <Card key={index} className="hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {endpoint.endpoint}
                        </code>
                      </div>
                      {endpoint.auth && (
                        <Badge variant="outline" className="text-xs">
                          Auth Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6">
                Get your API key and start building with LiftX today.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg">
                  Get API Key
                </Button>
                <Button variant="outline" size="lg">
                  View Examples
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApiDocs;