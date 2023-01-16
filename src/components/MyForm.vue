<template>
  <form class="myForm">
    <slot name="default"></slot>
    <div @click.prevent="submitForm" class="submit">
      <slot name="submit">
        <el-button>提交</el-button>
      </slot>
    </div>
  </form>
</template>
  
  <script lang="ts">
import { defineComponent, onUnmounted } from "vue";

import mitt from "mitt";
//创建监听器
type Events = {
  "from-item-created": () => boolean;
  "Now-Be-Empty": () => void;

};
type ValFunction = () => boolean;
type emptyFunction = () => void;
export const emitter = mitt<Events>();

export default defineComponent({
  emits: { "form-submit": null },
  setup() {
    let functionArr: ValFunction[] = [];
    let functionArr2: emptyFunction[] = [];
    const submitForm = () => {
      const result = functionArr.map((fun) => fun()).every((e) => e);
      console.log("验证成功")
      if (result) {
        //对每一个进行清空
        functionArr2.map((e) => e());
      }
    };

    //emit监听
    const callback = (func: ValFunction) => {
      functionArr.push(func);
    };
    const empty = (func: emptyFunction) => {
      functionArr2.push(func);
    };
    //触发了就执行回调
    emitter.on("from-item-created", callback);
    emitter.on("Now-Be-Empty", empty);
    onUnmounted(() => {
      emitter.off("from-item-created", callback);
      functionArr = [];
    });
    return {
      submitForm,
      functionArr,
    };
  },
});
</script>
  
  <style scoped>
.submit {
  position: absolute;
  left: 50%;
  margin-left: -30.4px;
}
</style>
  