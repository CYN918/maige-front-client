<template>
  <div>
    <form action2="" ref="phone_login">
      <div class="row">
        <i class="iconfont icon-shouji"></i>
        <input type="text" v-model="phoneNum" placeholder="请输入手机号码~">
        <div class="logintip" v-if="showPhoneNumTip">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span v-text="phoneNumTip"></span>
        </div>
      </div>
      <div class="row" v-if="isLoginByVC">
        <i class="iconfont icon-yanzhengma"></i>
        <input @keyup.enter="reqLogin" type="text" v-model="verification" placeholder="请输入验证码~">
        <div class="logintip" v-show="showVerificationTip">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span v-text="verificationTip"></span>
        </div>
        <div style="position:absolute; color: #999;top: 77px;left: 2px;" v-if="isSendVC">
          <i style="font-size:18px" class="iconfont icon-iconfontxiaogantanhao"></i>
          <span style="position: relative;left: -26px;top: -2px;">验证码已发送，120秒内输入有效</span>
        </div>
        <el-button v-if="!isSendVC" @click="getVerificationCode" type="text"
                   style="margin-left: 70px;border: 1px solid;padding: 8px;">
          <span>获取验证码</span>
        </el-button>
        <el-button v-else type="text" style="margin-left: 70px;border: 1px solid;padding: 8px;">
          <span>{{seconds}}s后重新获取</span>
        </el-button>
      </div>
      <div class="row" v-else>
        <i class="iconfont icon-mima"></i>
        <input type="password" ref="password" v-model="password" placeholder="请输入登录密码~" name="password"
               @keyup.enter="reqLogin">
        <i class="iconfont icon-xianshimima" v-show="showIndex2===true" @click="showPassword2"></i>
        <i class="iconfont icon-yincangmima" v-show="showIndex2===false" @click="hiddenPassword2"></i>
        <i class="clear iconfont icon-qingchu" @click="clearPassword" v-show="this.showIndex==3"></i>
        <div class="logintip" v-show="showCodeTip">
          <i class="iconfont icon-iconfontxiaogantanhao"></i>
          <span v-text="codeTip"></span>
        </div>
      </div>
      <div class="btn-wrap" style="margin-top: 48px">
        <input class="my-btn" type="button" value="马上登录" @click="reqLogin">
      </div>
      <div class="bottom">
        <a v-if="isLoginByVC" @click="toLoginByCode">密码登录</a>
        <a v-else @click="toLoginByVC">短信快捷登录</a>
        <router-link to="foundCode">
          <a class="middle">忘记密码</a>
        </router-link>
        <router-link to="/register">
          <a>注册</a>
        </router-link>
      </div>
    </form>
    <div class="user_save">
      <el-dialog
        title="提示"
        :modal="false"
        :visible.sync="userSave"
        width="450px"
      >
        <span>是否保存用户信息？</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="userSavefunc(false)" size="small" type="danger">取 消</el-button>
            <el-button type="primary" @click="userSavefunc(true)" size="small">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { goLogin, getVerificationCode, getSmsSendTime } from '@/api/index';
import { handleCrypt, parseUrl, getCookie, setCookie } from '@/assets/utils/utils';

