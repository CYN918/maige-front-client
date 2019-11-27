<template>
	<div>
		<div class="couponItem">
			<ul class="couponList">
				<li v-for="(itme,index) in couponListArr" :key="index" >
					<div class="couponList_top">
							<div class="couponList_center" :class="itme.Expired?'expired':'use'">
								<p class="price">
									<span>{{itme.title1}}</span>
									<span>{{itme.title2}}</span>
									<span>{{itme.title3}}</span>
							  </p>
								<p class="price">{{itme.title4}}</p>
								<p class="price">{{itme.title5}}</p>
							</div>
					</div>
					<div class="couponList_btn">
							<p>
								<span>{{itme.Category.title6}}</span>
								<span>: {{itme.Category.title7}}</span>
							</p>
							<p>
								<span>{{itme.Category.title8}}</span>
								<span>: {{itme.Category.title9}}</span>
							</p>
							<p>
								<span>{{itme.Category.title10}}</span>
								<span>: {{itme.Category.title11}}</span>
							</p>
					</div>
					<!-- 路由跳转 -->
					<button class="btn">立即使用</button>
				</li>
			</ul>
    </div>
	</div>
</template>
<script>
	export default {
		name:"coupons",
		data(){
			return{
				couponListArr:[
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:false,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
				}
			},
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:false,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
				}
			},
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:false,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
				}
			},
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:false,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
			}
			},
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:true,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
			}
			},
			{
				title1:'￥',
				title2:'50',
				title3:'优惠劵',
				title4:'满300可用',
				title5:'2019.08.01-2019.08.16',
				Expired:true,
				Category:{
					title6:"限品类",
					title7:"仅可购买茗茶部分商品",
					title8:"限平台",
					title9:"全平台",
					title10:"卷编号",
					title11:"71457328441",
			}
			}
		]
			}
		}
	}
</script>
<style lang="stylus" scoped>
.couponItem
	width 100%
	.couponList
		width 100%
		overflow hidden
		display flex
		flex-wrap wrap
		li
			position relative
			width 232px
			background-color white
			margin-top 30px
			padding-bottom 26px
			margin-left 20px
			.couponList_top
				position relative
				width 100%
				height 198px
				.couponList_center
					position absolute
					left 0
					top 0
					right 0
					bottom 0
					margin auto 
					width 232px
					height 175px
					&.use
						background url("~@/assets/images/person_center/image/coupon.png") center center 
					&.expired
						background url("~@/assets/images/person_center/image/已过期.png") center center 
			  	.price
						color rgba(255, 255, 255, 1)
						text-align center
						font-family Microsoft YaHei
						font-size 14px
						font-weight 400
						&:nth-child(1)
							margin-top 35px
						&:nth-child(2)
							margin-top 10px
						&:nth-child(3)
							margin-top 42px
						span
							&:nth-child(1)
								font-size 24px
								margin-right 5px
							&:nth-child(2)
								font-size 36px
							&:nth-child(3)
								font-size 14px
			.couponList_btn		
				width 232px
				height 94px
				box-sizing border-box
				padding-left 10px
				p
					margin-top 12px
					font-size 13px
					span 
						&:nth-child(1)
							color rgba(96, 98, 102, 1)
						&:nth-child(2)
							color rgba(161, 164, 168, 1)
			.btn
				width 121px
				height 33px
				background rgba(84,165,255,1)
				border-radius 16px
				color white
				font-size 14px
				font-family Microsoft YaHei
				font-weight 400
				color rgba(255,255,255,1)
				margin-left 56px				
</style>
