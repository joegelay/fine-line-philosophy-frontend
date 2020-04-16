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

fetch('http://localhost:4000/pairs')
    .then(response => response.json())
    .then(pairs => renderPairs(pairs))

function renderPairs(pairs) {
    pairSlider = document.querySelector('#sliding-vertical')
    pairs.forEach(pair => {

        pairSlide = document.createElement('h2')
        pairSlide.classList.add("pairs")
        pairSlide.innerHTML = `${pair.idea_one.name} <span class="yellow">&</span> ${pair.idea_two.name} ?`
        pairSlider.append(pairSlide)
    });
}

const loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', handleLogin)
  
  function handleLogin(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    const loginData = {
            username: username, 
            email: email, 
            password: password
    }

    const configObject = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    }
      fetch('http://localhost:4000/login', configObject)
      .then(response => response.json())
      .then(result => {
          console.log(result.token)
          localStorage.setItem("token", result.token)
      })

    event.target.reset();
  }

