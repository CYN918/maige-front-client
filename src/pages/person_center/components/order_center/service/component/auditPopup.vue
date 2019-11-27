<template>
  <div class="aduit_dilog">
    <!-- 审核 -->
    <el-dialog title="审核" :visible.sync="dialogVisible" width="820px" :before-close="handleClose">
      <div>
        <el-form
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
        >
          <div>
            <div class="mcard sales_div">
              <div>
                <div class="goods-fitter">
                  <div class="search-wrapper1">
                    <h4 class="title">提交信息</h4>
                  </div>
                </div>
              </div>
            </div>
            <el-form-item label="售后单号：" prop="resource">{{ruleForm.afterSaleSn}}</el-form-item>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="提交人："
                  prop="resource"
                  label-width="100px"
                >{{ruleForm.sumbitUserName}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="部门："
                  prop="resource"
                  label-width="100px"
                >{{ruleForm.sumbitOrganizeName}}</el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="职位："
                  prop="resource"
                  label-width="100px"
                >{{ruleForm.sumbitRoleName}}</el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="提交说明：" prop="resource">{{ruleForm.questionDesc}}</el-form-item>
          </div>
          <div class="bg_color"></div>
          <div>
            <div class="mcard sales_div">
              <div>
                <div class="goods-fitter">
                  <div class="search-wrapper1">
                    <h4 class="title msg_title">审批信息</h4>
                    <div class="right_btn">
                      <el-button type="primary" size="small" @click="approvalsFunc">查看审批进度</el-button>
                      <el-button type="primary" size="small">查看详情</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
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
            </div>
            <el-form-item label="审批意见：" required>
              <el-row>
                <el-col :span="11">
                  <el-form-item prop="auditResult">
                    <el-radio-group v-model="ruleForm.auditResult">
                      <el-radio label="1">同意</el-radio>
                      <el-radio label="2">不同意</el-radio>
                      <el-radio label="3">转客服助理</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item prop="sysUserId" ref="sysUserId" v-if="ruleForm.auditResult == 3">
                    <treeselect
                      style="width:350px;line-height:20px"
                      :options="options"
                      search-nested
                      :disable-branch-nodes="true"
                      placeholder="请选择客服人员"
                      v-model="ruleForm.sysUserId"
                      :load-options="loadOptions"
                      @select='selesys'
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="审批说明：" prop="resource">
              <el-input type="textarea" :rows="3" placeholder="请输入说明" v-model="ruleForm.comment"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose()" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <approvals :dialog="approvalsShow" :progressdata="progressdata" @closeapproval="changeapproval"></approvals>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/c.fyuanai.com/vue-treeselect.css";
import { checkaftersaleb, findsubmitdetail } from "@/api/order";
import { getchildnode } from "@/api/permissions/index";
import { getSupplierbinduser } from "@/api/supplier/index";

import approvals from "./approvals";
export default {
  props: {
    diaauditlog: {},
    storedata: {}
  },
  data() {
    return {
      progressdata: {},
      dialogVisible: false,
      options: [],
      sysobj:{},
      approvalsShow: false, // 审批流程弹窗
      radio: "",
      ruleForm: {
        sysUserId:null,
        resource: "1", //审核状态
        textarea: "" // 审核原因
      },
      rules: {
        organizeName: [
          { required: true, message: "请选择部门", trigger: "change" }
        ],
        auditResult: [
          { required: true, message: "请选择审批意见", trigger: "change" }
        ],
        sysUserId:[
          { required: true, message: "请选择客服人员", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    async loadOptions({ action, parentNode, callback, instanceId }) {
      const data = await getchildnode(parentNode.queryid);
      const arr = [];
      this.transleteData(data.data, arr);
      this.IterationDelateMenuChildren(arr);
      parentNode.children = arr;
      const data2 = await getSupplierbinduser(parentNode.queryid);
      if (data2.data.length) {
        data2.data.forEach(item => {
          item.id = item.sysuserId;
          item.label = item.sysuserName;
        });
        parentNode.children = parentNode.children.concat(data2.data);
      }
    },
    selesys(node, instanceId){
      this.$refs.sysUserId.clearValidate();
      this.sysobj = node
    },
    changeorgan(val) {
      this.ruleForm.roles.forEach(item => {
        if (item.organizeName === val) {
          this.ruleForm.roleName = item.roleName;
          this.ruleForm.roleId = item.roleId;
        }
      });
    },
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          const obj = {
            afterId: this.storedata.afterId,
            afterRefundId: this.storedata.afterRefundId,
            auditResult: this.ruleForm.auditResult,
            comment: this.ruleForm.comment,
            complainId: this.storedata.complainId,
            roleId: this.ruleForm.roleId,
            sysUserId: this.sysobj.sysuserId,
            sysUserName: this.sysobj.sysuserName
          };
          const data = await checkaftersaleb(obj);
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$emit("closeaudit", false);
            this.$parent.aftersalepageb();
            this.$ref.ruleForm.clearValidate()
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$emit("closeaudit", false);
      this.$ref.ruleForm.clearValidate()
    },
    // 审批流程弹窗
    async approvalsFunc() {
      this.progressdata = this.storedata;
      this.approvalsShow = true;
    },
    changeapproval(val) {
      this.approvalsShow = val;
    },
    async getchildnode() {
      const val = await getchildnode(0);
      this.transleteData(val.data, this.options);
      this.IterationDelateMenuChildren(this.options);
    },
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: "o" + item.organizeId,
          queryid: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,
          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      // console.log(arr)
      // if (arr.length) {
      //   for (let i in arr) {
      //     if (arr[i].children.length) {
      //       this.IterationDelateMenuChildren(arr[i].children);
      //     } else {
      //       delete arr[i].children;
      //     }
      //   }
      // }
      // return arr;
    }
  },
  created() {},
  components: {
    approvals,
    Treeselect
  },
  watch: {
    diaauditlog(val) {
      this.dialogVisible = val;
    },
    async storedata(val) {
      const { data } = await findsubmitdetail(val.complainId);
      this.ruleForm = data;
      this.options = []
      this.getchildnode();
    }
  }
};
</script>

<style lang='scss' scoped>
.bg_color {
  height: 20px;
  width: 100%;
  background: #ebf4fe;
  width: 790px;
}
.msg_title {
  float: left;
}
.search-wrapper1 {
  position: relative;
}
.right_btn {
  margin-left: 500px;
}
</style>
