# JorghitoTech - Portafolio de Desarrollo de Software

Plataforma full-stack para mostrar servicios de desarrollo de software (web, desktop y móvil), proyectos realizados y panel de administración para el desarrollador.

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Panel de control para gestionar proyectos y servicios
- ✅ Portafolio de proyectos destacados
- ✅ Listado de servicios ofrecidos
- ✅ Sistema de comentarios en proyectos
- ✅ Formulario de contacto
- ✅ Perfil de usuario personalizable
- ✅ Diseño responsivo con Tailwind CSS
- ✅ API REST con Django

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
- `/` - Página de inicio
- `/servicios` - Listado de servicios
- `/proyectos` - Portafolio de proyectos
- `/contacto` - Formulario de contacto
- `/login` - Iniciar sesión
- `/registro` - Registrarse
- `/panel` - Panel de control (protegido)

### Backend API
- `GET /api/services/` - Obtener servicios
- `GET /api/projects/` - Obtener proyectos
- `POST /api/users/register/` - Registrar usuario
- `POST /api/token/` - Obtener token JWT
- `GET /api/users/me/` - Obtener usuario autenticado

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
- Django 4.2
- Django REST Framework
- PostgreSQL
- JWT Authentication

### Frontend
- React 18
- Vite
- React Router
- Zustand (State Management)
- Tailwind CSS
- Axios

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