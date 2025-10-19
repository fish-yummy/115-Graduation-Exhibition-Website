// Js/menu.js (兩階段模態 + 內部懸停最終版)

export function initializeMenu() {
    // --- 相關元素 ---
    const modal = document.getElementById('fullscreen-menu-modal');
    const stage1 = document.getElementById('menu-stage-1');
    const stage2 = document.getElementById('menu-stage-2');
    
    // 抽屜自身的觸發器 (左側的 GIF)
    const drawerTrigger = document.getElementById('vertical-trigger-gif');
    const menuContainer = document.getElementById('menu-app-container');

    // 如果找不到任何一個關鍵元素，就停止
    if (!modal || !stage1 || !stage2 || !drawerTrigger || !menuContainer) {
        return; 
    }

    // --- 核心邏輯：懸停切換階段 ---
    let switchTimer = null; // 用於延遲切換的計時器

    // 1. 當滑鼠移入【階段一 (初始GIF)】時
    stage1.addEventListener('mouseenter', () => {
        // 清除任何可能存在的關閉計時器
        clearTimeout(switchTimer);
        // 立即切換到階段二
        modal.classList.add('stage-2-active');
    });

    // 2. 當滑鼠移出【階段二 (抽屜畫面)】時
    stage2.addEventListener('mouseleave', () => {
        // 啟動一個延遲 300 毫秒的關閉計時器
        switchTimer = setTimeout(() => {
            modal.classList.remove('stage-2-active');
        }, 300);
    });

    // 3. 當滑鼠重新移入【階段二】時 (防止在邊緣移動時意外關閉)
    stage2.addEventListener('mouseenter', () => {
        clearTimeout(switchTimer);
    });


    // --- 抽屜自身的開關邏輯 (保持不變) ---
    const openingGif = drawerTrigger.dataset.openingGif;
    const closingGif = drawerTrigger.dataset.closingGif;
    let areDrawersOpen = false;

    drawerTrigger.addEventListener('click', () => {
        menuContainer.classList.toggle('active');
        areDrawersOpen = !areDrawersOpen;

        if (areDrawersOpen) {
            drawerTrigger.src = `${openingGif}?t=${new Date().getTime()}`;
        } else {
            drawerTrigger.src = `${closingGif}?t=${new Date().getTime()}`;
        }
    });

    // --- 模態關閉時的重置邏輯 (保持不變) ---
    const closeBtn = document.getElementById('close-menu-btn');
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            setTimeout(() => {
                modal.classList.remove('stage-2-active');
                menuContainer.classList.remove('active');
                if(closingGif) drawerTrigger.src = closingGif;
                areDrawersOpen = false;
            }, 500);
        });
    }
}