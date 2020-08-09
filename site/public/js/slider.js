let current = 1;
showSlides(current);
function prevSlide() { showSlides(current += -1); }
function nextSlide() { showSlides(current += 1); }
function showSlides(n) {
    let slides = document.getElementsByClassName("slide-container");
    if (n > slides.length) { current = 1 }
    if (n < 1) { current = slides.length }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[current-1].style.display = "block";
}