<template>
  <div>
    <top-nav></top-nav>
    <Header></Header>
    <FightGroup/>
    <Footer></Footer>
  </div>
</template>
<script>
  import TopNav from '../../common/TopNav2'
  import Header from '../../common/Header'
  import Footer from '../../common/Footer'
  import FightGroup from './components/fightGroup'
  export default {
    components:{
      TopNav,
      Header,
      Footer,
      FightGroup
    },

  }
</script>
<style lang="stylus" scoped>

</style>
