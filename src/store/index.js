// import { createStore } from 'vuex'
import Vuex from 'vuex'
// 浏览器持久存储
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  //   // console.log(cartListString)
  localStorage.cartList = cartListString
}
//  获取本地存储数据
const getLocalCartList = () => {
  // cartList : {}
  // return {}
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}
export default Vuex.createStore({
  state: {
    // cartList 存放所有商店的所有商品信息
    // cartList:{
    // shopid 存放店铺id，
    // shopId:
    //    {
    //     showName: '沃尔玛',
    //     productList: {
    //       productId: {
    //         check:true,
    //         _id:'1',
    //         name:'潘茄250g/份'，
    //         count:2,
    //         sales:10,
    //         price:33.6,
    //         oldPrice:39.6
    //       }
    //     }

    // }
    cartList: getLocalCartList()
  },
  getters: {
  },
  // 处理数据逻辑方法
  mutations: {
    // 默认有个参数state
    // 改变购物车清单信息
    changeCartItemInfo (state, payload) {
      // console.log(payload)
      const { shopId, productId, productInfo } = payload
      // console.log(state.cartList?.[shopId])
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}// 在此处改变数据结构
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      // console.log(payload.num)
      // payload.num 1为加一 -1减一
      product.count = product.count + payload.num
      // 让商品处于选中状态
      if (payload.num > 0) { product.check = true }
      // 优化
      // (payload.num > 0) && (product.check = true)
      // &&造成短路，后面不执行
      if (product.count < 0) { product.count = 0 }
      shopInfo.productList[productId] = product
      state.cartList[shopId] = shopInfo
      // console.log(state.cartList)
      setLocalCartList(state)
    },
    // 改变店铺名称
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      console.log(shopName)
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },

    // 购物车单个商品改变选中状态
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      // console.log(product)
      product.check = !product.check
      setLocalCartList(state)
    },
    // 清空购物车
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    // 购物车信息选中状态
    setCartItemsChecked (state, payload) {
      const { shopId, allChecked } = payload
      const products = state.cartList[shopId].productList
      // console.log(allChecked)
      // products.check = !products.check
      if (products) {
        for (const key in products) {
          const product = products[key]
          // if (allChecked) {
          //   product.check = !allChecked
          // } else {
          //   product.check = !allChecked
          // }
          product.check = !allChecked
          // if (product.check === true) {
          //   product.check = !product.check
          // }
        }
      }
      setLocalCartList(state)
    },
    // 确认订单后清除购物车
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})
