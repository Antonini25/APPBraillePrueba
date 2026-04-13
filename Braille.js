const dots = document.querySelectorAll(".dot");

dots.forEach(dot => {
    dot.addEventListener("click", () => {

        // Efecto visual al presionar
        dot.classList.toggle("active");

        // Vibración (si el dispositivo lo permite)
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
    });
});