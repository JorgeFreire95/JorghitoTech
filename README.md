# JorghitoTech - Soluciones Digitales de Vanguardia

Plataforma profesional diseñada para ofrecer soluciones integrales en desarrollo de software (Web, Desktop y Móvil). Con una identidad visual premium inspirada en el futurismo digital y una arquitectura de gestión empresarial robusta.

## 🚀 Características y Funcionalidades

### 1. Gestión de Proyectos y Entregas
- ✅ **Seguimiento Dinámico**: Visualización del porcentaje de avance automatizado según el estado del proyecto (Desarrollo: 25%, Revisión: 50%, Finalizado: 100%).
- ✅ **Gestión de Entregas**: Módulo administrativo para proporcionar enlaces de descarga/sitio web e instrucciones detalladas de funcionamiento al cliente.
- ✅ **Estados de Servicio**: Flujo de estados profesional (En Desarrollo, En Revisión, Finalizado, En Mantenimiento).

### 2. Sistema de Soporte Técnico (Ticketing)
- ✅ **Levantamiento de Tickets**: Formulario especializado para reportar incidencias con selección de prioridad (Baja, Media, Alta).
- ✅ **Bandeja de Entrada Admin**: Panel centralizado para que el administrador gestione y responda tickets.
- ✅ **Respuestas Premium**: Notificaciones visuales para el usuario cuando JorghitoTech ha dado solución a su requerimiento.

### 3. Automatización de Mantenciones y Pagos
- ✅ **Ciclos de 30 Días**: Cálculo automático del próximo pago desde el día de la compra del servicio.
- ✅ **Alertas de Vencimiento**: Notificaciones visuales preventivas 5 días antes de la fecha de pago.
- ✅ **Detección de Expiración**: Alertas críticas y bloqueo visual de servicios vencidos para incentivar la reactivación.

### 4. Comunicación y Notificaciones
- ✅ **Chat en Tiempo Real**: Sistema de mensajería directa entre cliente y administrador.
- ✅ **Indicadores de Notificación**: Conteo de mensajes no leídos y estado de conexión del administrador.

### 5. UI/UX Premium
- ✅ **Diseño Glassmorphism**: Interfaz moderna con efectos de desenfoque, degradados neón y animaciones fluidas.
- ✅ **Dashboards Especializados**: Paneles independientes y optimizados para Clientes y Administradores.

## 📚 Tecnologías Utilizadas

### Frontend
- **React 18+ (Vite)**: Motor de interfaz de alta velocidad.
- **Tailwind CSS**: Framework de diseño para el estilo "Deep Dark & Neon Blue".
- **Zustand**: Gestión de estado global ligera y eficiente.
- **Axios**: Comunicación fluida con la API.
- **Lucide React / Emojis**: Iconografía técnica y amigable.

### Backend
- **Django 5.0+**: Framework robusto de Python para la lógica de negocio.
- **Django REST Framework**: Potente motor de APIs para la comunicación con el frontend.
- **SimpleJWT**: Autenticación segura mediante tokens JSON Web.
- **Python Decouple**: Gestión profesional de variables de entorno y secretos.

### Base de Datos
- **PostgreSQL**: Base de datos relacional de grado empresarial utilizada en producción.
- **SQLite**: Utilizada para prototipado rápido y desarrollo local.

## 📋 Requisitos Previos

- Python 3.10+
- Node.js 18+
- PostgreSQL 14+ (Recomendado)
- npm o yarn

## 🔧 Instalación y Configuración

### Backend (Django)

1. **Entorno Virtual:**
```bash
cd backend
py -m venv venv
venv\Scripts\activate
```

2. **Dependencias y Migraciones:**
```bash
pip install -r requirements.txt
py manage.py migrate
py manage.py createsuperuser
```

3. **Ejecución:**
```bash
py manage.py runserver
```

### Frontend (React)

1. **Instalación:**
```bash
cd frontend
npm install
```

2. **Ejecución:**
```bash
npm run dev
```

## 🛣️ Arquitectura de la API (Endpoints Clave)

- `GET/POST /api/support/tickets/`: Gestión de tickets de soporte.
- `PATCH /api/services/contracted/{id}/`: Actualización de proyectos y fechas de pago.
- `GET /api/support/messages/unread_counts/`: Sistema de notificaciones admin.
- `POST /api/users/register/`: Registro de nuevos clientes con validación de datos.

## 💳 Métodos de Pago
El sistema está estructurado para integrarse fácilmente con pasarelas de pago como:
- **Transbank (Webpay)**
- **PayPal**
- **Mercado Pago**
*(Actualmente en modo de gestión administrativa de estados de pago).*

## 📝 Licencia
Este proyecto es propiedad de **JorghitoTech** y está bajo la licencia MIT.

## 👨‍💻 Autor
**Jorge Freire** - *JorghitoTech Founder*

---
**¿Necesitas soluciones digitales?** Visítanos en [jorghitotech.com](http://localhost:5173)