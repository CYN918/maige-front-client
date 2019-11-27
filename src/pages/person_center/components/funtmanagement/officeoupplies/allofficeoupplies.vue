<template>
  <div class="detail"> 
    <el-tabs v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="费用明细" name="first">
            <ChargeDetail :list="list"/>
        </el-tab-pane>
        <el-tab-pane label="订单明细" name="second">
            <OrderDetailsfrom :list="list"/>
        </el-tab-pane>
     </el-tabs>
  </div>
</template>
<script>
import { getCookie } from '@/assets/utils/utils'
import { personalcenter} from '@/api/index';
import  ChargeDetail from './chargeDetail/chargeDetail'
import  OrderDetailsfrom  from'./orderDetails/orderDetails'
export default {
    props: ['list'],
    components:{
        ChargeDetail,
        OrderDetailsfrom
    },
    data() {
      return {
        activeName: 'first',
        
      };
    },
    created() {
        
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      
    }
  };
</script>
<style lang="stylus" scoped >

</style>