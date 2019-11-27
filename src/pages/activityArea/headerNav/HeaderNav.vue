<template>
  <div class="top-nav">
    <a class="link-word" href="">首页</a>|
    <a class="link-word" href=""><i class="iconfont icon-jicai"></i> 企业集采</a>|
    <a class="link-word" href=""><i class="iconfont icon-jifen"></i> 积分商城</a>|
    <a class="link-word" href=""><i class="iconfont icon-bangongyongpin"></i>办公用品</a>|
    <a class="link-word" href=""><i class="iconfont icon-bangongyongpin"></i>京东商城</a>|
    <a class="link-word" href=""><i class="iconfont icon-bangongyongpin"></i>苏宁易购</a>|
    <a class="link-word" href=""><i class="iconfont icon-bangongyongpin"></i>网易严选</a>|
    <a class="link-word" href="">关于我们</a>|
    <div class="login-wrap">
      <a class="text-word" href="">您好，欢迎您来到商城,</a>
      <a class="link-word" href="">
        <!-- <i class="iconfont icon-gerenzhongxin1"></i> -->
        请 登录
      </a>|
      <a class="link-word" href="">
        免费注册
      </a>
    </div>
		<!-- 点击登录后显示 -->
    <div class="login-wrap" v-if="false">
      <a class="text-word" href="">您好，欢迎您来到商城！</a>
      <a href="" class="link-word" >
        
      </a>
      <a>
        退出
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TopNav',
  data() {
		return{

		}
	}
}
</script>

<style lang="stylus" scoped>
  a
    cursor pointer
  .top-nav
    min-width 1200px
    height 38px
    background #edecec
    display flex
    justify-content space-around
    align-items center
    color #e4e3e3
    font-size 24px
    padding 0 calc((100% - 1200px)/2)
    .link-word
      font-size 12px
      line-height 18px
      color rgba(102, 102, 102, 1)
			
      .iconfont
        position relative
        top 1px
        display inline-block
        width 18px
        height 18px
        line-height 18px
        text-align center
        color #fff
        margin-right 6px
      .icon-jicai
        background #6a82ff
      .icon-jifen
        background #ffc550
      .icon-bangongyongpin
        background #42d4ff
    .login-wrap
      font-size 12px
      color #333
      .text-word
        color #999
        font-size 12px
        margin-right 20px
      .icon-gerenzhongxin1
        position relative
        top 2px
        color #ff4e7c
      .link-word
        font-size 13px
        line-height 18px
        color rgba(102, 102, 102, 1)
        margin-right 6px
        cursor pointer
				font-weight bold
</style>
