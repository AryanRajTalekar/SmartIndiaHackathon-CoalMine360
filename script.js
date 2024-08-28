const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});


function loadingAnimation(){
    gsap.from("#heading1",{
        y: 100,
        opacity: 0,
        delay: 1,
        duration: 0.9,
        stagger: 0.3
    });
    gsap.from("#heading2",{
        y: 100,
        opacity: 0,
        delay: 2,
        duration: 0.9,
        stagger: 0.3
    });
    gsap.from("#heading3",{
        y: 100,
        opacity: 0,
        delay: 3,
        duration: 0.9,
        stagger: 0.3
    }); 
}

loadingAnimation();

let currentSlide = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    // Wrap around the slide index if it goes out of bounds
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Calculate the transform distance
    const offset = -currentSlide * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function moveSlide(direction) {
    showSlide(currentSlide + direction);
}

// Initialize the first slide
showSlide(currentSlide);
