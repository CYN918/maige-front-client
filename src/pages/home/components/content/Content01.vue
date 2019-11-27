<template>
  <div class="export clearfix" v-if="componentStatus&&componentStatus[0].componentStatus==0">
    <div class="export-left">
      <div class="export-left_top">
        <a :href="(tableDta[0]&&tableDta[0].imgLink)||urlArr[0]" class="top-left">
          <img :src="(tableDta[0]&&tableDta[0].imgUrl)||imgArr[0]" alt />
        </a>
        <a :href="(tableDta[1]&&tableDta[1].imgLink)||urlArr[1]" class="top-right">
          <img :src="(tableDta[1]&&tableDta[1].imgUrl)||imgArr[1]" alt />
        </a>
      </div>
      <div class="export-left_bottom">
        <a :href="(tableDta[2]&&tableDta[2].imgLink)||urlArr[2]">
          <img :src="(tableDta[2]&&tableDta[2].imgUrl)||imgArr[2]" alt />
        </a>
        <a :href="(tableDta[3]&&tableDta[3].imgLink)||urlArr[3]">
          <img :src="(tableDta[3]&&tableDta[3].imgUrl)||imgArr[3]" alt />
        </a>
      </div>
    </div>
    <div class="export-right" v-if="tableDta[4]">
      <div class="expoort-right_top">
        <a :href="(tableDta[4]&&tableDta[4].imgLink)||urlArr[4]">
          <img :src="(tableDta[4]&&tableDta[4].imgUrl)||imgArr[4]" alt />
        </a>
      </div>
      <div class="expoort-right_bottom" v-if="tableDta[5]">
        <a :href="(tableDta[5]&&tableDta[5].imgLink)||urlArr[5]">
          <img :src="(tableDta[5]&&tableDta[5].imgUrl)||imgArr[5]" alt />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { reqBannerImg } from '@/api/index'

export default {
  name: 'Content01',
  props:['componentStatus'],
  data() {
    return {
      imgArr: [],
      urlArr: [],
      tableDta:[]
    };
  },
  mounted() {
    this.tableDta =JSON.parse(this.componentStatus[0].componentContents[0].content).tableData||[]
    this.getAdImg()
  },
  methods: {
    async getAdImg() {
      for (let i = 1; i < 7; i++) {
        const res = await reqBannerImg(i)
        if (res.data.length > 0) {
          this.imgArr.push(res.data[0].picUrl)
          this.urlArr.push(res.data[0].linkUrl)
        }
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
img
  box-sizing border-box
  border 1px solid #ccc
.export {
  margin-bottom: 30px;
  font-size: 0;
  width 1200px
  margin 0 auto
}

.export .export-left {
  float: left;
  width: 806px;
}

.export .export-left .export-left_top {
  margin-bottom: 12px;
}

.export .export-left .export-left_top .top-left {
  margin-right: 12px;
  width: 540px;
}

.export .export-left .export-left_top .top-left img {
  width: 540px;
  height: 372px;
}

.export .export-left .export-left_top .top-right {
  width: 254px;
}

.export .export-left .export-left_top .top-right img {
  width: 254px;
  height: 372px;
}

.export .export-left .export-left_bottom {
  height: 220px;
}

.export .export-left .export-left_bottom a:first-child {
  margin-right: 12px;
}

.export .export-left .export-left_bottom img {
  width: 397px;
  height: 220px;
}

.export .export-right {
  float: right;
  width: 382px;
}

.export .export-right img {
  width: 382px;
}

.export .export-right .expoort-right_top {
  margin-bottom: 12px;
  height: 226px;
}

.export .export-right .expoort-right_top img {
  height: 226px;
}

.export .export-right .expoort-right_bottom {
  height: 366px;
}

.export .export-right .expoort-right_bottom img {
  height: 366px;
}
</style>
