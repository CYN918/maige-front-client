<template>
  <div>
    <TopNav/>
    <Header/>
    <PreemptivePurchase/>
    <Footer></Footer>
  </div>
</template>
<script>
  import TopNav from '../../common/TopNav'
  import Header from '../../common/Header'
  import Footer from '../../common/Footer'
  import PreemptivePurchase from './components/preemptivePurchase'
  export default {
    components:{
      PreemptivePurchase,
      Header,
      Footer,
      TopNav
    }
  }
</script>
<style lang="stylus" scoped>

</style>
