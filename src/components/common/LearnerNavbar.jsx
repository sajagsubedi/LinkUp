import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";

// const navItems = [
//   { name: "Home", href: "/learner/home" },
//   { name: "Events", href: "/learner/events" },
//   { name: "Internships", href: "/learner/internships" },
//   { name: "Clubs", href: "/learner/clubs" },
//   { name: "Mentorship", href: "/learner/mentorship" },
// ];

const NavLink = ({ href, children }) => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <li className="flex justify-start px-8 md:px-3 text-lg my-1 border-primary">
      <Link
        className={`p-1 cursor-pointer box-border font-medium text-nowrap transition-colors duration-200 ${
          pathname === href
            ? "text-blue-500 font-bold border-b-2 border-blue-500"
            : "text-gray-300 hover:text-white"
        }`}
        to={href}
      >
        {children}
      </Link>
    </li>
  );
};

const LearnerNavbar = () => {
  const [navActive, setNavActive] = useState(false);

  return (
    <nav className="bg-gray-950/50 backdrop-blur-2xl text-white flex items-center justify-between px-4 py-1 box-border gap-4 sticky top-0 h-16 z-[99] md:px-[5vw] w-full border-b border-gray-700">
      {/* Logo */}
      <Link className="flex items-center gap-2" to="/">
        <img src="/logo.png" className="h-9 w-auto" alt="logo" />
      </Link>



            <div
              className={`md:w-[85%] lg:w-[70%] md:flex justify-between md:py-1 md:h-full items-center md:static md:flex-row overflow-hidden md:overflow-visible md:px-3 fixed z-[99] flex-col h-[100vh] transition-all duration-500 w-0 ${
                navActive ? "w-60" : ""
              } top-0 right-0 bg-gray-800 md:bg-transparent shadow-gray-900 md:gap-4 gap-1 py-2`}
            >
              <ul className="md:w-[80%] flex flex-col justify-between md:flex-row gap-7 md:justify-center">
                <div className="w-full flex justify-end md:hidden">
                  <button
                    className="text-2xl p-3 text-gray-400"
                    onClick={() => setNavActive(false)}
                  >
                    <X />
                  </button>
                </div>
                <NavLink href="/learner/dashboard">Home</NavLink>
                <NavLink href="/learner/dashboard/events">Events</NavLink>
                <NavLink href="/learner/dashboard/internship">Internships</NavLink>
                <NavLink href="/learner/dashboard/clubs">Clubs</NavLink>
                <NavLink href="/learner/dashboard/mentorship">Mentorship</NavLink>
                
              </ul>
            </div>

      {/* Right side: Hamburger menu */}
      <div className="flex items-center gap-1">
        <button
          className="text-2xl p-2 text-gray-400 md:hidden"
          onClick={() => setNavActive(true)}
        >
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default LearnerNavbar;