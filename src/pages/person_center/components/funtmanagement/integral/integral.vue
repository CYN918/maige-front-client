<template>
    <div>
		<div class="center"> 
			<div class="left">
				<div class="price_icon"></div>
				<div class="account_balance">
					<span class="personal">个人账户余额</span>
					<span class="price">{{this.balanceCount}}</span>
				</div>					
			</div>
			<div class="btn">
				<a href="javascript:;" class="btn_left">兑换礼品</a>
				<a href="javascript:;" class="btn_right">充值</a>
			</div>
		</div>
		<div class="tabList">
			<!-- <span @click="changeView('integralList',1)" :class="{'active':iscolor===1}">积分列表</span>
			<span @click="changeView('integralRecording',2)" :class="{'active':iscolor===2}">积分记录</span> -->
			<el-table
				:data="list"
				border
				style="width: 100%">
				<el-table-column prop="accountName" label="积分类型" width="180" align="center"></el-table-column>
				<el-table-column prop="payType" label="交易类型" width="180" align="center"></el-table-column>
				<el-table-column prop="tradingTime" label="交易时间" width="180" align="center"></el-table-column>
				<el-table-column prop="useBalance" label="交易金额" width="180" align="center"></el-table-column>
				<el-table-column prop="transactionDescription" label="描述" width="180" align="center"></el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="form.currentPage"
					:page-sizes="form.sizes"
					:page-size="form.size"
					layout="total, sizes, prev, pager, next, jumper"
					:total="form.total">
					</el-pagination>
			</div>
		</div>
		<!-- <component :is="currentView"></component> -->
    </div>
</template>
<script>
	import integralList from './integrals/integralList'
	import integralRecording from './integrals/integralRecording'
	export default {
		props:  ['list','balanceCount'],
		name:'integral',
		components:{
			integralList,
			integralRecording
		},
		created() {
			// console.log(this.list)	
			// console.log(this.balanceCount)	
		},
		data(){
			return{
				// currentView:'integralList',
				// iscolor:1,
				form: {
					accountId: '',
					balanceType: '',
					currentPage:1,
					sizes:[10, 20, 50, 100],
					size:10,
					total:0,
				},
				tableData: [],
			}
		},
		methods:{
			// changeView(data,num){
			// 	this.currentView = data
			// 	this.iscolor=num
			// },
			
			handleSizeChange(val){
				this.form.size = val;	
				this.queryrunningwater();			
			},
			handleCurrentChange(val){
				this.form.currentPage = val;
				this.queryrunningwater();	
			},
		}
	}
</script>
<style lang="stylus" scoped>
.center
	margin-bottom 20px
	display flex
	justify-content space-between
	width 100%
	background white
	.left
		margin-left 50px
		box-sizing border-box
		padding-top 35px
		width 187px
		height 121px
		display flex
		justify-content space-between
		.price_icon
			width 52px
			height 52px
			background url("~@/assets/images/person_center/image/integral.png") center center 
			background-size 100%
		.account_balance
			margin-top -2px
			display flex
			flex-direction column
			justify-content space-around
			height 62px
			.personal
				display inline-block
				width 96px;
				height 16px;
				font-size 16px;
				font-family Microsoft YaHei;
				font-weight 400;
				color rgba(102,102,102,1);
				margin-left 2px
			.price
				display inline-block
				width 121px
				height 21px
				color rgba(76, 134, 244, 1)
				font-size 28px
				font-weight 400
				font-family Microsoft YaHei
				white-space nowrap;
.btn
	.btn_left,.btn_right 
		display inline-block
		width 66px
		height 40px
		line-height 40px
		text-align center
		background:rgba(76,134,244,1)
		border-radius 4px
		font-size 14px
		color white
		margin 41px
	.btn_left
		width 80px
		margin-right -17px
.tabList
	width 100%
	background white
	font-size 13px
	font-family Microsoft YaHei
	font-weight 400
	border-bottom 1px solid rgba(239,239,239,1)
	span 
		margin-left 59px
		cursor default
		&:nth-child(2)
			margin-left 79px
		&.active
			color rgba(64, 158, 255, 1)
</style>