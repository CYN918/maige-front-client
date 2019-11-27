<template>
    <div class="productListWrap">
        <ul class="roductList">
			<li v-for="(item,index) in arr.pageList" :key="index">
				<div class="wrap">
					<a v-if="status==1"  :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
						<img :src=item.skuImg alt="" :title=item.goodsName>
					</a>
					<a v-else :href="`product_details.html?goodsId=${item.goodsId}`" class="immediately">
						<img :src=item.skuImg alt="" :title=item.goodsName>
					</a>
					<div>
						<p class="shuoming">{{item.goodsName}}</p>
						<div class="jindu">
								<p class="progress">
									<i :style="`width:${(item.goodsNumber-item.enableQuantity)/item.goodsNumber.toFixed(2)*100}%`"></i>
								</p>
								<span class="Snatch">{{Math.floor((item.goodsNumber-item.enableQuantity)*100)}}%</span>
							</div>
							<div class="priceContainer">
								<p class="price">
									<span class="rmb">￥</span>
									<span class="newPrice">{{item.salePrice}}</span>
									<span class="oldprice">{{item.ustomaryPrice}}</span>
								</p>
								<a v-if="status==1" :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`" class="immediately" > 立即抢购 </a>
								<a v-else :href="`product_details.html?goodsId=${item.goodsId}`" class="immediately active">即将开始</a>
							</div>
						</div>
					</div>
			</li>
        </ul>
    </div>
</template>
<script>
import {addressUrl  } from "@/assets/utils/utils";
export default {

	props:['eventGoodsArr','num','status'],
	data(){
		return{
			arr:[],
			activityTypeNum:''
		}
	},
	watch:{
		eventGoodsArr(val,oldval){
			if(val !== oldval){
				this.arr=val
				console.log(this.arr)
				
			}
		}	
	},
	created(){
		const v = addressUrl()
		this.activityTypeNum = v['activityTypeNum']
	}

}
</script>
<style lang="stylus" scoped>
.productListWrap
	width 100%
	padding-bottom 250px
	background RGBA(244, 244, 244, 1)
	.roductList
		width 1300px
		overflow hidden
		li
			position relative
			width 292px
			height 410px
			float left
			text-align center
			font-size:14px;
			background white
			margin-right 10px
			margin-top 10px
			padding-bottom 25px
			.wrap
				height 100%
				width 241px
				left 0
				top 0
				bottom 0
				right 0
				margin auto
				display flex
				flex-direction column
				justify-content space-between
				img
					width 207px
					height 207px
					margin-top 20px
				.shuoming
					margin-top 30px
					font-family Microsoft YaHei
					font-weight 400;
					color rgba(51,51,51,1)
					width 241px
					text-align left
					line-height 2
					white-space: nowrap
					text-overflow:ellipsis
					overflow:hidden
				.jindu
					margin-top 18px
					display flex
					width 241px
					justify-content space-between
					.progress
						width 171px
						height: 7px;
						margin-bottom: 15px;
						border-radius: 3px;
						background: rgba(255, 227, 225, 1)
						i 
							display: block;
							height: 100%;
							background: linear-gradient(90deg,rgba(248,56,56,1),rgba(255,98,72,1));
							border-radius: 3px;
					.Snatch
						font-size 14px
						font-family Microsoft YaHei
						font-weight 400
						color rgba(153,153,153,1)
				.priceContainer
					margin-top 10px
					width 241px
					display flex
					justify-content space-between
					.newPrice,.rmb
						font-size 24px
						font-family Microsoft YaHei
						font-weight 400
						color rgba(249,63,59,1)
					.rmb
						font-size 14px
					.oldprice
						font-size 14px
						font-family Microsoft YaHei
						font-weight 400
						text-decoration line-through
						color rgba(153,153,153,1)
					.immediately
						width 88px
						height 37px
						background linear-gradient(90deg,rgba(248,56,56,1),rgba(255,98,72,1))
						box-shadow 0px 2px 6px 0px rgba(249, 59, 62, 0.35)
						border-radius 19px
						line-height 37px
						font-size 14px
						font-family Microsoft YaHei
						font-weight 400
						color rgba(255,255,255,1)
						margin-top -5px
						&.active
							background #333
</style>
