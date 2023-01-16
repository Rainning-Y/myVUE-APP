//一个vue中jsx的例子
import { defineComponent,ref } from "vue";
export default defineComponent({
   name:"VNode",
   props:{
    message:String,
   },
   setup(props){
    const count=ref(1)
    return ()=>(
        <div>
            <h1>{props.message}</h1>
            <p>{count}</p>
        </div>
    )
   }
})