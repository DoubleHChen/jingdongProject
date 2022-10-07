<template>
  <div class="top">
    <div class="top_header">
      <div class="iconfont top_header_back" @click="handleBackClick">&#xe662;</div>
      确认订单
    </div>
    <div class="top_receiver">
      <div class="top_receiver_title">收货地址</div>
      <div class="top_receiver_address">广州市兴华街道广州大道北广东工贸东区 </div>
      <div class="top_receiver_info">
        <span class="top_receiver_info_name">瑶妹(先生)</span>
        <span class="top_receiver_info_name">12345678900</span>
      </div>
      <div class="iconfont top_receiver_icon">&#xe662;</div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }
    return { handleBackClick }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.top {
  position: relative;
  height: 1.96rem;
  background-image:linear-gradient(0deg,rgba(0,145,255,0) 4%,#0091ff 50%);
  background-size: 100% 1.59rem;
  background-repeat: no-repeat;
  background-color: #eee;
  &_header {
    position: relative;
    padding-top: .15rem;
    line-height: .24rem;
    color: #fff;
    text-align: center;
    font-size: .16rem;
    &_back {
      position: absolute;
      left: .18rem;
      font-size: .32rem;
    }
  }
  &_receiver {
    position: absolute;
    left: .18rem;
    right: .18rem;
    bottom: 0;
    background-color: #fff;
    height: 1.11rem;
    border-radius: .04rem;
    &_title {
      line-height: .22rem;
      padding: .16rem 0 .14rem .16rem;
      font-size: .16rem;
      color: #333;
    }
    &_address {
      line-height: .2rem;
      padding: 0 .4rem 0 .16rem;
      font-size: .14rem;
      color: #333;
    }
    &_info {
      padding: .06rem 0 0 .16rem;
      &_name {
        margin-right: .06rem;
        line-height: .18rem;
        font-size: .12rem;
        color: #666;
      }
    }
    &_icon {
      position: absolute;
      right: .16rem;
      top: .5rem;
      transform: rotate(180deg);
      color: #666;
      font-size: .2rem;
    }
  }
}
</style>
