<template>
	<div class="evaluation">
		<div class="evaluation_container">
			<div class="evaluationBottom"> 
					<div class="evaluationBottom_l">
						<img :src='description.thumbnailImgUrl' alt="">
						<p class="text">
							<span>{{description.goodsName}}</span>
							<span>{{description.goodsAttr}}</span>
						</p>
					</div>
					<div class="evaluationBottom_r">
							<p class="caveat">
								{{description.creatTime}}
							</p>
							<div class="kuaidi">
								<el-rate
								v-model="description.commentRank"
								show-text
								disabled
                :texts="['差评','差评','中评','中评', '好评']"
								text-color="#999999"
								:colors="['#4C86F4', '#4C86F4', '#4C86F4']"
								>
								</el-rate>  <!-- 评分星星 -->
							</div>
							<div class="pinglun">
									<span class="sunDrying">{{description.content}}</span>
							</div>
							<div class="pinglun">
								<div class="img_size" v-for="(item,index2) in description.galleryList" :key="index2" style="display: inline-block;margin-right: 10px; margin-bottom: 10px;">
									<img :src="item.imgUrl" alt="">
								</div>
							</div>
							<div class="line"></div>
							<div class="after" v-if="description.addComment && description.addComment.length">
								【购买{{description.completeTime  }}天后追评】
							</div>
							<div class="after_div"  v-if="description.addComment && description.addComment.length">
									<span class="sunDrying">{{description.addComment[0].content}}</span>
							</div>
					</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getThedetails } from '@/api/index';
export default {
	data(){
		return{
			action:'http://www.maige.com/api/open/c/b2b2c/fileservice/uploadFile?',
			num:9,   //限制上传照片的个数
			imgArr:[], // 上传的图片
			updataimg:0,
			dialogImageUrl: '',  
			dialogVisible: false,
			textarea: '',  //评价晒单的value
			commentId:'', // 评价ID
			description:{},
			sundrying:{
				  orderNo:'98637034502',
					orderTime:'2019-06-29 14:33:34',
					kuaidi:'顺丰快递',
					star:require("@/assets/images/person_center/image/staron.png"),
					score:[
						{
							package:"快递包装",
							value:''
						},{
							package:'送货速度',
							value:''
						},{
							package:'配送员服务',
							value:''
						}	
					]
			},
		}
	},
	computed:{
		updataimgs(){
			return this.num-this.updataimg
		}
	},
	 methods: {
		async getThedetails(){
			try {
				let obj = {}
				obj.commentId = this.commentId
				const res = await getThedetails(obj)
				// packRank :this.sundrying.score[0].value>2?this.sundrying.score[0].value<5?1:2:0,
				// 		serviceRank:this.sundrying.score[1].value>2?this.sundrying.score[1].value<5?1:2:0,
				// 		speedRank :this.sundrying.score[2].value>2?this.sundrying.score[2].value<5?1:2:0,
				
				this.description = res.data
				if (this.description.commentRank === 2) {
          this.description.commentRank = 1
        } else if (this.description.commentRank === 1){
          this.description.commentRank = 3
        } else if (this.description.commentRank === 0) {
          this.description.commentRank = 5
        }
				if(res.code!=200){
					this.$message('未知错误，请联系管理管理人员')
				}
				} catch (e) {
        console.log(e)
			}
		 },
	},
	mounted(){
		this.commentId = this.$route.query.commentId
		this.getThedetails()
	}
}
</script>
<style lang="stylus" scoped>
.evaluation{
	background white
	margin-left 20px
	margin-top  15px
}
.header
	width 100%
	height 63px
	line-height 63px
	border-bottom 1px solid rgba(242,242,242,1)
	.orderNo
		height 13px
		font-size 13px
		font-family Microsoft YaHei
		font-weight 400
		color:rgba(153,153,153,1)
		span 
			&:nth-child(1)
				margin-left 20px
			&:nth-child(2)
				color rgba(51, 51, 51, 1)
			&:nth-child(3)
				margin-left 40px
.evaluation_container
	.evaluationTop
		border-bottom  1px solid rgba(242, 242, 242, 1)
		padding-bottom 20px
		display flex
		width 100%
		.evaluationTop_left
			width 228px
			.evaluation_center
				margin-top 26px
				margin-left 38px
				display flex
				.evaluation
					width 100px
					margin-top 25px
					margin-left 18px
					span 
						&:nth-child(2)
							margin-top 10px
							display inline-block
							font-size 13px
							color rgba(153, 153, 153, 1)
		.evaluationTop_right
			width 100%
			.start_item
				margin-left 68px
				width 90%
				display flex
				justify-content space-around
				margin-top 67px
				color rgba(136, 136, 136, 1)
				font-size 13px
				.start_list
					display flex
					span 
						word-break:keep-all;  
						vertical-align middle
						&:nth-child(1)
							padding-right 12px
					.pdl
						padding-left 12px
	.evaluationBottom
	.evaluationBottom
		width 100%
		display flex
		.evaluationBottom_l
			width 182px
			margin 56px
			text-align center
			img 	
				width 122px
				height 122px
			.text
				width 100%
				font-size 14px
				font-family Microsoft YaHei
				font-weight 400
				color rgba(51,51,51,1)
				margin-top 15px
				span 
					margin-top 15px
					&:nth-child(2)
						margin-top 10px
						font-size 14px
						font-family Microsoft YaHei
						font-weight 400
						color rgba(153,153,153,1)
						display inline-block
						width 100%
						text-align center
		.evaluationBottom_r		
			width 100%
			margin 72px
			.caveat
				font-size:13px;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(153,153,153,1);
				width 100%
				span 
					font-size 14px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(76,134,244,1)
			.kuaidi
				display flex
				margin 20px 0
				.starimg
					margin-top -2px 
				span 	
					margin-right 60px
					font-size 13px;
					font-family Microsoft YaHei
					font-weight 400;
					color rgba(136,136,136,1)
				.pinfen
					margin-left 10px
			.pinglun 
				display flex
				margin-top 30px
				.sunDrying 
				  display inline-block
					font-size 13px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(136,136,136,1)
					width 136px
			.updata
				margin-left: 114px;
				margin-top: 20px
				.num
					margin 20px 0
					span 
						font-size 13px
						color rgba(197, 197, 197, 1)
						font-family Microsoft YaHei;
						font-weight 400
					.updataNum
						color RGBA(255, 112, 112, 1)
				.publish
					width 200px
					height 35px
					line-height 35px
					text-align center
					font-size 16px;
					font-family Microsoft YaHei
					font-weight 400
					color rgba(255,255,255,1)
					background rgba(76,134,244,1)


.after{
	font-size:13px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(153,153,153,1);
	margin-top:18px;
}
.line{
	width:100%;
	height:1px;
	background:rgba(242,242,242,1);
	margin-top:40px;
}	
.after_div{
	margin-top:19px;
	font-size:13px;
	font-family:Microsoft YaHei;
	font-weight:400;
}		
.sunDrying{
	font-size 13px
	font-family Microsoft YaHei
	font-weight 400
	color rgba(136,136,136,1)
}
.img_size{
	width:66px;
	height:66px;
	border: 1px solid #e6e6e6;
	margin-right: 10px; 
}
.img_size img{
	width:100%;
	height:100%
}
</style>
