# Tepana | Gestor de tareas laborales

**Tepana** es una aplicación web diseñada para organizar y administrar pendientes laborales de manera sencilla, visual e intuitiva.

La aplicación permite a los usuarios registrarse, iniciar sesión y gestionar sus propias tareas desde una interfaz web responsiva. Su arquitectura utiliza un frontend conectado a una API REST, un backend desarrollado con Node.js y una base de datos MongoDB Atlas.

## Características principales

- **Registro de usuarios:** creación de cuentas mediante nombre, correo electrónico y contraseña.
- **Inicio de sesión:** autenticación mediante JSON Web Tokens (JWT).
- **Agregar tareas:** registrar nuevos pendientes laborales.
- **Consultar tareas:** visualizar las tareas del usuario autenticado.
- **Editar tareas:** modificar la descripción de tareas existentes.
- **Completar tareas:** cambiar el estado entre pendiente y completada.
- **Eliminar tareas:** quitar tareas de la lista.
- **Contadores dinámicos:** visualizar el total de tareas, pendientes y completadas.
- **Persistencia de información:** almacenar usuarios y tareas en MongoDB Atlas.
- **Protección de rutas:** utilizar middleware de autenticación para proteger las operaciones de gestión de tareas.
- **Diseño responsivo:** adaptar la interfaz a computadoras, tabletas y teléfonos móviles.

## Tecnologías utilizadas

| Tecnología | Aplicación en el proyecto |
|---|---|
| HTML5 | Estructura de la aplicación web. |
| CSS3 | Diseño visual, estilos y responsividad. |
| JavaScript ES6+ | Lógica e interactividad del frontend. |
| Node.js | Entorno de ejecución del backend. |
| Express.js | Desarrollo de la API REST. |
| MongoDB Atlas | Almacenamiento de usuarios y tareas. |
| Mongoose | Modelado de datos y conexión con MongoDB. |
| JSON Web Token (JWT) | Autenticación y protección de rutas. |
| bcryptjs | Hash de contraseñas para proteger las credenciales. |
| CORS | Configuración de comunicación entre frontend y backend. |
| dotenv | Administración de variables de entorno. |
| Git | Control de versiones. |
| GitHub | Alojamiento del repositorio. |
| Render | Despliegue del backend. |
| GitHub Pages | Publicación del frontend. |
| Visual Studio Code | Entorno de desarrollo. |

## Arquitectura del sistema

Tepana utiliza una arquitectura cliente-servidor dividida en tres componentes principales.

### 1. Frontend

Desarrollado con HTML5, CSS3 y JavaScript ES6+.

Proporciona la interfaz con la que el usuario puede registrarse, iniciar sesión y administrar sus tareas. Se comunica con el backend mediante solicitudes HTTP utilizando Fetch API.

### 2. Backend

Desarrollado con Node.js y Express.js.

Procesa las solicitudes del frontend, valida la autenticación, ejecuta las operaciones CRUD y se comunica con MongoDB Atlas mediante Mongoose.

### 3. Base de datos

MongoDB Atlas almacena la información de los usuarios y sus tareas.

Cada tarea está asociada al usuario que la creó, permitiendo mantener separada la información de cada cuenta.

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

**Nota:** El archivo `.env` se configura localmente y está excluido del repositorio mediante `.gitignore`.

## Programación orientada a objetos y organización del código

El proyecto incorpora diferentes componentes para organizar su funcionamiento:

- **Tarea:** modelo que representa cada pendiente laboral, incluyendo su identificador, nombre, estado de finalización y usuario propietario.
- **Usuario:** modelo que representa las cuentas registradas y administra la información de autenticación.
- **Middleware de autenticación:** verifica los tokens JWT antes de permitir el acceso a las rutas protegidas.
- **Rutas de autenticación:** gestionan el registro y el inicio de sesión.
- **Rutas de tareas:** administran las operaciones de creación, consulta, actualización y eliminación.

## Instalación y configuración

### Requisitos previos

- Node.js instalado.
- Visual Studio Code.
- Cuenta de MongoDB Atlas.
- Extensión Live Server para Visual Studio Code.

### 1. Descargar el repositorio

Clonar el proyecto desde GitHub:

```bash
git clone https://github.com/rickx33-glitch/Tepana.git
```

Abrir la carpeta `Tepana` en Visual Studio Code.

### 2. Instalar las dependencias

Abrir una terminal en la carpeta principal y ejecutar:

