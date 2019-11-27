<template>
    <div class="redenvelope_container">
				<div v-for="(item,index) in redenvelope" :key="index" class="redenvelope_item">
					<div class="left">
						<p class="redenvelope">{{item.title1}}</p> 
						<p>{{item.title2}}</p> 
						<p>{{item.title3}}</p> 
					</div>
					<div class="right" :class="{'active':item.use}">
						<p>
							<span class="price">{{item.title4}}</span>
							<span>{{item.title5}}</span>
						</p>
						<span>{{item.title6}}</span>
						<span v-if="!item.use">{{item.title7}}</span>
					</div>
						<div class="used" v-if="item.use">
							<div class="msg">
						</div>
					</div>
				</div>
    </div>
</template>
<script>
export default {
		name:'allredenvelope',
		data(){
			return{
				redenvelope:[
					{
						use:false,
						title1:"全场通用红包",
						title2:"仅限新用户收单实用",
						title3:"有效期至2019-09-10",
						title4:"50",
						title5:"元",
						title6:"满150可用",
						title7:"立即使用 >",
					},
					{
						use:false,
						title1:"全场通用红包",
						title2:"仅限新用户收单实用",
						title3:"有效期至2019-09-10",
						title4:"50",
						title5:"元",
						title6:"满150可用",
						title7:"立即使用 >",
					},
				{
						use:false,
						title1:"全场通用红包",
						title2:"仅限新用户收单实用",
						title3:"有效期至2019-09-10",
						title4:"50",
						title5:"元",
						title6:"满150可用",
						title7:"立即使用 >",
					},
				{
						use:true,
						title1:"全场通用红包",
						title2:"仅限新用户收单实用",
						title3:"有效期至2019-09-10",
						title4:"50",
						title5:"元",
						title6:"满150可用",
						title7:"立即使用 >",
					},
				{		
						use:true,
						title1:"全场通用红包",
						title2:"仅限新用户收单实用",
						title3:"有效期至2019-09-10",
						title4:"50",
						title5:"元",
						title6:"满150可用",
						title7:"立即使用 >",
					},
				],
			}
		}
}
</script>
<style lang="stylus" scoped>
.redenvelope_container
	display flex
	flex-wrap wrap
	.redenvelope_item
		position relative
		width 322px
		height 117px
		overflow hidden
		display flex
		justify-content space-between
		margin-top 23px
		margin-left 23px
		background url("~@/assets/images/person_center/image/椭圆 1 拷贝.png") center center 
		.left
			height 100%
			color rgba(153,153,153,1)
			font-weight 400
			font-size 14px
			font-family Microsoft YaHei
			margin-left 45px 
			margin-top 31px
			.redenvelope
				color rgba(51, 51, 51, 1)
				font-size 20px
			p
				text-align left
				&:nth-child(2)
					margin-top 13px
				&:nth-child(3)
					margin-top 4px
		.right
			width 97px
			height 100%
			color rgba(255,255,255,1);
			font-family Microsoft YaHei
			font-weight 400
			font-size 12px
			display flex
			flex-direction column
			justify-content space-around
			align-items center
			&.active
				background:rgba(221,229,245,1)
			p
				.price
					font-size 34px
					font-family Microsoft YaHei
					font-weight 400
		.used
			width 123px
			height 123px
			position absolute
			right 20px
			background url("~@/assets/images/person_center/image/use.png") center center no-repeat
			background-size 100%
			.msg
				width 100%
				height 100%
				border-radius 50%
				background: rgba(221,229,245,0.5);
</style>