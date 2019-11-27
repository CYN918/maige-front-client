<template>
  <div class="success">
    <img src="@/assets/images/login/success.png" alt="">
    <div class="btn-wrap">
      <input class="my-btn" type="button" value="立即体验" @click="linkTo">
    </div>
    <div class="bottom">
      <router-link to="/">
        <a>已有账号立即登录</a>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Step3',
  methods: {
    // 成功跳转至首页
    async linkTo() {
      window.location.href = 'index.html'
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
