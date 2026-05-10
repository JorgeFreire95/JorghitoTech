<!-- Django Admin Customization -->

Este proyecto incluye las siguientes apps Django:

## Apps Principales

### 1. Users (portfolio_api.users)
- **Modelos:**
  - `UserProfile`: Perfil extendido del usuario con foto, ubicación, redes sociales
  
- **Endpoints:**
  - `POST /api/users/register/` - Registrar nuevo usuario
  - `GET /api/users/me/` - Obtener usuario autenticado
  - `GET /api/users/profiles/my_profile/` - Obtener perfil del usuario
  - `PUT /api/users/profiles/update_profile/` - Actualizar perfil

### 2. Services (portfolio_api.services)
- **Modelos:**
  - `Service`: Servicios ofrecidos (Web, Desktop, Mobile)
  
- **Campos:**
  - title, description, service_type, icon, price, featured
  
- **Endpoints:**
  - `GET /api/services/` - Listar todos los servicios
  - `POST /api/services/` - Crear nuevo servicio (requiere autenticación)
  - `PUT /api/services/{id}/` - Actualizar servicio
  - `DELETE /api/services/{id}/` - Eliminar servicio

### 3. Projects (portfolio_api.projects)
- **Modelos:**
  - `Project`: Proyectos en el portafolio
  - `ProjectComment`: Comentarios en proyectos
  
- **Campos del Project:**
  - title, description, image, technologies, github_url, live_url, featured, views_count
  
- **Endpoints:**
  - `GET /api/projects/` - Listar todos los proyectos
  - `POST /api/projects/` - Crear nuevo proyecto
  - `GET /api/projects/{id}/` - Obtener detalles del proyecto
  - `POST /api/projects/{id}/add_comment/` - Agregar comentario
  - `GET /api/projects/{id}/increment_views/` - Incrementar contador de vistas

## Autenticación

El proyecto usa **JWT (JSON Web Tokens)** para autenticación:

- `POST /api/token/` - Obtener token de acceso y refresh
- `POST /api/token/refresh/` - Renovar token de acceso

## Admin de Django

Para acceder al admin:
1. Crea un superusuario: `python manage.py createsuperuser`
2. Accede en: `http://localhost:8000/admin/`

## Fixtures de Prueba (Opcional)

Para cargar datos de ejemplo:
```bash
python manage.py loaddata fixtures/initial_data.json
```
