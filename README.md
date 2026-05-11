# JorghitoTech - Soluciones Digitales de Vanguardia

Plataforma profesional diseñada para ofrecer soluciones integrales en desarrollo de software (Web, Desktop y Móvil). Con una identidad visual premium inspirada en el futurismo digital y una arquitectura robusta.

## 🚀 Características

- ✅ **Identidad Visual Premium**: Tema oscuro con acentos de Cian Neón y efectos de resplandor (Glow).
- ✅ **Planes Detallados**: Secciones específicas para Landing Pages, E-commerce, Sistemas Administrativos y Apps Móviles.
- ✅ **Panel de Administración**: Gestión centralizada de usuarios, servicios contratados y progreso de proyectos exclusivo para personal (is_staff).
- ✅ **Soporte Multi-usuario**: Sistema de chat integral con notificaciones de mensajes no leídos y comunicación en tiempo real entre admin y clientes.
- ✅ **Seguimiento de Progreso**: Visualización dinámica del porcentaje de avance y estados de los servicios adquiridos (Desarrollo, Revisión, Finalizado).
- ✅ **Autenticación Segura**: Implementación de JWT para proteger el acceso administrativo y de clientes.
- ✅ **Portafolio Interactivo**: Galería de proyectos con filtrado y sistema de comentarios.
- ✅ **Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y escritorio con Tailwind CSS.
- ✅ **API REST Robusta**: Motor backend potente desarrollado con Django y soporte para tareas asíncronas básicas.

## 📋 Requisitos Previos

- Python 3.8+
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

## 🔧 Instalación

### Backend (Django)

1. **Clona el repositorio:**
```bash
cd backend
```

2. **Crea un entorno virtual:**
```bash
python -m venv venv
```

3. **Activa el entorno virtual:**
```bash
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate
```

4. **Instala las dependencias:**
```bash
pip install -r requirements.txt
```

5. **Copia el archivo de variables de entorno:**
```bash
copy .env.example .env
```

6. **Configura la base de datos:**
```bash
python manage.py migrate
```

7. **Crea un superusuario:**
```bash
python manage.py createsuperuser
```

8. **Ejecuta el servidor de desarrollo:**
```bash
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000`

### Frontend (React)

1. **Navega al directorio frontend:**
```bash
cd frontend
```

2. **Instala las dependencias:**
```bash
npm install
```

3. **Copia el archivo de variables de entorno:**
```bash
copy .env.example .env.local
```

4. **Ejecuta el servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
JorghitoTech/
├── backend/
│   ├── portfolio_api/
│   │   ├── core/              # Configuración del proyecto
│   │   ├── users/             # App de usuarios
│   │   ├── services/          # App de servicios
│   │   ├── support/           # App de soporte (Chat y Notificaciones)
│   │   └── projects/          # App de proyectos
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
└── frontend/
    ├── src/
    │   ├── components/        # Componentes reutilizables
    │   ├── pages/            # Páginas principales
    │   ├── services/         # Servicios API
    │   ├── store/            # Estado global (Zustand)
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── .env.example
```

## 🛣️ Rutas Principales

### Frontend
- `/` - Página de inicio (Hero Section con Branding)
- `/servicios` - Catálogo general de servicios
- `/servicios/web-planes` - Detalles de Landing Pages y E-commerce
- `/servicios/desktop-planes` - Detalles de Sistemas POS, Restaurantes y Facturación
- `/servicios/movil-planes` - Detalles de Apps Corporativas y Personales
- `/proyectos` - Portafolio de proyectos
- `/contacto` - Formulario de solicitud de cotización
- `/login` - Acceso administrativo
- `/panel` - Dashboard de cliente (Servicios contratados)
- `/admin-panel` - Panel de administración (Gestión de usuarios y chat)

### Backend API
- `GET /api/services/` - Obtener servicios
- `GET /api/projects/` - Obtener proyectos
- `POST /api/users/register/` - Registrar usuario
- `POST /api/token/` - Obtener token JWT
- `GET /api/users/me/` - Obtener usuario autenticado
- `GET /api/support/messages/` - Historial de chat (Filtro automático por usuario)
- `POST /api/support/messages/` - Enviar mensaje (Soporta respuestas de admin)
- `GET /api/support/messages/unread_counts/` - Conteo de notificaciones (Admin)
- `GET /api/support/messages/admin_status/` - Estado de conexión del admin

## 🔐 Variables de Entorno

### Backend (.env)
```
SECRET_KEY=tu-clave-secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=jorghitotech_db
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_PORT=5432
```

### Frontend (.env.local)
```
VITE_API_URL=http://localhost:8000/api
```

## 📚 Tecnologías Utilizadas

### Backend
- Django 6.0 / 4.2+
- Django REST Framework
- SQLite (Desarrollo) / PostgreSQL (Producción)
- JWT Authentication (SimpleJWT)
- Python Decouple (Gestión de .env)

### Frontend
- React 18+ (Vite)
- Tailwind CSS (Diseño Custom Neon)
- React Router 6
- Zustand (Estado Global)
- Axios & JWT handling

## 🚀 Despliegue

### Backend (Producción)
```bash
# Build con gunicorn
gunicorn portfolio_api.core.wsgi:application
```

### Frontend (Producción)
```bash
# Build
npm run build

# Preview
npm run preview
```

## 📝 Licencia

Este proyecto está bajo la licencia MIT.

## 👨‍💻 Autor

Jorge - JorghitoTech

---

**¿Preguntas o sugerencias?** Contáctame en [tu@email.com](mailto:tu@email.com)