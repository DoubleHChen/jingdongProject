<template>
  <div class="content">
    <div class="category">
      <div :class="{'category_item':true,'category_item-active' : currentTab === item.tab}" v-for="item in categories" :key="item.name" @click="() => handleTabClick(item.tab)">
        {{item.name}}
      </div>
      <!-- <div class="category_item">休闲食品</div>
      <div class="category_item">时令蔬菜</div>
      <div class="category_item">肉蛋家禽</div> -->
    </div>
    <div class="product">
      <div class="product_item" v-for="item in list" :key="item._id">
        <img :src=item.imgUrl alt="" class="product_item_img">
        <div class="product_item_detail">
          <h4 class="product_item_title">{{item.name}}</h4>
          <p class="product_item_sales">月售{{item.sales}}件</p>
          <p class="product_item_price">
            <span class="product_item_price_yen">&yen;</span>{{item.price}}
            <span class="product_item_price_origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product_number">
          <span class="product_number_minus" @click="()=>{changeCartItem(shopId,item._id,item,-1,shopName)}">-</span>
          {{getProductCartCount(shopId,item._id)}}
          <!-- {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}} -->
          <span class="product_number_plus" @click="()=>{changeCartItem(shopId,item._id,item,+1,shopName)}">+</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'
// 常量定义在外部，利于后期维护
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' },
  { name: '休闲食品', tab: 'snakes' }
]
// 和 Tab 切换相关的逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  // 修改当前选择商品类型的tab
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    // 获取当前商品类别的详情
    const result = await get(`/api/shop/${shopId}/products`, {
      tab: currentTab.value
    })
    // console.log(result)
    // 判断后赋值到对象数组
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  // 当页面首次加载或者监听的数据改变时就会执行
  watchEffect(() => {
    getContentData()
  })
  // 解构
  const { list } = toRefs(content)
  return { list }
}
// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  // 改变商铺名
  const changeShopName = (shopId, shopName) => {
    // console.log(shopId, shopName)
    store.commit('changeShopName', { shopId, shopName })
  }
  // 改变购物车清单
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
    // console.log(getProductCartCount(shopId, productId))
  }
  // 获取产品购物车数量
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}
export default {
  name: 'Content',
  // 父组件向子组件传值
  props: ['shopName'],
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const route = useRoute()
    // const store = useStore()
    // 页面跳转传参
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    // const changeShopName = (shopId, shopName) => {
    //   store.commit('changeShopName', { shopId, shopName })
    // }
    return {
      list,
      categories,
      currentTab,
      handleTabClick,
      cartList,
      shopId,
      changeCartItem,
      getProductCartCount
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.content{
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}
.category{
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: $search-bgColor;
  &_item{
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: $content-fontcolor;
    &-active{
      background: $bgColor;
    }
  }
}
.product{
  overflow-y:scroll;
  flex: 1;
  &_item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &_detail{
      overflow: hidden;
    }
    &_img{
      width: .68rem;
      height: .68rem;
      margin-right:.16rem;
    }
    &_title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_sales{
      margin: .06rem 0;
      font-size: .12rem;
      color: $content-fontcolor;
    }
    &_price{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      &_yen{
        font-size: .12rem;
      }
      &_origin{
        margin-left: 0.06rem;
        line-height: .2rem;
        font-size: .12rem;
        color: #999;
        text-decoration: line-through;
      }
    }
    .product_number {
        position: absolute;
        right: 0;
        bottom: .12rem;
        &_minus,
        &_plus {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          line-height: .2rem;
          border-radius: 50%;
          font-size: .2rem;
          text-align: center;
          box-sizing: border-box;
        }
        &_minus {
          border: .01rem solid $medium-fontColor;
          color: $medium-fontColor;
          margin-right: .05rem;
        }
        &_plus {
          background: $btn-bgColor;
          color: $bgColor;
          margin-left: .05rem;
        }
      }
  }
}
</style>
