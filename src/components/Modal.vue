<template>
  <Teleport to="#mymodal">
    <div v-if="isOpen" class="loginModal">
      <div>{{ error }}</div>
      
      <el-button-group style="
          margin-top: 30px;
          margin-bottom: 30px;
          position: relative;
          transform: translate(-50%);
          left: 50%;
        ">
        <el-button type="primary" @click="()=>{registerpage=false;loginpage=true}">登录</el-button>
        <el-button type="primary" @click="()=>{registerpage=true;loginpage=false}"> 注册 </el-button>
      </el-button-group>
      <el-button
          @click="close"
          style="position: absolute; float: right; right: 10px; top: 10px"
          >关闭
        </el-button >
        <!-- 登录 -->
      <MyForm v-if="loginpage">
        <!-- 用户名 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              用户名:
            </h1></el-col
          >
          <el-col :span="18">
            <VaildateInput
              ref="inputRef"
              :rules="emailRules"
              v-model="emailVal"
              placeholder="请输入邮箱"
            ></VaildateInput>
          </el-col>
        </el-row>
        <!-- 密码 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              密码:
            </h1></el-col
          >
          <el-col :span="18"
            ><VaildateInput
              type="password"
              :rules="passwordRules"
              v-model="passwordVal"
              placeholder="请输入密码"
            ></VaildateInput
          ></el-col>
        </el-row>
        <template v-slot:submit
          ><el-button style="margin: auto" @click="login">
            登录</el-button
          ></template
        >
      </MyForm>
      <!-- 注册 -->
      <MyForm v-if="registerpage">
        <!-- 用户名 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              用户名:
            </h1></el-col
          >
          <el-col :span="18">
            <VaildateInput
              ref="inputRef"
              :rules="emailRules"
              v-model="emailVal"
              placeholder="请输入邮箱"
            ></VaildateInput>
          </el-col>
        </el-row>
        <!-- 昵称 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              昵称:
            </h1></el-col
          >
          <el-col :span="18">
            <VaildateInput
              ref="inputRef"
              :rules="nameRules"
              v-model="nameVal"
              placeholder="请输入昵称"
            ></VaildateInput>
          </el-col>
        </el-row>
        <!-- 密码 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              密码:
            </h1></el-col
          >
          <el-col :span="18"
            ><VaildateInput
              type="password"
              :rules="passwordRules"
              v-model="passwordVal"
              placeholder="请输入密码"
            ></VaildateInput
          ></el-col>
        </el-row>
        <!-- 重复密码 -->
        <el-row>
          <el-col :span="6"
            ><h1
              style="
                margin-bottom: 30px;
                font-size: 20px;
                text-align: center;
                line-height: 32px;
              "
            >
              重复密码:
            </h1></el-col
          >
          <el-col :span="18"
            ><VaildateInput
              type="password"
              :rules="REpasswordRules"
              v-model="REpasswordVal"
              placeholder="请重复密码"
            ></VaildateInput
          ></el-col>
        </el-row>
        <template v-slot:submit
          ><el-button style="margin: auto" @click="register">
            注册</el-button
          ></template
        >
      </MyForm>
      <div>测试用户名:111@test.com,111111</div>
      <div>111@test.com</div>
    </div>
  </Teleport>
</template>
  
  <script lang="ts">
import { defineComponent, ref, computed } from "vue";
import VaildateInput, { RulesProp } from "./validate-input.vue";
import MyForm from "./MyForm.vue";
import { useStore } from "vuex";
import axios from "axios";
import createMessage from "./CreateMeaasge";


export default defineComponent({
  name: "LoginModal",
  props: {
    isOpen: Boolean,
  },
  components: {
    VaildateInput,
    MyForm,
  },
  emits: {
    closeModal: null,
  },
  setup(props, context) {
    const inputRef = ref<any>();
    const emailVal = ref("oasis@test.com");
    const nameVal = ref("");
    const passwordVal = ref("111111");
    const REpasswordVal = ref("");
    const store = useStore();
    const error = computed(() => store.state.error.message);
    //控制注册或者登录，true为登录，false为注册
    const loginpage = ref(true);
    const registerpage = ref(false);
    const register = () => {
      const payload1 = {
        email: emailVal.value,
        password: passwordVal.value,
        nickName:nameVal.value
      };
      axios.post('/users/',payload1).then(data=>{
        console.log('注册成功',data)
        createMessage('注册成功','success')

      }).catch(e=>console.log("注册错误",e))
    };
    const login=() => {
      const payload = {
        email: emailVal.value,
        password: passwordVal.value,
      };
      store
        .dispatch("loginAndFetch", payload)
        .then((data) => console.log("登录接口返回的数据", data));
    };
    const close = () => {
      context.emit("closeModal");
    };
    const emailRules: RulesProp = [
      {
        type: "required",
        message: "电子邮箱不能为空",
      },
      { type: "email", message: "请输入正确电子邮箱格式" },
    ];
    const passwordRules: RulesProp = [
      {
        type: "required",
        message: "密码不能为空",
      },
      { type: "min", message: `密码至少为6位` },
    ];
    const nameRules: RulesProp = [
      {
        type: "required",
        message: "昵称不能为空",
      },
    ];
    const REpasswordRules: RulesProp = [
      {
        type: "required",
        message: "重复密码不能为空",
      },
      { type: "min", message: `密码至少为6位` },
      {
        type: "custom", 
        customFunction:()=>passwordVal.value===REpasswordVal.value,
        message: `重复密码错误` 
      }
    ];

    return {
      close,
      emailRules,
      passwordRules,
      nameRules,
      REpasswordRules,
      emailVal,
      passwordVal,
      REpasswordVal,
      loginpage,
      registerpage,
      inputRef,
      login,
      error,
      nameVal,
      register,
    };
  },
});
</script>
  
  <style scoped>
.loginModal {
  height: 400px;
  width: 580px;
  position: absolute;
  border: 2px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 5px solid black;
  background-color: aliceblue;
}
</style>
  