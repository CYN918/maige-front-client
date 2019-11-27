<template>
    <div class="star">
        <span  class="staritem" :class="item" v-for="(item,index) in classArr" :key="index"></span>
    </div>
</template>
<script>
export default {
  	name:'Star',
		props:{
			score:Number   //用户评论的分数
		},
    computed:{
				classArr(){
					let classArr=[]
					const {score} =this
					for(let i=0;i<(score/2);i++){
							classArr.push('on')
					}	
					for(let j=0;j<(5-score/2);j++){
					  	classArr.push('off')
					}
					return classArr
				}
		}
}
</script>
<style lang="stylus" scoped>
.star
	margin-top -3px
	.staritem 
		display inline-block
		width 16px
		height 16px
		&.on
			background url("~@/assets/images/person_center/image/staron.png")
		&.off
			background url("~@/assets/images/person_center/image/staroff.png")
</style>