<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item,index) in list" :key="index">
        <div class="order_title">{{item.shopName}}
          <span class="order_state">{{ item.isCanceled ? '已取消' : '已下单'}}</span>
        </div>
        <div class="order_content">
          <div class="order_content_imgs">
            <template v-for="(innerItem,innerIndex) in item.products" :key="innerIndex">
              <img :src="innerItem.product.img" alt="" class="order_content_img" v-if="innerIndex<=3">

            </template>
          </div>
          <span class="order_content_info">
            <div class="order_content_price">￥ {{ item.totalPrice}}</div>
            <div class="order_content_count">共 {{ item.totalNumber}} 件</div>
          </span>
        </div>
      </div>
    </div>
  </div>
  <Decker :currentIndex="2" />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { get } from '../../utils/request'
import Decker from '@/components/Decker'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order.products || []
        let totalPrice = 0 // 每一个商品数量
        let totalNumber = 0 // 每一个商品金额
        products.forEach((productItem) => {
          totalNumber += productItem.orderSales || 0
          totalPrice += productItem.product.price * productItem.orderSales || 0
        })
        order.totalPrice = totalPrice
        order.totalNumber = totalNumber
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}
// 处理订单列表逻辑
export default {
  name: 'OrderList',
  components: { Decker },
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  background: #fafafa;
  right: 0;
}
.title {
  line-height: .44rem;
  text-align: center;
  background: #fff;
  font-size: .16rem;
  color: #333;
}
.orders {
}
.order {
  margin: .16rem .16rem;
  padding: .16rem;
  background: #fff;
  &_title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: #333;
  }
  &_state {
    float: right;
    font-size: .14rem;
    color: #999;
  }
  &_content {
    display: flex;
    &_imgs {
      flex: 1;
    }
    &_img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }
    &_info {
      width: .7rem;
    }
    &_price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: #e93b3b;
      text-align: right;
    }
    &_count {
      line-height: .14rem;
      font-size: .12rem;
      color: #333;
      text-align: right;
    }
  }
}
</style>
