<template>
  <div class="pack_div">
    <div class="package">
      <div class="top_span">
        <span v-for="(item,index) in activities" :key="index" :class="num==index?'parcel cheked':'parcel'"
              @click="parcel(index)">包裹{{index+1}}</span>
      </div>
      <div class="addreesContiner" v-if="activities.length">
        <div class="orderdetails11">包裹信息</div>
        <div class="backMessge">
          <span>物流信息：{{activities[num].shippingName}} | {{activities[num].logisticsNo}}</span>
        </div>
        <div class="addrees" style="padding-left:30px;padding-top:10px;padding-bottom:10px;text-align:left" v-if="activities[num].logisticsInfos.length">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities[num].logisticsInfos"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.ftime"
              style="height:77px"
            >
              <span v-if=" index == 0">{{activity.context}}</span>
              <span v-if=" index != 0">{{activity.context}}</span>
            </el-timeline-item>
          </el-timeline>
        </div>
        <div v-else  class="addrees" style="padding-left:30px;padding-top:10px;padding-bottom:10px;text-align:left">
            暂无物流信息
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { orderDetails } from '@/api/index';
export default {
  name: "package",
  props: ["logdata"],
  data() {
    return {
      tableData: [],
      activities: [],
      num:0,
    };
  },
  methods: {
    parcel(val) {
      this.num = val;
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;";
      } else {
        return "";
      }
    },
    async getLogistics() {

      const res = await orderDetails(this.logdata.orderId);
      this.activities = res.data.logisticsVoList
    }
  },
  mounted() {
    this.getLogistics();
  }
};
</script>
<style lang="stylus" scoped>
.package_logistics {
  background-color: #fff;
  text-align: left;
  border: 1px solid rgba(215, 225, 241, 1);

  .header {
    padding-top: 17px;

    &>span {
      width: 5px;
      height: 20px;
      background-color: #4C86F4;
      display: inline-block;
      vertical-align: middle;
    }

    .title {
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-left: 11px;
    }
  }

  .body {
    padding: 15px;

    /deep/ .el-table__body-wrapper {
      overflow: auto !important;
    }

    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
      width: 8px; // 横向滚动条
      height: 8px; // 纵向滚动条 必写
    }

    /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
      background-color: #4C86F4;
      border-radius: 3px;
    }
    /deep/ .el-table__row {
      height: 50px;
    }
  }
}

.package_info {
  margin-top: 26px;
  .after_buy {
    margin: 20px 14px 0px 14px;
    /deep/ .el-tabs__content {
      text-align: left;
    }
    /deep/ .el-tabs__nav-wrap {
      height: 48px !important;
    }
    .search_wrapper {
      .search_header {
        box-sizing: border-box;
        line-height: normal;
        text-align: left
        .biao {
          display: inline-block;
          width: 5px;
          height: 27px;
          background-color: #4A99FA;
          vertical-align: middle;
        }
        .title {
          vertical-align: middle;
          display: inline-block;
          box-sizing: border-box;
          font-size: 16px;
          padding-left: 26px;
          font-family: MicrosoftYaHei;
          color: #333;
        }
      }
      .baoguo {
        height: 38px;
        background-color: #F3F7FC;
        line-height: 38px;
        padding-left: 20px;
        margin-top: 10px;
        margin-bottom: 21px;
        text-align: left;
      }
    }
  }
}
.pack_div{
    width:95%;
    margin-left:2%;
    font-size: 13px;
    font-family: Microsoft YaHei;
    margin-top: 14px;
    color: #777;
}
span{
    width: 148px;
    height: 43px;
}
.top_span {
    display: flex
  }
  .orderRemarks{
    width:100%;
    padding: 16px 0;
    border: 1px solid #EBEEF5;
    background:white;
    padding-left: 10px;
  }
   .package
    margin-bottom 30px
    .parcel
      cursor pointer
      display inline-block
      width: 110px;
      height: 35px;
      display flex
      align-items center
      justify-content center
    .cheked
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(215, 225, 241, 1);
      border-bottom none
      position relative
      top 1px

  .addreesContiner
    background: white
    border: 1px solid rgba(215, 225, 241, 1);
    .addrees
      margin-top 30px

  .orderdetails11 {
    border-left: 4px solid #4a99fa;
    font-weight: 400;
    position: relative;
    padding: 5px 0;
    padding-left: 26px;
    top: 8px;
    text-align:left;
  }

  .backMessge {
    width: 95%;
    height: 38px;
    background: #F3F7FC;
    position: relative;
    top: 23px;
    left: 21px;
    line-height:38px;
    text-align:left;
    padding-left 12px
  }
  .people {
    margin-right: 15px;
  }

  .details
    margin-top 30px
    margin-bottom: 30px;
    .detailsImg
      display flex
      align-items center
      img
        width 60px
        height 60px

  .top_span {
    display: flex
  }
  .orderRemarks{
    width:100%;
    padding: 16px 0;
    border: 1px solid #EBEEF5;
    background:white;
    padding-left: 10px;
  }
</style>