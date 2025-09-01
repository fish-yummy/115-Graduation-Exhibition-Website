// Js/picture_carousel.js
import * as ui from '/Js/picture_ui.js';

let slideIndex = 1;
let autoPlayTimeout = null;
let isPlaying = true;

function showSlides(n) {
    if (n > ui.slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = ui.slides.length; }

    const offsetPercentage = -(slideIndex - 1) * 100 / ui.slides.length;
    ui.slidesInner.style.transform = `translateX(${offsetPercentage}%)`;

    ui.dots.forEach(dot => dot.classList.remove('active'));
    ui.dots[slideIndex - 1].classList.add('active');
    
    clearTimeout(autoPlayTimeout);
    if (isPlaying) {
        ui.playPauseBtn.innerHTML = '暫停自動播放';
        autoPlayTimeout = setTimeout(() => {
            plusSlides(1);
        }, 3000);
    } else {
        ui.playPauseBtn.innerHTML = '開始自動播放';
    }
}

export function plusSlides(n) {
    showSlides(slideIndex += n);
}

export function currentSlide(n) {
    showSlides(slideIndex = n);
}

export function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        plusSlides(1);
    } else {
        clearTimeout(autoPlayTimeout);
        ui.playPauseBtn.innerHTML = '開始自動播放';
    }
}

export function init() {
    showSlides(slideIndex);
}