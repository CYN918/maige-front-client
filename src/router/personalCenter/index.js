import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '@/pages/person_center/components/mymainpage/mainpage';
import management from '@/pages/person_center/components/funtmanagement/management';
import orderCenter from '@/pages/person_center/components/order_center/order_center';
import makeup from '@/pages/person_center/components/makeup/makeup';
import Orderdetails from '@/pages/person_center/components/order_center/orderdetails/orderdetails'
import evaluationOf from '@/pages/person_center/components/order_center/evaluationof/evaluation'
import evaluationDetial from '@/pages/person_center/components/order_center/evaluationof/evaluationdetails'
import cancelOrder from '@/pages/person_center/components/order_center/cancelOrder/cancelOrder'

import myorder from '@/pages/person_center/components/order_center/myorder'
import content from '@/pages/person_center/components/order_center/cancelOrder/content'
import evaluation from '@/pages/person_center/components/order_center/evaluation/evaluation'
import review from '@/pages/person_center/components/order_center/evaluationof/review'
import exchange from '@/pages/person_center/components/order_center/exchange/exchange'
import service from '@/pages/person_center/components/order_center/service/service'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: mainpage,
    },
    {
      path: '/management',
      name: 'management',
      component: management,
    },
    {
      path: '/orderCenter',
      name: 'orderCenter',
      component: orderCenter,
      children: [
        {
          path: '/orderCenter/myorder',
          name: 'myorder',
          component: myorder,
        },
        {
          path: '/orderCenter/content',
          name: 'content',
          component: content,
          children: [
            {
              path: '/orderCenter/cancelOrder/cancelOrder',
              name: 'cancelOrder',
              component: cancelOrder,
            },
            {
              path: '/orderCenter/cancelOrder/evaluationOf',
              name: 'evaluationOf',
              component: evaluationOf,
            },
            {
              path: '/orderCenter/cancelOrder/evaluationDetial',
              name: 'evaluationDetial',
              component: evaluationDetial,
            },
            {
              path: '/orderCenter/cancelOrder/review',
              name: 'review',
              component: review,
            },
          ],
        },
        {
          path: '/orderCenter/evaluation',
          name: 'evaluation',
          component: evaluation,
        },
        {
          path: '/orderCenter/exchange',
          name: 'exchange',
          component: exchange,
        },
        {
          path: '/orderCenter/service',
          name: 'service',
          component: service,
        },
      ],
    },
    {
      path: '/makeup',
      name: 'makeup',
      component: makeup,
    },
    {
      path: '/orderdetails',
      name: 'Orderdetails',
      component: Orderdetails,
    },
  ],
})
