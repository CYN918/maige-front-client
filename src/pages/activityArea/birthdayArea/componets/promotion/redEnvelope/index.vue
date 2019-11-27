<template>
  <div>
    <div class="red-packet-wrap01">
      <div v-show="!noRedEnvelope">
        <h2 class="red-packet-title">打赏红包</h2>
        <div class="red-packet-content">
            <div class="red-packet-account red-packet-accountTop">
              <label id="money-input-label">
                <span class="word-of-list">红包金额：</span>
                <input maxlength="11" type="text" id="money-input" placeholder="输入红包金额" v-model="redPacketValue">
              </label>
            </div>
            <div class="red-packet-pay">
              <span class="word-of-list total-price-wrap">红包金额为：<span class="gift-total-price">{{redPacketValue}}元</span></span>
              <label class="pay-way-label" for="wechat-pay" @click="WeChatPayment">
                <input checked type="radio" name="pay-way" id="wechat-pay" class="pay-way-input">
                <i class="pay-way-select"></i>
                <img class="icon-pay-way" src="@/assets/images/birthdayArea/icon_wechat_pay.png" alt="">
                微信支付
              </label>
              <label class="pay-way-label" for="ali-pay" @click="alipayPayment">
                  <input type="radio" name="pay-way" id="ali-pay" class="pay-way-input">
                  <i class="pay-way-select"></i>
                  <img class="icon-pay-way" src="@/assets/images/birthdayArea/icon_ali_pay.png" alt="">
                  支付宝支付
              </label>
              <label class="pay-way-label" for="bank-pay">
                  <input type="radio" name="pay-way" id="bank-pay" class="pay-way-input">
                  <i class="pay-way-select"></i>
                  <img class="icon-pay-way" src="@/assets/images/birthdayArea/icon_bank_pay.png" alt="">
                  银行卡支付
              </label>
            </div>
            <div type="text" @click="amount" class="confirm-pay-btn" :disabled="redPacketValue===''">确定打赏</div>
          </div>
        </div>
        <!--收到红包-->
        <div class="red-packet-wrap">
            <h2 class="red-packet-title">收到红包</h2>
            <ul class="red-packet-list clearfix">
                <li class="red-packet-item" v-for="(item,index) in confirmReward" :key="index">
                    <div class="red-packet-background"><p class="red-packet-money">{{item.money}}元</p></div>
                    <div class="red-packet-detail">
                        <h4 class="red-packet-account">{{item.money}}元红包</h4>
                        <h5 class="red-packet-rewarder">打赏人：晓明</h5>
                        <h5 class="reward-time">时间：{{item.time}}</h5>
                    </div>
                </li>
            </ul>
        </div>
        </div>
        <!--红包为空-->
        <div class="empty-gift-wrap" v-show="noRedEnvelope" @click="noRedEnvelope=false">
          <div class="empty-gift-img"><img src="@/assets/images/birthdayArea/pic_empty.png" alt=""></div>
          <p class="word-of-empty">还没有人送红包哦~送ta第一份红包吧！</p>
      </div>
  </div>
</template>
<script>
import { mapState} from 'vuex'
import { redEnvelopePayment ,qRCode } from '@/api/index'
import { handleCrypt } from '@/assets/utils/utils'
export default {
  data(){
    return{
      noRedEnvelope:true,
      // prices:'',
			confirmReward:[],
			redPacketValue:'',  //红包金额
			time:"",
			gifterUserId:'',
			paymentMethod:'wxpay_native',  //默认选中微信支付
			codeUrl:'',     //生产的二维码地址
            createTime:"",   // 送红包的时间
            paymode:null,
            orderNo:"",
            codeUrl:'',
            obj:''
		}		
    },
    
  created(){
      //获取的红包

    //当前的时间
      // const date = new Date();
      // const year = date.getFullYear();
      // const month = date.getMonth()+1;
      // const day = date.getDate();
      // const hour = date.getHours();
      // const minute = date.getMinutes();
      // const second = date.getSeconds();
      // this.time = year+"."+month+"."+day+"   "+hour+":"+minute  
      // if(JSON.parse(localStorage.getItem('confirmReward'))){
      //   this.confirmReward=JSON.parse(localStorage.getItem('confirmReward'))
		// }
			
	// 调用函数获取个人信息
    let  cookie_val = this.getCookie('userData');
    this.gifterUserId =JSON.parse(cookie_val).userId
	},
	computed:{
		...mapState(['activityId','promotionPersonal'])
	},
  methods:{
      //发送红包
    async amount() {
        const  reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if(!reg.test(this.redPacketValue)) return
         // 支付方式
        switch (this.paymentMethod) {
            case 'alipay_qr':
            this.paymode = 1
            break
            case 'wxpay_native':
            this.paymode = 2
            break
            default :
            this.paymode = null
        }
            const obj = {
                activityId:this.activityId,  // 活动id
                gifterUserId:this.gifterUserId,   //用户id
                happyEventType:4,   //活动类型
                redPacketValue:this.redPacketValue,
                userId:this.promotionPersonal.userId ,  //评论者id
                presentType:2,     //祝福类型
                payType:this.paymentMethod
            }
            // const res = await redEnvelopePayment(obj)
            this.obj = JSON.stringify(obj)
         
            let url = window.location.href
            url = handleCrypt.encrypt(url)
            const linkUrl=`activityPayment.html?redirect=${url}&paymode=${this.paymode}&obj=${this.obj}&redPacketValue=${this.redPacketValue}`
            if (this.paymode === 1) {
                window.open(linkUrl + '#/alipay')
            } else if (this.paymode === 2) {
                window.open(linkUrl)
            }
	}, 
		//获取个人信息
		getCookie(cname){
			var name = cname + "=";
			var ca = document.cookie.split(';');
			for(var i=0; i<ca.length; i++) 
			{
				var c = ca[i].trim();
			if (c.indexOf(name)==0) return c.substring(name.length,c.length);
			}
			return "";
			},
        //微信支付
        WeChatPayment(){
            this.paymentMethod = 'wxpay_native'
        },
        alipayPayment(){
            this.paymentMethod='alipay_qr'
        }
     }
}
</script>
<style lang="stylus" scoped>
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
    font-size: 22px;
    font-family: MicrosoftYaHeiLight;
    color: #333;
}
.pic-happy-event {
    max-width: 90px;
    margin-bottom: 10px;
}

