<template>
  <div class="nearby">
    <h3 class="nearby_title">附近店铺</h3>
    <router-link v-for="item in nearbyList" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script>
import { ref } from 'vue' // 响应式数据
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
const useNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    // console.log(result)
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  components: { ShopInfo },
  name: 'Nearby',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const { nearbyList, getNearbyList } = useNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';

.nearby {
  &_title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontcolor;
  }
  a{
    text-decoration: none;
  }
}
</style>
