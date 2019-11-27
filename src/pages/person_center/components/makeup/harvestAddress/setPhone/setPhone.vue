<template>

    <div class="smsVerification">
			<div class="progressBar">  
				<!-- <el-steps :active="active" align-center>
					<el-step title="设置绑定手机"></el-step>
					<el-step title="输入验证码"></el-step>
					<el-step title="完成"></el-step>
				</el-steps> -->
			</div>
			<div class="resetPhone">
				<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="180px">
					<p class="phoneImg">
						<img src="@/assets/images/person_center/image/手机.png" alt="" >
						<span>输入绑定手机 ：</span>
					</p>
					<el-form-item	label=""	prop="phone" :rules="[	{ required: true, message: '手机号不能为空'},]" style="margin-left:10px">
						<el-input type="verificationCode" v-model.number="numberValidateForm.phone" style="width:185px;height:52px"></el-input>
						<div class="verificationCode" @click="getMessage" v-if="show">
							<i class="el-icon-message"></i>
							<span>获取短信验证码</span>
						</div>		
            <div class="verificationCode" @click="getMessage" v-if="!show">
							<i class="el-icon-message"></i>
							<span>请在<span class="time">{{numtime}}</span>秒后重新获取</span>
						</div>
					</el-form-item>		
					<p class="codeImg">
						<!-- 点击获取验证吗 -->
						<img src="@/assets/images/person_center/image/信息.png" alt="" >
						<span>请输入验证码 : </span>
					</p>
					<el-form-item	label=""	prop="verificationCode" :rules="[{ required: true, message: '验证码不能为空'}]" style="margin-left:27px;margin-top:34px"	>
						<el-input type="verificationCode" v-model.number="numberValidateForm.verificationCode" style="width:185px;margin-left:-19px;"></el-input>
					</el-form-item>
						<el-button type="primary" @click="submitForm('numberValidateForm')" class="btn">完成</el-button>
				</el-form>
			</div>

  <!-- <div class="smsVerification">
    <div class="progressBar">
      <el-steps :active="active" align-center>
        <el-step title="输入原始密码"></el-step>
        <el-step title="输入新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="resetPhone">
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="180px">
        <img src="@/assets/images/person_center/image/手机.png" alt="" class="phoneImg">
        <el-form-item label="输入绑定手机：" prop="phone"
                      :rules="[
									{ required: true, message: '手机号不能为空'},
								]"
        >
          <el-input type="verificationCode" v-model.number="numberValidateForm.phone"
                    style="width:185px;height:52px"></el-input>
          <div class="verificationCode">
            <i class="el-icon-message"></i>
            <span>获取短信验证码</span>
          </div>
        </el-form-item>
        点击获取验证吗
        <img src="@/assets/images/person_center/image/信息.png" alt="" class="codeImg">
        <el-form-item label="请输入验证码：" prop="verificationCode"
                      :rules="[
									{ required: true, message: '验证码不能为空'},
								]"
        >
          <el-input type="verificationCode" v-model.number="numberValidateForm.verificationCode"  style="width:185px"></el-input>

          <el-input type="verificationCode" v-model.number="numberValidateForm.verificationCode"
                    style="width:185px"></el-input>

        </el-form-item>
        <el-button type="primary" @click="submitForm('numberValidateForm')" class="btn">完成</el-button>
      </el-form>
    </div>
  </div> -->
   </div> 
</template>
<script>
import { sendEditTelephoneCaptchaMessage, editTelephone , getphoneMessage , ediotphoneMessage } from "@/api/index";
import { throttleTipPop } from "@/assets/utils/utils";

export default {
  data() {
    return {
      show:true,
      userInfo: null,
      numtime:59,
      active: 1, // 进度条默认选中第一项
      numberValidateForm: {
        phone: '', // 手机号
        verificationCode: '', // 验证码
      },
    };
  },
  methods: {
   async getMessage(){
      if(this.show){
        const res = await getphoneMessage(this.numberValidateForm.phone);
        if(res.code == 200){
          this.show = false
          var test =  setInterval(()=> {
            this.numtime --
            if(this.numtime == 0){
              this.numtime = 59
              this.show = true
              clearTimeout(test);
            }
          },1000)
        }else{
          throttleTipPop(this,'error',res.message)
        }
      }
    },
     submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const responese = await editTelephone(this.numberValidateForm.phone,this.numberValidateForm.verificationCode);
          if(responese.code == 200 ){
            throttleTipPop(this,'success',responese.message)
          }else{
            throttleTipPop(this,'error',responese.message)
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="stylus" scoped>
  .el-steps--horizontal
    margin 51px auto
  .el-form-item__label
    font-size 19px
  .el-form
    width 368px
    left 0
    top 0
    bottom 0
    right 0
    margin auto

  .el-button--primary
    width 152px
    height 59px
    text-align center
    color white
    font-size 20px
    font-weight bold
    margin 69px 0 204px 180px
    background rgba(76, 134, 244, 1)
    border-radius 0

  .el-form
    width 660px
    .el-form-item__content
      display flex

  .resetPhone
    position relative
    margin-top: 50px;
    .phoneImg
      position absolute
      left 230px
      top 4px
    .codeImg
      position absolute
      left 230px
      top 77px

  .verificationCode
    float right
    width 204px
    height 50px
    line-height 50px
    border 1px solid rgba(204, 204, 204, 1)
    margin-right: 65px;
    box-sizing border-box
    padding 0 15px 0 17px
    i
      margin-top 19px
      float left
      width 22px
      height 17px
    span
      colorrgba(102, 102, 102, 1)
      font-size 16px
.time{
  display:inline-block;
  text-align center;
  width:20px;
}
.btn{
  width: 140px;
  height: 50px;
  border-radius: 4px;
  text-align: center;
}
</style>
