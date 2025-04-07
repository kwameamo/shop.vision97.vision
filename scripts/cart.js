// Ecwid shopping cart integration
document.addEventListener('DOMEvent', function() {
    // Find all bag/cart links and add event listeners
    const bagLinks = document.querySelectorAll('.right-menu a:contains("Store"), .mobile-header p:contains("BAG")');
    
    bagLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent the default link behavior
            e.preventDefault();
            
            // Show Ecwid shopping cart
            if (typeof Ecwid !== 'undefined') {
                Ecwid.openPage('cart');
            } else {
                // Fallback if Ecwid is not loaded
                window.location.href = 'store.html';
            }
        });
    });
});

// Update cart count on bag links
function updateBagCount() {
    if (typeof Ecwid !== 'undefined' && typeof Ecwid.Cart !== 'undefined') {
        Ecwid.OnAPILoaded.add(function() {
            Ecwid.OnCartChanged.add(function(cart) {
                const bagLinks = document.querySelectorAll('.mobile-header p, .right-menu li:last-child a');
                
                // Update the cart count
                if (cart && cart.productsQuantity > 0) {
                    bagLinks.forEach(link => {
                        link.textContent = `BAG (${cart.productsQuantity})`;
                    });
                } else {
                    bagLinks.forEach(link => {
                        link.textContent = 'BAG';
                    });
                }
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace bag links with Ecwid cart
    const bagLinks = document.querySelectorAll('.mobile-header p, .right-menu li:last-child a');
    
    bagLinks.forEach(link => {
        if (link.textContent.trim() === 'BAG') {
            link.style.cursor = 'pointer';
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Open Ecwid cart
                if (typeof Ecwid !== 'undefined') {
                    Ecwid.openPage('cart');
                } else {
                    // Fallback if Ecwid is not loaded
                    window.location.href = 'store.html';
                }
            });
        }
    });
    
    // Initialize cart count
    updateBagCount();
});