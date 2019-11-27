<template>
  <div>
    <div class="bless-word-wrap">
				<div class="bw-title">祝{{entryPersonal.realName}}事事顺利！</div>
				<div class="bw-content">
					<div><img src="@/assets/images/birthdayArea/avantar_wedding.png" alt=""></div>
					<div>
						<p class="to-friend">亲爱的{{entryPersonal.realName}}：</p>
						<p class="to-friend-word">
							送你一艘船，愿你一帆风顺；送你一架梯，愿你平步青云；送你一盏灯，愿你前途光明；最后送你一颗祝福心，愿你事事顺利。
						</p>
					</div>
				</div>
        </div>
        <!--赠送礼物-->
        <div class="gift-wrap01">
					<h2 class="gift-title">赠送礼物</h2>
					<div class="gift-content">
							<ul class="gift-list clearfix">
								<li class="gift-item" v-for="(item,index) in gift" :key="index">
										<img :src=item.skuImg alt="" class="gift-item-pic">
								</li>
							</ul>
							<div class="gift-wrap">
								<div class="gift-pay">
									<span class="word-of-list total-price-wrap">商品总金额为：<span class="gift-total-price">{{money}}元</span></span>
								</div>
								<button class="confirm-pay-btn" @click="toPay">去支付</button>
							</div>
					</div>
        </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return{
    }
	},
	//计算赠送商品的价格
	computed: {
		...mapState(['gift','entryPersonal']),
		money(){
			return this.gift.reduce((pre,cur)=>{
				return pre+cur.salePrice
			},0)
		}
  },
  methods:{
		//去下订单的页面
		toPay(){
			window.location = "/shopping_cart.html";
		}
	},

}
</script>
<style lang="stylus" scoped>
/*通用样式*/
* {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style: none;
}
body {
    background: #f5f5f5;
}
a:hover {
    opacity: 0.8;
}
.header-wrapper {
    position: relative;
    background: #ffebf2;
    height: 460px;
}
.content-wrapper {
    width: 1200px;
    margin: 0 auto;
    padding-bottom: 100px;
}
.clearfix:after {
    display: block;
    content: '';
    clear: both;
}
.clearfix {
    zoom: 1;
}

/*首屏轮播*/
.first-banner-wrap {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 1200px;
    max-height: 436px;
    margin: auto;
}
.banner_fist_screen {
    width: 100%;
}

/*喜事列表*/
.happy-event-list {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 180px;
    margin: 35px auto;
    background: white;
    border-radius: 10px;
}
.happy-event-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
}
.word-of-list {
		text-align:right;
    font-size: 22px;
    font-family: MicrosoftYaHeiLight;
    color: #333;
		width:100%;
		display:inline-block;
		margin-top:40px
}
.gift-wrap {
    margin-bottom: 35px;
}
.gift-title {
    height: 67px;
    padding: 0 30px;
    background: rgba(255,235,242,1);
    border-radius:10px 10px 0 0;
    font: 24px/67px MicrosoftYaHei;
    color: #F54D7F;
}
.gift-content {
    background: white;
    padding:35px 25px 100px 25px;
    border-radius: 0 0 10px 10px;
}
.gift-item {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 113px;
    height: 113px;
    border: 1px solid rgba(230,230,230,1);
    border-radius: 2px;
    margin-left: 24px;
}
.gift-item-pic{
	width:100%
	height:100%
}
.gift-user-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 103px;
    border-top: 1px solid #E0E0E0;
    border-bottom: 1px solid #E0E0E0;
    margin: 40px 0;
}
.gift-user-left {
    display: flex;
    align-items: center;
}
.gift-user-name {
    margin-left: 24px;
}
.gift-user-phone {
    margin: 0 28px;
}
.gift-user-address {
    display: inline-block;
    max-width: 391px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: 22px MicrosoftYaHei;
    color: #666;
}
.gift-user-address:hover {
    cursor: pointer;
}
.icon-default {
    display: inline-block;
    width: 57px;
    height: 24px;
    margin-left: 24px;
    background: rgba(245,77,127,1);
    border-radius: 12px 0 12px 0;
    font: 18px/24px MicrosoftYaHei;
    color: white;
    text-align: center;
}
.add-new-address {
    font: 20px MicrosoftYaHei;
    color: #F54D7F;
}
.add-new-address:hover{
    opacity: 0.8;
    cursor: pointer;
}
.gift-pay {
    display: flex;
    align-items: center;
}
.total-price-wrap {
    margin-right: 42px;
}

