<template>
    <div>
      <form action1="" ref="account_login">
        <div class="row" >
          <i class="iconfont icon-zhanghao"></i>
          <input type="text" v-model="employeeName" placeholder="请输入员工姓名~" name="employeeName"
                 @keyup="showClear1">
          <div class="logintip" v-show="showEmployeeNameTip">
            <i class="iconfont icon-iconfontxiaogantanhao"></i>
            <span  v-text="employeeNameTip"></span>
          </div>
          <i class="clear iconfont icon-qingchu" @click="clearEmployeeName" v-show="showClearEmployeeName"></i>
        </div>
        <div class="row">
          <i class="iconfont icon-gonghao"></i>
          <input type="text"  v-model="employeeSn" placeholder="请输入员工工号~" name="employeeSn"
                 @keyup="showClear2">
          <div class="logintip" v-show="showEmployeeSnTip">
            <i class="iconfont icon-iconfontxiaogantanhao"></i>
            <span  v-text="employeeSnTip"></span>
          </div>
          <i class="clear iconfont icon-qingchu" @click="clearEmployeeSn" v-show="showClearEmployeeSn"></i>
        </div>
        <div class="row">
          <i class="iconfont icon-mima"></i>
          <input type="password" ref="password"  v-model="password" placeholder="请输入登录密码~" name="password"
                 @keyup.enter="reqLogin(2)">
          <i class="iconfont icon-xianshimima" v-show="showIndex2===true" @click="showPassword2"></i>
          <i class="iconfont icon-yincangmima" v-show="showIndex2===false" @click="hiddenPassword2"></i>
          <div class="logintip" v-show="showPasswordTip">
            <i class="iconfont icon-iconfontxiaogantanhao"></i>
            <span  v-text="passwordTip"></span>
          </div>
        </div>
        <div class="btn-wrap">
          <input class="my-btn" type="button" value="马上登录" @click="reqLogin(2)">
        </div>
        <div class="bottom">
          <router-link to="foundCode">
            <a>忘记密码</a>
          </router-link>
          <router-link to="/register">
            <a>注册</a>
          </router-link>
        </div>
      </form>
    </div>
</template>

<script>
import { goLogin, getVerificationCode } from '@/api/index'
import { handleCrypt, parseUrl, setCookie } from '@/assets/utils/utils'

export default {
  name: 'Account',
  data() {
    return {
      showEmployeeSnTip: false, // 显示员工工号错误提示
      employeeSnTip: '', // 员工工号错误提示内容
      showEmployeeNameTip: false, // 显示员工姓名错误提示
      employeeNameTip: '', // 员工姓名错误提示内容
      showPasswordTip: '', // 密码错误提示
      passwordTip: '', // 密码错误提示内容
      showClearEmployeeSn: false, // 显示删除员工工号
      showClearEmployeeName: false, // 显示删除员工姓名
      isSendVC: false,
      seconds: 60,
      slide: true,
      phoneNum: '',
      employeeSn: '',
      employeeName: '',
      password: '',
      verification: '',
      showLogin: true,
      token: '',
      index: 0,
      tip: '',
      icon: '&#xe621;',
      tipIndex: 0,
      loginIndex: 0,
      showIndex: 0,
      showIndex2: true,
    }
  },
  watch: {
    password(newVal) { // 登录密码输入
      this.password = newVal.replace(/^\s/g, '')
      if (!newVal.replace(/^\s/g, '')) {
        this.showPasswordTip = true
        this.passwordTip = '请输入密码'
      } else {
        this.showPasswordTip = false
      }
    },
    employeeName(newVal) { // 员工姓名输入变化
      this.employeeName = newVal.replace(/^\s/g, '')
      if (!newVal.replace(/^\s/g, '')) {
        this.showClearEmployeeName = false
        this.showEmployeeNameTip = true
        this.employeeNameTip = '请输入员工姓员'
      } else {
        this.showClearEmployeeName = true
        this.showEmployeeNameTip = false
      }
    },
    employeeSn(newVal) { // 员工工号输入变化
      this.employeeSn = newVal.replace(/^\s/g, '')
      if (!newVal.replace(/^\s/g, '')) {
        this.showClearEmployeeSn = false
        this.showEmployeeSnTip = true
        this.employeeSnTip = '请输入员工工号'
      } else {
        this.showClearEmployeeSn = true
        this.showEmployeeSnTip = false
      }
    },
    isSendVC(newVal) {
      if (newVal) {
        setInterval(() => {
          this.seconds = this.seconds - 1
          if (this.seconds === 0) {
            this.isSendVC = false
            this.seconds = 60
          }
        }, 1000)
      }
    },
  },
  methods: {
    // 显示登录密码
    showPassword2() {
      this.$refs.password.type = 'text'
      this.showIndex2 = false
    },
    // 加密码登录密码
    hiddenPassword2() {
      this.$refs.password.type = 'password'
      this.showIndex2 = true
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
    async reqLogin(loginMode) {
      const formData = new FormData()
      if (!this.password.replace(/^\s/g, '')) {
        this.showPasswordTip = true
        this.passwordTip = '请输入密码'
      }
      if (!this.employeeSn.replace(/^\s/g, '')) {
        this.showEmployeeSnTip = true
        this.employeeSnTip = '请输入员工工号'
      }
      if (!this.employeeName.replace(/^\s/g, '')) {
        this.showEmployeeNameTip = true
        this.employeeNameTip = '请输入员工姓员'
      }
      if (!this.employeeName || !this.employeeSn || !this.password) {
        return
      }
      // 账号登录
      formData.append('loginMode', loginMode)
      formData.append('employeeName', this.employeeName)
      formData.append('employeeSn', this.employeeSn)
      formData.append('password', handleCrypt.encrypt(this.password))
      const res = await goLogin(formData)
      if (res.code === 200) {
        setCookie('userData', JSON.stringify(res.data), 1)
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
      } else if (res.message === '该员工不存在，请联系管理员') {
        this.showEmployeeNameTip = true
        this.employeeNameTip = '该员工不存在，请联系管理员'
      } else if (res.message === '密码不正确!') {
        this.showPasswordTip = true
        this.passwordTip = '密码不正确!'
      } else if (res.message === '账户已锁定,请联系管理员') {
        this.showEmployeeNameTip = true
        this.employeeNameTip = '账户已锁定,请联系管理员'
      } else {
        this.showPasswordTip = true
        this.passwordTip = res.message
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
            .icon-iconfontxiaogantanhao
              color red
              font-size 16px
            span
              margin-left -30px
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
