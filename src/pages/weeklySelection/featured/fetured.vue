<template>
<div class="featured">
    <div class="FeaturedLastWeek" v-for="(item,index) in weeklySelection" :key="index">
		<header class="lastweek" >
			<p :style="{background:colorArr[index]}">{{item.week===0?'上周预选':''||item.week===1?'本周精选':''||item.week===2?'下周精选':''}}</p>
		</header>
		<div class="lastWeekContainer">
				<ul class="lastweek_item">
					<div class="bgImg">
						<img :src=weeklySelection[index].activityGallery[0].imgUrl alt="">
					</div>
					<li  class="lastweek_list"  v-for="(items,index) in eventGoods.pageList" :key="index">
						<a :href="`product_details.html?goodsId=${items.goodsId}&activityId=${items.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${items.activityGoodsId}`">
							<img :src=items.skuImg :title=items.goodsName class="imgCart">
						</a>
						<div class="lastweekContainer">
							<p class="lastweek_list_object">{{items.goodsName}}</p>
							<p class="lastweek_list_price">
								<span class="price">￥{{items.salePrice}}</span>
								<span class="shoopCart" @click="addToShoppingcart(items)">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
							 	</span>
							</p>
						</div>
					</li>	
				</ul>
				<p class="addMore" @click="addAll1(index)">
                <span>查看更多</span>
                <i class="el-icon-circle-plus"></i>
              </p>
		</div>
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
		margin-top 20px
		background white
		&:last-child
			margin-bottom 81px
		.lastweek
			p
				width 180px
				text-align center
				height 59px
				line-height 59px
				background rgba(180, 149, 220, 1)
				color rgba(255, 255, 255, 1)
				font-size 24px
				border-radius:0 30px 30px 0;
				margin 20px 0 23px 	
		.lastweek_item
			background white
			overflow hidden
			.bgImg
				float left
				width 600px
				height 225px
				pdding 11px 
				height: 279px;
				padding: 5px;
				box-sizing: border-box;
				border-right 1px solid rgba(230, 230, 230, 1)
				border-bottom  1px solid rgba(230, 230, 230, 1)
				img 
					width 100%
					height 100%
			.lastweek_list
				text-align center
				display flex
				justify-content space-between
				flex-direction column
				float left
				width 200px
				border-right 1px solid rgba(230, 230, 230, 1)
				border-bottom  1px solid rgba(230, 230, 230, 1)
				box-sizing border-box
				padding 0 19px 23px 15px
				height 279px
				.imgCart 
					margin-top 26px
					width 120px
					height 120px
				.lastweek_list_object
					margin 25px 0 19px 0
					font-size 14px
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(86,83,83,1)
					white-space: nowrap
					text-overflow:ellipsis
					overflow:hidden
				.lastweek_list_price
					display flex
					justify-content space-between
					font-size:16px;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(237,79,72,1);
					.price
						margin-top: 6px;
					.shoopCart
						position relative
						width 26px 
						height 26px
						background rgba(237, 79, 72, 1)
						border-radius 50%
						display inline-block
						img 
							width 14px
							height 14px
							position absolute
							left 0
							top 0	
							bottom 0
							right 0
							margin auto			
.addMore
	cursor pointer
	margin-top 50px
	margin-bottom  30px
	text-align center
	font-size:14px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(153,153,153,1);
	span
	margin-right 5px
</style>
<script>
import { isLogin ,throttleTipPop} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {weeklySelection,eventGoods} from '@/api/index'
import {  addShoppingCart } from '@/api/index'
import { addressUrl } from '@/assets/utils/utils'
import { async } from 'q'
export default {
    data(){
			return{
				colorArr:['rgba(180, 149, 220, 1)','rgba(243, 71, 121, 1)','rgba(72, 175, 255, 1)'],
				weeklySelection:'',
				activityId:"",
				activityTypeId:'',
				eventGoods:[],
				eventGoods1:'',
				eventGoods2:'',
				eventGoods3:'',
				index1:1,
				activityTypeNum:''
		
			}
},
	//获取a标签出入的值
		async created(){
			let v = addressUrl();//解析所有参数
	  		this.activityTypeNum = v['activityTypeNum']
			const result = await weeklySelection(v['activityId'],v['activityTypeId'])
			this.weeklySelection = result.data
			this.weeklySelection.forEach(async element => {
				const obj = {
					activityId:element.activityId,
					pageIndex:1,
					pageSize:9
				}
				const res2 =await eventGoods(obj)
				if(res2.code===200){
					this.eventGoods= res2.data
				}
			})
		},
		methods:{
			async addAll1(index){
				let num
				num=index
				if(num===index){
				this.index1+=1
				const activityId=this.weeklySelection[index].activityId
				const obj = {
					activityId:activityId,
					pageIndex:this.index1,
					pageSize:12,
				}
				const res1 =await eventGoods(obj)
				if(res1.code==200){
					this.eventGoods.push(res1.data)
				}else{
					this.$message({
						type:'warning',
						message:'已经加载全部'
					})
				}
				}
			},
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
