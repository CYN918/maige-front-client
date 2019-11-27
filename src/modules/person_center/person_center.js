// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import App from '@/pages/person_center/App'
import router from '@/router/personalCenter/index'
import { isLogin } from '@/assets/utils/utils'
import store from '@/store/person_center'


Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

if (process.env.NODE_ENV === 'development') {
  Vue.prototype.a_URL  = 'http://www.maige.com'
} else {
  Vue.prototype.a_URL = `http://${location.hostname}`
}

/* eslint-disable no-new */
if (!isLogin()) {
  location.href = 'login.html'
} else {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  })
}
