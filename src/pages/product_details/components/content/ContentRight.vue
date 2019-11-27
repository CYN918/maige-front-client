<template>
  <div class="content_right">
    <div class="title-list" @click="handleTitleClick">
        <span :class="{title:true, selected: isSelected === 0}" data-index="0">商品信息</span>
        <span :class="{title:true, selected: isSelected === 1}" data-index="1">商品评价{{comcommentObj.pageList?"（"+comcommentObj.count+"）":'（0）'}}</span>
        <span :class="{title:true, selected: isSelected === 2}" data-index="2">售后服务</span>
    </div>
    <product-info v-if="isSelected === 0" :taild='data'></product-info>
    <reviews v-if="isSelected === 1" :commentCount="commentCount" :comcommentNum='comcommentObj' @pageindex='pae_index' :shopId="shopId" ></reviews>
    <after-sale v-if="isSelected === 2"></after-sale>
  </div>
</template>

<script>
import { getComments } from '@/api/index'
import AfterSale from './AfterSale'
import ProductInfo from './ProductInfo'
import Reviews from './Reviews'

export default {
  name: 'ContentRight',
  props: {
    data: {
    },
    commentCount: {
    },
    shopId: {
      type: String,
    },
  },
  computed: {
    attrList() {
      return this.data.attrList
    },
  },
  data() {
    return {
      isSelected: 0,
      comcommentObj: {},
      pageSize: 10,
      pageIndex: 1,
    }
  },
  methods: {
    pae_index(val) {
      this.pageIndex = val
      this.getComments()
    },
    handleTitleClick(e) {
      if (e.target.nodeName.toLocaleLowerCase() === 'span') {
        this.isSelected = e.target.dataset.index * 1
      }
    },
    async getComments() {
      const obj = {}
      obj.goodsId = this.shopId
      obj.pageIndex = this.pageIndex
      obj.pageSize = this.pageSize
      const res = await getComments(obj)
      if (res.code === 200) {
        this.comcommentObj = res.data
      }
    },
  },
  components: {
    AfterSale,
    ProductInfo,
    Reviews,
  },
  mounted() {
    this.getComments()
  },
}
</script>

<style lang="stylus" scoped>
  .content_right
    width 100%
    .title-list
      display flex
      .title
        display inline-block
        padding 0 27px
        height 36px
        line-height 36px
        text-align center
        color: #666
        cursor pointer
      .selected
        color: #4C86F4
        border:1px solid rgba(214,222,239,1);
        border-bottom none
        position relative
        top 1px
        background: white;
</style>
