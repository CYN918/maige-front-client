<template>
    <div>
      <top-nav v-if="canVisitHome"></top-nav>
      <Header v-if="canVisitHome"></Header>
      <router-view></router-view>
      <Footer v-if="canVisitHome"></Footer>
    </div>
</template>

<script>
import { reqSystemConfig } from '@/api/index'
import TopNav from './RouterComponents/TopNav'
import Header from '../common/Header'
import Footer from '../common/Footer'

export default {
  name: 'login',
  components: {
    TopNav,
    Header,
    Footer,
  },
  data() {
    return {
      canVisitHome: true,
    }
  },
  mounted() {
    this.getSystemConfig()
  },
  methods: {
    async getSystemConfig() {
      const res = await reqSystemConfig('sys_user_login_enable')
      if (res.code === 200) {
        if (res.data.settingInfoList[0].key === 'open') {
          if (res.data.settingInfoList[0].checkValue === 'true') {
            this.canVisitHome = false
          } else {
            this.canVisitHome = true
          }
        } else if (res.data.settingInfoList[0].key === 'close') {
          if (res.data.settingInfoList[0].checkValue === 'false') {
            this.canVisitHome = false
          } else {
            this.canVisitHome = true
          }
        } else {
          this.canVisitHome = true
        }
      }
    }
  },
}
</script>

<style scoped>

</style>
