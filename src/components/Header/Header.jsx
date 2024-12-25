import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        alert('User logged out, navigating to home');
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold text-lg underline'
            : 'text-gray-300 hover:text-white transition-all duration-300'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/foods"
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold text-lg underline'
            : 'text-gray-300 hover:text-white transition-all duration-300'
        }
      >
        All Foods
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold text-lg underline'
            : 'text-gray-300 hover:text-white transition-all duration-300'
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to="/purchase"
        className={({ isActive }) =>
          isActive
            ? 'text-white font-semibold text-lg underline'
            : 'text-gray-300 hover:text-white transition-all duration-300'
        }
      >
        Purchase Food
      </NavLink>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 left-0 right-0 z-50 ${
        isDarkMode
          ? 'bg-black text-white shadow-lg'
          : 'bg-gradient-to-r from-green-400 via-yellow-500 to-orange-400 text-gray-800'
      } px-4 py-4 transition-all duration-300`}
    >
      <div className="navbar-start">
        <button
          onClick={navigateToHome}
          className="text-2xl font-bold text-white"
        >
          🍴 DineFusion
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-4 gap-6">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-6">
        <button
          onClick={toggleTheme}
          className="text-white bg-transparent border-2 border-white rounded-full py-2 px-4 hover:bg-white hover:text-black transition-all duration-300"
        >
          {isDarkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>

        {!user && (
          <NavLink
            to="/register"
            className="px-4 py-2 bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition-all duration-300"
          >
            Register
          </NavLink>
        )}

        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <img
                  className="w-10 rounded-full border-2 border-white"
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="Profile"
                />
              </div>
              <ul
                tabIndex={0}
                className={`dropdown-content ${
                  isDarkMode ? 'bg-black text-white' : 'bg-white text-gray-800'
                } mt-3 w-44 rounded-box p-2 shadow-md`}
              >
                <li>
                  <NavLink
                    to="/my-foods"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-food"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink
            to="/login"
            className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu (Hamburger) */}
      <div className="navbar-end lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 w-52 bg-black text-white rounded-box p-2 shadow-lg"
          >
            {links}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
