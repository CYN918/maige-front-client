<template>
  <div class="big_order">
    <div class="order_header">
      <span class="header_bar"></span>
      <div class="header_text">订单中心</div>
    </div>
    <div class="order_nav">
          <div :class="state == 0?'order_nav_item grid-content bg-purple big_div':'order_nav_item grid-content bg-purple'" @click="changeView('myorder',0)">
            <div class="center">
              <img src="@/assets/images/person_center/image/myorder.png" alt="" :class="state == 0?'big_img':''">
              <div class="text">我的订单</div>
            </div>
          </div>
          <div :class="state == 1?'order_nav_item grid-content bg-purple-light big_div':'order_nav_item grid-content bg-purple-light'" @click="changeView('cancelOrder',1)">
            <div class="center">
              <img src="@/assets/images/person_center/image/pingjia.png" alt="">
              <div class="text">评价晒单</div>
            </div>
          </div>
          <div :class="state == 2?'order_nav_item grid-content bg-purple big_div':'order_nav_item grid-content bg-purple'" @click="changeView('evaluation',2)">
            <div class="center">
              <img src="@/assets/images/person_center/image/quxiao.png" alt="">
              <div class="text">已取消订单</div>
            </div>
          </div>
          <!-- <div :class="state == 3?'order_nav_item grid-content bg-purple big_div':'order_nav_item grid-content bg-purple'" @click="changeView('exchange',3)">
            <div class="center">
              <img src="@/assets/images/person_center/image/duihuan.png" alt="">
              <div class="text">我的兑换</div>
            </div>
          </div> -->
          <div :class="state == 4?'order_nav_item grid-content bg-purple-light big_div':'order_nav_item grid-content bg-purple-light'" @click="changeView('service',4)">
            <div class="center">
              <img src="@/assets/images/person_center/image/tuikuan.png" alt="">
              <div class="text">售后服务</div>
            </div>
          </div>
    </div>
    <!-- <div class="order_content">
      <component :is="currentView"></component>
    </div> -->
    <router-view />
  </div>
</template>
<script>
import myorder from './myorder';
import cancelOrder from './cancelOrder/cancelOrder';
import evaluation from './evaluation/evaluation';
import exchange from './exchange/exchange';
import program from './program/program';
import service from './service/service';

export default {
  components: {
    myorder,
    cancelOrder,
    evaluation,
    exchange,
    program,
    service,
  },
  data() {
    return {
      currentView: myorder,
      state: 0,
    };
  },
  methods: {
    changeView(data, index) {
      this.state = index
      this.$router.push({ name: data })
    },
    checkoutRouter() {
      if (this.$route.path === '/orderCenter/myorder') {
        this.state = 0
      }
      if (this.$route.path === '/orderCenter/cancelOrder/cancelOrder') {
        this.state = 1
      }
      if (this.$route.path === '/orderCenter/evaluation') {
        this.state = 2
      }
      if (this.$route.path === '/orderCenter/exchange') {
        this.state = 3
      }
      if (this.$route.path === '/orderCenter/service') {
        this.state = 4
      }
    },
  },
  created() {
    this.checkoutRouter()
  },
  watch: {
    $route(to) {
      console.log(to)
      if (to.path === '/orderCenter/myorder') {
        this.state = 0
      }
      if (to.path === '/orderCenter/cancelOrder/cancelOrder') {
        this.state = 1
      }
      if (to.path === '/orderCenter/evaluation') {
        this.state = 2
      }
      if (to.path === '/orderCenter/exchange') {
        this.state = 3
      }
      if (to.path === '/orderCenter/service') {
        this.state = 4
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
  .big_order
    background-color #f7faff
    .order_header
      height 54px
      background-color #fff
      box-sizing border-box
      padding-top 15px
      margin-left 20px
      margin-bottom 20px
      border 1px solid #d7e0f1
      .header_bar
        height 22px
        width 4px
        background-color #4A99FA
        display inline-block
        vertical-align middle
      .header_text
        display inline-block
        vertical-align middle
        font-size 17px
        color #606060
        margin-left 17px
    .order_nav
      display flex
      margin-left 20px
      /deep/ .el-col-4
        margin-left 18px
        background-color #fff
        width 158px
      /deep/ .el-col-4:nth-of-type(1)
        margin-left 0px !important
      .order_nav_item
        width: 190px;
        margin-right:25px;
        height 87px
        background:rgba(255,255,255,1);
        display flex
        justify-content center
        align-items center
        cursor pointer
        .center
          transition all 0.5s
          &:hover
            transform scale(1)
          img
            display inline-block
            vertical-align middle
            width 39px
            height 32px
          .text
            display inline-block
            vertical-align middle
            font-family Microsoft YaHei
            font-weight 400
            color rgba(51, 51, 51, 1)
.big_div{
  width: 175px;
  height: 96px !important ;
  position relative
  top -9px
  font-size:16px;

}
.big_div>div>div{
  font-family:Microsoft YaHei;
  font-weight:bold !important;
  color:rgba(67,184,254,1) !important;
}
.big_img{
  width 45px
  height 38px
}
</style>
