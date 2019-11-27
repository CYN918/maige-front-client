<template>
  <div class="content" >
    <img class="background" src="@/assets/images/login/login_background.jpg" alt="">
    <div class="interpret">
      <img class="interpret_img" src="@/assets/images/login/login_pic.png" alt="">
      <div class="interpret-form">
        <div class="title">
          <img class="interpret-word" src="@/assets/images/login/background_fondcode.png" alt="">
          <i class="horizontal-stroke"></i>
          <i class="horizontal-stroke"></i>
          <i class="horizontal-stroke"></i>
          <span>找回密码</span>
        </div>
        <div class="toggle-interpret">
          <span :class="{'active':slide === 1}">手机找回</span>
          <i class="iconfont icon-prevpage-copy"></i>
          <span :class="{'active':slide === 2}">设置密码</span>
          <i class="iconfont icon-prevpage-copy"></i>
          <span :class="{'active':slide === 3}">成功</span>
        </div>
        <router-view @setSlide="getSlide"></router-view>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'interpret',
  data() {
    return {
      slide: 1,
      phoneNum: '',
      captcha: '',
    }
  },
  created() {
    this.checkoutRouter()
  },
  methods: {
    getSlide(n) {
      this.slide = n
    },
    checkoutRouter() {
      if (this.$route.path === '/fstep1') {
        this.slide = 1
      }
      if (this.$route.path === '/fstep2') {
        this.slide = 2
      }
      if (this.$route.path === '/fstep3') {
        this.slide = 3
      }
    },
  },
  watch: {
    $route(to) {
      if (to.path === '/fstep1') {
        this.slide = 1
      }
      if (to.path === '/fstep2') {
        this.slide = 2
      }
      if (to.path === '/fstep3') {
        this.slide = 3
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
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
            font-size:24px;
            color:rgba(51,129,255,1);
        .toggle-interpret
          width 452px
          height 47px
          background rgba(247,250,255,1)
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
