const dots = document.querySelectorAll(".dot");

// Para evitar vibraciones repetidas infinitas
let lastDot = null;

function vibrar(dot) {
    if (dot.classList.contains("active") && dot !== lastDot) {

        if (navigator.vibrate) {
            navigator.vibrate(60);
        }

        lastDot = dot;
    }
}

// 🖱️ Mouse (computadora)
dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {
        vibrar(dot);
    });
});

// 📱 Touch (celular)
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

// Evita que el dedo mueva la pantalla
document.addEventListener("touchmove", (e) => {
    e.preventDefault();
}, { passive: false });
