<template>
  <div>
    <!-- 审核退款单 -->
    <el-dialog
      title="审核退款单"
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
                  {{ruleForm.refundType | refund}}
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
                <el-col :span="8">
                  <el-form-item
                    label="审批人："
                    prop="resource"
                    label-width="100px"
                  >{{ ruleForm.roles && ruleForm.roles[0].auditUserName}}</el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="部门：" prop="organizeName" label-width="100px">
                    <el-select
                      v-model="ruleForm.organizeName"
                      placeholder="请选择"
                      @change="changeorgan"
                    >
                      <el-option
                        v-for="item in ruleForm.roles"
                        :key="item.organizeName"
                        :label="item.organizeName"
                        :value="item.organizeName"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="职位："
                    prop="resource"
                    label-width="100px"
                  >{{ruleForm.roleName}}</el-form-item>
                </el-col>
              </el-row>
           <el-row>
            <el-col :span="24">
              <el-form-item prop="" label="审核意见：" >
                <el-radio v-model="ruleForm.auditResult" label="1">同意</el-radio>
                <el-radio v-model="ruleForm.auditResult" label="2">不同意</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备  注：" ref="picList">
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="ruleForm.comment">
                </el-input>
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
import { checkafterrefundb , findrefunddetail } from "@/api/order";
import { async } from "q";
export default {
  props: {
    refunaudit: {
      type: Boolean
    },
    readuitdata:{
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
        auditResult:"1",
        comment:"",
      },
      rules: {
        picList: [
          { required: true, message: "请上传退款凭证", trigger: "blur" }
        ],
      },
      
    };
  },
  filters:{
    refund(val){
      switch(val){
        case '0':
          return '系统原路退款'
        case '1':
          return '微信支付'
        case '2':
          return '银行转账'
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          this.ruleForm = Object.assign(this.ruleForm,this.readuitdata)
          const obj = {
            afterId: this.ruleForm.afterId,
            afterRefundId:this.ruleForm.afterRefundId,
            auditResult: this.ruleForm.auditResult,
            comment: this.ruleForm.comment,
            complainId: this.ruleForm.complainId,
            roleId: this.ruleForm.roleId,
            roleName: this.ruleForm.roleName,
          }
          const data = await checkafterrefundb(obj);
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$emit("closereaudit", false);
            this.$parent.aftersalepageb();
          }
        } else {
          return false;
        }
      });
    },
    changeorgan(val) {
      this.ruleForm.roles.forEach(item => {
        if (item.organizeName === val) {
          this.ruleForm.roleName = item.roleName;
          this.ruleForm.roleId = item.roleId;
        }
      });
    },
    handleClose() {
      this.$emit("closereaudit", false);
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
    refunaudit(val) {
      this.dialogVisible = val;
    },
    async readuitdata(val){
      const { data }  = await findrefunddetail(val.afterRefundId)
      data.auditResult = '1'
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