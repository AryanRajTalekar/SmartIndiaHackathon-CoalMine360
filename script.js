const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});


const Button = document.getElementById('but');
var tl = gsap.timeline();


Button.addEventListener('click', function() {
    tl.to(".cover", {
        opacity: 0,
        duration: 2,
        ease: "expo.inOut"
    });

    gsap.from("#heading #h1", {
        y: 100,
        opacity: 0,
        delay: 1,
        duration: 0.9,
        stagger: 0.3
    });

});




