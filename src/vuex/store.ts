import { Commit, createStore } from "vuex";
import axios from "axios";
//定义后端返回的数据格式
export interface ResponseType<p = object> {
  code: number;
  msg: string;
  data: p;
}
export interface DetailData {
  author?: any;
  column?: string;
  content?: string;
  createdAt?: string;
  excerpt?: string;
  image?: { url: string; _id: string };
  title?: string;
  updatedAt?: string;
  _id?: string;
  _v?: number;
}
//疑问...action为什么加return
export interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}
export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}
export interface ColumnProps {
  _id: string;
  avatar: ImageProps;
  title: string;
  description: string; //“描述”
}
export interface PostProps {
  _id?: string;
  title: string;
  content?: string;
  excerpt?: string;
  image?: ImageProps | string;
  createdAt?: string;
  column: string;
  author?: string;
}
export interface GlobalErrorProps {
  //status:地位;状态;身份;
  status: boolean;
  message?: string;
}
export interface GlobalDataProps {
  error: GlobalErrorProps;
  colums: ColumnProps[];
  posts: PostProps[];
  detailPost: DetailData;
  user: UserProps;
  isLoading: boolean;
  token: string;
}
const getAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit
) => {
  const { data } = await axios.get(url);
  commit(mutationName, data);
  // 添加返回
  return data;
};
const PostAndCommit = async (
  url: string,
  mutationName: string,
  commit: Commit,
  payload: any
) => {
  const { data } = await axios.post(url, payload);
  commit(mutationName, data);
  return data;
};
const store = createStore<GlobalDataProps>({
  state: {
    error: { status: false },
    colums: [],
    posts: [],
    detailPost: {},
    user: { isLogin: false },
    isLoading: true,
    token: localStorage.getItem("token") || "",
  },
  mutations: {
    createPost(state, newPaper) {
      state.posts.push(newPaper);
    },
    fetchColumns(state, newDate) {
      state.colums = newDate;
    },
    fetchColumn(state, newDate) {
      state.colums = [newDate];
    },
    fetchPosts(state, newDate) {
      state.posts = newDate;
    },
    fetchDetailPosts(state, newDate) {
      state.detailPost = newDate;
    },
    setLoading(state, data) {
      state.isLoading = data;
    },
    setError(state, data: GlobalErrorProps) {
      state.error = data;
    },
    login(state, rawdata) {
      state.token = rawdata.data.token;
      //在localStorage中添加token字段
      localStorage.setItem("token", state.token);
      //为登录验证，在axios头部添加token字段
      axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
    },
    //具体登出逻辑有待完善，目前没有用到过这个logout的页面
    // logout(state) {
    //   state.token = "";
    //   localStorage.removeItem("token");
    //   delete axios.defaults.headers.common["Authorization"];
    // },
    fetchCurrentUser(state, rawdata) {
      state.user = { isLogin: true, ...rawdata.data };
    },
  },
  actions: {
    fetchColumns(context) {
      axios("columns").then((res) => {
        context.commit("fetchColumns", res.data.data.list);
      });
    },
    fetchColumn(context, cid) {
      axios(`/columns/${cid}`).then((res) => {
        context.commit("fetchColumn", res.data.data);
      });
    },
    fetchPosts(context, cid) {
      axios(`/columns/${cid}/posts`).then((res) => {
        context.commit("fetchPosts", res.data.data.list);
      });
    },
    fetchDetailPosts(context, postId) {
      axios(`/posts/${postId}`).then((res) => {
        context.commit("fetchDetailPosts", res.data.data);
        console.log('fetch success')
        
      });
    },
    //创建文章
    createPost({ commit }, payload) {
      return PostAndCommit("/posts", "createPost", commit, payload);
    },
    Login({ commit }, payload) {
      return PostAndCommit("/user/login", "login", commit, payload);
    },
    //访问被token保护的url获得用户信息
    fetchCurrentUser({ commit }) {
      // axios.get(`/user/current`).then((res) => {
      //   commit("fetchCurrentUser", res.data);
      //   return res.data;
      // });
      return getAndCommit("/user/current", "fetchCurrentUser", commit);
    },
    //组合login和fetchCurrentUser为一个action
    loginAndFetch({ dispatch }, loginData) {
      return dispatch("Login", loginData).then(() => {
        return dispatch("fetchCurrentUser");
      });
    },
  },
  getters: {
    getColumns(state) {
      //对props进行预处理，对默认头像进行设置
      const columnList = () => {
        const trueData: ColumnProps[] = state.colums;
        return trueData.map((item) => {
          if (!item.avatar.url) {
            item.avatar.url = require("../assets/avatar.jpg");
          }
          return item;
        });
      };
      const three = [];
      for (let i = 0; i < columnList().length / 3; i++) {
        const start = (i + 1) * 3 - 3;
        const final = (i + 1) * 3;
        three[i] = columnList().slice(start, final);
        console.log(three[i]);
      }
      console.log("finall", three);
      return three;
    },
    getPostColumnsById: (state) => (id: string) => {
      return state.colums.find((c) => c._id === id);
    },
    getDetailPost: (state) => {
        const trueData: DetailData = state.detailPost;
        if (!trueData.image) {
          trueData.image = {
            url: require("../assets/avatar.jpg"),
            _id: "自动替换图片",
          };
        }
        return trueData;
      
    },
    getPostsById: (state) => (cid: string) => {
      //对props进行预处理，对默认头像进行设置
      const PostList = () => {
        const trueData: PostProps[] = state.posts;
        return trueData.map((item) => {
          if (!item.image) {
            item.image = { url: require("../assets/avatar.jpg") };
          }
          return item;
        });
      };
      return PostList().filter((c) => c.column === cid);
    },
  },
});

export default store;
