const imagePaths = [
    "images/2023_1st_Qtr/1.png", // Photo 1
    "images/2023_1st_Qtr/2.png", // Photo 2
    "images/2023_1st_Qtr/3.png", // Photo 3
    "images/2023_1st_Qtr/4.png", // Photo 4
    "images/2023_1st_Qtr/5.png", // Photo 5
    "images/2023_1st_Qtr/6.png", // Photo 6
    "images/2023_1st_Qtr/7.png", // Photo 7
    "images/2023_1st_Qtr/Circle-1.png", // Circle 1
    "images/2023_1st_Qtr/Circle-2.png", // Circle 2
    "images/2023_1st_Qtr/Rectangle-1.png"  // Rectangle 1
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