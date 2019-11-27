<template>
    <div class="discountContainer">
        <header>
            <img :src=homeImg[0].imgUrl alt="">
        </header>

		<div class="boutiqueArea" v-for="(item,index) in discounted" :key="index">
			<div class="sharpGoods"  >
				<p class="sharpGoodsLeft" v-if='item.frontActivityRebateReturnList&&item.frontActivityRebateReturnList.length>0'>
					<span>{{item.rebateRange}}折精品专区</span>
					<img src="@/assets/images/office_Area/img/text1.png" alt="">
				</p>
				<ul class="sharpGoodsRight">
					<li  :class="{'active':num2===index}" v-for="(items,index) in item.frontActivityRebateReturnList" :key="index" @click="toggle2(index)" >
						{{items.rebate}}折商品
					</li>
				</ul>
			</div>
			<div  v-if='item.frontActivityRebateReturnList&&item.frontActivityRebateReturnList.length>0'>
					<DiscountedGoods1 :discounteds="item.frontActivityRebateReturnList" :num="num2" />
					<p @click="allList(item,index)" class="allList">查看更多></p>
			</div>
		
		</div>		
    </div>
</template>
<script>
import DiscountedGoods from './discountedGoods'
import DiscountedGoods1 from './discountedGoods1'
import { isLogin ,throttleTipPop,addressUrl} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart,matching ,discountArea,eventGoods} from '@/api/index'

export default {
    data(){
			return{
				// num:0, //默认选中1折抢购
				num2:0,
				// num3:0,
				sharpGoods:require('@/assets/images/office_Area/img/chuju.png'),
				holidayArea:'',
				discounted:[],
				activityId:'',
				homeImg:'',
				num:0
			}
		},
		components:{
			DiscountedGoods,
			DiscountedGoods1
		},
		watch:{
			num2(){
				// this.num = 0
			}
		},

	async created(){
		let v = addressUrl();//解析所有参数
		const result = await discountArea(v['activityId'])
		this.activityId = v['activityId']
		if(result.code === 200){
			this.discounted=result.data
			console.log(this.discounted[0].frontActivityRebateReturnList)
		}
		const res =await matching(v['activityId'])
		if(res.code === 200){
			this.homeImg = res.data
		}
	},
		methods:{
			async allList(item,index){
				this.num++
				const rebate = item.frontActivityRebateReturnList[this.num2].rebate
				const obj={
					activityId:this.activityId,
					pageIndex:this.num,
					pageSize:8,
					rebate:rebate,
				}
				const res =await eventGoods(obj)
			if(res.code === 200 ){
				this.discounted[index].frontActivityRebateReturnList[this.num2].activityHomepageGoodsReturns.push(...res.data.pageList)
			}else{
				this.$message({
					type:'warning',
					message:'已经加载全部'
				})
			}
		
			},
			//1~3打折区
			//  toggle1(index){
			// 	this.num=index
			// },
			//4-6
			toggle2(index){
				this.num2=index
			},
			//7-9
			// toggle3(index){
			// 	this.num3=index
			// },
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
					activityTypeNum:item.activityTypeNum
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
<style lang="stylus" scoped>
.discountContainer
	width 100%
	header
		width 100%
		height 556px
		overflow hidden
		img 
			margin-top: -45px;
			width 100%
			height 100%
	.discountWrap
		width 1200px
		margin 40px auto
		display flex
		justify-content space-between
		.discountLeft
			width 50%
			.sharpGoodsTop
				display flex
				flex-direction column
				border-left 10px solid rgba(238, 101, 109, 1)
				padding-left 14px
				span 
					display inline-block
					font-size 30px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(57,57,57,1)
				img
					width 228px
					height 13px
					margin-top 13px
			.sharpGoodsBottom
				width 100%
				.foldImg
					width 100%
					height 408px
					.fold
						width 139px
						height 139px
						background rgba(238, 101, 109, 1)
						text-align center
						display flex
						flex-direction column
						margin-top 49px
						span 
							font-family:Microsoft YaHei;
							&:nth-child(1)
								margin-top 24px
								font-size 50px
								font-weight bold
								color rgba(255,255,255,1)
							&:nth-child(2)
								margin-top 4px
								font-size 19px
								font-weight 300
								color rgba(241,153,158,1)
							&:nth-child(3)
								margin-top 9px
								font-weight bold
								font-size 19px
								color rgba(255,255,255,1)
				.brand
					width 100%
					display flex
					justify-content space-between
					margin-left 14px
					margin-top 58px
					.brandLeft
						.cefrun
							span 
								display inline-block
								font-size 20px
								font-family Microsoft YaHei
								font-weight bold
								color rgba(72,72,72,1)
								margin-left 4px
							.quan
								width 10px
								height 10px
								background url('~@/assets/images/office_Area/img/quan.png')
							.quanr
								margin-left -7px
						p 
							margin-top 12px
							font-size 18px
							font-family Microsoft YaHei
							font-weight 400
							color rgba(122,121,121,1)
					.shoopCart
						position relative
						width 26px 
						height 26px
						background rgba(237, 79, 72, 1)
						border-radius 50%
						display inline-block
						margin-top 10px
						margin-right 29px 
						img 
							width 14px
							height 14px
							position absolute
							left 0
							top 0	
							bottom 0
							right 0
							margin auto	
		.discountRight
			.sharpGoodsRight
				display flex
				justify-content space-around
				
				li
					font-size 18px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(43,43,43,1)
					width 102px
					height 38px
					text-align center
					line-height 38px
					cursor default			
					&.active
						font-weight bold
						color rgba(255,255,255,1)
						border-radius 19px
						box-shadow 0px 0px 4px 0px rgba(250,62,58,0.41)
						background linear-gradient(0deg,rgba(250,62,58,1),rgba(255,93,70,1))
	.line
		width 1920px
		height 10px
		background:rgba(238,238,238,1)
		margin-top 70px
	.boutiqueArea
		width 1200px
		margin 50px auto
		.sharpGoods
			display flex
			margin-bottom 40px
			.sharpGoodsLeft
				display flex
				width 50%
				height 55px
				flex-direction column
				border-left 10px solid rgba(238, 101, 109, 1)
				padding-left 14px
				span 
					display inline-block
					font-size 30px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(57,57,57,1)
				img
					width 228px
					height 13px
					margin-top 13px
			.sharpGoodsRight
					width 50%
					height 55px
					display flex
					justify-content space-around
					li
						font-size 18px
						font-family Microsoft YaHei
						font-weight 400
						color rgba(43,43,43,1)
						width 102px
						height 38px
						text-align center
						line-height 38px
						cursor default
						&.active
							font-weight bold
							color rgba(255,255,255,1)
							border-radius 19px
							box-shadow 0px 0px 4px 0px rgba(250,62,58,0.41)
							background linear-gradient(0deg,rgba(250,62,58,1),rgba(255,93,70,1))
.allList
	margin-top 30px
	text-align right 
	padding-right 30px
	cursor pointer
</style>
