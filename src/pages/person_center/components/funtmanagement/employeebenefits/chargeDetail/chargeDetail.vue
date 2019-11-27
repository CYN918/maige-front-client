<template>
    <div class="chargeDetailContener">
       <el-table :data="tableData"  border style="width: 100%"  class="chargeDetail" :header-cell-style="getRowClass">
        <el-table-column  prop="date" label="日期" width="180" align="center">
        </el-table-column>
        <el-table-column  prop="administrator" label="上级管理员" width="180" align="center">
        </el-table-column>
        <el-table-column prop="recharge" label="充值" width="180" align="center">
        </el-table-column>
        <el-table-column  prop="expenditure" label="支出" width="175" align="center">
        </el-table-column>
        <el-table-column  prop="orderPhone" label="订单号" width="180" align="center">
        </el-table-column>
        <el-table-column prop="balance" label="余额" width="180" align="center">
        </el-table-column>
        </el-table>
				<!-- 分页 -->
				<div class="block">
				<el-pagination
					background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
  </div>
    </div>
</template>
<script>
export default {
		name:'ChargeDetail',
    data(){
        return{
					currentPage1: 1,
            tableData: [{
                date: '2019-08-15',
                administrator: '1172585514',
                recharge: '+5000',
                expenditure:'-100',
                orderPhone:"1172585514",
                balance:'900'
        },
        {
                date: '2019-08-15',
                administrator: '1172585514',
                recharge: '+5000',
                expenditure:'-100',
                orderPhone:"1172585514",
                balance:'900'
        },
        {
                date: '2019-08-15',
                administrator: '1172585514',
                recharge: '+5000',
                expenditure:'-100',
                orderPhone:"1172585514",
                balance:'900'
        },
        {
                date: '2019-08-15',
                administrator: '1172585514',
                recharge: '+5000',
                expenditure:'-100',
                orderPhone:"1172585514",
                balance:'900'
        },
        {
                date: '2019-08-15',
                administrator: '1172585514',
                recharge: '+5000',
                expenditure:'-100',
                orderPhone:"1172585514",
                balance:'900'
        },
        ]
        }
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
		}
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