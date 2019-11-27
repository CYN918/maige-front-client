<template>
  <div>
    <!-- 审核 -->
    <el-dialog
      title="审核跟踪状态："
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <div class="div_big">
        <div class="big_div" v-for="(item,index) in arr" :key="index">
          <div class="big_ball">
            <div class="ball">{{index+1}}</div>
          </div>
          <div class="bor_left">
            <div class="wihte_div"></div>
            <div :class="item.flag == 0?'blur_div white_color':'blur_div'"></div>
            <div>
              <span :class="index == num?'cai_span red':'cai_span'">{{item.actionName}} {{item.actionSysuserName}}</span>
              <span>
                <el-button type="primary" size="mini" v-if="index == num" style="margin-left: 15px;" @click="urgent(item)">加急处理</el-button>
              </span>
            </div>
              <div :class="index == num?'div_time red':'div_time'" v-if="item.createTime">{{item.createTime}}</div>
            <div :class="index == num?'div_time red':'div_time'" v-if="item.actionDesc">{{item.actionDesc}}</div>
            <div>
              <span :class="index == num?'shenwei_state':'medium_span'">{{item.actionResult}}</span>
            </div>
          </div>
        </div>
        <!-- <span>{{progressdata}}</span> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { findafterlogc , urgeresolvec } from '@/api/sales'
 import { throttleTipPop } from '@/assets/utils/utils'
export default {
  props: {
    dialog:{},
    progressdata:{
      type:Object
    }
  },
  data() {
    return {
      num:0,
      dialogVisible: false,
      ruleForm: {
        resource: "1", //审核状态
        textarea: "" // 审核原因
      },
      arr: [
        { name: "采销1号", state: 1, type: 1 },
        { name: "采销2号", state: 1, type: 1 },
        { name: "采销3号", state: 2, type: 2 },
        { name: "财务主管", state: 3, type: 2 },
        { name: "采销5号", type: 2 }
      ]
    };
  },
  methods: {
    async urgent(val){
      const data = await urgeresolvec(val.afterId,this.arr[0].actionSysuserId)
      if(data.code == 200){
         this.$message({
          message: data.message,
          type: 'success'
        });
      }else{
        throttleTipPop(this,'error',data.message)
      }
    },
    handleClose() {
      this.$emit("closeapproval", false);
    }
  },
  watch: {
    dialog(val) {
      this.dialogVisible = val;
    },
    async progressdata(val){
      this.num = 0
      let { data } = await findafterlogc(val.complainId,val.returnType)
      data.forEach(item =>{
        item.flag == 1 ? this.num++:''
      })
      this.arr = data
    }
  }
};
</script>
<style  lang="stylus" scoped>
.big_ball {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f3fa;
  line-height: 32px;
  text-align: center;
  z-index: 10;
  .ball {
    width: 22px;
    height: 22px;
    background: rgba(64, 158, 255, 1);
    border-radius: 50%;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    text-align: center;
    z-index: 10;
    margin: 0 auto;
    margin-top: 5px;
  }
}

.big_div {
  display: flex;
  position: relative;
}
.cai_span {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3C3C3C;
}
.shen_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 158, 255, 1);
  position: relative;
  top: 5px;
}
.div_time {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(201, 201, 201, 1);
  margin-top: 5px;
}
.bor_left {
  padding-left: 34px;
  min-height: 115px;
  border-radius: 2px;
  position: relative;
  left: -18px;
  top: 1px;
}
.div_big {
  padding-left: 59px;
}
.shenwei_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fe1b1b;
  position: relative;
  top: 5px;
}
.medium_span{
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  position: relative;
  top: 5px;
}
// .div_big .big_div:last-of-type .bor_left {
//   border: none;
// }
.red{
  color: red;
}
.wihte_div{
  position: absolute;
  width:14px;
  background:rgba(240,243,250,1);
  height: 100%;
  left: -5px;
}
.blur_div{
  position: absolute;
  left: -1px;
  height: 100%;
  width: 6px;
  background: #409eff;
}
.div_big .big_div:last-child .bor_left .wihte_div{
  display: none;
}
.div_big .big_div:last-child .bor_left .blur_div{
  display: none;
}
.div_big .big_div:last-child .bor_left{
  min-height: 80px;
}
.white_color{
  background: rgba(240,243,250,1);
}
</style>