

gsap.to(".BackgroundPenMouse", { 
   y: -20,       // 移動 200px
  duration: 1,  // 持續 2 秒
  repeat: -1,
  yoyo: true,
  stagger: 0.3,   
  ease: "power1.inOut"
});

gsap.to(".BackgroundPenMouse.mouse", { 
   y: -40,       // 移動 200px
  duration: 1,  // 持續 2 秒
  repeat: -1,
  yoyo: true,
  stagger: 0.3,   
  ease: "power1.inOut"
});



const svg = document.querySelector(".svgBack");

svg.addEventListener("mouseenter", () => {
  gsap.to(svg, { scale: 1.1, duration: 0.2, transformOrigin: "50% 50%",ease: "power1.inOut" });
});

svg.addEventListener("mouseleave", () => {
  gsap.to(svg, { scale: 1, duration: 0.2, transformOrigin: "50% 50%",ease: "power1.inOut" });
});

