<template>
  <div class="wrap">
    <div class="content">
      <div class="head">
        <span class="title">编辑地址</span>
        <!-- <i class="iconfont icon-chacha" @click="closePopup"></i> -->
      </div>
      <div class="main_form">
        <div class="form">
          <form action="">
            <div class="row">
              <span class="t1"><i>*</i>收货人：</span>
              <input type="text" v-model="currentEditAddress.consignee" class="my-input">
              <span class="tip_word" v-show="tip1 === 1">请填写收货人姓名</span>
            </div>
            <div class="row">
              <span class="t1"><i>*</i>手机：</span>
              <input type="text" v-model="currentEditAddress.phone" class="my-input" name="">
              <span class="tip_word" v-show="tip2 === 2">手机号格式不正确</span>
            </div>
            <div class="row">
              <span class="t1"><i>*</i>地址：</span>
              <SelectZone>
                <input class="city" :title="zone" v-model="zone" readonly
                       placeholder="请选择地址"
                >
              </SelectZone>
              <span class="tip_word" v-show="tip3 === 3">请选择地址</span>
            </div>
            <div class="row">
              <span class="t1"><i>*</i>详细地址：</span>
              <input type="text" v-model="currentEditAddress.address" class="my-input" name="">
              <span class="tip_word" v-show="tip4 === 4">请输入详细地址</span>
            </div>
            <div class="row">
              <span class="t1">邮编：</span>
              <input type="text" v-model="currentEditAddress.zipcode" class="my-input" name="">
            </div>
            <div class="row checkbox">
              <label for="checkbox">
                <input type="checkbox" id="checkbox" name="" v-model="def">
                <span class="t1 m-t1">设为我的默认地址</span>
              </label>
            </div>
            <div class="button">
              <el-button style="background:#F56C6C;width:96px;height:36px;" type="danger" @click="closePopup">取消</el-button>
              <el-button style="background:#4A99FA;width:96px;height:36px;" type="primary" @click="handlSubmit">保存地址</el-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'
import { mapState, mapActions } from 'vuex'
import { editAddress } from '@/api/index'
import SelectZone from './SelectZone'

