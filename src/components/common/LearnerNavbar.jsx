import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/learner/home" },
  { name: "Events", href: "/learner/events" },
  { name: "Internships", href: "/learner/internships" },
  { name: "Clubs", href: "/learner/clubs" },
  { name: "Mentorship", href: "/learner/mentorship" },
];

const LearnerNavbar = () => {
  return (
    <nav className="w-full bg-white shadow-md py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="LinkUP Logo" className="h-10 w-10 rounded-full" />
        <span className="text-2xl font-bold text-blue-700 tracking-wide">Where2GO`</span>
      </div>
      <ul className="flex gap-6">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className="text-blue-700 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div>
        <Link
          to="/profile"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default LearnerNavbar;