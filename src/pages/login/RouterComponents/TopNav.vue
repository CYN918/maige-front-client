<template>
  <div class="top-nav">
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
    <a class="link-word" href="index.html" style="color:#4C86F4;font-weight: bold">首页</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/qiye@2x.png" alt=""></i>企业集采</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jifen@2x.png" alt=""></i>积分商城</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/bangong@2x.png" alt=""></i>办公用品</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/jingdong@2x.png" alt=""></i>京东商城</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/suning@2x.png" alt=""></i>苏宁易购</a><i class="line"></i>
    <a class="link-word" href=""><i class="icon"><img src="@/assets/images/product_list/yanxuan 65@2x.png" alt=""></i>网易严选</a><i class="line"></i>
    <a class="link-word" href="">关于我们</a><i class="line"></i>
    <div class="login-wrap">
      <a class="text-word" href="">您好，欢迎您来到商城！</a>
    </div>
  </div>
</template>

<script>
import getCurrentCityName from '@/assets/utils/location'
import { reqSystemConfig, reqAddressCascader } from '@/api/index'
import { logout } from '@/api/index'

export default {
  name: 'TopNav',
  data() {
    return {
      showPosition: true, // 显示城市定位
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
      username: '',
    }
  },
  created() {
    const userData = localStorage.getItem('userData')
    const userInfo = JSON.parse(userData)
    if (userInfo) {
      this.username = userInfo.userAccount
      this.isLogin = true
    }
    // const url = window.location.search
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
  mounted() {
    this.getSystemConfig()
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
    async handleLogout() {
      window.location.href = 'login.html'
      const userData = localStorage.getItem('userData')
      const userInfo = JSON.parse(userData)
      const token = userInfo.token
      await logout(token)
      localStorage.removeItem('userData')
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .location
    position relative
    margin-left: -96px;
    margin-top: -4px;
    padding 40px 0
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
</style>
