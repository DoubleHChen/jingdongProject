/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/no-parsing-error */
<template>
  <div class="position">
    <span class="iconfont position_icon">&#xe60e;</span>
    广东工贸职业技术学院(天河校区)
    <span class="iconfont position_notice">&#xe74a;</span>
  </div>
  <div class="search">
    <span class="iconfont">&#xe660;</span>
    <span class="search_text">山姆会员商店优惠商品</span>
  </div>
  <div class="banner">
    <img class="banner_img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
  </div>
  <div class="icons">
    <div class="icons_item" v-for="item in iconsList" :key="item.desc">
      <img :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png `" class="icons_item_img">
      <p class="icons_item_desc">{{item.text}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>
<script>
export default {
  name: 'StaticPart',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const iconsList = [
      { imgName: '超市', text: '超市遍历' },
      { imgName: '菜市场', text: '菜市场' },
      { imgName: '水果店', text: '水果店' },
      { imgName: '鲜花', text: '鲜花绿植' },
      { imgName: '医药健康', text: '医药健康' },
      { imgName: '家居', text: '家居时尚' },
      { imgName: '蛋糕', text: '烘培蛋糕' },
      { imgName: '签到', text: '签到' },
      { imgName: '大牌免运', text: '大牌免运' },
      { imgName: '红包', text: '红包套餐' }
    ]
    return { iconsList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
@import '../../style/mixins.scss';
.position{
  position:relative;
  padding:.16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  color:$content-fontcolor;
  @include ellipsis;
  .position_icon{
    position:relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position_notice{
    position:absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
}
.search{
  margin-bottom: .12rem;
  // vertical-align: middle;//中线
  line-height: .32rem;
  background-color:#f5f5f5;
  color:#b7b7b7;
  border-radius: .16rem;
  .iconfont{
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
    font-size:.18rem;
  }
  &_text{
    display: inline-block;
    font-size: .14rem;
  }
}
.banner{
    // 防抖,为了防止上面的内容需要时间加载导致加载后顶开下面的内容
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;//高宽之比
    &_img{
      width: 100%;
    }
}
.icons{
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &_item{
    width: 20%;
    height: 20%;
    &_img{
      display:block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &_desc{
      text-align:center;
      padding: .06rem 0 .16rem 0;
      color:$content-fontcolor;
    }
  }
}
.gap{
  height: .1rem;
  background:$content-bgColor;
  margin:0 -.18rem;
}
</style>
