<template>
  <div id="all_order_tab">
    <el-table
      :data="tableData"
      :header-cell-style="getRowClass"
      border
      ref="tab_1"
      @header-dragend='header'
      :span-method="arraySpanMethod">
      <!--<el-table-column :resizable="false" type="selection" width="55" align="center"></el-table-column>-->
      <el-table-column :resizable="false" label="商品详情" align="center" width='280'>
        <template slot-scope="scope">
          <div class="order_no">
            <span class="tent_span">订购单号：{{scope.row.orderSn}}</span>
            <span class="tent_span">下单时间：{{scope.row.createTime}} </span>
            <span class="tent_span">收货人：{{scope.row.consignee}}</span>
            <span class="tent_span">联系电话：{{scope.row.reciveMobile}}</span>
            <div class="button">
              <el-button class="text" type="primary" size="mini" v-show="true" @click.stop="handleCheck(scope.row,'/orderdetails')">查看详情</el-button>
              <el-button class="text" type="primary" size="mini" v-if="scope.row.payStatus  == 0 && scope.row.orderStatus  != 2"  @click="goPay(scope.row)">去支付</el-button>
              <el-button class="text" type="primary" size="mini" v-if="scope.row.payStatus  == 0 && scope.row.orderStatus  != 2"  @click="cancelOrder(scope.row.orderId)">取消订单</el-button>
              <el-button class="text" type="primary" size="mini" v-if="scope.row.orderStatus  == 2 || scope.row.orderStatus == 5" @click='deleteOrder(scope.row.orderId)'>删除订单</el-button>
            </div>
          </div>
          <div class="div_p">
            <div class="order_goods" v-for="(item,index) in scope.row.orderGoodsList" :key="index">
              <div style="width: 280px;height: 60px; padding-left: 20px; flex-shrink: 0; display:flex; align-items: center;">
                <img class="content_img" :src="item.thumbnailImgUrl" alt="">
                <span class="goodsName" :title="item.goodsName" style="text-align: center;margin-left: 5px;">{{item.goodsName}}</span>
              </div>
              <span style="width:150px;text-align: center;padding: 10px; flex-shrink: 0;">{{item.goodsAttr}}</span>
              <span style="width:110px;text-align: center;padding: 10px; flex-shrink: 0;">{{item.goodsPrice}}</span>
              <span style="width:110px;text-align: center;padding: 10px; flex-shrink: 0;">{{item.quantity}}</span>
              <span style="width:110px;text-align: center;padding: 10px; flex-shrink: 0;">{{item.specialPrice}}</span>
              <span style="width:110px;text-align: center; padding: 10px;flex-shrink: 0;">{{item.goodsAmount}}</span>
              <span style="width:110px;text-align: center; padding: 10px; flex-shrink: 0;">{{scope.row.payName}}</span>
              <span style="width:110px;text-align: center; padding: 10px; flex-shrink: 0;">{{scope.row.shippingName}}</span>
              <div style="width:120px;text-align: center; padding: 20px; flex-shrink: 0;">
                <span>{{scope.row.statusMsg}}</span>
                <el-button class="text" type="primary" size="mini" v-if="scope.row.payStatus ==2 && scope.row.orderStatus  == 5 && item.hadComment== 1 " @click="goEvaluation(item,2)">追评</el-button>
                <el-button class="text" type="primary" size="mini" v-if="scope.row.payStatus ==2 && scope.row.orderStatus  == 5 && item.hadComment== 0 "  @click="goEvaluation(item,1)">去评价</el-button>
              </div>
            </div>
          </div>
          <div v-show="scope.row.showDetail" style="background:#f7faff;padding:15px 9px 12px 12px;">
            <package></package>
          </div>
        </template>
      </el-table-column>
      <el-table-column  :resizable="false" width="170" label="规格" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="商城价" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="数量" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="结算价" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="合计" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="支付方式" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="130" label="物流信息" align="center"></el-table-column>
      <el-table-column  :resizable="false" width="120" label="状态/操作" align="center">
      </el-table-column>
      <el-table-column type="expand" width="1">
        <template slot-scope="props">
          <Account-aftermarket></Account-aftermarket>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging clearfix">
      <div class="block" style="float:right; color:#606266;padding:12px 10px 84px 0px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="100"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible1"
      width="30%"
    > <!--:before-close="handleClose-->
      <span>是否确认去支付</span>
      <span slot="footer" class="dialog-footer txt_center">
    <el-button @click="dialogVisible1 = false" style="background:#F56C6C;width:96px;height:36px;line-height: 10px;" type="danger">取 消</el-button>
    <el-button  @click="payOrderIds" style="background:#4A99FA;width:96px;height:36px;line-height: 10px;" type="primary">确 定</el-button>
  </span>
    </el-dialog>
    <!-- 下载多地址表格 -->
    <el-dialog title="下载多地址表格" :visible.sync="uploading" width="40%">
      <div class="images">
        <el-form label-width="100px" size="small">
          <el-form-item label="模板下载：">
            <div class="download" @click="download">
              <img src="@/assets/images/person_center/excel.png" alt class="opera_img" />
              <span class="fontss" >点击此处下载多地址表格</span>
            </div>
          </el-form-item>
          <el-form-item label="选择文件：">
            <div class="file_div">
              <el-upload
                class="avatar-uploader"
                ref="upload"
                :action="action"
                :data="bigObj"
                :show-file-list="false"
                accept=".xls, .xlsx"
                :on-success="handleAvatarSuccess"
                name="multipartFile"
                :auto-upload="false"
                :on-change='fileName'
              >
                <el-button type="primary" size="small" class="choosefile_btn">选择文件</el-button>
              </el-upload>
              <el-input v-model="fileValue" placeholder="未选择任何文件" size="medium"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="uploading = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitUpload" size="small">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 下载多地址表格 -->

    <!-- 发货弹窗 -->
    <div class="spicallist">
      <el-dialog title="发货单" :visible.sync="deliverGoods" width="65%">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">订单信息</h4>
              <br />
              <el-table :data="tableData3" border style="width: 100%" stripe>
                <el-table-column :show-overflow-tooltip="true" prop="goodsName" label="商品" align="center">
                </el-table-column>
                <el-table-column prop="goodsAttr" label="SKU" align="center"></el-table-column>
                <el-table-column prop="goodsPrice" label="商城价" align="center"></el-table-column>
                <el-table-column prop="quantity" label="数量" align="center"></el-table-column>
                <el-table-column prop="specialPrice" label="结算价" align="center"></el-table-column>
                <el-table-column prop="goodsAmount" label="合计" align="center"></el-table-column>
                <el-table-column prop="name" label="状态" align="center">
                  <template slot-scope="scope">
                    <span>未发货</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">物流信息</h4>
              <div class="btn">
                <el-button @click="uploadAddress" type="primary" size="small">上传快递清单</el-button>
                <br />
              </div>
              <div class="meibanfal"></div>
              <el-table :data="tableData2" border style="width: 100%" stripe>
                <el-table-column prop="companyName" label="单位名称" align="center"></el-table-column>
                <el-table-column prop="consignee" label="收件人" align="center"></el-table-column>
                <el-table-column prop="phone" label="联系方式" align="center"></el-table-column>
                <el-table-column prop="cityName" label="市" align="center"></el-table-column>
                <el-table-column prop="districtName" label="区县" align="center"></el-table-column>
                <el-table-column prop="townName" label="乡镇" align="center"></el-table-column>
                <el-table-column prop="address" label="详细地址" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleAdress(scope.$index)">移除</el-button>
                  </template>
                </el-table-column>
                <div v-for="(data,index) in shopArr" :key="data.goodsId">
                  <el-table-column prop="name" label="商品名称" align="center">
                    <template slot-scope="scope">
                      <span>{{data.goodsName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="商品货号" align="center">
                    <template slot-scope="scope">
                      <span>{{data.goodsSn}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="sku" align="center">
                    <template slot-scope="scope">
                      <span>{{data.skuId}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="数量" align="center">
                    <template slot-scope="scope">
                      <span>{{tableData2[scope.$index].addressGoodsParams[index].quantity}}</span>
                    </template>
                  </el-table-column>
                </div>
              </el-table>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="deliverGoods = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submitAdr" size="small">确 定</el-button>
          </span>
      </el-dialog>
    </div>
    <!-- 发货弹窗 -->
    <!-- 支付状态弹窗 -->
    <el-dialog
      title="支付提示"
      :visible.sync="dialogVisible"
      width="30%">
      <i class="el-icon-warning-outline" style="color: #409EFF; font-size: 24px;"></i>
      <span style="position: relative; top: -4px; margin-left: 6px;">支付完成后，请根据您支付的情况点击下面按钮</span>
      <span slot="footer" class="dialog-footer">
          <el-button  type="danger" size="small" @click="handleMeetProblem">支付遇到问题</el-button>
          <el-button type="primary" size="small" @click="handleCompleteOrder">支付完成</el-button>
        </span>
    </el-dialog>
    <!-- 支付状态弹窗 -->
  </div>
</template>

<script>
import { getAllorder, cancelOrder, getdelivery, suergoods, getLogistics, orderDetails, submitAddress } from '@/api/index';
import { handleCrypt, throttleTipPop } from '@/assets/utils/utils'
import AccountAftermarket from './aftermarket';
import Package from './package';

let BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://www.maige.com'
} else {
  BASE_URL = `http://${location.hostname}`
}

export default {
  name: 'allorder',
  props: {
    state: {

    },
  },
  components: {
    AccountAftermarket,
    Package,
  },
  data() {
    return {
      dialogVisible: false, // 支付弹窗是否可见
      account: '', // 订单金额
      orderSn: '', // 订单编号
      payCode: '', // 支付方式
      paymode: 0, // 支付模式
      orderId: '',
      shopArr: [], // 商品的数组渲染
      fileValue: '', // 选择完文件的名称
      ruleForm: {
        company: '', // 快递公司
        orderNo: '', // 快递单号
        fees: '', // 费用
      },
      rules: {
        company: [{ required: true, message: '请选择快递公司', trigger: 'change' }],
        orderNo: [{ required: true, message: '请填写快递单号', trigger: 'blur' }],
      },
      deliverGoods: false,
      tableData2: [],
      tableData3: [],
      adressobj: [], // 上传地址得到的obj
      bigObj: {}, // 上传表格id
      uploading: false, // 上传物流单号
      action: '',
      orderStatus: ['未确认', '确认', '已取消', '无效', '售后', '已完成', '断货', '删除'],
      tableData: [],
      iSelect: true,
      isChecked: false,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      dialogVisible1: false,
      orderIds: '',
    };
  },
  mounted() {
    this.getAllorder();
    this.action = BASE_URL + '/api/open/c/b2b2c/orderservice/order/addressImport.json';
  },
  methods: {
    // 支付遇到问题
    handleMeetProblem() {
      this.dialogVisible = false
      window.location.href = 'navigation_page.html?index=1#/PaymentMethod'
    },
    // 订单完成
    handleCompleteOrder() {
      this.dialogVisible = false
      window.location.reload()
    },
    async deliverGoodsfunc(data) {
      this.tableData2 = []
      this.fileValue = ''
      this.ruleForm.company = ''
      this.ruleForm.orderNo = ''
      this.shopArr = []
      this.orderId = data.orderId;
      this.deliverGoods = true;
      this.bigObj.orderId = data.orderId;
      const res = await orderDetails(data.orderId)
      this.tableData3 = res.data.orderGoodsList;
    },
    // 确定地址提交
    async submitAdr() {
      const res = await submitAddress(1, this.orderId, this.adressobj)
      if (res.code === 200) {
        this.deliverGoods = false
        this.$message({
          message: res.message,
          type: 'success',
        });
        this.getAllorder()
      }else{
        throttleTipPop(this,'error',res.message)
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.uploading = false;
    },
    fileName(file) {
      if (file.name) {
        this.fileValue = file.name
      }
    },
    handleAvatarSuccess(response) {
      const addressArr = [];
      this.adressobj = response.data
      response.data.forEach((item) => {
        const obj = {};
        obj.companyName = item.companyName;
        obj.consignee = item.consignee;
        obj.phone = item.phone;
        obj.cityName = item.cityName;
        obj.districtName = item.districtName;
        obj.townName = item.townName;
        obj.address = item.address;
        obj.addressGoodsParams = item.addressGoodsParams;
        addressArr.push(obj);
        this.shopArr = item.addressGoodsParams;
      });
      this.tableData2 = addressArr;
    },
    // 上传多地址
    uploadAddress(data) {
      this.uploading = true
    },
    download() {
      window.location.href =
          BASE_URL +
          '/api/open/c/b2b2c/orderservice/order/trackingDown.json?orderId=' +
          this.orderId;
    },
    // 导出订单
    exportOrder() {
      window.location.href =
          BASE_URL +
          '/api/open/c/b2b2c/orderservice/order/export.json?pageIndex=' +
          this.form.pageIndex +
          '&pageSize=' +
          this.form.pageSize +
          '&requestStatus=' +
          this.form.requestStatus +
          '&startTime=' +
          this.form.timer[0] +
          '&endTime=' +
          this.form.timer[1] +
          '&keyWordType=' +
          this.form.keyWordType +
          '&keyWordValue=' +
          this.form.keyWordValue +
          '&fromType=' +
          this.form.fromType +
          '&sortBySupply=' +
          this.form.sortBySupply +
          '&orderIdArray=' +
          this.form.orderIdArray
    },
    // 删除订单
    deleteOrder(orderId) {
      this.$confirm('是否确认删除该订单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await cancelOrder(2, orderId, 7)
        if (res.code === 200) {
          this.tableData = this.tableData.filter(item => item.orderId !== orderId)
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        }
      })
    },
    goPay(data) {
      this.dialogVisible1 = true
      this.orderSn = data.orderSn
      this.payCode = data.payCode
      this.account = data.orderAmount
    },
    async payOrderIds() {
      // 支付方式
      let page = ''
      switch (this.payCode) {
        case 'alipay_qr':
          this.paymode = 1
          page = '/alipay'
          break
        case 'wxpay_native':
          this.paymode = 2
          page = '/'
          break
        default :
          this.paymode = 1
      }
      let url = window.location.href
      url = handleCrypt.encrypt(url)
      const linkUrl = 'payment.html?redirect=' + url + '&paymode=' + this.paymode + '&orderNo=' + this.orderSn + '&account=' + this.account + '#' + page
      window.open(linkUrl)
      this.dialogVisible1 = false
      this.dialogVisible = true
      /* try {
                          const obj = {}
                          obj.orderIds = this.orderIds
                          const res = await payOrderIds(obj)
                          if (res.code === 200) {
                            this.getAllorder();
                            this.$message({
                              message: res.message,
                              type: 'success',
                            });
                            this.dialogVisible1 = false
                          }
                        } catch (e) {
                          this.$message.error('未知错误!!!')
                        } */
    },
    // 去评价
    goEvaluation(data, index) {
      if (index == 1) {
        this.$router.push({ name: 'evaluationOf', query: { orderId: data.orderId, goodsId: data.goodsId, skuId: data.skuId } })
      } else if (index == 2) {
        this.$router.push({ name: 'review', query: { commentId: data.commentId, orderId: data.orderId } })
      }
    },
    header(newWidth, oldWidth, column, event) {
      console.log(newWidth)
      console.log(oldWidth)
      console.log(column)
      console.log(event)
    },
    async Logistics(data) {
      const obj = {}
      data.showDetail = !data.showDetail
      obj.deliveryId = data.deliveryId
      if (data.showDetail) {
        const res = await getLogistics(obj)
      }
    },
    // 确认收货
    async suergoods(id) {
      try {
        const obj = {}
        obj.orderId = id
        obj.index = 3
        obj.orderStatus = 5
        const res = await suergoods(obj)
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success',
          });
        } else {
          this.$message.error('未知错误!!!')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 提醒发货
    async handleState(id) {
      const obj = {}
      obj.orderId = id
      try {
        const res = await getdelivery(obj)
        if (res.code == 200) {
          throttleTipPop(this, 'success', res.message)
        } else if (res.code == 202) {
          throttleTipPop(this, 'warning', res.message)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 取消订单
    async cancelOrder(orderId) {
      const res = await cancelOrder(1, orderId, 2)
      if (res.code === 200) {
        this.$message({
          message: '取消成功',
          type: 'success',
        })
        this.getAllorder()
      }
    },
    async getAllorder() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        requestStatus: 8, // 已取消
      };
      try {
        const res = await getAllorder(obj);
        this.tableData = res.data.pageList;
        this.total = res.data.count;
      } catch (e) {
        console.log(e)
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 1 === 0) {
        /* if (columnIndex <= 0) {
                            return [1, 1];
                          } */
        return [1, 11];
      }
    },
    // 设置表头样式
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;text-align:center;height:50px;';
      }
      return '';

      if (columnIndex === 0) {
        return 'display:none;';
      }
    },
    // 点击查看地址
    handleCheck(row, url) {
      // const $table = this.$refs.tab_1;
      // $table.toggleRowExpansion(row);
      // $table.toggleRowSelection(row);
      console.log(row)
      this.$router.push({ name: 'Orderdetails', query: { orderId: row.orderId } })
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAllorder();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllorder();
    },
  },
};

</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .clearfix:after {
    display: block;
    content: "";
    clear: both;
  }
  .goodsName
    ellipsis2()
  /deep/ .el-table_1_column_2
    width 100%
  #all_order_tab {
    margin-left 20px
    /deep/ .cell {
      padding 0px
    }
    /deep/ td {
      padding: 0px;
      width: 100%;
    }
    /deep/ .el-table__body-wrapper {
      overflow hidden
    }

  }

  .tent_span {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(147, 147, 153, 1);
    margin-right: 10px;
    margin-left: 20px;
  }

  .text {
    width: 65px;
    height: 25px;
    background: rgba(64, 158, 255, 1);
    border-radius: 4px;
    font-size 12px
    text-align center
    padding 5px 5px
    margin-right: 10px;
  }

  .button {
    display: flex;
    position: absolute;
    right: 5px;
  }

  .order_goods {
    font-size: 12px;
    padding: 10px 0px;
    display: flex;
    align-items: center;
    .content_img {
      display: inline-block;
      vertical-align: middle;
      max-width: 100%;
      max-height: 100%;
      flex-shrink: 0;
    }
    .good_info {
      display: inline-block;
      width: 165px;
      vertical-align: middle;
    }
  }
.order_no{
  position relative
  background:#f7faff;
  height:56px;
  display: flex;
  box-sizing:border-box;
  align-items: center;
}
  .order_goods > span
    display inline-block
    word-spacing: 0;
    font-size: 12px;
.merge{
    position: absolute;
    right: 0;
    z-index: 10000000000;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    right:10px
}
.div_p{
  position :relative
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
      margin-left: 20px;
    }
  }
</style>
