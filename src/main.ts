import { createApp } from "vue";
import { router } from "./router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./vuex/store";

const app = createApp(App);
//配置elementUI
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import axios from "axios";
// 替换 baseURL
axios.defaults.baseURL = "http://apis.imooc.com/api/";
axios.interceptors.request.use((config) => {
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: "65B4E665588EE4EF" };
  store.commit("setLoading", true);
  // 其他请求，添加到 body 中
  // 如果是上传文件，添加到 FormData 中
  if (config.data instanceof FormData) {
    config.data.append("icode", "65B4E665588EE4EF");
  } else {
    // 普通的 body 对象，添加到 data 中
    config.data = { ...config.data, icode: "65B4E665588EE4EF" };
  }
  return config;
});
axios.interceptors.response.use(
  (config) => {
    store.commit("setLoading", false);
    return config;
  },
  (e) => {
    console.log("error:", e.response);
    const { error } = e.response.data;
    store.commit("setError", { status: true, message: error });
    store.commit("setLoading", false);
    return Promise.reject(error)
  }
);
export const axiosGet = (url: string) => {
  axios.get(`${url}`).then((res) => {
    console.log("res:", res);
    console.log("resdata:", res.data);
    return res.data;
  });
};

app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
