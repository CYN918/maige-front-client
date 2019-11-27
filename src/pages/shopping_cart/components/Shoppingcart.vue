<template>
    <div style="background:#f7faff;">
        <div class="shopping_cart">
            <div class="cart_header clearfix">
                <div class="header_top">
                    <span class="kuai"></span>
                    <div class="text">购物车</div>
                    <div style="float:right;color:#B6B6B6;font-size:14px;margin-right:22px;">
                        <i class="el-icon-info"></i> 购物流程
                    </div>
                </div>
                <div class="header_body">
                    <div class="bar">
                        <div class="bar_tu">
                            <div class="xian">
                            </div>
                            <div :class="{'xianshi':true,'xianshi1': $store.state.isSelect == 1,'xianshi2': $store.state.isSelect == 2,'xianshi3': $store.state.isSelect == 3,'xianshi4': $store.state.isSelect == 4,}"></div>
                            <div class="bar_left">
                                <div class="xianshi_left">1</div>
                            </div>
                            <div class="bar_center">
                                <div :class="{'xianshi_center':$store.state.isSelect >= 2}"></div>
                            </div>
                            <div class="bar_right">
                                <div :class="{'xianshi_right':true,'xianshi_right_select': $store.state.isSelect == 4}">3</div>
                            </div>
                            <div :class="{'center_text':true,'center_text_select':$store.state.isSelect >= 2}">2</div>
                        </div>
                        <div class="bar_text">
                            <div class="text_left">我的购物车</div>
                            <div class="text_center">填写核对订单</div>
                            <div class="text_right">成功提交订单</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cart_nav">
                <el-row>
                    <el-col :span="6"><div :class="{'nav_li grid-content bg-purple':true, 'selected':$store.state.isSelect == 1}" style="margin-left:0px;"><img src="@/assets/images/shopping_cart/gouwuche.png" alt=""><span>购物车</span></div></el-col>
                    <el-col :span="6"><div :class="{'nav_li grid-content bg-purple-light':true, 'selected':$store.state.isSelect == 2}"><img src="@/assets/images/shopping_cart/dizhi.png" alt=""><span>填写地址</span></div></el-col>
                    <el-col :span="6"><div :class="{'nav_li grid-content bg-purple':true, 'selected':$store.state.isSelect == 3}"><img src="@/assets/images/shopping_cart/info.png" alt=""><span>确认信息</span></div></el-col>
                    <el-col :span="6"><div :class="{'nav_li grid-content bg-purple':true, 'selected':$store.state.isSelect == 4}"><img src="@/assets/images/shopping_cart/order.png" alt=""><span>支付订单</span></div></el-col>
                </el-row>
            </div>
            <router-view @changeShoppingcartNum="changeShoppingcartNum"></router-view>
        </div>
    </div>
</template>
<style lang="stylus" scoped>
    @import "~styles/cart_header.styl"
    @import "~styles/varibles.styl"
    .shopping_cart
        padding 39px 0px 0px 0px
        width  1200px
        margin 0 auto
        box-sizing border-box
        background-color #F7FAFF
        .cart_header
            background-color #fff
            padding-bottom 27px
            .header_top
                .text
                    display inline-block
            .header_body
                padding 35px 100px 41px 100px
                position relative
                .bar
                    width 685px
                    height 62px
                    position absolute
                    left 50%
                    top 20px
                    transform translateX(-50%)
                    .bar_tu
                        .bar_left
                            barsty()
                            position absolute
                            left 20px
                            top 0px
                            .xianshi_left
                                xianshi()
                                background-color $btnColor
                        .bar_center
                            barsty()
                            position absolute
                            left 50%
                            transform translateX(-50%)
                            .xianshi_center
                                xianshi()
                                z-index 1
                                background-color #409eff
                        .bar_right
                            barsty()
                            position absolute
                            right 20px
                            .xianshi_right
                                xianshi()
                                color #B6B6B6
                            .xianshi_right_select
                                color #fff
                                background-color #409eff
                        .center_text
                            position absolute
                            left 50%
                            transform translateX(-50%)
                            margin-top 10px
                            color #B6B6B6
                        .center_text_select
                            color #fff
                            z-index 2
                        .xian
                            width 577px
                            height 9px
                            background-color #f0f6fd
                            position absolute
                            top 13px
                            left 54px
                        .xianshi
                            position absolute
                            top 13px
                            left 54px
                            height 3px
                            background-color $btnColor
                            margin-top 3px
                            margin-left -5px
                            z-index 1
                        .xianshi1
                            width 20%
                        .xianshi2
                            width 42%
                        .xianshi3
                            width 65%
                        .xianshi4
                            width 87%

                    .bar_text
                        .text_left
                            position absolute
                            left 0px
                            bottom 0px
                            // color #B6B6B6
                            font-weight:400;
                            font-size 14px
                            color:rgba(64,158,255,1)
                        .text_center
                            position absolute
                            left 50%
                            bottom 0px
                            transform translateX(-50%)
                            color #B6B6B6
                            font-size 14px
                        .text_right
                            position absolute
                            right 0px
                            bottom 0px
                            color #B6B6B6
                            font-size 14px
        .cart_nav
            .nav_li
                background-color #fff
                height  142px
                margin-top 27px
                margin-left 27px
                display flex
                align-items center
                justify-content center
                // &:hover
                //     transform scale(1.05)
                //     transition all 0.5
                span
                    display inline-block
                    font-size 20px
                    color #333333
                    font-family MicrosoftYaHei
            img
                width 58px
                height 58px
                margin-right 10px
        .cart_info
            padding 32px 25px 39px 33px
            background-color #fff

</style>

<script>
// import { getSelect } from '@/store/shopping_cart/getters'
export default {
  name: 'shoppingcart',
  data() {
    return {
      value1: '',
      input: '',
    };
  },
  watch: {
    $route(to) {
      if (to.path === '/') {
        this.$store.commit('tofilladdress', 1);
        sessionStorage.setItem('navigation_bar', 1);
      }
      if (to.path === '/address') {
        this.$store.commit('tofilladdress', 2);
        sessionStorage.setItem('navigation_bar', 2);
      }
      if (to.path === '/confirmInform') {
        this.$store.commit('tofilladdress', 3);
        sessionStorage.setItem('navigation_bar', 3);
      }
      if (to.path === '/failure') {
        this.$store.commit('tofilladdress', 4);
        sessionStorage.setItem('navigation_bar', 4);
      }
    },
  },
  methods: {
    changeShoppingcartNum() {
      this.$emit('changeShoppingcartNum')
    },
    getFilladderss(msg) {
      this.isSelect = msg;
    },
    getConfirm(msg) {

    }
  }
}
</script>

