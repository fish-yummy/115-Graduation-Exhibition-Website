// document.querySelectorAll('.sb-button').forEach(img => {
//   img.addEventListener('click', () => {
//     const clickedSrc = img.dataset.alt;

//   
//     document.querySelectorAll('.sb-button').forEach(otherImg => {
//       const originalSrc = otherImg.dataset.original || 'Image/scrollBar/circle.png';
//       otherImg.setAttribute('src', originalSrc);
//     });

//     
//     img.setAttribute('src', clickedSrc);
//   });
// });

///////////////////////

console.log("載入scrollBar.js ");

document.addEventListener("DOMContentLoaded", () => {
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
});
