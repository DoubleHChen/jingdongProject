<template>
  <div class="shop">
    <img :src="item.imgUrl" class="shop_img">
    <div :class="{'shop_content':true,'shop_content-bordered':hideBorder?false:true}">
      <div class="shop_content_title">{{item.name}}</div>
      <div class="shop_content_tags">
        <span class="shop_content_tag">月售:{{item.sales}}</span>
        <span class="shop_content_tag">起送:{{item.expressLimit}}</span>
        <span class="shop_content_tag">基础运费:{{item.expressPrice}}</span>
      </div>
      <p class="shop_content_highlight">{{item.slogan}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShopInfo',
  props: ['item', 'hideBorder'], // 接收父组件传的数据
  setup() {}
}
</script>
<style lang="scss" scoped>
@import '../style/variables.scss';
.shop {
    display: flex;
    padding-top: .12rem;

    &_img {
      margin-right: .16rem;
      width: .56rem;
      height: .56rem;
    }

  &_content {
    flex: 1;
    padding-bottom: .12rem;
    &-bordered{
      border-bottom: .01rem solid $content-bgColor;
    }
    &_title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }

    &_tags {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }

    &_tag {
      margin-right: .16rem;
    }

    &_highlight {
      margin: .08rem 0 0 0;
      line-height: .18rem;
      font-size: .13rem;
      color: #e93b3b;
    }
  }
  }

</style>
