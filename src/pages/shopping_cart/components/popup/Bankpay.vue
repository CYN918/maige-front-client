<template>
  <div class="wrap">
    <div class="content">
      <div class="title">银行卡支付</div>
      <div class="bank_info">
        <div class="info_top">
          <div class="info_left"></div>
          <div class="info_center">
            <div style="position:absolute;height:171px;width:100%;border-radius:20px 20px 0px 0px;">
              <img class="chip" src="@/assets/images/shopping_cart/chip.png" alt="">
              <img class="logo" src="@/assets/images/shopping_cart/logo.png" alt="">
              <div class="card_name">CARD NUMBER</div>
              <div class="card_no">1233 4554 7657 6512 123</div>
            </div>
            <div class="expl"></div>
            <span class="explre">EXPLRE</span>
          </div>
          <div class="info_right"></div>
        </div>
        <div class="info_body">
          <form action="">
            <div class="card_number">
              <span class="inpor">*</span>
              <span>银行卡号码: </span>
              <input class="num" type="text">
            </div>
            <div class="card_phone">
              <span class="inpor">*</span>
              <span>银行卡预留手机号码: </span>
              <input class="phone" type="text">
            </div>
            <div class="verification_num">
              <span class="inpor">*</span>
              <span>验证码: </span>
              <input class="verification" type="text">
              <div style="display:inline-block;width:103px;height:36px;border:1px solid rgba(86,143,249,1);font-size:14px;font-weight:400;color:rgba(93,147,250,1);text-algin:center;border-radius:50px;line-height:36px;text-align:center;cursor: pointer;" round>获取验证码</div>
            </div>
          </form>
        </div>
        <img src="@/assets/images/shopping_cart/info_bo.png" style="margin-top:16px;" alt="">
      </div>
      <div class="buttom">
        <el-button class="cancel" type="danger" @click="closePopup">取消</el-button>
        <el-button class="comfil" type="primary" @click="handlePay">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'bankpay',
  data() {
    return {
    }
  },
  methods: {
    //取消支付
    closePopup() {
      this.$router.push({path:'/confirmInform'})
    },
    // 确定支付
    handlePay() {
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
      width 620px
      height 656px
      background:rgba(235,244,254,1);
      box-shadow:0px 0px 18px 0px rgba(57,57,57,0.2)
      box-sizing border-box
      padding 17px 20px 13px 20px
      .title
        color #333333
        font-weight:400;
        font-size 16px
        margin-bottom 14px
        font-family MicrosoftYaHei
      .bank_info
        width 580px
        height 546px
        background-color #fff
        padding-top 27px
        box-sizing border-box
        .info_top
          height 232px
          position relative
          .info_left
            position absolute
            left 0px
            top 18px
            width:49px;
            height:196px;
            background:linear-gradient(97deg,rgba(125,170,255,1) 0%,rgba(59,123,246,1) 100%);
            opacity:0.5;
            border-radius:0px 20px 20px 0px
          .info_center
            width:423px;
            height:232px;
            border-radius:20px;
            background:linear-gradient(97deg,rgba(125,170,255,1) 0%,rgba(59,123,246,1) 100%);
            position absolute
            left 78px
            top 0px
            .chip
              position absolute
              right 0px
              top 0px
            .logo
              width 110px
              height 27px
              position absolute
              top 31px
              left 19px
            .card_name
              width:118px;
              height:11px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:10px;
              position absolute
              left 19px
              top 101px
            .card_no
              width:378px;
              height:15px;
              font-size:30px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:29px;
              position absolute
              left 19px
              top 136px
            .expl
              width:100%;
              height:61px;
              position absolute
              left 0px
              bottom 0px
              background:rgba(255,255,255,1);
              opacity:0.05;
              border-radius:0px 0px 20px 20px;
            .explre
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              line-height:10px;
              position absolute
              right 27px
              bottom 29px
          .info_right
            width:49px;
            height:196px;
            background:linear-gradient(97deg,rgba(125,170,255,1) 0%,rgba(59,123,246,1) 100%);
            opacity:0.5;
            border-radius:20px 0px 0px 20px;
            position absolute
            top 18px
            right 0px
        .info_body
          box-sizing border-box
          padding-top 64px
          .card_number
            cardInfo()
            .inpor
              width:6px;
              height:6px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,0,0,1);
            input
              width 400px
          .card_phone
            cardInfo()
            .inpor
              width:6px;
              height:6px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,0,0,1);
            input
              width 300px
          .verification_num
            cardInfo()
            .inpor
              width:6px;
              height:6px;
              font-size:14px;
              font-family:MicrosoftYaHei;
              font-weight:400;
              color:rgba(255,0,0,1);
            input
              width 325px
      .buttom
        margin-left 178px
        margin-top 14px
        .cancel
          width:96px;
          height:36px;
          background:rgba(245,108,108,1);
          border-radius:4px;
          color #fff
          font-size 16px
          line-height 7px
        .comfil
          width:96px;
          height:36px;
          background:rgba(74,153,250,1);
          border-radius:4px;
          color #fff
          font-size 16px
          line-height 7px
</style>
