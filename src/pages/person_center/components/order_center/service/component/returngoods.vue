<template>
  <div>
    <!-- 审核 -->
    <el-dialog
      title="审核跟踪状态："
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="供应商联系人：">
                <el-input v-model="ruleForm.afterSaleGoodsVos[0].supplierConsignee" size="medium"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供应商联系电话：">
                <el-input v-model="ruleForm.afterSaleGoodsVos[0].supplierPhone" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="供应商地址：">
                <el-input v-model="ruleForm.afterSaleGoodsVos[0].supplierReAddress" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="退货物流公司：">
                <el-select
                  v-model="ruleForm.returnShippingId"
                  size="medium"
                  placeholder="请选择"
                  style="width:100%"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.shippingId"
                    :label="item.shippingName"
                    :value="item.shippingId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="退货物流单号：">
                <el-input v-model="ruleForm.logisticsNo" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="费用：">
                <el-input v-model="ruleForm.logisticPrice" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
import { aftersaleetail, userreturngoods, shippingCompany } from "@/api/order";
export default {
  props: {
    dialog: {},
    returndata: {}
  },
  data() {
    return {
      dialogVisible: false,
      options: [], // 快递公司
      ruleForm: {
        name: "",
        afterSaleGoodsVos: [
          { supplierConsignee: "", supplierPhone: "", supplierReAddress: "" }
        ]
      },
      rules: {},
      arr: []
    };
  },
  methods: {
    async submit() {
      const obj = {
        afterId: Number(this.ruleForm.afterId),
        complainId: Number(this.ruleForm.complainId),
        logisticsNo: this.ruleForm.logisticsNo,
        returnShippingId: Number(this.ruleForm.returnShippingId),
        logisticPrice: Number(this.ruleForm.logisticPrice)
      };
      const data = await userreturngoods(obj);
    },
    handleClose(val) {
      this.$emit("closereturn", false);
    },
    async shippingCompany() {
      const { data } = await shippingCompany();
      this.options = data;
    }
  },
  watch: {
    dialog(val) {
      this.dialogVisible = val;
    },
    async returndata(val) {
      let { data } = await aftersaleetail(val.afterId);
      data.logisticsNo = "";
      data.returnShippingId = "";
      data.logisticPrice = "";
      data.complainId = val.complainId;
      this.ruleForm = data;

      this.shippingCompany();
    }
  }
};
</script>
<style  lang="scss" scoped>
</style>