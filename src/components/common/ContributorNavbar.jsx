import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { UserButton, useUser } from "@clerk/clerk-react";

const NavLink = ({ route, children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <li className="flex justify-start px-8 md:px-3 text-lg my-1 border-primary">
      <Link
        className={`hover:font-medium p-1 cursor-pointer box-border font-medium text-nowrap ${
          pathname !== route
            ? "text-muted-foreground hover:text-foreground"
            : "text-primary font-semibold"
        }`}
        to={route}
      >
        {children}
      </Link>
    </li>
  );
};

export default function ContrubutorNavbar({ navLinks }) {
  const [navActive, setNavActive] = useState(false);
  const { user } = useUser();
  console.log(user);

  return (
    <nav className="bg-background text-foreground flex items-center justify-between px-4 py-1 box-border gap-4 sticky top-0 h-16 z-[99] md:px-[5vw] w-full border-b border-border">
      {/* Logo */}
      <Link className="flex" to="/">
        <img src="/logo.png" className="h-9 w-auto" alt="logo" />
      </Link>

      {/* Nav Links */}
      <div
        className={`md:w-[85%] lg:w-[70%] md:flex justify-between md:py-1 md:h-full items-center md:static md:flex-row overflow-hidden md:overflow-visible md:px-3 fixed z-[99] flex-col h-[100vh] transition-all duration-500 w-0 ${
          navActive ? "w-60" : ""
        } top-0 right-0 bg-popover md:bg-transparent shadow-gray-900 md:gap-4 gap-1 py-2`}
      >
        <ul className="md:w-[80%] flex flex-col justify-between md:flex-row gap-7 md:justify-center">
          <div className="w-full flex justify-end md:hidden">
            <button
              className="text-2xl p-3 text-muted-foreground"
              onClick={() => setNavActive(false)}
            >
              <X />
            </button>
          </div>
          {navLinks.map((value, i) => (
            <NavLink key={i} route={value.path}>
              {value.name}
            </NavLink>
          ))}
        </ul>
      </div>

      <div className="flex gap-2">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-9 w-9",
            },
          }}
        />

        {/* Right side: Hamburger menu */}
        <div className="flex items-center gap-1">
          <button
            className="text-2xl p-2 text-muted-foreground md:hidden"
            onClick={() => setNavActive(true)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
}
