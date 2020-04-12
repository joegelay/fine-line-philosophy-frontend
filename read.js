const controller = new ScrollMagic.Controller();

const mainScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '1000%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#main', 'fade-in') 
.addTo(controller);