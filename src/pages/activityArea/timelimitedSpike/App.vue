<template>
    <div class="mitedSplikeContainer">
      <top-nav></top-nav>
	  	<Header></Header>
      <header>
          <img src="@/assets/images/office_Area/img/miaosha.png" alt="">
          <p>把最优惠的活动带给你</p>
      </header>
      <div class="navContainer">
        <div class="nav">
            <ul class="navItem"> 
              <li class="navList" v-for="(item,index) in activedArr" :key="index" @click=toggle(index,item.activityId,item.activityTypeId,item) :class="{'active':num===index}">
                <p class="start" :class="{'activeStart':num !==index}">
                  <span class="shijian">{{getHours[index]}}</span> 
                  <span class="jijiang" v-if="flag1.label!==0">{{index===0?flag1.text1:flag1.text2}}</span>
                  <!-- <span class="jijiang">{{label===index?text.text1:text.text1}}</span> -->
               </p>
                <p v-show="num===index" class="over">{{index===0?flag2.text1:flag2.text2}}
                   <countdown :activedArr='activedArr[index]'/>
                </p>
              </li>
            </ul>
        </div>
        <ProductList :eventGoodsArr="eventGoodsArr" :num="num" :status="activedArr[num].status"/>
      </div>
      <Footer></Footer>
      <fix-right-bar ></fix-right-bar>
    </div>
</template>
<script>
import TopNav from '../../common/TopNav'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import FixRightBar from '../../common/FixRightBar'
import ProductList from './components/productList'
import {timelimitedSpike,eventGoods} from '@/api/index.js'
import countdown from './components/countdown'
import { setInterval, setTimeout } from 'timers';
export default {
  data(){
    return{
      activedArr:[],   //时间列表
      activityId:'',
      activityTypeId:'', 
      eventGoodsArr:[],  //商品内容
      num:0,  
      getHours:"",
      flag1:{text1:"正在秒杀",text2:'即将开始'},
      flag2:{text1:"距结束",text2:'距开始'},
      falg:false,
      difference:'',
    }
  },
  components:{
    ProductList,
    countdown,
    TopNav,
    Header,
    Footer,
    FixRightBar,
  },
  
  //待考虑需不需要倒计时 自动跳转
  // watch:{
  //   activedArr(val,oldval){
  //     if(val!==oldval){
  //       console.log(val)
  //       this.difference = (new Date(val[this.num].entTime).getTime()-new Date(val[this.num].startTime).getTime())/1000
  //       setInterval(()=>{
  //         this.num++
  //         if(this.num===5){
  //           this.num=0
  //         }
  //         this.toggle(this.num,val[this.num].activityId,val[this.num].activityTypeId)
  //       },this.difference)
        
  //     }
  //   }
  // },

      // this.result = eventGoods(index,activityId)
  methods:{
    async toggle(index,activityId,activityTypeId,item){
      this.status = item.status
      this.num =index
      this.label=!this.label
      const obj={
         pageIndex:index,
         pageSize:12,
         activityId:activityId,
      }
      const commodity =await eventGoods(obj)
      if(commodity.code===200){
        console.log(commodity)
        this.eventGoodsArr = commodity.data
      
      }
      
    },
  },
  //获取a标签出入的值
  async created(){
    function parseUrl(){
      let url=location.href;
      let i=url.indexOf('?');
      if(i==-1)return;
      let querystr=url.substr(i+1);
      let arr1=querystr.split('&');
      let arr2=new Object();
      for  (i in arr1){
          let ta=arr1[i].split('=');
          arr2[ta[0]]=ta[1];
      }
          return arr2;
      }
      let v = parseUrl();//解析所有参数
      const result = await timelimitedSpike(v['activityId'],v['activityTypeId'])
      if(result.code===200){
        this.activityId=v['activityId']
        this.activityTypeId=v['activityTypeId']
        this.activedArr = result.data
        //返回每个数组的开始时间

        this.getHours = result.data.map((item)=>{
          return  new Date(item.startTime).toLocaleTimeString()
        })
        const obj={
          pageIndex:1,
          pageSize:12,
          activityId:this.activityId,
        }
        const res =await eventGoods(obj)
        if(res.code===200){
          this.eventGoodsArr=res.data
        }
      }
    },
}
</script>
<style lang="stylus"  scoped>
.mitedSplikeContainer
  background rgba(244, 244, 244, 1)
  width 100%
  overflow hidden
  header
    width 254px
    margin 0 auto
    margin-top 45px
    img 
      width 100%
      height 51px
    p
      font-size 14px
      font-family Microsoft YaHei
      font-weight 400
      color rgba(102, 102, 102, 1)
      text-align center
      margin-top 19px
      letter-spacing 11px
  .navContainer
    background white
    width 1200px
    margin auto
    margin-top 52px
    .nav
      width 100%
      height 86px
      border-bottom 4px solid rgba(248, 58, 57, 1) 
      .navItem
        width 100%
        height 100%
        display flex
        .navList
          overflow hidden
          flex 1
          text-align center
          &.active
            background linear-gradient(90deg,rgba(248,56,56,1),rgba(255,98,72,1))
            color white
          .start
            text-align center
            margin-top 22px
            &.activeStart
              margin-top 34px
            .jijiang
              margin-left 10px
              font-family Microsoft YaHei
              font-weight 400
            .shijian
              font-size 16px
              font-family Microsoft YaHei
              font-weight bold
          .over
             display flex
             justify-content center
             margin-top 16px
             text-align center

</style>
