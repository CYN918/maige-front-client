
<template>
<div>
		<div class="coupon">
				<div class="navList">
					<span :class="{active:index===num}" v-for="(item,index) in coupons" :key="index" @click="isColor(index)">
						{{item}}
					</span>
				</div>		
			
		</div>
			<!-- 全部有优惠劵 -->
			<AllReaEnvelope></AllReaEnvelope>	
</div>
</template>
<script>
import AllReaEnvelope from './allredenvelope'
export default {
name:'redenvelope',
    components:{
        AllReaEnvelope
    },
	data(){
		return{
			num:0,
			coupons:["所有宏奥",`未使用( ${ 0 } )`,`已使用( ${ 1 } )`,`已过期( ${ 5 } )`],
		}
	},
 
	methods:{
		isColor(index){
			this.num=index
		}
	}
}
</script>
<style lang="stylus" scoped>
.coupon
	width 1070px
	.navList
		width 100%
		height 57px
		border-bottom 1px solid rgba(239,239,239,1)
		background-color white
		span 
			cursor default 
			display inline-block
			font-size 13px
			color rgba(119, 119, 119, 1)
			margin-left 72px
			margin-top 24px
			&.active
				color rgba(64, 158, 255, 1)
</style>
	