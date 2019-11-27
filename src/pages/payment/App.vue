<template>
    <div>
      <router-view :amount="amount" :orderNo="orderNo" @stopQueryOrder="stopQueryOrder" @startQueryOrder="startQueryOrder"></router-view>
      <Footer></Footer>
    </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'
import { checkedPayStatus, reqPayInfo } from '@/api/index'
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
    console.log(this.paymode)   
    const data = await reqPayInfo(this.orderNo)
    this.imgUrl = BASE_URL + '/api/open/c/b2b2c/orderservice/pay/qr_code.json?codeUrl=' + data.data.codeUrl
    this.bizScene = data.data.bizScene
    this.payType = data.data.payType
    this.amount = data.data.goodsAmount
    if(this.amount === 0){
      console.log(this.amount)
    }else{
      this.reqPayInfo(this.orderNo)
    }
    
    this.checkedPayStatus(this.bizScene, this.orderNo, this.payType)
    this.expireTime = Date.parse(new Date(data.expireTime)) / 1000   
  
  },
  methods: {
    // 停止轮询
    stopQueryOrder() {
      clearInterval(this.timer)
    },
    // 开始轮询
    startQueryOrder() {
      this.checkedPayStatus(this.bizScene, this.orderNo, this.payType)
    },
    // 获取支付信息
    async reqPayInfo(orderNo) {  
        const res = await reqPayInfo(orderNo)
        if (res.code === 200) {
          return res.data
        }
        this.$message({
          type: 'error',
          message: res.message,
          duration: 4000,
        })       
    },
    // 检查支付状态
    async checkedPayStatus(bizScene, orderNo, payType) {
      const obj = {
        bizScene,
        orderNo,
        payType,
      }
      this.timer = setInterval(async () => {
        const res = await checkedPayStatus(obj)
        if (res.code === 200) {
          clearInterval(this.timer)
          /* const index = this.linkUrl.indexOf('?')
          if (index !== -1) {
            this.linkUrl = this.linkUrl.substring(0, index)
          } */
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
