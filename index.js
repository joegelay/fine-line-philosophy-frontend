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
.setClassToggle('.read-write', 'fade-in') 
.addTo(controller);

fetch('https://fine-line-philosophy.herokuapp.com/pairs')
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

// check if token exists
const token = localStorage.getItem("token")
const readWriteButtons = document.querySelector('#read-write')
const loginButtons = document.querySelector('#login-signup')
if (!token || token === "undefined") {
    hideReadWrite()
    showLoginSignup()
} else {
    showReadWrite()
    hideLoginSignup()
}

function hideReadWrite() {
    if (!readWriteButtons.classList.contains('hide')) {
        readWriteButtons.classList.add('hide')
    }
}

function showReadWrite() {
    if (readWriteButtons.classList.contains('hide')) {
        readWriteButtons.classList.remove('hide')
    }
}

function hideLoginSignup() {
    if (!loginButtons.classList.contains('hide')) {
        loginButtons.classList.add('hide')
    }
}

function showLoginSignup() {
    if (loginButtons.classList.contains('hide')) {
        loginButtons.classList.remove('hide')
    }
}


const loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', handleLogin)
  
  function handleLogin(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password')

    const loginData = {
            username: username, 
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
      fetch('https://fine-line-philosophy.herokuapp.com/login', configObject)
      .then(response => response.json())
      .then(result => chooseResultPath(result))
    
    event.target.reset();
  }

  function chooseResultPath(result) {
      if (result["token"]) {
          localStorage.setItem("token", result.token)
          location.reload();
      } else {
        alert(result["message"])
      }
  }

  const signUpForm = document.querySelector('#sign-up-form')
  signUpForm.addEventListener('submit', handleSignUp)
  
  function handleSignUp(event) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const email = formData.get('email')
    const password = formData.get('password')

    const signUpData = {
        user: {
            username: username, 
            email: email,
            password: password
        }
    }

    const configObject = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(signUpData)
    }
      fetch('https://fine-line-philosophy.herokuapp.com/users', configObject)
      .then(response => response.json())

    event.target.reset();

    const modal = document.getElementById('id02')
    modal.style.display = 'none'
  }

