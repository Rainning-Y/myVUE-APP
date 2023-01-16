import { ref, onMounted, onUnmounted, Ref } from "vue";

export const useClickOutside = (dom: Ref<null | HTMLElement>) => {
  const outside = ref(false);
  const handle = (e: MouseEvent) => {
    if (dom.value) {
      if (!dom.value.contains(e.target as HTMLElement)) {
        outside.value = true;
      } else {
        outside.value = false;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handle);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handle);
  });
  return outside;
};

// const dropdownRef = ref<null | HTMLElement>(null)
// const handler = (e: MouseEvent) => {
//   if (dropdownRef.value) {
//     if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
//       isOpen.value = false
//     }
//   }
// }
// onMounted(() => {
//   document.addEventListener('click', handler)
// })
// onUnmounted(() => {
//   document.removeEventListener('click', handler)
// })
// return {
//   isOpen,
//   toggleOpen,
//   // 返回和 ref 同名的响应式对象，就可以拿到对应的 dom 节点
//   dropdownRef
// }
