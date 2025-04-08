/* Mobile Menus with scroll lock */ 

/* Open/close nav */
const divContainer = document.querySelector('#mob-menu');
let isClicked = true;

let toggleNav = function() {
  if(isClicked) {
    // Open menu
    divContainer.style.visibility = 'visible';
    // Lock scroll
    document.documentElement.classList.add('no-scroll');
    isClicked = false;
  } else {
    // Close menu
    divContainer.style.visibility = 'hidden';
    // Unlock scroll
    document.documentElement.classList.remove('no-scroll');
    isClicked = true;
  }
}

/*Close Subscribe*/ 
function closeSub() {
  document.getElementById("sub-bg").style.display = "none"; 
}

/* Global cart opening function */
function showEcwidCart() {
  if (typeof Ecwid !== 'undefined') {
    Ecwid.openPage('cart');
  } else {
    window.location.href = 'store.html';
  }
}

/* Initialize cart functionality */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all bag links
  const bagLinks = document.querySelectorAll('.bag-link');
  
  bagLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showEcwidCart();
    });
  });
  
  // Initialize Ecwid
  if (typeof Ecwid != 'undefined') {
    Ecwid.init();
    
    // Setup cart counter updates
    Ecwid.OnAPILoaded.add(function() {
      // Update cart count initially
      Ecwid.Cart.get(function(cart) {
        updateBagCount(cart);
      });
      
      // Update cart count when changed
      Ecwid.OnCartChanged.add(function(cart) {
        updateBagCount(cart);
      });
    });
  }
});

/* Update bag count */
function updateBagCount(cart) {
  const bagLinks = document.querySelectorAll('.bag-link');
  
  if (cart && cart.productsQuantity > 0) {
    bagLinks.forEach(link => {
      link.textContent = `BAG (${cart.productsQuantity})`;
    });
  } else {
    bagLinks.forEach(link => {
      link.textContent = 'BAG';
    });
  }
}