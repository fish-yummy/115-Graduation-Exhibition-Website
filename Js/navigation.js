// Js/navigation.js
import LoadingController from './LoadingController.js'; 

export function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const loadingOverlay = document.getElementById('loading-overlay');
    // 獲取全螢幕選單和抽屜容器的引用
    const menuModal = document.getElementById('fullscreen-menu-modal');
    const menuAppContainer = document.getElementById('menu-app-container');

    if (!loadingOverlay || navLinks.length === 0 || !menuModal) return;

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // 1. 阻止瀏覽器立即跳轉
            event.preventDefault(); 
            
            const destination = link.href; // 儲存目標網址

            // === 新增邏輯：關閉全螢幕選單並重置狀態 ===
            // 移除 modal 的 active class，觸發 CSS 關閉動畫 (Menu.css 中是 0.6s)
            menuModal.classList.remove('active');
            
            // 確保 Stage 2 狀態也被移除，防止菜單閃爍
            menuModal.classList.remove('stage-2-active');

            // 確保抽屜 (app container) 關閉
            if (menuAppContainer) {
                menuAppContainer.classList.remove('active');
            }
            // ===========================================

            // 為了讓使用者看到選單關閉動畫，我們延遲啟動 Loading 畫面
            // 延遲 300ms (小於選單的 600ms 動畫時間)，確保在選單消失時，Loading 畫面已準備好
            setTimeout(() => {
                
                // 2. 顯示 Loading 覆蓋層
                loadingOverlay.classList.add('active');

                // 3. 創建實例並啟動 Loading 動畫
                const loader = new LoadingController();
                loader.start().then(() => {
                    // 4. 當 Loading 動畫完成後 (Promise resolve)，執行跳轉
                    console.log(`跳轉至: ${destination}`);
                    window.location.href = destination;
                });
            }, 300); // 延遲 300 毫秒
        });
    });
}