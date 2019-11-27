<template>
  <div class="margin">
    <div class="mcard">
        <div class="mbottom">
            <div class="goods-fitter">
                <div class="search-wrapper" id="search-wrap">
                  <span style="display:inline-block;width:5px;height:20px;background:#4A99FA;vertical-align:middle;margin-left:-21px;"></span>
                  <h4 class="title">包裹物流信息</h4>
                  11111111
                  <!-- <el-table :data="tableData"  border style="width: 100%;" :header-cell-style="getRowClass" stripe>
                      <el-table-column height="50" width="272"  prop="gongsi"  label="单位名称" align="center"></el-table-column>
                      <el-table-column width="70"  prop="name"  label="收件人" align="center"></el-table-column>
                      <el-table-column width="70" prop="city"  label="市" align="center"></el-table-column>
                      <el-table-column width="70" prop="xian"  label="区县" align="center" ></el-table-column>
                      <el-table-column width="70" prop="zhen"  label="乡镇" align="center"></el-table-column>
                      <el-table-column width="200" prop="address"  label="详细地址" align="center"></el-table-column>
                      <el-table-column prop="dianhua"  label="电话" align="center"></el-table-column>
                      <el-table-column  prop="phone"  label="手机" align="center"></el-table-column>
                  </el-table> -->
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
    data () {
    return {
      tableData:[
          {
          name: '王小虎',
          gongsi:'云南心愿彩色印务有限公司',
          city:'昆明市',
          xian:'番禺区',
          zhen:'南村镇',
          address: '金沙江路 1518 弄',
          dianhua:'0663-123456',
          phone:'135123243253',
        }, 
        {
          name: '王小虎',
          gongsi:'云南心愿彩色印务有限公司',
          city:'昆明市',
          xian:'番禺区',
          zhen:'南村镇',
          address: '金沙江路 1518 弄',
          dianhua:'0663-123456',
          phone:'135123243253'
        }, 
      ],
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
       handleClick(tab, event) {
        console.log(tab, event);
      },
      getRowClass ({ row, column, rowIndex, columnIndex }) {
          if (rowIndex === 0) {
              return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;border-left:1px solid #e7edf5;text-align:center;'
          } else {
              return ''
          }
      },
      
  },
  components: {
  }
}
</script>

<style lang="stylus" scoped>
.mbottom{
  padding: 12px;
  background-color: #f7faff;
}
.goods-fitter {
  
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      display:inline-block;
      margin-left: -9px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 20px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    /deep/ .el-table__row{
      height:50px;
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
//滚动条宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar 
      width: 8px; // 横向滚动条
      height: 8px; // 纵向滚动条 必写
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb
  background-color #4C86F4
  border-radius 3px
</style>
