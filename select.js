var customSelectBox, i, j, pairOption, optionDiv, b, c;

customSelectBox = document.querySelector(".custom-select")
pairOption = document.querySelector("#select-pair-form");

/* For each element, create a new DIV that will act as the selected item: */
optionDiv = document.createElement("DIV");
optionDiv.setAttribute("class", "select-selected");
optionDiv.innerHTML = pairOption.options[pairOption.selectedIndex].innerHTML;
customSelectBox.appendChild(optionDiv);

/* For each element, create a new DIV that will contain the option list: */
b = document.createElement("DIV");
b.setAttribute("class", "select-items select-hide");
for (j = 1; j < pairOption.length; j++) {
  /* For each option in the original select element,
  create a new DIV that will act as an option item: */
  c = document.createElement("DIV");
  c.innerHTML = pairOption.options[j].innerHTML;
  c.addEventListener("click", function(e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
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
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
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

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
