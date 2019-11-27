<template>
    <div>
      <router-view :amount="amount" :orderNo="orderNo" @information ="information"  @stopQueryOrder="stopQueryOrder" @startQueryOrder="startQueryOrder"></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'
import { paymentStatus } from '@/api/index'
import TopNav from '../common/TopNav'
import Footer from '../common/Footer'
import Wechatpay from './components/Wechatpay'
import Alipay from './components/Alipay'

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

export default {
  name: 'navigation_Page',
  data() {
    return {
      paymode: 0,
      imgUrl: '',
      expireTime: '',
      amount: 0,
      orderNo: '',
      timer: '',
      bizScene: '',
      payType: '',
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  async created() {
    const query = window.location.search
    const queryObj = parseUrl(query)
    this.orderNo = queryObj.orderNo
    this.paymode = parseInt(queryObj.paymode, 10)
    const  redEnvelope = decodeURI(queryObj.obj)
    const redEnvelopes = JSON.parse(redEnvelope)
    this.amount = queryObj.redPacketValue  
    this.expireTime = Date.parse(new Date(res.data.expireTime)) / 1000
  },
  methods: {
    information(res){
       this.bizScene = res.bizScene
       this.orderNo =  res.orderNo
       this.payType = res.payType
       this.paymentStatus(this.bizScene, this.orderNo,this.payType)
    },
    // 停止轮询
    stopQueryOrder() {
      clearInterval(this.timer)
    },
    // 开始轮询
    startQueryOrder() {
      this.paymentStatus(this.bizScene, this.orderNo, this.paymode)
    },
    // 获取支付信息
    // async redEnvelopePayment(obj) {
    //   const res = await redEnvelopePayment(obj)
    //   if (res.code === 200) {
    //     return res
    //   }
    //   this.$message({
    //     type: 'error',
    //     message: res.message,
    //     duration: 4000,
    //   })
    // },
    // 检查支付状态
    async paymentStatus(bizScene, orderNo, payType) {
      const obj = {
        bizScene,
        orderNo,
        payType,
      }
      this.timer = setInterval(async () => {
        const res = await paymentStatus(obj)
        if (res.code === 200) {
          clearInterval(this.timer)
          let href = window.location.href
          const index = href.indexOf('#')
          if (index !== -1) {
            href = href.substring(0, index)
          }
          window.location.href = href + '#/success'
        } else if (res.code === 1004) {
          clearInterval(this.timer)
          let href = window.location.href
          const index = href.indexOf('#')
          if (index !== -1) {
            href = href.substring(0, index)
          }
          window.location.href = href + '#/failure'
        }
      }, 1000)
    },
  },
  components: {
    TopNav,
    Footer,
    Wechatpay,
    Alipay,
  },
}
</script>

<style scoped>

</style>
