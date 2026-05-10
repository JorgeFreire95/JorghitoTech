import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-gray-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">¡Bienvenido a JorghitoTech!</h1>
            <p className="text-xl text-gray-300 mb-8">
              Desarrollo profesional de software para web, desktop y dispositivos móviles.
              Transformamos tus ideas en soluciones digitales innovadoras.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/servicios" className="btn-primary">Ver Servicios</Link>
              <Link to="/proyectos" className="btn-secondary">Ver Proyectos</Link>
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
      <section className="bg-primary text-white py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">¿Tienes un proyecto en mente?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Estoy listo para ayudarte a convertir tu idea en realidad
          </p>
          <Link to="/contacto" className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Contáctame
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
