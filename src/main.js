import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/styles/index.scss";
import 'lib-flexible'

import ElementPlus from "element-plus";
import 'element-plus/theme-chalk/index.css'

const app = createApp(App);

app.use(ElementPlus).use(router).use(store).mount("#app");
