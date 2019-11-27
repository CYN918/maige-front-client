<template>
    <div>
        <div class="center"> 
				<div class="left">
					<div class="price_icon"></div>
					<div class="account_balance">
							<span class="personal">个人账户余额</span>
							<span class="price">900.00元</span>
					</div>					
			</div>
				<div class="btn">
					<el-button type="primary" style="height:40px">
						营销活动首页
					</el-button>
				</div>
			</div>
        <Allmarketing/>
    </div>
</template>
<script>
import Allmarketing from './allmarketing'
export default {
	name:'marking',
    components:{
        Allmarketing
    }
}
</script>
<style lang="stylus" scoped>
.center
	margin-bottom 20px
	display flex
	justify-content space-between
	width 100%
	background white
	.left
		margin-left 50px
		box-sizing border-box
		padding-top 35px
		width 187px
		height 121px
		display flex
		justify-content space-between
		.price_icon
			width 52px
			height 52px
			background url("~@/assets/images/person_center/image/ying.png") center center 
			background-size 100%
		.account_balance
			margin-top -2px
			display flex
			flex-direction column
			justify-content space-around
			height 62px
			.personal
				display inline-block
				width 96px;
				height 16px;
				font-size 16px;
				font-family Microsoft YaHei;
				font-weight 400;
				color rgba(102,102,102,1);
				margin-left 2px
			.price
				display inline-block
				width 121px
				height 21px
				color rgba(76, 134, 244, 1)
				font-size 28px
				font-weight 400
				font-family Microsoft YaHei
				white-space nowrap;
.btn
	width 115px
	height 40px
	margin-top 42px
	margin-right 55px

</style>