export default {
  name: 'Phone',
  data() {
    return {
      codeTip: false, // 密码错误提示内容
      showCodeTip: false, // 显示密码错误提示
      verificationTip: false, // 验证码错误提示内容
      showVerificationTip: false, // 显示验证码错误提示
      showPhoneNumTip: false, // 显示手机号错误提示
      phoneNumTip: '', // 手机号错误提示内容
      userSave: false,
      showIndex2: true,
      isLoginByVC: true,
      isSendVC: false,
      seconds: 120,
      slide: true,
      phoneNum: '',
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
      sendTime: '',
      expiredTime: '',
      alldata: '',
    };
  },
  // 实现Enter登录
  created() {
    this.phoneNum = getCookie('userPhone');
    this.calculateTime();
  },
  watch: {
    isSendVC(newVal) {
      if (newVal) {
        const timer = setInterval(() => {
          this.seconds = this.seconds - 1;
          if (this.seconds === 0) {
            clearInterval(timer);
            this.isSendVC = false;
            this.seconds = 120;
          }
        }, 1000);
      }
    },
    password(newVal) { // 登录密码输入
      this.password = newVal.replace(/^\s/g, '');
      if (!newVal.replace(/^\s/g, '')) {
        this.showCodeTip = true;
        this.codeTip = '请输入密码';
      } else {
        this.showCodeTip = false;
      }
    },
    phoneNum(newVal) { // 手机号输入变化
      if (newVal.length < 11 || newVal.length > 11 || !(/^1[3456789]\d{9}$/.test(newVal))) {
        this.showPhoneNumTip = true;
        this.phoneNumTip = '手机号格式不正确';
      } else {
        this.showPhoneNumTip = false;
      }
    },
    verification(newVal) { // 验证码输入变化
      this.verification = newVal.replace(/^\s/g, '');
      if (!newVal.replace(/^\s/g, '')) {
        this.showVerificationTip = true;
        this.verificationTip = '请输入验证码';
      } else {
        this.showVerificationTip = false;
      }
    },

  },
  methods: {
    // 是否保存用戶手机号
    userSavefunc(state) {
      if (state) {
        setCookie('userPhone', this.phoneNum, 7);
        this.loginAndLinkTo(this.alldata);
      } else {
        this.loginAndLinkTo(this.alldata);
      }
    },
    // 显示登录密码
    showPassword2() {
      this.$refs.password.type = 'text';
      this.showIndex2 = false;
    },
    // 加密码登录密码
    hiddenPassword2() {
      this.$refs.password.type = 'password';
      this.showIndex2 = true;
    },
    // 去到手机验证码登录
    toLoginByVC() {
      this.isLoginByVC = true;
    },
    // 去到密码登录
    toLoginByCode() {
      this.isLoginByVC = false;
    },
    // 倒计时计算
    async calculateTime() {
      if(sessionStorage.getItem('loginPhone')) {
        this.phoneNum = sessionStorage.getItem('loginPhone')
        const res = await getSmsSendTime(this.phoneNum);
        if (res.code === 200) {
          const currentTime = Date.parse(new Date(res.data.currentTime)) / 1000;
          const sendTime = Date.parse(new Date(res.data.sendTime)) / 1000;
          if (currentTime - sendTime < 120) {
            this.isSendVC = true;
            this.seconds = 120 - currentTime + sendTime;
          }
          /* {currentTime: "2019-08-31 16:17:56"
                expiredTime: "2019-08-31 16:27:56"
              sendTime: "2019-08-31 16:27:55"} */
        }
      }

    },
    async getVerificationCode() {
      // 判断手机号是否为空
      if (!this.phoneNum) {
        this.phoneNumTip = '请输入手机号码';
        this.showPhoneNumTip = true;
        // 判断手机号位数是否正确
      } else if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
        this.phoneNumTip = '手机号格式不正确';
        this.showPhoneNumTip = true;
      } else if (this.phoneNum) {
        try {
          const res = await getVerificationCode(this.phoneNum);
          if (res.code === 200) {
            this.isSendVC = true;
            sessionStorage.setItem('loginPhone', this.phoneNum)
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
      }
    },
    toggleLogin() {
      this.slide = !this.slide;
    },
    async reqLogin() {
      const formData = new FormData();
      if (this.phoneNum.length < 11 || this.phoneNum.length > 11 || !(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
        this.showPhoneNumTip = true;
        this.phoneNumTip = '手机号格式不正确';
        return;
      }
      if (this.isLoginByVC) {
        if (!this.verification) {
          this.showVerificationTip = true;
          this.verificationTip = '请输入验证码';
          return;
        }
        if (!(/^\d{6}$/.test(this.verification))) {
          this.showVerificationTip = true;
          this.verificationTip = '验证码格式错误';
          return;
        }
        // 验证码登录
        formData.append('loginMode', 1);
        formData.append('telephone', this.phoneNum);
        formData.append('captcha', this.verification);
      } else {
        if (!this.password.replace(/^\s/g, '')) {
          this.showCodeTip = true;
          this.codeTip = '请输入密码';
          return;
        }
        formData.append('loginMode', 0);
        formData.append('username', this.phoneNum);
        formData.append('password', handleCrypt.encrypt(this.password));
      }
      const res = await goLogin(formData);
      if (res.code === 200) {
        const phone = getCookie('userPhone');
        if (phone !== this.phoneNum) {
          this.userSave = true;
          this.alldata = res;
        } else {
          this.loginAndLinkTo(res);
        }
      } else if (res.message === '账户不存在，请先注册') {
        this.showPhoneNumTip = true;
        this.phoneNumTip = res.message;
      } else if (res.message === '验证码已失效, 请重新获取验证码') {
        this.showVerificationTip = true;
        this.verificationTip = res.message;
      } else if (res.message === '验证码不正确, 请重试') {
        this.showVerificationTip = true;
        this.verificationTip = res.message;
      } else if (res.message === '密码不正确!') {
        this.showCodeTip = true;
        this.codeTip = res.message;
      } else if (this.isLoginByVC) {
        this.showVerificationTip = true;
        this.verificationTip = res.message;
      } else {
        this.showCodeTip = true;
        this.codeTip = res.message;
      }
    },
    // 登录及跳转
    loginAndLinkTo(res) {
      setCookie('userData', JSON.stringify(res.data), 1);
      const query = window.location.search;
      const queryObj = parseUrl(query);
      // 判断是否从详情页跳转过来
      if (queryObj.goodsId) {
        const { urlfrom, goodsId } = queryObj;
        window.location.href = urlfrom + '?goodsId=' + goodsId;
      } else if (queryObj.toAddress) {
        window.location.href = 'shopping_cart.html?justBuy=true#/address';
      } else {
        window.location.href = 'index.html';
      }
    },
    // 清除员工姓名
    clearEmployeeName() {
      this.employeeName = '';
      this.showIndex = 0;
    },
    // 清除员工工号
    clearEmployeeSn() {
      this.employeeSn = '';
      this.showIndex = 0;
    },
    // 清除密码
    clearPassword() {
      this.password = '';
      this.showIndex = 0;
    },
    // 按下键盘按键显示清除样式
    showClear1() {
      this.showIndex = 1;
    },
    showClear2() {
      this.showIndex = 2;
    },
    showClear3() {
      this.showIndex = 3;
    },

  },
};
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
            font-size: 24px;
            color: rgba(51, 129, 255, 1);
        .toggle-login
          width 452px
          height 48px
          background rgba(247, 250, 255, 1)
          border-radius 24px
          margin-bottom 46px
          span
            padding 0 35px
            display inline-block
            line-height 47px
            color #4C86F4
            cursor pointer
          .active
            height: 47px;
            background: rgba(82, 154, 255, 1);
            border-radius: 24px;
            color #fff
        .row
          display flex
          align-items center
          width: 431px;
          padding-bottom 18px
          background #fff
          border-bottom: 1px solid rgba(223, 231, 242, 1);
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
            text-align left
            .icon-iconfontxiaogantanhao
              color red
              font-size 16px
            span
              margin-left -30px
        .btn-wrap
          .my-btn
            position relative
            width: 448px;
            height: 70px;
            background: linear-gradient(90deg, rgba(111, 178, 255, 1), rgba(9, 95, 255, 1));
            box-shadow: 0px 7px 27px 0px rgba(50, 129, 255, 0.51);
            border-radius: 2px;
            font-size: 30px;
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
          .middle
            margin-left 220px
</style>
