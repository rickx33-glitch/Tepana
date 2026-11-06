
/* ========================================
   TEPANA - GESTOR DE TAREAS FULL STACK
======================================== */

// Direccion del backend
const API_URL = "http://localhost:3000/api";

// Elementos de autenticacion
const seccionAutenticacion = document.getElementById("seccion-autenticacion");
const seccionAplicacion = document.getElementById("seccion-aplicacion");

const formularioLogin = document.getElementById("form-login");
const formularioRegistro = document.getElementById("form-registro");

const mensajeAuth = document.getElementById("mensaje-auth");

// Elementos de tareas
const entradaTarea = document.getElementById("nueva-tarea");
const listaTareas = document.getElementById("lista-tareas");
const botonAgregar = document.getElementById("agregar-tarea");

// Estado de la aplicacion
let tareas = [];
let usuarioActual = null;

let token = localStorage.getItem("tepanaToken");


// ========================================
// COMUNICACION CON EL BACKEND
// ========================================

async function solicitarAPI(ruta, opciones = {}) {

    const respuesta = await fetch(`${API_URL}${ruta}`, {
        ...opciones,

        headers: {
            "Content-Type": "application/json",

            ...(token
                ? { Authorization: `Bearer ${token}` }
                : {}),

            ...opciones.headers
        }
    });

    const datos = await respuesta.json().catch(() => ({}));

    if (!respuesta.ok) {

        if (respuesta.status === 401 && token) {
            cerrarSesion();
        }

        throw new Error(
            datos.mensaje || "Error al comunicarse con el servidor"
        );
    }

    return datos;
}


// ========================================
// REGISTRO
// ========================================

document.getElementById("mostrar-registro").addEventListener("click", () => {

    formularioLogin.hidden = true;
    formularioRegistro.hidden = false;

    document.getElementById("opcion-registro").hidden = true;
    document.getElementById("opcion-login").hidden = false;

    mensajeAuth.textContent = "";

});


formularioRegistro.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const nombre = document.getElementById("registro-nombre").value.trim();
    const correo = document.getElementById("registro-correo").value.trim();
    const password = document.getElementById("registro-password").value;

    try {

        const datos = await solicitarAPI("/auth/registro", {
            method: "POST",

            body: JSON.stringify({
                nombre,
                correo,
                password
            })
        });

        mensajeAuth.textContent = datos.mensaje;
        mensajeAuth.style.color = "#22c55e";

        formularioRegistro.reset();

        formularioRegistro.hidden = true;
        formularioLogin.hidden = false;

        document.getElementById("opcion-registro").hidden = false;
        document.getElementById("opcion-login").hidden = true;

        document.getElementById("login-correo").value = correo;

    } catch (error) {

        mensajeAuth.textContent = error.message;
        mensajeAuth.style.color = "#ef4444";

    }

});


// ========================================
// CAMBIAR A INICIO DE SESION
// ========================================

document.getElementById("mostrar-login").addEventListener("click", () => {

    formularioRegistro.hidden = true;
    formularioLogin.hidden = false;

    document.getElementById("opcion-registro").hidden = false;
    document.getElementById("opcion-login").hidden = true;

    mensajeAuth.textContent = "";

});


// ========================================
// INICIO DE SESION
// ========================================

formularioLogin.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const correo = document.getElementById("login-correo").value.trim();
    const password = document.getElementById("login-password").value;

    try {

        const datos = await solicitarAPI("/auth/login", {
            method: "POST",

            body: JSON.stringify({
                correo,
                password
            })
        });

        token = datos.token;

        usuarioActual = datos.usuario;

        localStorage.setItem("tepanaToken", token);

        formularioLogin.reset();

        mensajeAuth.textContent = "";

        await cargarAplicacion();

    } catch (error) {

        mensajeAuth.textContent = error.message;
        mensajeAuth.style.color = "#ef4444";

    }

});


// ========================================
// CARGAR APLICACION
// ========================================

