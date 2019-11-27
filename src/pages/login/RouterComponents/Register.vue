<template>
  <div class="content">
    <img class="background" src="@/assets/images/login/login_background.jpg" alt="">
    <div class="interpret">
      <img class="interpret_img" src="@/assets/images/login/login_pic.png" alt="">
      <div class="interpret-form">
        <div class="title">
          <img class="interpret-word" src="@/assets/images/login/background_register.png" alt="">
          <i class="horizontal-stroke"></i>
          <i class="horizontal-stroke"></i>
          <i class="horizontal-stroke"></i>
          <span>注册</span>
        </div>
        <div class="toggle-interpret">
          <span :class="{'active':slide === 1}">手机注册</span>
          <i class="iconfont icon-prevpage-copy"></i>
          <span :class="{'active':slide === 2}">设置密码</span>
          <i class="iconfont icon-prevpage-copy"></i>
          <span :class="{'active':slide === 3}">注册成功</span>
        </div>
        <router-view @setSlide="getSlide"></router-view>
      </div>
    </div>

    <!--注册协议-->
    <el-dialog
      title="注册协议"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="registerNeedKnown"
      width="914px"
    >
      <div id="agreement">
        <p class="margin1"><span class="strong">[审慎阅读]</span> 您在申请注册流程中点击同意前应当认真阅读以下协议。请您务必审慎阅读、充分理解协议 中相关条款内容，其中包括:</p>
        <div class="margin2">
          <p class="strong indent1 underline margin0">1、与您约定免除或限制责任的条款；</p>
          <p class="strong indent1 underline margin0">2、与您约定法律话用和管辖的条款；</p>
          <p class="strong indent1 underline margin0">3、其他以粗体下划线标识的重要条款。</p>
        </div>
        <p class="margin1">如您对协议有任何疑问，可向平台客服咨询。</p>
        <p class="margin2"><span class="strong">[特别提示]</span>
          当您按照注册页面提示填写信息、阅读并同意协议且完成全部注册程序后，即表示您已充分
          阅读、理解并接受协议的全部内容。如您因平台服务与商城发生争议的，适用《商城平台服务协议》处
          理。如您在使用平台服务过程中与其他用户发生争议的，依您与其他用户达成的协议处理。
        </p>
        <!--<a href="" style="display: block" class="strong blue indent1 margin1">《 法律声明 》</a>
        <a href="" style="display: block" class="strong blue indent1 margin1">《 隐私权政策 》</a>-->
        <a href="agreement.html" style="display: block" class="link strong blue indent1 margin1">《 用户注册协议 》</a>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="disAgreeWithTheProtoal" size="small" type="danger">取 消</el-button>
        <el-button type="primary" @click="agreeWithTheProtoal" size="small">同意并继续</el-button>
      </span>
    </el-dialog>
    <!--注册协议-->
  </div>
</template>

<script>

  export default {
    name: 'interpret',
    data() {
      return {
        registerNeedKnown: true,
        slide: 1,
      };
    },
    created() {
      this.checkoutRouter();
    },
    methods: {
      // 不同意思协议
      disAgreeWithTheProtoal() {
        location.href = 'index.html'
      },
      // 同意协议
      agreeWithTheProtoal() {
        this.registerNeedKnown = false
      },
      getSlide(n) {
        this.slide = n;
      },
      checkoutRouter() {
        if (this.$route.path === '/step1') {
          this.slide = 1;
        }
        if (this.$route.path === '/step2') {
          this.slide = 2;
        }
        if (this.$route.path === '/step3') {
          this.slide = 3;
        }
      },
    },
    watch: {
      $route(to) {
        if (to.path === '/step1') {
          this.slide = 1;
        }
        if (to.path === '/step2') {
          this.slide = 2;
        }
        if (to.path === '/step3') {
          this.slide = 3;
        }
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  // 协议样式
  #agreement
    line-height 1.5
    font-size 16px
    .margin0
      margin-bottom 4px
    .margin1
      margin-bottom 10px
    .margin2
      margin-bottom 16px
    .strong
      font-weight bold
    .underline
      text-decoration underline
    .indent1
      text-indent 1em
    .indent2
      text-indent 2em
    .blue
      color #4A99FA
    .link:hover
      text-decoration underline
  // 协议样式

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
    .interpret
      width 1256px
      height 628px
      position absolute
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      margin auto
      .interpret_img
        position relative
        width 100%
        height 100%
        z-index -1
      .interpret-form
        position absolute
        top 76px
        right 145px
        .title
          position relative
          display flex
          align-items center
          margin-bottom 46px
          .interpret-word
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
        .toggle-interpret
          width 452px
          height 47px
          background rgba(247, 250, 255, 1)
          border-radius 24px
          margin-bottom 46px
          .icon-prevpage-copy
            color #4C86F4
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
          .iconfont
            color #b6c1dc
            font-size 24px
            margin-right 32px
          .verification
            margin-left 158px
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
