//Init ScrollMagic
const controller = new ScrollMagic.Controller();

//build a scene
const landingScene = new ScrollMagic.Scene({
    triggerElement: '#landing',
    duration: '120%',
    triggerHook: 1
})
.setClassToggle('#landing', 'fade-in') // add class to main
.addIndicators({
    name: 'landing fade',
    colorTrigger: 'red',
}) // this requires the plugin that is already attached to the html. optional object to customize.
.addTo(controller);


const ourScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .5,
    // reverse: false 
    // reverse false mean animation will only happen once and not repeat if scrolled by again
})
.setClassToggle('#main', 'fade-in') // add class to main
.addIndicators({
    name: 'main fade',
    colorTrigger: 'black',
}) // this requires the plugin that is already attached to the html. optional object to customize.
.addTo(controller);