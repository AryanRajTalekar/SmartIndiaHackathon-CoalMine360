const scroll = new LocomotiveScroll({
    el: document.querySelector('.main'),
    smooth: true
});

document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('background-video');
    video.playbackRate = 0.8;
});