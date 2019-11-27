<template>
  <div class="persona">
    <el-form action label-width="110px" :rules="rules" :model="form" ref="ruleForm">
      <div class="personaContarner">
        <div class="accountNumber">
          <img src="@/assets/images/person_center/image/账号管理@2x.png" alt />
          <span>账号 :</span>
          <span class="num">{{accountNumber}}</span>
        </div>
        <div class="nickname">
          <p class="nickname_lt">
            <img src="@/assets/images/person_center/image/账号@2x.png" alt />
            <span>昵称 :</span>
          </p>
          <div class="nickname_rt">
            <el-form-item label="" prop="nickname">
              <el-input v-model="form.nickname" placeholder="请输入内容" size="small"></el-input>
            </el-form-item>
            <span class="tip_span">限2-20个字符，支持中文、字母、数字~</span>
          </div>
        </div>
        <div class="photo">
          <p>
            <img src="@/assets/images/person_center/image/上传头像@2x.png" alt />
            <span>头像 : </span>
          </p>
          <div class="updata">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess">
              <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="el_container">
              <div slot="tip" class="el-upload__tip">选择一张jpg/png格式的图片上传，图片文件大小控制在1M内</div>
              <div slot="tip" class="el-upload__tip">头像尺寸 160*160</div>
              <!-- <el-button size="small" type="primary" style="float: left">选择照片</el-button> -->
            </div>
          </div>
        </div>

        <div class="gender">
          <p class="gender_lt">
            <img src="@/assets/images/person_center/image/性别区分@2x.png" alt />
            <span>性别 : </span>
          </p>
          <div class="radio">
            <el-radio-group v-model="sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="birthday">
          <p class="birthday_lt">
            <img src="@/assets/images/person_center/image/生日关怀@2x.png" alt />
            <span>生日 : </span>
          </p>
          <div class="time">
            <el-date-picker
              v-model="value"
              type="date"
              size='small'
              valueFormat="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期">
            </el-date-picker>
            <p class="birthdayRight">填生日有惊喜哦~</p>
          </div>
        </div>

        <div class="like">
          <p class="like_lt">
            <img src="@/assets/images/person_center/image/生日关怀@2x.png" alt />
            <span class="likeb">爱好</span>
            <span class="maohao">: </span>
            <span class="likes">请选择您感兴趣的分类，给您最精准的推荐</span>
          </p>
          <ul class="like_itme">
            <li v-for="(item,index) in likeArr" :key="index" @click="toggle(index)">
              <div :class="item.check?'like_list active':'like_list'">{{item.title}}</div>
              <div class="selected" v-show="item.check"></div>
              <i class="el-icon-check" v-show="item.check"></i>
            </li>
          </ul>
        </div>
        <div class="btnContarner">
          <button @click="onSubmit('ruleForm')" class="btn">完成</button>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { findCurrentUserInfo, editUser, reqProNameList } from '@/api/index';
import { throttleTipPop } from '@/assets/utils/utils';

