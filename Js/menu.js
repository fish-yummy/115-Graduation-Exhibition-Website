// Js/menu.js (三欄式 + Anime.js 最終版)

export function initializeMenu() {
    const triggers = document.querySelectorAll('.trigger-item');
    const titles = document.querySelectorAll('.trigger-title');
    const cardSets = document.querySelectorAll('.card-set');

    if (triggers.length === 0) return;

    let currentAnimation = null;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.dataset.target;
            const targetSet = document.getElementById(targetId);
            const triggerIcon = trigger.querySelector('.trigger-icon');
            
            if (trigger.classList.contains('is-active')) return;

            // 1. 重置所有元素
            triggers.forEach(t => t.classList.remove('is-active'));
            titles.forEach(t => t.classList.remove('is-highlighted'));
            cardSets.forEach(cs => {
                cs.classList.remove('is-visible');
                if (window.anime) anime.set(cs.querySelectorAll('.menu-card'), { opacity: 0 });
            });
            triggers.forEach(t => {
                const icon = t.querySelector('.trigger-icon');
                if (icon) icon.src = icon.dataset.closingGif;
            });

            // 2. 激活當前觸發器、高亮標題、播放動畫
            if (targetSet && window.anime) {
                // 激活觸發器
                trigger.classList.add('is-active');
                triggerIcon.src = `${triggerIcon.dataset.openingGif}?t=${new Date().getTime()}`;
                
                // 高亮對應的標題
                const targetTitle = document.querySelector(`.trigger-title[data-title-for="${targetId}"]`);
                if (targetTitle) targetTitle.classList.add('is-highlighted');
                
                // 顯示卡片組容器
                targetSet.classList.add('is-visible');
                
                // 停止上一個動畫
                if (currentAnimation) currentAnimation.pause();

                // 使用 Anime.js 播放卡片進場動畫
                currentAnimation = anime({
                    targets: targetSet.querySelectorAll('.menu-card'),
                    translateX: [50, 0], // 從右側滑入
                    opacity: [0, 1],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(100) // 每個延遲 100ms
                });
            }
        });
    });

    // --- 關閉模態時的重置 ---
    const closeBtn = document.getElementById('close-menu-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimeout(() => {
                triggers.forEach(t => t.classList.remove('is-active'));
                titles.forEach(t => t.classList.remove('is-highlighted'));
                cardSets.forEach(cs => cs.classList.remove('is-visible'));
                triggers.forEach(t => {
                    const icon = t.querySelector('.trigger-icon');
                    if (icon) icon.src = icon.dataset.closingGif;
                });
            }, 500);
        });
    }
}