<template>
  <div class="orderdetailContinor details">
    <header>
      <span class="orderdetails">订单详情</span>
    </header>
    <div class="tradingStatus">
      <p class="status">
        <span>交易状态: </span>
        <span>{{status}}</span>
      </p>
      <div class="logisticsInformation">
        <p>物流信息:</p>
        <el-table :data="tableData" stripe style="width: 100%" border>
          <el-table-column prop="shippingName" label="物流公司" align="center">
          </el-table-column>
          <el-table-column prop="logisticsNo" label="快递单号" align="center">
          </el-table-column>
          <el-table-column prop="deliveryTime" label="发货时间" align="center">
          </el-table-column>
        </el-table>
        <p>订单信息:</p>
        <el-table :data="tableData2" stripe style="width: 100%" border>
          <el-table-column prop="userName" label="下单人用户名" align="center">
            </el-table-column>
          <el-table-column prop="orderTime" label="用户下单时间"  align="center">
          </el-table-column>
          <el-table-column prop="paymentTime" label="用户支付时间" align="center">
          </el-table-column>
          <el-table-column prop="price" label="订单总价"  align="center">
          </el-table-column>
          <el-table-column prop="valuePayment" label="用户支付方式" align="center">
          </el-table-column>
          <el-table-column prop="paymentAmount" label="站点支付金额" align="center">
          </el-table-column>
          <el-table-column prop="sitePaymentTime" label="站点支付时间" align="center">
          </el-table-column>
        </el-table>
        <p>收货人信息:</p>
        <el-table :data="tableData3" stripe style="width: 100%" border>
          <el-table-column prop="consignee" label="收货人" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="收货人手机号"  align="center">
          </el-table-column>
          <el-table-column prop="shippingAddress" label="收货地址"  align="center">
          </el-table-column>
        </el-table>
        <p>订单信息来源:</p>
        <el-table :data="tableData1" stripe style="width: 100%" border>
          <el-table-column prop="systemId" label="来源应用"  align="center">
          </el-table-column>
          <el-table-column prop="systemName" label="站点名称"  align="center">
          </el-table-column>
        </el-table>
        <p>备注信息:</p>
        <div class="orderRemarks">
          {{tableData3[0].orderRemarks}}
        </div>
      </div>
    </div>
    <!-- 商品详情 -->
    <div class="details">
      <el-table :data="tableData5" stripe style="width: 100%" border>
        <el-table-column prop="" label="商品详情" align="center">
          <template slot-scope="scope">
            <div class="detailsImg">
              <img :src="scope.row.thumbnailImgUrl" alt="">
              <span>
												{{scope.row.goodsName}}
										</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="goodsPrice" label="商城价" align="center">
        </el-table-column>
        <el-table-column prop="quantity" label="数量"  align="center">
        </el-table-column>
        <el-table-column prop="specialPrice" label="结算价"  align="center">
        </el-table-column>
        <el-table-column prop="goodsAmount" label="合计"  align="center">
        </el-table-column>
        <el-table-column label="物流公司" prop="shippingName" align="center"></el-table-column>
        <el-table-column label="物流状态" prop="shippingInstructions" align="center"></el-table-column>
      </el-table>
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
import Package from './package/package.vue';
import Reason from './package/reason';

export default {
  components: {
    Package,
    Reason,
  },
  data() {
    return {
      num: 0, // 展示不同的包裹信息
      status: '',
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: [{
        pointsMall: '积分商城',
        siteName: '招商银行礼遇商城',
      }],
      tableData5: [],
      tableData6: [], // 底部包裹物流详情
      orderId: '', // 订单id
    };
  },
  methods: {
    parcel(val) {
      this.num = val;
    },
    async orderDetails(id) {
      try {
        const res = await orderDetails(this.orderId);
        this.status = res.data.statusMsg
        this.tableData = res.data.logisticsVoList;
        this.tableData2.push({
          userName:res.data.userName,
          orderTime: res.data.createTime,
          paymentTime: res.data.payTime,
          price: res.data.totalAmount,
          valuePayment: res.data.payName,
          paymentAmount: res.data.orderAmount,
          sitePaymentTime: res.data.payTime,
        });
        this.tableData3.push(res.data) 
        this.tableData5 = res.data.orderGoodsList;
        this.tableData6 = res.data.logisticsVoList;
        this.tableData6.forEach((item, index) => {
          item.logisticsInfoList.forEach((data, index2) => {
            if (index2 == 0) {
              data.color = '#4A99FA';
            }
          });
        });
        if (res.code == 202) {
          this.$message({
            message: res.message,
            type: 'warning',
          });
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  created() {
    this.orderId = this.$route.query.orderId;
    this.orderDetails();
  },
};
</script>
<style lang="stylus" scoped>
  .orderdetailContinor
    margin-left 20px
    header
      height: 54px;
      line-height 52px
      background: rgba(255, 255, 255, 1)
      border: 1px solid rgba(215, 224, 241, 1)
      .orderdetails
        border-left 4px solid #4A99FA
        padding-left 21px
        font-weight 400
        font-family Microsoft YaHei
        font-size: 18px;
        color: rgba(51, 51, 51, 1);
    .tradingStatus
      padding 0 15px
      padding-bottom 25px
      box-sizing border-box
      background rgba(255, 255, 255, 1)
      border 1px solid rgba(215, 225, 241, 1)
      margin-top 20px
      ffont-size 14px
      font-family Microsoft YaHei
      font-weight 400
      color rgba(51, 51, 51, 1);
      .status
        margin 15px 0
      .logisticsInformation
        p
          margin 30px 0 15px 0

  .package
    margin-top 30px
    margin-bottom 30px
    .parcel
      cursor pointer
      display inline-block
      width: 148px;
      height: 43px;
      display flex
      align-items center
      justify-content center
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    .cheked
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(215, 225, 241, 1);
      border-bottom none
      position relative
      top 1px

  .addreesContiner
    background: white
    border: 1px solid rgba(215, 225, 241, 1);
    .addrees
      margin-top 30px

  .orderdetails11 {
    border-left: 4px solid #4a99fa;
    font-weight: 400;
    font-family: Microsoft YaHei;
    font-size: 16px;
    color: #333;
    position: relative;
    padding: 5px 0;
    padding-left: 26px;
    top: 8px;
  }

  .backMessge {
    width: 95%;
    height: 38px;
    background: #F3F7FC;
    position: relative;
    top: 23px;
    left: 21px;
    display: flex;
    align-items center
    padding-left 12px
  }
  .people {
    margin-right: 15px;
  }

  .details
    margin-top 30px
    margin-bottom: 30px;
    .detailsImg
      display flex
      align-items center
      img
        width 60px
        height 60px

  .top_span {
    display: flex
  }
  .orderRemarks{
    width:100%;
    padding: 16px 0;
    border: 1px solid #EBEEF5;
    background:white;
    padding-left: 10px;
  }
</style>
