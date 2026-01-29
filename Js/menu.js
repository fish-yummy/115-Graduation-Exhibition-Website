// Js/menu.js (滑動動畫版)

// --- 作品資料 ---
const projectsData = {
    games: [
        { id: 1, title: "試釋就適識", desc: "提升媒體識讀之學習型遊戲", img: "image/作品縮圖/Project1.webp" },
        { id: 2, title: "移民模擬", desc: "體驗移民者的艱辛旅程", img: "image/作品縮圖/Project2.webp" },
        { id: 11, title: "孤故 Good Story", desc: "社會情緒學習敘事冒險", img: "image/作品縮圖/Project11.webp" },
        { id: 5, title: "Euvuvu", desc: "鄒族文化劇情冒險遊戲", img: "image/作品縮圖/Project5.webp" },
        { id: 8, title: "賭薄人生", desc: "沉浸式第一人稱體驗", img: "image/作品縮圖/Project8.webp" },
        { id: 3, title: "化學方程式", desc: "實驗室逃脫解謎遊戲", img: "image/作品縮圖/Project3.webp" },
    ],
    narrative: [
        { id: 4, title: "蚵計產業", desc: "嘉義沿海蚵農電子書", img: "image/作品縮圖/Project4.webp" },
        { id: 6, title: "SAVIOR", desc: "探討霸凌的選擇遊戲", img: "image/作品縮圖/Project6.webp" },
        { id: 9, title: "防詐聖經", desc: "漫畫＋桌遊防詐教育", img: "image/作品縮圖/Project9.webp" },
        { id: 10, title: "牽線之外", desc: "高中生情感教育遊戲", img: "image/作品縮圖/Project10.webp" }
    ],
    system: [
        { id: 7, title: "礦石奇旅", desc: "寶石挖掘與交易策略遊戲", img: "image/作品縮圖/Project7.webp" },
        { id: 12, title: "Loud工進行式", desc: "勞動權益數位學習平台", img: "image/作品縮圖/Project12.webp" },
        { id: 13, title: "Arduino物理實驗", desc: "互動式物理實驗教學系統", img: "image/作品縮圖/Project13.webp" },
        { id: 14, title: "濕地導覽系統", desc: "建構以視覺化為核心之濕地導覽", img: "image/作品縮圖/Project14.webp" }
    ]
};

// --- 初始化函式 ---
export function initializeMenu() {
    const modal = document.getElementById('fullscreen-menu-modal');
    const openBtn = document.getElementById('open-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const appListContainer = document.getElementById('app-list-container');
    
    // 獲取手機外框和內容容器，用於動畫控制
    const phoneFrame = document.querySelector('.phone-frame');
    const phoneScreen = document.querySelector('.phone-screen-container');

    if (!modal || !openBtn) return;

    // 預設顯示第一類
    renderProjects('games', appListContainer);

    // 事件監聽：開啟選單
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        // 開啟時不需要特別觸發動畫，CSS transition 會處理第一次滑入
    });

    // 事件監聽：關閉選單
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        // 關閉時移除動畫 class，確保下次開啟或切換時能重置
        if (phoneFrame) phoneFrame.classList.remove('slide-up-animation');
        if (phoneScreen) phoneScreen.classList.remove('slide-up-animation');
    });

    // 事件監聽：切換類別
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按鈕的 active 樣式
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;
            
            // --- 觸發手機滑入動畫 ---
            if (phoneFrame && phoneScreen) {
                // 1. 移除 class 以重置動畫
                phoneFrame.classList.remove('slide-up-animation');
                phoneScreen.classList.remove('slide-up-animation');
                
                // 2. 強制瀏覽器重繪 (Reflow) - 這是關鍵！
                void phoneFrame.offsetWidth; 
                
                // 3. 重新加入 class 以觸發動畫
                phoneFrame.classList.add('slide-up-animation');
                phoneScreen.classList.add('slide-up-animation');
            }

            // 延遲一點點渲染內容，讓動畫開始後再切換內容，視覺較自然
            setTimeout(() => {
                renderProjects(category, appListContainer);
            }, 100); // 100ms 延遲
        });
    });
}

// --- 渲染專案列表函式 ---
function renderProjects(category, container) {
    const projects = projectsData[category];
    container.innerHTML = '';

    projects.forEach(proj => {
        const card = document.createElement('a');
        // 連結到作品內頁，帶上 ID 參數
        card.href = `GroupPage.html?id=${proj.id}`; 
        card.className = 'app-card';
        card.innerHTML = `
            <img src="${proj.img}" alt="${proj.title}" class="app-icon" onerror="this.src='https://placehold.co/60x60?text=No+Img'">
            <div class="app-info">
                <div class="app-name">${proj.title}</div>
                <div class="app-desc">${proj.desc}</div>
            </div>
            <div class="play-btn">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
        `;
        container.appendChild(card);
    });
}