import { Card, CardContent } from "@/components/ui/card";
import testimonialsImage from "@/assets/testimonials-collage.jpg";

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
    <section className="py-20">
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

        {/* Featured Image */}
        <div className="mb-12 text-center">
          <img 
            src={testimonialsImage} 
            alt="LiftX Community Members" 
            className="mx-auto rounded-2xl shadow-elegant max-w-full h-auto"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gradient-card border-0 hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="mb-3">
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-xs text-success font-medium">{testimonial.points} points earned</div>
                    </div>
                    <blockquote className="text-sm text-muted-foreground leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};