let entryForm = document.querySelector('#text-box-submit')

const controller = new ScrollMagic.Controller();

const mainScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '1000%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#main', 'fade-in') 
.addTo(controller);

fetch('http://localhost:4000/pairs')
    .then(response => response.json())
    .then(pairs => renderPairs(pairs))

function renderPairs(pairs) {
    pairForm = document.querySelector('#select-pair-form')
    pairs.forEach(pair => {
        pairOption = document.createElement('option')
        pairOption.value = pair.id
        pairOption.innerHTML = `${pair.idea_one.name} & ${pair.idea_two.name}`
        pairForm.append(pairOption)
    });
    createForm()
}

function createForm () {
    var customSelectBox, j, selectPairList, selectedDisplay, b, c;

    customSelectBox = document.querySelector(".custom-select");
    selectPairList = document.querySelector("#select-pair-form");
    promptAndBox = document.querySelector("#prompt-and-box");

    selectedDisplay = document.createElement("DIV");
    selectedDisplay.setAttribute("class", "select-selected");
    selectedDisplay.innerHTML = selectPairList.options[selectPairList.selectedIndex].innerHTML;
    
    customSelectBox.appendChild(selectedDisplay);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selectPairList.length; j++) {

        c = document.createElement("DIV");
        c.innerHTML = selectPairList.options[j].innerHTML;
        c.id = selectPairList.options[j].value

        c.addEventListener("click", function(e) {
            var y, i, k, s, h;
            customSelectBox.classList.add('hide')
            promptAndBox.classList.add('appear')

            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            h = this.parentNode.previousSibling;
            for (i = 0; i < s.length; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                s.selectedIndex = i;
                h.innerHTML = this.innerHTML;
                y = this.parentNode.getElementsByClassName("same-as-selected");
                for (k = 0; k < y.length; k++) {
                    y[k].removeAttribute("class");
                }
                this.setAttribute("class", "same-as-selected");
                break;
                }
            }
        h.click();

        const pairId = e.target.id
        getIdeas(pairId)
    });
    b.appendChild(c);
    }
    customSelectBox.appendChild(b);
    selectedDisplay.addEventListener("click", function(e) {
        
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });

    function closeAllSelect(elmnt) {

    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
        if (elmnt == y[i]) {
        arrNo.push(i)
        } else {
        y[i].classList.remove("select-arrow-active");
        }
    }
    for (i = 0; i < x.length; i++) {
        if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
        }
    }
    }
    document.addEventListener("click", closeAllSelect);
}

function getIdeas(pairId) {
    fetch(`http://localhost:4000/pairs/${pairId}`)
    .then(response => response.json())
    .then(pair => saveIdeaNamesAndIds(pair))
}

function saveIdeaNamesAndIds(pair) {
    const ideaId1 = pair.idea_one.id
    const ideaId2 = pair.idea_two.id
    const ideaName1 = pair.idea_one.name
    const ideaName2 = pair.idea_two.name

    renderPrompt(ideaName1, ideaId1, ideaName2, ideaId2)
}

function renderPrompt(ideaName1, ideaId1, ideaName2, ideaId2) {
    const promptSection = document.querySelector('#prompt')
    const prompt = document.createElement('h1')
    prompt.classList.add('pairs')
    prompt.id = "first-prompt"
    prompt.innerHTML = `What does <span class="yellow-underline">${ideaName1}</span> mean to you ?`
    promptSection.appendChild(prompt)

    submitIdea(ideaId1, ideaName2, ideaId2)
}

function submitIdea(ideaId1, ideaName2, ideaId2) {
    entryForm.addEventListener('submit', event => {
       event.preventDefault()

       const formData = new FormData(entryForm)
       const content = formData.get('content')

       const entryData = {
           content: content,
           user: 27,
           idea: ideaId1
       }
      
       entryForm.reset()
       submitEntry(entryData)
       const firstPrompt = document.querySelector('#first-prompt')
       firstPrompt.classList.add('fade-out')

       renderSecondPrompt(ideaName2, ideaId2)
   }, {once: true})
}

function renderSecondPrompt(ideaName2, ideaId2) {
    setTimeout(function() {
    const promptSection = document.querySelector('#prompt')

    const firstPrompt = document.querySelector('#first-prompt')
    firstPrompt.remove()

    const prompt = document.createElement('h1')
    prompt.id = "second-prompt"
    prompt.classList.add('pairs')
    prompt.innerHTML = `What does <span class="yellow-underline">${ideaName2}</span> mean to you ?`
    promptSection.appendChild(prompt)

    submitSecondIdea(ideaId2)
}, 1000)}

function submitSecondIdea(ideaId2) {
    entryForm.addEventListener('submit', event => {
       event.preventDefault()

       const formData = new FormData(entryForm)
       const content = formData.get('content')

       const entryData = {
           content: content,
           user: 27,
           idea: ideaId2
       }
      
       entryForm.reset()
       submitEntry(entryData)
       endScreen()
   })
}

function submitEntry(entryData) {
    const configObject = {
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(entryData)
  }
    fetch('http://localhost:4000/entries/', configObject)
  }

  function endScreen(){
    const promptAndForm = document.querySelector('#prompt-and-box')
    promptAndForm.classList.add('fade-out')

    setTimeout(function() {
        promptAndForm.remove()
        const endScreen = document.querySelector('#end-screen')
        endScreen.classList.add('visible')
    }, 1800)
  }

  // login form handling 

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

  const getUsers = document.querySelector('#get-users')
  getUsers.addEventListener('click', handleGetUsers)

  function handleGetUsers() {
    fetch('http://localhost:4000/users', {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${ localStorage.getItem("token")}`
        }
    })
    .then(response => response.json())
    .then(console.log)
  }