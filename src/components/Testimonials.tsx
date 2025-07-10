import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "InfoFi Creator",
    content: "LiftX transformed my X growth! The community support is incredible, and I've gained 2K genuine followers in just 2 months.",
    points: 1250
  },
  {
    name: "Marcus Rivera",
    role: "Crypto Enthusiast", 
    content: "The points system is genius. It ensures real engagement, not just bot interactions. My tweet reach has increased 400%.",
    points: 890
  },
  {
    name: "Elena Volkov",
    role: "Content Creator",
    content: "Finally, a platform that connects creators authentically. The community features help me find my target audience easily.",
    points: 2100
  },
  {
    name: "David Park",
    role: "Tech Influencer",
    content: "LiftX's mutual growth approach works. I've built meaningful connections and seen consistent engagement on my content.",
    points: 1650
  },
  {
    name: "Amara Johnson",
    role: "Brand Strategist",
    content: "The analytics and community insights are game-changing. I can track my growth and optimize my content strategy effectively.",
    points: 1480
  },
  {
    name: "Ryan Torres",
    role: "Startup Founder",
    content: "This platform helped me build my personal brand on X. The community support and engagement quality is unmatched.",
    points: 1920
  }
];

export const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our 
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Community Says</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of creators who've accelerated their X growth with LiftX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative group hover:shadow-elegant transition-all duration-500 border-0 bg-card/50 backdrop-blur-sm hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <blockquote className="text-foreground leading-relaxed mb-6 font-medium">
                    "{testimonial.content}"
                  </blockquote>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs text-success font-medium mt-1 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-success"></span>
                      {testimonial.points} points earned
                    </div>
                  </div>
                </div>
              </CardContent>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary-glow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Ready to join them?</p>
          <div className="flex justify-center gap-2">
            {[1,2,3,4,5].map((star) => (
              <div key={star} className="w-5 h-5 bg-gradient-to-r from-primary to-primary-glow rounded-sm opacity-80" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">Rated 4.9/5 by our community</p>
        </div>
      </div>
    </section>
  );
};