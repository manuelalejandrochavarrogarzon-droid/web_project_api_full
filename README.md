# Around the U.S. — Full Stack

Aplicación web full stack que permite a los usuarios registrarse, iniciar sesión, gestionar su perfil y avatar, crear tarjetas con imágenes e interactuar con las tarjetas disponibles mediante un sistema de «Me gusta».

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión mediante JWT.
- Autenticación y protección de rutas.
- Consulta y actualización del perfil.
- Actualización del avatar.
- Creación y eliminación de tarjetas.
- Añadir y quitar «Me gusta» en las tarjetas.
- Persistencia de datos mediante MongoDB.
- Validación de datos y manejo de errores.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- React Router

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- Celebrate
- Joi
- Winston
- express-winston
- CORS

### Despliegue

- Google Cloud
- Nginx
- PM2
- HTTPS
- Certbot

## URLs del proyecto

- **Frontend:** https://tripleten19.chickenkiller.com
- **API:** https://tripleten19.chickenkiller.com/api/

## Instalación y ejecución local

### Requisitos previos

Antes de comenzar, asegúrate de tener instalados:

- Node.js y npm.
- MongoDB.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/manuelalejandrochavarrogarzon-droid/web_project_api_full.git
cd web_project_api_full
```

### 2. Configurar y ejecutar el backend

Accede a la carpeta del backend:

```bash
cd backend
npm install
```

Configura las variables de entorno necesarias para el backend, incluyendo el puerto, la conexión a MongoDB y el secreto JWT, según la configuración de tu aplicación.

Inicia el servidor:

```bash
npm start
```

Si el proyecto utiliza otro script para iniciar el servidor en desarrollo, consulta los scripts definidos en `backend/package.json`.

### 3. Configurar y ejecutar el frontend

Abre otra terminal y accede a la carpeta del frontend:

```bash
cd web_project_api_full/frontend
npm install
```

Verifica que la URL base de la API en `src/utils/api.js` apunte al backend local si vas a ejecutar todo el proyecto en tu equipo.

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Vite mostrará la dirección local desde la que puedes abrir la aplicación.

### 4. Generar la versión de producción

Desde la carpeta `frontend`, ejecuta:

```bash
npm run build
```

El comando genera los archivos optimizados de producción en la carpeta `dist`.

## Despliegue

La aplicación está desplegada en una máquina virtual de Google Cloud.

- **Nginx:** servidor web y proxy inverso.
- **PM2:** administración del proceso Node.js.
- **MongoDB:** almacenamiento de usuarios y tarjetas.
- **HTTPS:** conexión segura mediante certificado SSL.

## Autor

Proyecto desarrollado como parte del programa de Desarrollo Web de TripleTen.
