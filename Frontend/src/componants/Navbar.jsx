import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Import the context
import "/src/assets/logo.png";
import "/src/assets/AuraSense.png";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext); // Get user and setter from context

  const handleLogout = () => {
    //  Clear user-related localStorage and context on logout
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <nav className="bg-slate-700 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo section */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/src/assets/logo.png" className="h-8" alt="Logo" />
          <img src="/src/assets/AuraSense.png" className="h-8" alt="AuraSense" />
        </Link>

        {/* Right side buttons */}
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {user ? (
            // Show if logged in
            <>
              <Link to="/profile" className="text-white bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-white bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Logout
              </button>
            </>
          ) : (
            // Show if not logged in
            <>
              <Link to="/login" className="text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Login
              </Link>
              <Link to="/register" className="text-white bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                Register
              </Link>
            </>
          )}

          {/* Mobile menu button */}
          <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/*  Main nav links */}
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link to="/" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white">About</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white">Services</Link>
            </li>
            <li>
              <Link to="#" className="block py-2 px-3 md:p-0 text-gray-900 hover:text-blue-700 dark:text-white">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
