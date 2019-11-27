<template>
    <div class="time" >
        <p>{{h}}:{{m}}:{{s}}</p>
    </div>
</template>
<script>
import { setInterval } from 'timers';

export default {
    props:['activedArr','toggle'],
    data(){
        return{
            h:'',
            m:'',
						s:'',
						flag:false,
            endTime:'',
            time:"",
        }
    },
  beforeDestroy() {
    clearInterval(this.time)
  },
	mounted(){
    console.log(this.flag)
    // this.difference = (new Date(this.activedArr.entTime).getTime()-new Date().getTime())/1000
		 this.time = setInterval(()=>{
				if(this.flag == true){
					clearInterval(this.time)
				}
        this.timeDown(this.activedArr.entTime)
      },1000)
  },
  methods:{
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
        }
      }   
}
</script>
<style lang="stylus" scoped>
.time
  margin-left 10px
</style>
