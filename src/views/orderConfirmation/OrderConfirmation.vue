<template>
  <div class="wrap">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>
<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'
export default {
  name: 'OrderConfirmation',
  components: { TopArea, ProductList, Order },
  // eslint-disable-next-line space-before-function-paren
  setup() {}
}
</script>
<style scoped lang="scss">
.wrap {
   position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
    overflow-y: scroll;
}

</style>
