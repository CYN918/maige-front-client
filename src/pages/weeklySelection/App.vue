<template>
    <div>
      <top-nav></top-nav>
      <Header></Header>
      <Fetured></Fetured>
      <Footer></Footer>
      <fix-right-bar :nums="num"></fix-right-bar>
    </div>
</template>

<script>
// 周精选
import { reqShoppingCartNum } from '@/api/index'
import TopNav from '../common/TopNav2'
import Header from '../common/Header'
import Fetured from './featured/fetured'
import Footer from '../common/Footer'
import FixRightBar from '../common/FixRightBar'
export default {
  name: 'App',
  components: {
    TopNav,
    Header,
    Footer,
    Fetured,
    FixRightBar
  },
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
  created() {
    this.$bus.$on('getShoppingCartNum', async () => {
      const res = await reqShoppingCartNum()
      if (res.code === 200) {
        this.num = res.data
      }
    })
  },
}
</script>

<style scoped>

</style>
