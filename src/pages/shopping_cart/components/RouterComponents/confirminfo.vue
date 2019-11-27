<template>
    <div>
      <div class="colorbar"></div>
      <div>
        <div class="basic_info">
          <div class="basic_header">
            <div class="header_top">
              <span class="kuai"></span>
              <div class="text">基本信息</div>
            </div>
          </div>
          <div class="basic_body">
            <div class="left"><i class="iconfont icon-dui" style="font-size:64px;color:#4A99FA;"></i></div>
            <div class="right">
              <div class="confirm_time" v-if="payStatus === 0">
                订单已确定,请在<span class="min">60</span>分钟内付款,否则订单会自动取消 <span class="time">{{payMinutes}}</span>分 <span class="time">{{paySeconds}}</span>秒
              </div>
              <div v-else-if="payStatus === 1">
                <span class="min">订单正在支付中</span>
              </div>
              <div v-else-if="payStatus === 2">
                <span class="min">订单已支付成功</span>
              </div>
              <div class="order_info">
                <div>订单编号:{{totalOrderNo}}</div>
                <div>支付金额:{{orderData.amount}}元</div>
                <p class="addressInfo" v-if="!!orderData.addressInfo" :title="orderData.addressInfo">收货地址:{{orderData.addressInfo}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="detail_info">
          <div class="detail_header">
            <div class="header_top">
              <span class="kuai"></span>
              <div class="text">详细信息</div>
            </div>
          </div>
          <div class="detail_table">
            <div class="margin" style="margin-top:17px;border:1px solid #EBEEF5">
              <div class="mcard othertable">
                <Beshipped :orderList="orderList"></Beshipped>
              </div>
            </div>
          </div>
          <div class="go_pay clearfix" v-if="payStatus === 0">
            <div class="right">
              <span class="nub">商品共计{{orderList.length}}件,总价:</span>
              <span class="price">{{orderData.amount}}元</span>
              <div @click="immediatePayment" class="buttom">立即支付</div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        title="支付提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <i class="el-icon-warning-outline" style="color: #409EFF; font-size: 24px;"></i>
        <span style="position: relative; top: -4px; margin-left: 6px;">支付完成后，请根据您支付的情况点击下面按钮</span>
        <span slot="footer" class="dialog-footer">
          <el-button  type="danger" size="small" @click="handleMeetProblem">支付遇到问题</el-button>
          <el-button type="primary" size="small" @click="handleCompleteOrder">支付完成</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<style lang="stylus" scoped>
    @import "~styles/myordertable.styl"
    @import "~styles/cart_header.styl"
    @import "~styles/varibles.styl"
    @import "~styles/mixins.styl"
    .addressInfo
      width 350px
      ellipsis2()
      display block
      padding-top 22px
      font-family MicrosoftYaHei
      font-size 16px
      color #999
    .min
      font-size 40px
      color $btnColor
    .colorbar
      position relative
      left 627px
      width 273px
      height 20px
      background white
    .basic_info
        background-color #fff
        padding-bottom 27px
        .basic_body
            padding-top 55px
            display flex
            .left
                width 120px
                display flex
                justify-content center
            .right
                flex 1
                .confirm_time
                    font-size 16px
                    color #929292
                    font-family MicrosoftYaHei
                    border-bottom 1px dashed #999
                    padding-bottom 32px
                    margin-right 39px
                    .min
                        font-size 40px
                        color $btnColor
                    .time
                        font-size 30px
                        color $btnColor
                .order_info
                    div
                        padding-top 22px
                        font-family MicrosoftYaHei
                        font-size 16px
                        color #999
    .detail_info
        background-color #fff
        padding-bottom 27px
        .detail_table
            padding 32px 27px 61px 38px
        .go_pay
            background-color #F7FAFF
            margin 0px 27px 0px 32px
            .right
                height 59px
                line-height center
                float right
                .price
                    color #FE0000
                    font-size 30px
                    font-family MicrosoftYaHei
                .buttom
                    display inline-block
                    background-color $btnColor
                    width 157px
                    height 59px
                    color #fff
                    font-size 20px
                    text-align center
                    line-height 59px
                    cursor pointer
                    margin-left 38px


</style>

<script>
import { reqOrderDetail, autoCancelOrder, updatePayStatus } from '@/api/index'
import { handleCrypt } from '@/assets/utils/utils'
import Beshipped from '../popup/beshipped';
let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

export default {
  name: 'confirminfo',
  data() {
    return {
      dialogVisible: false,
      nowTime: 0,
      payStatus: 0,
      test: '',
      paymode: null,
      orderData: [],
      orderList: [],
      orderTime: 0,
      totalOrderNo: '',
      form: {
        current_page: 1,
        page_size: 10,
        total_count: 0,
      },
      iSelect: true,
      payMinutes: null,
      paySeconds: null,
      remainTime: 3600,
    };
  },
  components: {
    Beshipped,
  },
  async created() {
    // 获取订单详情
    this.totalOrderNo = localStorage.getItem('totalOrderNo')
    const res = await reqOrderDetail(this.totalOrderNo)
    if (res.code === 200) {
      this.orderData = res.data
      // this.orderList = res.data.orderDetails[0].orderGoodsList
      res.data.orderDetails.forEach((item) => {
        // console.log(this.orderList.concat(item.orderGoodsList))
        this.orderList = this.orderList.concat(item.orderGoodsList)
      })
      const createTime = this.orderData.orderDetails[0].createTime
      this.payStatus = this.orderData.orderDetails[0].payStatus
      this.orderTime = Date.parse(new Date(createTime)) / 1000
      this.nowTime = Math.floor(this.orderData.currentTimeMillis / 1000)
    }
    this.countDown();
    this.getNavBar();
  },
  methods: {
    // 关闭支付弹窗
    handleClose() {

    },
    // 支付遇到问题
    handleMeetProblem() {
      this.dialogVisible = false
      window.location.href = 'navigation_page.html?index=1#/PaymentMethod'
    },
    // 订单完成
    handleCompleteOrder() {
      this.dialogVisible = false
      window.location.reload()
    },
    // 立即支付
    async immediatePayment() { 
        // 支付方式
        switch (this.orderData.payCode) {
          case 'alipay_qr':
            this.paymode = 1
            break
          case 'wxpay_native':
            this.paymode = 2
            break
          default :
            this.paymode = null
        }
        if(this.orderData.amount === 0){
          const res = await updatePayStatus(this.totalOrderNo)
          if(res.code == 200){
            const orderNo = this.orderData.orderNo
            let url = window.location.href
            url = handleCrypt.encrypt(url)
            const linkUrl = 'payment.html?redirect=' + url + '&paymode=' + this.paymode + '&orderNo=' + orderNo + '#/success'
            if (this.paymode === 1) {
              window.open(linkUrl + '#/alipay')
            } else if (this.paymode === 2) {
              window.open(linkUrl)
            }
            this.dialogVisible = true  
          }
      }else{
        const orderNo = this.orderData.orderNo
        let url = window.location.href
        url = handleCrypt.encrypt(url)
        const linkUrl = 'payment.html?redirect=' + url + '&paymode=' + this.paymode + '&orderNo=' + orderNo
        if (this.paymode === 1) {
          window.open(linkUrl + '#/alipay')
        } else if (this.paymode === 2) {
          window.open(linkUrl)
        }
        this.dialogVisible = true
      }  
    },
    closePopup() {
      this.paymode = null
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return [1, 9];
      }
      return [0, 0];
    },
    // 自动取消订单倒计时
    async countDown() {
      let restTime = this.orderTime + 3600 - this.nowTime
      const timer = setInterval(() => {
        restTime -= 1
        if (restTime > 0) {
          this.payMinutes = Math.floor(restTime / 60);
          if (this.payMinutes < 10) {
            this.payMinutes = '0' + this.payMinutes
          }
          this.paySeconds = Math.floor(restTime % 60);
          if (this.paySeconds < 10) {
            this.paySeconds = '0' + this.paySeconds
          }
        } else {
          clearInterval(timer);
          this.deleteOrder()
        }
      }, 1000);
    },
    // 删除订单
    async deleteOrder() {
      const res = await autoCancelOrder(this.totalOrderNo)
      if (res.code === 200) {
        this.$message('订单已取消')
        setTimeout(() => {
          window.location.href = 'index.html'
        }, 2000)
      }
    },
    getNavBar() {
      let isSelect = null;
      isSelect = sessionStorage.getItem('navigation_bar');
      if (isSelect === 3) {
        this.$store.commit('tofilladdress', 3);
      }
    },
  },
};
</script>
