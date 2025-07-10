import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const systemStatus = [
  {
    service: "API",
    status: "operational",
    uptime: "99.9%",
    lastIncident: "None"
  },
  {
    service: "Tweet Submission",
    status: "operational",
    uptime: "99.8%",
    lastIncident: "None"
  },
  {
    service: "Community Features",
    status: "operational",
    uptime: "99.9%",
    lastIncident: "None"
  },
  {
    service: "Analytics Dashboard",
    status: "operational",
    uptime: "99.7%",
    lastIncident: "2 days ago"
  },
  {
    service: "Authentication",
    status: "operational",
    uptime: "99.9%",
    lastIncident: "None"
  }
];

const recentIncidents = [
  {
    title: "Analytics Dashboard Slowdown",
    status: "resolved",
    date: "2 days ago",
    description: "Users experienced slower load times in the analytics dashboard. Issue was resolved by optimizing database queries."
  },
  {
    title: "Scheduled Maintenance",
    status: "completed",
    date: "1 week ago",
    description: "Routine server maintenance completed successfully with minimal downtime."
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'operational': return 'text-success';
    case 'degraded': return 'text-warning';
    case 'down': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'operational': return CheckCircle;
    case 'degraded': return AlertTriangle;
    case 'down': return AlertTriangle;
    default: return Clock;
  }
};

const Status = () => {
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
              System
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Status</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-time status of all LiftX services and recent incidents.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-success" />
                <h2 className="text-2xl font-bold">All Systems Operational</h2>
              </div>
              
              <div className="space-y-4">
                {systemStatus.map((service, index) => {
                  const StatusIcon = getStatusIcon(service.status);
                  return (
                    <Card key={index} className="hover:shadow-card transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <StatusIcon className={`h-5 w-5 ${getStatusColor(service.status)}`} />
                            <div>
                              <h3 className="font-semibold">{service.service}</h3>
                              <p className="text-sm text-muted-foreground">
                                {service.uptime} uptime • Last incident: {service.lastIncident}
                              </p>
                            </div>
                          </div>
                          <Badge 
                            variant={service.status === 'operational' ? 'secondary' : 'destructive'}
                            className={service.status === 'operational' ? 'bg-success/10 text-success' : ''}
                          >
                            {service.status}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Incidents</h2>
              <div className="space-y-4">
                {recentIncidents.map((incident, index) => (
                  <Card key={index} className="hover:shadow-card transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{incident.title}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{incident.status}</Badge>
                          <span className="text-sm text-muted-foreground">{incident.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{incident.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Status;