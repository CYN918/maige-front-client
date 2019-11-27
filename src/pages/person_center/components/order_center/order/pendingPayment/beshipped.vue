<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
        </el-form>
      </div>
    </div>
   <div class="mcard othertable">
      <el-table :data="tableData"  border :header-cell-style="getRowClass" ref="table">
        <el-table-column
        type="selection"
        width="55">
      </el-table-column>
        <el-table-column type="expand" width="1">
          <template slot-scope="props">
            <Account-aftermarket></Account-aftermarket>
          </template>
        </el-table-column>
        <el-table-column  label="商品详情" align="center" width='240'>
            <template slot-scope="scope" style="height:800px">
                <div class="information">
                  <span class="tent_span">订单编号：99023554455</span>
                  <span class="tent_span">下单时间：2019-07-23 11：30：30 </span>
                  <span class="addfocus">
                      <el-button type="primary" size="small" style="background:#4C86F4;" >查看详情</el-button>
                      <el-button type="primary" size="small" style="background:#4C86F4;" @click="handleCheck(scope.row)">查看地址</el-button>
                  </span>
                </div>
                <div class="content">
                  <img class="content_img" style="vertical-align:middle;" src="@/assets/images/person_center/image/goods.png" alt="">
                  <span class='name'>Ztajkbdhfsdfhjak hjdshafjdjsfba AhjfsdjbfEhjdf sdhhfdsk</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column   label="SKU" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">多规格</span>
          </template>
        </el-table-column>
        <el-table-column  label="商城价" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">56</span>
          </template>
        </el-table-column>
        <el-table-column   label="数量" align="center" >
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">80</span>
          </template>
        </el-table-column>
        <el-table-column  label="结算价" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">50</span>
          </template>
        </el-table-column>        
        <el-table-column   label="合计" align="center" >
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">4000</span>
          </template>
        </el-table-column>
        <el-table-column   label="支付方式" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">微信支付</span>
          </template>
        </el-table-column>
        <el-table-column   label="状态/操作" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">待支付</span>
          </template>
        </el-table-column>
        <el-table-column  label="用户账号" align="center">
          <template slot-scope="scope">
            <span style="display:inline-block;margin-top:56px;">12265555</span>
          </template>  
        </el-table-column>
    </el-table>
    </div>
  </div>
</template>

<script>
import AccountAftermarket from './aftermarket'
export default {
  data () {
    return {
      show:true,
      orderMarking: false, //添加标记
      centerDialogVisible: false, //包裹弹窗
      input: '',
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          state:true
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          state:true
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    handleCheck(row) {
        const $table = this.$refs.table
        $table.toggleRowExpansion(row)
        $table.toggleRowSelection(row)
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      //设置表头样式
      getRowClass ({ row, column, rowIndex, columnIndex }) {
          if (rowIndex === 0) {
              return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;border-left:1px solid #e7edf5;text-align:center;'
          } else {
              return ''
          }
          if (columnIndex === 0) {
              return 'display:none;'
          }
          
      },
      //点击查看地址
      handleCheck(row) {
        const $table = this.$refs.table
        $table.toggleRowExpansion(row)
        $table.toggleRowSelection(row)
      }
  },
  components: {
    AccountAftermarket,
  }
}
</script>

<style lang="stylus" scoped>
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}

.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}

.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.detail{
    font-size: 14px;
    color: #606266;
}
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
   .small_top{
    margin-top: 10px;
  }
  .addfocus{
    position: absolute;
    margin-left: 892px;
  }
  .content{
    width: 100%;
    margin-top: 56px;
    padding: 20px;
    text-align: left;
    align-items: center;
    .content_img{
      width: 60px;
      height: 60px;
      margin-left: 2%
    }
    .name{
      width: 95px;
      margin-left: 16px;
      display:inline-block;
      vertical-align:middle;
    }
  }
  .filter{
    color:rgba(1,1,1,0)
  }
  .information{
    position: absolute;
    width: 700%;
    background: #f3f7fc;
    z-index: 10;
    top: -2px;
    left: 0px;
    height: 56px;
    line-height: 56px;
    text-align: left;
    display: flex;
    .tent_span{
      margin-right: 10px;
    }
    .tent_span:first-child{
      margin-left: 1%;
    }
  }
  .btn_right{
    padding-left:10px
  }
  .el-table__expanded-cell{
    left:-111px;
    top:-37px;
    border:none
    
  }
  .el-table__expand-column .cell {
  display: none;
}
/deep/ .el-table__expand-column .cell {
  display: none;
}
</style>
