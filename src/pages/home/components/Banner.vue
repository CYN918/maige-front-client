<template>
  <div class="banner-wrapper" v-if="componentStatus&&componentStatus[0].componentStatus==0">
    <swiper class="banner-swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in bannerList||bannerImgs" :key="index">
        <a class="banner-link" :href="item.linkUrl">
          <img class="banner" :src="item.picUrl" :alt="item.title">
        </a>
      </swiper-slide>
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
    <SideBarNav></SideBarNav>
  </div>
</template>

<script>
import { reqBannerImg } from '@/api/index'
import SideBarNav from './sidebarnav/SideBarNav'

export default {
  name: 'banner',
  props:['componentStatus'],
  data() {
    return {
      bannerImgs: [],
      swiperOption: {
        loop: true,
        autoplay: 3000,
        speed: 1000,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
        paginationClickable: true,
      },
       bannerList:[]
    }
  },
  components: {
    SideBarNav,
  },
  mounted() {
    const content = JSON.parse(this.componentStatus[0].componentContents[0].content)||[]
    this.bannerList = content.sort(this.compare('sortOrder'))
    this.getBannerImg()
  },
  methods: {
    //排序
    compare(property){
        return function(a,b){
            let value1 = a[property];
            let value2 = b[property];
            return value1 - value2;
        }
      },
    async getBannerImg() {
      const res = await reqBannerImg(0)
      this.bannerImgs = res.data
    },
  },
}
</script>

<style lang="stylus" scoped>
  .banner-wrapper >>> .swiper-pagination-bullet
    width 10px
    height 10px
    border 1px solid rgba(255,255,255,1)
    border-radius 50%
    background none
  .banner-wrapper >>> .swiper-pagination-bullet-active
    width:10px;
    height:10px;
    border 4px solid rgba(255,255,255,.3)
    border-radius:50%;
    background white
    background-clip padding-box
  .banner-wrapper
    height 493px
    .banner-swiper
      height 100%
      .banner-link
        display block
        position relative
        width 100%
        height 100%
        overflow hidden
        .banner
          width 100%
          position absolute
          left 50%
          transform translateX(-50%)
          height 493px
</style>
