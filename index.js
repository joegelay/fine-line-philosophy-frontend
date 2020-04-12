//Init ScrollMagic
const controller = new ScrollMagic.Controller();

//build a scene
const landingScene = new ScrollMagic.Scene({
    triggerElement: '#landing',
    duration: '120%',
    triggerHook: 1
})
.setClassToggle('#landing', 'fade-in') // add class to main
.addTo(controller);

const mainScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
    // reverse false mean animation will only happen once and not repeat if scrolled by again
})
.setClassToggle('#main', 'fade-in') // add class to main
.addTo(controller);

const typingScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
    // reverse false mean animation will only happen once and not repeat if scrolled by again
})
.setClassToggle('#tag-line', 'animate') // add class to main
.addTo(controller);

const pairScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
    // reverse false mean animation will only happen once and not repeat if scrolled by again
})
.setClassToggle('#sliding-vertical', 'fade-in') // add class to main
.addTo(controller);