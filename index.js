const controller = new ScrollMagic.Controller();

const landingScene = new ScrollMagic.Scene({
    triggerElement: '#landing',
    duration: '120%',
    triggerHook: 1
})
.setClassToggle('#landing', 'fade-in') 
.addTo(controller);

const mainScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#main', 'fade-in') 
.addTo(controller);

const typingScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#tag-line', 'animate') 
.addTo(controller);

const pairScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#sliding-vertical', 'fade-in') 
.addTo(controller);

const navScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '100%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#read-write', 'fade-in') 
.addTo(controller);

// const readScene = new ScrollMagic.Scene({
//     triggerElement: '#read-page',
//     duration: '100%',
//     triggerHook: .8,
//     // reverse: false 
//     // reverse false mean animation will only happen once and not repeat if scrolled by again
// })
// .setClassToggle('#read-page', 'fade-in') 
// .addTo(controller);