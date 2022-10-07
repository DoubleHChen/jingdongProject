import { useStore } from 'vuex'
import { computed } from 'vue'
// import { toRefs } from 'vue'
// 使用购物车的功能
export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  // const { cartList } = toRefs(store.state)
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    // 同步修改store中的数据
    store.commit('changeCartItemInfo', {
      // commit在vuex里面添加数据 把当前括号内的数据传给store里面的mutations里的changeCartItemInfo函数
      shopId,
      productId,
      productInfo,
      num
    })
  }
  // 商品数量计算属性
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    // 过滤，把购物车中数量等于0的过滤掉
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    // console.log(productList)
    return notEmptyProductList
  })
  // 店铺名称
  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  // 计算属性
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    // total商品数量 price  商品总金额 allChecked 全选按钮判断
    const result = { total: 0, price: 0, allChecked: true }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.total += product.count
        // console.log(product)
        if (product.check) {
          result.price += product.count * product.price
        }
        if (product.count > 0 && !product.check) {
          result.allChecked = false
        } else {
          result.allChecked = true
        }
      }
    }
    result.price = result.price.toFixed(2) // 保留两位小数点
    return result
  })
  return { cartList, changeCartItemInfo, productList, shopName, calculations }
}
