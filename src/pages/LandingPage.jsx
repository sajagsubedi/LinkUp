import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Briefcase, Users, BookOpen } from "lucide-react";
import { useRef } from "react";
import { SignedOut, SignIn } from "@clerk/clerk-react";

const LandingPage = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 md:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-primary/5 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Discover Your Next Opportunity
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/80">
              Connect with events, internships, clubs, and mentors that align
              with your goals and interests.
            </p>

            <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-8">
                <Link to="/signup" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
            </SignedOut>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              LinkUP provides a comprehensive platform for students to discover
              and engage with opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events</h3>
              <p className="text-foreground/70">
                Discover and participate in campus events, workshops, and
                conferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Internships</h3>
              <p className="text-foreground/70">
                Find internship opportunities that match your skills and career
                goals.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Clubs</h3>
              <p className="text-foreground/70">
                Join student clubs and organizations that align with your
                interests.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-background p-6 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentorship</h3>
              <p className="text-foreground/70">
                Connect with mentors who can guide you on your academic and
                career journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-br from-primary/20 to-accent/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-foreground/80">
            Join thousands of students who are discovering new opportunities
            every day.
          </p>
          
          <SignedOut>

          <Button size="lg" className="rounded-full px-8">
            <Link to="/signup" className="flex items-center gap-2">
              Create Your Account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          </SignedOut>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;