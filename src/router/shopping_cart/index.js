import Vue from 'vue'
import Router from 'vue-router'
import Confirminfo from '@/pages/shopping_cart/components/RouterComponents/confirminfo'
import Filladdress from '@/pages/shopping_cart/components/RouterComponents/filladdress'
import Shopcart from '@/pages/shopping_cart/components/RouterComponents/shopcart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myCart',
      component: Shopcart,
    },
    {
      path: '/address',
      name: 'Address',
      component: Filladdress,
    },
    {
      path: '/confirmInform',
      name: 'ConfirmInform',
      component: Confirminfo,
    },
  ],
})
