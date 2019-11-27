<template>
  <div>
    <top-nav></top-nav>
     <Header></Header>
      <Festival/>
    <FestivalEven/>
    <Footer></Footer>
    <fix-right-bar :nums="num"></fix-right-bar>
  </div>
</template>
<script>
import { reqShoppingCartNum } from '@/api/index'
import FestivalEven from './festivalEven'
import TopNav from '../../common/TopNav2'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import FixRightBar from '../../common/FixRightBar'
export default {
  components:{
    FestivalEven,
    TopNav,
    Header,
    Footer,
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
<style lang="stylus" scoped>

</style>
