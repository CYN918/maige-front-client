<template>
  <div>
    <!-- 退件入库单 -->
    <el-dialog
      title="签收快递"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose"
    >
      <div>
        是否确认签收快递
        <!-- <el-form
          label-width="130px"
          class="demo-ruleForm"
          :rules="rules"
          ref="ruleForm"
          :model="ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop label="订单号：">{{ruleForm.afterSaleSn}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop label="产品名称：">{{ruleForm.goodsName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop label="品牌名称：">{{ruleForm.brandName}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop label="型号：">{{ruleForm.modelNumber}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop label="S K U：">{{ruleForm.goodsAttr}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop label="货号：">{{ruleForm.goodsSn}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop label="退件快递公司：">{{ruleForm.returnShipping}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop label="退件快递单号：">{{ruleForm.returnLogisticNo}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="logisticAmountType" label="退件快递费用：">
                <el-select
                  v-model="ruleForm.logisticAmountType"
                  placeholder="请选择"
                  size="medium"
                  @change="changetype"
                >
                  <el-option
                    v-for="item in payArr"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="returnLogisticAmount" label="金额：" ref="mount">
                <el-input v-model="ruleForm.returnLogisticAmount" placeholder="请输入内容" type="number" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="returnPackageDesc" label="退件说明：">
                <el-input
                  type="textarea"
                  v-model="ruleForm.returnPackageDesc"
                  placeholder="请输入内容"
                  size="medium"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userreceivec } from "@/api/sales";
export default {
  props: {
    productdata: {},
    productshow: {}
  },
  data() {
    return {
      sure: true,
      dialogVisible: false,
      ruleForm: {
        returnLogisticAmount: "",
        logisticAmountType: "",
        returnPackageDesc: ""
      },
      rules: {
        logisticAmountType: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        returnLogisticAmount: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ]
      },
      payArr: [{ name: "客服已付", value: 0 }, { name: "到付", value: 1 }],
      refundwayArr: [
        { name: "系统原路退款" },
        { name: "微信支付" },
        { name: "银行转账" }
      ]
    };
  },
  methods: {
    changetype(val) {
      if (val === 0) {
        this.rules.returnLogisticAmount[0].required = false;
      } else {
        this.rules.returnLogisticAmount[0].required = true;
      }
    },
    async submit() {
          const data = await userreceivec(this.ruleForm.complainId);
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$emit("closeproduct", false);
            this.$parent.aftergoodslistc(this.ruleForm)
          }
    },
    handleClose() {
      this.$emit("closeproduct", false);
    }
  },
  watch: {
    productshow(val) {
      this.dialogVisible = val;
    },
    productdata(val) {
      this.ruleForm = Object.assign(this.ruleForm, val);
    }
  }
};
</script>
<style  lang="stylus" scoped>
.ball {
  width: 19px;
  height: 19px;
  background: rgba(64, 158, 255, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  z-index: 10;
}
.big_div {
  display: flex;
}
.cai_span {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.shen_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 158, 255, 1);
}
.div_time {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(201, 201, 201, 1);
  margin-top: 5px;
}
.bor_left {
  border-left: 4px solid #409eff;
  padding-left: 34px;
  min-height: 115px;
  border-radius: 2px;
  position: relative;
  left: -12px;
}
.left_none {
  border-left: 4px solid #f7faff;
}
div[state="4"] {
  border-left: none;
}
.div_big {
  padding-left: 59px;
}
.shenwei_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fe1b1b;
}
.timeline_div {
  padding-left: 59px;
}
</style>