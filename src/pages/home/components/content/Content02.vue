<template>
<div v-if="componentStatus&&componentStatus[0].componentStatus==0">
   <div class="limit-area" :style="{background:content.bgcolor||bgcolor}" v-if="activitys">
    <ul class="clearfix">
      <li class="limit-item time-wrapper" @click="gotoTimelimitedSpike">
        <p class="top-tit" v-if="activitys.activityTopic">{{title||activitys.activityTopic}}</p>
        <p class="sub-tit" style="width:170px">{{content.title||activitys.content}}</p>
        <p class="line"></p>
        <div class="time-tit">
          <img src="@/assets/images/home/images/icon-timer.png" alt="">
          <span>距结束仅剩</span>
        </div>
        <div class="timer">
          <span class="timer-item">{{h}}</span>
          <span class="spice">:</span>
          <span class="timer-item">{{m}}</span>
          <span class="spice">:</span>
          <span class="timer-item">{{s}}</span>
        </div>
      </li>
      <li class="limit-item" v-for="(item,index) in (content.activityGoods.length>0&&content.activityGoods)||activitys.activityHomepageGoodsReturns" :key="index">
        <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activitys.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
          <div class="image">
            <img :src=item.skuImg @mouseenter="handleCache(index)" @mouseleave="leave" :class="index==selectedNum?'amplification':''">
          </div>
          <p class="name">{{item.goodsName}}</p>
          <p class="progress">
              <i :style="`width:${(item.goodsNumber-item.enableQuantity)/item.goodsNumber.toFixed(2)*100}%`"></i>
          </p>
          <p class="price">
            <span class="new-price">￥{{item.salePrice}}</span>
            <span class="old-price">￥{{item.ustomaryPrice}}</span>
          </p>
        </a>
      </li>
   </ul>
  </div>
</div>

</template>
<script>

export default {
  props: {
    activity: {
      type: Array,
      default: [],
      num:0
    },
    componentStatus: {
      type: Array,
      default: []
    },
  },
  name: 'Content02',
  data(){
    return{
      selectedNum:null,
      activitys:'',
      flag:false,
      endTime:'',
      h:'',
      m:'',
      s:'',
      goodsNumber:'', //总库存
      emableQuantity:'',   //已卖出
      num:'',  //剩余库存
      time:null,
      title:'',
      content:'',
      bacolor:"#EF4F4F"
    }
  },
  beforeDestroy() {
    clearInterval(this.time)
  },
  mounted(){
      this.title = this.componentStatus[0].componentContents[0].title||''
      this.content = JSON.parse(this.componentStatus[0].componentContents[0].content)||''
     this.activity.forEach(item=>{
        if(item.activityTypeNum==1){
          this.activitys = item
        }
      })
    if(this.activitys!==''&&this.activitys){
      this.endTime= this.activitys.entTime
      const endTime=this.endTime
      this.time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(this.time)
        }
        this.timeDown(endTime)
      },1000)
    }
  },
  watch:{
    activity(val,oldval){
      console.log(val)
      console.log(oldval)
      if(val!==oldval){
        val.find(item => {
          if(item.activityTypeNum === 1){
            this.activitys= item
          }
        })
      }

    if(this.activitys!==''&&this.activitys){
      this.endTime= this.activitys.entTime
      const endTime=this.endTime
      this.time = setInterval(()=>{
        if(this.flag == true){
          clearInterval(this.time)
        }
        this.timeDown(endTime)
      },1000)
    }
  },
  },
  //倒计时
  methods:{
    handleCache(index){
      this.selectedNum = index
    },
    leave(){
      this.selectedNum = null;
    },

      timeDown (data) {
        const endTime = new Date(data)
        const startTime = new Date();
        let leftTime = parseInt((endTime.getTime()-startTime.getTime())/1000)
        let h = this.formate(parseInt(leftTime/(60*60)%24))
        let m = this.formate(parseInt(leftTime/60%60))
        let s = this.formate(parseInt(leftTime%60))
        if(leftTime <= 0){
          this.flag = true
        }
        this.h=h
        this.m=m
        this.s=s
      },
      formate (time) {
        if(time>=10){
          return time
        }else{
          return `0${time}`
        }
      },
    //跳去详情页
    gotoTimelimitedSpike(){
        if(this.content&&this.content.urlLink){
          window.location.href =this.content.urlLink
        }else{
          window.location.href=`timelimitedSpike.html?activityId=${this.activitys.activityId}&activityTypeId=${this.activitys.activityTypeId}&activityTypeNum=${this.activitys.activityTypeNum}`
        }
    }
  }
};
</script>

<style lang='stylus' scoped>
   .limit-area {
      padding: 12px;
      box-sizing border-box
      margin-bottom: 30px;
      border-radius: 8px;
      background: #ef4f4f;
      width 1200px
      margin 0 auto
  }

   .limit-area ul {
    padding-bottom: 20px;
    background: #fff;
  }

   .limit-area .limit-item {
    float: left;
    width: 235px;
    height: 262px;
    padding: 28px 38px 0;
    box-sizing: border-box;
    background: #fff;
  }

   .limit-area .limit-item .image {
    position: relative;
    margin-bottom: 10px;
  }

   .limit-area .limit-item .image::after {
    display: block;
    content: '';
    width: 100%;
    padding-top: 100%;
  }

   .limit-area .limit-item .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

   .limit-area .limit-item .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    text-align: center;
  }

   .limit-area .limit-item .name:hover {
    color: #b62323;
  }

   .limit-area .limit-item .progress {
    height: 7px;
    margin-bottom: 15px;
    border-radius: 3px;
    background: #e8e8e8;
  }

   .limit-area .limit-item .progress i {
    display: block;
    height: 100%;
    background: #ed4f48;
    border-radius: 3px;
  }

   .limit-area .limit-item .price {
    text-align: center;
    font-size: 16px;
  }

   .limit-area .limit-item .price .new-price {
    color: #b62323;
    margin-right: 10px;
  }
  .limit-area .limit-item .price .old-price{
    text-decoration:line-through;
  }


   .limit-area .limit-item.time-wrapper {
    background: #ef4f4f;
    color: #fff;
  }

   .limit-area .limit-item.time-wrapper .top-tit {
    margin-bottom: 10px;
    font-size: 30px;
    font-weight: 700;
  }

   .limit-area .limit-item.time-wrapper .sub-tit {
    margin-bottom: 10px;
    font-size: 18px;
  }

   .limit-area .limit-item.time-wrapper .line {
    width: 35px;
    height: 4px;
    background: #fff;
  }

   .limit-area .limit-item.time-wrapper .time-tit {
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 20px;
  }

   .limit-area .limit-item.time-wrapper .time-tit img {
    width: 22px;
    height: 22px;
    vertical-align: top;
  }

   .limit-area .limit-item.time-wrapper .time-tit span {
    line-height: 22px;
  }

   .limit-area .limit-item.time-wrapper .timer .timer-item {
    display: inline-block;
    width: 42px;
    height: 42px;
    border-radius: 5px;
    background: #333;
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    line-height: 42px;
  }

   .limit-area .limit-item.time-wrapper .timer .spice {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    line-height: 42px;
  }
   .amplification
     transform: scale(1.1)
</style>
