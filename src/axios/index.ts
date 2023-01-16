import axios from "axios";
// 替换 baseURL
axios.defaults.baseURL = "http://apis.imooc.com/api/";
axios.interceptors.request.use((config) => {
  // get 请求，添加到 url 中
  config.params = { ...config.params, icode: "65B4E665588EE4EF" };
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
export const axiosGet = (url: string) => {
  axios.get(`${url}`).then((res) => {
    console.log("res:", res);
    console.log("resdata:", res.data);
    return res.data;
  });
};