export default {
  name: 'AddAddress',
  components: { SelectZone },
  data() {
    return {
      province: '', // 省
      city: '',
      town: '',
      district: '',
      def: false,
      tip1: 0, // 显示提示
      tip2: 0, // 显示提示
      tip3: 0, // 显示提示
      tip4: 0, // 显示提示
    }
  },
  props: {
    type: Object,
  },
  computed: {
    ...mapState(['currentEditAddress']),
    consignee() {
      const consignee = this.currentEditAddress.consignee
      return consignee
    },
    phone() {
      return this.currentEditAddress.phone
    },
    addressDetail() {
      return this.currentEditAddress.address
    },
    zone: {
      get() {
        let address = this.currentEditAddress.provinceName + '/' + this.currentEditAddress.cityName
        address += this.currentEditAddress.districtName ? '/' + this.currentEditAddress.districtName : ''
        address += this.currentEditAddress.townName ? '/' + this.currentEditAddress.townName : ''
        return address
      },
    },
  },
  watch: {
    consignee(newVal) {
      if (newVal.replace(/^\s*|\s*$/g, '')) {
        this.tip1 = 0
      } else {
        this.tip1 = 1
      }
    },
    phone(newVal) {
      if (/^1[3456789]\d{9}$/.test(newVal)) {
        this.tip2 = 0
      } else {
        this.tip2 = 2
      }
    },
    zone(newVal) {
      if (newVal.replace(/^\s*|\s*$/g, '')) {
        this.tip3 = 0
      } else {
        this.tip3 = 3
      }
    },
    addressDetail(newVal) {
      if (newVal.replace(/^\s*|\s*$/g, '')) {
        this.tip4 = 0
      } else {
        this.tip4 = 4
      }
    },
  },
  methods: {
    ...mapActions(['getCalcOrder']),
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
    closePopup() {
      this.$emit('edAddress', false)
      this.dev = false
    },
    // 保存地址
    async handlSubmit() {
      // 收货人
      let notPass = false
      if (!this.consignee.replace(/^\s*|\s*$/g, '')) {
        this.tip1 = 1
        notPass = true
      }
      // 验证手机号
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.tip2 = 2
        notPass = true
      }
      // 地址
      if (!this.zone.replace(/^\s*|\s*$/g, '')) {
        this.tip3 = 3
        notPass = true
      }
      // 详细地址
      if (!this.addressDetail.replace(/^\s*|\s*$/g, '')) {
        this.tip4 = 4
        notPass = true
      }
      if (notPass) {
        return
      }
      const zone = this.zone.split('/')
      this.province = zone[0]
      this.city = zone[1]
      this.town = zone[2] || ''
      this.district = zone[3] || ''
      const obj = {
        addressId: this.currentEditAddress.addressId,
        addressName: this.currentEditAddress.addressName,
        consignee: this.consignee,
        telephone: this.currentEditAddress.telephone,
        unitName: this.currentEditAddress.unitName,
        phone: this.phone,
        email: this.currentEditAddress.email,
        country: this.currentEditAddress.country,
        countryName: this.currentEditAddress.countryName,
        province: this.currentEditAddress.province,
        provinceName: this.province,
        city: this.currentEditAddress.city,
        cityName: this.city,
        district: this.currentEditAddress.district,
        districtName: this.town,
        town: this.currentEditAddress.town,
        townName: this.district,
        address: this.addressDetail,
        zipcode: this.currentEditAddress.zipcode,
        signBuilding: this.currentEditAddress.signBuilding,
        bestTime: this.currentEditAddress.bestTime,
        def: this.def,
        sortOrder: this.currentEditAddress.sortOrder,
      }
      const res = await editAddress(obj)
      if (res.code === 200) {
        await this.ifComeFromJustBuy()
        this.$store.commit('getTopTwoUserInfo')
        this.dev = false
        this.$emit('edAddress', false)
      } else {
        this.$message({
          type: 'error',
          message: res.message,
        })
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .city
    width:367px;
    height:34px;
    line-height 34px
    display inline-block
    background: transparent;
    cursor pointer
    ellipsis()
  .city:focus
    border-color #409EFF
  .my-btn
    width 148px
    height 40px
    background rgba(76,134,244,1)
    border-radius 20px
    font-size:16px;
    color #fff
    position relative
    left 104px
    cursor pointer
  .my-btn:active
    top 2px
  .t1
    display inline-block
    width 100px
    font-size:14px;
    color:rgba(136,136,136,1);
    text-align right
    i
      color #FF0000
      margin-right 8px
  .my-input, .row >>> .el-input__inner
    width:367px;
    height:34px;
    border:1px solid rgba(215,224,241,1);
    border-radius:5px;
    box-sizing border-box
    padding 0 6px
  .my-input:hover
    border-color #DCDFE6
  .my-input:focus
    border-color #409EFF
  .wrap
    popupWrap()
    z-index 999
    .content
      background-color #ebf4fe
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      margin auto
      width 1000px
      height 648px
      padding 0px 30px
      .head
        display flex
        justify-content space-between
        margin-top 24px
        margin-bottom 30px
        .title
          display inline-block
          width 86px
          height 25px
          line-height 25px
          // border-left 5px solid #4C86F4
          font-size 20px
          color rgba(51,51,51,1)
        .icon-chacha
          font-size 30px
          color #4C86F4
          margin-right 38px
          cursor pointer
      .main_form
        background-color #fff
        width 100%
        height 450px
        .form
          width 610px
          height 350px
          contentCenter()
          left 58%
          .row
            display flex
            align-items center
            margin-bottom 20px
            .tip_word
              margin-left: 10px;
              color: red;
            .m-t1
              width auto
              margin-left 6px
          .checkbox
            position relative
            left 104px
            margin-bottom 70px
            label
              cursor pointer
      .button
        position absolute
        left 40%
        bottom -100px
        transform translateX(-50%)
.el-button{
  line-height:10px
}
</style>
