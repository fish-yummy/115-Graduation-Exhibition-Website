export function initScrollHandler(){
    const header = document.getElementById('header');
    const banner = document.getElementById('banner');
    const logo = document.getElementById('logo');
    const nav = document.getElementById('nav');

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // 簡單邏輯：往下滾動縮小，往上滾動恢復
        if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // 往下滾動 - 縮小
            header.classList.add('shrink');
            banner.classList.add('shrink');
            logo.classList.add('shrink');
            nav.classList.add('shrink');
        } else if (currentScrollY < lastScrollY || currentScrollY <= 10) {
            // 往上滾動或在頂部 - 恢復
            header.classList.remove('shrink');
            banner.classList.remove('shrink');
            logo.classList.remove('shrink');
            nav.classList.remove('shrink');
        }
        
        lastScrollY = currentScrollY;
    });
}