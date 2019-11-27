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
        <div class="package_info">
            <div class="after_buy" style="overflow: auto;">
                <el-tabs type="border-card">
                <el-tab-pane label="包裹">
                    <div class="mbottom">
                    <div class="goods-fitter">
                        <el-form label-width="100px" size="small">
                        <div class="search_wrapper">
                            <div class="search_header">
                            <span class="biao"></span>
                            <h4 class="title">包裹信息</h4>
                            </div>
                            <div class="baoguo">供货方： 物流信息：京东快递 | 20011185421011106</div>
                            <div class="block" style="padding-left:6px">
                            <el-timeline>
                                <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :icon="activity.icon"
                                :type="activity.type"
                                :color="activity.color"
                                :size="activity.size"
                                :timestamp="activity.timestamp"
                                >
                                <span class="green" v-if=" index == 0">{{activity.content}}</span>
                                <span class="greem" v-if=" index != 0">{{activity.content}}</span>
                                </el-timeline-item>
                            </el-timeline>
                            </div>
                        </div>
                        </el-form>
                    </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="售后原因">
                    <div class="after_header">
                    <span class="header_left"></span>
                    <div class="header_right">售后原因</div>
                    </div>
                    <el-table
                    :data="tableData1"
                    style="width: 100%"
                    row-key="id"
                    border
                    :header-cell-style="getRowClass"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                    <el-table-column align="center" width="83" prop="afterbuy" label="售后状态"></el-table-column>
                    <el-table-column align="center" width="130" prop="servicelist" label="售后服务单"></el-table-column>
                    <el-table-column align="center" width="83" prop="kehu" label="客户信息"></el-table-column>
                    <el-table-column align="center" width="83" prop="imga" label="客诉图片"></el-table-column>
                    <el-table-column align="center" width="83" prop="productname" label="产品名称"></el-table-column>
                    <el-table-column align="center" width="170" prop="buytime" label="购买时间"></el-table-column>
                    <el-table-column align="center" width="83" prop="buyadd" label="购买地点"></el-table-column>
                    <el-table-column align="center" width="83" prop="afterw" label="售后原因"></el-table-column>
                    <el-table-column align="center" width="83" prop="kesu" label="客诉要求"></el-table-column>
                    <el-table-column align="center" width="167" prop="bufa" label="补发给客户的物流信息"></el-table-column>
                    <el-table-column align="center" width="60" prop="" label="操作"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="包裹2">
                    <div class="mbottom">
                    <div class="goods-fitter">
                        <el-form label-width="100px" size="small">
                        <div class="search_wrapper">
                            <div class="search_header">
                            <span class="biao"></span>
                            <h4 class="title">包裹信息</h4>
                            </div>
                            <div class="baoguo">供货方： 物流信息：京东快递 | 20011185421011106</div>
                            <div class="block" style="padding-left:6px">
                            <el-timeline>
                                <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :icon="activity.icon"
                                :type="activity.type"
                                :color="activity.color"
                                :size="activity.size"
                                :timestamp="activity.timestamp"
                                >
                                <span class="green" v-if=" index == 0">{{activity.content}}</span>
                                <span class="greem" v-if=" index != 0">{{activity.content}}</span>
                                </el-timeline-item>
                            </el-timeline>
                            </div>
                        </div>
                        </el-form>
                    </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="售后原因">
                    <div class="after_header">
                    <span class="header_left"></span>
                    <div class="header_right">售后原因</div>
                    </div>
                    <el-table
                    :data="tableData1"
                    style="width: 100%"
                    row-key="id"
                    border
                    :header-cell-style="getRowClass"
                    >
                    <el-table-column align="center" width="83" prop="afterbuy" label="售后状态"></el-table-column>
                    <el-table-column align="center" width="130" prop="servicelist" label="售后服务单"></el-table-column>
                    <el-table-column align="center" width="83" prop="kehu" label="客户信息"></el-table-column>
                    <el-table-column align="center" width="83" prop="imga" label="客诉图片"></el-table-column>
                    <el-table-column align="center" width="83" prop="productname" label="产品名称"></el-table-column>
                    <el-table-column align="center" width="170" prop="buytime" label="购买时间"></el-table-column>
                    <el-table-column align="center" width="83" prop="buyadd" label="购买地点"></el-table-column>
                    <el-table-column align="center" width="83" prop="afterw" label="售后原因"></el-table-column>
                    <el-table-column align="center" width="83" prop="kesu" label="客诉要求"></el-table-column>
                    <el-table-column align="center" width="167" prop="bufa" label="补发给客户的物流信息"></el-table-column>
                    <el-table-column align="center" width="60" prop="" label="操作"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="包裹3">
                    <div class="mbottom">
                    <div class="goods-fitter">
                        <el-form label-width="100px" size="small">
                        <div class="search_wrapper">
                            <div class="search_header">
                            <span class="biao"></span>
                            <h4 class="title">包裹信息</h4>
                            </div>
                            <div class="baoguo">供货方： 物流信息：京东快递 | 20011185421011106</div>
                            <div class="block" style="padding-left:6px">
                            <el-timeline>
                                <el-timeline-item
                                v-for="(activity, index) in activities"
                                :key="index"
                                :icon="activity.icon"
                                :type="activity.type"
                                :color="activity.color"
                                :size="activity.size"
                                :timestamp="activity.timestamp"
                                >
                                <span class="green" v-if=" index == 0">{{activity.content}}</span>
                                <span class="greem" v-if=" index != 0">{{activity.content}}</span>
                                </el-timeline-item>
                            </el-timeline>
                            </div>
                        </div>
                        </el-form>
                    </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="售后原因"><div class="after_header">
                    <span class="header_left"></span>
                    <div class="header_right">售后原因</div>
                    </div>
                    <el-table
                    :data="tableData1"
                    style="width: 100%"
                    row-key="id"
                    border
                    :header-cell-style="getRowClass"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    >
                    <el-table-column align="center" width="83" prop="afterbuy" label="售后状态"></el-table-column>
                    <el-table-column align="center" width="130" prop="servicelist" label="售后服务单"></el-table-column>
                    <el-table-column align="center" width="83" prop="kehu" label="客户信息"></el-table-column>
                    <el-table-column align="center" width="83" prop="imga" label="客诉图片"></el-table-column>
                    <el-table-column align="center" width="83" prop="productname" label="产品名称"></el-table-column>
                    <el-table-column align="center" width="170" prop="buytime" label="购买时间"></el-table-column>
                    <el-table-column align="center" width="83" prop="buyadd" label="购买地点"></el-table-column>
                    <el-table-column align="center" width="83" prop="afterw" label="售后原因"></el-table-column>
                    <el-table-column align="center" width="83" prop="kesu" label="客诉要求"></el-table-column>
                    <el-table-column align="center" width="167" prop="bufa" label="补发给客户的物流信息"></el-table-column>
                    <el-table-column align="center" width="60" prop="" label="操作"></el-table-column>
                    </el-table></el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>>
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
<script>
export default {
    name:'package',
    data(){
       return {
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
      activeName: "first",
      tableData1: [
        
        {
          afterbuy:"处理中",
          servicelist:"121535465465",
          kehu:"",
          imga:"",
          productname:"火星英语",
          buytime:'2019-02-02 17:1857',
          buyadd:"火星",
          afterw:'有点无聊',
          kesu:'',
          bufa:'20131541033',
        },
        {
          afterbuy:"处理中",
          servicelist:"121535465465",
          kehu:"",
          imga:"",
          productname:"火星英语",
          buytime:'2019-02-02 17:1857',
          buyadd:"火星",
          afterw:'有点无聊',
          kesu:'',
          bufa:'20131541033',
        },
        {
          afterbuy:"处理中",
          servicelist:"121535465465",
          kehu:"",
          imga:"",
          productname:"火星英语",
          buytime:'2019-02-02 17:1857',
          buyadd:"火星",
          afterw:'有点无聊',
          kesu:'',
          bufa:'20131541033',
        },
        {
          afterbuy:"处理中",
          servicelist:"121535465465",
          kehu:"",
          imga:"",
          productname:"火星英语",
          buytime:'2019-02-02 17:1857',
          buyadd:"火星",
          afterw:'有点无聊',
          kesu:'',
          bufa:'20131541033',
        }
      ]
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
</script>>