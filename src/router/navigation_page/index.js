import Vue from 'vue'
import Router from 'vue-router'
import newbie_Guide from '@/pages/navigation_page/components/NewbieGuide.vue'
import Shipping from "@/pages/navigation_page/components/Shipping.vue"
import PaymentMethod from "@/pages/navigation_page/components/PaymentMethod.vue"
import AfterService  from "@/pages/navigation_page/components/AfterService.vue"
import AboutUs from "@/pages/navigation_page/components/AboutUs.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
    path: '/',
    name: 'newbie_Guide',
    component: newbie_Guide,
   
  },
  {
    path: '/Shipping',
    name: 'Shipping',
    component: Shipping,
  },
  {
    path: '/PaymentMethod',
    name: 'PaymentMethod',
    component: PaymentMethod,
  },
  {
    path:'/AfterService',
    name:'AfterService',
    component:AfterService,
  },
  {
    path:'/AboutUs',
    name:'AboutUs',
    component:AboutUs,
  }
],

})