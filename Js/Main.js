//將所有的 import 語句都放在檔案的最頂部
import * as Scrollbar from "./Scrollbar.js";
import { initializeMenu } from './menu.js';
import { initializeNavigation } from './navigation.js';

//只用一個 DOMContentLoaded 事件監聽器
document.addEventListener('DOMContentLoaded', () => {
    
   
    Scrollbar.ScrollbarImageChange();
    Scrollbar.GotoTopButtonFunction();
    
    // 啟動「點擊選項，彈出選單」的功能
    initializeMenu();
    
    // 啟動「點擊選單內的連結，顯示 Loading 畫面並跳轉」的功能
    initializeNavigation();
});