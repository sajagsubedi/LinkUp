import React from "react";
import LearnerNavbar from "../components/common/LearnerNavbar";

const LearnerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      <LearnerNavbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        {children ? children : (
          <section className="w-full max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Welcome to LinkUP</h1>
            <p className="text-lg md:text-xl text-blue-700 mb-8">Find events, internships, clubs, and mentors to boost your journey!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src="/banner.jpg" alt="Events" className="w-24 h-24 object-cover rounded-full mb-4" />
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Events Nearby & Beyond</h2>
                <p className="text-blue-600 mb-2">Discover and join events happening around you or far away.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src="/companies/netflix.png" alt="Internships" className="w-24 h-24 object-cover rounded-full mb-4" />
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Internship Opportunities</h2>
                <p className="text-blue-600 mb-2">Explore internships tailored to your interests and skills.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src="/companies/ibm.svg" alt="Clubs" className="w-24 h-24 object-cover rounded-full mb-4" />
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Clubs & Organizations</h2>
                <p className="text-blue-600 mb-2">Get involved in clubs and organizations to grow and connect.</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src="/logo.png" alt="Mentors" className="w-24 h-24 object-cover rounded-full mb-4" />
                <h2 className="text-xl font-semibold text-blue-800 mb-2">Find Mentors</h2>
                <p className="text-blue-600 mb-2">Connect with mentors for career, study abroad, and more guidance.</p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default LearnerLayout;
