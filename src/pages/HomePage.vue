<template>
  <div>
    <el-row
      v-for="item in three"
      :key="item.length"
      :gutter="20"
      class="el-row"
    >
      <el-col v-for="column in item" :key="column._id" :span="8" v-loading="loading">
        <el-card>
          <el-avatar
            :size="80"
            :src="column.avatar.url"
            :alt="column.title"
            class="avatar"
          />
          <h5>{{ column.title }}</h5>
          <p>{{ column.description }}</p>
          <el-button
            type="primary"
            @click="
              router.push({ name: 'NewPage', params: { id: column._id } })
            "
            >进入专栏</el-button
          >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
  <script lang="ts">
import { defineComponent, PropType, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ColumnProps } from "../vuex/store";

export default defineComponent({
  name: "HomePage",
  setup() {
    let store = useStore();
    let loading=computed(()=>store.state.isLoading)
    onMounted(() => {
      store.dispatch("fetchColumns");
    });
    const router = useRouter();
    const three = computed(() => store.getters.getColumns);
    return { three, router,loading };
  },
});
</script >
  <style scoped>
.avatar {
  position: relative;
  left: 50%;
  margin-left: -40px;
}
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
</style>