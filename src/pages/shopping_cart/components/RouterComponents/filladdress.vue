<template>
  <div>
    <div class="colorbar"></div>
    <div>
      <div class="choose_address">
        <div class="choose_header clearfix">
          <div class="header_top" style="display:inline-block;">
            <span class="kuai"></span>
            <div class="text">单地址选择</div>
          </div>
          <div class="buttom" style="float:right; margin-top:16px;margin-right:20px;">
            <el-button type="primary" class="button" style="height:32px;line-height:0px;font-size:14px; position: relative"
                       @click="showMoreAddress = true">查看更多地址
            </el-button>
          </div>
        </div>
        <div class="choose_body">
          <ul class="clearfix" style="height: 226px;">
            <li v-for="(item, index) in userInfo" :key="item.addressId">
              <div :class="{'bor':true,'bor_active':chooseAddress === index}">
                <div class="user_info" @click.stop="selectAddress(item.addressId, index)">收货人信息</div>
                <div style="color:#4A99FA;display:inline-block;position: absolute; right:18px; top: 14px" >
                  <el-button type="text" v-if="index === 0">默认地址&nbsp;&nbsp; |</el-button>
                  <el-button type="text" v-else @click="setDefaultAddress(item)">设为默认&nbsp;&nbsp; |</el-button>
                  <el-button @click.stop="editaddress(item)" type="text">编辑</el-button>&nbsp;&nbsp; |
                  <el-button type="text" @click.stop="deleteAddress(item.addressId, index)">删除</el-button>
                </div>
                <div class="info" @click.stop="selectAddress(item.addressId, index)">
                  <div class="user_name" :title="`${item.consignee} | ${item.phone} `" style="padding-bottom:15px;">{{item.consignee}} | {{item.phone}}</div>
                  <div class="user_address" :title="`${item.provinceName}${item.cityName}${item.districtName}${item.townName}`">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.townName}}</div>
                  <div class="user_address" :title="`${item.address}`">{{item.address}}</div>
                </div>
                <div v-show="chooseAddress === index" class="is_select">
                  <div class="gou"></div>
                </div>
              </div>
              <div class="partition"></div>
            </li>
            <aditaddress v-if="showAditaddress" @edAddress="hideAddress"></aditaddress>
          </ul>
          <div class="addaddress el-icon-plus" @click="handleShowPopup">
            <div class="use_new">使用新地址</div>
          </div>
        </div>
      </div>
      <!--多地址-->
      <manyaddress :multipleTableData="multipleTableData" @multipleTableDataChange="multipleTableDataChange"></manyaddress>
      <div class="confirm_good">
        <div class="confirm_header">
          <div class="header_top">
            <span class="kuai"></span>
            <div class="text">确认商品</div>
          </div>
        </div>
        <div class="confirm_table">
          <confirm-table></confirm-table>
        </div>
        <div class="inputWrap" style="margin: 0 36px 36px;">
          <span style="color: #999">留言：</span>
          <input type="text" @blur="handleBlur" v-model="orderRemarks" placeholder="" style="width: 367px;height: 34px;border: 1px solid #d7e0f1;border-radius: 5px;-webkit-box-sizing: border-box;box-sizing: border-box;padding: 0 6px;">
        </div>
        <p v-show="showTip" style="color: red; position: relative;top: -28px;left: 82px;">留言字数请不要超过200字</p>
      </div>
      <div class="paymentinfo">
        <div class="pay_header">
          <div class="header_top">
            <span class="kuai"></span>
            <div class="text">支付信息</div>
          </div>
        </div>
        <div class="par_body">
          <div class="paymode">
            <i class="iconfont icon-fukuan"
               style="font-size:29px;color:#409EFF;display:inline-block;vertical-align:middle"></i>
            <span class="mode">支付方式</span>
            <div v-for="(item,index) of paymode" :key="index" :class="{'pay':true,active:zhifupay == index}"
                 @click="payment_method(item, index)">{{item.payType}}
            </div>
          </div>
          <div class="paymode">
            <i class="iconfont icon-jifen1"
               style="font-size:29px;color:#409EFF;display:inline-block;vertical-align:middle"></i>
            <span class="mode">积分兑换</span>
            <div class="deduction"  v-for="(item,index) of exchanges" :key="index" @click="jifenpay(index,item)">               
                  <img :src="item.accountLogo" v-show="jifen !== index" alt="">
                  <img :src="item.accountLogo" v-show="jifen == index" alt="">
                  <div class="right">
                    <div class="deduct_text">{{item.accountName}}</div>
                    <span style="color:#999999;">余额: </span>
                    <span :class="{'price':jifen == index}">{{item.balanceCount}}</span>
                  </div>
            </div>
            <!-- <div class="noexchange">当前可用积分</div> -->

          </div>
          <div class="paymode">
            <i class="iconfont icon-jifen1"
               style="font-size:29px;color:#409EFF;display:inline-block;vertical-align:middle"></i>
            <span class="mode">专属费用</span>
            <div style="display:inline-block;vertical-align:middle;">
              <div class="deduction" v-for="(item,index) in costlist" :key="index" @click="selectDeduct(index,item)">
                <img :src="item.accountLogo" v-show="selectDe !== index" alt="">
                <img :src="item.accountLogo" v-show="selectDe == index" alt="">
                <div class="right">
                  <div class="deduct_text">{{item.accountName}}</div>
                  <span style="color:#999999;">余额: </span>
                  <span :class="{'price':selectDe == index}">{{item.balanceCount}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="paymode">
            <i class="iconfont icon-jifen1"
               style="font-size:29px;color:#409EFF;display:inline-block;vertical-align:middle"></i>
            <span class="mode" style="margin-right:15px;">优惠券</span>
            <div v-for="(item,index) of exchange" :key="index" :class="{'pay':true,'active':youhui == index,}"
                 @click="youhuipay(index)">{{item}}
            </div>
            <div class="noexchange">当前可用优惠券<span class="discount"> 满 300 减 3 </span>元</div>
          </div>
          <div class="paymode">
            <i class="iconfont icon-jifen1"
               style="font-size:29px;color:#409EFF;display:inline-block;vertical-align:middle"></i>
            <span class="mode">红包使用</span>
            <div v-for="(item,index) of exchange" :key="index" :class="{'pay':true,'active':hongbao == index,}"
                 @click="hongbaopay(index)">{{item}}
            </div>
            <div class="noexchange">当前可用红包<span class="discount"> 满 300 减 3 </span>元</div>
          </div>
          <div class="tips">
            *积分和优惠劵、红包、专属费用不能同时使用 !  &nbsp;&nbsp;&nbsp; *专属费用可以同优惠劵或红包同时使用 !
          </div>
          <div class="goodprice clearfix">
            <div class="right">
              <div style="margin-right:20px;">
                <span class="goodnub">{{goodsInfo.length}}</span>
                <span class="text"> 件商品，总商品金额 :</span>
                <span class="price">{{calcOrder.goodsAmount}}</span>
              </div>
              <div class="freight">
                <span>运费 :</span>
                <span class="price">￥{{calcOrder.shippingFee}}</span>
              </div>
              <div class="freight" style="margin-left: 70px;">
                <span>已使用积分 :</span>
                <span class="price">￥{{calcOrder.integralUseNum}}</span>
              </div>
              <!-- <div class="full_reduct" v-show="true">
                <span>优惠券满减 :</span>
                <span class="price">-￥12.00</span>
              </div> -->
              <div class="full_reduct" v-show="false">
                <span>&nbsp; 红包满减 :</span>
                <span class="price">&nbsp;-￥12.00</span>
              </div>
            </div>
          </div>
          <div class="address_price clearfix">
            <div class="payment" style="float: right;">应付总额: <span class="allprice"> ￥{{calcOrder.orderAmount}}</span></div>
          </div>
          <div class="buttom clearfix">
            <el-button style="float:right; width:135px;height:40px;margin-top:13px; background:#409EFF; color: #fff"
                       @click="goPay" round>
              提交订单
            </el-button>
            <label for="select_multiple_address" class="sma_label">
              <span>选择多地址下单</span>
              <input ref="isMult" type="checkbox" id="select_multiple_address">
              <i class="checkbox_style"></i>
            </label>
          </div>
        </div>
      </div>
      <AddAddress v-if="showPopup" @transfer="getBoole"></AddAddress>
      <more-address v-if="showMoreAddress" @moaddress="openAddress" @selectedAddress="selectedAddress"></more-address>
      <!-- <uploadsuccess></uploadsuccess> -->
      <uploadfalse v-if="isShow"></uploadfalse>
    </div>
  </div>
</template>
<style scoped>
.deduction .active{
   background-color: none;
}
</style>
<style lang="stylus" scoped>
  @import "~styles/cart_header.styl"
  @import "~styles/mixins.styl"
  @import "~styles/varibles.styl"
  .sma_label
    display: flex;
    align-items: center;
    position: relative;
    top: 28px;
    float: right;
    margin-right: 50px;
    .checkbox_style
      margin-left: -4px;
      display: flex;
      align-items center
      justify-content center
      width: 16px;
      height: 16px;
      border: 2px solid #409eff;
    span
      font-size 16px
      color: #999;
    input[type=checkbox]
      position relative
      left -4px
      visibility hidden
    input[type=checkbox]:checked+.checkbox_style:before
      display inline-block
      content ''
      width 12px
      height 4px
      border-left 2px solid #409eff
      border-bottom 2px solid #409eff
      transform rotate(-45deg)
  .button:active
    top 2px
  .colorbar
    position relative
    left 327px
    width 273px
    height 20px
    background white
  .choose_address
    background-color #fff
    .choose_body
      ul
        display inline-block
        vertical-align middle
        li
          position relative
          float left
          padding-left 15px
          padding-top 24px
          padding-bottom 10px
          box-sizing border-box
          width 441px
          .bor
            position relative
            padding 26px 0px 10px 20px
            width 381px
            height 192px
            box-sizing border-box
            display inline-block
            .user_info
              font-family MicrosoftYaHei-Bold
              color #333
              font-size 14px
              font-weight Bold
              cursor pointer
              display inline-block
            .info
              cursor pointer
              padding-top 47px
              .user_name, .user_address
                font-family MicrosoftYaHei-Bold
                font-size 14px
                color #666
                padding-right: 50px;
              .user_name
                ellipsis()
              .user_address
                ellipsis()
                line-height 1.5
          .bor_active
            background url('~@/assets/images/shopping_cart/address_bg.png') no-repeat
          .partition
            position: absolute;
            top: 68px;
            width: 1px;
            height: 99px;
            background-color: #e5e5e5;
            display: inline-block;
            margin-left: 32px;
      .addaddress
        display inline-block
        vertical-align middle
        text-align center
        font-size 45px
        color #4A99FA
        margin-left 88px
        cursor pointer
        .use_new
          font-size 12px
  .many_address
    margin-top 20px
    background-color #ffffff
    .many_body
      margin-top 20px
      margin-left 35px
      margin-right 23px
  .confirm_good
    margin-top 20px
    padding-bottom 1px
    margin-bottom 20px
    background-color #fff
    .confirm_header
      .header_top
        padding-top 16px
    .confirm_table
      border 1px solid #e7edf5
      margin 20px 23px 18px 36px
      .computed
        .reduce, .add
          border 1px solid #DFE7F2
          display inline-block
          width 17px
          height 17px
          text-align center
          line-height 16px
          color #939399
          cursor pointer
        .text
          color #939399
          font-size 14px
          font-family MicrosoftYaHei
          display inline-block
          margin 0px 10px
    .textar
      margin-top 20px
  .paymentinfo
    background-color #fff
    .par_body
      padding 0px 25px 36px 42px
      .paymode
        padding-bottom 21px
        border-bottom 1px solid #D7E0F1
        padding-top 25px
        .pay
          display inline-block
          padding 0px 30px 0px 30px
          border 1px solid #D7E0F1
          text-align center
          line-height 30px
          font-size 12px
          color #999
          font-family MicrosoftYaHei
          margin-left 9px
          cursor pointer
        .between
          background #ccc !important
          color #fff
        .mode
          font-family MicrosoftYaHei
          color #666
          font-size 14px
        .active
          background-color $btnColor
          color #fff
        .noexchange
          display inline-block
          color #999999
          font-family MicrosoftYaHei
          font-size 12px
          .discount
            color #FF0000
            font-weight Bold
            font-size 18px
        .cost
          margin-bottom 27px
          display inline-block
        .deduction
          display inline-block
          margin-left 25px
          margin-right 25px
          cursor pointer
          &:hover
            transform scale(1.1)
            transition all 0.5s
          img
            vertical-align middle
          .right
            display inline-block
            vertical-align middle
            .deduct_text
              width: 123px;
              height: 15px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              margin-bottom 7px
            .price
              color #FF0000
              font-weight bold
              font-size 18px
      .goodprice
        padding-top 35px
        .right
          float right
          span
            color #666666
            font-size 14px
          .goodnub
            color #FB0B00
          .price
            margin-left 14px
          .freight
            padding-top 18px
            margin-left 111px
            span
              font-size 14px
              color #666
          .full_reduct
            padding-top 18px
            margin-left 71px
            span
              font-size 14px
              color #666
            .price
              font-size 18px

      .tips
        width 1133px
        height 58px
        background rgba(247, 250, 255, 1)
        font-size: 14px;
        font-family MicrosoftYaHei
        font-weight 400
        color rgba(76, 134, 244, 1)
        line-height 58px
        box-sizing border-box
        padding-left 27px
      .address_price
        padding 21px 20px 22px
        margin-top 20px
        background-color #F7FAFF
        .payment
          font-size 14px
          color #666666
          font-family MicrosoftYaHei
          .allprice
            font-size 18px
            color #FB0B00
            font-family MicrosoftYaHei-Bold
            font-weight Bold
        .address
          color #666666
          font-family MicrosoftYaHei
          font-size 14px

</style>

<script>
  import { reqDeleteAddress, confirmOrderFromShoppingCart, findAddressById, confirmOrderFromJustBuy, editAddress, personalcenter, calcOrder} from '@/api/index'
  import { parseUrl, throttleTipPop, getCookie } from '@/assets/utils/utils'
  import { mapActions, mapState } from 'vuex'
  import ConfirmTable from '../popup/confirmtable';
  import AddAddress from '../popup/AddAddress';
  import Manyaddress from '../popup/Manyaddress';
  import Uploadsuccess from '../popup/Uploadsuccess';
  import Uploadfalse from '../popup/Uploadfalse';
  import Aditaddress from '../popup/AditAddress';
  import MoreAddress from '../popup/MoreAddress';

  export default {
    components: {
      ConfirmTable,
      AddAddress,
      Manyaddress,
      Uploadsuccess,
      Uploadfalse,
      Aditaddress,
      MoreAddress,
    },
    data() {
      return {
        showTip: false, // 留言字数超过提醒
        orderRemarks: '', // 留言信息
        payInfo: {}, // 支付信息
        proQuantities: [],
        multipleTableData: [],
        addressId: '',
        isShow: false,
        textarea: '',
        paymode: [],
        exchange: ['使用', '不使用'],
        exchanges: [],
        costlist: [],
        zhifupay: 0,
        jifen: 10,
        youhui: 1,
        hongbao: 1,
        showPopup: false,
        showAditaddress: false,
        selectDe: 10,
        jifenpayDe: 0,
        showMoreAddress: false,
        between: false,
        chooseAddress: 0,
        chooseUserInfo: {},
        balanceCount: '',
        exchangeRate: '',
        accountId: '',
        accountType: '',
        accountInfoId: '',
        useIntegral: '',
      };
    },
    async created() {
      this.$store.commit('tofilladdress', 2)
      // 判断从哪边来过请求结算
      await this.ifComeFromJustBuy()
      // 获取商品信息
      const goodsInfo = this.calcOrder.goodsParams
      this.$store.commit('handleGoodsInfo', goodsInfo)
      // 获取支付类型
      this.paymode = this.calcOrder.payment
      this.payInfo = this.paymode[0] || {} // 默认支付方式为首个
      // 获取用户前默认地址信息及其下一个地址
      this.getTopTwoUserInfo()
      this.getNavBar();
      this.getList();
      // 收货人信息为默认
      this.chooseUserInfo = this.singleAddress[0]
      this.addressId = this.chooseUserInfo ? this.chooseUserInfo.addressId : ''
      // 获取多地址信息
      this.setMultipleAddress()
      this.selectDeduct()
      console.log(JSON.parse(localStorage.getItem("justBuyProduct")))
    },
    computed: {
      ...mapState(['calcOrder', 'goodsInfo', 'userInfo', 'singleAddress', 'multipleAddress']),
    },
    watch: {
      // 解决删除所有地址后新增一个地址提交订单获取的地址ID为上一个地址的BUG
      userInfo(newVal) {
        if (newVal.length === 0) return
        if (newVal.length === 1) {
          this.addressId = newVal[0].addressId
          this.selectAddress(this.addressId, 0)
        }
        this.addressId = newVal[this.chooseAddress].addressId
      },
      orderRemarks(newVal) {
        if(newVal.length >= 200) {
          this.orderRemarks = newVal.substring(0, 200)
          this.showTip = true
        } else {
          this.showTip = false
        }
      },
    },
    methods: {
      ...mapActions(['getCalcOrder']),
      // 留言提示
      handleBlur() {
        if (this.orderRemarks.length > 200) {
          this.showTip = true
        }
      },
      getList(){
        // console.log(JSON.parse(getCookie('userData')))
        let userData = JSON.parse(getCookie('userData'));
        let obj = {         
          userId: userData.userId
        }
        personalcenter(obj).then(res => {
          if(res.code == 200){
            if(res.data.lenth != 0){
              res.data.forEach(item => {
                if(item.accountType == 1){
                  this.costlist.push(item)
                }else if(item.accountType == 0){
                  this.exchanges.push(item)
                }
              })
            }
          }
        })
      },
      multipleTableDataChange(data) {
        this.multipleTableData = data
      },
      async ifComeFromJustBuy() {
        // 网页从立即购买跳转过来
        const query = window.location.search
        const obj = parseUrl(query)
        if (obj.justBuy === 'true') {
          const proInfo = localStorage.getItem('justBuyProduct')
          await this.getCalcOrder(JSON.parse(proInfo))
        } else {
          // 获取所有订单信息
          await this.getCalcOrder()
        }
      },
      // 设置多地址表格
      setMultipleAddress() {
        console.log(this.multipleTableData)
        this.multipleTableData = this.multipleAddress[0] ? this.multipleAddress[0].children : []
        if (this.multipleTableData) {
          this.multipleTableData.forEach((item) => {
            item.addressGoodsParams = []
            if (this.goodsInfo) {
              this.goodsInfo.forEach((i) => {
                const obj = {}
                obj.goodsId = i.goodsId
                obj.goodsName = i.goodsName
                obj.goodsSn = i.goodsSn
                obj.goodsAttr = i.goodsAttr
                obj.skuId = i.skuId
                obj.quantity = 0
                item.addressGoodsParams.push(obj)
              })
            }
          })
        }
        console.log(this.multipleTableData)
      },
      // 设为默认地址
      async setDefaultAddress(item) {
        const obj = {
          addressId: item.addressId,
          addressName: item.addressName,
          consignee: item.consignee,
          telephone: item.telephone,
          unitName: item.unitName,
          phone: item.phone,
          email: item.email,
          country: item.country,
          countryName: item.countryName,
          province: item.province,
          provinceName: item.provinceName,
          city: item.city,
          cityName: item.cityName,
          district: item.district,
          districtName: item.districtName,
          town: item.town,
          townName: item.townName,
          address: item.address,
          zipcode: item.zipcode,
          signBuilding: item.signBuilding,
          bestTime: item.bestTime,
          def: true,
          sortOrder: item.sortOrder,
        }
        const res = await editAddress(obj)
        if (res.code === 200) {
          await this.ifComeFromJustBuy()
          this.$store.commit('getTopTwoUserInfo')
          throttleTipPop(this, 'success', '成功设为默认地址')
        } else {
          throttleTipPop(this, 'warning', res.message)
        }
      },
      // 编辑收货地址
      editaddress(item) {
        this.showAditaddress = true
        this.$store.commit('handlecurrentEditAddress', item)
      },
      // 获取用户前默认地址信息及其下一个地址
      getTopTwoUserInfo() {
        this.$store.commit('getTopTwoUserInfo')
      },
      // 点击使用新地址时触发
      handleShowPopup() {
        this.showPopup = true;
      },
      hideAddress(msg) {
        this.showAditaddress = msg;
      },
      // 关闭填写地址弹框
      getBoole(msg) {
        this.showPopup = msg;
      },
      // 计算多地址选中商品的数量
      selectedProQuantities(row) {
        const arr = []
        const len = this.goodsInfo.length
        for (let i = 0; i < len; i++) {
          const a = row.map(item => item.addressGoodsParams[i].quantity).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
          arr.push({ ['pro' + i]: a })
        }
        return arr
      },
      // 提交订单
      async goPay() {
        // 获取各选中商品的数量
        this.proQuantities = this.goodsInfo.map((item, index) => ({ ['pro' + index]: item.quantity }))
        let selectedProQuantities = []
        let res = {}
        const ma = this.$store.state.shippingAddressParams
        if (this.orderRemarks.length > 200) {
          throttleTipPop(this, 'error', '留言字数请不要超过200字')
          return
        }
        let obj = {
          orderRemarks: this.orderRemarks,
          shippingAddressParams: ma || [],
          addressId: this.addressId || '',
          applyId: 0,
          applyIds: 0,
          bonus: 0,
          bonusId: 0,
          discount: 0,
          distrPrice: 0,
          extensionCode: '',
          extensionId: 0,
          fromType: '',
          giftCardAmount: 0,
          giftCardIds: '',
          multipleAddress: 0, // 0 为单地址 1 为多地址
          goodsAmount: 0,
          goodsParams: this.goodsInfo, // 确认商品信息
          insureFee: 0,
          integralAmount: this.calcOrder.integralAmount,
          integralUseNum: this.calcOrder.integralUseNum,
          invContent: '',
          invPayee: '',
          invType: '',
          orderAmount: 0,
          orderInfoExtend: {
            agencyId: 0,
            clientId: 0,
            fromAd: 0,
            haveUpdate: 0,
            host: '',
            howOos: '',
            invoiceNo: '',
            orderId: 0,
            orderSn: '',
            payNote: '',
            referer: '',
            thirdOrderSn: '',
            wechatApp: 0,
          },
          packFee: 0,
          packId: 0,
          packName: '',
          paidAmount: 0,
          parentId: 0,
          payFee: 0,
          payId: 0,
          payName: this.payInfo.payName,   // 必填
          payCode: this.payInfo.payCode,   // 必填
          payType: this.payInfo.payType,   // 必填
          shippingFee: 0,
          shippingId: 18,
          shippingName: '',
          surplus: 0,
          tax: 0,
          balanceCount: this.balanceCount,
          exchangeRate: this.exchangeRate,
          accountId: this.accountId,
          accountType: this.accountType,
          accountInfoId: this.accountInfoId,
          useIntegral: this.useIntegral
        }
        const query = window.location.search
        const queryObj = parseUrl(query)
        selectedProQuantities = this.selectedProQuantities(ma)
        if (ma.length > 0 || this.$refs.isMult.checked) {
          obj.multipleAddress = 1
          obj.addressId = ''
          this.$confirm('您正在使用多地址做为配送方式', '温馨提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }).then(async () => {
            let a = false
            if (this.$refs.isMult.checked && ma.length === 0) {
              a = false
            } else {
              this.proQuantities.forEach((item, index) => {
                if (selectedProQuantities[index]['pro' + index] > item['pro' + index]) {
                  this.$alert(`第${index + 1}个商品的多地址配送的总数量超过了该商品在订单中的数量啦~~~！`, '温馨提示', {
                    confirmButtonText: '确定',
                  })
                  a = true
                } else if (selectedProQuantities[index]['pro' + index] <= 0 ) {
                  this.$alert(`第${index + 1}个商品的多地址配送的总数量不能为0哦~~~`, '温馨提示', {
                    confirmButtonText: '确定',
                  })
                  a = true
                }
              })
            }
            if (a) {
              return false
            }
            // 网页从立即购买跳转过来
            if (queryObj.justBuy === 'true') {
              try {
                res = await confirmOrderFromJustBuy(obj)
              } catch (e) {
                console.log(e)
              }
            } else {
              // 获取所有订单信息
              try {
                res = await confirmOrderFromShoppingCart(obj)
              } catch (e) {
                console.log(e)
              }
            }
            if (res.code === 200) {
              // 保存订单信息
              const totalOrderNo = res.data.totalOrderNo
              localStorage.setItem('totalOrderNo', totalOrderNo)
              this.$message({
                message: '下单成功',
                type: 'success',
              });
              this.$router.push({ path: '/confirmInform' });
            } else {
              const message = res.message ? res.message : '提交订单失败'
              throttleTipPop(this, 'error', message)
            }
          }).catch((e) => {
            console.log(e)
          });
        } else {
          // 判断是否选择地址
          if (obj.addressId === '') {
            throttleTipPop(this, 'warning', '请选择地址')
            return
          }
          // 网页从立即购买跳转过来
          if (queryObj.justBuy === 'true') {
            try {
              res = await confirmOrderFromJustBuy(obj)
            } catch (e) {
              console.log(e)
            }
          } else {
            // 获取所有订单信息
            try {
              res = await confirmOrderFromShoppingCart(obj)
            } catch (e) {
              console.log(e)
            }
          }
          if (res.code === 200) {
            // 保存订单信息
            const totalOrderNo = res.data.totalOrderNo
            localStorage.setItem('totalOrderNo', totalOrderNo)
            this.$message({
              message: '下单成功',
              type: 'success',
            });
            this.$router.push({ path: '/confirmInform' });
          } else {
            const message = res.message ? res.message : '提交订单失败'
            throttleTipPop(this, 'error', message)
          }
        }
      },
      // 点击单选地址
      async selectAddress(addressId, index) {
        this.addressId = addressId
        const res = await findAddressById(addressId)
        if (res.code === 200) {
          this.chooseUserInfo = res.data
        }
        // console.log(this.chooseUserInfo)
        this.chooseAddress = index;
      },
      // 通过查看更多地址选中的地址
      async selectedAddress(addressId, bool) {
        console.log(addressId, bool)
        this.addressId = addressId
        if (bool) {
          this.chooseAddress = 0
        } else {
          const res = await findAddressById(addressId)
          if (res.code === 200) {
            this.userInfo[1] = res.data
            console.log(res.data)
            console.log(this.userInfo)
            this.$set(this.userInfo, this.userInfo)
          }
          this.chooseAddress = 1
        }
      },
      // 删除单选地址
      deleteAddress(addressId) {
        this.$confirm('此操作将会删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await reqDeleteAddress(addressId)
          if (res.code === 200) {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            await this.ifComeFromJustBuy()
            this.$store.commit('getTopTwoUserInfo')
          }
          this.selectAddress(this.userInfo[0] && this.userInfo[0].addressId, 0)
        })
      },
      // 打开更多地址
      openAddress(msg) {
        this.showMoreAddress = msg;
      },
      // 判断支付方式:支付宝、微信、银行卡、对公转账
      payment_method(item, index) {
        this.payInfo = item
        this.zhifupay = index;
        // sessionStorage.setItem('payment_method', index);
        // this.selectDe = 4;
      },
      // 使用积分支付
      async jifenpay(index,item) {
        console.log(index)
        if (this.jifen === index) {
          this.useIntegral = 0;
          let obj = {
            accountId: item.accountId,
            balanceCount: item.balanceCount,
            accountType: item.accountType,
            useIntegral: 0
          }
          const res = await calcOrder(obj)
          if(res.code == 200){
            this.calcOrder.integralUseNum = res.data.integralUseNum;
            this.calcOrder.orderAmount = this.calcOrder.goodsAmount;
          }
          this.jifen = 10;
        }else{
          this.jifen = index;
          this.balanceCount = item.balanceCount;
          this.accountId = item.accountId;
          this.accountType = item.accountType;
          this.accountInfoId = item.id;
          this.useIntegral = 1;
          let newObj = {
            accountId: item.accountId,
            balanceCount: item.balanceCount,
            accountType: item.accountType,
            useIntegral: 1
          }
          let obj1 = JSON.parse(localStorage.getItem("justBuyProduct")); 
          let obj = {};
 
          Object.assign(obj,newObj,obj1);
          const res = await calcOrder(obj)
          if(res.code == 200){
            this.exchangeRate = res.data.exchangeRate;
            this.calcOrder.orderAmount = res.data.orderAmount;
            this.calcOrder.integralUseNum = res.data.integralUseNum;
            this.calcOrder.integralAmount = res.data.integralAmount;
          }
          this.selectDe = 10;
          
        }
      },
      // 使用抵扣支付
      async selectDeduct(index,item) {
        console.log(index)
        if (this.selectDe === index) {
          this.useIntegral = 0;
          let obj = {
            accountId: item.accountId,
            balanceCount: item.balanceCount,
            accountType: item.accountType,
            useIntegral: 0
          }
          const res = await calcOrder(obj)
          if(res.code == 200){
            this.calcOrder.integralUseNum = res.data.integralUseNum;
            this.calcOrder.orderAmount = this.calcOrder.goodsAmount;
          }
          this.selectDe = 10;
        } else {
          this.selectDe = index;
          this.balanceCount = item.balanceCount;
          this.accountId = item.accountId;
          this.accountType = item.accountType;
          this.accountInfoId = item.id;
          this.useIntegral = 1;
          let newObj = {
            accountId: item.accountId,
            balanceCount: item.balanceCount,
            accountType: item.accountType,
            useIntegral: 1
          }
          let obj1 = JSON.parse(localStorage.getItem("justBuyProduct")); 
          let obj = {};
 
          Object.assign(obj,newObj,obj1);
          const res = await calcOrder(obj)
          if(res.code == 200){
            this.exchangeRate = res.data.exchangeRate;
            this.calcOrder.orderAmount = res.data.orderAmount;
            this.calcOrder.integralUseNum = res.data.integralUseNum
          }
          this.jifen = 10;
        }
      },
      // 使用红包支付
      hongbaopay(index) {
        this.hongbao = index;
        this.youhui = 1;
      },
      // 使用优惠券支付
      youhuipay(index) {
        this.youhui = index;
        this.hongbao = 1;
      },
      getNavBar() {
        const isSelect = sessionStorage.getItem('navigation_bar');
        if (isSelect === 2) {
          this.$store.commit('tofilladdress', 2);
        }
      },
    },
  };
</script>

