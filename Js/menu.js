// Js/menu.js (帶有懸停意圖的最終版)

export function initializeMenu() {
    // 選取所有需要的元素
    const menuContainer = document.getElementById('menu-app-container'); // 總容器
    const triggerArea = document.querySelector('.menu-trigger-center'); // 中央 GIF 的觸發區域
    const triggerGif = document.getElementById('center-trigger-gif');    // GIF 圖片本身
    const cardsWrapper = document.querySelector('.menu-cards-wrapper'); // 所有卡片的包裹容器
    
    // 如果在其他頁面找不到元素，就靜默返回
    if (!menuContainer || !triggerArea || !triggerGif || !cardsWrapper) {
        return;
    }

    const openingGif = triggerGif.dataset.openingGif;
    const closingGif = triggerGif.dataset.closingGif;
    
    // 關鍵：用於延遲關閉的計時器變數
    let closeTimer = null;

    // --- 定義開啟和關閉的動畫序列 ---

    const openSequence = () => {
        // 播放「開啟」動畫
        triggerGif.src = `${openingGif}?t=${new Date().getTime()}`;
        // 觸發展開卡片和 GIF 上移
        menuContainer.classList.add('is-active');
        // 延遲觸發背景變暗
        setTimeout(() => {
            menuContainer.classList.add('backdrop-active');
        }, 200);
    };

    const closeSequence = () => {
        // 播放「關閉」動畫
        triggerGif.src = `${closingGif}?t=${new Date().getTime()}`;
        // 讓背景先開始變亮
        menuContainer.classList.remove('backdrop-active');
        // 延遲觸發卡片收合和 GIF 歸位
        setTimeout(() => {
            menuContainer.classList.remove('is-active');
        }, 200);
    };

    // --- 綁定事件監聽器 ---

    // 1. 當滑鼠移入【中央 GIF 區域】時
    triggerArea.addEventListener('mouseenter', () => {
        // 清除任何可能存在的關閉計時器
        clearTimeout(closeTimer);
        // 執行開啟動畫
        openSequence();
    });

    // 2. 當滑鼠移出【中央 GIF 區域】時
    triggerArea.addEventListener('mouseleave', () => {
        // 啟動一個延遲 300 毫秒的關閉計時器
        closeTimer = setTimeout(closeSequence, 300);
    });
    
    // 3. 當滑鼠移入【卡片區域】時
    cardsWrapper.addEventListener('mouseenter', () => {
        // 清除關閉計時器，防止選單在移動過程中關閉
        clearTimeout(closeTimer);
    });

    // 4. 當滑鼠移出【卡片區域】時
    cardsWrapper.addEventListener('mouseleave', () => {
        // 同樣啟動一個延遲關閉的計時器
        closeTimer = setTimeout(closeSequence, 300);
    });
}