<template>
  <div class="big_div">
      <div class="person_main">
      <div class="el-tabs__header">
        <router-link to="/">
          <span id="tab-0" class="el-tabs__item unselectable" :class="{'is-active': index === 0}" data-index="0">我的主页</span>
        </router-link>
        <router-link to="/orderCenter/myorder">
          <span id="tab-1" class="el-tabs__item unselectable" :class="{'is-active': index === 1}" data-index="1">订单中心</span>
        </router-link>
        <router-link to="/management">
          <span id="tab-2" class="el-tabs__item unselectable" :class="{'is-active': index === 2}" data-index="2">资金管理</span>
        </router-link>
        <router-link to="/makeup">
          <span id="tab-3" class="el-tabs__item unselectable" :class="{'is-active': index === 3}" data-index="3">设置</span>
        </router-link>
      </div>
      <div class="el-tabs__content">
        <!-- <keep-alive> -->
          <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .person_main
    display flex
    width 1500px
    margin 0 auto
    background-color #f7faff
    overflow hidden
    padding-top: 39px;
    .el-tabs__header
      width 104px
      background white
      flex-shrink 0
      display flex
      flex-direction column
    .el-tabs__content
      width 100%
    .el-tabs__item
      box-sizing border-box
      height 48px
      line-height 48px
      font-size 14px;
      width 115px
      font-family Microsoft YaHei;
      font-weight 400;
      color rgba(85,85,85,1);
    .is-active
      background rgba(76,134,244,1);
      color rgba(255,255,255,1);
  .big_div{
    background:rgba(247,250,255,1);
  }
</style>
<script>

export default {
  data() {
    return {
      tabPosition: 'left',
      index: 0,
    };
  },
  created() {
    this.checkoutRouter()
  },
  methods: {
    checkoutRouter() {
      if (this.$route.path === '/') {
        this.index = 0
      }
      if (this.$route.path.substring(0, 12) === '/orderCenter') {
        this.index = 1
      }
      if (this.$route.path === '/management') {
        this.index = 2
      }
      if (this.$route.path === '/makeup') {
        this.index = 3
      }
    },
  },
  watch: {
    $route(to) {
      if (to.path === '/') {
        this.index = 0
      }
      if (to.path === '/orderCenter/myorder') {
        this.index = 1
      }
      if (to.path === '/management') {
        this.index = 2
      }
      if (to.path === '/makeup') {
        this.index = 3
      }
    },
  },
};
</script>
