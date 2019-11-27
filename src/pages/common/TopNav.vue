<template>
  <div class="top-nav" :style="{background:content.color||bgolor}" v-if="componentStatuTopNav&&componentStatuTopNav.componentStatus==0">
    <div style="display: flex;width: 109px;justify-content: space-around;position: absolute;left: 300px">
      <a v-if="showPosition" href="javasrcipt:;" class="location" @mouseenter="getZoom" @mouseleave="block1 = false">
        <span class="cityName" :title="location"><i class="el-icon-location"></i>{{location}}</span>
        <div class="city_wrap" ref="city" @mouseenter="block2 = true" @mouseleave="block2 = false">
          <ul class="chose-title">
            <li @click="title_index = 0" :class="{title:true, title_selected:title_index===0}" data-title_index='0'>省份</li>
            <li @click="title_index = 1" :class="{title:true, title_selected:title_index===1}" data-title_index='1' v-if="cities.length">城市</li>
          </ul>
          <div class="cities">
            <ul class="city_list" v-show="title_index===0">
              <li :class="{city_item: true, city_selected: province_index===index}"
                  v-for="(item, index) in provinces" :key="item.regionId"
                  :title="item.regionName"
                  @click="toChoseCity(item.regionId,index, item.regionName)"
              >
                {{item.regionName}}
              </li>
            </ul>
            <ul class="city_list" v-show="cities.length && title_index===1">
              <li :class="{city_item: true, city_selected: city_index===index}"
                  v-for="(city, index) in cities" :key="city.regionId"
                  :title="city.regionName"
                  @click="ChoseCity(index, city.regionName)"
              >
                {{city.regionName}}
              </li>
            </ul>
          </div>
        </div>
      </a>
      <p> <a class="link-word" href="index.html" style="color:#4C86F4;font-weight: bold;vertical-align: middle">首页</a></p>
    </div>
    <div style="display: flex">
      <p v-for="(item,index) in tableData" :key="index" style="display: inline">
        <i class="line" style="margin: 0 7px" v-if="index==0"></i>
        <a class="link-word" :href=item.classifiedLink style="vertical-align: middle">
          <img :src=item.imgUrl alt="" class="imgUrl">
          <span style="vertical-align: middle"> {{item.categoryName}}</span>
        </a>
        <i class="line" style="margin: 0 7px"></i>
      </p>
    </div>
    <div v-if="false">
      <a class="link-word" href="index.html" style="color:#4C86F4;font-weight: bold">首页</a>|
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/qiye@2x.png" alt=""></i>企业集采</a><i class="line"></i>
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jifen@2x.png" alt=""></i>积分商城</a><i class="line"></i>
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/bangong@2x.png" alt=""></i>办公用品</a><i class="line"></i>
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jingdong@2x.png" alt=""></i>京东商城</a><i class="line"></i>
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/suning@2x.png" alt=""></i>苏宁易购</a><i class="line"></i>
      <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/yanxuan 65@2x.png" alt=""></i>网易严选</a><i class="line"></i>
      <a class="link-word" href="">关于我们</a><i class="line"></i>
    </div>
    <div class="login-wrap" v-if="!isLogin">
      <a class="text-word" href="">您好，欢迎您来到{{title}}！</a>
      <a class="link-word" href="login.html">
        <i class="iconfont icon-gerenzhongxin1"></i>
        请登录
      </a>|
      <a class="link-word" href="login.html#/register">
        免费注册
      </a>
    </div>
    <div class="login-wrap" v-else>
      <a class="text-word" href="">您好，欢迎您来到{{title}}！</a>
      <a href="person_center.html" class="link-word" >
        {{username}}
      </a>
      <a @click="handleLogout">
        退出
      </a>
    </div>
  </div>
</template>

<script>
import getCurrentCityName from '@/assets/utils/location'
import { reqSystemConfig, logout } from '@/api/index'
import { getCookie, delCookie } from '@/assets/utils/utils'
import { reqAddressCascader } from '@/api/index'

