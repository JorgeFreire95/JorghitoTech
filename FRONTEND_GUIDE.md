# Frontend - Guía de Desarrollo

## 🎨 Estructura de Componentes

### Carpeta `components/`
- `Navbar.jsx` - Barra de navegación principal
- `Footer.jsx` - Pie de página
- `ProtectedRoute.jsx` - HOC para rutas protegidas

### Carpeta `pages/`
- `Home.jsx` - Página de inicio
- `Services.jsx` - Listado de servicios
- `Projects.jsx` - Portafolio de proyectos
- `Contact.jsx` - Formulario de contacto
- `Login.jsx` - Página de inicio de sesión
- `Register.jsx` - Página de registro
- `Dashboard.jsx` - Panel de control del usuario

### Carpeta `services/`
- `api.js` - Configuración de Axios con interceptores
- `index.js` - Funciones de API para cada recurso

### Carpeta `store/`
- `index.js` - Estado global con Zustand

## 🎯 Flujo de Estado

El proyecto usa **Zustand** para gestionar estado:

```javascript
// useAuthStore - Autenticación
- login(username, password)
- register(username, email, password)
- logout()
- user, isAuthenticated, isLoading, error

// useServiceStore - Servicios
- fetchServices(params)
- services, isLoading, error

// useProjectStore - Proyectos
- fetchProjects(params)
- fetchProjectById(id)
- projects, currentProject, isLoading, error
```

## 🎨 Tailwind CSS

Clases personalizadas disponibles en `index.css`:
- `.btn-primary` - Botón azul principal
- `.btn-secondary` - Botón gris secundario
- `.container` - Contenedor responsive

## 📱 Puntos de Quiebre (Breakpoints)

Tailwind usa:
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

## 🔄 Ejemplo: Agregar Nueva Página

1. Crear componente en `src/pages/NewPage.jsx`
2. Agregar ruta en `App.jsx`:
```javascript
<Route path="/nueva-pagina" element={<NewPage />} />
```
3. Agregar enlace en `Navbar.jsx` si es necesario

## 🌐 Variables de Entorno

```
VITE_API_URL=http://localhost:8000/api
```

## 📦 Construir para Producción

```bash
npm run build
```

El resultado se guardará en la carpeta `dist/`

## 🚀 Preview de Producción

```bash
npm run preview
```

## ✅ Linting

```bash
npm run lint
```
