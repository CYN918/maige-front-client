<template>
  <div class="wrap">
    <div class="content">
      <div class="title">
        <span>微信支付</span>
      </div>
      <div class="page">
        <div class="orderInfo">
          <span class="ordernumber">提交订单成功，请尽快付款！订单号：{{orderNo}}</span>
          <span class="money">应付金额<span class="red_word"> {{amount}} </span>元</span>
        </div>
        <div class="img_aggregate">
          <div class="ali_text">距离二维码过期还剩<span class="time"> {{payMinutes}} </span>分<span class="time"> {{paySeconds}} </span>秒，过期后请刷新页面重新获取二维码</div>
          <div class="erweima">
            <img :src="imgUrl" alt="">
            <div class="mask" v-if="refresh" @click="refreshQR">
              <i><img class="refresh" src="@/assets/images/payment/refresh.png" alt=""></i>
              <span class="tip">二维码已过期，请刷新重新获取</span>
            </div>
          </div>
          <div class="sao">
            <i class="iconfont icon-miaozhun" style="font-size:57px;"></i>
            <span class="text">请使用微信扫一扫扫描二维码支付</span>
          </div>
          <img class="wechatpay_home" src="@/assets/images/shopping_cart/wechatpay_home.png" alt="">
          <img class="wechatpay_scan" src="@/assets/images/shopping_cart/wechatpay_scan.png" alt="">
        </div>
      </div>
      <img class="background" src="@/assets/images/payment/payment_background2.png">
    </div>
  </div>
</template>

<script>
import { redEnvelopePayment } from '@/api/index'
import { parseUrl } from '@/assets/utils/utils'
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}
export default {
  name: 'Wechatpay',
  props: ['amount'],
  data() {
    return {
      refresh: false,
      payMinutes: 0,
      paySeconds: 0,
      imgUrl: '',
      orderNo: '',
      now: 0,
      timer: '',
      redEnvelopes:'',
      orderNo:''
    }
  },
 
  beforeDestroy() {
    clearInterval(this.timer)
  },
  async mounted() {
     const query = window.location.search
    const queryObj = parseUrl(query)
    const  redEnvelope = decodeURI(queryObj.obj)
    const redEnvelopes = JSON.parse(redEnvelope)
    this.redEnvelopes = redEnvelopes
    this.redEnvelopePayment(redEnvelopes)
  },
  computed:{
  },
  methods: {
    // 刷新二维码
    async refreshQR() {
       const redEnvelopes = this.redEnvelopes
      const res = this.redEnvelopePayment(redEnvelopes)
      if (res) {
        this.$emit('startQueryOrder')
      }
    },
    // 获取支付信息
    async redEnvelopePayment(redEnvelopes) {
      const res = await redEnvelopePayment(redEnvelopes)
      this.now  = Date.parse(new Date(res.data.createTime)) / 1000
      if (res.code === 200) {
        this.$emit('information',res.data)
        this.refresh = false
        this.orderNo = res.data.orderNo
        this.imgUrl = BASE_URL + '/api/open/c/b2b2c/orderservice/pay/qr_code.json?codeUrl=' + res.data.codeUrl
        this.expireTime = Date.parse(new Date(res.data.expireTime)) / 1000
        this.countDown(this.expireTime)
        return true
      }
      return false
    },
    // 二维码过期倒计时
    async countDown(expireTime) {
      let restTime = expireTime - this.now
      this.timer = setInterval(() => {
        restTime -= 1
        if (restTime >= 0) {
          this.payMinutes = Math.floor(restTime / 60);
          if (this.payMinutes < 10) {
            this.payMinutes = '0' + this.payMinutes
          }
          this.paySeconds = Math.floor(restTime % 60);
          if (this.paySeconds < 10) {
            this.paySeconds = '0' + this.paySeconds
          }
        } else {
          clearInterval(this.timer);
          this.$emit('stopQueryOrder')
          this.refresh = true
        }
      }, 1000);
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .toHome
    float right
    margin-right 52px
    font-size 14px
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
        .orderInfo
          padding 20px 30px
          margin-bottom 46px
          .ordernumber
            font-size:15px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:24px;
          .money
            font-size:15px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:24px;
            float right
            .red_word
              color #FF5E5E
              font-size 22px
        .img_aggregate
          position relative
          width 1158px
          height 758px
          background-color #fff
          margin 0 auto
          box-sizing border-box
          padding 0px 242px 25px 196px
          .ali_text
            width 321px
            color #999999
            font-size 14px
            &:nth-of-type(2)
              margin-top 10px
            .time
              color #ff2020
          .erweima
            position relative
            width 318px
            height 318px
            border 1px solid #D7E0F1
            box-sizing border-box
            margin-top 35px
            img
              width 100%
              height  100%
            .mask
              position absolute
              top 0
              width 100%
              height 100%
              background rgba(0, 0, 0, 0.3)
              cursor pointer
              .refresh
                display block
                width: 50%;
                height 50%
                margin 60px auto 20px
              .tip
                display block
                width 100%
                font-size 16px
                color #fff
                text-align center
          .sao
            width 319px
            height 88px
            background-color #4C86F4
            color #fff
            font-size 16px
            box-sizing border-box
            padding-top 16px
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
          .wechatpay_home
            width: 273px;
            height 520px
            position absolute
            right 242px
            top -12px
          .wechatpay_scan
            width 209px
            height 209px
            position absolute
            left 530px
            top 112px
        .buttom
          buttomStyle()

</style>
