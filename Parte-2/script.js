const titulo = document.querySelector("h1");

const tematica = "muebles";

// Crea un elemento span para mostrar la temática
const tematicaSpan = document.createElement("span");
tematicaSpan.textContent = `Temática elegida: ${tematica}`;

// Agrega el span al título h1
titulo.appendChild(tematicaSpan);

let paleta = ["#a09987", "#dfcdae", "#c6b491", "#8d6f4e"];

const urlWeb = document.createElement("a");
urlWeb.href = "https://www.landmark.com.ar/";
urlWeb.textContent = "url de la paleta";

// Obtiene el elemento con id "controlColores" y agrega el enlace
const controlColores = document.getElementById("controlColores");
controlColores.appendChild(urlWeb);

const select = document.createElement("select");

// Agrega a cada option del select los colores de las paletas
paleta.forEach((color) => {
    const option = document.createElement("option");
    option.textContent = color;
    option.value = color;
    select.appendChild(option);
});

controlColores.appendChild(select);

// Crea un checkbox para el modo superpuesto
const checkboxModoSuperpuesto = document.createElement("input");
checkboxModoSuperpuesto.type = "checkbox";
checkboxModoSuperpuesto.id = "modoSuperpuesto";

// Crea una etiqueta para el checkbox
const labelCheckbox = document.createElement("label");
labelCheckbox.textContent = "Modo superpuesto";
labelCheckbox.htmlFor = "modoSuperpuesto";

// Agrega el checkbox y la etiqueta al control de colores
controlColores.appendChild(checkboxModoSuperpuesto);
controlColores.appendChild(labelCheckbox);

// Crea un div para poner estilos a los circulos
const contenedorCirculos = document.createElement("div");
contenedorCirculos.classList.add("contenedor");

let circulos = [];

// Obtiene el elemento con id cajaContenedora y agrega el contenedor de círculos
const cajaContenedora = document.getElementById("cajaContenedora");
cajaContenedora.appendChild(contenedorCirculos);

// Array para almacenar el orden de los colores de los círculos
const ordenColores = [];

const dibujarCirculos = (cantidadCirculos) => {
    // Elimina los círculos actuales

    contenedorCirculos.innerHTML = "";

    // Crea círculos y los agrega al contenedor
    for (let i = 0; i < cantidadCirculos; i++) {
        const circulo = document.createElement("div");
        circulo.style.zIndex = cantidadCirculos - i;
        circulo.classList.add("circulo");
        contenedorCirculos.appendChild(circulo);

        circulo.addEventListener("click", () => {
            const colorSeleccionado = select.value;
            const modoSuperpuesto = checkboxModoSuperpuesto.checked;

            if (modoSuperpuesto) {
                const posicionCirculo = circulos.indexOf(circulo);
                for (let i = circulos.length - 1; i >= posicionCirculo; i--) {
                    circulos[i].style.backgroundColor = colorSeleccionado;
                    ordenColores[i] = colorSeleccionado;
                }
            } else {
                circulos.forEach((circulo, index) => {
                    circulo.style.backgroundColor = ordenColores[index] || "";
                });
                circulo.style.backgroundColor = colorSeleccionado;
                ordenColores[circulos.indexOf(circulo)] = colorSeleccionado;
            }
        });

        ordenColores.push("");
    }

    circulos = Array.from(contenedorCirculos.querySelectorAll(".circulo"));

    // Se le da un tamaño distinto a cada círculo

    circulos.forEach((circulo, index) => {
        circulo.style.width = `${100 + index * 70}px`;
        circulo.style.height = `${100 + index * 70}px`;
    });
};

// Llama a la función para dibujar los círculos
dibujarCirculos(4);

// Boton para resetear los estilos
const reset = document.createElement("button");
reset.textContent = "Reset";
reset.addEventListener("click", () => {
    const circulos = document.querySelectorAll(".circulo");
    circulos.forEach((circulo, index) => {
        circulo.style.backgroundColor = "";
        ordenColores[index] = "";
    });
});

cajaContenedora.appendChild(reset);

