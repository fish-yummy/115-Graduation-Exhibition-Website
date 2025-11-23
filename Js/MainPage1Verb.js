export const img = document.getElementById("AudioUseImg");

export const svgTrigger = document.getElementById("svgBackTrigger");
export const audioPageTrigger = document.getElementById("audioPageTrigger");

export const introAudio = document.getElementById("introAudio");

export const PhoneQuery = window.matchMedia("(min-width: 1024px) and (max-height: 700px)");

// 禁止滑動 的函式
export function disableScroll() {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
}

//  恢復滑動 的函式
export function enableScroll() {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
}