<template>
    <div class="chargeDetailContener">
       <el-table :data="list"  border style="width: 100%"  class="chargeDetail" :header-cell-style="getRowClass">
        <el-table-column  prop="tradingTime" label="日期" width="180" align="center">
        </el-table-column>
        <el-table-column  prop="administrator" label="上级管理员" width="180" align="center">
        </el-table-column>
        <el-table-column prop="balanceChange" label="充值" width="180" align="center">
        </el-table-column>
        <el-table-column  prop="useBalance" label="支出" width="175" align="center">
        </el-table-column>
        <el-table-column  prop="orderSn" label="订单号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="180" align="center">
        </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="form.sizes"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total">
        </el-pagination>
  </div>
    </div>
</template>
<script>
export default {
    name:'ChargeDetail',
    props: ['list'],
    data(){
        return{
            form: {
                accountId: '',
                balanceType: '',
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
	    currentPage1: 1,
            tableData: [],
            
        }
   },
   created() {
	
    },

    methods:{
	//分页器
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
                //给第一行添加背景色
        getRowClass({ row, column, rowIndex, columnIndex }) {
                if (rowIndex == 0) {
                        return 'background:#F7FAFF'
                } else {
                        return ''
                }
         },
         
       
 }
}
</script>
<style lang="stylus" scoped>
	.chargeDetail
		color rgba(147, 147, 153, 1)
		font-size 14px
	.block
		float right
		margin-top 95px
</style>