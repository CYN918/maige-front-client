import Vue from 'vue'
import Router from 'vue-router'
import Alipay from '@/pages/payment/components/Alipay'
import Wechatpay from '@/pages/payment/components/Wechatpay'
import PayFailed from '@/pages/payment/components/PayFailed'
import TestPayFailed from '@/pages/payment/components/TestPayFailed'
import PaySucceed from '@/pages/payment/components/PaySucceed'

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
    {
      path: '/testfailure',
      name: 'TestPayFailed',
      component: TestPayFailed,
    },
  ],
})
