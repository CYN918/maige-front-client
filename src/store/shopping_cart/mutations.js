export default {
  // 购物车列表
  handleTableData(state, tableData) {
    const tableData1 = []
    const tableData2 = []
    tableData.forEach((item) => {
      if (item.onSale === 0) {
        tableData2.push(item)
      } else {
        tableData1.push(item)
      }
    })
    state.tableData1 = tableData1
    state.tableData2 = tableData2
  },
  // 选中的购物车列表
  handleCheckedTableData(state, checkedTableData) {
    state.checkedTableData = checkedTableData
  },
  // 判断购物车的流程样式
  tofilladdress(state, n) {
    state.isSelect = n
  },
  handleCalcOrder(state, calcOrder) {
    state.calcOrder = calcOrder
  },
  // 订单商品信息
  handleGoodsInfo(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  },
  // 单地址信息
  handleSingleAddrss(state, singleAddress) {
    state.singleAddress = singleAddress
  },
  // 单地址信息
  handleMultipleAddrss(state, multipleAddress) {
    state.multipleAddress = multipleAddress
  },
  // 订单
  handleTotalOrderNo(state, totalOrderNo) {
    state.totalOrderNo = totalOrderNo
  },
  // 当前编辑地址
  handlecurrentEditAddress(state, currentEditAddress) {
    state.currentEditAddress = currentEditAddress
  },
  handleTotalPrice(state, totalPrice) {
    state.totalPrice = totalPrice
  },
  getTopTwoUserInfo(state) {
    state.userInfo = state.singleAddress.filter((item, index) => item.def || index <= 1)
  },
  // 省市区地址选择
  handleAddress(state, address) {
    state.address = address
  },
  // 多地址参数
  handleShippingAddressParams(state, shippingAddressParams) {
    state.shippingAddressParams = shippingAddressParams
  },
}
