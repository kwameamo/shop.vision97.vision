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

