// 弹簧组件,判断登录或请求是否成功，屏幕中间弹提示
<template lang="">
  <div class="toast">{{message}}</div>
</template>
<script>
import { reactive, toRefs } from 'vue'
export default {
  props: ['message'] // 接收老爸传过来的值
}
export const useToastEffect = () => {
  const toastData = reactive({
    show: false,
    toastMessage: ' '
  })
  const showToast = (message) => {
    toastData.show = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.show = false
      toastData.toastMessage = ''
    }, 2000)
  }
  const { show, toastMessage } = toRefs(toastData)
  return { toastData, showToast, show, toastMessage }
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.toast{
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  padding: .1rem;
  background-color:rgba(0,0,0, .35);
  border-radius: .05rem;
  color: $bgColor;
  z-index: 99;
}
</style>
