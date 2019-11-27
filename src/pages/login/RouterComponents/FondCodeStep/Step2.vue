<template>
  <div>
    <form action2="" ref="account_login">
      <div class="row">
        <i class="iconfont icon-mima"></i>
        <input type="password" v-model="password1" placeholder="请输入密码~" name="username" ref="password1">
        <i class="iconfont icon-xianshimima" v-show="showIndex1==true" @click="showPassword1"></i>
        <i class="iconfont icon-yincangmima" v-show="showIndex1==false" @click="hiddenPassword1"></i>
        <div class="logintip" :class="this.tipIndex==1?'tipActive':''">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span  v-text="tip"></span>
        </div>
      </div>
      <div class="row">
        <i class="iconfont icon-mima"></i>
        <input type="password"  v-model="password2" placeholder="请再次输入密码~" name="password" ref="password2">
        <i class="iconfont icon-xianshimima" v-show="showIndex2==true" @click="showPassword2"></i>
        <i class="iconfont icon-yincangmima" v-show="showIndex2==false" @click="hiddenPassword2"></i>
        <div class="logintip" :class="this.tipIndex==2?'tipActive':''">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span  v-text="tip"></span>
        </div>
      </div>
      <div class="btn-wrap">
        <input class="my-btn" type="button" value="下一步" @click="setSuccess">
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
import { findCodeByMsm } from '@/api/index'
import { handleCrypt } from '@/assets/utils/utils'

export default {
  name: 'Step2',
  data() {
    return {
      password1: '',
      password2: '',
      tipIndex: 0,
      tip: '',
      showIndex1: true,
      showIndex2: true,
      phoneNum: '',
      captcha: '',
    }
  },
  watch: {
    password1(newVal) {
      if (newVal) {
        this.password1 = this.password1.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g, '')
        this.password1 = this.password1.replace(/\s+/g, '')
      }
    },
    password2(newVal) {
      if (newVal) {
        this.password2 = this.password2.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g, '')
        this.password2 = this.password2.replace(/\s+/g, '')
      }
    },
  },
  methods: {
    // 设置密码
    async setSuccess() {
      if ((!this.password1) || (!this.password2)) {
        this.tipIndex = 2
        this.tip = '密码不能为空'
        return false
      } else if (this.password1 !== this.password2) {
        this.tipIndex = 2
        this.tip = '密码不一致'
        return false
      } else if (!(this.password1.length <= 18 && this.password1.length >= 6)) {
        this.tipIndex = 1
        this.tip = '请输入6-18位密码'
        return false
      } else if (!(this.password2.length <= 18 && this.password2.length >= 6)) {
        this.tipIndex = 2
        this.tip = '请输入6-18位密码'
        return false
      }
      this.captcha = sessionStorage.getItem('findCaptcha')
      this.phoneNum = sessionStorage.getItem('findPhoneNum')
      const obj = {
        telephone: this.phoneNum,
        captcha: this.captcha,
        password: handleCrypt.encrypt(this.password2),
      }
      const res = await findCodeByMsm(obj)
      if (res.code === 200) {
        this.$router.push('/fstep3')
        this.$emit('setSlide', 3)
      } else {
        this.$message.error(res.message)
      }
    },
    showPassword1() {
      this.$refs.password1.type = 'text'
      this.showIndex1 = false
    },
    hiddenPassword1() {
      this.$refs.password1.type = 'password'
      this.showIndex1 = true
    },
    showPassword2() {
      this.$refs.password2.type = 'text'
      this.showIndex2 = false
    },
    hiddenPassword2() {
      this.$refs.password2.type = 'password'
      this.showIndex2 = true
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
      display none
      .icon-iconfontxiaogantanhao
        color red
        font-size 16px
      span
        margin-left -30px
    .tipActive
      display block
    .iconfont
      color #b6c1dc
      font-size 24px
      margin-right 32px
    .icon-xianshimima
      position absolute
      right 5px
      top 4px
    .icon-yincangmima
      position absolute
      right 5px
      top 3px
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
