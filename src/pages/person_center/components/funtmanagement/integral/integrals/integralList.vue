<template>
    <div class="integralist">
         <el-table :data="tableData" border style="width: 100% font-size:14px 	margin-top:20px">
            <el-table-column prop="date" label="积分类型" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column prop="name" label="发放金额" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="address" label="余额" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="issueTime" label="发放时间" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="effectiveTime" label="生效时间" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="maturityTime" label="到期时间" width="148" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="Remarks" label="备注" width="147" align="center" stripe>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'integralList',
    data() {
        return {
            tableData: [
                {
									date: '登录注册',
									name: '100',
									address: '1000',
									issueTime:'2019-8-15',
									effectiveTime:'2019-8-15',
									maturityTime:'2019-8-15',
									Remarks:'已到期'
                },
            {
            date: '登录注册',
            name: '100',
            address: '1000',
            issueTime:'2019-8-15',
            effectiveTime:'2019-8-15',
            maturityTime:'2019-8-15',
            Remarks:'已生效'
            },
            ]
        }
	}
}
</script>
<style lang="stylus" scoped>
.integralist
	box-sizing border-box
	padding 20px 20px  0 20px
	background white

</style>