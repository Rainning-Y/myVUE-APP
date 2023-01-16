<template>
  <div>
    <div @click.prevent="triggerUpload">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <el-button>正在上传...</el-button>
      </slot>
      <slot v-if="fileStatus === 'ready'" name="default">
        <el-button>点击上传</el-button>
      </slot>
      <slot v-if="fileStatus === 'success'" name="success" :imageUrl="slotImageUrl">
        <el-button>上传成功</el-button>
      </slot>
      <span v-if="fileStatus === 'error'">上传失败了</span>
    </div>
    <input type="file" name="file" ref="fileInput" @change.prevent="FileUp" style="display: none" />
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import axios from "axios";

type UpLoadStatus = "ready" | "loading" | "success" | "error";
type checkFunction = (file: File) => boolean



export default defineComponent({
  props: {
    //action是post的地址
    action: {
      type: String,
      required: true,
    },
    //在上传前做检查的函数
    beforeUpload: {
      type: Function as PropType<checkFunction>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup(props, context) {
    //关于上传的逻辑
    //表示上传的状态
    const fileStatus = ref<UpLoadStatus>("ready");
    //获得input节点
    const fileInput = ref<null | HTMLInputElement>(null);
    let slotImageUrl=ref('')
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    //上传的函数
    const FileUp = (e: Event) => {
      //为什么要as HTMLInputElement
      const target = e.target as HTMLInputElement;
      if (target.files) {
        //这里的target.files是一个列表（有可能是多个）
        let files = target.files;
        //取出files数据,因为这里只取第一个，所以直接files[0]
        const uploadFile = files[0];
        const formData = new FormData();
        
        if (files) {
          //在上传前检查函数
          if (props.beforeUpload) {
            const result = props.beforeUpload(uploadFile)
            if (!result) {

              return
            }
          }
          fileStatus.value = "loading";

          //formData.append(name, value) —— 添加具有给定 name 和 value 的表单字段
          formData.append(uploadFile.name, uploadFile);
          axios
            .post(props.action, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res: any) => {
              fileStatus.value = "success";
              slotImageUrl.value=res.data.data.url
              console.log("上传结果url:", slotImageUrl.value=res.data.data.url);
              //用emit传输res.data这个请求成功的数据
              context.emit('file-uploaded', res.data)
              console.log("上传结果:", res);
            })
            .catch((e) => {
              fileStatus.value = "error";
              context.emit('file-uploaded-error', { e })
              console.log(e);
            })
            .finally(() => {
              if (fileInput.value) {
                //将文本框上面的值设置为空？？？
                fileInput.value.value = "";
              }
            });
        }
      }
    };
    return { FileUp, fileInput, triggerUpload, fileStatus,slotImageUrl };
  },
});
</script>
  
<style scoped>

</style>