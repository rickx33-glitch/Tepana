# Tepana | Gestor de tareas laborales

**Tepana** es una aplicación web desarrollada para organizar y administrar pendientes laborales de manera sencilla, visual e intuitiva.

El proyecto permite a los usuarios registrarse, iniciar sesión y administrar sus propias tareas mediante una interfaz web conectada a una API REST. La información se almacena en una base de datos MongoDB, mientras que la autenticación se gestiona mediante JSON Web Tokens (JWT).

## Características principales

- **Registro de usuarios:** creación de cuentas mediante nombre, correo electrónico y contraseña.
- **Inicio de sesión:** autenticación de usuarios mediante JWT.
- **Agregar tareas:** registrar nuevos pendientes laborales.
- **Consultar tareas:** visualizar las tareas asociadas al usuario autenticado.
- **Editar tareas:** modificar el nombre de una tarea.
- **Completar tareas:** cambiar el estado entre pendiente y completada.
- **Eliminar tareas:** quitar tareas de la lista.
- **Contadores dinámicos:** visualizar el total de tareas, pendientes y completadas.
- **Persistencia de información:** almacenar usuarios y tareas en MongoDB Atlas.
- **Protección de rutas:** verificar el token de autenticación antes de permitir operaciones sobre las tareas.
- **Diseño responsivo:** adaptar la interfaz a computadoras, tabletas y teléfonos móviles.

## Tecnologías utilizadas

| Tecnología | Aplicación en el proyecto |
|---|---|
| HTML5 | Estructura de la aplicación. |
| CSS3 | Diseño visual y responsividad. |
| JavaScript ES6+ | Lógica e interactividad del frontend. |
| Node.js | Entorno de ejecución del backend. |
| Express.js | Desarrollo de la API REST. |
| MongoDB Atlas | Almacenamiento de usuarios y tareas. |
| Mongoose | Modelado y conexión con MongoDB. |
| JSON Web Token (JWT) | Autenticación y protección de rutas. |
| bcryptjs | Encriptación de contraseñas. |
| CORS | Configuración de comunicación entre frontend y backend. |
| dotenv | Administración de variables de entorno. |
| Git y GitHub | Control de versiones y alojamiento del código. |
| Visual Studio Code | Entorno de desarrollo. |

## Arquitectura del sistema

Tepana utiliza una arquitectura cliente-servidor dividida en dos componentes principales:

**Frontend**

Desarrollado con HTML, CSS y JavaScript. Proporciona la interfaz mediante la cual el usuario puede registrarse, iniciar sesión y administrar sus tareas. Se comunica con el backend mediante solicitudes HTTP utilizando Fetch API.

**Backend**

Desarrollado con Node.js y Express. Procesa las solicitudes del frontend, valida la autenticación, ejecuta las operaciones CRUD y se comunica con MongoDB Atlas mediante Mongoose.

**Base de datos**

MongoDB Atlas almacena la información de los usuarios y sus tareas. Cada tarea está asociada al usuario que la creó.

## Estructura del proyecto

```text
Tepana/
│
├── index.html
├── styles.css
├── app.js
├── README.md
│
├── backend/
│   ├── config/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Tarea.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tareas.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── evidencias/
    ├── 01_Inicio.png
    ├── 02_Crear.png
    ├── 03_Editar.png
    ├── 04_Completar.png
    └── 05_Celular.png
```

**Nota:** El archivo `.env` se configura localmente y no debe publicarse en GitHub.

## Instalación y configuración

### 1. Requisitos previos

- Node.js instalado.
- Visual Studio Code.
- MongoDB Atlas con una base de datos configurada.
- Extensión Live Server para Visual Studio Code.

### 2. Descargar el repositorio

Clonar el repositorio:

```bash
git clone https://github.com/rickx33-glitch/Tepana.git
```

Abrir la carpeta `Tepana` en Visual Studio Code.

### 3. Instalar dependencias del backend

Abrir una terminal en la carpeta principal y ejecutar:

```bash
cd backend
npm install
```

### 4. Configurar variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend` con las siguientes variables:

```env
PORT=3000
MONGODB_URI=TU_URI_DE_MONGODB_ATLAS
JWT_SECRET=TU_CLAVE_SECRETA
```

Sustituir los valores de ejemplo por las credenciales correspondientes. No compartir este archivo ni subirlo al repositorio.

### 5. Iniciar el servidor

Desde la carpeta `backend`, ejecutar:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

La ruta principal permite comprobar que la API está funcionando correctamente.

### 6. Ejecutar el frontend

Abrir la carpeta principal del proyecto en Visual Studio Code.

Abrir `index.html` mediante la extensión Live Server.

La aplicación se comunicará con el backend local a través de la dirección configurada en `app.js`.

**Importante:** Para utilizar el frontend localmente, el backend debe permanecer en ejecución. La versión publicada en GitHub Pages todavía requiere que el backend esté desplegado públicamente para funcionar desde otros dispositivos.

## Documentación de la API REST

La API utiliza las siguientes rutas:

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registrar un nuevo usuario. |
| POST | `/api/auth/login` | Iniciar sesión y obtener un token JWT. |

### Gestión de tareas

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tareas` | Consultar las tareas del usuario autenticado. |
| POST | `/api/tareas` | Crear una nueva tarea. |
| PUT | `/api/tareas/:id` | Actualizar una tarea existente. |
| DELETE | `/api/tareas/:id` | Eliminar una tarea. |

### Autenticación de solicitudes

Las operaciones de gestión de tareas requieren enviar el token JWT en el encabezado HTTP:

```http
Authorization: Bearer TOKEN_JWT
```

### Ejemplos de solicitudes

**Registro de usuario:**

```json
{
  "nombre": "Usuario",
  "correo": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Inicio de sesión:**

```json
{
  "correo": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

**Creación de tarea:**

```json
{
  "nombre": "Revisar pendientes laborales"
}
```

**Actualización de tarea:**

```json
{
  "nombre": "Revisar pendientes actualizados",
  "completada": true
}
```

## Seguridad y validaciones

El proyecto incorpora mecanismos básicos de seguridad:

- Las contraseñas se protegen mediante bcryptjs.
- La autenticación utiliza tokens JWT.
- Las rutas de tareas están protegidas mediante middleware de autenticación.
- Las tareas se consultan y modifican únicamente dentro del contexto del usuario autenticado.
- Se implementan validaciones para evitar registros y operaciones con información inválida.
- Las credenciales de conexión se administran mediante variables de entorno.

## Evidencias del proyecto

La carpeta `evidencias/` contiene capturas de pantalla que muestran el funcionamiento de la aplicación:

1. Pantalla de inicio.
2. Creación de tareas.
3. Edición de tareas.
4. Finalización de tareas.
5. Visualización desde un teléfono móvil.

## Objetivo del proyecto

Desarrollar una aplicación web de gestión de tareas que permita integrar conocimientos de desarrollo frontend y backend, programación con JavaScript, creación de servicios REST, autenticación de usuarios, conexión con bases de datos y operaciones CRUD.

## Enlaces del proyecto

- **Repositorio GitHub:** https://github.com/rickx33-glitch/Tepana
- **Aplicación publicada:** https://rickx33-glitch.github.io/Tepana/

---

**Proyecto académico | Ingeniería en Desarrollo de Software**

Desarrollado por: Irving Ricardo Martínez Rodríguez.