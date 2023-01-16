<template>
  <div>
    <UpLoader action="/upload" :beforeUpload="checkUpload" @file-uploaded="onFileUploaded">
      <template #success="successProps">

        <img :src="successProps.imageUrl" width="200" />
      </template>
    </UpLoader>
    <h1>请输入文章标题：</h1>
    <MyInput v-model="title" :rules="rules" />
    <h1>请输入文章内容：</h1>
    <el-input type="textarea" v-model="text"></el-input>
    <el-button @click="createpaper">创建文章</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { GlobalDataProps, ResponseType, ImageProps, PostProps } from "../vuex/store";
import MyInput, { RulesProp } from "../components/validate-input.vue";
import UpLoader from "../components/UpLoader.vue";
import createMessage from "@/components/CreateMeaasge";

export default defineComponent({
  components: { MyInput, UpLoader },
  name: "NewPage",
  setup() {
    const rules: RulesProp = [
      {
        type: "required",
        message: "标题不能为空",
      },
    ];
    const store = useStore<GlobalDataProps>();
    const router = useRouter();
    const title = ref("");
    const text = ref("");
    let imageId = ''
    const nowColumnId = store.state.user._id;
    // 自定义的检查函数
    const checkUpload = (file: File) => {
      const isJPG = (file.type === 'image/jpeg')
      if (!isJPG) {
        createMessage("请传入image/jpeg类型的文件", 'error')
      }
      return isJPG
    }
    const onFileUploaded = (emitData: ResponseType<ImageProps>) => {
      createMessage(`上传图片id${emitData.data._id}`, 'success')
      if (emitData.data._id) {
        imageId = emitData.data._id
      }

    }
    //上传文章的函数
    const createpaper = () => {
      if (store.state.user.column) {
        const newData: PostProps = {
          title: title.value,
          content: text.value,
          author: store.state.user._id,
          column: store.state.user.column,
        };
        if (imageId){
          newData.image=imageId
        }
        store.dispatch('createPost',newData).then(()=>{
          createMessage('发表成功,2s后跳转','success')
        })
        router.push(`/newpaper/${store.state.user.column}`);
      }
    };

    return { title, text, createpaper, rules, checkUpload, onFileUploaded };
  },
});
</script >
<style scoped>

</style>