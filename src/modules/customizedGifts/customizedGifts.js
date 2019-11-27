// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/pages/activityArea/customizedGifts/App'

Vue.config.productionTip = false
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
})
