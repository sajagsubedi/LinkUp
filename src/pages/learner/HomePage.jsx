import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Briefcase, Users, GraduationCap, Sparkles, Star, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
  <div className="min-h-[80vh] w-full flex flex-col items-center justify-start px-4 py-10 bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto text-center py-8">
        <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm mb-4">
          <Sparkles className="w-4 h-4" /> Tailored opportunities for you
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-4">Welcome, Learner!</h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8">Discover events, internships, clubs, and mentors to boost your journey.</p>
        <div className="flex flex-col md:flex-row gap-3 justify-center mb-10">
          <Link to="/learner/dashboard/events" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow hover:bg-primary/90 transition inline-flex items-center justify-center">
            Find Events <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link to="/learner/dashboard/internship" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow hover:bg-primary/90 transition inline-flex items-center justify-center">
            Explore Internships <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link to="/learner/dashboard/clubs" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow hover:bg-primary/90 transition inline-flex items-center justify-center">
            Join Clubs <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link to="/learner/dashboard/mentorship" className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow hover:bg-primary/90 transition inline-flex items-center justify-center">
            Find Mentors <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
          <CalendarDays size={40} className="text-foreground mb-3" />
          <h2 className="text-lg font-bold text-foreground mb-1">Events</h2>
          <p className="text-muted-foreground text-center">Discover and join events happening.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
          <Briefcase size={40} className="text-foreground mb-3" />
          <h2 className="text-lg font-bold text-foreground mb-1">Internships</h2>
          <p className="text-muted-foreground text-center">Explore internships tailored to your interests.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
          <Users size={40} className="text-foreground mb-3" />
          <h2 className="text-lg font-bold text-foreground mb-1">Clubs</h2>
          <p className="text-muted-foreground text-center">Get involved to grow and connect.</p>
        </div>
        <div className="bg-card border border-border rounded-2xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
          <GraduationCap size={40} className="text-foreground mb-3" />
          <h2 className="text-lg font-bold text-foreground mb-1">Mentors</h2>
          <p className="text-muted-foreground text-center">Connect for career and study guidance.</p>
        </div>
      </section>

      {/* Quick Stats / Testimonials */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-3xl font-extrabold text-foreground">250+</div>
          <div className="text-muted-foreground">Active events this month</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-3xl font-extrabold text-foreground">1,200+</div>
          <div className="text-muted-foreground">Internships listed</div>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-foreground" />
            <div className="text-3xl font-extrabold text-foreground">4.9</div>
          </div>
          <div className="text-muted-foreground">Average mentor rating</div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-3xl mx-auto text-center mt-12">
        <h3 className="text-2xl font-bold text-foreground mb-2">Ready to get started?</h3>
        <p className="text-muted-foreground mb-4">Jump into opportunities tailored for you.</p>
        <Link to="/learner/dashboard/events" className="inline-flex items-center bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow hover:bg-primary/90 transition">
          Browse Events <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </section>
    </div>
  );
}

export default HomePage