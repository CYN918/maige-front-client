<template>
  <div>
    <form action1="">
      <div class="row">
        <i class="iconfont icon-shouji"></i>
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码~" name="username">
        <div class="logintip" v-show="showPhoneNumTip">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span  v-text="phoneNumTip"></span>
        </div>
      </div>
      <div class="row">
        <i class="iconfont icon-yanzhengma"></i>
        <input type="text"  v-model="captcha" placeholder="请输入验证码~" name="verification">
        <div class="logintip" v-show="showVerificationTip">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span  v-text="verificationTip"></span>
        </div>
        <div style="position:absolute; color: #999;top: 77px;left: 2px;" v-if="isSendVC">
          <i style="font-size:18px" class="iconfont icon-iconfontxiaogantanhao"></i>
          <span style="position: relative;left: -26px;top: -2px;">验证码已发送，120秒内输入有效</span>
        </div>
        <el-button v-if="!isSendVC" @click="getRegisterCaptcha" class="verification" type="text" style="margin-left: 70px;border: 1px solid;padding: 8px;">
          <span>获取验证码</span>
        </el-button>
        <el-button v-else class="verification" type="text" style="margin-left: 70px;border: 1px solid;padding: 8px;">
          <span>{{seconds}}s后重新获取</span>
        </el-button>
      </div>
      <div class="btn-wrap" style="margin-top: 48px">
        <input class="my-btn" type="button" value="下一步" @click="checkNextStep">
      </div>
      <div class="bottom">
        <router-link to="/">
          <a>已有账号立即登录</a>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { sendRegisterCaptcha, checkRegisterCaptcha, getSmsSendTime } from '@/api/index'

export default {
  name: 'Step1',
  data() {
    return {
      verificationTip: false, // 验证码错误提示内容
      showVerificationTip: false, // 显示验证码错误提示
      showPhoneNumTip: false, // 显示手机号错误提示
      phoneNumTip: '', // 手机号错误提示内容
      isSendVC: false,
      phoneNum: '',
      captcha: '',
      seconds: 120,
      tipIndex: 0,
      tip: '',
    }
  },
  created() {
    this.calculateTime()
  },
  watch: {
    isSendVC(newVal) {
      if (newVal) {
        const timer = setInterval(() => {
          this.seconds = this.seconds - 1
          if (this.seconds === 0) {
            clearInterval(timer)
            this.isSendVC = false
            this.seconds = 120
          }
        }, 1000)
      }
    },
    phoneNum(newVal) { // 手机号输入变化
      if (newVal && (newVal.length < 11 || newVal.length > 11 || !(/^1[3456789]\d{9}$/.test(newVal)))) {
        this.showPhoneNumTip = true
        this.phoneNumTip = '手机号格式不正确'
      } else {
        this.showPhoneNumTip = false
      }
    },
    captcha(newVal) { // 验证码输入变化
      this.verification = newVal.replace(/^\s/g, '')
      if (!newVal.replace(/^\s/g, '')) {
        this.showVerificationTip = true
        this.verificationTip = '请输入验证码'
      } else {
        this.showVerificationTip = false
      }
    },
  },
  methods: {
    // 倒计时计算
    async calculateTime() {
      if (sessionStorage.getItem('RePhone')) {
        this.phoneNum = sessionStorage.getItem('RePhone')
        const res = await getSmsSendTime(this.phoneNum)
        if (res.code === 200) {
          const currentTime = Date.parse(new Date(res.data.currentTime)) / 1000
          const sendTime = Date.parse(new Date(res.data.sendTime)) / 1000
          if (currentTime - sendTime < 120) {
            this.isSendVC = true
            this.seconds = 120 - currentTime + sendTime
          }
        }
      }

    },
    // 发送短信验证
    async getRegisterCaptcha() {
      const tf = this.setPassword()
      if (!tf) {
        return false
      }
      try {
        const res = await sendRegisterCaptcha(this.phoneNum);
        if (res.code === 200) {
          sessionStorage.setItem('RePhone', this.phoneNum)
          this.isSendVC = true;
          this.phoneNumTip = ''
          this.showPhoneNumTip = false
        } else {
          this.phoneNumTip = res.message;
          this.showPhoneNumTip = true;
        }
      } catch (e) {
        this.phoneNumTip = '操作频繁，请稍后重试';
        this.showPhoneNumTip = true;
      }
    },
    // 校验手机
    setPassword() {
      if (!this.phoneNum) {
        this.showPhoneNumTip = true
        this.phoneNumTip = '请输入手机号'
        return false
      } else if (!(/^1[3456789]\d{9}$/.test(this.phoneNum)) || (this.phoneNum.length != 11 && this.phoneNum)) {
        this.showPhoneNumTip = true
        this.phoneNumTip = '手机号格式不正确'
        return false
      }
      return true
    },
    // 下一步设置密码
    async checkNextStep() {
      if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
        this.showPhoneNumTip = true
        this.phoneNumTip = '手机号格式不正确'
        return
      }
      if (!this.captcha) {
        this.showVerificationTip = true
        this.verificationTip = '请输入验证码'
        return
      } else if (!(/^\d{6}$/.test(this.captcha))) {
        this.showVerificationTip = true
        this.verificationTip = '验证码格式错误'
        return
      }
      const res = await checkRegisterCaptcha(this.captcha, this.phoneNum)
      if (res.code === 200) { // 暂时为了通过，需要改为200
        this.$emit('setSlide', 2)
        sessionStorage.setItem('ReCaptcha', this.captcha)
        this.$router.push('/step2')
      } else {
        this.showVerificationTip = true
        this.verificationTip = res.message
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  ::-webkit-input-placeholder
    color #C3C3C3
  .row
    display flex
    align-items center
    width:431px;
    padding-bottom 18px
    background #fff
    border-bottom:1px solid rgba(223,231,242,1);
    margin-bottom 35px
    position relative
    .clear
            position absolute
            top 5px
            right 0
            cursor pointer
            color #095fff
          .logintip
            position absolute
            bottom -20px
            left 2px
            color red
            text-align  left
            .icon-iconfontxiaogantanhao
              color red
              font-size 16px
            span
              margin-left -30px
    .iconfont
      color #b6c1dc
      font-size 24px
      margin-right 32px
    .verification
      margin-left 158px
  .btn-wrap
    .my-btn
      position relative
      width:448px;
      height:70px;
      background:linear-gradient(90deg,rgba(111,178,255,1),rgba(9,95,255,1));
      box-shadow:0px 7px 27px 0px rgba(50,129,255,0.51);
      border-radius:2px;
      font-size:30px;
      color #fff
      margin-bottom 25px
      cursor pointer
    .my-btn:active
      top 2px
  .bottom
    display flex
    justify-content space-between
    a
      color #999
      cursor pointer
  .success
    img
      height 200px
      margin-left 96px
      margin-bottom 45px
</style>
