<template>
    <div class="discountedGoods">
        <ul class="discountedGoodsItem" v-if="discountedArr[num]&&discountedArr[num].activityHomepageGoodsReturns.length>0">
            <li class="discountedGoodsList" v-for="(item,index) in discountedArr[num].activityHomepageGoodsReturns" :key="index">
					<a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}`">
             	  	 <img :src=item.skuImg alt="" :title="item.goodsName" class="productImg">
					</a>
                <p class="product">{{item.goodsName}}</p>
               <div class="price">
					<p>
						<span class="newPrice">￥{{item.salePrice}}</span>
						<span class="oldPrice">¥{{item.salePrice}}</span>
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
import { isLogin ,throttleTipPop} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart } from '@/api/index'
export default {
	props:['discounted','num'],
	data(){
		return{
			discountedArr:[]
			}
	},
	watch:{
		discounted(val,oldval){
			if(val!==oldval){
				this.discountedArr=val
			}
		}	
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
          activity_id:item.activityId,
          activity_goods_id:item.activityGoodsId,
          activity_type_num:item.activityTypeNum
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
	width 100%
	margin-left 44px
	margin-top 70px
	.discountedGoodsItem
		width 100%
		display flex
		flex-wrap wrap
		.discountedGoodsList
			text-align center
			margin-top 16px
			width 49%
			&:nth-child(2n+1)
				border-right 1px solid rgba(229, 229, 229, 1)
			&:nth-child(1)
				border-bottom  1px solid rgba(229, 229, 229, 1)
				.productImg 
					margin-top -70px
			&:nth-child(2)
				border-bottom  1px solid rgba(229, 229, 229, 1)
				.productImg
					margin-top -70px
			.productImg 
				width 213px
				height 213px
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
			.price
				display flex
				justify-content space-between
				text-align left 
				padding-left 38px
				margin-bottom 24px
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
