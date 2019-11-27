<template>
    <div class="header">
        <div class="logo">
          <h1>
						<a href="index.html">
            <img src="@/assets/images/logo_fuyuanai.png" alt="">         
          </a>
					</h1>
        </div>
        <div class="search">
          <div class="search-wrap">
            <input  class="search-input" type="text" placeholder="请输入您想搜索的方案或者商品名称">
            <button class="search-btn">
              <i class="iconfont icon-ICon-"></i>
              搜索
            </button>
          </div>

          <div class="tips-word-wrap">
            <span class="tips-word">小家电</span>
            <span class="tips-word">皮具</span>
            <span class="tips-word">智能手表</span>
            <span class="tips-word">智能手环</span>
          </div>
        </div>
        <div class="hotline">
          <div class="hotline-wrap">
            <p class="hotline-word"> <i class="iconfont icon-fuwurexian"></i> 
            <span> 服 务 热 线 </span>
            </p>
            <p class="hotline-number" :style="`background:${color}`">400-108-8710</p>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  props:['color'],
  name: 'Header',
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .search-enter-active, .search-leave-active
    transition opacity 0.3s ease
  .search-enter, .search-leave-to
    opacity 0
  .header
    display flex
    justify-content space-between
    width 1200px
    padding 28px calc((100% - 1200px)/2) 10px
    margin 0 auto
    .logo
      a
        height 80%
        display flex
        align-items center
        .border-line
          height 40px
          width 1px
          background #DBDBDB
          margin 0 16px
    .search
      position relative
      .search-wrap
        margin-bottom 6px
        .search-input
          width 402px
          height 39px
          background #fff
          border 1px solid rgba(120, 143, 246, 1)
          padding 6px 6px 6px 20px
          box-sizing border-box
          color #666
        .search-btn
          position relative
          left -5px
          width 84px;
          height 39px
          line-height 36px
          background rgba(120, 143, 246, 1)
          color #fff
          font-size 14px
          .icon-ICon-
            margin-right 6px
        .search-btn:hover
          cursor: pointer
        .search-btn:active
          border 1px solid #aa4E7C
      .tips-word
        font-size 12px;
        font-weight 400;
        color rgba(153,153,153,1);
        line-height 35px;
        margin-right 24px
        cursor pointer
      .search_result
        overflow: hidden;
        position: absolute;
        top: 36px;
        left: 0;
        width: 462px;
        max-height 320px
        border: 1px solid #ccc;
        background: #fff;
        z-index 999
        li
          height 10%
        .item
          display block
          padding 4px 6px
          color #666
        .item:hover
          background rgb(255,223,198)
        .close
          width calc(100% - 12px)
          padding 0 6px
          line-height 22px
          border-top 1px solid #efefef
          background white
          color #666
          text-align right
          span
            cursor pointer
    .hotline
      display flex
      align-items center
      .icon-fuwurexian
        color #333
        font-size 22px
        margin-right 6px
      .hotline-word
        color #333
        font-size 13px
        margin-bottom 6px
        i 
          vertical-align middle
      .hotline-number
        color rgba(120, 143, 246, 1)
        font-size 15px
        font-weight bold
        font-style italic
</style>
