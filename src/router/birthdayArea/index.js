import Vue from "vue";
import Router from "vue-router";
import LeaveMessage from "@/pages/activityArea/birthdayArea/componets/birthday/leaveMessage/index.vue";
import Birthday from "@/pages/activityArea/birthdayArea/componets/birthday/index.vue";
import Child from "@/pages/activityArea/birthdayArea/componets/child/index.vue";
import Entry from "@/pages/activityArea/birthdayArea/componets/entry/index.vue";
import Marry from "@/pages/activityArea/birthdayArea/componets/marry/index.vue";
import Promotion from "@/pages/activityArea/birthdayArea/componets/promotion/index.vue";
import PickGift from "@/pages/activityArea/birthdayArea/componets/birthday/pickGift/index.vue";
import Gift from "@/pages/activityArea/birthdayArea/componets/birthday/gift/index.vue";
import RedEnvelope from "@/pages/activityArea/birthdayArea/componets/birthday/redEnvelope/index.vue";

import PickGiftmarry from "@/pages/activityArea/birthdayArea/componets/marry/pickGift/index.vue";
import Giftmarry from "@/pages/activityArea/birthdayArea/componets/marry/gift/index.vue";
import RedEnvelopemarry from "@/pages/activityArea/birthdayArea/componets/marry/redEnvelope/index.vue";
import LeaveMessagemarry from "@/pages/activityArea/birthdayArea/componets/marry/leaveMessage/index.vue";

import PickGiftchild from "@/pages/activityArea/birthdayArea/componets/child/pickGift/index.vue";
import Giftchild from "@/pages/activityArea/birthdayArea/componets/child/gift/index.vue";
import RedEnvelopechild from "@/pages/activityArea/birthdayArea/componets/child/redEnvelope/index.vue";
import LeaveMessagechild from "@/pages/activityArea/birthdayArea/componets/child/leaveMessage/index.vue";

import PickGiftpromotion from "@/pages/activityArea/birthdayArea/componets/promotion/pickGift/index.vue";
import Giftpromotion from "@/pages/activityArea/birthdayArea/componets/promotion/gift/index.vue";
import RedEnvelopepromotion from "@/pages/activityArea/birthdayArea/componets/promotion/redEnvelope/index.vue";
import LeaveMessagepromotion from "@/pages/activityArea/birthdayArea/componets/promotion/leaveMessage/index.vue";

import PickGiftentry from "@/pages/activityArea/birthdayArea/componets/entry/pickGift/index.vue";
import Giftentry from "@/pages/activityArea/birthdayArea/componets/entry/gift/index.vue";
import RedEnvelopeentry from "@/pages/activityArea/birthdayArea/componets/entry/redEnvelope/index.vue";
import LeaveMessageentry from "@/pages/activityArea/birthdayArea/componets/entry/leaveMessage/index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/birthday",
      name: 'Birthday',
      component: Birthday,
      meta:{
        label: true
      }
    },
    {
      path: "/child",
      name: 'Child',
      component: Child,
      meta:{
        label:true
      }
    },
    {
      path: "/entry",
      name: 'Entry',
      component: Entry,
      meta:{
        label:true
      }
    },
    {
      path: "/marry",
      name: 'Marry',
      component: Marry,
      meta:{
        label:true
      }
    },
    {
      path: "/LeaveMessage",
      name: 'LeaveMessage',
      component: LeaveMessage,
      meta:{
        label:true
      }
    },
    {
      path: "/promotion",
      name: 'Promotion',
      component: Promotion,
      meta:{
        label:true
      }
    },
    {
      path: "/pickGift",
      name: 'PickGift',
      component: PickGift,
      meta:{
        label:true
      }
    },
    { 
      path:'/gift',
      name:'Gift',
      component:Gift,
      meta:{
        label:false
      }
    },
    {
      path: "/redEnvelope",
      name: 'RedEnvelope',
      component: RedEnvelope,
      meta:{
        label:true
      }
    },

    {
      path: "/pickGiftmarry",
      name: 'PickGiftmarry',
      component: PickGiftmarry,
      meta:{
        label:true
      }
    },
    {
      path: "/giftmarry",
      name: 'giftmarry',
      component: Giftmarry,
      meta:{
        label:false
      }
    },

    {
      path: "/redEnvelopemarry",
      name: 'RedEnvelopemarry',
      component: RedEnvelopemarry,
      meta:{
        label:false
      }
    },
        
    {
      path: "/leaveMessagemarry",
      name: 'LeaveMessagemarry',
      component: LeaveMessagemarry,
      meta:{
        label:true
      }
    },
    {
      path: "/leaveMessagechild",
      name: 'LeaveMessagechild',
      component: LeaveMessagechild,
      meta:{
        label:true
      }
    },
    {
      path: "/pickGiftchild",
      name: 'PickGiftchild',
      component: PickGiftchild,
      meta:{
        label:true
      }
    },
    {
      path: "/giftchild",
      name: 'Giftchild',
      component: Giftchild,
      meta:{
        label:false
      }
    },
    {
      path: "/redEnvelopechild",
      name: 'RedEnvelopechild',
      component: RedEnvelopechild,
      meta:{
        label:true
      }
    },

  

    {
      path: "/pickGiftpromotion",
      name: 'PickGiftpromotion',
      component: PickGiftpromotion,
      meta:{
        label:true
      }
    },
    {
      path: "/giftpromotion",
      name: 'Giftpromotion',
      component: Giftpromotion,
      meta:{
        label:false
      }
    },
    {
      path: "/redEnvelopepromotion",
      name: 'RedEnvelopepromotion',
      component: RedEnvelopepromotion,
      meta:{
        label:true
      }
    },
    {
      path: "/LeaveMessagepromotion",
      name: 'LeaveMessagepromotion',
      component: LeaveMessagepromotion,
      meta:{
        label:true
      }
    },
    {
      path: "/leaveMessagechild",
      name: 'LeaveMessagechild',
      component: LeaveMessagechild,
      meta:{
        label:true
      }
    },

    {
      path: "/pickGiftentry",
      name: 'PickGiftentry',
      component: PickGiftentry,
      meta:{
        label:true
      }
    },
    {
      path: "/giftentry",
      name: 'Giftentry',
      component: Giftentry,
      meta:{
        label:false
      }
    },
    {
      path: "/redEnvelopeentry",
      name: 'RedEnvelopeentry',
      component: RedEnvelopeentry,
      meta:{
        label:true
      }
    },
    {
      path: "/leaveMessageentry",
      name: 'LeaveMessageentry',
      component: LeaveMessageentry,
      meta:{
        label:true
      }
    },
    {
      path: "/",
      redirect: "/birthday"
    }
  ]
});
