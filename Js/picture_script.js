// Js/picture_script.js
import * as ui from './picture_ui.js';
import { plusSlides, togglePlayPause, init } from './picture_carousel.js';

ui.prevBtn.addEventListener('click', () => plusSlides(-1));
ui.nextBtn.addEventListener('click', () => plusSlides(1));
ui.playPauseBtn.addEventListener('click', togglePlayPause);

init();