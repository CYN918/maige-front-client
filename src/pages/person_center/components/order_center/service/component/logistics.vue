<template>
  <div>
    <!-- 审核 -->
    <el-dialog
      title="物流信息："
      :visible.sync="dialogVisible"
      width="835px"
      :before-close="handleClose"
    >
      <div class="timeline_div">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleClose" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["logisticshow"],
  data() {
    return {
      dialogVisible: false,
      activities: [{
        content: '支持自定义颜色',
          timestamp: '2018-04-12 20:46',
          size: 'large',
          color: '#4B99FB'
        }, {
          content: '支持自定义颜色',
          timestamp: '2018-04-03 20:46',
        }, {
          content: '支持自定义尺寸',
          timestamp: '2018-04-03 20:46',
          size: 'large'
        }, {
          content: '默认样式的节点',
          timestamp: '2018-04-03 20:46'
        }]
    };
  },
  methods: {
    handleClose() {
      this.$emit("closelogistics", false);
    }
  },
  watch: {
    logisticshow(val) {
      this.dialogVisible = val;
    }
  }
};
</script>
<style  lang="scss" scoped>
.ball{
  width:19px;
  height:19px;
  background:rgba(64,158,255,1);
  border-radius:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height:24px;
  z-index: 10;
}
.big_div{
  display: flex;
}
.cai_span{
  font-size:14px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(102,102,102,1);
}
.shen_state{
  font-size:14px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(64,158,255,1);
}
.div_time{
  font-size:12px;
font-family:Microsoft YaHei;
font-weight:400;
color:rgba(201,201,201,1);
margin-top: 5px;
}
.bor_left{
  border-left: 4px solid #409EFF;
  padding-left: 34px;
  min-height:115px;
  border-radius:2px;
  position: relative;
  left: -12px;
}
.left_none{
  border-left: 4px solid #F7FAFF;
}
div[state='4']{
  border-left:none
}
.div_big{
  padding-left: 59px;
}
.shenwei_state{
  font-size:14px;
font-family:Microsoft YaHei;
font-weight:400;
  color: #FE1B1B;
}
.timeline_div{
  padding-left: 59px;
}
</style>