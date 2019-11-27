<template>
    <div class="integralrecoRding">
         <el-table :data="tableData" border style="width:1027px font-size:14px">
            <el-table-column prop="date" label="积分类型" width="208" align="center" stripe>
            </el-table-column>
            <el-table-column prop="name" label="交易类型" width="208" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="address" label="交易时间" width="207" align="center" stripe>
            </el-table-column>
            <el-table-column  prop="issueTime" label="交易金额" width="206" align="center" stripe> 
            </el-table-column>
            <el-table-column  prop="effectiveTime" label="描述" width="206" align="center" stripe>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    name:'integralrecoRding',
    data() {
        return {
            tableData: [
                {
									date: '登录注册',
									name: '积分兑换',
									address: '2019-8-15',
									issueTime:'100',
									effectiveTime:'完成',
								},
								 {
									date: '登录注册',
									name: '积分兑换',
									address: '2019-8-15',
									issueTime:'100',
									effectiveTime:'完成',
                },
            ]
        }
	}
}
</script>
<style lang="stylus" scoped>
.integralrecoRding
	box-sizing border-box
	padding 20px 20px  0 20px
	background white
</style>