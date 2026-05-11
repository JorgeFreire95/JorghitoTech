import React from 'react';
import { Link } from 'react-router-dom';

const WebPlans = () => {
  const plans = [
    {
      id: 'landing',
      title: 'Landing Page',
      description: 'Una página de destino optimizada para convertir visitantes en clientes. Ideal para lanzamientos de productos o campañas específicas.',
      features: [
        'Diseño Responsivo',
        'Secciones de Impacto',
        'Formulario de Contacto',
        'Optimización SEO Básica',
        'Integración con Redes Sociales',
        'Entrega en 5-7 días'
      ],
      icon: '🚀',
      price: 'Desde $299'
    },
    {
      id: 'ecommerce',
      title: 'Ecommerce (Tienda Online)',
      description: 'Una tienda completa con carrito de compras, gestión de inventario y pasarela de pagos. Perfecta para vender tus productos al mundo.',
      features: [
        'Catálogo de Productos',
        'Carrito de Compras',
        'Pasarelas de Pago (Stripe/PayPal)',
        'Panel de Administración',
        'Gestión de Pedidos',
        'Optimización de Conversión'
      ],
      icon: '🛒',
      price: 'Desde $899'
    },
    {
      id: 'custom',
      title: 'Web Corporativa',
      description: 'Sitio web profesional para empresas que necesitan presencia digital sólida y múltiples secciones informativas.',
      features: [
        'Hasta 10 Secciones',
        'Blog / Noticias',
        'Multi-idioma opcional',
        'Diseño Premium a medida',
        'Soporte Prioritario',
        'Panel autogestionable'
      ],
      icon: '🏢',
      price: 'Desde $599'
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
          <h1 className="text-6xl font-extrabold mb-6">Planes de Desarrollo Web</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Elige la solución que mejor se adapte a tu negocio. Diseños modernos, rápidos y optimizados para cualquier dispositivo.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:transform hover:-translate-y-2 transition duration-300">
                <div className="p-8">
                  <div className="text-5xl mb-6">{plan.icon}</div>
                  <h2 className="text-3xl font-bold mb-4">{plan.title}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {plan.description}
                  </p>
                  
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <div className="text-3xl font-bold text-secondary mb-6">{plan.price}</div>
                    <Link 
                      to="/contacto" 
                      className="block text-center bg-primary text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg"
                    >
                      Solicitar Cotización
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
          <h2 className="text-3xl font-bold mb-6">¿Necesitas algo más específico?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Si tu proyecto no encaja en estos planes, no te preocupes. Realizamos desarrollos a medida según tus necesidades exactas.
          </p>
          <Link to="/contacto" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-3 rounded-full font-bold transition">
            Cuéntanos tu idea
          </Link>
        </div>
      </section>
    </div>
  );
};

export default WebPlans;
