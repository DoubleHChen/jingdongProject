<template>
  <div class="mask" v-if="showCart && calculations.total > 0" @click="handleCartShowChange()"></div>
  <div class="cart">
    <div class="product" v-if="showCart && calculations.total > 0">
      <!-- // 购物车头部 -->
      <div class="product_header">
        <div class="product_header_all" @click="() => setCartItemsChecked(shopId,calculations.allChecked)">
          <span class="product_header_icon iconfont" v-html="calculations.allChecked ? '&#xe626;':'&#xe8bb;'"></span>
          全选
        </div>
        <div class="product_header_clear">
          <span class="product_header_clear_btn" @click="()=>{cleanCartProducts(shopId)}">清空购物车</span>
        </div>
      </div>
      <!-- 购物车列表 -->
      <div class="product_item" v-for="item in productList" :key="item._id">
        <!-- 点击选中 -->
        <div class="product_item_checked iconfont" v-html="item.check ? '&#xe626;':'&#xe8bb;'" @click="() => {changeCartItemChecked(shopId,item._id)}">
        </div>
        <img :src=item.imgUrl alt="" class="product_item_img">
        <div class="product_item_detail">
          <h4 class="product_item_title">{{item.name}}</h4>
          <p class="product_item_price">
            <span class="product_item_price_yen">&yen;</span>{{item.price}}
            <span class="product_item_price_origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <!-- 商品已选中的数量 -->
        <div class="product_number">
          <span class="product_number_minus" @click="()=>{changeCartItemInfo(shopId,item._id,item,-1)}">-</span>
          {{item.count || 0}}
          <span class="product_number_plus" @click="()=>{changeCartItemInfo(shopId,item._id,item,+1)}">+</span>
        </div>
      </div>
    </div>
    <div class="check">
      <div class="check_icon">
        <img src="http://www.dell-lee.com/imgs/vue3/basket.png" alt="" class="check_icon_img" @click="handleCartShowChange(shopId,calculations)">
        <div class="check_icon_tag">{{calculations.total}}</div>
      </div>
      <div class="check_info">
        总计:<span class="check_info_price"> &yen; {{calculations.price}}</span>
      </div>
      <div class="check_btn" v-show="calculations.total>0">
        <router-link :to="{path: `/orderConfirmation/${shopId}`}">
          去结算
        </router-link>

      </div>
    </div>
  </div>
</template>
<script>
// 计算属性
import { ref } from 'vue'
// 购物车需存到全局管理，需用到vuex
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects'

// 获取购物车信息逻辑,函数封装
const useCartEffect = (shopId) => {
  const store = useStore()
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  // const cartList = store.state.cartList

  // 控制购物车是否选中
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }
  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
    // showChart.value = false
  }
  // 全选按钮
  const setCartItemsChecked = (shopId, allChecked) => {
    store.commit('setCartItemsChecked', { shopId, allChecked })
    // productList.product.check = !productList.product.check
  }

  return {
    calculations,
    productList,
    changeCartItemInfo,
    changeCartItemChecked,
    cleanCartProducts,
    setCartItemsChecked
  }
}
// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  // 不定义响应式就是单向数据
  const showCart = ref(false)
  const handleCartShowChange = () => {
    // console.log(calculations)
    // console.log(id,calculations.allChecked)
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}
export default {
  name: 'Cart',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    // const list = []

    // const { changeCartItemInfo } = useCommonCartEffect()

    const {
      calculations,
      productList,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked
    } = useCartEffect(shopId)
    const { showCart, handleCartShowChange } = toggleCartEffect()
    return {
      calculations,
      productList,
      shopId,
      changeCartItemInfo,
      changeCartItemChecked,
      cleanCartProducts,
      setCartItemsChecked,
      showCart,
      handleCartShowChange
    }
  }
}
</script>

<style  lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.mask {
 position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: rgba(0,0,0,.5);
  z-index: 1;
}

.cart{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #fff;
}
.check{
  display: flex;
  height: .49rem;
  border-top: .01rem solid #f1f1f1;
  line-height: .49rem;
  &_icon {
    position: relative;
    width: .84rem;
    &_img {
      display: block;
      margin: .12rem auto;
      width:.28rem;
      height: .26rem;
    }
    &_tag {
      position: absolute;
      left: .5rem;
      top: .04rem;
      padding: 0 .04rem;
      min-width: .2rem;
      height: .2rem;
      line-height: .2rem;
      background-color: #e93b3b;
      border-radius: .1rem;
      font-size: .12rem;
      text-align: center;
      color:#fff;
      transform: scale(.5);
      transform-origin: left center;//改变中心
    }
  }
  &_info {
    flex: 1;
    color: #333;
    font-size: .12rem;
    &_price {
      line-height: .49rem;
      color: #e93b3b;
      font-size: .18rem;
    }
  }
  &_btn {
    width: .98rem;
    background-color: #4fb0f9;
    text-align: center;
    font-size: .14rem;
    a {
      color: $bgColor;
      text-decoration: none;
    }
  }
}
.product{
  overflow-y:scroll;
  flex: 1;
  background-color: #fff;
  &_header {
    display: flex;
    height: .52rem;
    line-height: .52rem;
    border-bottom:.01rem solid #f1f1f1;
    font-size: .14rem;
      color:#333;
    &_all {
      width: .64rem;
      margin-left: .18rem;
    }
    &_icon {
      display: inline-block;
      margin-right: .1rem;
      vertical-align: top;//顶部对齐
      color:#0091ff;
      font-size: .2rem;
    }
    &_clear {
      flex: 1;
      margin-right: .16rem;
      text-align: right;
      &_btn {
        display: inline-block;
      }
    }
  }
  &_item{
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;
    &_checked {
      line-height: .5rem;
      margin-right: .2rem;
      color: #0091ff;
      font-size: .2rem;
    }
    &_detail{
      overflow: hidden;
    }
    &_img{
      width: .46rem;
      height: .46rem;
      margin-right:.16rem;
    }
    &_title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_price{
      margin: .06rem  0 0 0;
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
        bottom: .25rem;
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
