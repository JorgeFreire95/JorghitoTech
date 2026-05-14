# JorghitoTech - Soluciones Digitales de Vanguardia

Plataforma profesional diseñada para ofrecer soluciones integrales en desarrollo de software (Web, Desktop y Móvil). Con una identidad visual premium inspirada en el futurismo digital y una arquitectura empresarial de alto rendimiento.

---

## 🏗️ Arquitectura del Sistema

El proyecto sigue una arquitectura **Decoupled (Desacoplada)**, separando completamente las responsabilidades del cliente y el servidor para garantizar escalabilidad y mantenibilidad.

### 🧩 Diagrama de Componentes
- **Frontend (Client Layer)**: Desarrollado en **React 18** con **Vite**. Gestiona la experiencia de usuario (UX) y el estado global mediante **Zustand**. La comunicación se realiza vía **Axios** consumiendo la API REST.
- **Backend (Core Logic)**: Motor basado en **Django 5.0**. Implementa el patrón **MTV (Model-Template-View)** adaptado a servicios REST mediante **Django REST Framework (DRF)**.
- **API Layer**: Interfaz **RESTful** con autenticación **JWT (JSON Web Tokens)** para una comunicación segura y sin estado (Stateless).
- **Data Layer**: 
  - **PostgreSQL**: Motor principal para persistencia de datos complejos.
  - **SQLite**: Utilizado exclusivamente para ciclos de desarrollo y testing rápido.

---

## 🔄 Metodología de Desarrollo: SCRUM

Este proyecto se gestiona bajo el marco de trabajo **SCRUM**, permitiendo entregas incrementales de valor y una respuesta rápida a cambios.

### 👥 Roles
- **Product Owner**: Jorge Freire (Definición de requerimientos y priorización).
- **Scrum Master**: AI Assistant (Gestión de bloqueos y facilitación técnica).
- **Development Team**: Full-Stack AI-Driven Development.

### 📅 Eventos Scrum
- **Sprints**: Ciclos de desarrollo enfocados en funcionalidades críticas.
- **Sprint Backlog**: 
  - **Sprint 1**: Infraestructura base y Branding.
  - **Sprint 2**: Sistema de Soporte y Chat en tiempo real.
  - **Sprint 3**: Automatización de entregas y Gestión de Tickets. (Current)
  - **Sprint 4**: Integración de pasarelas de pago y notificaciones push. (Next)

---

## 🚀 Funcionalidades Principales

### 1. Gestión de Proyectos (Incremental Delivery)
- ✅ **Seguimiento Automatizado**: Barra de progreso sincronizada con el estado (Desarrollo: 25%, Revisión: 50%, Finalizado: 100%).
- ✅ **Módulo de Entrega**: Enlaces de software e instrucciones de uso integradas en el panel del cliente.

### 2. Soporte Técnico Avanzado
- ✅ **Ticketing System**: Gestión de incidencias por prioridad.
- ✅ **Admin Response**: Respuestas oficiales con identidad corporativa.

### 3. Automatización Financiera
- ✅ **Ciclos de Facturación**: Cálculo automático de mantenciones cada 30 días.
- ✅ **Smart Alerts**: Notificaciones de "Próximo a Vencer" y "Servicio Vencido".

---

## 📚 Tecnologías Utilizadas

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend** | React 18, Tailwind CSS, Zustand, Axios, Vite |
| **Backend** | Django 5.0, DRF, SimpleJWT, Python |
| **Base de Datos** | PostgreSQL, SQLite |
| **DevOps** | Git, Environment Decoupling (.env) |

---

## 🔧 Instalación y Configuración

### Backend (Django)
```bash
cd backend
py -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```

### Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Licencia
Este proyecto es propiedad intelectual de **JorghitoTech** y está bajo la licencia MIT.

## 👨‍💻 Autor
**Jorge Freire** - *JorghitoTech Founder*

---
**¿Interesado en una solución a medida?** [Contáctanos en JorghitoTech](http://localhost:5173)