<template>
  <!-- 待发货 -->
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base serch-time">
              <el-row>
                <el-col :span="5" style="min-width:342px">
                  <el-col>
                    <el-form-item label="下单时间：">
                      <el-col :span="23">
                        <el-date-picker
                          type="daterange"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="form.timer"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          @change="_getAllorder(true)"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="关键字：">
                      <el-col :span="12">
                        <el-select
                          class="el-select-width"
                          v-model="form.keyWordType"
                          placeholder="请选择"
                          clearable
                        >
                          <el-option label="根据订单编号" value="1"></el-option>
                          <el-option label="按货号搜索" value="2"></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="12">
                        <el-input v-model="form.keyWordValue" clearable placeholder="请输入关键字"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="4">
                  <el-col>
                    <el-form-item label="订单来源：">
                      <el-col :span="23">
                        <el-select
                          class="el-select-width"
                          v-model="form.fromType"
                          placeholder="请选择"
                          clearable
                          @change="_getAllorder(true)"
                        >
                          <el-option label="积分商城" value="1"></el-option>
                          <el-option label="集采" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="7" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true)">查询</el-button>
                  <el-button type="primary" size="small" @click="exportOrder">导出订单</el-button>
                  <el-button type="primary" size="small">快递单导入</el-button>
                </el-col>
                <el-col :span="15" class="btn_right">
                  <span class="filter">1</span>
                </el-col>
                <el-col :span="7" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllorder(true,true)">按供应商排序</el-button>
                  <el-button type="primary" size="small">发货明细推送</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard othertable">
      <div class="allorder">
        <el-table :data="tableData" border ref="table" :span-method="arraySpanMethod" @select='choose' @select-all='choose'>
          <el-table-column type="selection" width="55" align="center" :resizable="false"></el-table-column>
          <el-table-column label="商品详情" align="center" width="350" :resizable="false">
            <template slot-scope="scope" style="height:200px">
              <div class="information">
                <span class="tent_span">订单编号：{{scope.row.orderSn}}</span>
                <span class="tent_span">下单时间：{{scope.row.createTime}}</span>
                <span class="tent_span">共{{scope.row.goodsNumber}}件商品</span>
                <span class="tent_span">订单总价：{{scope.row.orderAmount}}元</span>
                <span class="addfocus">
                  <el-button
                    type="primary"
                    size="small"
                    @click="orderMarkingfunc(scope.row.orderId)"
                  >添加标记</el-button>
                  <el-button
                    type="primary"
                    size="small"
                    @click="orderDetail(scope.row.orderId)"
                  >查看详情</el-button>
                  <span style="margin:12px;width:100px">
                    <el-button
                      type="warning"
                      size="small"
                      @click="deliverGoodsfunc(scope.row)"
                      v-if="scope.row.orderType== 1 && scope.row.reciveAddress== null"
                    >填写地址</el-button>
                  </span>
                </span>
              </div>
              <div class="content">
                <div
                  v-for="(item,index) in scope.row.orderGoodsList"
                  :key="index"
                  :class="index!=0?'tent_div tent_top':'tent_div'"
                >
                  <div class="name_div">
                    <img class="content_img" :src="item.thumbnailImgUrl" alt />
                    <span class="name">{{item.goodsName}}</span>
                  </div>
                  <span style="width:100px;">{{item.goodsAttr}}</span>
                  <span style="width:100px">{{item.goodsPrice}}</span>
                  <span style="width:100px">{{item.quantity}}</span>
                  <span style="width:100px">{{item.specialPrice}}</span>
                  <span style="width:100px">{{item.goodsAmount}}</span>
                  <span style="width:100px">迈戈</span>
                  <span style="width:100px">积分兑换</span>
                  <span style="width:300px">顺丰</span>
                  <div class="btn_div">
                    <span>{{scope.row.statusMsg}}</span>
                    <span><el-button type="warning" size="small" @click="delivery(scope.row,true,index)">发货</el-button></span>
                    <span> <el-button
                      type="warning"
                      size="small"
                      v-if="scope.row.orderType== 1"
                      @click="choseSupplierfunc(item,scope.row)"
                    >选择供应商</el-button></span>
                  </div>
                </div>
                <div class="independent">{{scope.row.payName}}</div>
                <div class="independent Courier">{{scope.row.shippingName}}</div>
                <div></div>
              </div>
            </template>
          </el-table-column>
          <el-table-column :resizable="false" label="SKU" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="商城价" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="数量" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="结算价" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="合计" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="供应商" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="支付方式" align="center" width="100"></el-table-column>
          <el-table-column :resizable="false" label="物流信息" align="center" width="300"></el-table-column>
          <el-table-column :resizable="false" label="状态/操作" align="center"></el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current_page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count"
        ></el-pagination>
      </div>
      <el-dialog title="添加标记" :visible.sync="orderMarking" width="30%">
        <span>是否需要给订单添加加急标记？</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="orderMarking = false" size="small">取 消</el-button>
          <el-button type="primary" @click="orderMarking = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 下载多地址表格 -->
      <el-dialog title="下载多地址表格" :visible.sync="uploading" width="40%">
        <div class="images">
          <el-form label-width="100px" size="small">
            <el-form-item label="模板下载：">
              <div @click="download">
                <img src="../../common/images/excel.png" alt class="opera_img" />
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
                  <el-button type="primary" size="small">选择文件</el-button>
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
                  <el-table-column prop="goodsName" label="商品" align="center"></el-table-column>
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
                <div>
                  <el-button @click="uploading = true" type="primary" size="small">上传快递清单</el-button>
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
                  <el-table-column prop="addressName" label="详细地址" align="center"></el-table-column>
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

      <!-- 供应商弹窗 -->
      <div class="spicallist">
        <el-dialog title="选择供应商" :visible.sync="choseSupplier" width="65%">
          <div class="mbottom">
            <div class="goods-fitter">
              <div class="search-wrapper">
                <el-table :data="tableData1" stripe style="width: 100%" border ref="elTable">
                  <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                  <el-table-column label="商品图片" align="center" width="120">
                    <template slot-scope="scope">
                      <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
                        <img
                          :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                          width="100"
                          height="100"
                          alt
                        />
                      </div>
                      <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品信息" align="center" width="150">
                    <template slot-scope="scope">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div class="txt_left">来源：{{scope.row.gatherIn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格信息" align="center" width="150">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                      >税率：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate:''}}</div>
                      <div
                        class="txt_left"
                      >一件代发价：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.costPrice:'不支持一件代发'}}</div>
                      <div
                        class="txt_left"
                      >运费：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:''}}</div>
                      <div
                        class="txt_left"
                      >京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:''}}</div>
                      <div
                        class="txt_left"
                      >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.shopPrice:''}}</div>
                      <div
                        class="txt_left"
                      >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0?scope.row.skuInfo[scope.row.index].priceInfo.price:''}}</div>
                      <div
                        class="txt_left"
                        v-for="item in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
                        :key="item"
                      >
                        <div class="txt_left">{{item.volumeCost}}</div>
                        <div class="txt_left">{{item.volumeNumber}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品规格" align="center" width="200">
                    <template slot-scope="scope">
                      <div
                        style="height: 300px;overflow-y: auto;display: flex;justify-content: center;align-items: center;"
                      >
                        <div
                          class="txt_left martop"
                          v-for="(item,index) in scope.row.skuInfo"
                          :key="index"
                        >
                          <div
                            class="txt_left imgitem"
                            @click="Clicktent(index,scope.row)"
                            :class="[index == scope.row.index?'leftbottom':'']"
                          >
                            <!-- <img src="../../../common/images/商品规格(1).png" alt="" v-if="index == scope.row.index">  -->
                            <div class="more">{{item.goodsSpecValues}}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存(PCS)" align="center" width="120">
                    <template slot-scope="scope">
                      <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
                      <div
                        class="txt_left"
                        style="margin-top: 40px;"
                      >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="供应商" align="center" width="150">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                        style="font-size:15px"
                      >{{scope.row.skuInfo[scope.row.index].suppliersName}}</div>
                      <div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
                      <div
                        class="txt_left"
                      >联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
                      <div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
                      <div class="txt_left">管理员：{{scope.row.adminName}}</div>
                      <div
                        class="txt_left"
                      >管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="结算方式" align="center"></el-table-column>
                  <el-table-column label="操作" align="center" width="100" fixed="right">
                    <template slot-scope="scope">
                      <div class="line-div small_top" style="padding-bottom: 0">
                        <div class="small-Idiv" @click="priority(scope.row)">
                          <div class="i-div">
                            <img
                              src="../../common/images/icon/优先发货@2x.png"
                              alt
                              class="operation_img"
                            />
                          </div>
                          <span style="word-break: keep-all;margin-left: -12px;">优先发货</span>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="form2.pageIndex"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="form2.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="form2.total_count"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button type="danger" @click="choseSupplier = false" size="small">取 消</el-button>
            <el-button type="primary" @click="choseSupplier = false" size='small'>确 定</el-button>-->
          </span>
        </el-dialog>
      </div>
    </div>

    <!-- 发货弹窗 -->
    <el-dialog title="商品发货" :visible.sync="dialogVisible" width="30%" >
      <span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="物流公司" prop="company">
                <el-select v-model="ruleForm.company" size="small"  placeholder="请选择" @change="Courierfees">
                  <el-option
                    v-for="item in options"
                    :key="item.shippingId"
                    :label="item.shippingName"
                    :value="item.shippingId">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递单号" prop="orderNo">
              <el-input v-model="ruleForm.orderNo" size="small"></el-input>
            </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="courier('ruleForm')" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import jquery from 'jquery';
import AccountAftermarket from './detail/aftermarket';
import { handleCrypt, throttleTipPop } from '@/assets/utils/utils'
import {
  getAllorder,
  getTagorder,
  getOdersupplier,
  resetSupplier,
  getByidorder,
  getExcel,
  entryExcel,
  getCourier,
  deliveryFunc,
  submitAddress,
} from '@/api/order/index';

export default {
  data() {
    return {
      options: [], // 快递公司
      action: '',
      fileValue: '', // 选择完文件的名称
      dialogVisible: false, // 发货弹窗
      orderMarking: false, // 添加标记
      deliverGoods: false, // 发货
      uploading: false, // 上传物流单号
      choseSupplier: false, // 选择供应商
      oldGoodsId: '', // 旧商品ID
      orderId: '', // 订单ID
      goosid: [], // 发货多个商品数组
      input: '',
      shippingCode: '', // 配送方式编码
      shippingId: '', // 配送方式ID
      shippingName: '', // 配送名称
      bigObj: {}, // 上传表格id
      shopArr: [], // 商品的数组渲染
      adressobj: [], // 上传地址得到的obj
      orderArr: [], // 多选订单的数组
      ruleForm: {
        company: '', // 快递公司
        orderNo: '', // 快递单号
        fees: '', // 费用
      },
      form: {
        pageIndex: 1,
        pageSize: 10,
        total_count: 0,
        timer: '',
        keyWordType: '',
        keyWordValue: '',
        fromType: '',
        sortBySupply: 0, // 供应商排序
        orderIdArray: [], // 选中导出的数据
        requestStatus: 2, // 待发货
      },
      form2: {
        pageIndex: 1,
        pageSize: 10,
        total_count: 0,
      },
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      rules: {
        company: [{ required: true, message: '请选择快递公司', trigger: 'change' }],
        orderNo: [{ required: true, message: '请填写快递单号', trigger: 'blur' }],
      },
    };
  },
  created() {
    this._getAllorder();
    this.action =
      this.baseUrl1 + '/api/open/b/b2b2c/orderservice/order/addressImport.json';
  },
  mounted() {},
  methods: {
    // 导出订单
    exportOrder() {
      window.location.href =
        this.baseUrl1 +
        '/api/open/b/b2b2c/orderservice/order/export.json?pageIndex=' +
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
    // 复选框点击事件
    choose(selection, row) {
      console.log(selection)
      console.log(row)
      this.orderArr = selection
    },
    // 选择快递公司拿到对应的数据
    Courierfees(val) {
      this.options.forEach((item) => {
        if (item.shippingId == val) {
          this.shippingCode = item.shippingCode
          this.shippingId = item.shippingId
          this.shippingName = item.shippingName
          return true
        }
      })
    },
    // 确定地址提交
    submitAdr() {
      submitAddress(this.orderId, this.adressobj).then((res) => {
        if (res.code === 200) {
        this.deliverGoods = false
        this.deliverGoods = false
        this.$message({
          message: res.message,
          type: 'success',
        });
        this.getAllorder()
      }else{
        throttleTipPop(this,'error',res.message)
      }
      })
    },
    // 快递单号确定
    courier(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const obj = {}
          obj.goodsIds = this.goosid
          obj.logisticsNo = this.ruleForm.orderNo
          obj.orderId = this.orderId
          obj.shippingCode = this.shippingCode
          obj.shippingId = this.shippingId
          obj.shippingName = this.shippingName
          deliveryFunc(obj).then((res) => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: 'success',
              });
              this._getAllorder(true)
              this.dialogVisible = false
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    fileName(file) {
      if (file.name) {
        this.fileValue = file.name
      }
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.uploading = false;
    },
    deleAdress(index) {
      this.tableData2.splice(index, 1);
    },
    download() {
      window.location.href =
        this.baseUrl1 +
        '/api/open/b/b2b2c/orderservice/order/trackingDown.json?orderId=' +
        this.orderId;
    },
    priority(data) {
      const obj3 = {};
      obj3.newGoodsId = data.goodsId;
      obj3.oldGoodsId = this.oldGoodsId;
      obj3.orderId = this.orderId;
      obj3.supplierId = data.skuInfo[0].supplierId;
      resetSupplier(obj3).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success',
          });
          this.choseSupplier = false;
        }
      });
    },
    deliverGoodsfunc(data) {
      this.tableData2 = []
      this.fileValue = ''
      this.ruleForm.company = ''
      this.ruleForm.orderNo = ''
      this.shopArr = []
      this.orderId = data.orderId;
      this.deliverGoods = true;
      this.bigObj.orderId = data.orderId;
      getByidorder(data.orderId).then((res) => {
        this.tableData3 = res.data.orderGoodsList;
      });
    },
    choseSupplierfunc(data, order) {
      this.oldGoodsId = data.goodsId;
      this.orderId = order.orderId;
      const obj2 = {};
      obj2.pageIndex = this.form2.pageIndex;
      obj2.pageSize = this.form2.pageSize;
      obj2.goodsId = data.goodsId;
      obj2.skuId = data.skuId;
      this.choseSupplier = true;
      this._getOdersupplier(obj2);
    },
    _getOdersupplier(data) {
      getOdersupplier(data).then((res) => {
        this.tableData1 = res.data.pageList;
        this.form2.total_count = res.data.count;
      });
    },
    orderMarkingfunc(val) {
      this.orderMarking = true;
      this.orderId = val;
    },
    _getAllorder(data, state) {
      if (data) {
        this.form.pageIndex = 1;
      }
      if (state) {
        this.form.sortBySupply == 0 ? this.form.sortBySupply = 1 : this.form.sortBySupply = 0
      }
      if (this.form.keyWordValue != '' && this.form.keyWordType == '') {
        this.$message({
          message: '请选择关键字状态',
          type: 'warning',
        });
      } else {
        const obj = {};
        obj.pageIndex = this.form.pageIndex;
        obj.pageSize = this.form.pageSize;
        obj.timer = this.form.timer;
        obj.keyWordType = this.form.keyWordType;
        obj.keyWordValue = this.form.keyWordValue;
        obj.fromType = this.form.fromType;
        obj.requestStatus = this.form.requestStatus;
        obj.sortBySupply = this.form.sortBySupply;
        getAllorder(obj).then((res) => {
          this.tableData = res.data.pageList;
          this.form.total_count = res.data.count;
        });
      }
    },
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 1 === 0) {
        if (columnIndex <= 0) {
          return [1, 1];
        }
        return [1, 12];
      }
    },
    handleAvatarSuccess(response, file) {
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
        obj.addressName = item.addressName;
        obj.addressGoodsParams = item.addressGoodsParams;
        addressArr.push(obj);
        this.shopArr = item.addressGoodsParams;
      });
      this.tableData2 = addressArr;
    },
    handleCheck(row) {
      const $table = this.$refs.table;
      $table.toggleRowExpansion(row);
      $table.toggleRowSelection(row);
    },
    delivery(data, state, index) {
      this.ruleForm.company = ''
      this.ruleForm.orderNo = ''
      this.goosid = []
      this.ruleForm.fees = ''

      this.orderId = data.orderId
      if (this.orderArr.length == 0) {
        this.dialogVisible = true
        if (state) {
          this.goosid.push(data.orderGoodsList[index].goodsId)
        }
      } else if (this.orderArr.length && this.orderArr.length == 1) {
        this.dialogVisible = true
        this.orderArr[0].orderGoodsList.forEach((item) => {
          this.goosid.push(item.goodsId)
        })
      } else {
        this.$notify({
          title: '警告',
          message: '请不要选择多个商品发货',
          type: 'warning',
        });
      }

      // data.orderGoodsList.forEach(item => {
      //   // this.goosid += item.goodsId+','
      //   this.goosid.push(item.goodsId)
      // })

      getCourier(data.orderId).then((res) => {
        this.options = res.data.shipping
      })
    },
    orderDetail(id) {
      this.$router.push({ name: 'OrderDetail', query: { orderId: id } });
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this._getAllorder();
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this._getAllorder();
    },
    handleSizeChange2(val) {
      this.form.pageSize = val;
      this._getAllorder();
    },
    handleCurrentChange2(val) {
      this.form.pageIndex = val;
      this._getAllorder();
    },
  },
  components: {
    AccountAftermarket,
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.othertable {
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
  border-radius: 6px;
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
.content {
  width: 100%;
  padding: 20px 0;
  text-align: left;
  position: relative;
  .content_img {
    width: 60px;
    height: 60px;
  }
  .name {
    width: 163px;
    margin-left: 16px;
    display: inline-block;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tent_div {
  display: flex;
}
.tent_top {
  margin-top: 10px;
}
.independent {
  width: 100px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 893px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.Courier {
  left: 993px;
}
.posi {
  position: absolute;
  left: 1100px;
}

.filter {
  opacity: 0;
}
.goods_num {
  color: #f66c6c !important;
  font-size: 16px;
  margin-right: 5px;
}
.meibanfal {
  margin-bottom: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.el-upload--picture-card {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.avatar {
  width: 148px;
  height: 148px;
  display: block;
}
.opera_img {
  width:32px;
  height:32px;
}
.fontss {
  position: absolute;
  margin-left: 20px;
  color: #4A99FA;
  cursor: pointer;
}
.fonts {
  position: absolute;
  padding-top: 10px;
  margin-left: 23%;
  margin-top: -4px;
  color: red;
}
.name_div {
  width: 350px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.el-select{
  width:100%
}
.file_div{
  display:flex;
}
.avatar-uploader{
  margin-right: 10px;
}
.btn_div span{
  margin-top: 5px;
}
</style>
