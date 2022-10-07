<template>
  <div class="wrapper">
    <div class="search">
      <div class="search_back iconfont" @click="handleBackClick">
        &#xe662;
      </div>
      <div class="search_content">
        <span class="search_content_icon iconfont">&#xe660;</span>
        <input type="text" class="search_content_input" placeholder="请输入商品名称">
      </div>
    </div>
    <ShopInfo :item="item" :hideBorder="true" v-show="item.imgUrl" />
    <Content :shopName="item.name" />
    <Cart />
  </div>
</template>
<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
// 获取当前商品信息
const useShopInfoEffect = () => {
  const route = useRoute() // 当前访问的信息
  const data = reactive({ item: {} })
  // console.log(route.params.id)
  const getItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    // console.log(result)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  // console.log(data)
  const { item } = toRefs(data)
  // console.log(item.name)
  return { item, getItemData }
}
// 点击回退逻辑
const useBackRouterEffect = () => {
  const router = useRouter() // 当前的路由的信息
  const handleBackClick = () => {
    router.back()
  }
  return handleBackClick
}

export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart }, // 局部组件
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const { item, getItemData } = useShopInfoEffect()
    const handleBackClick = useBackRouterEffect()
    getItemData()
    return { item, handleBackClick }
  }
}
</script>
<style lang="scss">
  .wrapper{
    padding: 0 .18rem;
  }
  .search{
    display:flex;
    margin:.14rem 0 .04rem 0;
    line-height: .32rem;
    &_back {
      // width:.3rem;
      font-size: .42rem;
      color: #b6b6b6;
    }
    &_content {
      display: flex;
      flex: 1;
      background:#f5f5f5;
      border-radius: .16rem;
      &_icon{
        width: .44rem;
        text-align: center;
        color: #b7b7b7;
        margin: .02rem 0 0 .02rem;
      }
      &_input{
        display: block;
        background:#f5f5f5;
        width: 100%;
        padding-right: .2rem;
        border:none;
        outline:none;
        height: .32rem;
        font-size: .14rem;
        color: #333;
        &::placeholder {
          color: #333;
        }
      }
    }
  }
</style>
