<!--<template>-->
  <!--<div class="contentWrap">-->
    <!--<div class="content">-->
      <!--<Content01></Content01>-->
      <!--<div v-if="isshowActivity">-->
        <!--<Content02 :activity='timelimitedSpike'></Content02>-->
        <!--<Content06  :activity='activity'></Content06>-->
        <!--<Content03 :activity='activity'></Content03>-->
        <!--<Content04 :activity='specialOffer'></Content04>-->
        <!--<Content05 :activity='discount'></Content05>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->
<!--import { activityHome } from '@/api/index'-->
<!--import Content01 from './content/Content01'-->
<!--import Content02 from './content/Content02'-->
<!--import Content03 from './content/Content03'-->
<!--import Content04 from './content/Content04'-->
<!--import Content05 from './content/Content05'-->
<!--import Content06 from './content/Content06'-->
<!--export default {-->
  <!--name: 'Content',-->
  <!--components: {-->
    <!--Content01,-->
    <!--Content02,-->
    <!--Content03,-->
    <!--Content04,-->
    <!--Content05,-->
    <!--Content06-->
  <!--},-->
  <!--data() {-->
    <!--return {-->
      <!--isshowActivity:true,-->
      <!--activity: [],-->
      <!--timelimitedSpike:'',-->
      <!--weekly_selection:'',-->
      <!--birthdayArea:'',-->
      <!--festival:'',-->
      <!--specialOffer:'',-->
      <!--discount:'',-->
      <!--activityArr:[]-->
    <!--}-->
  <!--},-->
  <!--async created() {-->
    <!--const result = await activityHome()-->
    <!--if (result.code === 200) {-->
       <!--if(result.data==[]||result.data.length<=0){-->
          <!--this.isshowActivity = false-->
          <!--return false-->
      <!--}-->
      <!--this.activity = result.data-->
      <!--console.log( this.activity)-->
      <!--//限时秒杀-->
   <!---->
    <!---->
  <!---->
      <!--//折扣专区-->
      <!--this.discount =  this.activity.find(item => {-->
           <!--if( item.activityTypeNum === 6){-->
             <!--return item-->
          <!--}else{-->
            <!--return false-->
          <!--}-->
      <!--})-->
    <!--}-->
  <!--},-->
<!--}-->
<!--</script>-->

<!--<style lang="stylus" scoped>-->
<!--.contentWrap-->
  <!--width 100%-->
  <!--background #f9fbff-->
  <!--overflow hidden-->
  <!--.content-->
    <!--width 1200px-->
    <!--margin 0 auto-->
    <!--margin-top 25px-->
    <!--&:nth-child(1)-->
      <!--margin-top 0-->
<!--</style>-->
