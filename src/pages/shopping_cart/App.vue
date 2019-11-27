<template>
  <div>
    <top-nav></top-nav>
    <Header></Header>
    <shoppingcart @changeShoppingcartNum="getShoppingCartNum"></shoppingcart>
    <Footer></Footer>
    <fix-right-bar :nums="num">
    </fix-right-bar>
  </div>
</template>

<script>
import { reqShoppingCartNum } from '@/api/index'
import TopNav from '../common/TopNav'
import Header from '../common/Header'
import Footer from '../common/Footer'
import FixRightBar from '../common/FixRightBar'
import Shoppingcart from './components/Shoppingcart'

export default {
  name: 'App',
  data() {
    return {
      num: 0,
    }
  },
  created() {
    this.getShoppingCartNum()
  },
  watch: {
    num(newVal) {
      if (newVal > 99) {
        this.num = '99+'
      }
    },
  },
  methods: {
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
    Shoppingcart,
  },
};
</script>

<style scoped>

</style>
