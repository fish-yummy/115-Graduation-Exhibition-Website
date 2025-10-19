export function initializeModalMenu() {
    console.log("嘗試初始化 ModalMenu..."); // 日誌 1

    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const modal = document.getElementById('fullscreen-menu-modal');

    // 檢查元素是否存在，並提供詳細的錯誤回報
    if (!openBtn) {
        console.error("初始化失敗：找不到 ID 為 'open-menu-btn' 的按鈕！");
        return;
    }
    if (!closeBtn) {
        console.error("初始化失敗：找不到 ID 為 'close-menu-btn' 的按鈕！");
        return;
    }
    if (!modal) {
        console.error("初始化失敗：找不到 ID 為 'fullscreen-menu-modal' 的容器！");
        return;
    }

    console.log("所有 ModalMenu 元素已找到，正在綁定事件..."); // 日誌 2

    openBtn.addEventListener('click', (event) => {
        event.preventDefault(); 
        console.log("開啟按鈕被點擊！"); // 日誌 3
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        console.log("關閉按鈕被點擊！"); // 日誌 4
        modal.classList.remove('active');
    });

    console.log("ModalMenu 事件已成功綁定！"); // 日誌 5
}