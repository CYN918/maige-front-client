<template>
  <div class="wrap">
    <div class="content">
      <div class="title">订单支付</div>
      <div class="page">
        <div class="body_false">
          <div class="icon-wrap">
            <img src="@/assets/images/shopping_cart/failed.png" alt="">
          </div>
          <div class="left">
            <h3>支付失败</h3>
            <p>您的商品支付失败，请重新支付</p>
            <p>订单编号：{{orderNo}}</p>
            <p>在线支付：{{account}}元</p>
            <div class="btn-wrap">
              <button class="my-btn" @click="repay" >重新支付</button>
              <button @click="backToHome" class="my-btn">返回首页</button>
            </div>
          </div>
        </div>
      </div>
      <img class="background" src="@/assets/images/payment/payment_background2.png">
    </div>
  </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'

export default {
  name: 'payFailed',
  props: ['account', 'orderNo'],
  data() {
    return {
      showpay: null,
    }
  },
  created() {
    let isSelect = null
    isSelect = sessionStorage.getItem('navigation_bar')
    if (isSelect === 4) {
      this.$store.commit('tofilladdress', 4)
    }
    this.getShowpay()
  },
  methods: {
    // 重新支付
    repay() {
      const query = window.location.search
      const queryObj = parseUrl(query)
      const paymode = queryObj.paymode
      let page = ''
      if (paymode === 1) {
        page = '/alipay'
      } else if (paymode === 2) {
        page = '/'
      }
      let href = window.location.href
      const index = href.indexOf('#')
      if (index !== -1) {
        href = href.substring(0, index)
      }
      window.location.href = href + '#' + page
    },
    // 回到首页
    backToHome() {
      this.$store.commit('tofilladdress', 1)
      window.location.href = 'index.html'
    },
    getShowpay() {
      // $store.state.payment
      this.showpay = sessionStorage.getItem('payment_method')
    },

  },

}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  @import "~styles/varibles.styl"
  .wrap
    padding-top: 154px;
    background url("../../../assets/images/payment/payment_background.png") no-repeat
    background-size 100% 934px;
    .content
      position relative
      width 1200px
      height 820px
      background #EBF4FE
      margin 0 auto
      margin-bottom 140px
      box-sizing border-box
      .background
        height: 379px;
        position: absolute;
        width: 1264px;
        bottom: -60px;
        left: -64px;
      .title
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:62px;
        padding-left 24px
      .page
        width 1158px
        height 758px
        background-color #fff
        margin 0 auto
        .body_false
          display flex
          align-items center
          contentCenter()
          .icon-wrap
            width 298px
            height 246px
            margin-right 12px
            img
              width 100%
              height 100%
              margin-top -20px
          .left
            h3
              font-size 40px;
              color #FF3535
              margin-bottom 27px
            p
              font-size:16px;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:24px;
            .btn-wrap
              margin-top 36px
              width 300px
              .my-btn
                position relative
                height:40px;
                background:$btnColor
                border-radius:5px;
                padding 0 34px
                margin-right 18px
                font-size 14px
                color #fff
                cursor pointer
              .m-btn:active
                top 2px
</style>
