export default {
  // 加载状态
  handleLoading(state) {
    state.loading = false
  },
  // 展示商品
  handleProList(state, proList) {
    state.proList = proList
  },
  // 商品总数
  handleTotal(state, total) {
    state.total = total
  },
  // 当前商品的catId
  handleCatId(state, catId) {
    state.catId = catId
  },
  // 商品类别显示
  proClassication(state, proClassication) {
    state.proClassication = proClassication
  },
  // 探索条件
  hanldeConditions(state, conditions) {
    state.conditions = conditions
  },
  // 商品名
  hanldeGoodsName(state, goodsName) {
    state.goodsName = goodsName
  },
}
