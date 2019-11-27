<template>
  <div>
    <div class="bigmain">
      <div class="header clearfix">
        <div class="header_left">
          <div class="logo">
            <img :src="userInfo.headImgUrl || defaultImg" @error="$event.target.src = defaultImg"/>
          </div>
          <span class="user_name">{{ userInfo.userName }}</span>
          <span class="account_type unselectable">
            账户类型：
            <template v-if="userInfo">
              个人用户
            </template>
          </span>
          <span class="promotion unselectable">升级为企业用户</span>
          <span class="account_security unselectable">
            <span class="unselectable">账户安全:</span>
            <el-rate v-model="rateValue" disabled text-color="#ff9900"></el-rate>
            <span class="rate_text">{{rateText}}</span>
          </span>
          <span class="to_upgrade unselectable">去升级</span>
        </div>
      </div>
      <neck :list="list"></neck>
    </div>
  </div>
</template>
<style lang="stylus" scoped>
.clearfix:after {
  display: block;
  content: '';
  clear: both;
}

.bigmain {
  background-color: #F7FAFF;
  padding: 19px 20px 54px 20px;

  .header {
    width: 100%;
    height: 156px;
    background-color: #fff;

    .header_left {
      float: left;

      .logo {
        width: 80px;
        height: 80px;
        display: inline-block;
        margin: 38px 15px 37px 20px;

        img {
          width: 80px;
          height: 80px;
          border-radius: 40px 40px;
        }
      }

      .user_name {
        font-size: 20px;
        font-family: MicrosoftYaHei;
        color: #3C3C3C;
      }

      .account_type {
        margin-left: 15px;
        font-size: 16px;
        font-family: MicrosoftYaHei;
        color: #909399;
      }

      .promotion {
        margin-left: 21px;
        display: inline-block;
        width: 110px;
        height: 32px;
        vertical-align: middle;
        text-align: center;
        line-height: 32px;
        border-radius: 4px;
        background-color: #FF9146;
        font-family: MicrosoftYaHei;
        color: #FFFFFF;
        font-size: 14px;
      }

      .el-rate {
        display: inline-block;
      }

      .account_security {
        padding-left: 20px;

        span {
          font-size: 16px;
          color: #909399;
        }
      }

      .to_upgrade {
        margin-left: 20px;
        display: inline-block;
        width: 70px;
        height: 32px;
        background-color: #FF9146;
        color: #fff;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        font-family: MicrosoftYaHei;
        font-weight: Regular;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>

<script>
import { findCurrentUserInfo, personalcenter} from '@/api/index';
import { getCookie } from '@/assets/utils/utils'
import Neck from './neck/neck';

export default {
  name: 'mainpage',
  components: {
    Neck,
  },
  data() {
    return {
      defaultImg: require('@/assets/images/person_center/image/logo.png'),
      rateValue: 3,
      userInfo: {},
      rateText: '较低',
      list: [],
    };
  },
  async mounted() {
    const { data } = await findCurrentUserInfo();
    if (!data.userId) return;
    

    this.userInfo = data;
    this.personalcenter(this.userInfo.userId)
  },
  created() {
    
  },
  methods:{
    personalcenter(data){
      // console.log(JSON.parse(getCookie('userData')))
			let userData = JSON.parse(getCookie('userData'));
			let obj = {
				
				userId: data
			}
      personalcenter(obj).then(res => {
        if(res.code == 200){
           if(res.data.lenth != 0){
             this.list = res.data
           }
        }
      })
    }
    
  }
};
</script>

