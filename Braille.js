const braille = document.getElementById("braille");
const btnMas = document.getElementById("mas");
const btnMenos = document.getElementById("menos");
const btnConvertir = document.getElementById("convertir");
const input = document.getElementById("texto");

const menu = document.getElementById("menu");
const toggleMenu = document.getElementById("toggleMenu");
const overlay = document.getElementById("overlay");

let scale = 1.35;
let lastDot = null;

/* MENU FUNCIONAL */
toggleMenu.addEventListener("click", () => {
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
});

/* Cerrar tocando fuera */
overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

/* BRAILLE MAP */
const brailleMap = {
    a:[1], b:[1,2], c:[1,4], d:[1,4,5], e:[1,5],
    f:[1,2,4], g:[1,2,4,5], h:[1,2,5], i:[2,4], j:[2,4,5],
    k:[1,3], l:[1,2,3], m:[1,3,4], n:[1,3,4,5], o:[1,3,5],
    p:[1,2,3,4], q:[1,2,3,4,5], r:[1,2,3,5],
    s:[2,3,4], t:[2,3,4,5],
    u:[1,3,6], v:[1,2,3,6], w:[2,4,5,6],
    x:[1,3,4,6], y:[1,3,4,5,6], z:[1,3,5,6]
};

/* CREAR CELDA */
function crearCelda(letra){
    const cell = document.createElement("div");
    cell.className = "cell";

    for(let i=1;i<=6;i++){
        const dot = document.createElement("div");
        dot.className = "dot";

        if(brailleMap[letra]?.includes(i)){
            dot.classList.add("active");
        }

        dot.addEventListener("mouseenter", ()=>vibrar(dot));
        cell.appendChild(dot);
    }

    return cell;
}

/* RENDER */
function renderizar(texto){
    braille.innerHTML = "";

    for(let letra of texto.toLowerCase()){
        if(brailleMap[letra]){
            braille.appendChild(crearCelda(letra));
        }
    }
}

/* VIBRAR */
function vibrar(dot){
    if(dot.classList.contains("active") && dot !== lastDot){
        if(navigator.vibrate){
            navigator.vibrate(60);
        }
        lastDot = dot;
    }
}

/* TOUCH */
document.addEventListener("touchmove", (e)=>{
    const touch = e.touches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);

    if(el && el.classList.contains("dot")){
        vibrar(el);
    }
}, {passive:false});

document.addEventListener("touchmove", e=>e.preventDefault(), {passive:false});

/* ZOOM */
btnMas.onclick = ()=>{
    scale += 0.1;
    braille.style.transform = `scale(${scale})`;
};

btnMenos.onclick = ()=>{
    if(scale > 0.5){
        scale -= 0.1;
        braille.style.transform = `scale(${scale})`;
    }
};

/* CONVERTIR */
btnConvertir.onclick = ()=>{
    const texto = input.value.trim();
    if(texto){
        renderizar(texto);
    }
};

/* INICIAL */
renderizar("hola");
