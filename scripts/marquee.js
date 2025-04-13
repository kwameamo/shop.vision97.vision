const imagePaths = [
    "images/war/1.jpeg", // Photo 1
    "images/war/2.jpeg", // Photo 2
    "images/war/3.jpeg", // Photo 3
    "images/war/4.jpeg", // Photo 4
    "images/war/5.jpeg", // Photo 5
    "images/war/6.jpeg", // Photo 6
    "images/war/7.jpeg", // Photo 7
    "images/war/8.jpeg", // Photo 8
];

let currentImageIndex = 0;
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const marqueeItems = document.querySelectorAll('.marquee-item');

// Open lightbox with clicked image
marqueeItems.forEach((item) => {
    item.addEventListener('click', () => {
        const imageId = parseInt(item.getAttribute('data-id')) - 1;
        currentImageIndex = imageId;
        openLightbox(imageId);
    });
});

function openLightbox(index) {
    lightboxImage.src = imagePaths[index];
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + imagePaths.length) % imagePaths.length;
    lightboxImage.src = imagePaths[currentImageIndex];
}

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});

// Pause marquee animation on hover
document.querySelectorAll('.marquee').forEach(marquee => {
    marquee.addEventListener('mouseenter', () => {
        marquee.style.animationPlayState = 'paused';
    });
    
    marquee.addEventListener('mouseleave', () => {
        marquee.style.animationPlayState = 'running';
    });
});




// Parallax effect for background elements
    document.addEventListener('DOMContentLoaded', function() {
        const about = document.getElementById('about-section');
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        // Only initialize if the about section exists
        if (about) {
            // Create subtle animation for elements on page load
            parallaxElements.forEach((element, index) => {
                setTimeout(() => {
                    element.style.opacity = '0.15';
                    element.style.transform = 'scale(1.02)';
                }, index * 200);
            });
            
            // Add parallax effect on mouse move
            about.addEventListener('mousemove', function(e) {
                const aboutRect = about.getBoundingClientRect();
                const mouseX = e.clientX - aboutRect.left;
                const mouseY = e.clientY - aboutRect.top;
                
                const centerX = aboutRect.width / 2;
                const centerY = aboutRect.height / 2;
                
                const moveX = (mouseX - centerX) / 30;
                const moveY = (mouseY - centerY) / 30;
                
                parallaxElements.forEach((element, index) => {
                    const factor = (index + 1) * 0.5;
                    element.style.transform = `translate(${moveX * factor}px, ${moveY * factor}px) scale(1.02)`;
                });
            });
            
            // Reset elements when mouse leaves
            about.addEventListener('mouseleave', function() {
                parallaxElements.forEach(element => {
                    element.style.transform = 'scale(1.02)';
                    element.style.transition = 'transform 0.8s ease';
                });
            });
            
            // Text animation
            const animatedWords = document.querySelectorAll('.animated-word');
            animatedWords.forEach(word => {
                word.addEventListener('mouseenter', function() {
                    this.style.textShadow = '0 0 8px rgba(0,0,0,0.3)';
                });
                
                word.addEventListener('mouseleave', function() {
                    this.style.textShadow = 'none';
                });
            });
        }
    });
