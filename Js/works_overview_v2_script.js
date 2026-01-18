// Js/works_overview_v2_script.js (最終佈局修正版)

/**
 * 這個腳本專門處理 JS 驅動滾動佈局下的響應式重疊和間距問題。
 * 它會找到「作品總覽」區塊，並重新計算其後續所有兄弟區塊的正確垂直位置。
 */

function adjustFollowingSectionsLayout() {
    // 1. 找到所有 section 區塊
    const allSections = document.querySelectorAll('section.content');
    const sectionsArray = Array.from(allSections);

    // 2. 找到「作品總覽」區塊在所有 section 中的索引位置
    const worksSectionWrapper = document.querySelector('.works_overview_v2_component_wrapper');
    if (!worksSectionWrapper) return;
    
    const worksSection = worksSectionWrapper.closest('section.content');
    if (!worksSection) return;

    const worksSectionIndex = sectionsArray.findIndex(section => section === worksSection);

    // 如果找不到或它是最後一個區塊，就無需修正
    if (worksSectionIndex === -1 || worksSectionIndex === sectionsArray.length - 1) {
        return;
    }

    // 3. 從「作品總覽」區塊開始，重新計算後續所有區塊的 top 位置
    // 初始的偏移量 = 「作品總覽」的起始 top + 它的實際高度
    let currentOffsetTop = worksSection.offsetTop + worksSection.offsetHeight;
    
    // 您可以在這裡定義一個額外的間距 (單位：像素)
    const desiredGap = 0; // <<-- 在這裡調整您想要的間距，例如 50

    for (let i = worksSectionIndex + 1; i < sectionsArray.length; i++) {
        const currentSection = sectionsArray[i];

        // 為第一個後續區塊加上額外間距
        if (i === worksSectionIndex + 1) {
            currentOffsetTop += desiredGap;
        }

        // 核心：將當前 section 的 top 強制設定為我們計算出的正確值
        currentSection.style.top = `${currentOffsetTop}px`;
        
        console.log(`已將 ${currentSection.id} 的 top 修正為: ${currentOffsetTop}px`);

        // 累加上當前 section 的高度，為下一個 section 做準備
        currentOffsetTop += currentSection.offsetHeight;
    }

    // 最後，更新總容器的高度，確保滾動條正確
    const scrollContainer = document.querySelector('.section-scroll-container');
    if (scrollContainer) {
        scrollContainer.style.height = `${currentOffsetTop}px`;
    }
}


// --- 執行與監聽 ---

// 我們需要確保這個修正腳本在您團隊的主腳本之後執行
// 使用 setTimeout(..., 0) 是一個技巧，可以將執行推遲到下一個事件循環
function runAdjustment() {
    setTimeout(adjustFollowingSectionsLayout, 100);
}

// 頁面載入和視窗縮放時都執行修正
window.addEventListener('load', runAdjustment);
window.addEventListener('resize', runAdjustment);

console.log("Works Overview layout final adjustment script loaded.");