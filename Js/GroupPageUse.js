import { init } from './picture_carousel.js';
import * as GroupPageFoundation from "./GroupPageFoundation.js";

GroupPageFoundation.SetGroupPage();
GroupPageFoundation.loadGroupPage();

init();

// === 導覽列縮小功能 ===
document.addEventListener('DOMContentLoaded', () => {
    // 獲取捲動容器與 Navbar
    const scrollContainer = document.querySelector('.section-scroll-container');
    const header = document.getElementById('header');
    const banner = document.getElementById('banner');

    if (scrollContainer && header) {
        scrollContainer.addEventListener('scroll', () => {
            // 偵測容器捲動高度
            if (scrollContainer.scrollTop > 50) {
                header.classList.add('shrink');
                banner.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
                banner.classList.remove('shrink');
            }
        });
    }
});