export default {
  data() {
    return {
      userId: -1,
      dialogImageUrl: '',
      dialogVisible: false,
      sex: '0',
      text: '',
      accountNumber: 1172585514, // 账号
      num: '0',
      form: {
        nickname: '',
      },
      addStyle: [],
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
      },
      action: '',
      fileList: [
        { url: '@/assets/images/person_center/image/生日关怀@2x.png"' },
      ],
      // 年
      options1: [
        {
          value: '选项1',
          label: '2019',
        },
        {
          value: '选项2',
          label: '2018',
        },
      ],
      // 月
      options2: [
        {
          value: '选项1',
          label: '12',
        },
        {
          value: '选项2',
          label: '11',
        },
      ],
      // 日
      options3: [
        {
          value: '选项1',
          label: '1',
        },
        {
          value: '选项2',
          label: '2',
        },
      ],
      value: '',
      likeArr: [
        { title: '家用电器', check: false },
      ],
    };
  },

  methods: {
    // 头像上传前文件判断
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = res.data.domain + res.data.filePath;
      // this.dialogVisible = true;
    },
    toggle(index) {
      this.num = index;
      const check = this.likeArr[index].check;
      this.likeArr[index].check = check !== true;
    },
    // 提交表单
    onSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const selectCategory = this.likeArr.filter(item => item.check).map(item => item.barId);
          const params = {
            userId: this.userId,
            userName: this.form.nickname,
            sex: this.sex,
            hobbyCategoryIds: selectCategory,
            headImgUrl: this.dialogImageUrl,
            birthday: this.value,
          };
          const data = await editUser(params);
          throttleTipPop(this, 'success', '修改成功')
        } else {
          throttleTipPop(this, 'error', '请填写合理的信息')
          return false;
        }
      });
    },

    // 上传照片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    async initUserInfo() {
      const { data } = await findCurrentUserInfo();

      this.userId = data.userId;
      this.accountNumber = data.userAccount;
      this.form.nickname = data.userName;
      this.dialogImageUrl = data.headImgUrl;
      this.sex = data.sex;
      this.value = data.birthday

      // 获取分类类别
      const hobbyCategoryIds = (data.extend.hobbyCategoryIds || '').split(',');
      this.likeArr = this.likeArr.map((item) => {
        const barId = item.barId;
        return {
          ...item,
          check: hobbyCategoryIds.includes(`${barId}`),
        }
      })
    },

    async initGoodsCategory() {
      const { data } = await reqProNameList(1);
      if (data && data.length > 0) {
        this.likeArr = data.map(item => ({ title: item.barName, check: false, barId: item.barId }))
      }
    },
  },

  async mounted() {
    await this.initGoodsCategory();
    this.initUserInfo();
    this.action = this.a_URL + '/api/open/c/b2b2c/fileservice/uploadFile?'
  },
};
</script>
<style lang="stylus" scoped>
.persona {
  overflow: hidden;

  .personaContarner {
    box-sizing: border-box;
    background: white;
    padding-left: 108px;
    padding-top: 66px;

    .accountNumber {
      display: flex;
      align-items: center;
      margin-bottom: 38px;

      img {
        width: 31px;
        height: 27px;
      }

      span {
        color: rgba(51, 51, 51, 1);
        font-size: 18px;
        margin-left: 16px;
        vertical-align: bottom;
      }
    }

    .nickname {
      margin-bottom: 33px;
      display: flex;
      align-items: ceil;
      position:relative;
      .nickname_lt {
        position: absolute;
        top: 6px;
        img {
          width: 31px;
          height: 27px;
        }

        span {
          color: rgba(51, 51, 51, 1);
          font-size: 18px;
          margin-left: 9px;
          vertical-align: middle;
        }
      }

      .nickname_rt {
        input[type='text'] {
          border: 1px solid rgba(204, 204, 204, 1);
          width: 188px;
          height: 25px;
          box-sizing: border-box;
          padding: 0 5px;
        }

        span {
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }

    .photo {
      margin-bottom: 33px;
      display: flex;

      p {
        img {
          width: 31px;
          height: 27px;
        }

        span {
          margin-left: 9px;
          font-size: 18px;
          color: #333;
          vertical-align: middle;
        }
      }

      .updata {
        display: flex;
        .el_container {
          margin-left: 20px;

          .el-upload__tip {
            font-size: 16px;
            color: rgba(153, 153, 153, 1);

            &:nth-child(2) {
              margin: 25px 0;
              text-align: left;
            }
          }
        }

        .updataImg {
          margin-left: 14px;
          width: 120px;
          height: 120px;
        }
      }
    }

    .gender {
      margin-bottom: 33px;
      display: flex;
      align-items: center;
      .gender_lt {
        img {
          width: 31px;
          height: 27px;
        }

        span {
          margin-left: 9px;
          font-size: 18px;
          color: #333;
          vertical-align: middle;
        }
      }

      .radio {
        box-sizing: border-box;
        padding-top: 4px;
        margin-left: 14px;
      }
    }

    .birthday {
      margin-bottom: 33px;
      display: flex;
      align-items: center;
      p {
        img {
          width: 31px;
          height: 27px;
        }

        span {
          margin-left: 9px;
          font-size: 18px;
          color: #333;
          vertical-align: middle;
        }
      }

      .time {
        margin-top: 7px;
        margin-left: 14px;
        .el-input__inner {
          height: 25px;

          .el-select {
            line-height: 25px;
          }
        }

        .birthdayRight {
          float: right;
          margin-top: 7px;
          margin-left: 20px;
          color: rgba(153, 153, 153, 1);
          font-size: 16px;
        }
      }
    }

    .like {
      p {
        img {
          width: 31px;
          height: 27px;
        }

        span {
          margin-left: 9px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
          vertical-align: middle;
        }

        .maohao {
          margin-left: -1px;
        }

        .likeb {
          font-size: 18px;
          color:black
        }
      }

      .like_itme {
        display: flex;
        flex-wrap: wrap;
        width: 600px;
        margin: 30px 0 0 123px;

        li {
          position: relative;

          .like_list {
            border: 1px solid rgba(204, 204, 204, 1);
            padding: 10px 21px;
            border-radius: 3px;
            font-size: 16px;
            color: rgba(102, 102, 102, 1);
            margin: 0 19px 19px 0;
            cursor: pointer;

            &.active {
              border: 1px solid rgba(76, 134, 244, 1);
            }
          }

          .selected {
            position: absolute;
            right: 20px;
            top: 15px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 22px 22px;
            border-color: transparent transparent #007bff transparent;
          }

          .el-icon-check {
            position: absolute;
            right: 19px;
            top: 23px;
            color: white;
          }
        }
      }
    }

    .btnContarner {
      position: relative;
      width: 100%;
      height: 241px;

      .btn {
        position: absolute;
        left: -146px;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 140px;
        height: 50px;
        border-radius: 4px;
        text-align: center;
        line-height: 39px;
        background: rgba(76, 134, 244, 1);
        color: white;
        font-size: 20px;
        font-weight: blod;
      }
    }
  }
}
.avatar{
  width:120px;
  height:120px;
}
.tip_span{
  position: absolute;
  left: 316px;
  top: 13px;
}
</style>
