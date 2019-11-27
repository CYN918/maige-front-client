<template>
    <div class="bannerNavContainer">
      <!-- 导航条 -->
        <ul class="tabNav">
          <li class="tabNavList all">
            <span> 全部商品分类</span>
          </li>
          <li class="tabNavList">
            <span>首页</span>
          </li>
          <li class="tabNavList ">
            <span class="office">办公用品专区</span>
          </li>
          <li class="tabNavList">
            <span>礼品定制专区</span>
          </li>
        </ul>
      
        <div class="bannerContainer">
          <div class="bigImg"> 
              <a href="">
                <img class="datu" src="@/assets/images/office_Area/img/jiaju.png" alt="">
              </a>
          </div>
          <div class="banner">
            <ul class="banneritem">
              <li class="bannerList">
                  手机数码
              </li>
              <li class="bannerList">
                办公用品
              </li>
              <li class="bannerList">
                鞋帽服饰
              </li>
              <li class="bannerList">
                用户清洁
              </li>
              <li class="bannerList">
                皮具箱包
              </li>
              <li class="bannerList">
                钟表珠宝
              </li>
              <li class="bannerList">
                鞋帽服饰
              </li>
              <li class="bannerList">
                促销用品
              </li>
              <li class="bannerList">
                母婴玩具
              </li>
              <li class="bannerList">
                康体保健
              </li>
              <li class="bannerList">
                食品生鲜
              </li>
              <li class="bannerList">
                虚拟商品
              </li>
          </ul>
          </div>
        </div>
    </div>
</template> 
<script>
export default {
  components:{
  }
}
</script>

<style lang="stylus" scoped>
.bannerNavContainer
  font-style MicrosoftYaHei
  width 100%
  .tabNav
    width 1200px
    margin 0 auto
    overflow hidden
    .tabNavList
      color rgba(51, 51, 51, 1)
      font-size 16px
      font-weight Regular
      float left
      width 200px
      height 40px
      text-align center
      line-height 40px
      &:nth-child(2)
        width 98px
      &:nth-child(3)
        width 145px
      &.all
        background rgba(120, 143, 246, 1)
        color white
    .tabNavList
      .office
        padding:0 22px 0 22px;
        border-left 1px solid  rgba(103, 103, 103, 1) 
        border-right 1px solid rgba(103, 103, 103, 1) 
        color rgba(120, 143, 246, 1)
  .bannerContainer
    width 100%
    height 456px
    border-top 1px solid rgba(120, 143, 246, 1)
    overflow hidden
    .bigImg
      width 100%
      height 100%
      position relative
      a
        display inline-block
        width 100%
      .datu 
        width  100%
        height 500px
    .banner
      position relative
      left 0
      top -486px
      width 1200px
      margin 0 auto
      z-index 3
      .banneritem
        position absolute
        left 0
        top 30px
        width 200px
        background rgba(32, 32, 32, 1)
        cursor default
        .bannerList
          width 100%
          height 38px
          color white
          line-height 38px
          text-align center
</style>
