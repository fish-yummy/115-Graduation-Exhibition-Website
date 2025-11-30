import * as Scrollbar from "./Scrollbar.js";
import { initializeMenu } from './menu.js';
import { initializeNavigation } from './navigation.js';
// ▼▼▼ 假設您的粒子設定檔名現在是 'particle-config.js' ▼▼▼
import particleConfig from './particle-config.js'; 
import { initializeModalMenu } from './modal-menu.js';
// import { img } from './MainPage1Verb.js';
// import * as MainPage1Verb from "./MainPage1Verb.js";



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