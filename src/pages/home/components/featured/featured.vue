<template>
<div class="featured">
  <div class="FeaturedLastWeek" v-for="(item,index) in lastweek" :key="index">
		<header class="lastweek" >
			<p :style="{background:colorArr[index]}">{{item.text}}</p>
		</header>
		<div class="lastWeekContainer">
				<ul class="lastweek_item">
					<div class="bgImg">
						<img :src=item.bgImg alt="">
					</div>
					<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
						<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
					<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>
					<li class="lastweek_list lastweek_lists">
						<div class="lastweekContainer">
							<img :src=item.showImg alt="" class="imgCart">
							<p class="lastweek_list_object"> 20寸 纯PC“铝框”（非...</p>
							<p class="lastweek_list_price">
								<span class="price">￥29</span>
								<span class="shoopCart">
									<img src="~@/assets/images/home/images/shopCart.png" alt="">
								</span>
							</p>
						</div>
					</li>					
			</ul>
			</div>
		</div>
</div>
</template>
<script>
export default {
    data(){
			return{
				colorArr:['rgba(180, 149, 220, 1)','rgba(243, 71, 121, 1)','rgba(72, 175, 255, 1)'],
				lastweek:[
					{
						bgImg:require('@/assets/images/home/images/sccnn.png'),
						showImg:require("@/assets/images/home/images/goods.png"),
						price:'29',
						description:'20寸 纯PC“铝框”（非...',
						text:"上周精选"
					},
					{
						bgImg:require('@/assets/images/home/images/benzhou.png'),
						showImg:require("@/assets/images/home/images/goods.png"),
						price:'29',
						description:'20寸 纯PC“铝框”（非...',
						text:'本周精选'
					},
					{
						bgImg:require('@/assets/images/home/images/xiazhou.png'),
						showImg:require("@/assets/images/home/images/goods.png"),
						price:'29',
						description:'20寸 纯PC“铝框”（非...',
						text:'下周预告'
					}
				]
			}
		}
}
</script>
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
				float left
				width 200px
				border-right 1px solid rgba(230, 230, 230, 1)
				border-bottom  1px solid rgba(230, 230, 230, 1)
				box-sizing border-box
				padding 32px 23px 24px 10px
				.imgCart 
					margin-left 44px
					width 90px
					height 138px
				.lastweek_list_object
					margin 25px 0 19px 0
					font-size 14px
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(86,83,83,1);
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
</style>
