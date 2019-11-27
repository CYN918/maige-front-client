<template>
  <div>
    <div v-if="showLogin" class="content">
      <img class="background" src="@/assets/images/login/login_background.jpg" alt="">
      <div class="login_wrap">
        <div class="login">
          <img class="login_img" src="@/assets/images/login/login_pic.png" alt="">
          <div class="login-form">
            <div class="title">
              <img class="login-word" src="@/assets/images/login/login_word.png" alt="">
              <i class="horizontal-stroke"></i>
              <i class="horizontal-stroke"></i>
              <i class="horizontal-stroke"></i>
              <span>登录</span>
            </div>
            <div class="toggle-login" @click="toggleLogin">
              <router-link to="/phone">
                <span :class="{'active':slide}">手机号登录</span>
              </router-link>
              <router-link to="/account">
                <span :class="{'active':!slide}">员工登录</span>
              </router-link>
            </div>
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goLogin, getVerificationCode } from '@/api/index'
import { handleCrypt, parseUrl } from '@/assets/utils/utils'

export default {
  name: 'Content',
  data() {
    return {
      isSendVC: false,
      seconds: 60,
      slide: true,
      phoneNum: '',
      employeeSn: 'lxy20190701',
      employeeName: '廖翔云',
      password: null,
      verification: '',
      showLogin: true,
      token: '',
      index: 0,
      tip: '',
      icon: '&#xe621;',
      tipIndex: 0,
      loginIndex: 0,
      showIndex: 0,
    }
  },
  // 实现Enter登录
  created() {
    this.checkoutRouter()
    const _this = this;
    document.onkeydown = function (e) {
      const key = window.event.keyCode;
      if (key == 13) {
        _this.addByEnterKey1();
        _this.addByEnterKey2();
      }
    };
  },
  watch: {
    password(newVal) {
      if (newVal) {
        event.value = this.password;
        // 禁止密码输入特殊字符和空格
        this.password = this.password.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g, '')
        this.password = this.password.replace(/\s+/g, '')
      }
    },
    verification(newVal) {
      if (newVal) {
        this.verification = this.verification.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\. @~（）_《》。？?【】：：:;]/g, '')
        this.verification = this.verification.replace(/\s+/g, '')
      }
    },
  },
  methods: {
    checkoutRouter() {
      if (this.$route.path === '/account') {
        this.slide = false
      }
      if (this.$route.path === '/phone') {
        this.slide = true
      }
    },
    async getVerificationCode() {
      const res = await getVerificationCode(this.phoneNum)
      // 判断手机号是否为空
      if (!this.phoneNum) {
        this.tip = '请输入手机号码'
        this.tipIndex = 1

        // 判断手机号位数是否正确
      } else if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
        this.tip = '请输入合法的手机号码'
        this.tipIndex = 1
        console.log(1);
      } else if (this.phoneNum) {
        this.isSendVC = true
        if (res.code !== 200) {
          this.$message(res.message)
        }
      }
    },
    toggleLogin() {
      this.slide = !this.slide
    },
    addByEnterKey1(e) {
      this.reqLogin(2);
    },
    addByEnterKey2(e) {
      this.reqLogin(1);
    },
    async reqLogin(loginMode) {
      const formData = new FormData()
      formData.append('loginMode', loginMode)
      // 账号登录
      if (loginMode === 2) {
        formData.append('employeeName', this.employeeName)
        formData.append('employeeSn', this.employeeSn)
        formData.append('password', handleCrypt.encrypt(this.password))
        // 判定信息是否为空
        if (!(this.employeeName || this.employeeSn || this.password)) {
          this.loginIndex = 1
          this.tip = '请输入正确的信息！'
          return
        }
        // 判定密码是否输入或工号和密码不为空时，工号，姓名是否为空
        if (((!this.password) && this.employeeName && this.employeeSn) || (this.password) && (!this.employeeSn) && (!this.employeeSn)) {
          this.loginIndex = 1
          this.tip = '请输入登录密码/输入姓名/选择工号'
          return
        }
        // 根据密码错误返回提示
        if (this.password !== '123456' && this.password && this.index < 3) {
          this.index++
          this.loginIndex = 2
          this.tip = '密码错误'
          this.password = ''
          return
        } else if (this.index >= 3) {
          this.loginIndex = 2
          this.tip = '密码多次输入错误，请找回密码'
          this.password = ''
          return
        }
      } else if (loginMode === 1) {
        // 验证码登录
        formData.append('telephone', this.phoneNum)
        formData.append('captcha', this.verification)
      }
      const res = await goLogin(formData)
      if (!this.verification) {
        this.tipIndex = 2
        this.tip = '请输入正确的验证码'
      } else if (res.code === 200) {
        localStorage.setItem('userData', JSON.stringify(res.data))
        const query = window.location.search
        const queryObj = parseUrl(query)
        // 判断是否从详情页跳转过来
        if (queryObj.goodsId) {
          const { urlfrom, goodsId } = queryObj
          window.location.href = urlfrom + '?goodsId=' + goodsId
        } else if (queryObj.toAddress) {
          window.location.href = 'shopping_cart.html?justBuy=true#/address'
        } else {
          window.location.href = 'index.html'
        }
      }
    },
    // 清除员工姓名
    clearEmployeeName() {
      this.employeeName = ''
      this.showIndex = 0
    },
    // 清除员工工号
    clearEmployeeSn() {
      this.employeeSn = ''
      this.showIndex = 0
    },
    // 清除密码
    clearPassword() {
      this.password = ''
      this.showIndex = 0
    },
    // 按下键盘按键显示清除样式
    showClear1() {
      this.showIndex = 1
    },
    showClear2() {
      this.showIndex = 2
    },
    showClear3() {
      this.showIndex = 3
    },

  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .login_wrap
    width 1200px
  .tipword
    color red
    margin-left 10px
  ::-webkit-input-placeholder
    color #C3C3C3
  .content
    position relative
    width 100%
    height 934px
    .background
      position absolute
      width 100%
      height 100%
      left 50%
      transform translateX(-50%)
      z-index -2
    .login
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      margin auto
      .login_img
        position relative
        width 1256px
        height 628px
        z-index -1
      .login-form
        position absolute
        top 76px
        right 145px
        .title
          position relative
          display flex
          align-items center
          margin-bottom 46px
          .login-word
            position absolute
            left -14px
            top -30px
          .horizontal-stroke
            display inline-block
            width 5px
            height 23px
            background #4A99FA
            margin-right 6px
          .horizontal-stroke:nth-of-type(2)
            opacity 0.4
          .horizontal-stroke:nth-of-type(3)
            opacity 0.1
          span
            margin-left 8px
            font-size:24px;
            color:rgba(51,129,255,1);
        .toggle-login
          width 452px
          height 48px
          background rgba(247,250,255,1)
          border-radius 24px
          margin-bottom 46px
          span
            padding 0 35px
            display inline-block
            line-height 47px
            color #4C86F4
            cursor pointer
          .active
            height:47px;
            background:rgba(82,154,255,1);
            border-radius:24px;
            color #fff
        .row
          display flex
          align-items center
          width:431px;
          padding-bottom 18px
          background #fff
          border-bottom:1px solid rgba(223,231,242,1);
          margin-bottom 35px
          position relative
          .iconfont
            color #b6c1dc
            font-size 24px
            margin-right 32px
          .clear
            position absolute
            top 3px
            right 0
            cursor pointer
            font-size 14px

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
            margin-bottom 20px
            cursor pointer
          .my-btn:active
            top 2px
        .bottom
          display flex
          justify-content space-between
          a
            color #999
            cursor pointer
</style>
