// Js/menu.js

export function initializeMenu() {
    // 選取觸發彈窗的 GIF 選項
    const choices = document.querySelectorAll('.menu-choice');
    // 選取彈出的覆蓋層
    const overlay = document.querySelector('.menu-display-overlay');
    // 選取覆蓋層裡的關閉按鈕
    const closeButton = document.querySelector('.close-button');
    // 選取所有詳細選單的容器
    const menuContainers = document.querySelectorAll('.menu-container');

    // 進行安全檢查，如果找不到任何一個元素，就在控制台報錯並停止執行
    if (!overlay || !closeButton || choices.length === 0) {
        console.error("選單元件初始化失敗：找不到必要的 HTML 元素。");
        return;
    }

    // 為每一個 GIF 選項綁定點擊事件
    choices.forEach(choice => {
        choice.addEventListener('click', () => {
            const targetId = choice.dataset.menuTarget;
            const targetMenu = document.getElementById(targetId);

            if (targetMenu) {
                // 1. 顯示覆蓋層
                overlay.classList.add('active');
                
                // 2. 確保所有選單都是隱藏的
                menuContainers.forEach(mc => mc.classList.remove('active'));

                // 3. 延遲一會兒再顯示目標選單，確保放大動畫能播放
                setTimeout(() => {
                    targetMenu.classList.add('active');
                }, 10);
            }
        });
    });

    // 為關閉按鈕綁定點擊事件
    closeButton.addEventListener('click', () => {
        // 隱藏覆蓋層
        overlay.classList.remove('active');
        
        // 同時也隱藏所有詳細選單，為下次點擊做準備
        menuContainers.forEach(mc => mc.classList.remove('active'));
    });
}