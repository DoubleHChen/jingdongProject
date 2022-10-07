<template>
  <div class="wrapper">

  </div>
  <Decker :currentIndex="1" />
</template>

<script>
import Decker from '@/components/Decker'

export default {
  name: 'CartList',
  components: { Decker }
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
