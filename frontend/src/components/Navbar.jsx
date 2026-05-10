import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-secondary text-white shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold text-primary">
          JorghitoTech
        </Link>

        <div className="hidden md:flex gap-8">
          <Link to="/" className="hover:text-primary transition">Inicio</Link>
          <Link to="/servicios" className="hover:text-primary transition">Servicios</Link>
          <Link to="/proyectos" className="hover:text-primary transition">Proyectos</Link>
          <Link to="/contacto" className="hover:text-primary transition">Contacto</Link>
        </div>

        <div className="hidden md:flex gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/panel" className="btn-primary">Panel</Link>
              <button onClick={handleLogout} className="btn-secondary">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Iniciar Sesión</Link>
              <Link to="/registro" className="btn-primary">Registrarse</Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-4">
          <Link to="/" className="block py-2 hover:text-primary">Inicio</Link>
          <Link to="/servicios" className="block py-2 hover:text-primary">Servicios</Link>
          <Link to="/proyectos" className="block py-2 hover:text-primary">Proyectos</Link>
          <Link to="/contacto" className="block py-2 hover:text-primary">Contacto</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-primary">
              Salir
            </button>
          ) : (
            <>
              <Link to="/login" className="block py-2 hover:text-primary">Iniciar Sesión</Link>
              <Link to="/registro" className="block py-2 hover:text-primary">Registrarse</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
