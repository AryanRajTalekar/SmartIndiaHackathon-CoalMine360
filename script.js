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