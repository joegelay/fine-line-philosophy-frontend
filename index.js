//Init ScrollMagic
const controller = new ScrollMagic.Controller();

//build a scene
const ourScene = new ScrollMagic.Scene({
    triggerElement: '#main'
})
.setClassToggle('#main', 'fade-in') // add class to main
.addIndicators({
    name: 'fade scene',
    colorTrigger: 'black',
}) // this requires the plugin that is already attached to the html. optional object to customize.
.addTo(controller);