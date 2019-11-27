<template>
  <div>
    <!-- 发货弹窗 -->
    <el-dialog title="发货" :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="130px"
          class="demo-ruleForm"
        >
          <el-form-item label="商家联系人：">
            {{storedata.supplierConsignee}}
          </el-form-item>
          <el-form-item label="商家联系电话：">
            {{storedata.supplierPhone}}
          </el-form-item>
          <el-form-item label="商家地址：">
            {{storedata.supplierAddress}}
          </el-form-item>
          <el-form-item label="物流公司：" prop="shippingId">
            <el-select v-model="ruleForm.shippingId" size="medium" placeholder="请选择" style="width:100%">
              <el-option
                v-for="item in options"
                :key="item.shippingId"
                :label="item.shippingName"
                :value="item.shippingId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：" prop="logisticsNo">
            <el-input v-model="ruleForm.logisticsNo" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="快递费：" required>
            <el-col :span="8">
              <el-form-item prop="containLogisticPrice">
                <el-select v-model="ruleForm.containLogisticPrice" placeholder="请选择" size="medium" @change="courierwayfunc">
                  <el-option label="已付" :value="0"></el-option>
                  <el-option label="到付" :value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11" style="margin-left:10px;">
              <el-form-item prop="logisticPrice" ref="logisticPrice">
                <el-input v-model="ruleForm.logisticPrice"  size="medium" placeholder="请填写"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="上传快递面单："  prop="shippingPics" ref="shippingPics">
            <el-upload
              accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
              :action="action"
              list-type="picture-card"
              :on-success="uploadattachment">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
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
// import { shippingCompany , supplierdelivery } from "@/api/order/index";
import { shippingCompany , userreturngoods } from "@/api/sales";
import { throttleTipPop } from "@/assets/utils/utils";

export default {
  props: {
    deliveryshow: {},
    storedata: {}
  },
  data() {
    return {
      dialogVisible: false,
      options: [], // 快递公司
      action: "",
      ruleForm: {
        containLogisticPrice: "",
        logisticPrice: "",
        shippingPics:[]
      },
      rules: {
        shippingId: [
          { required: true, message: "请选择快递公司", trigger: "change" }
        ],
        logisticsNo: [
          { required: true, message: "请输入快递单号", trigger: "blur" }
        ],
        containLogisticPrice:[
          { required: true, message: "请选择快递支付方式", trigger: "change" }
        ],
        logisticPrice: [
          { required: true, message: "请输入快递费用", trigger: "blur" }
        ],
        shippingPics:[
          { required: true, message: "请上传快递面单", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    courierwayfunc(val){
      if(val == 0 ){
        this.rules.logisticPrice[0].required = false
        this.$refs.logisticPrice.clearValidate()
      }else{
        this.rules.logisticPrice[0].required = true
      }
    },
    submit(){
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm.afterId = this.storedata.afterId
          this.ruleForm.complainId =this.storedata.complainId 
          this.ruleForm.afterGoodsId =this.storedata.afterGoodsId
          this.ruleForm.containLogisticPrice = this.ruleForm.containLogisticPrice
          const data = await userreturngoods(this.ruleForm)
          if(data.code == 200 ){
            this.$message({
              message: data.message,
              type: 'success'
            });
            this.$parent.aftersalepagec();
            this.$emit("closedelivery", false);
          }else{
            throttleTipPop(this,'error',data.message)
          }
        } else {
          return false;
        }
      });
    },
    handleClose(val) {
      this.$refs.ruleForm.clearValidate()
      this.$emit("closedelivery", false);
    },
    async shippingCompany() {
      const { data } = await shippingCompany();
      this.options = data;
    },
    uploadattachment(res){
      this.$refs.shippingPics.clearValidate()
      this.ruleForm.shippingPics.push(res.data.domain + res.data.filePath) 
    }
  },
  created() {
    this.shippingCompany();
    this.action = this.a_URL + '/api/open/c/b2b2c/fileservice/uploadFile?'
  },
  watch: {
    deliveryshow(val) {
      this.dialogVisible = val;
    },
    storedata(val) {
      console.log(val);
    }
  }
};
</script>

<style lang='stylus' scoped>

</style>