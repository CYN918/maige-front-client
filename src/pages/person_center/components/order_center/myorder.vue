<template>
  <div>
    <div class="allDiv">
      <span :class="activename==0?'color_blur':''" @click="changeindex(0)">所有订单</span>
      <span :class="activename==1?'color_blur':''" @click="changeindex(1)">待付款</span>
      <span :class="activename==2?'color_blur':''" @click="changeindex(2)">待发货</span>
      <span :class="activename==3?'color_blur':''" @click="changeindex(3)">待收货</span>
      <span :class="activename==5?'color_blur':''" @click="changeindex(5)">已完成</span>
      <span :class="activename==4?'color_blur':''" @click="changeindex(4)">待评价</span>
      <span :class="activename==6?'color_blur':''" @click="changeindex(6)">售后服务</span>
      <!-- <span :class="activename==7?'color_blur':''" @click="changeindex(7)">待处理</span> -->
    </div>
    <div id="myorder">
      <subpages v-if="activename==0" ></subpages>
      <pendingpayment v-if="activename==1"></pendingpayment>
      <generationdelivery v-if="activename==2"></generationdelivery>
      <pendingreceipt v-if="activename==3"></pendingreceipt>
      <comment v-if="activename==4" />
      <completed v-if="activename==5" />
      <aftersale v-if="activename==6"></aftersale>
      <!-- <processed v-if="activename==7"></processed> -->
    </div>
  </div>
</template>

<script>
import subpages from './order/subpages/allorder';
import aftersale from './order/aftersale/allorder';
import comment from './order/comment/allorder';
import completed from './order/completed/allorder';
import generationdelivery from './order/generationdelivery/allorder';
import pendingpayment from './order/pendingpayment/allorder';
import pendingreceipt from './order/pendingreceipt/allorder';
import processed from './order/processed/allorder';

export default {
  components: {
    subpages,
    aftersale,
    comment,
    completed,
    generationdelivery,
    pendingpayment,
    pendingreceipt,
    processed,
  },
  name: 'myorder',
  data() {
    return {
      activename: 0,
      tableData: [],
      requestStatus: 0,
    };
  },
  methods: {
    changeindex(val){
      this.activename = val
      this.$router.push({path:"/orderCenter/myorder",query:{state:val}})
    },
    handleclick(tab, event) {
      console.log(tab, event);
    },
  },
  created(){
    this.activename = parseInt(this.$route.query.state) || 0
  }
};
</script>
<style lang="stylus" scoped>
#myorder {
  background-color: #fff;
  box-sizing: border-box;
  padding: 17px 16px 0px 12px;
  margin-left: 20px;
  border:1px solid rgba(223,231,242,1);

  /deep/ .el-tabs__nav-wrap {
    height: 58px;

    /deep/ .el-tabs__active-bar {
      height: 0px !important;
    }

    /deep/ .el-tabs__item {
      width: 120px !important;
      margin-bottom: 0px !important;
      font-family: microsoft yahei;
      line-height: 58px;
      font-weight: 400;
      font-size: 13px;
      padding-bottom: 10px !important;
      color: #555555 !important;
    }

    /deep/ .is-active {
      color: #409eff !important;
      background-color: transparent !important;

      span {
        font-size: 14px;
        color: #fff;
      }
    }
  }
}

.allDiv {
  background: wihte;
  height: 42px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-family: Microsoft YaHei;
  margin-left: 20px;
  font-weight: 400;
  margin-top:14px
  color: rgba(119, 119, 119, 1);
  span {
    width:91px;
    height:42px;
    cursor: pointer;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .color_blur {
    color: rgba(76, 134, 244, 1);
    width:110px;
    height:42px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(223,231,242,1);
    border-bottom:none;
    display:flex;
    justify-content:center;
    align-items:center;
  }
}
</style>
