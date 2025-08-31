
export function ScrollbarImageChange() {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.getAttribute("id");
            const img = document.querySelector(`a[href="#${sectionId}"] img`);
            if (!img) return;

            if (entry.isIntersecting) {
                
                img.src = img.getAttribute("data-alt");
                console.log(`進入 ${sectionId}`);
            } else {
               
                img.src = img.getAttribute("data-original");
                console.log(`離開 ${sectionId}`);
            }
        });
    }, {
        threshold: 0.6 
    });

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