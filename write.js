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