window.addEventListener("resize", () => {
    const windowWidth = window.innerWidth;

    if (windowWidth < 500) {
        // Si la ventana es menor a 500px
        circulos.forEach((circulo) => {
            // Cambiar el color de todos los círculos a gris
            circulo.style.backgroundColor = "#9b9b9b";
            // Deshabilitar la interacción con los círculos
            circulo.style.pointerEvents = "none";
        });

        select.disabled = true;
        reset.disabled = true;
        checkboxModoSuperpuesto.disabled = true;
    } else {
        // Si la ventana es 500px o más
        circulos.forEach((circulo, index) => {
            // Vuelve el color de los círculos antes de achicar la pantalla
            circulo.style.backgroundColor = ordenColores[index] || "";
            // Permite nuevamente la interacción con los círculos
            circulo.style.pointerEvents = "auto";
        });

        select.disabled = false;
        reset.disabled = false;
        checkboxModoSuperpuesto.disabled = false;
    }
});

const inputCirculos = document.getElementById("inputCirculos");

inputCirculos.addEventListener("change", () => {
    const nuevaCantidadCirculos = inputCirculos.value;

    dibujarCirculos(nuevaCantidadCirculos);
});

const agregarColor = () => {
    const nuevoColor = document.getElementById("colorInput").value;

    // Verifica si el color ya está en la paleta
    if (!paleta.includes(nuevoColor)) {
        // Agrega el nuevo color al array paleta
        paleta.push(nuevoColor);

        // Guarda la paleta actualizada en el localStorage
        actualizarPaletaEnLocalStorage();

        // Agrega una nueva opción al select
        const option = document.createElement("option");
        option.textContent = nuevoColor;
        option.value = nuevoColor;
        select.appendChild(option);
    }
};

// Función para actualizar la paleta en el localStorage
const actualizarPaletaEnLocalStorage = () => {
    localStorage.setItem("paleta", JSON.stringify(paleta));
};

// Función para editar un color existente
const editarColor = () => {
    const indiceSeleccionado = select.selectedIndex;
    if (indiceSeleccionado !== -1) {
        const nuevoColor = document.getElementById("colorInput").value;

        // Actualiza el color en el array paleta y en el localStorage
        paleta[indiceSeleccionado] = nuevoColor;
        actualizarPaletaEnLocalStorage();

        // Actualiza la opción seleccionada en el select
        select.options[indiceSeleccionado].textContent = nuevoColor;
        select.options[indiceSeleccionado].value = nuevoColor;
    }
};

const borrarColor = () => {
    const colorABorrar = document
        .getElementById("colorABorrar")
        .value.toLowerCase();

    if (colorABorrar) {
        const indiceABorrar = paleta.findIndex(
            (color) => color.toLowerCase() === colorABorrar
        );

        if (indiceABorrar !== -1) {
            paleta.splice(indiceABorrar, 1);
            actualizarPaletaEnLocalStorage();

            select.remove(indiceABorrar);

            document.getElementById("colorABorrar").value = "";
        } else {
            alert("El color ingresado no existe en la paleta.");
        }
    } else {
        alert("Por favor, ingrese un color para borrar.");
    }
};

// Input para ingresar el color a borrar
const inputColorABorrar = document.createElement("input");
inputColorABorrar.id = "colorABorrar";
inputColorABorrar.placeholder = "Ingrese el color a borrar";
formulario.appendChild(inputColorABorrar);

// Botón para borrar el color ingresado
const borrarBtn = document.createElement("button");
borrarBtn.textContent = "Borrar";
borrarBtn.addEventListener("click", borrarColor);
formulario.appendChild(borrarBtn);

const cargarPaletaDesdeLocalStorage = () => {
    const paletaGuardada = localStorage.getItem("paleta");

    if (paletaGuardada) {
        paleta = JSON.parse(paletaGuardada);

        select.innerHTML = "";

        paleta.forEach((color) => {
            const option = document.createElement("option");
            option.textContent = color;
            option.value = color;
            select.appendChild(option);
        });
    }
};

cargarPaletaDesdeLocalStorage();
