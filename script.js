const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});


const Button = document.getElementById('but');
var tl = gsap.timeline();


Button.addEventListener('click', function() {
    // tl.to(".cover", {
    //     opacity: 0,
    //     duration: 2,
    //     ease: "expo.inOut"
    // });

    gsap.to(".cover", {
        opacity: 0,
        delay: 1,
        duration: 2,
        stagger: 0.3
    });

});






