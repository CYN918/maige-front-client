<template>
    <div class="dryGoodsContainer">
       <div class="dryGoodsNav"> 
           <div class="msg"></div>
           <ul class="dryGoodsNavItem" v-if="festivalList&&festivalList.length>0">
               <li class="dryGoodsNavList" v-for="(item,index) in festivalList" :key="index">{{item.goodsTypeName}}</li>
           </ul>
			<img class="tokie" src="@/assets/images/office_Area/img/tokie.png" alt="">
       </div>
			 <div class="dryGoodsContent" v-for="(items,index) in festivalList" :key="index">
				 <div class="msg"></div>
					<div class="dryGoodsWrap">
						<div class="dryGoodsContentLeft">
							<div class="text">
								<p>
									<span class="chn">{{items.goodsTypeName}}</span>
									<span class="engl">Rice flour Cereals</span>
								</p>
							</div>
						</div>
						<div class="dryGoodsContentRight">
							<ul  >
								<li class="recommendList" v-for="(item,index) in items.activityHomepageGoodsReturns" :key="index" >
									<div class="recommendContent">
										<a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
											<img :src=item.imgUrl alt="" class="foot" :title="item.goodsName">
										</a>
										<div class="recommendRight">
											<p class="miashu">{{item.goodsName}}</p>
											<div class="recommendBottom">
												<p>
													<span class="newprice">￥{{item.salePrice}}</span>
													<span class="oldprice">￥{{item.ustomaryPrice}}</span>
												</p>
												<a ><img class="shopcart" src="@/assets/images/office_Area/img/goshopping.png" alt="" @click="addToShoppingcart(item)"></a>
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
			 </div>
    </div>
</template>
<script>
import { isLogin ,throttleTipPop} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart } from '@/api/index'
import {addressUrl  } from "@/assets/utils/utils";
export default {
		name:'dryGoodsList',
		props:['festivalList'],
		data(){
			return{		
				activityTypeNum:''
			}
		},
		created(){
			const v = addressUrl()
			this.activityTypeNum = v['activityTypeNum']
		},
		methods:{
			async addToShoppingcart(item) {
				const obj = {
					goodsId: item.goodsId,
					goodsName: item.goodsName,
					goodsSn: item.goodsSn,
					goodsPrice: item.salePrice,
					quantity: 1,
					supplierId: item.supplierId,
					skuId: item.skuId,
					activityId:item.activityId,
					activityGoodsId:item.activityGoodsId,
					activityTypeNum:this.activityTypeNum
				}
				if (item.quantity < 1) {
					this.$message({
						type: 'warning',
						message: '库存不足',
					})
					return
				}
				// 判断是否登录
				const userInfo = isLogin()
				if (userInfo) {
					let res = {}
					try {
						res = await addShoppingCart(obj)
					} catch (e) {
            console.log(e)
					}
					// this.proDetail = res.data
					if (res.code === 200) {
						this.$bus.$emit('getShoppingCartNum')
						this.$message({
							message: '加入购物车成功',
							type: 'success',
						})
					} else {
						this.$message(res.message)
					}
				} else {
         	 PubSub.publish(SHOW_LOGINPOP)
				}
			},
		}
}
</script>
<style scoped lang="stylus">
.dryGoodsContainer
	margin-top 268px
	width 100%
	.dryGoodsNav
		position relative
		width 1152px
		height 90px
		margin-bottom 66px
		.msg
			width 100%
			height 100%
			background:rgba(255,255,255,1);
			opacity:0.2;
			border-radius:10px;
		.tokie
			width 105px
			height 133px
			margin-top -145px
			margin-left -75px
		.dryGoodsNavItem
			left 0
			top 0
			position absolute
			display flex
			width 100%
			height 100%
			.dryGoodsNavList
				text-align center
				height 100%
				line-height 90px
				flex 1
				font-size:18px;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(255,255,255,1);
				cursor default
	.dryGoodsContent
		width 100%
		margin-top 29px
		position relative
		width 100%
		height 693px
		
		.msg
			width 100%
			height 100%
			background white
			opacity 0.2
			border-radius:20px;
		.dryGoodsWrap
			padding 25px
			width 100%
			position absolute
			left 0
			top 0
			.dryGoodsContentLeft
				margin-right 13px
				float left
				width 286px
				height 640px
				background url('~@/assets/images/office_Area/img/zima.png')
				background-size 100%
				.text
					height 113px
					width 100%
					background:rgba(27,20,62,1);
					opacity:0.54;
					border-radius:10px;
					overflow hidden
					p
						display flex
						flex-direction column
						margin 21px
						.chn
							font-size:31px;
							font-family:Microsoft YaHei;
							font-weight:bold;
							color:rgba(255,255,255,1)
						.engl
							margin-top 22px
							font-size:18px;
							font-family:Microsoft YaHei;
							font-weight:bold;
							color:rgba(255,255,255,1);
			.dryGoodsContentRight
				width 820px
				overflow hidden
				margin-left 23px
				ul
					width 830px
					overflow hidden
					.recommendList
						text-align center
						float left
						margin-right 22px
						margin-bottom 22px
						background white
						width:252px;
						height:309px;
						border-radius:10px;
						.recommendContent
							margin auto
							.foot
								width 181px
								height 181px
								margin-top 13px
							.recommendRight
								padding-left 19px
								padding-right 14px
								.miashu
									margin-top 22px
									text-align left
									font-size:22px;
									font-family:Microsoft YaHei;
									font-weight:bold;
									color:rgba(27,20,62,1);
									overflow hidden
									text-overflow ellipsis
									white-space nowrap 
								.recommendBottom
									margin-top 19px
									display flex
									justify-content space-between
									p
										text-align left
										width 175px
										.newprice
											font-size:30px;
											font-family:Microsoft YaHei;
											font-weight:bold;
											color:rgba(162,22,22,1);
										.oldprice
											font-size:16px;
											font-family:Microsoft YaHei;
											font-weight:400;
											text-decoration:line-through;
											color:rgba(202,202,202,1)
								a
									position relative
									width:42px;
									height:42px;
									background:rgba(27,20,62,1);
									border-radius:50%;
									text-align center
									line-height 42px
								
										
									
</style>
