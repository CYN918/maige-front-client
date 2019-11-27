<template>
    <div>
      <top-nav></top-nav>
      <Header></Header>
      <router-view></router-view>
    </div>
</template>

<script>
import TopNav from '../common/TopNav'
import Header from '../common/Header'


export default {
  name: 'navigation_Page',
  components: {
    TopNav,
    Header,
    
  },
}
</script>

<style scoped>
   
</style>
