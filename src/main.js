/**
 * 主文件
 */
import "./codespace/codespace.less";
import "./toolbox/toolbox.less";
import "./workspace/workspace.less";
import "./theme/theme.less";
import "./search/search.less";
import "./trashcan/trashcan.less";
import "./zoomBox/zoomBox.less";
import "./theme/codemao.theme";
import "./theme/codemao.renderer";
import "./icon/category/category";
import "./toolbox/toolbox";
import "./blocks/boxy";
import "./blocks/patch";
import "@arco-design/web-vue/dist/arco.css";
import "@blockly/block-plus-minus";
import "./dialog/dialog.vue";
import "highlight.js/styles/atom-one-dark.css";
import "highlight.js/lib/common";
import "@arco-themes/vue-boxy/index.less";

import ArcoVue from "@arco-design/web-vue";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import { registerSW } from "virtual:pwa-register";
import { createApp } from "vue";

import App from "./App.vue";
import trashcan from "./trashcan/trashcan";
import observer from "./utils/observer";

const app = createApp(App);
app.use(ArcoVue);
app.use(hljsVuePlugin);
app.mount("#app");

/**
 * 设置Flyout鼠标移入事件
 */
document.querySelector(".blocklyFlyout").addEventListener("mouseenter", function () {
  if (this.getBoundingClientRect().width < this.getAttribute("width")) {
    this.style.width = this.getAttribute("width");
  }
});
/**
 * 设置Flyout鼠标移出事件
 */
document.querySelector(".blocklyFlyout").addEventListener("mouseleave", function () {
  this.style.width = localStorage.getItem("block_all_shown") ? "" : "320px";
});
/**
 * 监听Flyout属性变化
 */
observer("#boxy > .blocklyDiv > div > svg.blocklyFlyout", ["style", "width"], function (element) {
  if (element.style.display === "block") {
    element.style.transform = "translate(60px,0px)";
  } else {
    element.style.transform = `translate(${
      -(localStorage.getItem("block_all_shown") ? element.getAttribute("width") || 320 : 320) + 60
    }px,0px)`;
  }
});
/**
 * 监听Toolbox属性变化
 */
observer("#boxy > .blocklyDiv > div >  div.blocklyToolboxDiv.blocklyNonSelectable", ["class"], function (element) {
  if (element.classList.contains("blocklyToolboxDelete")) {
    trashcan.coverOn();
  } else {
    trashcan.coverOff();
  }
});

if ("serviceWorker" in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}
