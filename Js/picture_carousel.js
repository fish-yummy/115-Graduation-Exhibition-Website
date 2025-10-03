// Js/picture_carousel.js
import * as ui from './picture_ui.js';

let slideIndex = 1;
let autoPlayTimeout = null;
let isPlaying = true;
let dots = [];

function showSlides(n) {
    if (n > ui.slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = ui.slides.length; }

    const offsetPercentage = -(slideIndex - 1) * (100 / ui.slides.length);
    ui.slidesInner.style.transform = `translateX(${offsetPercentage}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[slideIndex - 1].classList.add('active');
    
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
    const slideCount = ui.slides.length;
    if (slideCount === 0) return;

    ui.slidesInner.style.width = `${slideCount * 100}%`;
    Array.from(ui.slides).forEach(slide => {
        slide.style.width = `${100 / slideCount}%`;
    });

    ui.dotsContainer.innerHTML = '';
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'picture_dot';
        dot.addEventListener('click', () => currentSlide(i + 1));
        ui.dotsContainer.appendChild(dot);
        dots.push(dot);
    }

    showSlides(slideIndex);
}