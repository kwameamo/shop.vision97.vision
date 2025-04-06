/* Mobile Menus*/ 

/* Open/close nav */
const divContainer = document.querySelector('#mob-menu');
let isClicked = true;

let toggleNav = function() {
  if(isClicked) {
    divContainer.style.visibility = 'visible';
    isClicked = false;
  } else {
    divContainer.style.visibility = 'hidden';
    isClicked = true;
  }
}

/*Close Subscribe*/ 
function closeSub() {
  document.getElementById("sub-bg").style.display = "none"; 
}