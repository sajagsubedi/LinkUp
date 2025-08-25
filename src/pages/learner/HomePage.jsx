import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Briefcase, Users, GraduationCap } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import DashboardRedirect from '../DashboardRedirection';
// import LearnerLayout from '@/layouts/LearnerLayout';

const HomePage = () => {
  return (
  <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 py-8 bg-gradient-to-br from-gray-900 div">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center py-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-100 mb-4 drop-shadow-lg">Welcome, Learner!</h1>
        <p className="text-xl md:text-2xl text-blue-300 mb-8 font-medium">Discover events, internships, clubs, and mentors to boost your journey.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <div href="/learner/dashboard/events" className="bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-900 transition hover:scale-105 cursor-pointer">Find Events</div>
          <div href="/learner/dashboard/internship" className="bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-900 transition hover:scale-105 cursor-pointer">Explore Internships</div>
          <div href="/learner/dashboard/clubs" className="bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-900 transition hover:scale-105 cursor-pointer">Join Clubs</div>
          <div href="/learner/dashboard/mentorship" className="bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-900 transition hover:scale-105 cursor-pointer">Find Mentors</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
        <div className="bg-blue-950 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <CalendarDays size={64} className="text-blue-300 mb-4" />
          <h2 className="text-xl font-bold text-blue-100 mb-2">Events</h2>
          <p className="text-blue-300 mb-2">Discover and join events happening.</p>
        </div>
        <div className="bg-blue-950 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <Briefcase size={64} className="text-blue-300 mb-4" />
          <h2 className="text-xl font-bold text-blue-100 mb-2">Internship Opportunities</h2>
          <p className="text-blue-300 mb-2">Explore internships tailored to your interests and skills.</p>
        </div>
        <div className="bg-blue-950 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <Users size={64} className="text-blue-300 mb-4" />
          <h2 className="text-xl font-bold text-blue-100 mb-2">Clubs & Organizations</h2>
          <p className="text-blue-300 mb-2">Get involved in clubs and organizations to grow and connect.</p>
        </div>
        <div className="bg-blue-950 rounded-2xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform">
          <GraduationCap size={64} className="text-blue-300 mb-4" />
          <h2 className="text-xl font-bold text-blue-100 mb-2">Find Mentors</h2>
          <p className="text-blue-300 mb-2">Connect with mentors for career, study abroad, and more guidance.</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-3xl mx-auto text-center mt-12">
        <h3 className="text-2xl font-bold text-blue-100 mb-2">Ready to get started?</h3>
        <h2 className="text-2xl font-bold text-blue-200 mb-4">Lets' Gooo !!</h2>
        <br />
      </section>
    </div>
  );
}

export default HomePage