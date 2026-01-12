export function ScrollbarImageChange() {
    console.log(`觸發 Scrollbar圖片切換`);

    const sections = document.querySelectorAll("section");
    const headerHeight = 65; // 根據你的 CSS header 高度

    // 取得所有 sb-button img
    const sbImages = document.querySelectorAll(".sb-button");

    // IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute("id");

            // 找到對應的 img
            const img = document.querySelector(`a[href="#${sectionId}"] img.sb-button`);
            if (!img) return; // 安全檢查

            if (entry.isIntersecting) {
                // 切換到 data-alt，如果沒有就保留原本 src
                if (img.dataset.alt) {
                    img.src = img.dataset.alt;
                    console.log(`進入 ${sectionId}，切換到 data-alt`);
                }
            } else {
                // 離開 section，切換回 data-original
                if (img.dataset.original) {
                    img.src = img.dataset.original;
                    console.log(`離開 ${sectionId}，切換回 data-original`);
                }
            }
        });
    }, {
        root: null,
        rootMargin: `-${headerHeight}px 0px 0px 0px`, // 補償 header
        threshold: [ 0.25, 0.5, 0.75, 1]// 你原本的 threshold
    });

    // 監測每個 section
    sections.forEach(section => observer.observe(section));
}




// export function GotoTopButtonFunction(){
//     const section1 = document.getElementById("section1");
//     const img = document.querySelector(`a.a-toTOp-button img`);
//     if (!section1 || !img) return;

//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 img.style.display = "none"; 
//                 console.log(`進入 section1`);
//             } else {
//                 img.style.display = "block";
//                 console.log(`離開 section1`);
//             }
//         });
//     }, { threshold: 0.6 });

//     observer.observe(section1);
// }

// export function GotoTopButtonFunctionAtPhone(){
//     var img = document.querySelector('.toTOp-button'); // 選取圖片元素
//         if (window.scrollY > 100) { // 當頁面滾動超過100px
//             img.style.display = 'block'; // 隱藏圖片
//         } else {
//             img.style.display = 'none'; // 滾動回頂部時顯示圖片
//         }
// }
//////////////////////////////////////////////////////////
export function GotoTopButtonFunction() {
    // 1. 選取按鈕與目標區塊
    const toTopBtn = document.querySelector('.a-toTOp-button');
    const section1 = document.getElementById("section1");

    // 安全檢查：如果沒抓到元素就停止
    if (!toTopBtn || !section1) {
        console.warn("找不到 .a-toTOp-button 或 #section1，回到頂端功能無法啟動");
        return;
    }

    // 2. 設定觀察器 (IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // entry.isIntersecting 代表 "Section 1" 是否還在畫面上
            if (entry.isIntersecting) {
                // 如果看得到 Section 1 (代表在頂端) -> 隱藏按鈕
                toTopBtn.classList.remove('show');
                // console.log("在頂端：隱藏按鈕");
            } else {
                // 如果看不到 Section 1 (代表已經往下滑了) -> 顯示按鈕
                toTopBtn.classList.add('show');
                // console.log("下滑中：顯示按鈕");
            }
        });
    }, {
        root: null, // 觀察視窗 viewport
        threshold: 0.1 // 當 section1 剩下不到 10% 在畫面中時，視為離開，比較靈敏
    });

    // 3. 開始觀察 Section 1
    observer.observe(section1);
}
///////////////////////////////////////////////////////////
// export function GotoTopButtonFunction() {
//     // 1. 選取按鈕
//     const toTopBtn = document.querySelector('.a-toTOp-button');

//     if (!toTopBtn) {
//         console.warn("找不到 .a-toTOp-button，請檢查 HTML class 名稱");
//         return;
//     }

//     // 2. 定義核心判斷邏輯
//     const handleScroll = (e) => {
//         let currentScroll = 0;

//         // 【第一層檢查】如果是視窗級別的滾動 (最常見)
//         // 為了相容所有瀏覽器，我們取這三個值的最大值，誰有值就用誰
//         const windowScroll = Math.max(
//             window.scrollY, 
//             document.documentElement.scrollTop, 
//             document.body.scrollTop
//         );

//         // 【第二層檢查】如果是元素級別的滾動 (例如被 overflow: auto 的 div)
//         // e.target 是指「目前正在滾動的那個東西」
//         let elementScroll = 0;
//         if (e && e.target && e.target.scrollTop) {
//             elementScroll = e.target.scrollTop;
//         }

//         // 取兩者之中最大的那個，就是目前真正的滾動距離
//         currentScroll = Math.max(windowScroll, elementScroll);

//         // console.log("目前滾動距離:", currentScroll); // 除錯用，確認數值有沒有在跑

//         // 3. 顯示/隱藏邏輯 (門檻設為 100px)
//         if (currentScroll > 100) {
//             toTopBtn.classList.add('show');
//         } else {
//             toTopBtn.classList.remove('show');
//         }
//     };

//     // 4. 【關鍵修改】使用 Capture 模式 (第三個參數設為 true)
//     // 這代表「不論是誰在滾動，我都要搶先知道」
//     window.addEventListener('scroll', handleScroll, true);

//     // 5. 處理點擊「回到頂端」的功能
//     toTopBtn.onclick = (e) => {
//         e.preventDefault(); // 阻止預設的 href 跳轉

//         // 因為有 scroll-snap，直接對 window 滾動通常最穩
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         });

//         // 雙重保險：如果 window 滾不動，嘗試滾動 html 和 body
//         document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
//         document.body.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     // 初始化執行一次，避免剛重新整理時按鈕狀態不對
//     handleScroll(); 
// }