async function cargarAplicacion() {

    try {

        tareas = await solicitarAPI("/tareas");

        seccionAutenticacion.hidden = true;
        seccionAplicacion.hidden = false;

        document.getElementById("nombre-usuario").textContent =
            `Bienvenido, ${usuarioActual.nombre}`;

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// CERRAR SESION
// ========================================

function cerrarSesion() {

    token = null;
    usuarioActual = null;
    tareas = [];

    localStorage.removeItem("tepanaToken");

    seccionAplicacion.hidden = true;
    seccionAutenticacion.hidden = false;

    formularioLogin.hidden = false;
    formularioRegistro.hidden = true;

    document.getElementById("opcion-registro").hidden = false;
    document.getElementById("opcion-login").hidden = true;

    mensajeAuth.textContent = "";

    mostrarTareas();

}


document.getElementById("cerrar-sesion").addEventListener(
    "click",
    cerrarSesion
);


// ========================================
// CREATE: AGREGAR TAREA
// ========================================

async function agregarTarea(nombre) {

    try {

        const nuevaTarea = await solicitarAPI("/tareas", {
            method: "POST",

            body: JSON.stringify({
                nombre
            })
        });

        tareas.unshift(nuevaTarea);

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// READ: CONSULTAR TAREAS
// ========================================

async function consultarTareas() {

    try {

        tareas = await solicitarAPI("/tareas");

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// UPDATE: EDITAR TAREA
// ========================================

async function editarTarea(id, nuevoNombre) {

    try {

        const tareaActualizada = await solicitarAPI(`/tareas/${id}`, {
            method: "PUT",

            body: JSON.stringify({
                nombre: nuevoNombre
            })
        });

        tareas = tareas.map(tarea =>
            tarea._id === id ? tareaActualizada : tarea
        );

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// UPDATE: CAMBIAR ESTADO
// ========================================

async function cambiarEstado(id) {

    const tarea = tareas.find(tarea => tarea._id === id);

    if (!tarea) return;

    try {

        const tareaActualizada = await solicitarAPI(`/tareas/${id}`, {
            method: "PUT",

            body: JSON.stringify({
                completada: !tarea.completada
            })
        });

        tareas = tareas.map(tarea =>
            tarea._id === id ? tareaActualizada : tarea
        );

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// DELETE: ELIMINAR TAREA
// ========================================

async function eliminarTarea(id) {

    try {

        await solicitarAPI(`/tareas/${id}`, {
            method: "DELETE"
        });

        tareas = tareas.filter(tarea => tarea._id !== id);

        mostrarTareas();

    } catch (error) {

        alert(error.message);

    }

}


// ========================================
// MOSTRAR TAREAS Y ESTADISTICAS
// ========================================

function mostrarTareas() {

    listaTareas.innerHTML = "";

    const total = tareas.length;

    const completadas = tareas.filter(
        tarea => tarea.completada
    ).length;

    const pendientes = total - completadas;

    document.getElementById("total-tareas").textContent = total;

    document.getElementById("pendientes-tareas").textContent = pendientes;

    document.getElementById("completadas-tareas").textContent = completadas;

    if (total === 0) {

        listaTareas.innerHTML = `
            <li class="mensaje-vacio">
                No tienes pendientes por ahora
            </li>
        `;

        return;

    }

    tareas.forEach(tarea => {

        const elemento = document.createElement("li");

        elemento.classList.add("tarjeta-tarea");

        const nombre = document.createElement("span");

        nombre.textContent = tarea.nombre;

        nombre.classList.add("nombre-tarea");

        if (tarea.completada) {
            nombre.classList.add("tarea-completada");
        }

        const acciones = document.createElement("div");

        acciones.classList.add("acciones-tarea");

        // Boton completar
        const botonEstado = document.createElement("button");

        botonEstado.textContent = tarea.completada ? "↩" : "✓";

        botonEstado.classList.add("boton-estado");

        botonEstado.title = tarea.completada
            ? "Marcar como pendiente"
            : "Completar tarea";

        botonEstado.addEventListener("click", () => {
            cambiarEstado(tarea._id);
        });

        // Boton editar
        const botonEditar = document.createElement("button");

        botonEditar.textContent = "Editar";

        botonEditar.classList.add("boton-editar");

        botonEditar.addEventListener("click", () => {

            const nuevoNombre = prompt(
                "Editar tarea:",
                tarea.nombre
            );

            if (nuevoNombre === null) return;

            if (!nuevoNombre.trim()) {
                alert("El nombre no puede estar vacio.");
                return;
            }

            editarTarea(tarea._id, nuevoNombre.trim());

        });

        // Boton eliminar
        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        botonEliminar.classList.add("boton-eliminar");

        botonEliminar.addEventListener("click", () => {

            if (confirm("¿Deseas eliminar esta tarea?")) {
                eliminarTarea(tarea._id);
            }

        });

        acciones.append(
            botonEstado,
            botonEditar,
            botonEliminar
        );

        elemento.append(
            nombre,
            acciones
        );

        listaTareas.appendChild(elemento);

    });

}


// ========================================
// EVENTOS DEL FORMULARIO DE TAREAS
// ========================================

botonAgregar.addEventListener("click", async () => {

    const nombre = entradaTarea.value.trim();

    if (!nombre) {

        alert("Escribe una tarea antes de agregarla.");

        return;

    }

    await agregarTarea(nombre);

    entradaTarea.value = "";

    entradaTarea.focus();

});


entradaTarea.addEventListener("keydown", evento => {

    if (evento.key === "Enter") {
        botonAgregar.click();
    }

});


// ========================================
// INICIAR APLICACION
// ========================================

async function iniciarAplicacion() {

    if (!token) return;

    try {

        const respuesta = await solicitarAPI("/auth/perfil");

        usuarioActual = respuesta.usuario || respuesta;

        await cargarAplicacion();

    } catch (error) {

        token = null;

        localStorage.removeItem("tepanaToken");

        seccionAutenticacion.hidden = false;
        seccionAplicacion.hidden = true;

    }

}

iniciarAplicacion();
    