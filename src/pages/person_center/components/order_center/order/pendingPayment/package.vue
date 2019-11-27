<template>
    <div>
        <div class="package_logistics">
            <div class="header">
                <span></span>
                <div class="title">多地址包裹物流信息</div>
            </div>
            <div class="body" >
                <el-table
                :data="tableData"
                max-height="250"
                border
                :header-cell-style="getRowClass"
                style="width: 100%">
                <el-table-column align="center" type="selection" width="55"> </el-table-column>
                <el-table-column style="color:red;" align="center" prop="gonsi" label="单位名称" width="213">
                    <template slot-scope="scope">
                    <input v-model="scope.row.gonsi">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="name" label="收件人" width="80">
                    <template slot-scope="scope">
                    <input v-model="scope.row.name">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="dianhua" label="电话" width="130">
                    <template slot-scope="scope">
                    <input v-model="scope.row.dianhua">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="phone" label="手机" width="130">
                    <template slot-scope="scope">
                    <input v-model="scope.row.phone">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="sheng" label="省" width="80">
                    <template slot-scope="scope">
                    <input v-model="scope.row.sheng">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="city" label="市" width="80">
                    <template slot-scope="scope">
                    <input v-model="scope.row.city">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="xian" label="区县" width="80">
                    <template slot-scope="scope">
                    <input v-model="scope.row.xian">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="zhen" label="乡县" width="80">
                    <template slot-scope="scope">
                    <input v-model="scope.row.zhen">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="详细地址" width="223">
                    <template slot-scope="scope">
                    <input v-model="scope.row.address">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="address" label="商品名称" width="120">
                    <template slot-scope="scope">
                    <input v-model="scope.row.address">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="no" label="商品货号" width="160">
                    <template slot-scope="scope">
                    <input v-model="scope.row.no">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="no" label="SKU" width="130">
                    <template slot-scope="scope">
                    <input v-model="scope.row.no">
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="number" label="商品数量">
                    <template slot-scope="scope">
                    <input v-model="scope.row.number">
                    </template>
                </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 包裹信息 -->
    <div class="package" v-if="tableData6.length">
      <div class="top_span">
        <span v-for="(item,index) in tableData6" :key="index" :class="num==index?'parcel cheked':'parcel'"
              @click="parcel(index)">包裹{{index+1}}</span>
      </div>
      <div class="addreesContiner">
        <div class="orderdetails11">包裹信息</div>
        <div class="backMessge">
          <span class="people">供货方： {{tableData6[num].supplierName}}</span>
          <span>物流信息：{{tableData6[num].shippingName}} | {{tableData6[num].logisticsNo}}</span>
        </div>
        <div class="addrees" style="padding-left:30px;padding-top:21px">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in tableData6[num].logisticsInfoList"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.ftime"
              style="height:77px"
            >
              <span v-if=" index == 0">{{activity.context}}</span>
              <span v-if=" index != 0">{{activity.context}}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
    </div>
</template>
<script>
import { orderDetails } from '@/api/index';
export default {
    name:'package',
    data(){
       return {
        num: 0, // 展示不同的包裹信息
        tableData: [{
          gonsi: '云南心愿彩色印务有限公司',
          name: '王小虎',
          sheng:'云南',
          city:"昆明",
          xian:"番禺区",
          zhen:'南村镇',
          address:'南村村东兴工业区',
          dianhua:'0663-134324',
          phone:'13412324234',
          no:'42543345345451',
          number:'234'
        }],
        activities: [
        {
          content: "派送中 （派送员：僵小鱼  联系电话：12345678911）",
          timestamp: "2018-04-07 20:46",
          color: "#4A99FA",
          size: "large"
        },
        {
          content: "已到达广州总部  等待派送",
          timestamp: "2018-04-06 20:46",
          size: "large"
        },
        {
          content: "深圳市顺丰快递有限公司已收件",
          timestamp: "2018-04-05 20:46",
          size: "large"
        },
        {
          content: "已发货",
          timestamp: "2018-04-04 22:46",
          size: "large"
        }
      ],
      tableData1: []
      }
    },
    methods:{
        getRowClass ({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;'
            } else {
                return ''
            }
        },
    }
}
</script>
<style lang="stylus" scoped>
    .package_logistics
        background-color #fff
        text-align left
        border:1px solid rgba(215,225,241,1);
        .header
            padding-top 17px
            &>span 
                width 5px
                height 20px
                background-color #4C86F4
                display inline-block
                vertical-align middle
            .title
                display inline-block
                vertical-align middle
                font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(51,51,51,1);
                margin-left:11px;
        .body
            padding 15px
            /deep/ .el-table__body-wrapper{
                 overflow auto !important
            }
            /deep/ .el-table__body-wrapper::-webkit-scrollbar 
                width: 8px; // 横向滚动条
                height: 8px; // 纵向滚动条 必写
            /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb
                background-color #4C86F4
                border-radius 3px
            /deep/ .el-table__row
                height:50px;
    .package_info
        margin-top 26px
        .after_buy {
            margin: 20px 14px 0px 14px;
            /deep/ .el-tabs__content{
                text-align:left;
            }
            /deep/ .el-tabs__nav-wrap {
                height:48px !important;
            }
            .search_wrapper {
                .search_header {
                box-sizing: border-box;
                line-height: normal;
                .biao {
                    display: inline-block;
                    width: 5px;
                    height: 27px;
                    background-color: #4A99FA;
                    margin-left: -15px;
                    vertical-align: middle;
                }

                .title {
                    vertical-align: middle;
                    display: inline-block;
                    box-sizing: border-box;
                    font-size: 16px;
                    padding-left: 26px;
                    font-family: MicrosoftYaHei;
                    color: #333;
                }
                }

                .baoguo {
                height: 38px;
                background-color: #F3F7FC;
                line-height: 38px;
                padding-left: 20px;
                margin-top: 10px;
                margin-bottom: 21px;
                }

  }
} 
</style>