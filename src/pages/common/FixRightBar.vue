<template>
  <div class="fix-right-bar">
    <a @click="linkTo('person_center.html')" class="wrap">
      <el-tooltip class="item" effect="dark" content="个人中心" placement="left">
        <div>
          <i><img src="@/assets/images/Mine@2x.png" alt=""></i>
          <p>个人中心</p>
        </div>
      </el-tooltip>
    </a>
    <a class="shopping_cart wrap" @click="linkTo('shopping_cart.html')">
      <div class="number" v-show="nums || num">{{nums ? nums : num}}</div>
      <el-tooltip class="item" effect="dark" content="购物车" placement="left">
        <div>
          <i><img src="@/assets/images/shopping_cart@2x.png" alt=""></i>
          <p>购物车</p>
        </div>
      </el-tooltip>
    </a>
    <a href="#" class="wrap">
      <el-tooltip class="item" effect="dark" content="客服" placement="left">
        <div>
          <i><img src="@/assets/images/custom_service@2x.png" alt=""></i>
          <p>客服</p>
        </div>
      </el-tooltip>
    </a>
    <a @click="feedback" class="wrap" v-if="showFeedback">
      <el-tooltip class="item" effect="dark" content="用户反馈" placement="left">
        <div>
          <i><img src="@/assets/images/feedback@2x.png" alt=""></i>
          <p>用户反馈</p>
        </div>
      </el-tooltip>
    </a>

    	<el-dialog title="用户反馈" :visible.sync="feedbackVisible" width="60%" show-close='true' :before-close="handleClose" class="transferModal"
									 :close-on-click-modal="false">
						 <el-form ref="form"  label-width="100px"  size="small">
							
								<el-row class="margin_b text_tit">
							      亲爱的用户，请您将使用本商城之后的意见和建议告诉我们，以便我们更好地改进产品，为您提供更好的服务。谢谢您的支持！
								</el-row>
                <el-row class="margin_b">
                    <span style="color:red;">*</span>1.欢迎留下您宝贵的意见
                </el-row>
						    	<el-row class="margin_b">
										<el-col :span="24">
													<el-col :span="24">
														<el-input v-model="formBack.opinion"  placeholder="请输入您宝贵的意见" type="textarea"></el-input>
													</el-col>
										</el-col>
								</el-row>
                <el-row class="margin_b">
                   2.上传图片（<span>{{ formBack.imgList.length }}</span>/5）
                </el-row>
                <el-row class="margin_b">
                  <div v-if="formBack.imgList.length" class="img_list">
                      <p v-for="item in  formBack.imgList" class="img_p">
                          <img  :src="item" class="avatar"  prop="file" style="width:141px;">
                          <span @click="removeImg(item)"><i class="el-icon-close avatar-uploader-icon remove_i"></i></span>
                      </p>  
                  </div>
                   
                    <el-row style="display: inline-block;vertical-align: middle;">
                          <el-upload
                          class="avatar-uploader"
                          :action="formBack.action"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          accept="image/jpeg, image/png"
                        >
                        <i v-if="formBack.imgList.length<=4" class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                     </el-row>
                </el-row>
							
               	<el-row class="margin_b" v-show="contact">
										<el-col :span="24">
											<el-form-item label="3.联系方式：">
													<el-col :span="8">
														<el-input v-model="formBack.teltphone"  placeholder="请输入" type="text"></el-input>
													</el-col>
                          <el-col :span="24" class="text_l">
													  (欢迎留下您的联系方式，方便商城品台根据您的建议改进后，第一时间通知您)
													</el-col>
											</el-form-item>
										</el-col>
								</el-row>
						</el-form> 
						<span slot="footer" class="dialog-footer">
							<el-button type="danger" @click="handleClose" size="small">取 消</el-button>
							<el-button type="primary" @click="handleSave" size="small">确 定</el-button>
						</span>
				</el-dialog> 
     <!-- <el-dialog
        title="提示"
        :visible.sync="feedbackVisible"
        width="450px"
        :before-close="handleClose">
        <span>是否保存用户信息？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose" size="small" type="danger">取 消</el-button>
          <el-button type="primary" @click="handleSave" size="small">确 定</el-button>
        </span>
      </el-dialog>-->

    <to-top-scroll></to-top-scroll>
   
  </div>
</template>

