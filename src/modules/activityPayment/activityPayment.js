import Vue from 'vue'
import '@/assets/styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/iconfont/iconfont.css'
import router from '@/router/activityPayment/index'
import App from '@/pages/activityPayment/App'
import ElementUI from 'element-ui';

Vue.config.productionTip = false

Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
