<template>
  <div>
    <div class="ttop">
      <h1 style="font-size: 30px; text-align: center">{{ column?.title }}</h1>

      <h1 style="font-size: 15px; text-align: center">
        {{ column?.description }}
      </h1>
    </div>
    <div class="mmean">
      <div class="leftMean">222</div>
      <div class="rightMean">
        <div class="bbox" v-for="item in list" :key="item._id">
          <h1 style="font-size: 30px" 
          @click="router.push(`/DetailPage/${item._id}`)">{{ item.title }}</h1>
          <el-image :src="item.image.url" style="float: left; width: 200px; height: 100px"></el-image>
          <h1 style="font-size: 18px">{{ item.excerpt }}</h1>

          <h2 style="font-size: 18px; clear: both; position: relative">
            {{ item.createdAt }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStore } from "vuex";
import { GlobalDataProps } from "../vuex/store";

export interface ColumnProps {
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "NewPage",
  setup() {
    onMounted(() => {
      store.dispatch("fetchColumn", currentId);
      store.dispatch("fetchPosts", currentId);
    });
    const router = useRouter();
    const route = useRoute();
    const store = useStore<GlobalDataProps>();
    const currentId = route.params.id;
    const column = computed(() => store.getters.getPostColumnsById(currentId));
    const list = computed(() => store.getters.getPostsById(currentId));
    return { list, column, router };
  },
});
</script >
<style scoped>
.ttop {
  width: 100%;
  height: 100px;
  padding-top: 30px;
  background-color: whitesmoke;
}

.mmean {
  width: 100%;
  background-color: aliceblue;
  display: flex;
}

.leftMean {
  position: sticky;
  top: 0;
  width: 30%;
  height: 750px;
  background-color: azure;
}

.rightMean {
  width: 70%;
}

.bbox {
  position: relative;
  padding: 20px;
  width: 80%;
  background-color: blanchedalmond;
  height: 200px;
  margin-bottom: 30px;
  left: 50%;
  margin-left: -40%;
}
</style>