import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for getting started with X growth",
    features: [
      "5 tweet submissions per day",
      "Basic community access",
      "Standard point rewards",
      "Basic analytics",
      "Email support"
    ],
    popular: false,
    cta: "Get Started"
  },
  {
    name: "Growth",
    price: "$9.99",
    period: "/month",
    description: "Accelerate your growth with advanced features",
    features: [
      "Unlimited tweet submissions",
      "Priority community access",
      "2x point multiplier",
      "Advanced analytics",
      "Priority support",
      "Custom scheduling",
      "Performance insights"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Pro",
    price: "$19.99",
    period: "/month",
    description: "Maximum growth for serious creators",
    features: [
      "Everything in Growth",
      "3x point multiplier",
      "Custom communities",
      "Advanced targeting",
      "API access",
      "White-label options",
      "Dedicated account manager"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const Pricing = () => {
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
              Simple
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect plan to accelerate your X growth. Start free and upgrade as you grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-card' : 'border-border'} hover:shadow-card transition-all duration-300`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-primary-glow text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pricing;