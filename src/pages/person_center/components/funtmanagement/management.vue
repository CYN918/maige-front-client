<template>
    <div class="management_container">
			<!-- 资金管理 -->
        <header >
					<span class="management">资金管理</span>
				</header>  
				<div class="personal">
						<div class="center"> 
							<div class="left">
								<div class="price_icon"></div>
								<div class="account_balance">
										<span class="personal">个人账户余额</span>
										<span class="price" v-if="this.balanceTotal">{{balanceTotal}}</span>
								</div>					
						</div>
							<a href="javascript:;" class="right">充值</a>
						</div>
				</div>
				<div class="management_item">
					<ul  class="management_list">
						<li  :class="{'on':num===index}" @click="changeView(componenArr[index],index,item.accountType,item)" v-for="(item,index) in managementArr" :key="index">
								<div class="yhzt">
										<img :src="item.accountLogo" alt="" width="50">
										<span class="yhz" :style="{color:num===index?toggleColor:''}" style="margin-top: 18px;">{{item.accountName}}</span>
								</div>
						</li>
					</ul>
					<component :is="currentView" :list="list" :balanceCount="balanceCount"></component>
				</div>
				</div>
</template>
<script>
import coupons from './coupons/coupons'
import employeebenefits from './employeebenefits/employeebenefits'
import integral from './integral/integral'
import marketing from './marketing/marking'
import officeoupplies from './officeoupplies/officeoupplies'
import redenvelope from './redenvelope/redenvelope'
import { getCookie, setCookie } from '@/assets/utils/utils'
import { personalcenter,queryrunningwater} from '@/api/index';
export default{
	data(){
		return{
			currentView:integral,
			num:0,
			toggleColor:"rgba(246, 55, 141, 1)",
			balanceTotal: '',
			balanceCount: '',
			managementArr:[],
			list: [],
			form: {
				currentPage:1,
				sizes:[10, 20, 50, 100],
				size:10,
				total:0,
			},
			// 动态组件
			componenArr:["coupons","redenvelope","integral","officeoupplies","employeebenefits","marketing"],
			//文字颜色
			colorArr:["rgba(246, 55, 141, 1)", "rgba(255, 40, 83, 1)","rgba(252, 200, 125, 1)","rgba(137, 123, 254, 1)","rgba(255, 112, 84, 1)","rgba(44, 203, 254, 1)"]
		}
	},
	components:{
		coupons,
		employeebenefits,
		integral,
		marketing,
		officeoupplies,
		redenvelope
	},
	created() {
		let userData = JSON.parse(getCookie('userData'));
		let obj = {
			userId: userData.userId,
			token: userData.token
		}
		personalcenter(obj).then(res => {
			if(res.code == 200){
				if(res.data.lenth != 0){
					this.managementArr = res.data;
					this.balanceTotal = res.data[0].balanceTotal;
					this.changeView(this.componenArr[0],0,this.managementArr[0].accountType,this.managementArr[0])
					res.data.forEach(element => {
						if(element.accountType == '0'){
							this.currentView=integral
						}
						if(element.accountType == '1'){
							this.currentView=officeoupplies
						}						
					});
				}
			}
		})
    },
	methods:{
		changeView(componen,index,accountType,item){
			if(index === 0){
				let obj = {
					accountId: item.accountId,
					balanceType: accountType,
					pageIndex: this.form.currentPage,
					pageSize: this.form.size
				}
				this.balanceCount = item.balanceCount	
				queryrunningwater(obj).then(res => {
					if(res.code == 200){
						res.data.list.forEach(element => {
							let obj = {
								account: element.account,
								balance: element.balance,
								balanceAccountOrderVoList: element.balanceAccountOrderVoList,
								balanceChange: element.balanceChange,
								balanceId: element.balanceId,
								mode: element.mode,
								orderSn: element.orderSn,
								payType: element.payType,
								runningCode: element.runningCode,
								tradingTime: element.tradingTime,
								transactionDescription: element.transactionDescription,
								useBalance: element.useBalance,
								accountName: item.accountName
							}
							this.list.push(obj)
						})										
					}
				})
			}
			if(index === 1){
				let obj = {
					accountId: item.accountId,
					balanceType: accountType,
					pageIndex: this.form.currentPage,
					pageSize: this.form.size
				}
				setCookie('accountId', item.accountId, 17)
				this.balanceCount = item.balanceCount			
				queryrunningwater(obj).then(res => {
					if(res.code == 200){
						this.list = res.data.list	
					}
				})
			}
			if(index === 2){
				let obj = {
					accountId: item.accountId,
					balanceType: accountType,
					pageIndex: this.form.currentPage,
					pageSize: this.form.size
				}	
				this.balanceCount = item.balanceCount		
				queryrunningwater(obj).then(res => {
					if(res.code == 200){
						this.list = res.data.list	
					}
				})
			}
			if(index === 3){
				let obj = {
					accountId: item.accountId,
					balanceType: accountType,
					pageIndex: this.form.currentPage,
					pageSize: this.form.size
				}	
				this.balanceCount = item.balanceCount		
				queryrunningwater(obj).then(res => {
					if(res.code == 200){
						this.list = res.data.list	
					}
				})
			}
			if(index === 4){
				let obj = {
					accountId: item.accountId,
					balanceType: accountType,
					pageIndex: this.form.currentPage,
					pageSize: this.form.size
				}
				this.balanceCount = item.balanceCount			
				queryrunningwater(obj).then(res => {
					if(res.code == 200){
						this.list = res.data.list	
					}
				})
			}
			if(accountType == '0'){
				this.currentView = integral;
			}
			if(accountType == '1'){
				this.currentView = officeoupplies;
			}
			
			this.num=index,
			this.toggleColor=this.colorArr[index]
		},
	}
}
</script>
<style scoped>
.yhzt > img{
    float: left;
}
.yhz > span{
    float: right;
	margin-top: 15px;
}
</style>
<style lang="stylus" scoped>
.management_container
	margin-left 20px
	padding-bottom 178px
	header
		height:54px
		line-height 52px
		background:rgba(255,255,255,1)
		border:1px solid rgba(215,224,241,1)
		.management
			border-left 4px solid #4A99FA
			padding-left 21px
			font-size 17px
			font-weight 400
			font-family Microsoft YaHei
			color rgba(96, 96, 96, 1)
	.personal
		height:121px
		background-color white
		.center
			display flex
			justify-content space-between
			width 100%
			margin-top 10px
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
					background url("~@/assets/images/person_center/image/price.png") center center 
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
			.right 
				display inline
				width 66px
				height 40px
				line-height 40px
				text-align center
				background:rgba(76,134,244,1)
				border-radius 4px
				font-size 14px
				color white
				margin 41px
	.management_item
		margin-top 19px
		.management_list
			overflow hidden
			.on
				height 118px
			li
				display flex
				justify-content center
				align-items center
				width 171px
				height 100px
				background rgba(255,255,255,1)
				float left
				margin-right 10px
				&:nth-child(1)
					.yhzt
						span 
							width 55px	
							margin-top 16px
				&:nth-child(2),&:nth-child(3)
					.yhzt
						span 
							margin-top 8px
				.yhzt
					width 116px
					transition all 1s
					overflow height 
					cursor pointer
					&:hover
						transform scale(1.2)	
						
					img 
						display inline-block
						vertical-align middle
					span 
						display inline-block
						vertical-align middle
						width 60px
						font-size 14px
						margin-left 3px
						vertical-align middle
</style>


		
				
		
		

					
				
					



			



