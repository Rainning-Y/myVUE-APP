<template>
  <div>
    <input
      :value="inputRef.value"
      @input="updateValue"
      @blur="verification"
      class="myInput"
      v-bind="$attrs"
    />
    <h5 v-if="inputRef.error">{{ inputRef.message }}</h5>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, PropType } from "vue";
import { emitter } from "./MyForm.vue";
//验证邮箱的正则表达式
const emailReg =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
interface RuleProp {
  type: "required" | "email" | "min" | "custom";
  message: string;
  customFunction?: () => boolean;
}
export type RulesProp = RuleProp[];
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue: String,
  },

  setup(props, context) {
    const inputRef = reactive({
      value: props.modelValue || "",
      error: false,
      message: "",
    });
    //verification验证
    const updateValue = (e: Event) => {
      const targetValue = (e.target as HTMLInputElement).value;
      inputRef.value = targetValue;
      context.emit("update:modelValue", targetValue);
    };
    const verification = () => {
      if (props.rules) {
        const allPassed = props.rules.every((rule) => {
          let passed = true;
          inputRef.message = rule.message;
          switch (rule.type) {
            case "required":
              passed = inputRef.value.trim() !== "";
              break;
            case "email":
              passed = emailReg.test(inputRef.value);
              break;
            case "min":
              passed = inputRef.value.length >= 6;
              break;
            case "custom":
              if (rule.customFunction) {
                passed = rule.customFunction();
              }
              break;
            default:
              break;
          }
          return passed;
        });
        inputRef.error = !allPassed;
        return allPassed;
      }
      return true;
    };
    const emptyInput = () => {
      //inputRef.value=''
      console.log("假清空");
    };

    //<input>每次挂载时都往form表单发送一个函数
    onMounted(() => {
      emitter.emit("from-item-created", verification);
      emitter.emit("Now-Be-Empty", emptyInput);
    });
    return { inputRef, verification, updateValue, emptyInput };
  },
});
</script>
<style scoped>
.myInput {
  width: 400px;
  height: 30px;
  border-radius: 5px;
}
</style>

 
  