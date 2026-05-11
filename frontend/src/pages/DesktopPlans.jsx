import React from 'react';
import { Link } from 'react-router-dom';

const DesktopPlans = () => {
  const systems = [
    {
      id: 'ventas',
      title: 'Ventas e Inventario',
      description: 'Control total de tu negocio. Gestión de stock, proveedores, reportes de ventas y cierre de caja diario.',
      features: [
        'Gestión de Productos y Categorías',
        'Alertas de Stock Bajo',
        'Múltiples Métodos de Pago',
        'Reportes de Utilidades',
        'Gestión de Clientes',
        'Base de Datos Local'
      ],
      icon: '📦',
      tag: 'Más Popular'
    },
    {
      id: 'restaurante',
      title: 'Sistema para Restaurantes',
      description: 'Optimiza la atención de tu local. Gestión de mesas, comandas, control de cocina y facturación rápida.',
      features: [
        'Mapa de Mesas Interactivo',
        'Comandas para Cocina',
        'Gestión de Menú y Recetas',
        'Control de Insumos',
        'División de Cuentas',
        'Soporte para Pantallas Táctiles'
      ],
      icon: '🍽️',
      tag: 'Especializado'
    },
    {
      id: 'taller',
      title: 'Taller Mecánico',
      description: 'Administración eficiente de vehículos. Órdenes de servicio, historial de reparaciones y seguimiento de trabajos.',
      features: [
        'Órdenes de Trabajo Digitales',
        'Historial por Matrícula',
        'Presupuestos Detallados',
        'Control de Repuestos',
        'Recordatorios de Mantenimiento',
        'Gestión de Mecánicos'
      ],
      icon: '🔧',
      tag: 'Premium'
    },
    {
      id: 'facturacion',
      title: 'Sistema de Facturación',
      description: 'Emisión de comprobantes de manera rápida y sencilla, cumpliendo con las normativas locales.',
      features: [
        'Facturación Electrónica',
        'Nota de Crédito/Débito',
        'Catálogo de Servicios/Bienes',
        'Reportes para Impuestos',
        'Envío por Correo',
        'Configuración de Impuestos'
      ],
      icon: '📑',
      tag: 'Esencial'
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
          <h1 className="text-6xl font-extrabold mb-6 glow-text">Sistemas Desktop</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Software robusto y eficiente instalado directamente en tu equipo. Soluciones a medida para cada sector comercial.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {systems.map((system) => (
              <div key={system.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col hover:transform hover:-translate-y-2 transition duration-300">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-5xl">{system.icon}</div>
                    <span className="bg-primary bg-opacity-10 text-primary px-4 py-1 rounded-full text-sm font-bold border border-primary border-opacity-20">
                      {system.tag}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{system.title}</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {system.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {system.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-100">
                    <Link 
                      to="/contacto" 
                      className="block text-center bg-secondary text-primary border-2 border-primary py-4 rounded-xl font-bold hover:bg-primary hover:text-secondary transition-all shadow-lg"
                    >
                      Solicitar Demo / Cotización
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
          <h2 className="text-3xl font-bold mb-6">¿Tu negocio es diferente?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Creamos software desde cero para automatizar cualquier proceso administrativo o industrial.
          </p>
          <Link to="/contacto" className="btn-primary inline-block rounded-full">
            Consulta Personalizada
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DesktopPlans;
