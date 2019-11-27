<template>
  <div class="wrap">
    <div class="content">
      <div class="title">支付宝支付</div>
      <div class="img_aggregate">
        <div class="ali_text">重新获取二维码</div>
        <div class="erweima">
          <img src="@/assets/images/shopping_cart/alipay_QR.png" alt="">
        </div>
        <div class="sao">
          <i class="iconfont icon-miaozhun" style="font-size:57px;"></i>
          <span class="text">请使用支付宝扫一扫扫描二维码支付</span>
        </div>
        <img class="alipay_home" src="@/assets/images/shopping_cart/alipay_home.png" alt="">
        <img class="alipay_scan" src="@/assets/images/shopping_cart/alipay_scan.png" alt="">
      </div>
      <el-button class="buttom" @click="closePopup" type="danger">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alipay',
  data() {
    return {
      time: 60,
    }
  },
  mounted() {
    this.calcTime()
  },
  methods: {
    calcTime() {
      // setInterval(() => {
      //   this.time = this.time - 1
      //   if (this.time === 0) {
      //     window.location.reload()
      //     this.time = 60
      //   }
      // }, 1000)
    },
    closePopup() {
      this.$router.push({path:'/success'})
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .wrap
    popupWrap()
    z-index 999
    .content
      contentCenter()
      width 1000px
      height 714px
      background #EBF4FE
      padding 18px 0px 0px 20px
      .title
        font-size 16px
        color #333333
        font-weight 400
      .img_aggregate
        width 960px
        height 603px
        background-color #fff
        margin-top 15px
        box-sizing border-box
        padding 49px 125px 25px 98px
        position relative
        .ali_text
          width 321px
          color #999999
          font-size 14px
          &:nth-of-type(2)
            margin-top 10px
          .time
            color #ff2020
        .erweima
          width 318px
          height 318px
          border 1px solid #D7E0F1
          box-sizing border-box
          padding 14px 18px 20px 16px
          margin-top 35px
        .sao
          width 319px
          height 88px
          background-color #4C86F4
          color #fff
          font-size 16px
          box-sizing border-box
          padding-top 10px
          margin-top 27px
          .iconfont
            vertical-align middle
            margin-left 25px
            margin-right 30px
          .text
            display inline-block
            width 156px
            vertical-align middle
            line-height 24px
        .alipay_home
          width 273px
          height 520px
          position absolute
          right 125px
          top 58px
        .alipay_scan
          width 209px
          height 209px
          position absolute
          left 430px
          top 215px
      .buttom
        buttomStyle()

</style>
