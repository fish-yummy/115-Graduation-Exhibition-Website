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




export function GotoTopButtonFunction(){
    const section1 = document.getElementById("section1");
    const img = document.querySelector(`a.a-toTOp-button img`);
    if (!section1 || !img) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                img.style.display = "none"; 
                console.log(`進入 section1`);
            } else {
                img.style.display = "block";
                console.log(`離開 section1`);
            }
        });
    }, { threshold: 0.6 });

    observer.observe(section1);
}