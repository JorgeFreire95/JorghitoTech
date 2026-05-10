import React from 'react';

const Contact = () => {
  return (
    <div>
      <section className="bg-secondary text-white py-16">
        <div className="container">
          <h1 className="text-5xl font-bold">Contacto</h1>
          <p className="text-gray-300 mt-4">Conectemos y hablemos sobre tu proyecto</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Envíame un Mensaje</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Nombre</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Correo Electrónico</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Asunto</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg" required />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Mensaje</label>
                  <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32" required></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">Enviar Mensaje</button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">📍 Ubicación</h3>
                  <p className="text-gray-600">Tu Ciudad, Tu País</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📧 Correo</h3>
                  <a href="mailto:tu@email.com" className="text-primary hover:underline">tu@email.com</a>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">📱 Teléfono</h3>
                  <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">🌐 Redes Sociales</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-primary hover:underline">GitHub</a>
                    <a href="#" className="text-primary hover:underline">LinkedIn</a>
                    <a href="#" className="text-primary hover:underline">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
