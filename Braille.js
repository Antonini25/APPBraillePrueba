const dots = document.querySelectorAll(".dot");

dots.forEach(dot => {
    dot.addEventListener("mouseenter", () => {

        // Solo vibra si es un punto real del braille
        if (dot.classList.contains("active")) {

            if (navigator.vibrate) {
                navigator.vibrate(80);
            }

        }
    });
});
