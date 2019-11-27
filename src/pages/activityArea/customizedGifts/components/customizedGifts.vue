<template>
    <div class="bannerNavContainer">
        <div class="headerNav"> 
					<span class="all">
						全部商品分类
					</span>
				</div>
        <div class="bannerContainer">
          <div class="banner"> 
						<div class="bannerContent">
							<ul class="banneritem"  @mouseleave="handelChangeup">
								<li class="bannerList" v-for="(item,index) in arr" :key="index" @mouseenter="handelChangedw(index)"  :class="{'active':num===index}" >
									<a href="" :class="{'on':num===index}">{{item}}</a>
								</li>
							</ul>
							<div class="commodityList" v-show="num!==''">

							</div>
						</div>
          </div>
        </div>
				<!-- 礼品定制 -->
				<div class="custoMadeWrap">
					<div class="custoMade">
						<p class="custoMadeHeader">
							<span>礼品定制</span>
						</p>
						<div class="custoMadeContent">
							<div class="custoMadeLeft">
								<div class="custoMadeLeftT">
									<div class="text">
										<p>场景定制</p>
										<p>定制专区</p>
										<a href="">GO ></a>
									</div>
									<img src="@/assets/images/office_Area/img/ma.png" alt="">
								</div>
								<div class="custoMadeLeftB">
									<div class="text">
										<p>行业定制</p>
										<p>定制专区</p>
										<a href="">GO ></a>
									</div>
									<img src="@/assets/images/office_Area/img/lipinghe.png" alt="">
								</div>
							</div>
							<!-- 节日定制 -->
							<div class="festival">
								<div class="text">
										<p>节日定制</p>
										<p>定制专区</p>
										<a href="">GO ></a>
								</div>
								<img src="@/assets/images/office_Area/img/liping.png" alt="">
							</div>
							<!-- 广告促销 -->
							<div class="advertisingContent">
								<div class="advertisingT">
										<div class="text">
											<p>广告促销</p>
											<p>定制专区</p>
											<a href="">GO ></a>
										</div>
										<img src="@/assets/images/office_Area/img/ben.png" alt="">
		
								</div>
								<div class="advertisingB">
									<div class="text">
											<p>员工福利</p>
											<p>定制专区</p>
											<a href="">GO ></a>
										</div>
										<img src="@/assets/images/office_Area/img/shuibei.png" alt="">
								</div>
							</div>
							<!-- 企业文化 -->
							<div class="companyContent ">
									<div class="text">
										<p>企业文化</p>
										<p>定制专区</p>
										<a href="">GO ></a>
									</div>
									<img src="@/assets/images/office_Area/img/yifu.png" alt="">
							</div>
					</div>	
						<!-- 礼品卡册定制 -->
						<CardBook/>
				</div>
			</div>
    </div>
