<template>
  <div class="detailContaer">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="费用明细" name="first">
            <ChargeDetail/>
        </el-tab-pane>
        <el-tab-pane label="订单明细" name="second">
            <OrderDetailsfrom/>
        </el-tab-pane>
     </el-tabs>
  </div>
</template>
<script>
import  ChargeDetail from './chargeDetail/chargeDetail'
import  OrderDetailsfrom  from'./orderDetails/orderDetails'
export default {
    components:{
        ChargeDetail,
        OrderDetailsfrom
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang="stylus" scoped>

  
</style>