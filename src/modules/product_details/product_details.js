// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import App from '@/pages/product_details/App'
import { reqSystemConfig } from '@/api/index'
import { isLogin } from '@/assets/utils/utils'

let canVisitHome = false
// 判断是否可以直接访问首页
reqSystemConfig('sys_user_login_enable').then((res) => {
  if (res.code === 200) {
    if (res.data.settingInfoList[0].key === 'open') {
      if (res.data.settingInfoList[0].checkValue === 'true') {
        canVisitHome = false
      } else {
        canVisitHome = true
      }
    } else if (res.data.settingInfoList[0].key === 'close') {
      if (res.data.settingInfoList[0].checkValue === 'false') {
        canVisitHome = false
      } else {
        canVisitHome = true
      }
    } else {
      canVisitHome = true
    }
  }
  Vue.config.productionTip = false
  Vue.use(ElementUI)

  /* eslint-disable no-new */
  Vue.prototype.$bus = new Vue();

  if (!canVisitHome && !isLogin()) {
    location.href = 'login.html'
  } else {
    new Vue({
      el: '#app',
      render: h => h(App),
    })
  }
})

