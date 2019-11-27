<template>
  <div class="img_sizeload">
    <!-- 申请售后 -->
    <el-dialog title :visible.sync="dialogVisible" width="1200px" :before-close="handleClose">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <div class="mcard sales_div">
            <div>
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <h4 class="title">售后申请</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="mcard sales_div">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <h4 class="title">客户信息</h4>
                  <div class="row_div">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客户名称：" prop="customerName">
                          <el-input v-model="ruleForm.customerName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="平台名称：" prop="platform">
                          <el-input v-model="ruleForm.projectName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="服务商：" prop="providers">
                          <el-input v-model="ruleForm.agencyName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="销售员：" prop="salesman">
                          <el-input v-model="ruleForm.salesMan" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="订单号：" prop="saleSn">
                          <el-input
                            v-model="ruleForm.saleSn"
                            size="small"
                            placeholder="请输入订单号，调出对应信息~"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="购买账号：" prop="userAccount">
                          <el-input v-model="ruleForm.userAccount" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客诉联系人：" prop="applierName">
                          <el-input v-model="ruleForm.applierName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话：" prop="applierPhone">
                          <el-input
                            @focus="shopfunc"
                            auto-complete="new-password"
                            v-model="ruleForm.applierPhone"
                            size="small"
                            placeholder="请输入手机号码及联系电话，调出客诉订单~"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="hidden_div" v-show="showhidden">
                      <div class="triangle">
                        <img src="@/common/images/order/triangle.png" alt />
                      </div>
                      <el-table
                        :data="tableData"
                        stripe
                        border
                        style="width: 100%"
                        @cell-click="clicktd"
                      >
                        <el-table-column align="center" prop="goodsName" label="产品名称"></el-table-column>
                        <el-table-column align="center" prop="brandName" label="品牌"></el-table-column>
                        <el-table-column align="center" prop="modelNumber" label="型号"></el-table-column>
                        <el-table-column align="center" prop="quantity" label="数量"></el-table-column>
                        <el-table-column align="center" prop="purchaseTime" label="购买时间"></el-table-column>
                        <el-table-column align="center" prop="orderSn" label="订单号"></el-table-column>
                      </el-table>
                    </div>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="收货地址：" prop="Shippingaddress">
                          <el-col :span="8">
                            <el-form-item prop="province">
                              <el-select
                                size="small"
                                v-model="ruleForm.province"
                                clearable
                                @change="provincefunc"
                                placeholder="请选择省"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in addressArr"
                                  :key="item.regionId"
                                  :label="item.regionLongname"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item prop="city">
                              <el-select
                                size="small"
                                @change="cityfunc"
                                v-model="ruleForm.city"
                                clearable
                                placeholder="请选择市"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in cityArr"
                                  :key="item.regionId"
                                  :label="item.regionLongname"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="8">
                            <el-form-item prop="district">
                              <el-select
                                size="small"
                                v-model="ruleForm.district"
                                placeholder="请选择区"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in districtArr"
                                  :key="item.regionId"
                                  :label="item.regionLongname"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="街 道：" prop="town">
                          <el-input v-model="ruleForm.town" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sales_div number_of">
            <span class="checked_span checked_shop">商品列表</span>
            <el-button type="primary" size="small" class="batch_btn">批量操作</el-button>
          </div>
          <div class="mcard sales_div top_nono">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <div class="table_div">
                    <el-table :data="ruleForm.afterSaleGoodsVos" stripe border style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="选择"
                        align="center"
                        width="60"
                        type="selection"
                      ></el-table-column>
                      <el-table-column prop="name" label="图样" align="center" width="150">
                        <template slot-scope="scope">
                          <img :src="scope.row.thumbnailImgUrl" alt class="imgsize" />
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="address" label="商品信息" width="220">
                        <template slot-scope="scope">
                          <div class="tent_left">产品名称：{{scope.row.goodsName}}</div>
                          <div class="tent_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="tent_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="tent_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="goodsAttr" label="规格尺寸" width="140"></el-table-column>
                      <el-table-column align="center" prop="saleQuantity" label="数量" width="70"></el-table-column>
                      <el-table-column align="center" prop="specialPrice" label="结算价" width="70"></el-table-column>
                      <el-table-column align="center" prop="goodsPrice" label="合计" width="80"></el-table-column>
                      <el-table-column align="center" prop="address" label="物流信息" width="150">
                        <template slot-scope="scope">
                          <div class="tent_left">快递公司：{{scope.row.shippingId}}</div>
                          <div class="tent_left">快递单号：{{scope.row.logisticsNo}}</div>
                          <div class="tent_left">地址：{{scope.row.supplierAddress}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="address" label="操作">
                        <template slot-scope="scope">
                          <el-select
                            v-model="scope.row.returnType"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                            @change="afterdescribing(scope.row)"
                          >
                            <el-option
                              v-for="item in requirementsArr"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="sales_div number_of">
              <span  @click="checknum = index"  v-for="(item,index) in CommodityArr" :key="index" :class="index===checknum?'checked_span':''">商品{{index+1}}</span>
            </div>
          </div>
          <div class="mcard border_btom" v-if="CommodityArr.length">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <div class="row_div">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="商品名称：" prop="goodsName">
                          <el-input v-model="CommodityArr[checknum].goodsName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="本次客诉数量：" prop="complainQuantity">
                          <el-input v-model="CommodityArr[checknum].complainQuantity" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="售后要求：" prop="returnType">
                          <el-select
                            v-model="CommodityArr[checknum].returnType"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                            @change="afterfunc"
                          >
                            <el-option
                              v-for="item in requirementsArr"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="SKU：" prop="goodsAttr">
                          <el-input v-model="CommodityArr[checknum].goodsAttr" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="退货：" prop="returnGoods">
                          <el-select
                            v-model="CommodityArr[checknum].returnGoods"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                          >
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="处理截止时间：" prop="deadlineTime">
                          <el-date-picker
                            size='medium'
                            v-model="CommodityArr[checknum].deadlineTime"
                            type="date"
                            valueFormat="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 退货/换货/退款　 -->
                    <div
                      class="mar_top"
                      v-if="CommodityArr[checknum].returnType == 1 || CommodityArr[checknum].returnType== 3"
                    >
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>-->
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="responsible">
                            <el-select
                              v-model="ruleForm.responsible"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <!-- <el-col :span="12">
                          <el-form-item label="快递费用：" prop="courierFees">
                            <el-input v-model="ruleForm.courierFees" size="small"></el-input>
                          </el-form-item>
                        </el-col> -->
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="退款金额："
                            prop="describe"
                          >
                            <el-input v-model="CommodityArr[checknum].compensateAmount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row v-if="ruleForm.checkAfterStatus === 1 && (CommodityArr[checknum].returnType == 0 || CommodityArr[checknum].returnType == 1 || CommodityArr[checknum].returnType == 2)">
                        <el-col :span="12">
                          <el-form-item
                            label="供应商联系人："
                            prop="describe"
                          >
                            <el-input v-model="ruleForm.compensateAmount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="供应商联系电话：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].supplierPhone" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row  v-if="ruleForm.checkAfterStatus === 1 && (CommodityArr[checknum].returnType == 0 || CommodityArr[checknum].returnType == 1 || CommodityArr[checknum].returnType == 2)">
                        <el-col :span="24">
                          <el-form-item
                            label="供应商退货地址："
                            prop="describe"
                          >
                            <el-input v-model="CommodityArr[checknum].supplierReAddress" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row> -->
                    </div>
                    <!-- 维修 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 2">
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].personLiable"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="快递费用：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].logisticPrice" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="维修费用：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].maintenance" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 破损补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 4">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].personLiable"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row> -->
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="补寄商品：" prop="mailItems">
                            <el-input v-model="ruleForm.mailItems" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="补寄商品价值：" prop="replacementValue">
                            <el-input v-model="ruleForm.replacementValue" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 丢件补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 5">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].personLiable"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="补寄商品：" prop="mailItems">
                            <el-input v-model="ruleForm.mailItems" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="补寄商品价值：" prop="replacementValue">
                            <el-input v-model="ruleForm.replacementValue" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 配件补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 6">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].personLiable"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="配件名称：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].goodsNameReturn" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="快递费用：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].logisticPrice" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 补偿费用 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 7">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="责任人：" prop="describe">
                            <el-select
                              v-model="CommodityArr[checknum].personLiable"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="快递公司" value="1"></el-option>
                              <el-option label="客户收件人" value="2"></el-option>
                              <el-option label="供应商" value="3"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="开户行：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].openingBrank" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="收款人姓名：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].payee" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="金额：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].compensateAmount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="账户：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].brankAccount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="故障描述：" prop="describe">
                          <el-input
                            v-model="CommodityArr[checknum].questionDesc"
                            type="textarea"
                            size="small"
                            :rows="3"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="推送处理人：" prop="pushAdopt">
                            <el-input v-model="ruleForm.pusher" readonly size="small" placeholder="采销 XXX"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="供应商：" prop="supplierName">
                          <el-input v-model="ruleForm.supplierName" readonly size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="推送提醒：" prop="remind">
                          <el-input v-model="ruleForm.remind" size="small" readonly placeholder="服务商："></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="客户平台：" prop="clientPlatform">
                          <el-input v-model="ruleForm.clientPlatform" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客服人员：" prop="customerService">
                          <el-input v-model="ruleForm.waiter" size="small" readonly placeholder="黄某某："></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="客诉提交人员：" prop="submitter">
                          <el-input v-model="ruleForm.creater" size="small" readonly placeholder="黄某某："></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleClosetrue" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 申请售后 -->

    <div class="afteroperation">
      <el-dialog
        title="售后描述"
        :visible.sync="centerDialogVisible"
        width="600px"
        :before-close="canceldescribe"
      >
        <div class="describe_yzsh">
          <el-form :model="eldiog" ref="describe" label-width="100px">
            <el-form-item label="售后要求：">
              <el-select
                v-model="staging.returnType"
                placeholder="请选择"
                style="width:100%"
                size="small"
                disabled=""
              >
                <el-option
                  v-for="item in requirementsArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
              <!-- <el-input v-model="eldiog.describetent"></el-input> -->
            </el-form-item>
            <el-form-item
              label="售后数量："
              prop="afternumber"
              :rules="[
                  { required: true, message: '售后数量不能为空', trigger: 'blur'},
                ]"
            >
              <el-input v-model="eldiog.afternumber"></el-input>
            </el-form-item>
            <el-form-item
              label="故障描述："
              prop="Faulttent"
              :rules="[
                  { required: true, message: '故障描述不能为空', trigger: 'blur'},
                ]"
            >
              <el-input v-model="eldiog.Faulttent" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="上传图片：">
              <el-upload
                accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                :action="action"
                list-type="picture-card"
                :on-preview="handleAvatarSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisiblea">
                <img width="100%" :src="eldiog.thumbnailImgUrl" alt class="img_sizeload" />
              </el-dialog>
            </el-form-item>
          </el-form>
          <div class="el_tip">提示：您是否需要此订单全部商品按此“退货/退款”的要求操作；如是单个商品需要售后服务的，或需要不同的售后要求的，请不要使用批量操作！</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="canceldescribe" size="small">取 消</el-button>
          <el-button type="primary" @click="determine" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getprovince, getcity } from "@/api/customer/index";
