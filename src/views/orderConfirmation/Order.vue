<template>
  <div class="order">
    <div class="order_price">实付金额 <b>￥{{calculations.price}}</b></div>
    <div class="order_btn" @click="() => handleShowConfirmChange(true)">提交订单</div>
  </div>
  <div class="mask" v-show="showConfirm" @click="() => handleShowConfirmChange(false)">
    <div class="mask_content" @click.stop>
      <h3 class="mask_content_title">确认离开收银台吗?</h3>
      <p class="mask_content_desc">请尽快完成支付，否则将被取消</p>
      <div class="mask_content_btns">
        <div class="mask_content_btn mask_content_btn-first" @click="() => handleConfirmOrder(true)">取消订单</div>
        <div class="mask_content_btn mask_content_btn-last" @click="() => handleConfirmOrder(false)">确认支付</div>
      </div>
    </div>
  </div>
  <ToAst v-show="show" :message="toastMessage" />
</template>
<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '@/effects/cartEffects'
import { post } from '../../utils/request'
import ToAst, { useToastEffect } from '@/components/ToAst'

// 下单逻辑
const userMaskOrderEffect = (shopId, shopName, productList) => {
  const router = useRouter()
  const store = useStore()
  const { showToast, show, toastMessage } = useToastEffect()
  const handleConfirmOrder = async (isCanceled) => {
    const products = []
    for (const i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        isCanceled,
        products
      })
      if (result?.errno === 0) {
        store.commit('clearCartData', shopId)
        router.push({ name: 'OrderList' })
      } else {
        showToast('下单失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  return { handleConfirmOrder, show, toastMessage }
}
// 蒙层
const useShowMaskEffect = () => {
  const showConfirm = ref(false)
  const handleShowConfirmChange = (state) => {
    showConfirm.value = state
  }
  return { handleShowConfirmChange, showConfirm }
}
export default {
  name: 'Order',
  components: { ToAst },
  // eslint-disable-next-line space-before-function-paren
  setup() {
    const route = useRoute()

    const shopId = parseInt(route.params.id, 10)
    const { calculations, productList, shopName } = useCommonCartEffect(shopId)
    const { handleConfirmOrder, show, toastMessage } = userMaskOrderEffect(shopId, shopName, productList)
    const { handleShowConfirmChange, showConfirm } = useShowMaskEffect()
    return {
      calculations,
      handleConfirmOrder,
      show,
      toastMessage,
      showConfirm,
      handleShowConfirmChange
    }
  }
}
</script>
<style lang="scss" scoped>
.order {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  height: .49rem;
  line-height: .49rem;
  background: #fff;
  &_price {
    flex: 1;
    text-indent: .24rem;
    font-size: .14rem;
    color: #333;
  }
  &_btn {
    width: .98rem;
    background: #4fb0f9;
    color: #fff;
    text-align: center;
  }
}
.mask  {
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0,0,0,.5);
  &_content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 3rem;
    height: 1.56rem;
    background: #fff;
    border-radius: .04rem;
    &_title {
      margin: .24rem 0 0 0;
      line-height:.26rem;
      font-size: .18rem;
      color: #333;
      text-align: center;
    }
    &_desc {
      margin: .08rem 0 0 0;
      font-size: .14rem;
      text-align: center;
      color: #666;
    }
    &_btns {
      text-align: center;
      margin: .24rem .58rem;
      display: flex;
    }
    &_btn {
      flex: 1;
      width: .8rem;
      line-height: .32rem;
      border-radius: .16rem;
      font-size: .14rem;
      &-first {
        margin-right:.12rem;
        border: .01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      &-last {
        margin-left:.12rem;
        background-color: #4fb0f9;
        color: #fff;
      }
    }
  }

}
</style>
