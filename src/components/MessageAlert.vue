<template>
  
    <div class="message">
      <el-alert :title="message" :type="type" />
      <h1>{{ message }}</h1>
    </div>
  
</template>
  
  <script lang="ts">
import { defineComponent, PropType } from "vue";

export type MessageType = "success" | "error" | "info";
export default defineComponent({
  name: "Message-alert",
  props: {
    message: String,
    type: { type: String as PropType<MessageType>, default: "info" },
  },
  setup() {
    // const node = document.createElement("div");
    // node.id = "message";
    // document.body.appendChild(node);
    return {};
  },
});
</script>
  
  <style scoped>
.message {
  border-radius: 3px;
  position: absolute;
  width: 500px;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>