export default {
  name: 'TopNav',
  data() {
    return {
      showPosition: true, // 显示定位
      bgolor:'#f9fbff',
      title:'',
      componentStatuTopNav:'',
      provinceName: '',
      block1: false,
      block2: false,
      title_index: null,
      province_index: 0,
      city_index: 0,
      subdivide_index: 0,
      district_index: 0,
      city_selected: false,
      selected: false,
      provinces: [], // 省
      cities: [], // 市
      location: '定位中...',
      isLogin: false,
      userAccount: '',
      tableData:[],
      content:{},
    }
  },
  watch: {
    block1(val) {
      if (val) {
        this.$refs.city.style.display = 'block'
      } else if (!this.block2) {
        this.$refs.city.style.display = 'none'
      }
    },
    block2(val) {
      if (val) {
        this.$refs.city.style.display = 'block'
      } else if (!this.block1) {
        this.$refs.city.style.display = 'none'
      }
    },
  },
  created() {
    const userData = getCookie('userData')
    const userInfo = JSON.parse(userData)
    if (userInfo) {
      this.username = userInfo.userAccount
      this.isLogin = true
    }
    // const url = window.location.search
  },
  mounted() {
    this.getSystemConfig()
    this.componentStatuTopNav =  JSON.parse(window.localStorage.getItem('headerNav'))
    this.title = this.componentStatuTopNav.componentContents[0].title
    this.content =  JSON.parse(this.componentStatuTopNav.componentContents[0].content)||{}
    this.tableData = this.content.tableData.sort(this.compare('sortOrder'))
    console.log(this.tableData)
    console.log()
    if (sessionStorage.getItem('cityName')) {
      this.provinceName = sessionStorage.getItem('provinceName')
      this.location = sessionStorage.getItem('cityName')
    } else {
      this.getCurrentCity()
    }
  },
  methods: {
    // 获取系统配置，是否显示地址定位
    async getSystemConfig() {
      const res = await reqSystemConfig('sys_index_city_position')
      if (res.code === 200) {
        if (res.data.settingInfoList[0].key === 'open') {
          if (res.data.settingInfoList[0].checkValue === 'false') {
            this.showPosition = false
          } else {
            this.showPosition = true
          }
        } else if (res.data.settingInfoList[0].key === 'close') {
          if (res.data.settingInfoList[0].checkValue === 'true') {
            this.showPosition = false
          } else {
            this.showPosition = true
          }
        } else {
          this.showPosition = true
        }
      }
    },
    //排序
    compare(property){
      return function(a,b){
        let value1 = a[property];
        let value2 = b[property];
        return value1 - value2;
      }
    },

    // ###定位相关开始
    async initSelectedCityStyle(province, city) {
      // 定位省
      let selectedProvinceId = ''
      const res = await reqAddressCascader(1)
      if (res.code === 200) {
        this.provinces = res.data.list
        this.provinces.forEach((item, index) => {
          if (item.regionName === province) {
            this.province_index = index
            selectedProvinceId = item.regionId
          }
        })
      }
      // 定位市
      const res2 = await reqAddressCascader(selectedProvinceId)
      if (res2.code === 200) {
        this.title_index = 1
        this.cities = res2.data.list
        this.cities.forEach((item, index) => {
          if (item.regionName === city) {
            this.city_index = index
          }
        })
      }
    },
    getCurrentCity() {
      getCurrentCityName.init().then(BMap => {
        const geolocation = new BMap.Geolocation()
        var _this = this
        geolocation.getCurrentPosition(
          function getinfo(position) {
            let city = position.address.city
            let province = position.address.province
            _this.location = city
            _this.provinceName = province
            city = city.replace('市', '')
            province = province.replace('省', '')
            sessionStorage.setItem('cityName', city)
            sessionStorage.setItem('provinceName', province)
          },
          function (e) {
            _this.LocationCity  = '定位失败'
          },
          { provider: 'baidu' }
        )
      })
    },
    // 获取省
    // 隐藏区域选择
    async getZoom() {
      this.block1 =true
      this.initSelectedCityStyle(this.provinceName, this.location)
    },
    async toChoseCity(id, index, province) {
      const res = await reqAddressCascader(id)
      if (res.code === 200) {
        this.province_index = index
        this.cities = res.data.list
        this.title_index = 1
        sessionStorage.setItem('provinceName', province)
        this.provinceName = province
      }
    },
    // 选择城市
    ChoseCity(index, text) {
      this.city_index = index
      this.location = text
      this.$refs.city.style.display = 'none'
      this.block1 = false
      this.block2 = false
      sessionStorage.setItem('cityName', text)
    },

    // ###定位相关结束
    // 退出
    handleLogout() {
      const userData = getCookie('userData')
      const userInfo = JSON.parse(userData)
      const token = userInfo.token
      try {
        logout(token)
        delCookie('userData')
        window.location.href = 'login.html'
      } catch (e) {
        delCookie('userData')
        window.location.href = 'login.html'
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .location
    .cityName
      display inline-block
      width: 70px;
      ellipsis()
      color #409eff
      font-size: 14px;
  .city_wrap
    display none
    position absolute
    top 80px
    left 0px
    width 394px;
    min-height: 343px;
    padding 20px 6px 8px
    background rgba(255,255,255,1);
    border 1px solid rgba(204,204,204,1);
    z-index 109
    box-sizing border-box
    .chose-title
      display flex
      padding  0 12px
      border-bottom 2px solid #1E9FFF
      margin-bottom 15px
      .title
        width 67px;
        height 30px;
        font-size:14px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color #666
        line-height:30px;
        text-align center
        cursor pointer
      .title_selected
        background rgba(30,159,255,1);
        color #fff
    .city_list
      display flex
      flex-wrap wrap
      .city_item
        width:67px;
        height:26px;
        line-height 26px
        background:rgba(243,245,248,1);
        margin-bottom 12px
        margin-left 8px
        color #666
        text-align center
        cursor pointer
        ellipsis()
        font-size: 14px;
        padding: 0 6px;
        box-sizing: border-box;
      .city_selected
        background:rgba(30,159,255,1)
        color #fff
  .icon
    margin-right 6px
  .line
    display inline-block
    width:1px;
    height:13px;
    background:rgba(102,102,102,1);
  /deep/ .el-dialog__headerbtn{
    display: block;
    font-size: 24px;
  }
  a
    cursor pointer
  .top-nav
    min-width 1200px
    height 38px
    background #f9fbff
    display flex
    justify-content space-around
    align-items center
    color #e4e3e3
    font-size 24px
    padding 0 calc((100% - 1200px)/2)
    .link-word
      font-size 14px
      line-height 18px
      color #333
      .iconfont
        position relative
        top 1px
        display inline-block
        width 18px
        height 18px
        line-height 18px
        text-align center
        color #fff
        margin-right 6px
      .icon-jicai
        background #6a82ff
      .icon-jifen
        background #ffc550
      .icon-bangongyongpin
        background #42d4ff
    .login-wrap
      position absolute
      right 200px
      font-size 14px
      color #333
      .text-word
        color #999
        font-size 14px
        margin-right 20px
      .icon-gerenzhongxin1
        position relative
        top 2px
        color #ff4e7c
      .link-word
        font-size 14px
        line-height 18px
        color #333
        margin-right 6px
        cursor pointer
  ::-webkit-input-placeholder
    color #C3C3C3
  .login-form
    width 450px
    margin auto
    .title
      position relative
      display flex
      align-items center
      margin-bottom 46px
      .login-word
        position absolute
        left -14px
        top -30px
      .horizontal-stroke
        display inline-block
        width 5px
        height 23px
        background #4A99FA
        margin-right 6px
      .horizontal-stroke:nth-of-type(2)
        opacity 0.4
      .horizontal-stroke:nth-of-type(3)
        opacity 0.1
      span
        margin-left 8px
        font-size:24px;
        color:rgba(51,129,255,1);
    .toggle-login
      width 452px
      height 48px
      background rgba(247,250,255,1)
      border-radius 24px
      margin-bottom 46px
      span
        padding 0 35px
        display inline-block
        line-height 47px
        color #4C86F4
        cursor pointer
      .active
        height:47px;
        background:rgba(82,154,255,1);
        border-radius:24px;
        color #fff
    .row
      display flex
      align-items center
      width:431px;
      padding-bottom 18px
      background #fff
      border-bottom:1px solid rgba(223,231,242,1);
      margin-bottom 35px
      position relative
      .iconfont
        color #b6c1dc
        font-size 24px
        margin-right 32px
      .logintip
        position absolute
        bottom -20px
        left 2px
        color red
        text-align  left
        .icon-iconfontxiaogantanhao
          color red
          font-size 16px
      span
        margin-left -30px
    .btn-wrap
      .my-btn
        position relative
        width:448px;
        height:70px;
        background:linear-gradient(90deg,rgba(111,178,255,1),rgba(9,95,255,1));
        box-shadow:0px 7px 27px 0px rgba(50,129,255,0.51);
        border-radius:2px;
        font-size:30px;
        color #fff
        margin-bottom 20px
        cursor pointer
      .my-btn:active
        top 2px
    .bottom
      display flex
      justify-content space-between
      a
        color #999
        cursor pointer
      .middle
        margin-left 220px
  .imgUrl
    margin 0 5px
    width 20px
    height 20px
    border-radius 50%
    vertical-align :middle
</style>
