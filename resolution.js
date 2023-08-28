function updateImageUrls() {

    const images = document.querySelectorAll('img:not(#toc-figures img):not(.publication-cover-image)');

    images.forEach(image => {

        // Wrap image in div  
        const div = document.createElement('div');
        div.style.width = image.width + 'px';
        div.style.height = image.height + 'px';

        image.parentNode.insertBefore(div, image);
        div.appendChild(image);

        // Update src
        const src = image.src;
        if (src.startsWith('https://ars.els-cdn.com/content/image/')) {
            const parts = src.split('.');
            parts[parts.length - 2] += '_lrg';
            image.src = parts.join('.');
            console.log('Updated image URL: ' + image.src);
        } else {
            console.log('Image URL not updated: ' + image.src);
        }

    });

}

// Select figure elements
const figures = document.querySelectorAll('.figure');

if (figures.length > 0) {
    // Figures exist, update images
    updateImageUrls();
} else {

    // Create observer to watch for .figure elements being added
    const observer = new MutationObserver(mutations => {
        if (document.querySelector('.figure')) {
            // wait 1 second for images to load
            setTimeout(updateImageUrls, 1000);
            observer.disconnect(); // Stop observing
            updateImageUrls();
        }
    });

    observer.observe(document, {
        subtree: true,
        childList: true
    });

}