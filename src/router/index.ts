import { createRouter, createWebHistory } from "vue-router";
import store from "@/vuex/store";
import HomePage from "../pages/HomePage.vue";
import NewPage from "../pages/NewPaper.vue";
import CreatePaper from "../pages/CreatePaper.vue";
import DetailPage from "../pages/DetailPage.vue";
import axios from "axios";
const routerHistory = createWebHistory();
export const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },
    {
      path: "/newpaper/:id",
      name: "NewPage",
      component: NewPage,
    },
    {
      path: "/createpaper",
      name: "CreatePaper",
      meta: { requiredLogin: true },
      component: CreatePaper,
    },
    {
      path: "/DetailPage/:postId",
      name: "DetailPaper",

      component: DetailPage,
    },
  ],
});
//路由守卫
router.beforeEach((to, from, next) => {
  console.log("路由里：有守卫");
  const { user, token } = store.state;
  const { requiredLogin } = to.meta;

  if (!user.isLogin) {
    if (token) {
      console.log("路由里：有token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      store
        .dispatch("fetchCurrentUser")
        .then(() => {
          next();
        })
        .catch((e) => {
          // localStorage.removeItem("token");
          console.error(e);
          next("/");
        });
    } else {
      console.log("路由里：无token");
      if (requiredLogin) {
        //未来去login页面，目前没做
        next("/");
      }else{
        next()
      }
    }
  } else {
    //已登录就直接去
    next();
  }
});
