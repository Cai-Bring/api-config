/**加载效果 */
export function spin(show: boolean, domId = "#global-spin") {
  const dom = document.querySelector(domId) as HTMLElement;
  if (dom) {
    dom.style.display = show ? "block" : "none";
  }
}
