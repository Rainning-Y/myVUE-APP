<template>
  <div>
    <TopMenu />

    <div class="pageMain">
      <router-view></router-view>
      <!-- <HomePage :list="list" />
      <NewPage/> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { GlobalDataProps } from "./vuex/store";
import TopMenu from "./components/TopMenu.vue";
import MessageAlert from "./components/MessageAlert.vue";
import createMessage from "./components/CreateMeaasge";

export default defineComponent({
  name: "App",
  components: {
    TopMenu,
  },
  setup() {
    const store = useStore<GlobalDataProps>();
    const error = computed(() => store.state.error);
    watch(
      () => error.value.status,
      () => {
        const { message, status } = error.value;

        if (status && message) {
          createMessage(message, "error");
        }
      }
    );
    const token = computed(() => {
      return store.state.token;
    });
    onMounted(() => {

      //
      createMessage('测试（它在App.vue中）','success')
      //原来这里是实现token记忆登录的，现在token登录逻辑在路由里
      // if (!store.state.user.isLogin && token.value) {
      //   axios.defaults.headers.common[
      //     "Authorization"
      //   ] = `Bearer ${token.value}`;
      //   store.dispatch("fetchCurrentUser");
      // }
    });
    return { error };
  },
});
</script>

<style sc>
.pageMain {
  background-color: antiquewhite;
  margin-left: 50px;
  margin-right: 50px;
  padding: 20px;
}
</style>
