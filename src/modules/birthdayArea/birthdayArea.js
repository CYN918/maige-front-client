// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import '@/assets/styles/reset.css'
import '@/assets/styles/iconfont/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/pages/activityArea/birthdayArea/App'
import router from '@/router/birthdayArea/index'
import store from '@/store/birthdayArea'
import  {isLogin} from "@/assets/utils/utils"
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
if(!isLogin()){
  location.href = "login.html"
}else{
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
  })
}

