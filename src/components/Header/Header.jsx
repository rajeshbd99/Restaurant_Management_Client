import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [isMainMenuOpen, setIsMainMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        navigate('/');
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };

  const closeMenus = () => {
    setIsMainMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 py-3 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-r from-blue-800 via-purple-900 to-black text-white'
          : 'bg-white shadow-md text-gray-800'
      } ${isScrolled ? 'backdrop-blur-lg bg-opacity-70' : ''}`}
    >
      <div className="mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="text-2xl font-bold cursor-pointer hover:text-red-600"
          onClick={() => navigate('/')}
        >
          🍴 DineFusion
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/foods" className="nav-link">All Foods</NavLink>
          <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
          {user && (
            <>
              <NavLink to="/my-foods" className="nav-link">My Foods</NavLink>
              <NavLink to="/add-food" className="nav-link">Add Food</NavLink>
              <NavLink to="/my-orders" className="nav-link">My Orders</NavLink>
            </>
          )}
        </nav>

        {/* Theme Toggle & User Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle Icon */}
          <button onClick={toggleTheme} className="text-xl">
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          {user ? (
            <>
              <img
                className="w-10 h-10 rounded-full"
                src={user.photoURL || 'https://via.placeholder.com/60'}
                alt="Profile"
              />
              <button onClick={handleLogout} className="hidden md:block px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition hidden md:block">Login</NavLink>
              <NavLink to="/register" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition hidden md:block">Register</NavLink>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button onClick={toggleMainMenu} className="md:hidden">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-8 6h8" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMainMenuOpen && (
        <nav className="absolute top-full left-0 w-full text-white bg-white dark:bg-black shadow-md md:hidden">
          <ul className="flex flex-col space-y-4 py-4 px-6">
            <li><NavLink to="/" onClick={closeMenus}>Home</NavLink></li>
            <li><NavLink to="/foods" onClick={closeMenus}>All Foods</NavLink></li>
            <li><NavLink to="/gallery" onClick={closeMenus}>Gallery</NavLink></li>
            {user && (
              <>
                <li><NavLink to="/my-foods" onClick={closeMenus}>My Foods</NavLink></li>
                <li><NavLink to="/add-food" onClick={closeMenus}>Add Food</NavLink></li>
                <li><NavLink to="/my-orders" onClick={closeMenus}>My Orders</NavLink></li>
              </>
            )}
            {user ? (
              <li><button onClick={handleLogout}>Logout</button></li>
            ) : (
              <>
                <li><NavLink to="/login" onClick={closeMenus}>Login</NavLink></li>
                <li><NavLink to="/register" onClick={closeMenus}>Register</NavLink></li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
