// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
import App from '@/pages/shopping_cart/App'
import router from '@/router/shopping_cart/index'
import shoppingCart from '@/store/shopping_cart'
import { isLogin } from '@/assets/utils/utils'

Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)

/* eslint-disable no-new */
if (!isLogin()) {
  location.href = 'login.html'
} else {
  new Vue({
    el: '#app',
    router,
    store: shoppingCart,
    render: h => h(App),
  })
}
