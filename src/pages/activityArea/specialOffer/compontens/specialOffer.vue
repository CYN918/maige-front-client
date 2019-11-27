<template>
<div class="featured">
  <div class="FeaturedLastWeek" v-for="(item,index) in specialOffer" :key="index">
		<div class="storeName">
			<p class="clock">
				<span>{{item.goodsTypeName}}</span>
				<span class="lt"></span>
				<span class="rt"></span>
				<span class="lb"></span>
			</p>
		</div>
		<div style="width:100%;text-align:center">
			<img class="bgImg" :src=item.goodsTypeImgUrl alt="" style="margin-top:20px">
		</div>
		<div class="lastWeekWrap">
				<ul class="lastweek_item">
					<li class="lastweek_list" v-for="(items,index) in item.activityHomepageGoodsReturns" :key="index">
						<div class="lastweekContainer">
							<a :href="`product_details.html?goodsId=${items.goodsId}&activityId=${items.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${items.activityGoodsId}`">
								<img :src="items.skuImg" alt="" :title="items.goodsName" class="imgCart">
							</a>
							<p class="lastweek_list_object">{{items.goodsName}}</p>
							<div class="lastweek_list_price">
								<p class="price">
									<span class="rmb">￥</span><span class="newprice">{{items.salePrice}}</span>
									<span class="oldprice">￥{{items.ustomaryPrice}}</span>
								</p>
								<a :href="`product_details.html?goodsId=${items.goodsId}&activityId=${items.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${items.activityGoodsId}`" class="buyNow">立即购买</a>
							</div>
						</div>
					</li>
			 </ul>
		 </div>
		  <p class="view"  @click="addAllList(index,item.activityGoodsTypeId)">查看更多》</p>
		</div>
		
</div>
</template>

<style lang="stylus" scoped>
.featured
	overflow hidden
	width 100%
	background RGBA(245, 245, 245, 1)
	.FeaturedLastWeek
		overflow hidden
		width 1200px
		margin 0 auto
		background white
		padding-bottom 30px
		.storeName
			position relative
			background RGBA(244, 244, 244, 1)
			width 100%
			height 108px
			overflow hidden
			.clock
				position relative
				text-align center
				font-size 18px
				font-family Microsoft YaHei
				font-weight 400
				color:rgba(51,51,51,1)
				width 251px
				height 83px
				margin 48px auto 
				.lt
					position absolute
					left 14px
					top -7px
					width 18px
					height 18px
					background url('~@/assets/images/office_Area/img/show3.png')
				.lb
					position absolute
					width 16px
					height 16px
					left 55px
					top 13px
					background url('~@/assets/images/office_Area/img/sanjiao1.png')
				.rt
					position absolute
					width 25px
					height 25px
					right 30px
					top -2px
					background url('~@/assets/images/office_Area/img/yuan3.png')
			
		a
			display inline-block 
			width 1155px
			height 223px
			.bgImg
				margin 30px auto
				position relative
				display flex
				width 100%
				height 100%
				border-radius 10px	
		.text
			font-family SourceHanSansCN
			font-size 43px
			color rgba(40, 40, 40, 1)
			font-weight 400
			width 280px
			height 93px
			text-align center
			line-height 53px
			margin-left 149px
			margin-top 49px
			p
				text-align center
			.buyNow
				display inline-block
				width 176px
				height 47px
				line-height 47px
				text-align center
				background rgba(56,175,200,1)
				border-radius 23px
				font-family SourceHanSansCN
				font-size 27px
				font-weight 400px
				color white
		.view
			cursor pointer
			text-align right 
		.lastWeekWrap
			margin 68px auto
			width 1200px
			background white
			
			.lastweek_item
				display flex
				flex-wrap wrap
				width 100%
				.lastweek_list
					margin-top 30px
					width 25%
					text-align center
					.lastweekContainer
						width 100%
						a
							width 207px
							height 207px
							img 
								width 100%
								height 100%
						.lastweek_list_object
							width 241px
							margin auto
							margin-top 37px
							white-space: nowrap
							overflow hidden
							text-overflow ellipsis
							line-height 30px
							text-align left
							font-size 14px
							color rgba(51, 51, 51, 1)
							font-weight 400
							font-family Microsoft YaHei
						.lastweek_list_price
							width 265px
							margin auto
							margin-bottom 25px
							margin-top 34px
							display flex
							justify-content space-around
							.price
								font-size 19px
								font-family Microsoft YaHei
								font-weight 400
								color rgba(249,63,59,1)
								.rmb
									font-size 14px
								.oldprice
									font-size:14px;
									font-family:Microsoft YaHei;
									font-weight:400;
									text-decoration:line-through;
									color:rgba(153,153,153,1)
							.buyNow
								margin-top -8px
								width:88px;
								text-align center
								line-height 37px
								height:37px;
								background:linear-gradient(90deg,rgba(248,56,56,1),rgba(255,98,72,1));
								box-shadow:0px 2px 6px 0px rgba(249, 59, 62, 0.35);
								border-radius:19px;
								font-size:14px;
								font-family:Microsoft YaHei;
								font-weight:400;
								color:rgba(255,255,255,1);
				

					
</style>
<script>
import {addressUrl  } from "@/assets/utils/utils";
import {specialOffer,pagination} from '@/api/index'
export default {
	data(){
		return{
				specialOffer:[],
				activityId:"",
				pageNum1:1,
				pageNum2:1,
				activityTypeNum:'',

		}
	},
	created(){
			let v = addressUrl();//解析所有参数
			this.activityId = v['activityId']
			this.activityTypeNum = v['activityTypeNum']
			const obj = {
				activityId:this.activityId,
				pageSize:8,
				pageNum:1
			}
			this.commonList(obj)
	},
	methods:{
		async addAllList(index,activityGoodsTypeId){
			if(index===0){
				console.log(this.specialOffer[index])
			this.pageNum1 +=1
			const obj = {
				activityId:this.activityId,
				pageSize:8,
				pageIndex:this.pageNum1,
				activityGoodsTypeId:activityGoodsTypeId
			}
			 const res = await pagination(obj)
			 if(res.code === 200){
				this.specialOffer[index].activityHomepageGoodsReturns.push(...res.data.pageList)
			 }else{
				 this.$message({
					message: '已经加载全部',
					type: 'warning'
					});
			 }
			}else{
			this.pageNum2++
			const obj = {
				activityId:this.activityId,
				pageSize:8,
				pageIndex:this.pageNum2,
				activityGoodsTypeId:activityGoodsTypeId
			}
			const res = await pagination(obj)
			if(res.code === 200){
				this.specialOffer[index].activityHomepageGoodsReturns.push(...res.data.pageList)
			 }else{
				 this.$message({
					message: '已经加载全部',
					type: 'warning'
					});
			 }
			}
		},
		async commonList(obj){
				const result = await specialOffer(obj)
				if(result.code === 200){
					this.specialOffer=result.data
				}
			},
		},
		

}
</script>
