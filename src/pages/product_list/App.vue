<template>
  <div style="background: #f9fbff">
    <top-nav></top-nav>
    <Header></Header>
    <BreadcrumbsNav></BreadcrumbsNav>
    <top-shift></top-shift>
    <Content style="margin-bottom: 20px" @getShoppingCartNum="getShoppingCartNum"></Content>
    <Footer></Footer>
    <fix-right-bar :nums="num"></fix-right-bar>
  </div>
</template>

<script>
import { reqShoppingCartNum } from '@/api/index'
import TopNav from '../common/TopNav2'
import Header from '../common/Header'
import BreadcrumbsNav from './components/BreadcrumbsNav'
import Footer from '../common/Footer'
import FixRightBar from '../common/FixRightBar'
import TopShift from './components/TopShift'
import Content from './components/Content'

export default {
  name: 'App',
  data() {
    return {
      num: 0,
    }
  },
  watch: {
    num(newVal) {
      if (newVal > 99) {
        this.num = '99+'
      }
    },

  },
  mounted() {
    if (sessionStorage.getItem('plPos')) {
      const pos = sessionStorage.getItem('plPos')
      document.documentElement.scrollTop = pos
      document.body.scrollTop = pos
    }
    window.addEventListener('scroll', this.recordScrollPos)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.recordScrollPos)
  },
  methods: {
    // 记录滚动条位置
    recordScrollPos() {
      const position = document.documentElement.scrollTop || document.body.scrollTop
      sessionStorage.setItem('plPos', position)
    },
    async getShoppingCartNum() {
      const res = await reqShoppingCartNum()
      if (res.code === 200) {
        this.num = res.data
      }
    },
  },
  components: {
    TopNav,
    Header,
    Footer,
    FixRightBar,
    BreadcrumbsNav,
    TopShift,
    Content,
  },
};
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .content
    autoMargin()
    display flex
    .title_wrap
      width 200px
      height 116px
      img
        width 100%
</style>
