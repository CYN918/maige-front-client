<template>
    <div>
			<TopNav/>
			<Header/>
			<customizedGifts/>
      <Footer/>
    </div>
</template>
<script>
// 礼品定制
import TopNav from '../../common/TopNav'
import Header from '../../common/Header'
import customizedGifts from './components/customizedGifts'
import Footer from '../../common/Footer'
export default {
	name: 'App',
  components: {
      customizedGifts,
      TopNav,
      Header,
      Footer
  },
}
</script>

<style lang="stylus" scoped>

</style>
