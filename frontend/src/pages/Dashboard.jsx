import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <section className="bg-secondary text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold">Panel de Control</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Proyectos</h3>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Servicios</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-gray-500 text-sm font-bold uppercase mb-2">Visualizaciones</h3>
              <p className="text-3xl font-bold">1,234</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Mis Proyectos</h2>
              <p className="text-gray-600 mb-4">Gestiona tus proyectos destacados</p>
              <button className="btn-primary">Ver Proyectos</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
              <p className="text-gray-600 mb-4">Edita tu información personal</p>
              <button className="btn-primary">Editar Perfil</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Mis Servicios</h2>
              <p className="text-gray-600 mb-4">Administra los servicios que ofreces</p>
              <button className="btn-primary">Ver Servicios</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Mensajes</h2>
              <p className="text-gray-600 mb-4">Revisa los mensajes de contacto</p>
              <button className="btn-primary">Ver Mensajes</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
