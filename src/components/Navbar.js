import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [hideMenu, setHideMenu] = useState([true]);

  const toggleMenu = () => {
    setHideMenu(!hideMenu);
  };

  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Contenidos por Categorías</Link>
        </div>
        {user && (
          <>
            {user.role !== 'reader' && (
              <div className='text-white font-bold text-sm'>
                <Link to="/content">Contenido</Link>
              </div>
            )}
            {user.role === 'admin' && (
              <div className='text-white font-bold text-sm'>
                <Link to="/categories">Categorías</Link>
              </div>
            )}
          </>
        )}
        <div onClick={toggleMenu} className="flex items-center">
          {user && (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                >
                  {user.username}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" hidden={hideMenu}>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Ver Perfil
                  </Link>
                  <Link
                    to='/login'
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    Cerrar Sesión
                  </Link>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-gray-300 font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-gray-300 font-medium"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
