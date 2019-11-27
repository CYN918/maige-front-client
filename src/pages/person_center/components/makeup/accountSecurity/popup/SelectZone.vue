<template>
  <div class="logistics" ref="my_popup">
    <span :class="{city_select: true, city_select_click: selected }"
          @click="choseZoom(1, 0)"
    >
      <slot></slot>
    </span>
    <transition name="slide-fade">
      <div class="city_wrap" v-show="selected">
        <ul class="chose-title" @click="chooseZoom">
          <li :class="{title:true, title_selected:title_index===0}" data-title_index='0'>省份</li>
          <li :class="{title:true, title_selected:title_index===1}" data-title_index='1' v-if="cities.length">城市</li>
          <li :class="{title:true, title_selected:title_index===2}" data-title_index='2' v-if="subdivides.length">区/县</li>
          <li :class="{title:true, title_selected:title_index===3}" data-title_index='3' v-if="districts.length">
            镇/街道
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
import { mapState } from 'vuex'
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
      city_selected: false,
      selected: false,
      provinces: [], // 省
      cities: [], // 市
      subdivides: [], // 区
      districts: [], // 街道
      zone: [], // 空区域
    }
  },
  async created() {
    // await this.autoChoseZoom(1)
  },
  computed: {
    ...mapState(['currentEditAddress']),
  },
  methods: {
    // 自动
    /* async autoChoseZoom(parentId) {
      const res = await reqAddressCascader(parentId)
      if (res.code === 200) {
        this.provinces = res.data.list
        await this.autoChoseZoom(res.data.list[0].regionId)
      }
    }, */
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
          this.haveNext('zone', label)
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
      document.addEventListener('click', this.handlePopupHide)
    },
    clearEvent() {
      document.removeEventListener('click', this.handlePopupHide)
    },
    // handlepopupHide
    handlePopupHide() {
      const ele = this.$refs.my_popup
      const bool = this.searchChildNode(ele)
      if (!bool) {
        this.selected = false
        this.clearEvent()
      }
      return 0
    },
    searchChildNode(ele) {
      const e = window.event
      const nodes = ele.childNodes || []
      if (ele.contains(e.target)) {
        return true
      } else if (nodes.length !== 0) {
        Array.forEach(nodes, item => this.searchChildNode(item))
      } else {
        return false
      }
      return false
    },
    getZone() {
      const province = this.provinces[this.province_index] ? this.provinces[this.province_index].regionName : ''
      const city = this.cities[this.city_index] ? this.cities[this.city_index].regionName : ''
      const subdivide = this.subdivides[this.subdivide_index] ? this.subdivides[this.subdivide_index].regionName : ''
      const district = this.districts[this.district_index] ? this.districts[this.district_index].regionName : ''
      let address = province + '/' + city
      address += subdivide ? '/' + subdivide : ''
      address += district ? '/' + district : ''
      const obj = {
        addressId: this.currentEditAddress.addressId,
        addressName: this.currentEditAddress.addressName,
        consignee: this.currentEditAddress.consignee,
        telephone: this.currentEditAddress.telephone,
        unitName: this.currentEditAddress.unitName,
        phone: this.currentEditAddress.phone,
        email: this.currentEditAddress.email,
        country: this.currentEditAddress.country,
        countryName: this.currentEditAddress.countryName,
        province: this.currentEditAddress.province,
        provinceName: province,
        city: this.currentEditAddress.city,
        cityName: city,
        district: this.currentEditAddress.district,
        districtName: subdivide,
        town: this.currentEditAddress.town,
        townName: district,
        address: this.currentEditAddress.address,
        zipcode: this.currentEditAddress.zipcode,
        signBuilding: this.currentEditAddress.signBuilding,
        bestTime: this.currentEditAddress.bestTime,
        def: this.currentEditAddress.def,
        sortOrder: this.currentEditAddress.sortOrder,
      }
      this.$store.commit('handlecurrentEditAddress', obj)
      this.$store.commit('handleAddress', address)
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
      display inline-block
      width:367px;
      height:34px;
      border:1px solid rgba(215,224,241,1);
      border-radius:5px;
      box-sizing border-box
      padding 0 6px
      transition all 0.3s ease
      .city
        width:324px;
        height:34px;
        line-height 34px
        display inline-block
        background: transparent;
        cursor pointer
      .city:focus
        border-color #409EFF
    .city_select:after
      display inline-block
      position absolute
      right 12px
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
