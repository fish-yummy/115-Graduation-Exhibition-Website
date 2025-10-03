import * as Scrollbar from "./Scrollbar.js";
import { initializeMenu } from './menu.js';
import { initializeNavigation } from './navigation.js';
import particleConfig from './particle-config.js'; // 您的檔案名可能是 particle.js

// 只使用一個 DOMContentLoaded 事件監聽器
document.addEventListener('DOMContentLoaded', () => {
    
    // 啟動您原有的 Scrollbar 功能
    Scrollbar.ScrollbarImageChange();
    Scrollbar.GotoTopButtonFunction();
    
    // 啟動「點擊選項，彈出選單」的功能
    initializeMenu();
    
    // 啟動「點擊選單內的連結，顯示 Loading 畫面並跳轉」的功能
    initializeNavigation();

    // ▼▼▼ 新增安全檢查，並啟動粒子背景 ▼▼▼
    if (window.tsParticles) {
        tsParticles.load('tsparticles', particleConfig)
            .then(container => {
                console.log('tsParticles 容器已成功載入:', container);
            })
            .catch(error => {
                console.error('tsParticles 載入失敗:', error);
            });
    } else {
        console.error('tsParticles 函式庫未找到！請檢查 HTML 中的 <script> 標籤。');
    }

    console.log("所有腳本已成功初始化！");
});