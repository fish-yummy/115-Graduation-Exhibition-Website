// Js/navigation.js
import LoadingController from './LoadingController.js'; 

export function initializeNavigation() {
    const loadingOverlay = document.getElementById('loading-overlay');
    const menuModal = document.getElementById('fullscreen-menu-modal');

    if (!loadingOverlay) return;

    // 修改重點：改監聽整個 document 的點擊事件 (Event Delegation)
    // 這樣才能抓到動態生成的手機選單連結
    document.addEventListener('click', (event) => {
        // 1. 往上尋找被點擊的元素是否為 <a> 標籤 (或是包含在 <a> 裡面的圖片/文字)
        const link = event.target.closest('a');
        
        // 如果沒有點到連結，或者連結沒有 href，就忽略
        if (!link || !link.href) return;

        const targetUrl = link.getAttribute('href');
        
        // 排除空連結、javascript 語法、以及頁內錨點 (以 # 開頭)
        if (!targetUrl || targetUrl === '#' || targetUrl.startsWith('javascript:') || targetUrl.startsWith('#')) return;
        
        // 2. 設定觸發條件：
        //    - 連結包含 'GroupPage.html' (作品內頁)
        //    - 或者擁有特定 class (.app-card, .works_overview_item, .nav-link)
        const shouldTriggerLoading = 
            targetUrl.includes('GroupPage.html') || 
            link.classList.contains('app-card') || 
            link.classList.contains('works_overview_item') ||
            link.classList.contains('nav-link');

        if (shouldTriggerLoading) {
            // 3. 阻止瀏覽器預設的直接跳轉
            event.preventDefault();
            const destination = link.href;

            // 4. 如果選單是開著的，先關閉它
            if (menuModal && menuModal.classList.contains('active')) {
                menuModal.classList.remove('active');
            }

            // 5. 啟動 Loading 畫面
            // 稍微延遲 100ms 讓選單關閉動畫開始播，體驗比較流暢
            setTimeout(() => {
                loadingOverlay.classList.add('active');

                // 建立 Loading 控制器並開始跑進度條
                const loader = new LoadingController();
                loader.start().then(() => {
                    // 當 Loading 完成 (Promise resolve) 後，才真正跳轉頁面
                    console.log(`Loading 完成，跳轉至: ${destination}`);
                    window.location.href = destination;
                });
            }, 100);
        }
    });
}