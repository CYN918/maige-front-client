import { queryShop, calcOrder } from '@/api/index'

export default {
  // 获取购物车列表
  async queryShop({ commit }) {
    const res = await queryShop()
    const checkedTableData = res.data.filter(item => item.checked === 1 && item.onSale === 1)
    commit('handleTableData', res.data)
    commit('handleCheckedTableData', checkedTableData)
  },
  // 请求订单信息及地址信息
  async getCalcOrder({ commit }, obj) {
    const res = await calcOrder(obj)
    if (res.code === 200) {
      commit('handleCalcOrder', res.data)
      // 单地址信息
      const singAddress = res.data.shippingAddress ? res.data.shippingAddress.filter(item => item.addressType === 0) : []
      commit('handleSingleAddrss', singAddress)
      const multipleAddress = res.data.shippingAddress ? res.data.shippingAddress.filter(item => item.addressType === 1) : []
      commit('handleMultipleAddrss', multipleAddress)
    }
  },
}
