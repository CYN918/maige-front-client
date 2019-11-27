<template>
  <div>
    <div class="mcard" id="myorder">
      <div class="allorder">
        <el-table :data="tableData" border stripe @row-click="aftergoodslistc">
          <el-table-column type="index" width="55" align="center" label="序号" :resizable="false"></el-table-column>
          <el-table-column :resizable="false" label="状态" align="center" width="80">
            <template slot-scope="scope">处理中</template>
          </el-table-column>
          <el-table-column label="客诉人信息" align="center">
            <template slot-scope="scope">
              <div class="txt_left">客诉联系人：{{scope.row.applierName}}</div>
              <div class="txt_left">客诉联系电话：{{scope.row.applierPhone}}</div>
              <div class="txt_left">地址：{{scope.row.applierAddress}}</div>
              <div class="txt_left">物流公司：{{scope.row.returnShipping?scope.row.returnShipping:'暂无信息'}}</div>
              <div class="txt_left">物流单号：{{scope.row.returnLogisticNo?scope.row.returnLogisticNo:"暂无信息"}}</div>
            </template>
          </el-table-column>
          <el-table-column label="订单信息" align="center" width="150">
            <template slot-scope="scope">
              <div class="txt_left">订单号：{{scope.row.saleSn}}</div>
              <div class="txt_left">售后单号：{{scope.row.afterSaleSn}}</div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="故障描述" align="center" width="150">
            <template slot-scope="scope">
              <div class="txt_left">内容：{{scope.row.questionDesc}}</div>
              <div class="txt_left" v-if="scope.row.showPic == 1">
                <el-button type="primary" size="small" @click.stop="attachment(scope.row)">查看附件</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="售后/要求" align="center" width="130">
            <template slot-scope="scope">{{scope.row.returnTypeName}}</template>
          </el-table-column>
          <el-table-column label="处理方法" align="center" width="130">
            <template slot-scope="scope">{{scope.row.customerRequire}}</template>
          </el-table-column>
          <el-table-column label="处理结果" align="center" width="130">
            <template slot-scope="scope">{{scope.row.solveResult}}</template>
          </el-table-column>
          <el-table-column :resizable="false" label="进度说明" align="center" width="130">
            <template slot-scope="scope">
              <div class="txt_left">申请人：{{scope.row.createrName}}</div>
              <div class="txt_left">
                <el-button type="primary" size="small" @click.stop="approvalsFunc(scope.row)">查看进度表</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="操作" align="center" width="170">
            <template slot-scope="scope">
              <div ref="operar">
                <div class="small-Idiv" @click.stop="aftersales(scope.row,true)">
                  <div class="i-div huishouzhan">
                    <img src="@/assets/images/person_center/查看详情.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;margin-left:4px;">查看</span>
                </div>
                <div
                  class="small-Idiv"
                  @click.stop="deliverybtn(scope.row)"
                  v-if="(scope.row.returnType == 0 || scope.row.returnType == 1 || scope.row.returnType == 2) && scope.row.checkAfterStatus==1 && scope.row.returnLogisticNo ==null "
                >
                  <div class="i-div">
                    <img src="@/assets/images/person_center/丢件补寄.png" alt class="operation_img" />
                  </div>
                  <span>寄回</span>
                </div>
                <!-- <div class="small-Idiv" @click="deliverybtn(scope.row)" v-if="scope.row.returnType==7">
                  <div class="i-div">
                    <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span>补货</span>
                </div>-->
                <div
                  class="small-Idiv"
                  @click.stop="upgradefunc(scope.row)"
                  v-if="scope.row.agencyStatus == 1 || scope.row.agencyStatus  == 2 || scope.row.agencyStatus  == 3"
                >
                  <div class="i-div">
                    <img src="@/assets/images/person_center/升级客诉.png" alt class="operation_img" />
                  </div>
                  <span>升级客诉</span>
                </div>
                <div
                  class="small-Idiv"
                  @click.stop="cancelsales(scope.row)"
                 v-if="scope.row.agencyStatus === 1 || scope.row.agencyStatus === 2 || scope.row.agencyStatus === 3 "
                >
                  <div class="i-div">
                    <img src="@/assets/images/person_center/取消售后.png" alt class="operation_img" />
                  </div>
                  <span>取消售后</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="paging clearfix">
        <div class="block" style="float:right; color:#606266;padding:12px 10px 20px 0px;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="form.pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <span class="goodsdetail">商品明细</span>
    <div class="mcard" id="myorder">
      <div class="allorder">
        <el-table :data="tableData2" border ref="table" stripe>
          <el-table-column type="index" width="50" align="center" label="序号"></el-table-column>
          <el-table-column label="图样" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.thumbnailImgUrl" alt class="img_size" />
            </template>
          </el-table-column>
          <el-table-column label="商品信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
              <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
              <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
              <div class="txt_left">SKU：{{scope.row.goodsAttr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="规格尺寸" align="center">
            <template slot-scope="scope">
              <div class="txt_left">SKU：{{scope.row.goodsAttr}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="complainQuantity"></el-table-column>
          <el-table-column label="结算价" align="center" prop="specialPrice"></el-table-column>
          <el-table-column label="运费" align="center" prop="firstShippingFee"></el-table-column>
          <el-table-column label="物流信息" align="center">
            <template slot-scope="scope">
            <div class="txt_left">快递公司：{{scope.row.shippingName?scope.row.shippingName:'暂无信息'}}</div>
              <div class="txt_left">快递单号：{{scope.row.logisticsNo?scope.row.logisticsNo:'暂无信息'}}</div>
              <div class="txt_left">地址：{{scope.row.applierAddress}}</div>
              <el-button
                v-if="scope.row.complainId && scope.row.logisticsNo"
                type="primary"
                size="small"
                @click="informafunc(scope.row)"
                style="margin-bottom:6px"
              >物流信息</el-button>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <div class="mbottom">
                <div class="search-wrapper">
                  <h4 class="title">包裹信息</h4>
                  <div
                    class="baoguo11"
                  > 物流信息：{{logistics.shippingName}} | {{logistics.logisticsNo}}</div>
                  <div
                    class="block"
                    style="padding-left:6px;margin-top:20px;"
                    v-if="activities.length"
                  >
                    <el-timeline>
                      <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :icon="activity.icon"
                        :type="activity.type"
                        :color="activity.color"
                        :size="activity.size"
                        :timestamp="activity.time"
                      >
                        <span class="green" v-if="activities.length-1">{{activity.context}}</span>
                        <span class="greem" v-if="index != 0">{{activity.context}}</span>
                      </el-timeline-item>
                    </el-timeline>
                  </div>
                  <div
                    class="block"
                    style="padding-left:6px;margin-top:20px;"
                    v-if="!activities.length"
                  >暂无物流信息</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="操作" align="center" width="150">
            <template slot-scope="scope">
              <div class="line-div small_top" style="padding-bottom: 0">
                <div
                  class="small-Idiv"
                  @click="productfunc(scope.row)"
                  v-if="checkobj.checkAfterStatus == 1 && ( checkobj.returnType == 1 || checkobj.returnType == 2 || checkobj.returnType == 3 || checkobj.returnType == 4 || checkobj.returnType == 5) "
                >
                  <div class="i-div">
                    <img src="@/assets/images/person_center/编辑.png" alt class="operation_img" />
                  </div>
                  <span>签收退件</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="deliverybtn(scope.row)"
                 v-if="checkobj.checkAfterStatus == 1 && ( checkobj.returnType == 1 || checkobj.returnType == 2 || checkobj.returnType == 3 || checkobj.returnType == 4 || checkobj.returnType == 5) && (checkobj.receiveUserTime === '' || checkobj.receiveUserTime === null) && checkobj.logisticsNo != '' && checkobj.logisticsNo != null" 
                >
                  <div class="i-div">
                    <img src="@/assets/images/person_center/编辑.png" alt class="operation_img" />
                  </div>
                  <span>发货</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="取消售后" :visible.sync="cancelsalesshow" width="30%">
      <span>是否确认取消</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancelsalesshow = false" size="small">取 消</el-button>
        <el-button type="primary" @click="cancelsales('',true)" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看附件 -->
    <el-dialog title="查看附件" :visible.sync="attachmentstate" width="668px">
      <div class="bigDiv" v-if="imgArr.length">
        <div class="imgDiv" v-for="(item,index) in imgArr" :key="index"   @click="imgClick(item)">
          <img :src="item" alt="" style="width: 134px; height: 134px">
        </div>
      </div>
      <div v-if="!imgArr.length">暂无附件</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="attachmentstate = false" size="small">关闭</el-button>
      </span>
    </el-dialog>
    <!-- <audit-popup :diaauditlog="centerDialogVisible" :storedata="storedata" @closeaudit="audit"></audit-popup> -->
    <shipped-dialog
      :dialog="dialogVisible"
      :passdata="passdata"
      @closediv="changedia"
      :viewstate="view"
    ></shipped-dialog>
    <approvals :dialog="approvalsShow" :progressdata="progressdata" @closeapproval="changeapproval"></approvals>
    <!-- <logistics :logisticshow="logisticshow" @closelogistics="logisticsfunc"></logistics>
    <refundshow :refundshow="refundshow" @closerefund="refundfunc" :refunddata="refunddata"></refundshow>
    <refundaduit :refunaudit="refunaudit" @closereaudit="reauditfunc" :readuitdata="readuitdata"></refundaduit>
    <refundsure
      :refundsureshow="refundsureshow"
      @closeresure="refundsure"
      :refundsuredata="refundsuredata"
    ></refundsure>
    <product :productshow="productshow" @closeproduct="productfunc" :productdata="productdata"></product> -->
    <delivery :deliveryshow="deliveryshow" :storedata="deliverydata" @closedelivery="deliveryfunc"></delivery>
    <upgradeclient
      :upgradeclientshow="upgradeclientshow"
      @closeupgrade="upgradefunc"
      :upgradedata="upgradedata"
    ></upgradeclient>

    <el-dialog title="图片" :visible.sync="imgsmallArr.length?true:false" width="600px" :before-close="closeimg">
        <div>
          <img :src="imgsmallArr[0]" alt="" style="width:100%;height:100%">
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="imgsmallArr = []" size="small">关 闭</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import shippedDialog from "./component/shippedDialog";
// import auditPopup from "./component/auditPopup";
import approvals from "./component/approvals";
// import logistics from "./component/logistics";
// import refundshow from "./component/refundshow"; //申请退款
// import refundaduit from "./component/refundaduit"; //确认退款
// import refundsure from "./component/refundsure"; //确认退款
// import product from "./component/product"; //签收退件
import delivery from "./component/delivery"; //发货弹窗
import upgradeclient from "./component/upgradeclient"; //升级客诉
import { throttleTipPop } from "@/assets/utils/utils";
import {
  aftersalepagec,
  findpicc,
  aftergoodslistc,
  findlogisticsdetailc,
  cancelafterSale
} from "@/api/sales";
export default {
  data() {
    return {
      attachmentstate: false, // 查看附件
      dialogVisible: false, // 查看售后弹窗
      centerDialogVisible: false, // 审核弹窗
      approvalsShow: false, // 审批流程弹窗
      cancelsalesshow: false,
      logisticshow: false, // 物流信息弹窗
      refundshow: false, //退款弹窗
      productshow: false, // 签收退件弹窗
      deliveryshow: false, // 发货弹窗
      refunaudit: false, // 退款审核
      upgradeclientshow: false, // 升级客诉弹窗
      refundsureshow: false,
      view: true, // 控制查看和编辑 true 查看
      productdata: {},
      imgArr: [],
      imgsmallArr:[],
      storedata: {},
      deliverydata: {}, //发货
      progressdata: {},
      cancelsalesdata: {},
      passdata:{},
      refundsuredata: {}, // 确认退款
      refunddata: {}, // 退款弹窗参数
      readuitdata: {}, // 审核退款
      upgradedata: {},
      logistics: {}, // 物流信息
      tableData: [],
      tableData2: [],
      checkobj: {}, //列数据
      form: {
        pageIndex: 0,
        pageSize: 10,
        total_count: 0
      },
      activities: []
    };
  },
  methods: {
    closeimg(){
      this.imgsmallArr = []
    },
    imgClick(val){
      this.imgsmallArr = []
      this.imgsmallArr.push(val)
    },
    //取消售后
    async cancelsales(data, type) {
      if (data) {
        this.cancelsalesdata = data;
        this.cancelsalesshow = true;
      }
      if (type) {
        const data = await cancelafterSale(this.cancelsalesdata.complainId);
        if (data.code == 200) {
          this.$message({
            message: data.message,
            type: "success"
          });
          this.aftersalepageb();
          this.cancelsalesshow = false;
        }else{
          throttleTipPop(this,'error',data.message)
        }
      }
    },
    deliveryfunc(val) {
      this.deliveryshow = val;
    },
    async deliverybtn(data) {
      this.deliveryshow = true;
      const  msg  = await aftergoodslistc(data.complainId);
      this.deliverydata = Object.assign(data,msg.data[0]);
    },
    // 升级客诉
    upgradefunc(data,type) {
      if (data) {
        this.upgradeclientshow = true;
        this.upgradedata = data;
        type?this.viewshow = true:this.viewshow = false
      } else {
        this.upgradeclientshow = false;
      }
    },
    //签收退货
    productfunc(val) {
      if (val) {
        this.productdata = val;
        this.productshow = true;
      } else {
        this.productshow = false;
      }
    },
    //申请退款
    async refundsure(val) {
      if (val) {
        // const obj = {
        //   afterId:val.afterId,
        //   type:9
        // }
        // const {data} = await findbussinesssn(obj)
        // this.refunddata = data
        // this.refunddata.afterId = val.afterId
        // this.refunddata.complainId = val.complainId
        this.refundsuredata = val;
        this.refundsureshow = true;
      } else {
        this.refundsureshow = false;
      }
    },
    //申请退款
    async refundfunc(val) {
      if (val) {
        const obj = {
          afterId: val.afterId,
          type: 9
        };
        const { data } = await findbussinesssn(obj);
        this.refunddata = data;
        this.refunddata.afterId = val.afterId;
        this.refunddata.complainId = val.complainId;
        this.refundshow = true;
      } else {
        this.refundshow = false;
      }
    },
    reauditfunc(val) {
      if (val) {
        this.readuitdata = val;
        this.refunaudit = true;
      } else {
        this.refunaudit = false;
      }
    },
    audit(val) {
      this.centerDialogVisible = val;
    },
    changedia(val) {
      this.dialogVisible = val;
    },
    logisticsfunc(val) {
      this.logisticshow = val;
    },
    async informafunc(row) {
      this.logistics = row;
      const { data } = await findlogisticsdetailc(
        row.complainId,
        row.logisticsNo
      );
      data.length ? (data[0].color = "#4A99FA") : "";
      this.activities = data || [];
      let $table = this.$refs.table;
      $table.toggleRowExpansion(row);
    },
    changeapproval(val) {
      this.approvalsShow = val;
    },
     // 申请售后
    aftersales(data, type) {
      type ? (this.view = true) : (this.view = false);
      this.dialogVisible = true;
      this.passdata = data;
    },
    // 查看附件
    async attachment(val, type) {
      const { data } = await findpicc(val.complainId);
      if(data){
        this.imgArr = data.slice(0,5) || [];
      }
      this.attachmentstate = true;
    },
    // 审核弹窗
    DialogVisible(val, type) {
      if (val) {
        this.centerDialogVisible = true;
      }
    },
    // 审批流程弹窗
    approvalsFunc(val) {
      this.progressdata = val;
      this.approvalsShow = true;
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.aftersalepagec();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.aftersalepagec();
    },
    async aftersalepagec(val) {
      if (val) {
        this.form.pageIndex = 1;
      }
      let obj = {
        pageIndex: this.form.pageIndex,
        pageSize: this.form.pageSize,
        requestStatus: 2, // 处理中
        goodsName: this.form.goodsName,
        customerName: this.form.customerName
      };
      const { data } = await aftersalepagec(obj);
      this.tableData = data.pageList;
      this.form.total_count = data.count;
    },
    async aftergoodslistc(row, column, event) {
      this.checkobj = row;
      const { data } = await aftergoodslistc(row.complainId);
      this.tableData2 = data;
    }
  },
  created() {
    this.aftersalepagec();
  },
  mounted() {},
  components: {
    shippedDialog,
    // auditPopup,
    approvals,
    // logistics,
    // refundshow,
    // product,
    delivery,
    // refundsure,
    // refundaduit,
    upgradeclient
  },
  watch: {}
};
</script>

<style  lang="stylus" scoped>
.line-div {
}

.small_top {
  margin-top: 10px;
}

.addfocus {
  position: absolute;
  left: 750px;
}

.information {
  background: #f7faff;
  height: 56px;
  display: flex;
  box-sizing: border-box;
  align-items: center;

  .tent_span {
    margin-right: 10px;
  }

  .tent_span:first-child {
    margin-left: 1%;
  }
}

.txt_left {
  padding-left: 10px;
}

.mar_top {
  margin-top: 5px;
}

.mcard {
  border: 1px solid rgba(215, 225, 241, 1);
}

.imgDiv {
  width: 134px;
  height: 134px;
  background: rgba(0, 0, 0, 1);
  margin-right: 16px;
  margin-top: 16px;
}

.imgDiv:nth-child(1) {
  margin-top: 0;
}

.imgDiv:nth-child(2) {
  margin-top: 0;
}

.imgDiv:nth-child(3) {
  margin-top: 0;
}

.imgDiv:nth-child(4) {
  margin-top: 0;
}

.bigDiv {
  width: 680px;
  display: flex;
  flex-wrap: wrap;
}

.btn_line-div {
  justify-content: space-around;
  margin-top: 0;
}

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
            content: '';
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

.baoguo11 {
  background: #f3f7fc;
  height: 35px;
  width: 100%;
  line-height: 35px;
  padding-left: 20px;
}

.top_div {
  margin-bottom: 20px;
}

.goodsdetail {
  display: block;
  margin-top: 30px;
  width: 115px;
  height: 39px;
  background: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 39px;
  border: 1px solid rgb(215, 224, 241);
  border-bottom: 0;
  position: relative;
  top: 1px;
}

.img_size {
  width: 95px;
  height: 95px;
}

.line-div span {
  word-break: keep-all;
}

.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}

.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}

.mbottom {
  text-align: left;
  padding: 20px;
  margin: 20px;
  border: 1px solid rgba(215, 225, 241, 1);
}

#myorder {
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 17px 16px 0px 12px;
  border: 1px solid #dfe7f2;
}

/deep/ th {
  background: rgb(247, 250, 255);
}

/deep/ .el-table__expanded-cell {
  padding: 0;
}

/deep/ .el-table__expand-icon>.el-icon {
  display: none;
}

.txt_left {
  text-align: left;
}
</style>