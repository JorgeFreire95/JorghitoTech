import React from 'react';
import { Link } from 'react-router-dom';

const MobilePlans = () => {
  const plans = [
    {
      id: 'empresa',
      title: 'Aplicación para Empresa',
      description: 'Lleva tu negocio al bolsillo de tus clientes. Soluciones corporativas enfocadas en productividad, gestión y fidelización.',
      features: [
        'Diseño de Interfaz Corporativa',
        'Panel de Administración Web',
        'Notificaciones Push',
        'Integración con Sistemas Internos',
        'Multiplataforma (iOS y Android)',
        'Soporte y Mantenimiento'
      ],
      icon: '🏢',
      tag: 'Profesional'
    },
    {
      id: 'personal',
      title: 'Aplicación Personal',
      description: 'Haz realidad tu idea propia. Desde apps de servicios hasta proyectos creativos o portafolios interactivos.',
      features: [
        'Interfaz de Usuario Intuitiva',
        'Funciones a Medida',
        'Publicación en Tiendas',
        'Perfil de Usuario y Auth',
        'Diseño Moderno y Ágil',
        'Base de Datos en la Nube'
      ],
      icon: '👤',
      tag: 'Creativo'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full filter blur-3xl opacity-20 -mr-32 -mt-32"></div>
        <div className="container relative z-10">
          <Link to="/servicios" className="text-primary hover:text-white transition mb-6 inline-block">
            &larr; Volver a Servicios
          </Link>
          <h1 className="text-6xl font-extrabold mb-6 glow-text">Desarrollo Móvil</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Apps nativas y multiplataforma diseñadas para ofrecer la mejor experiencia de usuario en cualquier dispositivo móvil.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:transform hover:-translate-y-2 transition duration-300">
                <div className="p-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="text-6xl">{plan.icon}</div>
                    <span className="bg-primary bg-opacity-10 text-primary px-4 py-1 rounded-full text-sm font-bold border border-primary border-opacity-20">
                      {plan.tag}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{plan.title}</h2>
                  <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-4 mb-12">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg className="w-6 h-6 text-primary mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-8 border-t border-gray-100">
                    <Link 
                      to="/contacto" 
                      className="block text-center bg-primary text-secondary py-5 rounded-2xl font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all duration-300 text-xl"
                    >
                      Empezar Proyecto
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary text-white py-16">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">¿Tienes una idea innovadora?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
            Utilizamos tecnologías como React Native y Flutter para entregar aplicaciones rápidas, seguras y visualmente impactantes.
          </p>
          <Link to="/contacto" className="btn-secondary inline-block rounded-full px-12">
            Hablemos de tu App
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MobilePlans;
