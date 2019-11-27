<template>
    <div>
        <TopNav></TopNav>
        <Header></Header>
        <Index></Index>
        <Footer></Footer>
        <FixRightBar></FixRightBar>
    </div>
</template>
<style lang="stylus" scoped>
  div
    Header
      height 100%
</style>
<script>

import { isLogin } from '@/assets/utils/utils'
import TopNav from '@/pages/common/TopNav'
import Header from '@/pages/common/Header'
import Footer from '@/pages/common/Footer'
import FixRightBar from '@/pages/common/FixRightBar'
import Index from './components/index'

export default {
  name: 'person_center',
  components: {
    TopNav,
    Header,
    Index,
    Footer,
    FixRightBar,
  },
  beforeCreate() {
    // 未登录跳转至登录页
    const islogin = isLogin()
    if (!islogin) {
      window.location.href = 'login.html'
    }
  },
}
</script>

