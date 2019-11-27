<template>
  <div v-if="productInformation">
    <div class="personaRight" v-if="time">
      <p class="personaRightText">
        <span>还差{{productInformation.number}}人拼成</span>
        <span>剩余{{h}}:{{m}}:{{s}}</span>
      </p>
    </div>
    <p v-if="!time">还差{{productInformation.number}}人拼成，剩余{{h}}:{{m}}:{{s}}</p>
  </div>
</template>
<script>
  import { addressUrl } from '@/assets/utils/utils'
export default {

  props:['time','productInformation'],
  data(){
    return{
      h:'',
      m:'',
      s:'',
      flag:false,
      groupMenber:'' //拼团总人数
    }
  },
  mounted(){
    const v = addressUrl()
    this.groupMenber = v['groupMenber']
    let time = setInterval(()=>{
      if(this.flag == true){
        clearInterval(time)
      }
      const { createTime } = this.productInformation
      this.timeDown(createTime)
    },1000)
  },
  //倒计时
  methods:{
    timeDown (data) {
      const endTime = new Date(data)
      const startTime = new Date();
      let leftTime = parseInt((endTime.getTime()+1000*60*60*24-startTime.getTime())/1000)
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
    }
  }
}
</script>
<style lang="stylus">
  //轮播图中得样式
.personaRight
  display flex
  .personaRightText
    height 35px
    display flex
    flex-direction column
    justify-content space-around
    span
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      &:nth-child(1)
        color:rgba(102,102,102,1);
      &:nth-child(2)
        color:rgba(153,153,153,1);
//    更多弹框得时间样式
p
  text-align center
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(102,102,102,1);
</style>
