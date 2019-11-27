// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import App from '@/pages/product_list/App'
import productListStore from '@/store/product_list'
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
  Vue.use(VueAwesomeSwiper)
  Vue.use(ElementUI)

  if (!canVisitHome && !isLogin()) {
    location.href = 'login.html'
  } else {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      store: productListStore,
      render: h => h(App),
    })
  }
})

