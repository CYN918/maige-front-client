<template>
  <div class="wrap">
    <div class="content">
      <div class="title">订单支付</div>
      <div class="page">
        <div class="body">
          <div class="icon-wrap">
            <img src="@/assets/images/shopping_cart/succeed.png" alt="">
          </div>
          <div class="left">
            <h3>支付成功</h3>
            <p>您的包裹正在整装待发</p>
            <p>订单编号：{{orderNo}}</p>
            <p>在线支付：{{amount}}元</p>
            <div class="btn-wrap">
              <button class="my-btn" @click="checkOrder">查看订单</button>
              <button class="my-btn" @click="backToHome">返回首页</button>
            </div>
          </div>
        </div>
      </div>
      <img class="background" src="@/assets/images/payment/payment_background2.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'paySucceed',
  data() {
    return {
      
    }
  },
  props: ['amount', 'orderNo'],
  created(){
    

  },
  methods: {
    // 查看订单
    checkOrder() {
      window.location.href = 'person_center.html#/orderCenter/myorder'
    },
    // 回到首页
    backToHome() {
      window.location.href = 'index.html'
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
        .body
          display flex
          align-items center
          width 530px
          height 192px
          contentCenter()
          top 48%
          .icon-wrap
            width 176px
            height 157px
            margin-right 64px
          .left
            h3
              font-size:40px;
              color:$btnColor;
              margin-bottom 27px
            p
              font-size:16px;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:24px;
            .btn-wrap
              margin-top 36px
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
              .my-btn:active
                top 2px
</style>
