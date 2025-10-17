export function initScrollHandler() {
    // 確認 DOM 已經生成
    document.addEventListener('DOMContentLoaded', () => {
        const header = document.getElementById('header');
        const banner = document.getElementById('banner');
        const logo = document.getElementById('logo');
        const nav = document.getElementById('nav');

        // 如果任一元素不存在，先跳出或給警告
        if (!header) console.warn('header not found!');
        if (!banner) console.warn('banner not found!');
        if (!logo) console.warn('logo not found!');
        if (!nav) console.warn('nav not found!');

        // 如果 header 或 nav 都不存在，就不綁 scroll 事件
        if (!header && !nav) return;

        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', function() {
            const currentScrollY = window.scrollY;

            // 簡單示範：header 滾動透明度變化
            if (header) {
                if (currentScrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            // logo / nav 等其他元素也同樣檢查是否存在
            if (logo) {
                if (currentScrollY > 50) {
                    logo.classList.add('small');
                } else {
                    logo.classList.remove('small');
                }
            }

            lastScrollY = currentScrollY;
        });
    });
}
