import React, { useState } from "react";
import { useAuth, type Where2GOUser } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

interface UserDropDownProps {
  userDropDown: boolean;
  user: Where2GOUser | null;
  changeUserDropDown: (value: boolean) => void;
}

const UserDropDown: React.FC<UserDropDownProps> = ({
  userDropDown,
  changeUserDropDown,
  user,
}) => {
  const [isSigningOut] = useState(false);
  const { logout } = useAuth();

  const handleSignOut = async () => {
    await logout();
    changeUserDropDown(false);
  };

  return (
    <div className="relative min-w-8">
      <button
        type="button"
        className="flex text-sm rounded-full mr-0"
        onClick={() => changeUserDropDown(!userDropDown)}
        aria-label="Toggle user menu"
      >
        <img
          className="w-8 h-8 rounded-full shadow-sm"
          src={"/assets/user.png"}
          alt="User"
          width={32}
          height={32}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`z-10 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-5 max-w-[170px] overflow-hidden transition-all duration-300 ease-in-out ${
          !userDropDown ? "h-0" : "h-auto"
        }`}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 truncate">
            {user?.fullname}
          </span>
          <span className="block text-sm text-gray-500 truncate">
            {user?.email}
          </span>
        </div>
        <ul className="py-2">
          <li>
            <Link
              to="/user/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              My Profile
            </Link>
          </li>
          <li>
            <a
              href="/dashboard/notifications"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Notifications
            </a>
          </li>
          <li>
            <a
              href="/dashboard/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 truncate"
            >
              Settings
            </a>
          </li>
          <li>
            <button
              className="block px-4 py-2 text-sm w-full text-start text-gray-700 hover:bg-gray-100 truncate disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropDown;