</template> 
<script>
import CardBook from './cardBook'
export default {
	data(){
		return{
			arr:['手机数码','办公用品','鞋帽服饰','用户清洁','皮具箱包','钟表珠宝','鞋帽服饰','促销用品','母婴玩具','康体保健','食品生鲜','虚拟商品'],
			flag:false,
			num:''
		}
	},
  components:{
		CardBook
	},
	methods:{
		handelChangedw(index){
			this.num=index
		},
		handelChangeup(){
			this.num=''
			console.log(this.num)
		}

	}
}
</script>
<style lang="stylus" scoped>
.bannerNavContainer
	width 100%
	.headerNav
		width 1200px
		height 40ox
		margin 0 auto
		.all
			display inline-block
			width 200px
			height 40px
			line-height 40px
			text-align center
			background url('~@/assets/images/office_Area/img/bg.png')
			font-size:16px;
			font-family:Microsoft YaHei;
			font-weight:bold;
			color:rgba(255,255,255,1);
	.bannerContainer
		padding-top 16px
		height 455px
		width 100%
		background:rgba(226,240,226,1);
		border-top 2px solid  rgba(142,196,55,1)
		.banner
			padding-top 16px
			border-radius:10px;
			width 1200px
			height 420px
			background url('~@/assets/images/office_Area/img/customizedGifts.png')
			margin 0 auto
			box-shadow:0px 5px 12px 1px rgba(145,201,127,0.42);
			.bannerContent
				margin-top -33px
				width 100%
				height 100%
				display flex
				.banneritem
					width:200px;
					height:454px;
					background:rgba(30,31,31,1);
					opacity:0.8;
					.bannerList
						width 100%
						height 38px
						line-height 36px
						text-align center
						text-align center
						font-size:12px;
						font-family:Microsoft YaHei;
						font-weight:400;
						color:rgba(255,255,255,1);
						cursor default
						&.active
							background white
							color rgba(58, 169, 225, 1)
						a
							color white
							&.on
								color rgba(58, 169, 225, 1)
				.commodityList
					width 765px
					height 454px
					background white
	.custoMadeWrap
		overflow hidden
		width 100%
		background RGBA(244, 244, 244, 1)
		.custoMade
			width 1200px
			margin 19px auto
			.custoMadeHeader
				width 100%
				height 40px
				text-align center
				line-height 40px
				border-bottom 2px solid rgba(142, 196, 55, 1)
				text-align left
				span 
					display inline-block
					background rgba(142, 196, 55, 1)
					width 115px
					height 40px
					line-height 40px
					text-align center
					font-size:18px;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(255,255,255,1);
			.custoMadeContent
				width 100%
				display flex
				.custoMadeLeft
					width 334px
					.custoMadeLeftT
						margin-top 11px
						width 334px
						height 199px
						background rgba(200, 227, 146, 1)
						display flex
						.text
							margin-top 20px
							margin-left 25px
							p
								&:nth-child(1)
									font-size:18px;
									font-family:Microsoft YaHei;
									font-weight:bold;
									color:rgba(97,155,51,1);
								&:nth-child(2)
									font-size:16px;
									font-family:Microsoft YaHei;
									font-weight:400;
									color:rgba(255,255,255,1);
									margin-top 12px
							a	
								display block
								border:1px solid rgba(255,255,255,1);
								border-radius:8px;
								width:39px;
								height:17px;
								color white
								margin-top 13px
								text-align center
								line-height 17px
						img
							width 121px
							height 157px
							margin-top 25px
							margin-left 56px
					.custoMadeLeftB
							margin-top 10px
							width 334px
							height 199px
							background rgba(156, 220, 217, 1)
							display flex
							.text
								margin-top 20px
								margin-left 25px
								p
									&:nth-child(1)
										font-size:18px;
										font-family:Microsoft YaHei;
										font-weight:bold;
										color:rgba(97,155,51,1);
									&:nth-child(2)
										font-size:16px;
										font-family:Microsoft YaHei;
										font-weight:400;
										color:rgba(255,255,255,1);
										margin-top 12px
								a	
									display block
									border:1px solid rgba(255,255,255,1);
									border-radius:8px;
									width:39px;
									height:17px;
									color white
									margin-top 13px
									text-align center
									line-height 17px
							img
								width 121px
								height 157px
								margin-top 25px
								margin-left 56px
				.festival
					margin 10px 18px
					width 239px
					height 408px
					background rgba(247, 220, 162, 1)
					.text
						margin-top 19px
						margin-left 23px
						p
							&:nth-child(1)
								font-size:18px;
								font-family:Microsoft YaHei;
								font-weight:bold;
								color:rgba(185,120,28,1);
							&:nth-child(2)
								margin-top 18px
								font-size:16px;
								font-family:Microsoft YaHei;
								font-weight:400;
								color:rgba(255,255,255,1);
						a	
							display block
							margin-top 12px
							width:39px;
							height:17px;
							border:1px solid rgba(255,255,255,1);
							border-radius:8px 8px 8px 8px;
							text-align center
							line-height 17px
							color white
					img 
						margin 51px auto
						width 218px
						height 177px
				.advertisingContent
					width 334px
					.advertisingT
						margin-top 10px
						width 334px
						height 199px
						background rgba(173, 223, 240, 1)
						display flex
						.text
							margin-top 20px
							margin-left 25px
							p
								&:nth-child(1)
									font-size:18px;
									font-family:Microsoft YaHei;
									font-weight:bold;
									color:rgba(97,155,51,1);
								&:nth-child(2)
									font-size:16px;
									font-family:Microsoft YaHei;
									font-weight:400;
									color:rgba(255,255,255,1);
									margin-top 12px
							a	
								display block
								border:1px solid rgba(255,255,255,1);
								border-radius:8px;
								width:39px;
								height:17px;
								color white
								margin-top 13px
								text-align center
								line-height 17px
						img
							width 121px
							height 157px
							margin-top 25px
							margin-left 56px
					.advertisingB
							margin-top 10px
							width 334px
							height 199px
							background rgba(181, 204, 234, 1)
							display flex
							.text
								margin-top 20px
								margin-left 25px
								p
									&:nth-child(1)
										font-size:18px;
										font-family:Microsoft YaHei;
										font-weight:bold;
										color:rgba(97,155,51,1);
									&:nth-child(2)
										font-size:16px;
										font-family:Microsoft YaHei;
										font-weight:400;
										color:rgba(255,255,255,1);
										margin-top 12px
								a	
									display block
									border:1px solid rgba(255,255,255,1);
									border-radius:8px;
									width:39px;
									height:17px;
									color white
									margin-top 13px
									text-align center
									line-height 17px
							img
								width 121px
								height 157px
								margin-top 25px
								margin-left 56px
				.companyContent
					margin-top 10px
					margin-left 18px
					width 239px
					height 408px
					background rgba(200, 227, 146, 1)
					.text
						margin-top 19px
						margin-left 23px
						p
							&:nth-child(1)
								font-size:18px;
								font-family:Microsoft YaHei;
								font-weight:bold;
								color:rgba(185,120,28,1);
							&:nth-child(2)
								margin-top 18px
								font-size:16px;
								font-family:Microsoft YaHei;
								font-weight:400;
								color:rgba(255,255,255,1);
						a	
							display block
							margin-top 12px
							width:39px;
							height:17px;
							border:1px solid rgba(255,255,255,1);
							border-radius:8px 8px 8px 8px;
							text-align center
							line-height 17px
							color white
					img 
						margin 51px auto
						width 218px
						height 177px








	


	
					

</style>
