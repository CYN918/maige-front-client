<template>
  <div>
    <!-- 申请退款单 -->
    <el-dialog
      title="确认退款"
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
                <el-form-item prop="refundAmount" label="退款金额：">
                  {{ruleForm.refundAmount}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="refundType" label="退款方式：">
                  {{ruleForm.payName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="12">
              <el-form-item prop="refundUser" label="退款人：" v-if="ruleForm.refundType != 0">
                {{ruleForm.refundName}}
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="openingBank" label="退款开户行：" v-if="ruleForm.refundType != 0">
                {{ruleForm.openingBank}}
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="refundAccount" label="账号：" v-if="ruleForm.refundType != 0">
                 {{ruleForm.refundAccount}}
              </el-form-item>
            </el-col>
          </el-row>
          <div class="color_div"></div>
           <el-row>
            <el-col :span="24">
              <el-form-item prop="" label="退款说明：" >
                <el-input v-model="ruleForm.comment" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="picList" label="退款凭证：" ref="picList">
                <el-upload
                    accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                    :action="action"
                    list-type="picture-card"
                    :on-success="handlePictureCardPreview">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisibleshow">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
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
import { confirmrefundb , findrefunddetail } from "@/api/order";
import { async } from "q";
export default {
  props: {
    refundsureshow: {
      type: Boolean
    },
    refundsuredata:{
      type:Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisibleshow:false,
      action:'',
      dialogImageUrl:'',
      ruleForm: {
        picList:[],
        comment:"",
      },
      rules: {
        picList: [
          { required: true, message: "请上传退款凭证", trigger: "blur" }
        ],
      },
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
          const data = await confirmrefundb(this.ruleForm);
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$emit("closeresure", false);
            this.$parent.aftersalepageb();
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$emit("closeresure", false);
    },
    handlePictureCardPreview(res) {
      this.$refs.picList.clearValidate();
      this.ruleForm.picList.push(res.data.domain+res.data.filePath)
    }
  },
  created(){
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
  },
  watch: {
    refundsureshow(val) {
      this.dialogVisible = val;
    },
    async refundsuredata(val){
      const { data }  = await findrefunddetail(val.afterRefundId)
      data.picList = []
      data.comment = ''
      this.ruleForm = data
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
.color_div{
  height: 21px;
  width: 800px;
  background: #ebf4fe;
  margin-left: -41px;
  margin-bottom: 26px;
}
</style>