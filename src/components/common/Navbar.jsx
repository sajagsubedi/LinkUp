import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const NavLink = ({ route, children }) => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <li className="flex justify-start px-8 md:px-3 text-lg my-1 border-primary">
      <Link
        className={`hover:font-medium p-1 cursor-pointer box-border font-medium text-nowrap ${
          pathname !== route
            ? "text-gray-300 hover:text-white"
            : "text-primary font-semibold"
        }`}
        to={route}
      >
        {children}
      </Link>
    </li>
  );
};

export default function Header() {
  const [navActive, setNavActive] = useState(false);
  const { user } = useUser();
  console.log(user);

  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between px-4 py-1 box-border gap-4 sticky top-0 h-16 z-[99] md:px-[5vw] w-full border-b border-gray-700">
      {/* Logo */}
      <Link className="flex" to="/">
        <img src="/logo.png" className="h-9 w-auto" alt="logo" />
      </Link>

      {/* Nav Links */}
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
          <NavLink route="/">Home</NavLink>
          <NavLink route="/about">About</NavLink>
          <NavLink route="/features">Features</NavLink>
          <NavLink route="/contact">Contact</NavLink>
        </ul>

        {/* Auth buttons */}
        <div className="md:w-[20%] flex items-center w-full justify-center pr-2 gap-2 mt-10 md:mt-0">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="secondary"
                className="rounded-sm bg-blue-500 hover:bg-blue-600"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="rounded-sm bg-primary hover:bg-primary/90">
                Sign up
              </Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
      <div className="flex gap-2">
        <SignedIn>
          {/* Recruiter special action */}
          {user?.unsafeMetadata?.role === "recruiter" && (
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full">
                Post a Job
              </Button>
            </Link>
          )}
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-9 w-9",
              },
            }}
          />
        </SignedIn>

        {/* Right side: Hamburger menu */}
        <div className="flex items-center gap-1">
          <button
            className="text-2xl p-2 text-gray-400 md:hidden"
            onClick={() => setNavActive(true)}
          >
            <Menu />
          </button>
        </div>
      </div>
    </nav>
  );
}
