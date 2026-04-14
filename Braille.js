const dots = document.querySelectorAll(".dot");
const braille = document.getElementById("braille");
const btnMas = document.getElementById("mas");
const btnMenos = document.getElementById("menos");

let lastDot = null;
let scale = 1.35; // tamaño inicial

// Vibración
function vibrar(dot) {
    if (dot.classList.contains("active") && dot !== lastDot) {

        if (navigator.vibrate) {
            navigator.vibrate(60);
        }

        lastDot = dot;
    }
}

// Mouse
dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {
        vibrar(dot);
    });
});

// Touch
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

// Bloquear scroll
document.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false });


// 🔍 BOTONES DE ZOOM
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