/*打赏红包*/
.red-packet-wrap01 {
    margin-bottom: 35px;
}
.red-packet-title {
    height: 67px;
    padding: 0 30px;
    background: rgba(255,235,242,1);
    border-radius:10px 10px 0 0;
    font: 24px/67px MicrosoftYaHei;
    color: #F54D7F;
}
.red-packet-content {
    background: white;
    padding: 36px 25px;
    border-radius: 0 0 10px 10px;
}
.red-packet-pay {
    display: flex;
    align-items: center;
}
.total-price-wrap {
    margin-right: 30px;
}

.gift-total-price {
    display: inline-block;
    width: 172px;
    font: bold 22px MicrosoftYaHei;
    color: #F54D7F;
}
.pay-way-label {
    display: flex;
    align-items: center;
    margin-right: 72px;
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
#money-input {
    outline: none;
    width: 795px;
    height: 55px;
    padding: 0 24px;
    box-sizing: border-box;
    border: 1px solid rgba(204, 204, 204, 1);
    box-shadow: 0px 2px 3px 0px rgba(235,235,235,0.55);
    border-radius: 6px;
    font: 22px MicrosoftYaHei;
    color: #666;
}

.confirm-pay-btn {
    width: 150px;
    height: 46px;
    line-height:46px;
    margin-top: 44px;
    background:linear-gradient(45deg,rgba(235,29,89,1),rgba(244,53,133,1));
    box-shadow:0px 5px 12px 1px rgba(245,77,127,0.41);
    border-radius: 23px;
    outline: none;
    font-size : 18px ;
    font-style:SourceHanSansCN-Normal;
    text-align: center;
    color: white;
    cursor: pointer;
}
.confirm-pay-btn:active {
    opacity: 0.8;
}


/* 收到红包*/
.red-packet-title {
    height: 67px;
    padding: 0 30px;
    background: rgba(255,235,242,1);
    border-radius:10px 10px 0 0;
    font: 24px/67px MicrosoftYaHei;
    color: #F54D7F;
}
.red-packet-list {
    background: white;
    padding: 47px 55px;
    border-radius: 0 0 10px 10px;
}
.red-packet-item {
    float: left;
    display: flex;
    align-items: center;
    width: 33.33%;
    margin-bottom: 40px;
}
.red-packet-background {
    width: 84px;
    height: 110px;
    box-shadow:0px 5px 12px 1px rgba(249,91,91,0.41);
    background: url("~@/assets/images/birthdayArea/pic_red_packet.png");
    background-size: 100%;
    margin-right: 33px;
}
.red-packet-money {
    margin-top: 70px;
    font: bold 14px FZCYSK--GBK1-0 MicrosoftYaHei;
    text-align: center;
    color: #FEEA67;
}
.red-packet-detail {
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.red-packet-account {
    font: 20px MicrosoftYaHei;
    color: #333;
}
.red-packet-accountTop{
  margin-bottom:50px
}
.red-packet-rewarder,
.reward-time {
    font: 18px MicrosoftYaHei;
    color: #666;
}

/*红包为空*/
.empty-gift-wrap {
    margin-top: 42px;
    text-align: center;
}
.word-of-empty {
    margin-top: 24px;
    font: 20px MicrosoftYaHei;
    color: #B3B3B3;
}
</style>