import { findorderdetail, findorderlist , saveaftersaleb , aftersaleetail , updateaftersaleb , findpusher} from "@/api/order/index";
export default {
  props: {
    dialog: {},
    passdata: {}
  },
  data() {
    var validateaddress = (rule, value, callback) => {
      callback();
    };
    var applierPhone = (rule, value, callback) => {
      if (value != "") {
        // this.showhidden = false;
        callback();
      } else {
        // this.showhidden = false;
        return callback(new Error("请输入电话号码"));
      }
    };
    var orderSna = (rule, value, callback) => {
      if (this.ruleForm.orderSn != "") {
        callback();
      } else {
        return callback(new Error("请输入订单号"));
      }
    };
    var describe = (rule, value, callback) => {
      callback();
    }
    var deadlineTimer = (rule, value, callback) => {
      callback();
    }
    var returnGoods1 = (rule, value, callback) => {
      callback();
    }
    return {
      eldiog: {
        describetent: "", //描述内容
        afternumber: "", // 售后数量
        Faulttent: "", //故障描述
        thumbnailImgUrl: [] // 上传图片
      },
      checknum: 0,
      staging: "",
      datatable: {},
      tableData: [], //商品列表
      imageUrl: "",
      dialogVisiblea: false,
      centerDialogVisible: false, //操作弹窗
      action: "",
      dialogVisible: false,
      showhidden: false,
      show: true, // 控制是否退货的禁用,
      addressArr: [], //省级下拉
      cityArr: [],
      districtArr: [],
      CommodityArr: [],
      afterSaleComplainParam: [{}],
      ruleForm: {
        orderSn:"",
        customerName: "", //客户名称
        platform: "", //平台名称
        providers: "", //服务商
        salesman: "", //销售员
        city: "", // 省
        province: "", //市
        district: "", // 区
        productName: "", //产品名称
        buyTime: "", //购买时间
        orderNumber: "", //订单号
        brandName: "", // 品牌名称
        productModel: "", // 产品型号
        SKU: "", // SKU
        ProductItemno: "", // 产品货号
        payment: "", // 支付方式
        warrantyLogo: "", // 保修标识
        purchaseQuantity: "", // 购买数量
        deliveredQuantity: "", // 已发货数量
        complaints: "", // 已客诉数量
        complaintsNow: "", // 本次客诉数量
        settlementPrice: "", // 商城结算价
        goodsValue: "", // 客诉商品价值
        distributionPrice: "", // 分销结算价
        distributionValue: "", // 客诉商品分销价值
        adoptPin: "", // 采销
        
        supplierName: "", // 供应商名称
        orderHandler: "", // 订单处理人
        supplierPhone: "", // 联系电话
        supplierAdress: "", // 地址
        supplierEmail: "", // 邮箱
        supplierCompany: "", // 发货快递公司
        courierFees: "", // 快递费
        courierNumber: "", // 快递单号
        supplyPrice: "", // 供货价（成本价）
        totalAmount: "", // 客诉合计金额
        requirements: 1, // 售后要求
        starTime: "", // 提出时间
        returnGoods: "1", //退货
        endTime: "", //处理截止时间
        responsible: "", //责任人
        logisticSingle: "", //退货物流单号
        bank: "", // 开户行
        namePayee: "", //收款人姓名
        amount: "", //金额
        account: "", // 账户
        describe: "", // 故障描述
        pushAdopt: "采销：XXX", //客诉推送人采销
        pushFinancial: "财务：XXX", //客诉推送人财务
        kssupplierName: "", //客诉供应商名称
        remind: "服务商：", //推送提醒
        clientPlatform: "", //客户平台
        customerService: "", //客服人员
        submitter: "", //客诉提交人员

        kscourierFees: "", //客诉快递费
        logisticsCompany: "", //客诉物流公司
        commodityName: "", //换货商品名称
        processing: "", //处理要求
        mallPrice: "", //商城价
        maintenance: "", //维修费用
        accessoriesName: "", //配件名称
        mailItems: "", //补寄商品
        replacementValue: "" ///补寄商品价值
      },
      rules: {
        userAccount: [
          { required: true, message: "请填写购买账号", trigger: "blur" }
        ],
        Shippingaddress: [
          { required: true, validator: validateaddress, trigger: "change" }
        ],
        province: [{ required: true, message: "请选择省", trigger: "change" }],
        city: [{ required: true, message: "请选择市", trigger: "change" }],
        district: [{ required: true, message: "请选择区", trigger: "change" }],
        orderSn: [{ required: true, validator: orderSna, trigger: "blur" }],
        skuId: [{ required: true, message: "请填写SKU", trigger: "blur" }],
        salesman: [
          { required: false, message: "请填写销售员", trigger: "blur" }
        ],
        applierName: [
          { required: true, message: "请填写客诉联系人", trigger: "blur" }
        ],
        applierPhone: [
          { required: true, validator: applierPhone, trigger: "blur" }
        ],
        town: [{ required: true, message: "请填写联系地址", trigger: "blur" }],
        productName: [
          { required: true, message: "请填写产品名称", trigger: "blur" }
        ],
        complaintsNow: [
          { required: true, message: "请填写本次客诉数量", trigger: "blur" }
        ],
        returnGoods: [
          { required: true, validator:returnGoods1, trigger: "change" }
        ],
        deadlineTime: [
          { required: true, validator:deadlineTimer, trigger: "blur" }
        ],
        responsible: [
          { required: true, message: "请填写责任人", trigger: "blur" }
        ],
        bank: [{ required: true, message: "请填写开户行", trigger: "blur" }],
        namePayee: [
          { required: true, message: "请填写收款人姓名", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请填写金额", trigger: "blur" }],
        account: [{ required: true, message: "请填写账户", trigger: "blur" }],
        describe: [
          { required: true, validator:describe, trigger: "blur" }
        ],
        requirements: [
          { required: true, message: "请选择售货要求", trigger: "change" }
        ],
        courierFees: [
          { required: true, message: "请填写快递费用", trigger: "blur" }
        ],
        logisticSingle: [
          { required: true, message: "请填写物流单号", trigger: "blur" }
        ],
        kscourierFees: [
          { required: true, message: "请填写快递费", trigger: "blur" }
        ],
        logisticsCompany: [
          { required: true, message: "请选择物流公司", trigger: "change" }
        ],
        commodityName: [
          { required: true, message: "请选择商品名称", trigger: "change" }
        ],
        processing: [
          { required: true, message: "请选择处理要求", trigger: "change" }
        ],
        mallPrice: [
          { required: true, message: "请填写商城价", trigger: "blur" }
        ],
        maintenance: [
          { required: true, message: "请填写维修费用", trigger: "blur" }
        ],
        accessoriesName: [
          { required: true, message: "请填写配件名称", trigger: "blur" }
        ]
      },
      requirementsArr: [
        { name: "退货/退款", value: 0 },
        { name: "维修", value: 1 },
        { name: "退货/换货", value: 2 },
        { name: "破损补寄", value: 3 },
        { name: "丢件补寄", value: 4 },
        { name: "配件补寄", value: 5 },
        { name: "补偿费用", value: 6 }
      ], // 售后数组
      processingArr: [
        { name: "仓库先收到退回商品马上补寄" ,value: "仓库先收到退回商品马上补寄" },
        { name: "先快递一个新的给客户,再继续根据退货" ,value: "先快递一个新的给客户,再继续根据退货"},
        { name: "仓库收到退件退给供应商补寄到仓库后再补寄给客户",value: "仓库收到退件退给供应商补寄到仓库后再补寄给客户"},
        { name: "直接退回供应商并扣除商品贷款" ,value: "直接退回供应商并扣除商品贷款"},
        { name: "直接退给供应商后由供应商补寄", value: "直接退给供应商后由供应商补寄"},
        { name: "让供应商先补寄后,再退回不良商品",value: "让供应商先补寄后,再退回不良商品"},
        { name: "申请财务付款",value: "申请财务付款"}
      ] //处理要求数组
    };
  },
  methods: {
    async clicktd(row, column, cell, event) {
      this.datatable.orderSn = row.orderSn;
      let { data } = await findorderdetail(row.orderSn);
      this.$nextTick(() => {
        this.ruleForm.afterSaleGoodsVos = data.afterSaleGoodsVos;
        this.ruleForm.orderSn = row.orderSn;
        this.showhidden = false;
      });
    },
    canceldescribe() {
      this.centerDialogVisible = false;
      this.$refs.describe.clearValidate();
    },
    async costfunc(val){
       const obj = {
        orderSn:this.ruleForm.orderSn,
        returnType:this.ruleForm.afterSaleGoodsVos[this.checknum].returnType,
        skuId:this.ruleForm.afterSaleGoodsVos[this.checknum].skuId,
        amount:this.CommodityArr[this.checknum].compensateAmount
      }
      let data = await findpusher(obj)
      this.ruleForm.pusher = data.data
      setTimeout(()=>{
        this.ruleForm.pusher = data.data
      },50)
    },
    determine() {
      this.$refs.describe.validate(async valid => {
        if (valid) {
          this.centerDialogVisible = false;
          const obj = JSON.parse(JSON.stringify(this.staging));
          obj.complainQuantity = this.eldiog.afternumber
          obj.pusher = this.ruleForm.pusher//推送处理人
          obj.waiter = this.ruleForm.waiter // 客服人员
          obj.creater = this.ruleForm.waiter // 客诉提交人员
          obj.questionDesc = this.eldiog.Faulttent
          obj.logisticPrice = ''
          obj.personLiable = ''
          obj.customerRequire = ''
          obj.maintenance = ''
          obj.supplierPhone = ''
          obj.supplierReAddress = ''
          if(this.CommodityArr.length){
            this.CommodityArr.forEach((item,index) =>{
              console.log(item)
              console.log(obj)
              if(item.goodsId === obj.goodsId){
                this.CommodityArr[index] = obj
              }else{
                this.CommodityArr.push(obj);
              }
            })
          }else{
            this.CommodityArr.push(obj);
          }
          this.eldiog.afternumber = ''
          this.eldiog.Faulttent = ''
        } else {
          return false;
        }
      });
    },
    afterdescribing(data) {
      this.staging = data;
      this.centerDialogVisible = true;
    },
    async shopfunc() {
      if (this.ruleForm.applierPhone) {
        let obj = {
          receivePhone: this.ruleForm.applierPhone
        };
        const { data } = await findorderlist(obj);
        this.tableData = data;
      } else {
        this.tableData = [];
      }
      this.showhidden = true;
    },
    //选择省份触发
    provincefunc(val) {
      this.cityArr = [];
      this.districtArr = [];
      this.ruleForm.city = "";
      this.ruleForm.district = "";
      getcity(val).then(res => {
        this.cityArr = res.data.list;
      });
    },
    //选择市触发
    cityfunc(val) {
      this.districtArr = [];
      this.ruleForm.district = "";
      getcity(val).then(res => {
        this.districtArr = res.data.list;
      });
    },
    //获取省
    _getprovince() {
      getprovince().then(res => {
        this.addressArr = res.data.list;
      });
    },
    // 售后要求选择
    afterfunc(val) {
      this.ruleForm.afterSaleGoodsVos[this.checknum].returnType =  this.CommodityArr[this.checknum].returnType
    },
     handleClosetrue() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let obj = {}
          obj.afterSaleParam = this.ruleForm
          obj.afterSaleComplainParam = this.CommodityArr
          const  data  = await updateaftersaleb(obj)
          if(data.code == 200){
             this.$message({
                message: data.message,
                type: 'success'
              });
            this.$emit("closediv", false);
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.clearValidate();
      this.$emit("closediv", false);
    },
    handleAvatarSuccess(res, file) {
      this.eldiog.thumbnailImgUrl.push(res.data.domain + res.data.filePath);
    }
  },
  created() {
    this._getprovince();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  mounted() {},
  watch: {
    dialog(val) {
      this.dialogVisible = val;
    },
    async passdata(val) {
      let { data } = await aftersaleetail(val.afterId);
      this.CommodityArr = data.afterSaleComplainVo
      data.afterSaleComplainVo.forEach(item => {
        data.afterSaleGoodsVos.forEach(val => {
          if(item.complainId === val.complainId){
            val.returnType = item.returnType
            item.goodsName = val.goodsName
            item.goodsAttr = val.goodsAttr
            item.complainQuantity = val.complainQuantity
          }
        })
      })
      console.log(data)
      this.ruleForm = data
    },
    "ruleForm.applierPhone": {
      handler: function(val) {
        if (val) {
          let obj = {
            receivePhone: val
          };
          findorderlist(obj).then(res => {
            this.tableData = res.data;
          });
        } else {
          this.tableData = [];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sales_div {
  padding: 0px;
  height: 53px;
  margin-top: 30px;
  height: 100%;
  padding: 16px 0;
  border: 1px solid rgba(215, 224, 241, 1);
  position: relative;
}
.sales_div:first-child {
  margin-top: 0;
}
.mcard .title {
  margin-left: 0;
}
.content_color {
  background: white;
}
.row_div {
  padding-right: 30px;
}
.mcard .title {
  margin-bottom: 0;
}
.row_div .el-row:first-child {
  margin-top: 25px;
}
.number_of {
  border: none;
  position: relative;
  padding-bottom: 0;
}
.number_of span {
  display: inline-block;
  width: 119px;
  height: 39px;
  text-align: center;
  line-height: 39px;
}
.border_btom {
  border: 1px solid rgba(215, 224, 241, 1);
}
.checked_span {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(215, 224, 241, 1);
  border-bottom: none;
  position: relative;
  top: 2px;
}
.top_btn {
  position: absolute;
  right: 0;
  width: 80px;
  height: 32px;
  border-radius: 5px;
  top: 16px;
  text-align: center;
}
.mar_top {
  margin-top: -25px;
}
.table_div {
  padding: 20px;
}
.top_nono {
  margin-top: 0px;
}
.checked_shop {
  top: -6px;
  float: left;
  z-index: 1;
}
.batch_btn {
  position: relative;
  top: -4px;
  left: 9px;
}
.hidden_div {
  padding: 19px;
  position: absolute;
  width: 900px;
  right: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(215, 224, 241, 1);
  box-shadow: 0px 0px 6px 0px rgba(76, 134, 244, 0.18);
  border-radius: 4px;
  z-index: 10;
  .triangle {
    position: absolute;
    right: 200px;
    top: -11px;
  }
}
.imgsize {
  width: 95px;
  height: 95px;
}
.tent_left {
  text-align: left;
  padding-left: 5px;
}
.el_tip {
  font-size: 14px;
  color: #ababab;
  line-height: 20px;
  margin-bottom: 20px;
}
.img_sizeload {
  width: 80px;
  height: 80px;
}
/deep/ .el-dialog__body{
  background: none;
  padding-top: 14px;
}
/deep/ .el-dialog__headerbtn{
  top:16px;
}
</style>