```bash
cd backend
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo llamado `.env` dentro de la carpeta `backend` con la siguiente estructura:

```env
PORT=3000
MONGODB_URI=TU_URI_DE_MONGODB_ATLAS
JWT_SECRET=TU_CLAVE_SECRETA
```

Sustituir los valores de ejemplo por las credenciales correspondientes de MongoDB Atlas y una clave secreta para JWT.

No compartir el archivo `.env` ni publicarlo en GitHub.

### 4. Ejecutar el backend localmente

Desde la carpeta `backend`, ejecutar:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

Para comprobar su funcionamiento, abrir la dirección en un navegador.

La respuesta esperada es:

```json
{
  "proyecto": "Tepana",
  "mensaje": "API funcionando correctamente"
}
```

### 5. Ejecutar el frontend

Abrir la carpeta principal del proyecto en Visual Studio Code.

Ejecutar el archivo `index.html` mediante la extensión Live Server.

El frontend está configurado para comunicarse con el backend desplegado en Render.

**Importante:** Para ejecutar el backend localmente se necesita configurar el archivo `.env`. Para utilizar la aplicación publicada no es necesario iniciar manualmente el servidor local.

## Documentación de la API REST

La API permite gestionar la autenticación de usuarios y las tareas mediante diferentes endpoints.

### Autenticación

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| POST | `/api/auth/registro` | Registrar un nuevo usuario. |
| POST | `/api/auth/login` | Iniciar sesión y obtener un token JWT. |

### Gestión de tareas

| Método HTTP | Endpoint | Descripción |
|---|---|---|
| GET | `/api/tareas` | Consultar las tareas del usuario autenticado. |
| POST | `/api/tareas` | Crear una nueva tarea. |
| PUT | `/api/tareas/:id` | Actualizar una tarea existente. |
| DELETE | `/api/tareas/:id` | Eliminar una tarea. |

### Autenticación de solicitudes

Las operaciones de gestión de tareas requieren un token JWT válido.

El token debe enviarse en el encabezado HTTP:

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

El proyecto incorpora mecanismos básicos de seguridad para proteger la información:

- Las contraseñas se almacenan mediante hash utilizando bcryptjs.
- La autenticación utiliza JSON Web Tokens (JWT).
- Los tokens tienen un tiempo de expiración configurado.
- Las rutas de gestión de tareas están protegidas mediante middleware de autenticación.
- Las tareas solamente pueden ser consultadas, modificadas o eliminadas por el usuario propietario.
- Se implementan validaciones para evitar operaciones con información inválida.
- Las credenciales de conexión se administran mediante variables de entorno.

## Despliegue de la aplicación

Tepana cuenta con un despliegue público compuesto por tres servicios:

| Componente | Plataforma | Función |
|---|---|---|
| Frontend | GitHub Pages | Publicación de la interfaz web. |
| Backend | Render | Ejecución del servidor y API REST. |
| Base de datos | MongoDB Atlas | Almacenamiento de usuarios y tareas. |

### Direcciones públicas

**Aplicación web:**

https://rickx33-glitch.github.io/Tepana/

**API REST:**

https://tepana-backend.onrender.com/

### Comunicación entre componentes

El frontend realiza solicitudes HTTP hacia la API REST alojada en Render.

El backend recibe las solicitudes, verifica la autenticación cuando corresponde y ejecuta las operaciones necesarias sobre MongoDB Atlas.

De esta manera, los usuarios pueden utilizar la aplicación publicada sin necesidad de ejecutar manualmente el backend en su computadora.

**Nota:** El servicio gratuito de Render puede suspenderse después de un periodo de inactividad. Cuando esto sucede, la primera solicitud puede tardar mientras el servicio vuelve a activarse.

## Evidencias del proyecto

La carpeta `evidencias/` contiene capturas de pantalla que muestran el funcionamiento de Tepana:

1. **01_Inicio.png:** pantalla principal de la aplicación.
2. **02_Crear.png:** registro de nuevas tareas.
3. **03_Editar.png:** modificación de tareas existentes.
4. **04_Completar.png:** actualización del estado de las tareas.
5. **05_Celular.png:** visualización de la aplicación desde un dispositivo móvil.

## Objetivo del proyecto

Desarrollar una aplicación web funcional para la gestión de tareas laborales, integrando conocimientos de desarrollo frontend y backend, JavaScript moderno, programación orientada a objetos, creación de servicios REST, autenticación de usuarios, conexión con bases de datos y operaciones CRUD.

El proyecto permite aplicar los conocimientos adquiridos durante el desarrollo de una solución tecnológica que responde a una necesidad de organización y administración de actividades laborales.

## Enlaces del proyecto

- **Repositorio GitHub:** https://github.com/rickx33-glitch/Tepana
- **Aplicación publicada:** https://rickx33-glitch.github.io/Tepana/
- **Backend desplegado:** https://tepana-backend.onrender.com/

---

**Proyecto académico | Ingeniería en Desarrollo de Software**

**Desarrollado por:** Irving Ricardo Martínez Rodríguez.