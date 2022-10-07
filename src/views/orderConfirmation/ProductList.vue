<template>
  <div class="product">
    <div class="product_title">{{shopName}}</div>
    <div class="product_wrapper">
      <div class="product_list">
        <div class="product_item" v-for="item in productList" :key="item._id">
          <img :src="item.imgUrl" alt="" class="product_item_img">
          <div class="product_item_detail">
            <h4 class="product_item_title">{{item.name}}</h4>
            <p class="product_item_price">
              <span class="product_item_price_yen">&yen;</span>
              {{item.price}}x{{item.count}}
              <span class="product_item_total">
                <span class="product_item_price_yen">&yen;</span>
                {{(item.price * item.count).toFixed(2)}}
                <!-- {{item.price }} -->
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '@/effects/cartEffects'
export default {
  name: 'ProductList',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.product {
  margin: .16rem ;
  background-color: #fff;
  &_title {
    padding: .16rem;
    font-weight:700;
    font-size: .16rem;
  }
  &_wrapper {
    overflow-y:scroll ;
    position: absolute;
    left: 0;
    right: 0;
    bottom: .6rem;
    top: 2.6rem;
    margin:0 .16rem;
  }
  &_list {
    background-color: #fff;
   }
  &_item {
    position: relative;
    display: flex;
    padding:  0 .16rem .16rem .16rem;
    &_detail{
      flex: 1;
    }

    &_title{
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &_img{
      width: .48rem;
      height: .48rem;
      margin-right:.16rem;
    }
    &_price{
      display: flex;
      margin: .06rem 0 0 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }
    &_total {
        flex: 1;
        text-align: right;
        color: #000;
      }
    &_yen{
      font-size: .12rem;
    }
  }
}
</style>
