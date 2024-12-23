import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (user) {
      try {
        await logoutUser();
        alert('User logged out, navigating to home');
        navigate("/");
      } catch (error) {
        console.error('Error logging out:', error.message);
      }
    }
  };

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? 'btn btn-primary' : 'btn btn-ghost'
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/foods"
        className={({ isActive }) =>
          isActive ? 'btn btn-primary' : 'btn btn-ghost'
        }
      >
        All Foods
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? 'btn btn-primary' : 'btn btn-ghost'
        }
      >
        Gallery
      </NavLink>
    </>
  );

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="mr-3 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="text-xl md:text-2xl font-bold">DineFusion</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-2">
        {!user && (
          <NavLink
            to="/register"
            className="btn btn-outline btn-primary"
          >
            Register
          </NavLink>
        )}
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <img
                  className="w-10 rounded-full"
                  src={user.photoURL || 'https://via.placeholder.com/40'}
                  alt="Profile"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content bg-base-100 rounded-box shadow mt-3 w-44 p-2"
              >
                <li>
                  <NavLink
                    to="/my-foods"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/add-food"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Header;
