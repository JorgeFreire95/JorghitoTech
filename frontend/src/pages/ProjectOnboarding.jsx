import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuthStore, useContractedServiceStore } from '../store';

const ProjectOnboarding = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createContractedService } = useContractedServiceStore();
  const [step, setStep] = useState(1); // 1: Form, 2: Payment, 3: Success
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const planId = queryParams.get('plan');
    if (planId) {
      setPlan(planId);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    functionalities: '',
    domain: '',
    hasLogo: 'need_design', // 'yes', 'need_design'
    logoFile: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logoFile: e.target.files[0] });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    nextStep();
  };

  const handlePayment = async () => {
    // Simular procesamiento de pago
    try {
      await createContractedService({
        name: `${getPlanName()} - ${formData.domain || 'Nuevo Proyecto'}`,
        status: 'desarrollo',
        progress: 10,
        monthly_fee: 30000,
        website_url: formData.domain ? `https://${formData.domain}` : ''
      });
      setStep(3);
    } catch (err) {
      console.error("Error creating service", err);
      // Avanzamos de todos modos por ser simulación
      setStep(3);
    }
  };

  const getPlanName = () => {
    switch (plan) {
      case 'landing': return 'Landing Page';
      case 'ecommerce': return 'Ecommerce';
      case 'custom': return 'Web Corporativa';
      default: return 'Desarrollo Web';
    }
  };

  const getPlanPrice = () => {
    switch (plan) {
      case 'landing': return '$100.000';
      case 'ecommerce': return '$125.000';
      case 'custom': return '$150.000';
      default: return '0';
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
          <div className={`absolute top-1/2 left-0 h-1 bg-primary -z-10 transform -translate-y-1/2 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }}></div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${step >= s ? 'bg-primary text-secondary border-4 border-white shadow-lg' : 'bg-gray-200 text-gray-500 border-4 border-white'}`}>
                {s < step || step === 3 ? '✓' : s}
              </div>
              <span className={`mt-2 text-sm font-bold ${step >= s ? 'text-secondary' : 'text-gray-400'}`}>
                {s === 1 ? 'Detalles' : s === 2 ? 'Pago' : '¡Listo!'}
              </span>
            </div>
          ))}
        </div>

        {/* Step 1: Project Details */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-secondary mb-6">Cuéntanos sobre tu proyecto</h2>
              <div className="bg-blue-50 border-l-4 border-primary p-4 mb-8 rounded-r-lg">
                <p className="text-secondary font-medium">Plan seleccionado: <span className="text-primary font-bold">{getPlanName()}</span></p>
              </div>

              <form onSubmit={handleSubmitDetails} className="space-y-8">
                <div>
                  <label className="block text-secondary font-bold mb-3 text-lg">
                    Describe las funcionalidades que necesitas:
                  </label>
                  <textarea
                    required
                    name="functionalities"
                    value={formData.functionalities}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-primary focus:ring-0 transition h-40 outline-none text-gray-700"
                    placeholder="Ej: Necesito un carrito de compras, integración con Mercado Pago, chat en vivo..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-secondary font-bold mb-3 text-lg">
                    Dominio deseado (Ej: www.tuempresa.cl):
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleInputChange}
                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 focus:border-primary focus:ring-0 transition outline-none text-gray-700"
                    placeholder="www.misitio.cl"
                  />
                  <p className="text-sm text-gray-400 mt-2 italic">Sujeto a disponibilidad. Nosotros gestionamos el registro por ti.</p>
                </div>

                <div>
                  <label className="block text-secondary font-bold mb-4 text-lg">
                    ¿Tienes un logo para tu marca?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className={`cursor-pointer border-2 p-4 rounded-2xl transition flex items-center gap-3 ${formData.hasLogo === 'yes' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" name="hasLogo" value="yes" checked={formData.hasLogo === 'yes'} onChange={handleInputChange} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.hasLogo === 'yes' ? 'border-primary' : 'border-gray-300'}`}>
                        {formData.hasLogo === 'yes' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      <span className="font-bold text-secondary">Sí, ya tengo</span>
                    </label>

                    <label className={`cursor-pointer border-2 p-4 rounded-2xl transition flex items-center gap-3 ${formData.hasLogo === 'need_design' ? 'border-primary bg-blue-50 shadow-md' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" name="hasLogo" value="need_design" checked={formData.hasLogo === 'need_design'} onChange={handleInputChange} className="hidden" />
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.hasLogo === 'need_design' ? 'border-primary' : 'border-gray-300'}`}>
                        {formData.hasLogo === 'need_design' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                      </div>
                      <span className="font-bold text-secondary">No, diseñen uno</span>
                    </label>
                  </div>
                </div>

                {formData.hasLogo === 'yes' && (
                  <div className="animate-fade-in">
                    <label className="block text-secondary font-bold mb-3 text-lg">Subir Logo:</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-primary transition cursor-pointer relative">
                      <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                      <div className="text-4xl mb-2 text-gray-300">📁</div>
                      <p className="text-gray-500">
                        {formData.logoFile ? formData.logoFile.name : 'Haz clic o arrastra tu archivo aquí'}
                      </p>
                    </div>
                  </div>
                )}

                <div className="pt-6">
                  <button type="submit" className="w-full bg-primary text-secondary py-5 rounded-2xl font-bold text-xl hover:shadow-[0_0_20px_rgba(0,209,255,0.4)] transition-all duration-300 flex items-center justify-center gap-3">
                    Continuar al Pago
                    <span className="text-2xl">→</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-secondary mb-8">Resumen de Pago</h2>
              
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-gray-600 text-lg">Servicio: {getPlanName()}</span>
                  <span className="font-bold text-secondary text-lg">{getPlanPrice()} CLP</span>
                </div>
                {formData.hasLogo === 'need_design' && (
                  <div className="flex justify-between items-center py-4 border-b border-gray-100">
                    <span className="text-gray-600 text-lg">Diseño de Logo Profesional</span>
                    <span className="font-bold text-green-600 text-lg">¡Gratis!</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-gray-600 text-lg">Mensualidad de Mantención (1er mes)</span>
                  <span className="font-bold text-secondary text-lg">$30.000 CLP</span>
                </div>
                <div className="flex justify-between items-center py-6">
                  <span className="text-2xl font-extrabold text-secondary">Total a Pagar</span>
                  <span className="text-4xl font-extrabold text-primary">
                    ${(parseInt(getPlanPrice().replace('.', '').replace('$', '')) + 30000).toLocaleString('es-CL')} CLP
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-3xl mb-10 border-2 border-gray-100">
                <h3 className="font-bold text-secondary mb-6 text-xl">Método de Pago Seguro</h3>
                <div className="flex gap-4 mb-8">
                  <div className="w-16 h-10 bg-white rounded border flex items-center justify-center text-xs font-bold text-blue-800">Webpay</div>
                  <div className="w-16 h-10 bg-white rounded border flex items-center justify-center text-xs font-bold text-red-600">VISA</div>
                  <div className="w-16 h-10 bg-white rounded border flex items-center justify-center text-xs font-bold text-blue-600">MC</div>
                </div>
                
                <div className="space-y-4">
                  <input type="text" placeholder="Nombre en la tarjeta" className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-primary" />
                  <input type="text" placeholder="Número de tarjeta" className="w-full p-4 rounded-xl border border-gray-200 outline-none focus:border-primary" />
                  <div className="flex gap-4">
                    <input type="text" placeholder="MM/YY" className="w-1/2 p-4 rounded-xl border border-gray-200 outline-none focus:border-primary" />
                    <input type="text" placeholder="CVC" className="w-1/2 p-4 rounded-xl border border-gray-200 outline-none focus:border-primary" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <button onClick={prevStep} className="w-full md:w-1/3 border-2 border-gray-200 text-gray-500 py-4 rounded-2xl font-bold hover:bg-gray-50 transition">
                  Volver
                </button>
                <button onClick={handlePayment} className="w-full md:w-2/3 bg-primary text-secondary py-4 rounded-2xl font-bold text-xl hover:shadow-lg transition flex items-center justify-center gap-3">
                  Pagar Ahora
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-12 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl">
              ✓
            </div>
            <h2 className="text-4xl font-extrabold text-secondary mb-4">¡Pago Exitoso!</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-lg mx-auto">
              Hemos recibido tu pedido correctamente. Ya puedes acceder a tu panel de control para ver el estado de tu servicio.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/panel" className="bg-secondary text-primary px-12 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition">
                Ir a mi Panel
              </Link>
              <Link to="/" className="text-gray-500 font-bold px-12 py-4 hover:text-secondary transition">
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectOnboarding;
