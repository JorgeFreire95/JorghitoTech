import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="JorghitoTech" className="h-8 w-auto" />
              <span className="font-bold text-lg">JorghitoTech</span>
            </div>
            <p className="text-gray-400">Desarrollo de software profesional para web, desktop y mobile.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-primary">Inicio</a></li>
              <li><a href="/servicios" className="hover:text-primary">Servicios</a></li>
              <li><a href="/proyectos" className="hover:text-primary">Proyectos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-primary">Términos</a></li>
              <li><a href="#" className="hover:text-primary">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Redes Sociales</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-primary">GitHub</a>
              <a href="#" className="hover:text-primary">LinkedIn</a>
              <a href="#" className="hover:text-primary">Twitter</a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; 2024 JorghitoTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
