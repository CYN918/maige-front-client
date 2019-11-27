<template>
  <div class="progressBarContainer">
    <div class="progressBar">
      <!-- <el-steps :active="active" align-center>
        <el-step title="输入原始密码"></el-step>
        <el-step title="输入新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps> -->
    </div>
    <div class="resetPassWord">
      <el-form
        :model="ruleForm2"
        status-icon
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm form"
      >
        <p>
          <img src="@/assets/images/person_center/image/密码@2x.png" alt />
          <span>输入原始密码 :</span>
          <el-form-item label prop="age">
            <el-input type="password" v-model="ruleForm2.age" auto-complete="off" class="input"></el-input>
          </el-form-item>
        </p>
        <p>
          <img src="@/assets/images/person_center/image/密码@2x.png" alt />
          <span>输入新密码 :</span>
          <el-form-item label prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" class="input"></el-input>
          </el-form-item>
        </p>
        <p>
          <img src="@/assets/images/person_center/image/密码@2x.png" alt />
          <span>确认新密码 :</span>
          <el-form-item label prop="checkPass">
            <el-input
              type="password"
              v-model.number="ruleForm2.checkPass"
              auto-complete="off"
              class="input"
            ></el-input>
          </el-form-item>
        </p>
        <el-button type="primary" @click="submitForm('ruleForm2')" class="btn">完成</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import { editUser } from "@/api/index";
import { handleCrypt, getCookie } from "@/assets/utils/utils";
import { async } from "q";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("密码不能为空"));
      } else if (value != this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    return {
      active: 1, //默认进度条在第一个步骤
      ruleForm2: {
        age: "",
        pass: "",
        checkPass: ""
      },
      userData: {},
      rules2: {
		age: [{ validator: checkAge, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      }
    };
  },
  methods: {
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const params = {
            userId: this.userData.userId,
            password: handleCrypt.encrypt(this.ruleForm2.age),
            newPassword: handleCrypt.encrypt(this.ruleForm2.pass)
          };
		  const data = await editUser(params);
		  console.log(data)
		  if(data.code != 200){
			  this.$message.error(data.message);
		  }else{
			  this.$message({
			message: data.message,
			type: 'success'
			});
		  }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.userData = JSON.parse(getCookie("userData"));
    console.log(this.userData);
  }
};
</script>
<style lang="stylus" scoped>
.resetPassWord {
  position: relative;
  margin-bottom: 132px;
  margin-top: 50px;
  .form {
    width: 368px;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    p {
      font-size: 19px;
      color: rgba(102, 102, 102, 1);

      span {
        text-align: right;
        display: inline-block;
        width: 135px;
      }

      .input {
        box-sizing: border-box;
        float: right;
        width: 186px;
        height: 50px;
        margin-top: -36px;
      }

      &:nth-child(2) {
        margin: 34px 0;
      }
    }

    .btn {
      width: 140px;
      height: 50px;
      text-align: center;
      color: white;
      font-size: 20px;
      border-radius: 4px;
      font-weight: bold;
      margin: 54px 0 0 102px;
      background: rgba(76, 134, 244, 1);
    }
  }
}
</style>
