// Efecto suave al hacer clic en una marca
document.addEventListener("DOMContentLoaded", () => {
    const marcas = document.querySelectorAll(".marca-box");

    marcas.forEach((marca) => {
        marca.addEventListener("click", () => {
            marca.classList.add("clickeado");
            setTimeout(() => {
                marca.classList.remove("clickeado");
            }, 300); // tiempo del efecto
        });
    });
});
// ——————————————————————————————
// 1. Variables globales