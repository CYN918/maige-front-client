<template>
  <div>
    <div class="margin">
      <div class="mcard othertable">
        <el-table :span-method="arraySpanMethod" :data="tableData">
          <el-table-column width="1" align="center"></el-table-column>
          <el-table-column width="300" label="商品信息" align="center">
            <template slot-scope="scope" style="height:132px">
              <div class="information">
                <span class="tent_span">订单编号：99023554455</span>
                <span class="tent_span">下单时间：2019-07-23 11：30：30</span>
                <span class="tent_span">共5件商品</span>
                <span class="tent_span">订单总价：1314点值</span>

              </div>
              <div class="content">
                <img
                  class="content_img"
                  src="https://f10.baidu.com/it/u=2202664904,230612853&fm=72"
                  alt
                />
                <span class="name">Ztajkbdhfsdfhjak hjdshafjdjsfba AhjfsdjbfEhjdf sdhhfdsk</span>
                <span style="width:8.9%;margin-left: 2.5%;text-align: center;">74.58点值</span>
                <span style="width:9.3%;text-align: center;">2</span>
                <div style="width:10.2%;text-align: center;">
                  <div>未申请</div>
                  <el-button type="primary" size="small">申请售后</el-button>
                </div>
                <span style="width:8.9%;text-align: center;">待发货</span>
                <span style="width:10.96%;text-align: center;">16516165151651651</span>
                <span style="width:7.2%;text-align: center;">京东</span>
                <span style="width:11.2%;text-align: center;">待用户付款</span>
                <span style="width:8.2%;text-align: center;">123421343</span>
                <div class="addfocus">
                  <el-button type="text" size="small">添加标记</el-button>
                  <el-button type="text" size="small">查看详情</el-button>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="131" label="销售价" align="center"></el-table-column>
          <el-table-column min-width="127" label="数量" align="center"></el-table-column>
          <el-table-column min-width="127" label="维权状态" align="center"></el-table-column>
          <el-table-column min-width="126" label="物流状态" align="center"></el-table-column>
          <el-table-column min-width="127" label="物流单号" align="center"></el-table-column>
          <el-table-column min-width="126" label="供货方" align="center"></el-table-column>
          <el-table-column min-width="127" label="状态/操作" align="center"></el-table-column>
          <el-table-column min-width="119" label="分销利润" align="center"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.margin {
    padding 23px 43px 20px 22px;
    box-sizing border-box
}
.othertable {
  border:1px solid #D6DEEF
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: auto;
  }
}

.goods-fitter {
  .vender {
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
      padding-left: 10px;
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
    max-width: 240px;
    margin-right: 5px;
  }

  .el-date-picker {
    max-width: 240px;
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

.image {
  cursor: pointer;
}

.item-name {
  cursor: pointer;

  &:hover {
    color: $themeColor;
  }
}

.el-icon-arrow-right {
  margin: 0 20px;
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

.detail {
  font-size: 14px;
  color: #606266;
}

.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: rgba(74, 153, 250, 1);
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.line-div {
  display: flex;
  justify-content: space-around;
}

.fuzhi {
  background: rgba(229, 162, 75, 1);
}

.huishouzhan {
  background: rgba(247, 108, 110, 1);
}

.small_top {
  margin-top: 10px;
}

.addfocus {
  position: absolute;
  top: 8px;
  right: 12px;
}

.information {
  background: rgba(243, 247, 252, 1);
  position: absolute;
  top: -2px;
  width: 100%;
  left: 0px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  display: flex;

  .tent_span {
    margin-right: 24px;
  }

  .tent_span:first-child {
    margin-left: 3%;
  }
}

.content {
  width: 1230px;
  margin-top: 50px;
  padding: 20px;
  text-align: left;
  display: flex;
  align-items: center;

  .content_img {
    width: 60px;
    height: 60px;
    margin-left: 2%;
  }

  .name {
    width: 138px;
    margin-left: 16px;
  }
}

.baoguo {
  width: 100%;
}
</style>
<script>
export default {
  name: "maordertable",
  data() {
    return {
      input: "",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          state: true
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ]
    };
  },
  created() {},
  computed: {},
  methods: {
    orderDetail() {
      this.$router.push({ name: "OrderDetail" });
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 1 === 0) {
        if (columnIndex <= 0) {
          return [1, 1];
        } else {
          return [1, 10];
        }
      }
    }
  }
};
</script>

