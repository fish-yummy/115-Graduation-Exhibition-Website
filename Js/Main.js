import * as Scrollbar from "./Scrollbar.js";
import { initializeMenu } from './menu.js';
import { initializeNavigation } from './navigation.js';
// ▼▼▼ 假設您的粒子設定檔名現在是 'particle-config.js' ▼▼▼
import particleConfig from './particle-config.js'; 
import { initializeModalMenu } from './modal-menu.js';
import { img } from './MainPage1Verb.js';
import * as MainPage1Verb from "./MainPage1Verb.js";



const mediaQuery = window.matchMedia("(max-width: 768px)");

if (!mediaQuery.matches) {
  // 這段 JS 只會在電腦上執行
    Scrollbar.GotoTopButtonFunction();
  // 可以載入 desktop.js 或執行特定邏輯
} else {
  document.addEventListener('scroll', Scrollbar.GotoTopButtonFunctionAtPhone);
  // 在手機上不執行桌面端的 JS
}

let introAudioPlayer;
function onYouTubeIframeAPIReady() {
  introAudioPlayer = new YT.Player('introAudio', { // iframe 的 id
    videoId: 'I2JBBH-ngHI', // YouTube 影片 ID
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
    console.log("影片準備好了");
}


//class="svgBack" 滑鼠點擊關閉 class="audioPage"
MainPage1Verb.svgTrigger.addEventListener("click", () => {
  
  gsap.to(MainPage1Verb.audioPageTrigger, {
    scale: 0.9,    
    opacity: 0,   
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      MainPage1Verb.audioPageTrigger.style.display = "none";


       if(introAudioPlayer && typeof introAudioPlayer.pauseVideo === "function"){
        introAudioPlayer.pauseVideo();  // 安全呼叫
      } else {
        console.warn("introAudioPlayer 尚未準備好");
      }
      
      MainPage1Verb.audioPageTrigger.style.transform = "scale(1)"; // 恢復 scale 為1，方便下一次顯示
    }
  });

 
  
});

//class="audioImage" 滑鼠點擊開啟 class="audioPage"
img.addEventListener("click", () => {
  MainPage1Verb.audioPageTrigger.style.display = "block";

  gsap.fromTo(
      MainPage1Verb.audioPageTrigger,
      { scale: 0.9, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
  );

});

//class="audioImage" 滑鼠hover
img.addEventListener("mouseover", () => {
  img.src = "../Image/MainPage1/播放2.png";   
  // gsap.fromTo(
  //     img,
  //     { opacity: 0 },
  //     { opacity: 1, duration: 0.5, ease: "power2.out" }
  // );
});
img.addEventListener("mouseout", () => {
  
  img.src = "../Image/MainPage1/播放1.png"; 
  //   gsap.to(img, {  
  //   opacity: 0,   
  //   duration: 0.5,
  //   ease: "power2.in",
  //   onComplete: () => {
  //     img.style.opacity = "1";
  //   }
  // });
});




// 2. 在 DOMContentLoaded 事件中，安全地啟動所有功能
document.addEventListener('DOMContentLoaded', () => {
    try {
        // 依序啟動所有功能
        initializeModalMenu();
        
        // Banner 功能由 HTML 中的 <script> 處理，此處不再需要呼叫
        
        Scrollbar.ScrollbarImageChange();
        // Scrollbar.GotoTopButtonFunction();
        
        // 現在這個函式將有機會被執行
        initializeMenu(); 
        
        initializeNavigation();
        
        if (window.tsParticles) {
            tsParticles.load('tsparticles', particleConfig);
        }

        console.log("所有腳本已成功初始化！");

    } catch (error) {
        console.error("在初始化腳本時發生錯誤:", error);
    }
})