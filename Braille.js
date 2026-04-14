const braille = document.getElementById("braille");
const btnMas = document.getElementById("mas");
const btnMenos = document.getElementById("menos");
const btnConvertir = document.getElementById("convertir");
const input = document.getElementById("texto");

let scale = 1.35;
let lastDot = null;

/* 🔤 Diccionario braille */
const brailleMap = {
    a: [1],
    b: [1,2],
    c: [1,4],
    d: [1,4,5],
    e: [1,5],
    f: [1,2,4],
    g: [1,2,4,5],
    h: [1,2,5],
    i: [2,4],
    j: [2,4,5],
    k: [1,3],
    l: [1,2,3],
    m: [1,3,4],
    n: [1,3,4,5],
    o: [1,3,5],
    p: [1,2,3,4],
    q: [1,2,3,4,5],
    r: [1,2,3,5],
    s: [2,3,4],
    t: [2,3,4,5],
    u: [1,3,6],
    v: [1,2,3,6],
    w: [2,4,5,6],
    x: [1,3,4,6],
    y: [1,3,4,5,6],
    z: [1,3,5,6]
};

/* Crear celda */
function crearCelda(letra) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    for (let i = 1; i <= 6; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot");

        if (brailleMap[letra]?.includes(i)) {
            dot.classList.add("active");
        }

        // interacción
        dot.addEventListener("mouseenter", () => vibrar(dot));

        cell.appendChild(dot);
    }

    return cell;
}

/* Renderizar palabra */
function renderizar(texto) {
    braille.innerHTML = "";

    texto = texto.toLowerCase();

    for (let letra of texto) {
        if (brailleMap[letra]) {
            braille.appendChild(crearCelda(letra));
        }
    }
}

/* Vibración */
function vibrar(dot) {
    if (dot.classList.contains("active") && dot !== lastDot) {

        if (navigator.vibrate) {
            navigator.vibrate(60);
        }

        lastDot = dot;
    }
}

/* Touch */
document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];

    const elemento = document.elementFromPoint(
        touch.clientX,
        touch.clientY
    );

    if (elemento && elemento.classList.contains("dot")) {
        vibrar(elemento);
    }
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false });

/* Zoom */
btnMas.addEventListener("click", () => {
    scale += 0.1;
    braille.style.transform = `scale(${scale})`;
});

btnMenos.addEventListener("click", () => {
    if (scale > 0.5) {
        scale -= 0.1;
        braille.style.transform = `scale(${scale})`;
    }
});

/* Convertir texto */
btnConvertir.addEventListener("click", () => {
    const texto = input.value.trim();
    if (texto !== "") {
        renderizar(texto);
    }
});

/* Inicial */
renderizar("hola");
