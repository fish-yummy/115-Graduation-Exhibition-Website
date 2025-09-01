// Js/picture_script.js (Main Entry Point for picture.html)
import * as ui from '/Js/picture_ui.js';
import { plusSlides, currentSlide, togglePlayPause, init } from '/Js/picture_carousel.js';

// --- 事件監聽器綁定 ---
ui.prevBtn.addEventListener('click', () => plusSlides(-1));
ui.nextBtn.addEventListener('click', () => plusSlides(1));
ui.dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide(index + 1);
    });
});
ui.playPauseBtn.addEventListener('click', togglePlayPause);

// --- 初始化輪播 ---
init();