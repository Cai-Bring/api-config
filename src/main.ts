import { createApp } from "vue";
import App from "./App.vue";
import { createHttp } from "./shared/core/http";
// 初始化http
createHttp("", {
  apiPrefix: "", //api通用前缀
  useProxy: true, //是否启用代理
  timeout: 30000, //超时时间
  noToken: false, // 是否传token
  showSpin: true, // 是否呈现loading效果
});

createApp(App).mount("#app");
