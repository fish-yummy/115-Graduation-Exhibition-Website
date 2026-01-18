import { img } from './MainPage1Verb.js';
import * as MainPage1Verb from "./MainPage1Verb.js";

//class="svgBack" 滑鼠點擊關閉 class="audioPage"
MainPage1Verb.svgTrigger.addEventListener("click", () => {
  
  gsap.to(MainPage1Verb.audioPageTrigger, {
    scale: 0.9,    
    opacity: 0,   
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      MainPage1Verb.audioPageTrigger.style.display = "none";
      MainPage1Verb.enableScroll();
      console.log("啟用滾動");

       if(introAudioPlayer && typeof introAudioPlayer.pauseVideo === "function"){
        introAudioPlayer.pauseVideo();  // 安全呼叫
      } else {
        console.warn("introAudioPlayer 尚未準備好");
      }

      MainPage1Verb.audioPageTrigger.style.transform = "scale(1)"; // 恢復 scale 為1，方便下一次顯示
    }
  });

 
  
});

//class="audioImage" 點擊開啟 class="audioPage"
img.addEventListener("click", () => {
  MainPage1Verb.audioPageTrigger.style.display = "block";

 
     MainPage1Verb.disableScroll();
     console.log("禁用滾動");
  

  gsap.fromTo(
      MainPage1Verb.audioPageTrigger,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
  );

});

//class="audioImage" 滑鼠hover
img.addEventListener("mouseover", () => {
  img.src = "../Image/MainPage1/播放2.png";   

});
img.addEventListener("mouseout", () => {
  
  img.src = "../Image/MainPage1/播放1.png"; 
  
});