.gift-total-price {
    font: bold 22px MicrosoftYaHei;
    color: #F54D7F;
}
.pay-way-label {
    display: flex;
    align-items: center;
    margin-left: 32px;
    font: 20px MicrosoftYaHei;
    color: #666;
}
.pay-way-select {
    display: inline-block;
    width:20px;
    height:20px;
    border-radius: 50%;
    border: #CCC 1px solid;
    box-sizing: border-box;
}
.pay-way-input {
    width: 1px;
    visibility: hidden;
}
.pay-way-input:checked+ .pay-way-select {
    border: none;
    background: url("~@/assets/images/birthdayArea/icon_selected.png");
}
.icon-pay-way {
    margin: 0 10px 0 16px;
}
.confirm-pay-btn {
		float: right; 
		margin-right:35px;
    width: 150px;
    height: 46px;
    margin-top: 44px;
    background:linear-gradient(45deg,rgba(235,29,89,1),rgba(244,53,133,1));
    box-shadow:0px 5px 12px 1px rgba(245,77,127,0.41);
    border-radius: 23px;
    outline: none;
    border: none;
    font: 18px/46px SourceHanSansCN-Normal;
    text-align: center;
    color: white;
    cursor: pointer;
}
.confirm-pay-btn:active {
    opacity: 0.8;
}

/* 收到礼物*/
.receive-gift-list {
    background: white;
    padding: 36px 25px;
    border-radius: 0 0 10px 10px;
}
.receive-gift-item {
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.33%;
    margin-bottom: 37px;
}

.gift-detail {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 20px;
}
.gift-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font: 20px MicrosoftYaHei;
    color: #333;
}
.gift-rewarder,
.reward-time {
    font: 18px MicrosoftYaHei;
    color: #666;
}

/* 新增地址弹窗*/
.mask-wrap {
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 1000;
}
.pop-up {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 823px;
    height: 831px;
    background: #FAFAFA;
    border-radius: 8px;
}
.pop-up-title {
    width: 100%;
    height: 44px;
    margin-bottom: 22px;
    background: #F54D7F;
    border-radius: 8px 8px 0 0;
    font: 18px/44px MicrosoftYaHei;
    text-align: center;
    color: white;
}
.shipping-addr-list {
    height: 258px;
    overflow: auto;

}
.shipping-addr-item {
    width: 782px;
    margin: 0 auto 24px;
    padding: 31px 36px 18px 32px;
    box-sizing: border-box;
    background: rgba(255,255,255,1);
    box-shadow: 0px 5px 12px 0px rgba(153,153,153,0.12);
    border-radius: 6px;
}
.shipping-addr-detail {
    margin-bottom: 27px;
}
.receiver-name,
.receiver-phone {
    font: 20px MicrosoftYaHei;
    color: #333;
    margin-right: 24px;
}
.receiver-address {
    font: 20px MicrosoftYaHei;
    color: #666;
}
.default-addr-wrap {
    display: flex;
    justify-content: space-between;
}
.default-addr-label {
    display: flex;
    align-items: center;
    font: 18px MicrosoftYaHei;
    color: #999;
}
.default-addr-icon 
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: #CCCCCC 1px solid;
    box-sizing: border-box;
    margin-left: -6px;
    margin-right: 6px;
    &.active
      border none
      background: url("~@/assets/images/birthdayArea/icon_selected.png");
.default-address-input {
    width: 6px;
    visibility: hidden;
}

