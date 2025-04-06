const images = document.querySelectorAll('.gallery-photos');

let draggedImage = null;

images.forEach(img => {
    img.addEventListener('dragstart', (e) => {
        draggedImage = e.target;
    });

    img.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    img.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedImage) {
            const tempSrc = draggedImage.src;
            draggedImage.src = e.target.src;
            e.target.src = tempSrc;
        }
    });

    img.addEventListener('dragend', () => {
        draggedImage = null;
    });
});