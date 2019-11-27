<template>
  <div class="logistics" ref="my_popup">
    <span :class="{city_select: true, city_select_click: selected }"
          @click="choseZoom(1, 0)"
    >
      <span class="t2">运送至</span>
      <span class="city" :title="zone">{{city}}</span>
    </span>
    <transition name="slide-fade">
      <div class="city_wrap" v-show="selected">
        <ul class="chose-title" @click="chooseZoom">
          <li :class="{title:true, title_selected:title_index===0}" data-title_index='0'>省份</li>
          <li :class="{title:true, title_selected:title_index===1}" data-title_index='1' v-if="cities.length">城市</li>
          <li :class="{title:true, title_selected:title_index===2}" data-title_index='2' v-if="subdivides.length">
            区/县
          </li>
          <li :class="{title:true, title_selected:title_index===3}" data-title_index='3' v-if="districts.length">
            街道
          </li>
        </ul>
        <div class="cities">
          <ul class="city_list" v-show="title_index===0">
            <li :class="{city_item: true, city_selected: province_index===index}"
                v-for="(item, index) in provinces" :key="item.regionId"
                @click="choseZoom(item.regionId, 1, index)"
                :title="item.regionName"
            >
              {{item.regionName}}
            </li>
          </ul>
          <ul class="city_list" v-show="cities.length && title_index===1">
            <li :class="{city_item: true, city_selected: city_index===index}"
                v-for="(city, index) in cities" :key="city.regionId"
                @click="choseZoom(city.regionId, 2, index)"
                :title="city.regionName"
            >
              {{city.regionName}}
            </li>
          </ul>
          <ul class="city_list" v-show="subdivides.length && title_index===2">
            <li :class="{city_item: true, city_selected: subdivide_index===index}"
                v-for="(subdivide, index) in subdivides"
                :key="subdivide.regionId"
                @click="choseZoom(subdivide.regionId, 3, index)"
                :title="subdivide.regionName"
            >
              {{subdivide.regionName}}
            </li>
          </ul>
          <ul class="city_list" v-show="districts.length && title_index===3">
            <li :class="{city_item: true, city_selected: district_index===index}"
                v-for="(district, index) in districts"
                :key="district.regionId"
                @click="choseZoom(district.regionId, 4, index)"
                :title="district.regionName"
            >
              {{district.regionName}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { reqAddressCascader } from '@/api/index'

export default {
  name: 'SelectZone',
  data() {
    return {
      title_index: 0,
      province_index: 0,
      city_index: 0,
      subdivide_index: 0,
      district_index: 0,
      zone: '广东深圳福田',
      city: '深圳',
      city_selected: false,
      selected: false,
      provinces: [], // 省
      cities: [], // 市
      subdivides: [], // 区
      districts: [], // 街道
      zoom: [],
    }
  },
  mounted() {
    if (sessionStorage.getItem('cityName')) {
      this.city = sessionStorage.getItem('cityName')
    }
  },
  methods: {
    chooseZoom() {
      const e = window.event
      if (e.target.nodeName.toLocaleLowerCase() === 'li') {
        this.title_index = e.target.dataset.title_index * 1
      }
    },
    // 弹出窗口 请求地区名
    async choseZoom(parentId, label, index) {
      const res = await this.reqZoom(parentId)
      switch (label) {
        case 0:
          this.selected = !this.selected
          this.title_index = label
          this.popupHide()
          this.provinces = res
          break
        case 1:
          this.province_index = index
          this.title_index = label
          this.cities = res
          break
        case 2:
          this.city_index = index
          this.subdivides = res
          this.haveNext('subdivides', label)
          break
        case 3:
          this.subdivide_index = index
          this.districts = res
          this.haveNext('districts', label)
          break
        case 4:
          this.district_index = index
          this.haveNext('zoom', label)
          break
        default :
          break
      }
    },
    haveNext(next, label) {
      if (this[next].length === 0) {
        this.getZone()
        this.selected = false
        this.cities = []
        this.subdivides = []
        this.districts = []
      } else {
        this.getZone()
        this.title_index = label
      }
    },
    // 请求地址
    async reqZoom(parentId) {
      const res = await reqAddressCascader(parentId)
      if (res.code === 200) {
        return res.data.list
      }
      return []
    },
    popupHide() {
      document.addEventListener('click', () => {
        const ele = this.$refs.my_popup
        const bool = this.searchChildNode(ele)
        if (!bool) {
          this.selected = false
        }
        return 0
      })
    },
    searchChildNode(ele) {
      const e = window.event
      const nodes = ele.childNodes
      if (ele.contains(e.target)) {
        return true
      } else if (nodes.length !== 0) {
        Array.forEach(nodes, item => this.searchChildNode(item))
      }
      return false
    },
    getZone() {
      const province = this.provinces[this.province_index] ? this.provinces[this.province_index].regionName : ''
      const city = this.cities[this.city_index] ? this.cities[this.city_index].regionName : ''
      const district = this.districts[this.district_index] ? this.districts[this.district_index].regionName : ''
      const subdivide = this.subdivides[this.subdivide_index] ? this.subdivides[this.subdivide_index].regionName : ''
      this.zone = province + city + subdivide + district
      this.city = city || province
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .slide-fade-enter-active, .slide-fade-leave-active
    transition all 0.3s linear
  .slide-fade-enter, .slide-fade-leave-to
    opacity 0
  .logistics
    position relative
    .t2
      display: inline-block;
      font-size: 14px;
      color: #666;
      margin-right: 16px;
    .city_wrap
      position absolute
      top 40px
      left 0px
      width 394px;
      padding 20px 6px 8px
      background rgba(255,255,255,1);
      border 1px solid rgba(204,204,204,1);
      z-index 9
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
        .city_selected
          background:rgba(30,159,255,1)
          color #fff
    .city_select
      position relative
      display flex
      align-items center
      width:124px;
      height:35px;
      line-height:35px;
      margin-right 12px
      box-sizing border-box
      padding 0 6px
      cursor pointer
      border:1px solid rgba(204,204,204,1);
      .city
        position: relative;
        left -10px
        width 42px
        display inline-block
        color #333
        font-size 14px
        ellipsis()
    .city_select:after
      display inline-block
      position absolute
      right 8px
      top 12px
      content ""
      width 6px
      height 6px
      border-left 2px solid #1E9FFF
      border-bottom  2px solid #1E9FFF
      transform rotate(-45deg)
    .city_select_click:after
      transform rotate(135deg)
      top 14px
    .drop:after
      position relative
      display inline-block
      content ""
</style>
