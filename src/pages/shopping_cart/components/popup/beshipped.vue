<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="orderList"
            tooltip-effect="dark"
            style="width: 100%"
            :header-cell-style="getRowClass">
            <el-table-column :resizable="false" label="商品名称" width="300">
                <template slot-scope="scope">
                  <a :href="`product_details.html?goodsId=${scope.row.goodsId}`" target="_blank">
                    <div class="img">
                      <img :src="scope.row.thumbnailImgUrl" alt="">
                      <div style="display:inline-block;max-width:147px;vertical-align:middle;" class="text"><span style="color:#333;font-size:14px;font-family:MicrosoftYaHei;">{{scope.row.goodsName}}</span></div>
                    </div>
                  </a>
                </template>
            </el-table-column>
            <el-table-column :resizable="false" width="110" align="center" prop="goodsAttr" label="规格"> </el-table-column>
            <el-table-column :resizable="false" width="110" align="center" prop="goodsPrice" label="商城价"> </el-table-column>
            <el-table-column :resizable="false" width="130" align="center" prop="quantity" label="数量" show-overflow-tooltip>
            </el-table-column>
            <el-table-column :resizable="false" width="110" align="center" prop="specialPrice" label="结算价" show-overflow-tooltip></el-table-column>
            <el-table-column :resizable="false" width="120" align="center" label="合计">
              <template slot-scope="scope">
                {{scope.row.goodsAmount}}
              </template>
            </el-table-column>
            <el-table-column :resizable="false" align="center" label="状态/操作">
                <template slot-scope="scope">
                  <a :href="`product_details.html?goodsId=${scope.row.goodsId}`" target="_blank">
                    <el-button style="color:#939399;padding:0px 15px;" type="text" size="mini">查看详情</el-button>
                  </a>
                    <br>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="stylus" scoped>
    @import "~styles/cart_header.styl"
    .img
        display flex
        align-items center
        justify-content c
        margin-right 24px
        img
            width 60px
            height 60px
            margin-left 24px
            margin-right 20px
    .computed
        .reduce,.add
            border 1px  solid #DFE7F2
            display inline-block
            width 17px
            height 17px
            text-align center
            line-height 16px
            color #939399
            cursor pointer
        .text
            color #939399
            font-size 14px
            font-family MicrosoftYaHei
            margin 0px 10px
</style>
<script>
export default {
  name: 'beshipped',
  props: {
    orderList: Array,
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;border-left:1px solid #e7edf5;text-align:center;';
      } else {
        return '';
      }
    }
  },
}
</script>
