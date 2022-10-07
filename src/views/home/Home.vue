<template>
  <div class="wrapper">
    <StaticPart />
    <Nearby />
  </div>
  <Decker :currentIndex="0" />
</template>
<script>
// 导入组件
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Decker from '@/components/Decker.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { StaticPart, Nearby, Decker }
}
</script>
<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  // padding: 0 .18rem;
  padding: 0 .18rem .2rem .18rem;
}
</style>
