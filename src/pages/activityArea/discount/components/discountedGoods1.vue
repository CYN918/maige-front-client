<template>
    <div class="discountedGoods">
        <ul class="discountedGoodsItem" >
            <li class="discountedGoodsList"  v-for="(item,index) in discounted[num].activityHomepageGoodsReturns"  :key="index">
					<a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
						<img :src=item.skuImg alt="" :title="item.goodsName" class="productImg">
					</a>
                <p class="product">{{item.goodsName}}</p>
               <div class="price">
					<p>
						<span class="newPrice">￥{{item.salePrice}}</span>
						<span class="oldPrice">¥{{item.ustomaryPrice}}</span>
					</p>
					<a  class="shoopCart" @click="addToShoppingcart(item)">
						<img src="~@/assets/images/home/images/shopCart.png" alt="">
					</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { isLogin ,throttleTipPop,addressUrl} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart, } from '@/api/index'

export default {
props:['discounted','num'],
	data(){
		return{
			discountedArr:[],
			activityTypeNum:''
			}
	},
	watch:{
		discounted(val,oldval){
			console.log(val,oldval)
			if(val!==oldval){
				this.discountedArr=val
			}
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
<style lang="stylus" scoped>
.discountedGoods	
	width 1200px
	overflow hidden
	.discountedGoodsItem
		flex-wrap: wrap;
		display: flex;
		width 1255px
		margin-top -2px
		.discountedGoodsList
			padding-top 20px
			text-align center
			border 1px solid rgba(229, 229, 229, 1)
			width 24%
			height 300px
			.productImg 
				width 226px
				height 223px
			.product
				overflow hidden
				text-overflow ellipsis
				white-space: nowrap
				font-size 16px
				font-family Microsoft YaHei
				font-weight 400
				color rgba(72,72,72,1)
				text-align left
				padding-left 44px
				padding-right 44px
			.price
				display flex
				justify-content space-between
				text-align left 
				padding-left 44px
				margin-bottom 24px
				margin-top 3px
				p
					margin-top 9px
					.newPrice
						font-size 24px
						font-family Microsoft YaHei
						font-weight bold
						color rgba(255,73,73,1)
					.oldPrice
						font-size 16px
						font-family Microsoft YaHei
						font-weight 400
						text-decoration line-through
						color rgba(202,202,202,1)
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
</style>
