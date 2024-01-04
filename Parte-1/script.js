const titulo = document.querySelector("h1");

const tematica = "muebles";

// Crea un elemento span para mostrar la temática
const tematicaSpan = document.createElement("span");
tematicaSpan.textContent = `Temática elegida: ${tematica}`;

// Agrega el span al título h1
titulo.appendChild(tematicaSpan);

const paleta = ["#a09987", "#dfcdae", "#c6b491", "#8d6f4e", "#000"];

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

// Obtiene el elemento con id cajaContenedora y agrega el contenedor de círculos
const cajaContenedora = document.getElementById("cajaContenedora");
cajaContenedora.appendChild(contenedorCirculos);

// Array para almacenar el orden de los colores de los círculos
const ordenColores = [];

// Crea 4 círculos y los agrega al contenedor
for (let i = 0; i < 4; i++) {
    const circulo = document.createElement("div");
    const contenedorCirculo = document.querySelector(".contenedor");

    // Agrega la propiedad z-index para superponer los círculos
    circulo.style.zIndex = 4 - i;

    // Agrega la clase "circulo" al círculo
    circulo.classList.add("circulo");
    contenedorCirculos.appendChild(circulo);

    // Maneja el evento de click en el círculo
    circulo.addEventListener("click", () => {
        const colorSeleccionado = select.value;
        const modoSuperpuesto = checkboxModoSuperpuesto.checked;

        const circulos = Array.from(
            contenedorCirculo.querySelectorAll(".circulo")
        );

        // Aplica el color seleccionado a los círculos
        if (modoSuperpuesto) {
            const posicionCirculo = circulos.indexOf(circulo);

            for (let i = circulos.length - 1; i >= posicionCirculo; i--) {
                circulos[i].style.backgroundColor = colorSeleccionado;
                ordenColores[i] = colorSeleccionado;
            }
        } else {
            // Si no está superpuesto vuelve los circulos a sus colores y aplica el nuevo color seleccionado
            circulos.forEach((circulo, index) => {
                circulo.style.backgroundColor = ordenColores[index] || "";
            });

            circulo.style.backgroundColor = colorSeleccionado;
            ordenColores[circulos.indexOf(circulo)] = colorSeleccionado;
        }
    });

    ordenColores.push("");
}

// Se le da un tamaño distinto a cada circulo
const circulos = document.querySelectorAll(".circulo");
circulos.forEach((circulo, index) => {
    circulo.style.width = `${100 + index * 70}px`;
    circulo.style.height = `${100 + index * 70}px`;
});

// Boton para resetear los estilos
const reset = document.createElement("button");
reset.textContent = "Reset";
reset.addEventListener("click", () => {
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
