const controller = new ScrollMagic.Controller();

const mainScene = new ScrollMagic.Scene({
    triggerElement: '#main',
    duration: '1000%',
    triggerHook: .8,
    // reverse: false 
})
.setClassToggle('#main', 'fade-in') 
.addTo(controller);


fetch('https://fine-line-philosophy.herokuapp.com/pairs')
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

function createForm() {

    var customSelectBox, j, selectPairList, selectedDisplay, b, c;

    customSelectBox = document.querySelector(".custom-select");
    selectPairList = document.querySelector("#select-pair-form");

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

        const entriesContainer = document.querySelector("#entries-container");
        entriesContainer.classList.add('fade-in')

        clearEntries();
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
    formHeader = document.querySelector('.select-selected')
    formHeader.addEventListener('click', event => {
        const entriesContainer = document.querySelector("#entries-container");
        entriesContainer.classList.remove('fade-in')
    })
}

function clearEntries() {
    const ideaOneEntries = document.querySelector('#idea-one-entries')
    let child = ideaOneEntries.lastElementChild
    while (child) {
        ideaOneEntries.removeChild(child)
        child = ideaOneEntries.lastElementChild
    }

    const ideaTwoEntries = document.querySelector('#idea-two-entries')
    let childTwo = ideaTwoEntries.lastElementChild
    while (childTwo) {
        ideaTwoEntries.removeChild(childTwo)
        childTwo = ideaTwoEntries.lastElementChild
    }
}

function getIdeas(pairId) {
    fetch(`https://fine-line-philosophy.herokuapp.com/pairs/${pairId}`)
    .then(response => response.json())
    .then(pair => getEntryIds(pair.idea_one_id, pair.idea_two_id))
}

function getEntryIds(idea_one_id, idea_two_id) {
    fetch(`https://fine-line-philosophy.herokuapp.com/ideas/${idea_one_id}`)
    .then(response => response.json())
    .then(idea => getOneEntries(idea.entries))

    fetch(`https://fine-line-philosophy.herokuapp.com/ideas/${idea_two_id}`)
    .then(response => response.json())
    .then(idea => getTwoEntries(idea.entries))
}

function getOneEntries(entries) {
    entries.sort((a, b) => b.id - a.id).forEach(renderOneEntries)
}

function renderOneEntries(entryDetail) {
    console.log(entryDetail)
    const entriesContainer = document.querySelector('#idea-one-entries')
    const entryCard = document.createElement('div')

    const datetime = entryDetail.created_at
    const parts = datetime.split(/[-T]/)
    const date = `${parts[1]}/${parts[2]}/${parts[0]}`

    entryCard.className = "entry-card"
    entryCard.innerHTML = `
    <header class="entry-card-header">
        <div>@${entryDetail.user.username}</div>
        <div>${date}</div>
    </header>
    <section class="entry-card-idea">
        ${entryDetail.idea.name}
    </section>
    <section class="entry-content">
        ${entryDetail.content}
    </section>
    `
    entriesContainer.appendChild(entryCard)
}

function getTwoEntries(entries) {
    entries.sort((a, b) => b.id - a.id).forEach(renderTwoEntries)
}

function renderTwoEntries(entryDetail) {
    const entriesContainer = document.querySelector('#idea-two-entries')
    const entryCard = document.createElement('div')

    const datetime = entryDetail.created_at
    const parts = datetime.split(/[-T]/)
    const date = `${parts[1]}/${parts[2]}/${parts[0]}`

    entryCard.className = "entry-card"
    entryCard.innerHTML = `
    <header class="entry-card-header">
        <div>@${entryDetail.user.username}</div>
        <div>${date}</div>
    </header>
    <section class="entry-card-idea">
        ${entryDetail.idea.name}
    </section>
    <section class="entry-content">
            ${entryDetail.content}
    </section>
    `
    entriesContainer.appendChild(entryCard)
}

  // logout handling 
  const logOutButton = document.querySelector('#logout-nav')
  logOutButton.addEventListener('click', event => {
    localStorage.removeItem("token")
  })