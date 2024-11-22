window.onload = main;

function main() {

    const photoBox = document.querySelector('#photo');
    const photoName = document.querySelector('#photoName');
    const status = document.querySelector('#status');
    const loadPhotosBtn = document.querySelector('#loadPhotos');
    const loadJSONBtn = document.querySelector('#loadJSON');
    const prevPhotoBtn = document.querySelector('#prevPhoto');
    const nextPhotoBtn = document.querySelector('#nextPhoto');
    const firstPhotoBtn = document.querySelector('#firstPhoto');
    const lastPhotoBtn = document.querySelector('#lastPhoto');
    const slideShowBtn = document.querySelector('#slideShow');
    const randomSlideShowBtn = document.querySelector('#randomSlideShow');
    const stopSlideShowBtn = document.querySelector('#stopSlideShow');
    const resetFormBtn = document.querySelector('#reset');

    let photos = [];

    let currentPhotoIndex = 0;
    let slideShowInterval;

    photoBox.onclick = playNextPhoto;
    loadPhotosBtn.onclick = loadPhotos;
    loadJSONBtn.onclick = loadJSON;
    prevPhotoBtn.onclick = playPreviousPhoto;
    nextPhotoBtn.onclick = playNextPhoto;
    firstPhotoBtn.onclick = playFirstPhoto;
    lastPhotoBtn.onclick = playLastPhoto;
    slideShowBtn.onclick = playSlideShow;
    randomSlideShowBtn.onclick = playRandomSlideShow;
    stopSlideShowBtn.onclick = stopSlideShow;
    resetFormBtn.onclick = reset;

    showError("Error: you must load data first");
    photoBox.src = 'InitialImage.jpg';
    photoName.value = 'InitialImage.jpg';


    function displayPhoto() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }
        
        photoBox.src = photos[currentPhotoIndex];
        photoName.value = photos[currentPhotoIndex];
    }

    function loadPhotos() {
        const folder = document.querySelector('#folderName').value;
        const common = document.querySelector('#commonName').value;
        const start = parseInt(document.querySelector('#startNumber').value);
        const end = parseInt(document.querySelector('#endNumber').value);

        if (end < start) {
            showError("Error: Invalid Range");
            return;
        }

        photos = [];

        for (let i = start; i <= end; i++) {
            photos.push(`${folder}${common}${i}.jpg`);
        }

        showStatus("Photo Viewer System");
        currentPhotoIndex = 0;
        displayPhoto();
    }

    /* LAMBDA */
    function loadJSON() {
        const url = document.querySelector('#jsonURL').value;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                photos = data.images.map(image => image.imageURL);
                showStatus("Photo Viewer System");
                currentPhotoIndex = 0;
                displayPhoto();
            })
    }

    function playNextPhoto() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;    /* reach the end */
        displayPhoto();
    }

    function playPreviousPhoto() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        displayPhoto();
    }

    function playFirstPhoto() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        currentPhotoIndex = 0;
        displayPhoto();
    }

    function playLastPhoto() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        currentPhotoIndex = photos.length - 1;
        displayPhoto();
    }

    function playSlideShow() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        stopSlideShow();
        slideShowInterval = setInterval(playNextPhoto, 1000);
    }

    /* LAMBDA */
    function playRandomSlideShow() {
        if (photos.length === 0) {
            showError("Error: you must load data first");
            return;
        }

        stopSlideShow();
        slideShowInterval = setInterval(() => {
            currentPhotoIndex = Math.floor(Math.random() * photos.length);
            displayPhoto();
        }, 1000);
    }

    function stopSlideShow() {
        clearInterval(slideShowInterval);
    }

    function showError(message) {
        status.textContent = message;
        status.style.color = 'red';
    }

    function showStatus(message) {
        status.textContent = message;
        status.style.color = 'red';
    }

    function reset() {
        document.querySelector('#folderName').value = 'umcp/';
        document.querySelector('#commonName').value = 'college';
        document.querySelector('#startNumber').value = '2';
        document.querySelector('#endNumber').value = '4';
        document.querySelector('#jsonURL').value = '';
    }
}
