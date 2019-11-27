import Vue from 'vue'
import Router from 'vue-router'
import Alipay from '@/pages/activityPayment/components/Alipay'
import Wechatpay from '@/pages/activityPayment/components/Wechatpay'
import PayFailed from '@/pages/activityPayment/components/PayFailed'
import PaySucceed from '@/pages/activityPayment/components/PaySucceed'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wechatpay',
      component: Wechatpay,
    },
    {
      path: '/alipay',
      name: 'Alipay',
      component: Alipay,
    },
    {
      path: '/success',
      name: 'Success',
      component: PaySucceed,
    },
    {
      path: '/failure',
      name: 'Failure',
      component: PayFailed,
    },
  ],
})
