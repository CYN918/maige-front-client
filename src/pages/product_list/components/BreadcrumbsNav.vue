<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-wrap">
    <el-breadcrumb-item class="tip-word">您当前位置</el-breadcrumb-item>
    <el-breadcrumb-item class="to_home place">
      <span @click="linkTo">首页</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item class="place" v-for="(item, index) in classificationName" :key="index">
      <span @click="skipTo(item.barId, item.parentId, item.index, index, item.catId)">{{item.name}}</span>
    </el-breadcrumb-item>
    <el-breadcrumb-item v-if="classificationName.length === 0" class="place">
      <span>商品列表</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { getInfoByCatId, reqProNameList } from '@/api/index'
import { parseUrl } from '@/assets/utils/utils'

export default {
  name: 'BreadcrumbsNav',
  data() {
    return {
      classificationName: [],
    }
  },
  async created() {
    const { barId = '', parentId = 1, index = 0, goodsName = '' } = this.getUrl()
    this.$store.commit('handleCatId', barId)
    this.$store.commit('hanldeGoodsName', goodsName)
    const obj = { barId, parentId }
    this.$store.dispatch('getProClassication', obj)
    await this.getClassificationName(barId)
    if (!!goodsName) {
      this.classificationName.unshift({
        name: goodsName,
      })
    }
  },
  methods: {
    // 根据面包屑导航返回
    skipTo(barId = 1, parenId = 0, index = 0, i, catId) {
      if (i === this.classificationName.length - 1) {
        return
      }
      window.location.href = `product_list.html?barId=${barId}&parentId=${parenId}&index=${index}&catId=${catId}`
    },
    // 获取分类名
    async getClassificationName(barId) {
      const res = await getInfoByCatId(barId)
      let index = 0
      let catId = ''
      if (res.code === 200) {
        const parentId = res.data.parentId
        const result = await reqProNameList(parentId)
        if (result.code === 200) {
          const data = result.data
          data.forEach((item, i) => {
            if (item.barId === barId) {
              index = i
              catId = item.catId
            }
          })
        }
        this.classificationName.unshift(
          {
            name: res.data.barName,
            barId,
            parentId,
            index,
            catId,
          })
        if (res.data.parentId && res.data.parentId !== 1) {
          this.getClassificationName(res.data.parentId)
        }
      }
    },
    // 获取URL
    getUrl() {
      const query = window.location.search
      const res = parseUrl(decodeURI(query))
      return res
    },
    linkTo() {
      window.location.href = 'index.html'
    },
  },
}
</script>

<style lang="stylus" scoped>
  .breadcrumb-wrap >>> .el-breadcrumb__inner.is-link
    color #606266
    font-weight normal
  .place >>> .el-icon-arrow-right:before
    content "/"
  .tip-word >>> .el-icon-arrow-right:before
    content ":"
  .breadcrumb-wrap
    height 40px
    line-height 40px
    padding 0 calc((100% - 1200px)/2)
    background #fff
    margin-bottom 14px
  .to_home, span
    cursor pointer
</style>
