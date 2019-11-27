<template>
  <div class="wrap">
    <div class="content">
      <div class="head">
        <span class="title">选择地址</span>
        <!-- <i class="iconfont icon-chacha" @click="closePopup"></i> -->
      </div>
      <div class="address_main">
        <ul>
          <li v-for="(item, index) in singleAddress" :key="item.addressId">
            <el-radio v-model="radio" :label="index" class="checkes"> </el-radio>
            <div class="address_info">
              <span class="user_name">{{item.consignee}} | </span>
              <span class="user_phone">{{item.phone}}</span>
              <div class="address_con" :title="`${item.provinceName}${item.cityName}${item.districtName}${item.townName}${item.address}`">{{item.provinceName}}{{item.cityName}}{{item.districtName}}{{item.townName}}{{item.address}}</div>
            </div>
            <div class="operation">
              <el-button style="margin-right:10px;font-family:MicrosoftYaHei;font-size:14px;color:rgba(74,153,250,1);" type="text" @click="editAddress(item)">编辑</el-button> |
              <el-button style="margin-right:10px;font-family:MicrosoftYaHei;font-size:14px;color:rgba(74,153,250,1);" type="text" @click="deleteAddress(item.addressId)">删除</el-button>
            </div>
          </li>
        </ul>
      </div>
      <div class="button">
        <el-button style="background:#F56C6C;width:96px;height:36px;line-height: 10px;" type="danger" @click="closePopup">取消</el-button>
        <el-button style="background:#4A99FA;width:96px;height:36px;line-height: 10px;" type="primary" @click="handlSubmit">确定</el-button>
      </div>
    </div>
    <EditAddress v-show="showPopup" @edAddress="handleEditPopup"></EditAddress>
  </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'
import { mapState, mapActions } from 'vuex'
import { reqDeleteAddress, setDefaultAddress } from '@/api/index'
import EditAddress from './AditAddress'

export default {
  name: 'moreaddress',
  data() {
    return {
      radio: 0,
      showPopup: false,
    }
  },
  components: {
    EditAddress,
  },
  computed: {
    ...mapState(['singleAddress']),
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
    // 删除地址
    async deleteAddress(addressId) {
      const res = await reqDeleteAddress(addressId)
      await this.ifComeFromJustBuy()
      this.$store.commit('getTopTwoUserInfo')
      this.$message({
        type: 'success',
        message: res.message,
      })
    },
    // 编辑地址
    editAddress(item) {
      this.showPopup = true
      this.$store.commit('handlecurrentEditAddress', item)
    },
    // 关闭编辑地址弹窗
    handleEditPopup() {
      this.showPopup = false
    },
    closePopup() {
      this.$emit('moaddress', false)
    },
    async handlSubmit() {
      // 选择该地址
      let bool = false
      const addressId = this.singleAddress[this.radio].addressId
      if (this.radio === 0) {
        bool = true
      }
      await this.ifComeFromJustBuy()
      this.$store.commit('getTopTwoUserInfo')
      this.$emit('selectedAddress', addressId, bool)
      this.$emit('moaddress', false)
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .checkes >>> .el-radio__label
    position absolute
    top -10000px
  .wrap
    popupWrap()
    z-index 999
    .content
      background-color #ebf4fe
      contentCenter()
      width 882px
      height 620px
      padding 0px 20px
      box-sizing border-box
      .head
        display flex
        justify-content space-between
        margin-top 18px
        margin-bottom 14px
        .title
          display inline-block
          width 86px
          height 25px
          line-height 25px
          font-size 20px
          color rgba(51,51,51,1)
        .icon-chacha
          font-size 30px
          color #4C86F4
          margin-right 38px
          cursor pointer
      .address_main
        width 841px;
        height 473px
        background-color #fff
        box-sizing border-box
        padding 19px 54px 0px 46px
        overflow auto
        li
          position relative
          height 99px
          border-bottom 1px dashed #D7E0F1
          .checkes
            position absolute
            top 41px
          .address_info
            position absolute
            left 38px
            top 25px
            .user_name
              font-size 18px
              font-family MicrosoftYaHei
              font-weight 400
              color rgba(102,102,102,1)
            .address_con
              width 540px
              font-size:14px;
              font-family MicrosoftYaHei
              font-weight 400
              color rgba(102,102,102,1)
              margin-top 15px
              ellipsis()
              line-height 1.5
              padding-right 20px
          .operation
            position absolute
            right 10px
            top 50px
            color #4A99FA
      .button
        position absolute
        left 50%
        bottom 20px
        transform translateX(-50%)
</style>
