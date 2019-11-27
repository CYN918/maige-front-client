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
								v-model="commentRank"
								show-text
								disabled
                :texts="['差评','差评','中评','中评', '好评']"
								text-color="#999999"
								:colors="['#4C86F4', '#4C86F4', '#4C86F4']"
								>
								</el-rate>  <!-- 评分星星 -->
							</div>
							<div class="pinglun">
								<el-input
									type="textarea"
									:rows="5"
									resize="none"
									placeholder="分享体验心得，给千万想买的人一个参考吧~"
									v-model="textarea">
								</el-input>
								<span class="tip">{{500-textarea.length}}/500（评价字数最多<span class="tip_color">500</span> 个字哦~）</span>
							</div>
							<div class="updata">
								<el-upload
									class="avatar-uploader"
									:action="action"
									list-type="picture-card"
									:on-success='handlSuccess'
									:limit='9'     
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
									<el-button type="primary" style="width:200px;text-align:center" @click="published">发表</el-button>
							</div>
					</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getThedetails , savEvaluation} from '@/api/index';
import { throttleTipPop } from '@/assets/utils/utils';
export default {
	data(){
		return{
      commentRank: null,
			action:'http://www.maige.com/api/open/c/b2b2c/fileservice/uploadFile?',
			num:9,   //限制上传照片的个数
			imgArr:[], // 上传的图片
			updataimg:0,
			dialogImageUrl: '',  
			dialogVisible: false,
			textarea: '',  //评价晒单的value
			orderId:'', // 订单id
			goodsId:'', // 商品id
			skuId:'', // skuid
			commentId:'', // 评论id
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
		 async published(){
		   if (this.commentRank === 1 || this.commentRank === 2) {
         this.description.commentRank = 2
       } else if (this.commentRank === 3 || this.commentRank === 4) {
         this.description.commentRank = 1
       } else if (this.commentRank === 5) {
         this.description.commentRank = 0
       }
			 if(this.textarea !== ''){
				 try {
				let obj = {
					'comment':{
						commentRank:this.description.commentRank,
						commentType: 2,
						content:this.textarea,
						goodsId:this.description.goodsId,
						orderId:this.orderId,
						packRank :this.description.packRank,
						serviceRank:this.description.serviceRank,
						speedRank :this.description.speedRank,
						skuId:this.description.skuId,
						"email": "",
						parentId:this.description.commentId,
					},
					"goodsGalleryes": {
						'galleryes': this.imgArr
					}
				}
				const res = await savEvaluation(obj)
				if(res.code!=200){
					throttleTipPop(this,'error',res.message)
				}else{
					this.$message({
					message: '恭喜你，评论成功',
					type: 'success'
					});
					this.$router.push({name:"myorder"})
				}
				this.description = res.data
				} catch (e) {
           console.log(e)
			 }
			
			}else{
				throttleTipPop(this,'error','评价不能为空')
			}
		 },
		async getThedetails(){
			try {
				let obj = {}
				obj.commentId = this.commentId
				const res = await getThedetails(obj)
        this.description = res.data
        if (this.description.commentRank === 2) {
          this.commentRank = 1
        } else if (this.description.commentRank === 1){
          this.commentRank = 3
        } else if (this.description.commentRank === 0) {
          this.commentRank = 5
        }
				if(res.code!=200){
					this.$message('未知错误，请联系管理管理人员')
				}
				} catch (e) {
        console.log(e)
			}
		 },
		 //上传成功的回调 
			handlSuccess(res, file, fileList){
				this.updataimg++
				this.imgArr.push({
					imgUrl:res.data.domain+res.data.filePath,
					imgDesc:res.data.filePath
				})
			},
	},
	mounted(){
		this.commentId = this.$route.query.commentId
		this.orderId = this.$route.query.orderId
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
				position relative
				.sunDrying 
				  display inline-block
					font-size 13px
					font-family Microsoft YaHei
					font-weight 400
					color rgba(136,136,136,1)
					width 136px
			.updata
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


.tip{
	position: absolute;
    right: 0;
    bottom: 6px;
	font-size:13px;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:#C5C5C5
}
.tip_color{
	color:#FF2A2A
}			
</style>