<script>
  import PubSub from 'pubsub-js';
  import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent';
  import { isLogin } from '@/assets/utils/utils';
  import { reqSystemConfig, reqShoppingCartNum , addfeedback } from '@/api/index';
  import ToTopScroll from '../common/ToTopScroll';

  export default {
    name: 'FixRightBar',
    props: ['nums'],
    data() {
      return {
        showFeedback: true, // 是否显示用户反馈
        num: 0,
        classnum: 0,
        userInfo: {},
        feedbackVisible:false,
        formBack:{
           opinion:'',
           action:'',
           imgList:[],
           teltphone:''
        },
        contact:false
      };
    },
    watch: {
      num(newVal) {
        if (newVal > 99) {
          this.num = '99+';
        }
      },
      nums(newVal) {
        this.num = newVal;
      },
    },
    components: {
      ToTopScroll,
    },
    async created() {
      this.userInfo = isLogin();
      let res = {};
      if (this.userInfo) {
        res = await reqShoppingCartNum();
        if (res.code === 200) {
          this.num = res.data;
        }
      }
    },
    mounted() {
      var baseUrl = 'http://www.maige.com'
      this.formBack.action = baseUrl + "/api/open/b/b2b2c/fileservice/uploadFile?";
      this.getSystemConfig()
    },
    methods: {
      // 获取系统配置
      async getSystemConfig() {
        const res = await reqSystemConfig('sys_user_switch_feedback')
        if (res.code === 200) {
          if (res.data.settingInfoList[0].key === 'open') {
            if (res.data.settingInfoList[0].checkValue === 'false') {
              this.showFeedback = false
            } else {
              this.showFeedback = true
            }
          } else if (res.data.settingInfoList[0].key === 'close') {
            if (res.data.settingInfoList[0].checkValue === 'true') {
              this.showFeedback  = false
            } else {
              this.showFeedback  = true
            }
          } else {
            this.showFeedback  = true
          }
        }
      },
      linkTo(url) {
        // 如果已经登录
        if (this.userInfo) {
          window.location.href = url;
        } else {
          // 需要登录
          PubSub.publish(SHOW_LOGINPOP);
        }
      },
      feedback() {
        this.feedbackVisible = true
        let  cookie_val = this.getCookie('userData')
       
        if( cookie_val.length>=1 ){
            this.contact = false  
            if( JSON.parse(cookie_val).telephone  ){
               this.formBack.teltphone = JSON.parse(cookie_val).telephone
            }else if( JSON.parse(cookie_val).email ){
               this.formBack.teltphone = JSON.parse(cookie_val).email
            }else if( JSON.parse(cookie_val).qq ){
               this.formBack.teltphone = JSON.parse(cookie_val).qq
            }
        }else{
           
            this.contact = true  
            this.formBack.teltphone = ''
        }
        this.formBack.opinion = ''
        this.formBack.imgList = []
       },
         //获取当前登录者 的信息
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
      handleClose(){
        this.feedbackVisible = false
      },
      handleSave(){
        if( !this.formBack.opinion ){
           this.$message({
              type: 'error',
              message: '意见不能为空，请输入'
          });	
          return
        }
        var data = {}
        data.contact = this.formBack.teltphone 
        data.feedbackContent =  this.formBack.opinion
        data.feedbackImg = this.formBack.imgList.join(","); 
          addfeedback(data.contact,data.feedbackContent,data.feedbackImg).then( res =>{
             if( res.code == 200 ){
                 this.$message({
                    type: 'success',
                    message: '操作成功'
                });	
                this.feedbackVisible = false
             }
          })
      },
      handleAvatarSuccess(res,file){
         this.formBack.imgList.push (res.data.domain + res.data.filePath) 
      },
      removeImg(val){
        var i =  this.formBack.imgList.length;
        var num ;
        while (i--) {
          if (this.formBack.imgList[i] == val) {
             num = i
          }
        }
         this.formBack.imgList.splice(num,1)   
      },
      
    },
  };
</script>
<style  scoped>
   .margin_b >>> .el-upload {
     border: 1px dashed #d9d9d9 !important
   }
   .margin_b >>> .el-textarea__inner {
     width: 80%;
     resize: none;
     min-height: 100px;
     line-height: 30px;
   }
  .transferModal >>> .el-dialog__headerbtn{
      display: block;   
   }
   
</style>
<style lang="stylus" scoped>
  .wrap:not(:last-of-type)
    border-bottom 1px solid #666
  .avatar-uploader-icon
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  .img_list img
    width: 132px;
    height: 133px;
    padding: 8px;
    border: 1px solid #e0e0e0;
    margin-bottom: 5px;
    margin-right: 5px;
  .img_list
    display: inline;  
  .img_p
    position: relative;   
  .img_p  span 
    position: absolute;
    top: 2px;
    right: 16px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  .img_p  i 
    width: 18px;
    height: 18px;
    line-height: 15px;      
  .text_l 
     color: #409eff;
  .img_p
     display: inline-block;   
  .text_tit
    font-size: 16px;
    line-height: 26px;   
  .margin_b
     margin-bottom:20px;  
  .wrap
    display flex
    flex-direction column
    align-items center
    justify-content center
    height 136px
    color #fff
    text-align center
    padding: 20px 0
    box-sizing border-box
    cursor pointer
    i
      display: inherit;
      margin-bottom 12px
    p
      box-sizing: border-box;
      padding: 0 12px 15px;
      width 38px
      line-height: 1.2;
      text-align center
      margin 0 auto
      color white
  .wrap:hover
    background #4C86F4
  .shopping_cart
    position relative
    .number
      position absolute
      left -10px
      top -2px
      width 24px
      height 24px
      line-height 24px
      text-align center
      border-radius 50%
      font-size 12px
      background #ff0000
      color #fff

  .fix-right-bar
    width: 46px;
    position fixed
    right 0px
    top 0px
    display flex
    flex-direction column
    justify-content center
    height 100%
    z-index 2050
    background #000

</style>
