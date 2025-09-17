// Js/navigation.js
import LoadingController from './LoadingController.js'; 

export function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const loadingOverlay = document.getElementById('loading-overlay');

    if (!loadingOverlay || navLinks.length === 0) return;

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // 1. 阻止瀏覽器立即跳轉
            event.preventDefault(); 
            
            const destination = link.href; // 儲存目標網址

            // 2. 顯示 Loading 覆蓋層
            loadingOverlay.classList.add('active');

            // 3. 創建實例並啟動 Loading 動畫
            const loader = new LoadingController();
            loader.start().then(() => {
                // 4. 當 Loading 動畫完成後 (Promise resolve)，執行跳轉
                console.log(`跳轉至: ${destination}`);
                window.location.href = destination;
            });
        });
    });
}