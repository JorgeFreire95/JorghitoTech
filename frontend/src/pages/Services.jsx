import React, { useEffect } from 'react';
import { useServiceStore } from '../store';

const Services = () => {
  const { services, fetchServices, isLoading } = useServiceStore();

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div>
      <section className="bg-secondary text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold">Mis Servicios</h1>
          <p className="text-gray-300 mt-4">Soluciones completas de desarrollo de software</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <p className="text-center">Cargando servicios...</p>
            ) : services.length > 0 ? (
              services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <div className="text-4xl mb-4">{getServiceIcon(service.service_type)}</div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-primary text-white px-3 py-1 rounded">
                      {getServiceTypeName(service.service_type)}
                    </span>
                    {service.price && (
                      <span className="text-lg font-bold text-primary">
                        ${parseFloat(service.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No hay servicios disponibles</p>
            )}
          </div>
        </div>
      </section>

      {/* How I Work */}
      <section className="bg-gray-50 py-16">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12 text-center">Mi Proceso de Trabajo</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Consulta', description: 'Entendemos tus necesidades y objetivos' },
              { step: 2, title: 'Planificación', description: 'Diseñamos la solución perfecta para ti' },
              { step: 3, title: 'Desarrollo', description: 'Codificamos con altos estándares de calidad' },
              { step: 4, title: 'Entrega', description: 'Presentamos un producto listo para usar' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const getServiceTypeName = (type) => {
  const types = {
    web: 'Web',
    desktop: 'Desktop',
    mobile: 'Móvil'
  };
  return types[type] || type;
};

const getServiceIcon = (type) => {
  const icons = {
    web: '🌐',
    desktop: '💻',
    mobile: '📱'
  };
  return icons[type] || '⚙️';
};

export default Services;
