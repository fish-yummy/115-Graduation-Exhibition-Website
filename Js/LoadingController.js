class LoadingController {
    constructor() {
        this.progress = 0;
        this.progressFill = document.getElementById("progressFill");
        this.progressText = document.getElementById("progressText");
        this.progressStatus = document.getElementById("progressStatus");
        this.loadingContainer = document.getElementById("loadingContainer");
        this.loadingAnimation = document.getElementById("loadingAnimation");
        this.fallbackAnimation = document.getElementById("fallbackAnimation");
        
        this.randomTexts = [
            "我們正在為您準備最佳的瀏覽體驗，請稍候片刻。",
            "正在載入精彩內容，感謝您的耐心等待。",
            "系統正在優化中，即將為您呈現完美體驗。",
            "載入中...好東西值得等待！",
            "正在連接到最新資訊，請稍等一下。",
            "我們正在準備驚喜內容給您。",
            "載入進行中，馬上就好了！",
            "正在為您客製化最佳體驗。",
            "系統正在處理您的請求，請稍候。",
            "即將完成載入，感謝您的等待。"
        ];
        
        this.loadingSteps = [
            { progress: 10, status: "正在載入資源..." },
            { progress: 25, status: "正在連接伺服器..." },
            { progress: 40, status: "正在載入內容..." },
            { progress: 60, status: "正在處理數據..." },
            { progress: 80, status: "正在優化體驗..." },
            { progress: 95, status: "即將完成..." },
            { progress: 100, status: "載入完成！" }
        ];
        
        this.currentStep = 0;
        this.loadingInterval = null;
        this.imagesLoaded = false;
        
        this.init();
    }
    
    init() {
        this.setRandomText();
    }
    
    setRandomText() {
        const randomIndex = Math.floor(Math.random() * this.randomTexts.length);
        const selectedText = this.randomTexts[randomIndex];
        const descriptionElement = document.getElementById("randomDescription");
        if (descriptionElement) {
            descriptionElement.textContent = selectedText;
        }
    }
    
    preloadImages() {
        const imageUrls = [
            "images/loading動畫_1.png",
            "images/loading動畫_2.png",
            "images/loading動畫_3.png",
            "images/loading動畫_4.png",
            "images/loading動畫_5.png",
            "images/loading動畫_6.png",
            "images/loading動畫_7.png",
            "images/loading動畫_8.png",
            "images/loading動畫_9.png",
            "images/loading動畫_10.png",
            "images/loading動畫_11.png",
            "images/loading動畫_12.png",
            "images/loading動畫_13.png",
            "images/loading動畫_14.png",
            "images/loading動畫_15.png",
            "images/loading動畫_16.png",
            "images/loading動畫_17.png"
        ];
        // ▲▲▲ 修改結束 ▲▲▲
        
        let loadedCount = 0;
        const totalImages = imageUrls.length;
        
        imageUrls.forEach((url, index) => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.onAllImagesLoaded();
                }
            };
            img.onerror = () => {
                console.error(`圖片 ${url} 載入失敗`);
                loadedCount++;
                if (loadedCount === totalImages) {
                    this.onImageLoadError();
                }
            };
            img.src = url;
        });
    }

    updateProgress(targetProgress, status) {
        const currentProgress = this.progress;
        const progressDiff = targetProgress - currentProgress;
        const animationDuration = 800;
        const steps = 40;
        const stepSize = progressDiff / steps;
        const stepInterval = animationDuration / steps;
        
        let stepCount = 0;
        const progressInterval = setInterval(() => {
            if (stepCount < steps) {
                this.progress += stepSize;
                this.progressFill.style.width = `${this.progress}%`;
                this.progressText.textContent = `載入中... ${Math.round(this.progress)}%`;
                stepCount++;
            } else {
                clearInterval(progressInterval);
                this.progress = targetProgress;
                this.progressFill.style.width = `${this.progress}%`;
                this.progressText.textContent = `載入中... ${this.progress}%`;
                this.progressStatus.textContent = status;
            }
        }, stepInterval);
    }
    
    start() {
        return new Promise((resolve) => {
            this.resolvePromise = resolve; 
            this.preloadImages(); 
        });
    }
    
    onAllImagesLoaded() {
        this.imagesLoaded = true;
        this.loadingAnimation.classList.add("animated");
        this.startLoadingProcess();
    }

    onImageLoadError() {
        console.log("部分圖片載入失敗，使用備用動畫");
        this.fallbackAnimation.style.display = "block";
        this.startLoadingProcess();
    }

    startLoadingProcess() {
        this.loadingInterval = setInterval(() => {
            if (this.currentStep < this.loadingSteps.length) {
                const step = this.loadingSteps[this.currentStep];
                this.updateProgress(step.progress, step.status);
                this.currentStep++;
            } else {
                this.completeLoading();
            }
        }, 1200);
    }

    completeLoading() {
        clearInterval(this.loadingInterval);
        setTimeout(() => {
            this.progressText.textContent = "載入完成！";
            this.progressStatus.textContent = "正在跳轉...";
            setTimeout(() => {
                this.loadingContainer.classList.add("loading-complete");
                setTimeout(() => {
                    if (this.resolvePromise) {
                        this.resolvePromise();
                    }
                }, 500);
            }, 1000);
        }, 500);
    }
}

export default LoadingController;
