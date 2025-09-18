// --- js/slider.js ---
document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("slider-track");
    const dots = Array.from(document.querySelectorAll("#slider-dots .dot"));

    // ✅ Si no hay slider, no hacer nada
    if (!track || dots.length === 0) {
        console.warn("slider.js: No se encontró el slider en esta página.");
        return;
    }

    const totalSlides = dots.length;
    let currentIndex = 0;
    let intervalId;

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) =>
            dot.classList.toggle("active", i === index)
        );
        currentIndex = index;
    }

    function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
    }

    // Click en cada dot
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            clearInterval(intervalId);
            goToSlide(i);
            intervalId = setInterval(nextSlide, 5000);
        });
    });

    // Autoplay inicial
    intervalId = setInterval(nextSlide, 5000);
});
