<template>
  <div ref="container">
    <div class="colorbar"></div>
    <div class="shop_cart">
      <div class="operation clearfix">
        <el-button type="primary" @click="deleteMany">批量删除</el-button>
        <el-button type="primary" @click="addProduct">添加商品</el-button>
      </div>
      <div class="cart_table">
        <order-table @changeShoppingcartNum="changeShoppingcartNum"></order-table>
      </div>
      <div class="go_settlement clearfix" ref="button">
        <el-button class="right" style="margin-left:20px;width:157px;height:59px;font-size:20px;background:#409EFF;" type="primary" @click="goSettlement">
          去结算
        </el-button>
        <div class="right">
          <div class="good_total">商品总共{{num}}件, 总价:</div>
          <div class="price_total">{{totalPrice.toFixed(2)}}元</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
@import "~styles/myordertable.styl"
    .fixed
      position fixed
      z-index 99
      bottom 0
    .colorbar
      width 300px
      height 20px
      background white
    .link
      color #fff
    .shop_cart
      padding 32px 23px 30px 22px
      background-color #fff
      .operation
          .right
              float right
      .cart_table
          margin-top 20px
      .go_settlement
          padding: 10px 20px 0 0;
          margin-top 20px
          background-color #F7FBFF
          box-sizing border-box
          width 1200px
          .right
              padding: 20px;
              float right
              .good_total
                  display inline-block
                  vertical-align bottom
              .price_total
                  display inline-block
                  font-size 30px
                  color #FE0000
                  font-family MicrosoftYaHei
                  vertical-align bottom
</style>

<script>
import { mapState, mapActions } from 'vuex'
import { deleteShop } from '@/api/index'
import orderTable from '../popup/orderTable'
import { throttleTipPop } from '@/assets/utils/utils'

export default {
  name: 'shopcart',
  components: {
    orderTable,
  },
  data() {
    return {
      input: '',
      scrollTop: 0,
      top: 0,
      fixNum: 450,
    }
  },
  created() {
    this.isShow = true
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll, true)
    })
  },
  watch: {
    tableData(newVal) {
      this.top = this.$refs.container && this.$refs.container.offsetHeight
      if (newVal.length === 0) {
        this.top = 351
        this.$refs.button.classList.remove('fixed')
      }
    },
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  computed: {
    ...mapState(['checkedTableData', 'totalPrice', 'tableData']),
    cartIds() {
      let ids = ''
      this.checkedTableData.forEach((item, index) => {
        if (index !== this.checkedTableData.length - 1) {
          ids = ids + item.cartId + ','
        } else {
          ids += item.cartId
        }
      })
      return ids
    },
    num() {
      return this.checkedTableData.length
    },
  },

  methods: {
    ...mapActions(['queryShop']),
    // 控制滑动限制按钮的最底部位子
    handleScroll() {
      const top = this.$refs.container && this.$refs.container.offsetHeight
      if (top > this.top) {
        this.top = top
      }
      const dom = document.documentElement
      this.scrollTop = dom.scrollTop
      if (this.$refs.button && this.scrollTop > this.top - this.fixNum) {
        this.$refs.button.classList.remove('fixed') // 不悬浮
      } else if (this.$refs.button) {
        this.$refs.button.classList.add('fixed') // 悬浮
      }
    },
    changeShoppingcartNum() {
      this.$emit('changeShoppingcartNum')
    },
    // 得新计算选中的商品列表
    async updataPrice() {
      await this.queryShop()
      let totalPrice = 0
      this.checkedTableData.forEach((item, index) => {
        this.$refs.table.toggleRowSelection(this.checkedTableData[index], true)
        totalPrice += (item.specialPrice * item.quantity)
      })
      this.$store.commit('handleTotalPrice', totalPrice)
    },
    async deleteMany() {
      // 批量删除
      if (this.cartIds) {
        this.$confirm('此操作将从购物车删除所选中商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await deleteShop(this.cartIds)
          if (res.code === 200) {
            await this.updataPrice()
            this.$emit('changeShoppingcartNum')
            this.$message({
              type: 'success',
              message: '删除成功!',
            });
          } else {
            this.$message.error('删除失败!')
          }
        })
      } else {
        throttleTipPop(this, 'error', '请选择您要删除的商品!')
      }
    },
    addProduct() {
      window.location.href = 'product_list.html?catId=1&parentId=1&index=0'
    },
    goSettlement() {
      // 如果购物车没有商品
      if (this.checkedTableData.length === 0) {
        this.$alert('您还没有选中任何商品', '温馨提示', {
          confirmButtonText: '确定',
        })
        return
      }
      this.$router.push({ path: '/address' })
    },
  },
}
</script>

