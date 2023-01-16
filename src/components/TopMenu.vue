<template>
  <div class="h" ref="watchDomRef">
    <Modal :isOpen="isOpen" @closeModal="close">1111</Modal>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <div class="first"></div>
      <el-menu-item index="1" @click="toHome">首页</el-menu-item>
      <el-sub-menu v-if="user.isLogin" index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
      </el-sub-menu>

      <div v-if="!user.isLogin" class="notLogin">
        <el-button @click="open">登录</el-button>
        <el-button>注册</el-button>
      </div>
      <div v-if="user.isLogin" class="notLogin">
        <el-dropdown>
          <el-button type="primary">
            你好{{ user.nickName
            }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="newPaper">新建文章</el-dropdown-item>
              <el-dropdown-item @click="open">重新登录</el-dropdown-item>
              <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
              <el-dropdown-item @click="MyColumn">我的专栏</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <el-menu-item index="3">1 </el-menu-item>
    </el-menu>
  </div>
</template>
  
  <script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useClickOutside } from "../hooks/useClickOutside";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Modal from "./Modal.vue";


export default defineComponent({
  components: { Modal },
  name: "TopMenu",

  setup() {
    const store=useStore();
    let user=computed(()=>store.state.user)
    
    const router=useRouter()
    const newPaper=()=>{
       router.push("/createPaper")
    }
    const toHome=()=>{
       router.push("/")
    }
    const isOpen = ref(false);
    const open = () => {
      isOpen.value = true;
    };
    const close = () => {
      isOpen.value = false;
    };
    const MyColumn=()=>{
      router.push('/newpaper/63c18041b558154f03931ed8')
    }
    const activeIndex = ref("3");
    const watchDomRef = ref<null | HTMLElement>(null);

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
    };
    //调用是否点击div外函数
    const isOut = useClickOutside(watchDomRef);
    watch(isOut, () => {
      // console.log("isOut:", isOut.value);
    });
    //退出登录
    const logOut=()=>{
      localStorage.clear()
    }
    const UserMenu = () => {
      console.log(1);
    };
    return {
      activeIndex,
      handleSelect,
      UserMenu,
      watchDomRef,
      isOpen,
      close,
      open,
      toHome,
      newPaper,
      user,
      logOut,
      MyColumn
    };
  },
});
</script>
  
  <style scoped>
.notLogin {
  position: absolute;
  top: 50%;
  margin-top: -16px;
  left: 86.75%;
}
.first {
  width: 50px;
}
</style>
  