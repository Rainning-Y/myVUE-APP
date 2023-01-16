<template>
  <div>
    <el-row
      v-for="item in three"
      :key="item.length"
      :gutter="20"
      class="el-row"
    >
      <el-col v-for="column in item" :key="column.id" :span="8">
        <el-card>
          <el-avatar
            :size="80"
            :src="column.avatar"
            :alt="column.title"
            class="avatar"
          />
          <h5>{{ column.title }}</h5>
          <p>{{ column.description }}</p>
          <el-button type="primary">进入专栏</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType,computed } from "vue";
export interface ColumnProps {
  id: number;
  avatar?: string;
  title: string;
  description: string; //“描述”
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>, //对类型进行指定
      required: true, //必须的
    },
  },
  setup(props) {
    //对props进行预处理，对默认头像进行设置
    const columnList=computed(()=>{
      return props.list.map((item)=>{
        if(!item.avatar){
          item.avatar=require("../assets/avatar.jpg")
          //"http://localhost:8080/img/avatar.e6e639c4.jpg"
          // require("../assets/avatar.jpg")
        }
        return item
      })
    })
    //将原来的数组分成3个3个一组的。
    let three = [];
    for (let i = 0; i < columnList.value.length / 3; i++) {
      let start = (i + 1) * 3 - 3;
      let final = (i + 1) * 3;
      three[i] = columnList.value.slice(start, final);
      console.log(three[i]);
    }
    console.log("finall", three);
    return { three };
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