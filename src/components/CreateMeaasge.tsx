import Message from "./MessageAlert.vue";
import { createApp, h, render } from "vue";
export type MessageType = "success" | "error" | "info";
//传入消息，类型
const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  //instance:情况，例子，使用createApp
  // const messageInstance = createApp(Message, { message, type });
  // const mountNode = document.createElement("div");
  // document.body.appendChild(mountNode);
  // messageInstance.mount(mountNode);
  // setTimeout(() => {
  //   //从节点上卸载组件
  //   messageInstance.unmount;
  //   document.body.removeChild(mountNode);
  // }, timeout);

  //使用render与vnode
  const messageVnode = h(Message, { message, type });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  render(messageVnode, mountNode);
  setTimeout(() => {
    //从节点上卸载组件,给render中传入null
    render(null,mountNode)
    document.body.removeChild(mountNode);
  }, timeout);
};

export default createMessage;
