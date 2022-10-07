<template>
  <!-- 底部固定导航栏 -->
  <div class="docker">
    <!-- block__element--Modifier命名方式 -->
    <div v-for="(item,index) in dockerList" :class="{docker_item:true,'docker_item-active':index === currentIndex}" :key="item.icon">
      <router-link :to="item.to">
        <div class="iconfont" v-html="item.icon" />
        <div class="docker_title">{{item.text}}</div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const dockerList = [
      { icon: '&#xe62e;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe60c;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe629;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe653;', text: '我的', to: { name: 'CartList' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/variables.scss';
@import '@/style/mixins.scss';
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: .06rem .18rem;
  left: 0;
  bottom: 0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  color: $content-fontcolor;

  &_item {
    //&代表docker父样式
    flex: 1;
    text-align: center;
    a {
      color:$content-fontcolor;
      text-decoration: none;
    }
    .iconfont {
      font-size: .18rem;
    }
    &-active {
      a{
        color: #1fa4fc;
      }
    }
  }

  &_title {
    font-size: .2rem;
    transform: scale(.5, .5); //按比例缩小
    transform-origin: center top; //变形的中心点
  }
}
</style>