.default-addr-btn {
		margin-top: -6px;
    margin-left: 24px;
    font: 18px MicrosoftYaHei;
    color: #999;
}
.btn-edit:before,
.btn-delete:before {
    position: relative;
    top: 3px;
    display: inline-block;
    margin-right: 8px;
}
.btn-edit:before {
    content: url("~@/assets/images/birthdayArea/icon_edit.png");
}
.btn-delete:before {
    content: url("~@/assets/images/birthdayArea/icon_delete.png");
}
.default-addr-btn:hover,.add-new-address-title:hover,
.default-addr-label:hover {
		color:#f54d7f;
    cursor: pointer;
}
.add-new-address-form {
		padding-bottom:4px;
    width: 823px;
    background: rgba(255,255,255,1);
    box-shadow: 0px 5px 12px 0px rgba(153,153,153,0.12);
}
.add-new-address-title {
    height: 57px;
    padding-left: 24px;
    font: 16px/57px MicrosoftYaHei;
    color: #999;
}
.one-pixel-line {
    width: 781px;
    height: 1px;
    margin-left: 24px;
    margin-bottom: 20px;
    background: rgba(224,224,224,1);
    opacity:0.5;
}
.add-new-address-label {
    display: inline-block;
    width: 90px;
    text-align: right;
    margin-right:20px;
    margin-left: 54px;
    font: 18px MicrosoftYaHei;
    color: #333;
}
.add-new-address-cell:last-of-type > .add-new-address-label {
    position: relative;
}
.wrap{
	display:flex;
	flex-direction:column
}
.tip_word{
	color:red;
	margin-top:3px
}
.add-new-address-cell {
    margin-bottom: 18px;
		display :flex
}
.add-new-address-textarea,
.add-new-address-input {
    width: 604px;
    padding: 0 22px;
    border: 1px solid rgba(204, 204, 204, 1);
    box-sizing: border-box;
    box-shadow: 0px 2px 3px 0px rgba(235,235,235,0.55);
    border-radius: 6px;
    outline: none;
}
.add-new-address-input {
    height: 38px;
}
.add-new-address-textarea {
    height: 90px;
    padding-top: 10px;
    resize: none;
}

/*选中按钮*/
.icon-select {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #CCC;
    box-sizing: border-box;
}
.icon-selected {
    border: none;
    background-images: url("~@/assets/images/birthdayArea/icon_seceted.png");
    background-size: 100%;
}
.selected-btn {
    margin: 20px 336px;
    width: 150px;
    height: 46px;
    background: linear-gradient(45deg,rgba(235,29,89,1),rgba(244,53,133,1));
    box-shadow: 0px 5px 12px 1px rgba(245,77,127,0.41);
    border-radius: 30px;
    font: 18px/46px MicrosoftYaHei;
    text-align: center;
    color: white;
    outline: none;
    border: none;
}
.selected-btn:hover {
    cursor: pointer;
}
/*省市区*/
.add-new-address-cell > select {
    width: 198px;
    height: 38px;
    padding: 0 22px;
    border: 1px solid rgba(204, 204, 204, 1);
    box-sizing: border-box;
    box-shadow: 0px 2px 3px 0px rgba(235,235,235,0.55);
    border-radius: 6px;
    outline: none;
}

/*礼物为空*/
.empty-gift-wrap {
    display: none;
    margin-top: 42px;
    text-align: center;
}
.word-of-empty {
    margin-top: 24px;
    font: 20px MicrosoftYaHei;
    color: #B3B3B3;
}

.close-popup {
    position: absolute;
    top: 8px;
    right: 14px;
    width: 30px;
    height: 30px;
}
.close-popup > img {
    width: 30px;
    height: 30px;
}
.close-popup:hover {
    cursor: pointer;
}

/*祝福语*/
.bless-word-wrap {
    width: 1200px;
    margin: 30px auto ;
}
.bw-title {
    height: 41px;
    line-height: 41px;
    background-images: url("~@/assets/images/birthdayArea/title.png");
    background-repeat: no-repeat;
    background-size: 317px 41px;
    background-position: center center;
    font-size:22px;
    font-family:MicrosoftYaHei-Bold;
    font-weight:bold;
    color:rgba(245,77,127,1);
    text-align: center;
    margin-bottom: 15px;
}
.bw-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 46px;
    background:#FFEBF2;
    box-shadow:0px 5px 12px 1px rgba(245,77,127,0.12);
    border-radius:10px;
    border: 20px solid white;
}
.to-friend {
    font-size:22px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(245,77,127,1);
    line-height:42px;
}
.to-friend-word {
    width: 860px;
    font-size:22px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:#666666;
    line-height:42px;
    text-indent: 2em;
}
</style>