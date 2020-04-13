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
    console.log(pairForm)
    let i = 1
    pairs.forEach(pair => {

        pairOption = document.createElement('option')
        pairOption.value = i
        pairOption.innerHTML = `${pair.idea_one.name} & ${pair.idea_two.name}`
        pairForm.append(pairOption)
        i++
    });
    createForm()
}

function createForm() {

    var customSelectBox, j, pairOption, optionDiv, b, c;

    customSelectBox = document.querySelector(".custom-select")
    pairOption = document.querySelector("#select-pair-form");

    optionDiv = document.createElement("DIV");
    optionDiv.setAttribute("class", "select-selected");
    optionDiv.innerHTML = pairOption.options[pairOption.selectedIndex].innerHTML;
    customSelectBox.appendChild(optionDiv);

    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < pairOption.length; j++) {
   
    c = document.createElement("DIV");
    c.innerHTML = pairOption.options[j].innerHTML;
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
    });
    b.appendChild(c);
    }
    customSelectBox.appendChild(b);
    optionDiv.addEventListener("click", function(e) {
        
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


