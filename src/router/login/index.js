import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/pages/login/RouterComponents/Content'
import Register from '@/pages/login/RouterComponents/Register'
import FoundCode from '@/pages/login/RouterComponents/FoundCode'
import Step1 from '@/pages/login/RouterComponents/RegisterStep/Step1'
import Step2 from '@/pages/login/RouterComponents/RegisterStep/Step2'
import Step3 from '@/pages/login/RouterComponents/RegisterStep/Step3'
import FStep1 from '@/pages/login/RouterComponents/FondCodeStep/Step1'
import FStep2 from '@/pages/login/RouterComponents/FondCodeStep/Step2'
import FStep3 from '@/pages/login/RouterComponents/FondCodeStep/Step3'
import Account from '@/pages/login/RouterComponents/Login/Account'
import Phone from '@/pages/login/RouterComponents/Login/Phone'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Content,
      children: [
        {
          path: '/account',
          name: 'Account',
          component: Account,
        },
        {
          path: '/phone',
          name: 'Phone',
          component: Phone,
        },
      ],
      redirect: '/phone',
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      children: [
        {
          path: '/step1',
          name: 'Step1',
          component: Step1,
        },
        {
          path: '/step2',
          name: 'Step2',
          component: Step2,
        },
        {
          path: '/step3',
          name: 'Step3',
          component: Step3,
        },
      ],
      redirect: '/step1',
    },
    {
      path: '/foundCode',
      name: 'FoundCode',
      component: FoundCode,
      children: [
        {
          path: '/fstep1',
          name: 'fstep1',
          component: FStep1,
        },
        {
          path: '/fstep2',
          name: 'fstep2',
          component: FStep2,
        },
        {
          path: '/fstep3',
          name: 'FStep3',
          component: FStep3,
        },
      ],
      redirect: '/fstep1',
    },
  ],
})
