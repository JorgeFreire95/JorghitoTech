import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary via-[#0a122a] to-secondary text-white py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-10 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 rounded-full filter blur-[100px] opacity-10 -ml-48 -mb-48"></div>
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <h1 className="text-6xl md:text-7xl font-extrabold mb-6 glow-text leading-tight">
                ¡Bienvenido a <span className="text-primary">JorghitoTech</span>!
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Desarrollo profesional de software para web, desktop y dispositivos móviles.
                Transformamos tus ideas en soluciones digitales innovadoras con tecnología de vanguardia.
              </p>
              <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                <Link to="/servicios" className="btn-primary">Ver Servicios</Link>
                <Link to="/proyectos" className="btn-secondary">Ver Proyectos</Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary rounded-full filter blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              <img 
                src={logo} 
                alt="JorghitoTech Logo" 
                className="w-64 h-64 md:w-96 md:h-96 object-contain relative z-10 animate-pulse-slow drop-shadow-[0_0_30px_rgba(0,209,255,0.3)]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🌐',
                title: 'Desarrollo Web',
                description: 'Sitios web modernos, responsivos y de alto rendimiento'
              },
              {
                icon: '💻',
                title: 'Desarrollo Desktop',
                description: 'Aplicaciones de escritorio robustas y eficientes'
              },
              {
                icon: '📱',
                title: 'Desarrollo Móvil',
                description: 'Apps móviles nativas y multiplataforma'
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'E-commerce Platform',
                description: 'Plataforma de e-commerce completa con carrito de compras y pasarela de pagos'
              },
              {
                title: 'Task Management App',
                description: 'Aplicación para gestionar tareas en equipo con notificaciones en tiempo real'
              }
            ].map((project, idx) => (
              <div key={idx} className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <Link to="/proyectos" className="text-primary hover:underline">
                  Ver más →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-blue-400 text-secondary py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-extrabold mb-6">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl mb-8 font-medium">
            Estoy listo para ayudarte a convertir tu idea en realidad
          </p>
          <Link to="/contacto" className="inline-block bg-secondary text-primary px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-secondary transition-all shadow-xl">
            Contáctame
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
