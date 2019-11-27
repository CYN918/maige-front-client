import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'swiper/dist/css/swiper.css'
import App from '@/pages/weeklySelection/App'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$bus = new Vue();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
})
