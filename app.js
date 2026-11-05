
/* ========================================
   TEPANA - GESTOR DE TAREAS
======================================== */

// Clase que representa una tarea
class Tarea {

    constructor(nombre, completada = false) {

        this.id = Date.now().toString() +
            Math.random().toString(16).slice(2);

        this.nombre = nombre;
        this.completada = completada;

    }

}


// Clase que administra las tareas
class GestorDeTareas {

    constructor() {

        this.tareas = this.cargarTareas();

    }


    // CREATE: Agregar una tarea
    agregarTarea(nombre) {

        const tarea = new Tarea(nombre);

        this.tareas.push(tarea);

        this.guardarTareas();
        this.mostrarTareas();

    }


    // DELETE: Eliminar una tarea
    eliminarTarea(id) {

        this.tareas = this.tareas.filter(
            tarea => tarea.id !== id
        );

        this.guardarTareas();
        this.mostrarTareas();

    }


    // UPDATE: Editar una tarea
    editarTarea(id, nuevoNombre) {

        const tarea = this.tareas.find(
            tarea => tarea.id === id
        );

        if (tarea) {

            tarea.nombre = nuevoNombre;

            this.guardarTareas();
            this.mostrarTareas();

        }

    }


    // UPDATE: Cambiar estado de una tarea
    cambiarEstado(id) {

        const tarea = this.tareas.find(
            tarea => tarea.id === id
        );

        if (tarea) {

            tarea.completada = !tarea.completada;

            this.guardarTareas();
            this.mostrarTareas();

        }

    }


    // Guardar tareas en LocalStorage
    guardarTareas() {

        localStorage.setItem(
            "tepanaTareas",
            JSON.stringify(this.tareas)
        );

    }


    // Recuperar tareas guardadas
    cargarTareas() {

        const datos = localStorage.getItem("tepanaTareas");

        return datos ? JSON.parse(datos) : [];

    }


    // READ: Mostrar tareas en pantalla
    mostrarTareas() {

        listaTareas.innerHTML = "";


        // Calcular estadísticas
        const total = this.tareas.length;

        const completadas = this.tareas.filter(
            tarea => tarea.completada
        ).length;

        const pendientes = total - completadas;


        // Actualizar contadores
        document.getElementById("total-tareas").textContent = total;

        document.getElementById("pendientes-tareas").textContent = pendientes;

        document.getElementById("completadas-tareas").textContent = completadas;


        // Mostrar mensaje si no existen tareas
        if (total === 0) {

            listaTareas.innerHTML = `
                <li class="mensaje-vacio">
                     No tienes pendientes por ahora
                </li>
            `;

            return;

        }


        // Recorrer todas las tareas
        this.tareas.forEach(tarea => {

            const elemento = document.createElement("li");

            elemento.classList.add("tarjeta-tarea");


            // Nombre de la tarea
            const nombre = document.createElement("span");

            nombre.textContent = tarea.nombre;

            nombre.classList.add("nombre-tarea");


            if (tarea.completada) {

                nombre.classList.add("tarea-completada");

            }


            // Contenedor de botones
            const acciones = document.createElement("div");

            acciones.classList.add("acciones-tarea");


            // Botón para completar
            const botonEstado = document.createElement("button");

            botonEstado.textContent = tarea.completada ? "↩" : "✓";

            botonEstado.classList.add("boton-estado");

            botonEstado.title = tarea.completada
                ? "Marcar como pendiente"
                : "Completar tarea";


            botonEstado.addEventListener("click", () => {

                this.cambiarEstado(tarea.id);

            });


            // Botón para editar
            const botonEditar = document.createElement("button");

            botonEditar.textContent = "Editar";

            botonEditar.classList.add("boton-editar");


            botonEditar.addEventListener("click", () => {

                const nuevoNombre = prompt(
                    "Editar tarea:",
                    tarea.nombre
                );


                if (nuevoNombre !== null && nuevoNombre.trim() !== "") {

                    this.editarTarea(
                        tarea.id,
                        nuevoNombre.trim()
                    );

                } else if (nuevoNombre !== null) {

                    alert("El nombre no puede estar vacío.");

                }

            });


            // Botón para eliminar
            const botonEliminar = document.createElement("button");

            botonEliminar.textContent = "Eliminar";

            botonEliminar.classList.add("boton-eliminar");


            botonEliminar.addEventListener("click", () => {

                if (confirm("¿Deseas eliminar esta tarea?")) {

                    this.eliminarTarea(tarea.id);

                }

            });


            // Agregar botones y elementos
            acciones.append(
                botonEstado,
                botonEditar,
                botonEliminar
            );

            elemento.append(nombre, acciones);

            listaTareas.appendChild(elemento);

        });

    }

}


// ========================================
// INTERACCION CON EL HTML
// ========================================

const entradaTarea = document.getElementById("nueva-tarea");

const listaTareas = document.getElementById("lista-tareas");

const botonAgregar = document.getElementById("agregar-tarea");


// Crear instancia del gestor
const gestor = new GestorDeTareas();


// Evento para agregar tareas
botonAgregar.addEventListener("click", () => {

    const nombre = entradaTarea.value.trim();


    // Validar campo vacío
    if (nombre === "") {

        alert("Escribe una tarea antes de agregarla.");

        return;

    }


    gestor.agregarTarea(nombre);

    entradaTarea.value = "";

    entradaTarea.focus();

});


// Permitir agregar tareas con Enter
entradaTarea.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {

        botonAgregar.click();

    }

});


// Mostrar tareas al iniciar la aplicación
gestor.mostrarTareas();
