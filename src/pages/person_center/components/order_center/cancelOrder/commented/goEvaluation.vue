<template>
	<div class="evaluation">
		<div class="header">
			<p class="orderNo">
				<span>订单号:</span>
				<span>{{sundrying.orderNo}}</span>
				<span>确认收货时间:{{sundrying.orderTime}}</span>
			</p>
		</div>
		<div class="evaluation_container">
			<div class="evaluationTop">
					<div class="evaluationTop_left">
						<div class="evaluation_center">
							<img src="@/assets/images/person_center/image/物流服务评价@2x.png" alt="">
							<div class="evaluation">
								<span>物流服务评价</span>
								<span>{{sundrying.kuaidi}}</span>
							</div>
						</div>
					</div>
					<div class="evaluationTop_right">
							<ul class="start_item">
								<li v-for="(item,index) in sundrying.score" :key="index">
									<div class="start_list">
										<span>{{item.package}}</span>
											 <Star :score='score'></Star>  <!-- 评分星星 -->
										<span class="pdl">{{score}}分</span>
									</div>
								</li>
							</ul>
					</div>
			</div>
			<div class="evaluationBottom"> 
					<div class="evaluationBottom_l">
						<img :src=description.img alt="">
						<p class="text">
							<span>{{description.product}}</span>
							<span>{{description.color}}</span>
						</p>
					</div>
					<div class="evaluationBottom_r">
							<p class="caveat">
								<img src="@/assets/images/person_center/image/感叹号@2x.png" alt="">
								<span>请至少填写一款商品的评价</span>
							</p>
							<div class="kuaidi">
								<span>快递包装</span> 
									 <Star :score='score'></Star>  <!-- 评分星星 -->
								<span class="pinfen">{{score}}分</span>
							</div>
							<div class="pinglun">
									<span class="sunDrying">评价晒单</span>
									<el-input
										type="textarea"
										:rows="5"
										resize="none"
										placeholder="分享体验心得，给千万想买的人一个参考吧~"
										v-model="textarea">
									</el-input>
							</div>
							<div class="updata">
								<el-upload
									class="avatar-uploader"
									action="https://jsonplaceholder.typicode.com/posts/"
									list-type="picture-card"
									:on-preview="handlePictureCardPreview"
									:on-remove="handleRemove"
									:on-error="handleerr"
									:on-success='handlSuccess'
									:limit=num     
									>
									<i class="el-icon-plus"></i>
									</el-upload>
									<el-dialog :visible.sync="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
									<div class="num">
										<span>共</span>
										<span class="updataNum">{{updataimg}}</span>
										<span> 张，还能上传</span><span  class="updataNum">{{updataimgs}} </span>
										<span>张</span>
									</div>
									<el-button type="primary" style="width:200px;text-align:center">发表</el-button>
							</div>
					</div>
			</div>
		</div>
	</div>
</template>
<script>
import Star from './star'
export default {
	components:{
		Star,
	},
	data(){
		return{
			num:9,   //限制上传照片的个数
			updataimg:0,
			dialogImageUrl: '',  
			dialogVisible: false,
			textarea: '',  //评价晒单的value
 			score:8,   //用户评论的分数
			description:{
						product:'Real Bubee蒸脸器补水仪器',
						color:"颜色分类：白色",
						img:require("@/assets/images/person_center/image/bushuiyi.png")
					},
			sundrying:{
				  orderNo:'98637034502',
					orderTime:'2019-06-29 14:33:34',
					kuaidi:'顺丰快递',
					star:require("@/assets/images/person_center/image/staron.png"),
					score:[
								{
									package:"快递包装",
								},{
										package:'送货速度',

								},{
										package:'配送员服务',
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
		 //移除文件的回调
      handleRemove(file, fileList) {
				console.log(file, fileList);
				this.updataimg--
			},
			//点击已上传的文件链接时的钩子, 可以通过 file.response 拿到服务端返回数据
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//上传成功的回调
			handlSuccess(response, file, fileList){
				this.updataimg++
				console.log(response, file, fileList)
			},
			//上传失败的回调
			handleerr(err, file, fileList){
				console.log(err, file, fileList)
			}
    }
}
</script>
<style lang="stylus" scoped>
.evaluation{
	background:white
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
					background white
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
			margin 72px
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


					
</style>