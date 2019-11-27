<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-wrap">
    <el-breadcrumb-item class="tip-word">您当前位置</el-breadcrumb-item>
    <el-breadcrumb-item class="to_home place">
      <span @click="linkTo">首页</span>
    </el-breadcrumb-item>
    <slot></slot>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'BreadcrumbsNav',
  props: {
    classificationName: Array,
  },
  methods: {
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
    background white
    margin-bottom 14px
  .to_home
    cursor pointer
</style>
