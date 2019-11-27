<template>
  <div>
    <div class="allDiv">
      <span :class="activename==0?'color_blur':''" @click="activename = 0">所有订单</span>
      <span :class="activename==1?'color_blur':''" @click="activename = 1">待付款</span>
      <span :class="activename==2?'color_blur':''" @click="activename = 2">待发货</span>
      <span :class="activename==3?'color_blur':''" @click="activename = 3">待收货</span>
      <span :class="activename==4?'color_blur':''" @click="activename = 4">待评价</span>
      <span :class="activename==5?'color_blur':''" @click="activename = 5">已完成</span>
      <span :class="activename==6?'color_blur':''" @click="activename = 6">售后服务</span>
      <span :class="activename==7?'color_blur':''" @click="activename = 7">待处理</span>
    </div>
    <div id="myorder">
      <subpages v-if="activename==0" ></subpages>
      <pendingpayment v-if="activename==1"></pendingpayment>
      <generationdelivery v-if="activename==2"></generationdelivery>
      <pendingreceipt v-if="activename==3"></pendingreceipt>
      <comment v-if="activename==4" />
      <completed v-if="activename==5" />
      <aftersale v-if="activename==6"></aftersale>
      <processed v-if="activename==7"></processed>
      <!-- <el-tabs v-model="activename" @tab-click="handleclick">
            <el-tab-pane label="所有订单" name="first">
                <subpages></subpages>
            </el-tab-pane>
            <el-tab-pane label="待付款" name="second">
                <subpages v-if='name="second"'></subpages>
                 <pendingpayment v-if="name='second'"></pendingpayment>
            </el-tab-pane>
            <el-tab-pane label="待发货" name="third">
                <subpages v-if='name="third"'></subpages>
                <generationdelivery v-if="name='third'"></generationdelivery>
            </el-tab-pane>
            <el-tab-pane label="待收货" name="fourth">
                <pendingreceipt v-if="name='fourth'"></pendingreceipt>
            </el-tab-pane>
            <el-tab-pane label="待评价" name="five">
                <comment v-if="name='five'"/>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="six">
               <completed v-if="name='six'"/>
            </el-tab-pane>
            <el-tab-pane label="售后服务" name="fsfaourth">
                <aftersale v-if="name='fsfaourth'"></aftersale>
            </el-tab-pane>
            <el-tab-pane label="待处理" name="foufrth">
                <processed v-if="name='foufrth'"></processed>
            </el-tab-pane>
      </el-tabs>-->
    </div>
  </div>
</template>
<script>
import subpages from "./order/subpages/allorder";
import aftersale from "./order/aftersale/allorder";
import comment from "./order/comment/allorder";
import completed from "./order/completed/allorder";
import generationdelivery from "./order/generationdelivery/allorder";
import pendingpayment from "./order/pendingpayment/allorder";
import pendingreceipt from "./order/pendingreceipt/allorder";
import processed from "./order/processed/allorder";

export default {
  components: {
    subpages,
    aftersale,
    comment,
    completed,
    generationdelivery,
    pendingpayment,
    pendingreceipt,
    processed
  },
  name: "myorder",
  data() {
    return {
      activename: 0
    };
  },
  methods: {
    handleclick(tab, event) {
      console.log(tab, event);
    }
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
    width:91px;
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