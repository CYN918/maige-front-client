<template>
  <div class="margin">
    <div class="divspan">
      <span
        v-for="(value, key) in data"
        :class="currentMenu == key ? 'color_span div_span' : 'div_span'"
        :key="key"
        @click="changeselect(key)"
      >{{ key }}{{key==='异常订单'?'('+total+')':""}}</span>
    </div>
    <component :is="data[currentMenu]" ref="child"/>
  </div>
</template>

<script>
import { aftersalepagec } from "@/api/sales";
import axios from "axios";
import allsales from './allsales'
import processed from './processed'
import processing from './processing'
import dealwith from './dealwith'
import completed from './completed'
import concel from './concel'
import complaint from './complaint'
import abnormal from './abnormal'

export default {
  data(){
    return {
      data: {
        "所有售后": allsales,
        "待处理": processed,
        "处理中": processing,
        "已处理": dealwith,
        "已完成": completed,
        "已取消": concel,
        "异常订单": abnormal,
        "升级客诉": complaint,
      },
      total:0,
    }
  },
  methods:{
    changeselect(val) {
      this.$router.push({
        path: "/orderCenter/service",
        query: { orderNmae: val }
      })
    },
    async aftersalepagec() {
      let obj = {
        pageIndex: 1,
        pageSize: 0,
        requestStatus: 5, // 异常订单
      };
      const { data } = await aftersalepagec(obj);
      this.total = data.count
    },
  },
  computed:{
    currentMenu() {
      const query = this.$route.query || {};
      return query.orderNmae || "所有售后";
    }
  },
  created(){
    this.aftersalepagec()
  }
}

</script>

<style lang="stylus" scoped>
.div_span{
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width:110px;
  height:41px;
  color:rgba(51,51,51,1);
  cursor: pointer;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-top: 14px;
  color: #777;
}
.color_span{
  background:rgba(255,255,255,1);
  border:1px solid rgba(215,225,241,1);
  position: relative;
  top: 1px;
  border-bottom: none;
  color #4c86f4;
}
.divspan{
  display: flex;
}
.margin{
  margin:20px;
  margin-top:10px;
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-top: 14px;
  color: #777;
}
/deep/ .el-table{
  font-size: 13px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  margin-top: 14px;
  color: #777;
}
</style>
