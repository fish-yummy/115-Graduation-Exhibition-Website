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

// gsap.to(".scrollDown", { 
//   y: 5,       // 移動 200px
//   duration: 0.3,  // 持續 2 秒
//   repeat: -1,
//   yoyo: true,
//   stagger: 0.3,   
// //    scale: 1.08,
//   ease: "steps(12)"
// });