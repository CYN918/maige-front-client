<template>
  <div class="unselectable">
    <div class="neck_sub">
      <ul class="clearfix">
        <li v-for="item in list">
          <div class="center">
            <img :src="item.accountLogo" alt />
            <div class="right">
              <div class="text">{{item.accountName}}</div>
              <div class="monney">{{ item.balanceCount }}</div>
            </div>
          </div>
        </li>
        
      </ul>
      <!-- <ul class="clearfix">
        <li>
          <div class="center">
            <img src="@/assets/images/person_center/image/bangongyongping.png" alt />
            <div class="right">
              <div class="text">办公用品余额</div>
              <div class="monney">0</div>
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <img src="@/assets/images/person_center/image/fuliyue.png" alt />
            <div class="right">
              <div class="text">员工福利余额</div>
              <div class="monney">0</div>
            </div>
          </div>
        </li>
        <li>
          <div class="center">
            <img src="@/assets/images/person_center/image/yingxiao.png" alt />
            <div class="right">
              <div class="text">营销品余额</div>
              <div class="monney">0</div>
            </div>
          </div>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'neck',
  props:  {
    list: {
      type: Array
    }
  },
  data(){
     return {
       
     }
  },
  mounted() {
    
  },
  created() {
		// console.log(this.list)
    },
    watch:{
      list(newValue,oldValue){
        // console.log(newValue)   
      }
    },
  methods:{
    
  }
};
</script>

<style lang="stylus" scoped>
.clearfix:after {
  display: block;
  content: '';
  clear: both;
}

.neck_sub {
  ul {
    height: 200px;

    li {
      float: left;
      width: 23.5%;
      height: 173px;
      background-color: #fff;
      margin-left: 20px;
      margin-top: 21px;
      border-radius: 2px;
      cursor: pointer;

      &:nth-of-type(1), &:nth-of-type(5) {
        margin-left: 0px;
      }

      display: flex;
      justify-content: center;
      align-items: center;

      .center {
        &:hover {
          -moz-transform: scale(1.2);
          -o-transform: scale(1.2);
          -webkit-transform: scale(1.2);
          transform: scale(1.2);
          -o-transition: all 0.5s;
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          transition: all 0.5s;
        }

        .right {
          display: inline-block;
          vertical-align: middle;
          margin-left: 5px;
          position: relative;

          .text {
            font-family: MicrosoftYaHei;
            color: #333333;
            font-size: 16px;
            font-weight: Regular;
          }

          .monney {
            font-family: MicrosoftYaHei;
            font-weight: Regular;
            color: #F76C6E;
            font-size: 14px;
            margin-top: 18px;
          }

          .button {
            position: absolute;
            right: -10px;
            top: 25px;
            font-family: MicrosoftYaHei;
          }
        }
      }
    }
  }
}
</style>
