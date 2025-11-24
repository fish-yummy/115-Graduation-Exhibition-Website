

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


gsap.fromTo(".scrollDown", 
  { 
   y: 0,       // 移動 200px
  // duration: 1,  // 持續 2 秒
  // repeat: -1,
  // yoyo: true,
  opacity: 1, 
  // ease: "power1.inOut"
  },
  {
     y: 7,       // 移動 200px
     opacity: 0,
    duration: 0.5,  // 持續 2 秒
    repeat: -1,
    yoyo: true,    
    repeatDelay: 0.7,
    ease: "power1.inOut"
  }
);



const svg = document.querySelector(".svgBack");

svg.addEventListener("mouseenter", () => {
  gsap.to(svg, { scale: 1.1, duration: 0.2, transformOrigin: "50% 50%",ease: "power1.inOut" });
});

svg.addEventListener("mouseleave", () => {
  gsap.to(svg, { scale: 1, duration: 0.2, transformOrigin: "50% 50%",ease: "power1.inOut" });
});

