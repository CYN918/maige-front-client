<template>
  <div class="margin" style="height: 220px;overflow: auto; width: 116%;">
    <div class="mcard">
        <div class="mbottom">
            <div class="goods-fitter">
                <div class="search-wrapper">
                  <h4 class="title">包裹物流信息</h4>
                  <el-table :data="tableData"  border style="width: 100%" :header-cell-style="getRowClass" stripe>
                      <el-table-column  prop="name"  label="单位名称" align="center" width="213"></el-table-column>
                      <el-table-column  prop="name"  label="收件人" align="center"></el-table-column>
                      <el-table-column  prop="name"  label="联系方式" align="center" width="130"></el-table-column>
                      <el-table-column  prop="name"  label="市" align="center"></el-table-column>
                      <el-table-column  prop="name"  label="区县" align="center" ></el-table-column>
                      <el-table-column  prop="name"  label="乡镇" align="center"></el-table-column>
                      <el-table-column  prop="name"  label="详细地址" align="center" width="250"></el-table-column>
                      <el-table-column  prop="name"  label="商品名称" align="center" width="120"></el-table-column>
                      <el-table-column  prop="name"  label="商品货号" align="center" width="120"></el-table-column>
                      <el-table-column  prop="name"  label="sku" align="center"></el-table-column>
                      <el-table-column  prop="name"  label="数量" align="center"></el-table-column>
                  </el-table>
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
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
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
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 20px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
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
