<template>
  <div>
    <!-- 申请退款单 -->
    <el-dialog
      title="申请退款单"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          label-width="120px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="" label="退款单号：">{{ruleForm.refundSn}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="" label="支付方式：">{{ruleForm.payName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="refundType" label="退款方式：">
                  <el-select placeholder="请选择" size="medium" v-model="ruleForm.refundType">
                    <el-option
                      v-for="item in refundwayArr"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="refundAmount" label="退款金额：">
                  <el-input v-model="ruleForm.refundAmount" placeholder="请输入内容" size="medium"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="12">
              <el-form-item prop="refundUser" label="退款人：" v-if="ruleForm.refundType != 0">
                <el-input v-model="ruleForm.refundUser" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="openingBank" label="退款开户行：" v-if="ruleForm.refundType != 0">
                <el-input v-model="ruleForm.openingBank" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="refundAccount" label="账号：" v-if="ruleForm.refundType != 0">
                <el-input v-model="ruleForm.refundAccount" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item prop="refundAccount" label="退件说明：">
                <el-input v-model="ruleForm.refundAccount" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { applyreturn } from "@/api/order";
import { async } from "q";
export default {
  props: {
    refundshow: {
      type: Boolean
    },
    refunddata: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {},
      rules: {
        payName: [
          { required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        refundType: [
          { required: true, message: "请选择退款方式", trigger: "blur" }
        ],
        refundUser: [
          { required: true, message: "请输入退款人", trigger: "blur" }
        ],
        openingBank: [
          { required: true, message: "请输入退款开户行", trigger: "blur" }
        ],
        refundAccount: [
          { required: true, message: "请输入账号", trigger: "blur" }
        ]
      },
      payArr: [
        { name: "积分兑换" },
        { name: "专属费用" },
        { name: "微信支付" },
        { name: "银行卡支付" }
      ],
      refundwayArr: [
        { name: "系统原路退款", value: 0 },
        { name: "微信支付", value: 1 },
        { name: "银行转账", value: 2 }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm = Object.assign(this.ruleForm,this.refunddata)
          const data = await applyreturn(this.ruleForm);
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$emit("closerefund", false);
            this.$parent.aftersalepageb();
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      
      this.$emit("closerefund", false);
    }
  },
  watch: {
    refundshow(val) {
      this.dialogVisible = val;
    },
    refunddata(val){
      this.ruleForm = Object.assign(this.ruleForm,val)
    }
  }
};
</script>
<style  lang="scss" scoped>
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