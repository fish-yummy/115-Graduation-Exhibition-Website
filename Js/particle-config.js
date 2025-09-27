const particleConfig = {
  //background: {
    //color: {
      //value: "#ffffff", // 背景顏色，建議與您 Main.css 的 body 背景色一致
    //},
  //},
  fpsLimit: 60, // 限制最大幀率，優化性能
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse", // 滑鼠懸停時，粒子會散開
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100, // 散開的距離
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#aaaaaa", // 粒子的顏色
    },
    links: {
      color: "#bbbbbb", // 連接線的顏色
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce", // 粒子碰到邊緣時會反彈
      },
      random: false,
      speed: 2, // 移動速度
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80, // 粒子的數量
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle", // 粒子形狀
    },
    size: {
      value: { min: 1, max: 5 }, // 粒子大小
    },
  },
  detectRetina: true,
};

// 將設定檔匯出，以便 Main.js 可以引用
export default particleConfig;