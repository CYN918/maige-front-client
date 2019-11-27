<template>
    <div>
        <div id="myorder">
            <div class="top_div">
                <span :class="state==0?'color_blur':''" @click="state = 0">待评价订单（{{commentOrder.total}}）</span>
                <span :class="state==1?'color_blur':''" @click="state = 1">已评价订单（{{commented.total}}）</span>
            </div>
            <div id="myorder1">
                <commentOrder v-if="state==0"  />
                <commented v-if="state==1"  />
            </div>
        </div>
    </div>
</template>

<script>
import { getAllorder} from '@/api/index';
import commentOrder from './commentOrder/commentOrder'
import commented from './commented/commented'

export default {
  name: 'cancelOrder',
  data() {
    return {
      state: 0,
      commentOrderNum: 0,
      commented:{
        currentPage:1,
        pageSize:10,
        total:0,
        data:[]
      },
      commentOrder:{
        currentPage:1,
        pageSize:10,
        total:0,
        data:[]
      }
    }
  },
  created() {
    this.getAllorder()
    this.getAllorder2()
  },
  components: {
    commentOrder,
    commented,
  },
  methods: {
    // 待评价订单
    async getAllorder() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        requestStatus: 4,
      };
      try {
        const res = await getAllorder(obj);
        this.tableData1 = res.data.pageList;
        this.commentOrderNum = res.data.count;
      } catch (e) {
        this.$message.error('未知错误!!!')
      }
    },
    // 已评价订单
    async getAllorder2() {
      const obj = {
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        requestStatus: 9, // 已取消
      };
      try {
        const res = await getAllorder(obj);
        this.tableData2 = res.data.pageList;
        this.commentedNum = res.data.count;
      } catch (e) {
        this.$message.error('未知错误!!!')
      }
    },
    async getAllorderwait() {
      const obj = {
        pageIndex: this.commentOrder.currentPage,
        pageSize: this.commentOrder.pageSize,
        requestStatus: 4, // 待评价
      };
      try {
        const res = await getAllorder(obj);
        this.commentOrder.data = res.data.pageList
        this.commentOrder.total = res.data.count;
      } catch (e) {
        this.$message.error('未知错误!!!')
      }
    },
    async getAllorder() {
      const obj = {
        pageIndex: this.commented.currentPage,
        pageSize: this.commented.pageSize,
        requestStatus: 9, // 已评价
      };
      try {
        const res = await getAllorder(obj);
        this.commented.data = res.data.pageList
        this.commented.total = res.data.count;
      } catch (e) {
        this.$message.error('未知错误!!!')
      }
    },
  },
  created(){
    this.getAllorder()
    this.getAllorderwait()
  }
}
</script>
<style lang="stylus" scoped>
 #myorder
    margin-left 20px
    margin-top:14px
    .top_div{
        display flex
    }
    span {
        width:120px;
        height:42px;
        cursor: pointer;
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .color_blur {
        color: rgba(76, 134, 244, 1);
        width:120px;
        height:42px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(223,231,242,1);
        border-bottom:none;
        display:flex;
        justify-content:center;
        align-items:center;
        position: relative;
        top: 1px;
    }
    #myorder1{
        background-color: #fff;
        box-sizing: border-box;
        padding: 17px 16px 0px 12px;
        border:1px solid rgba(223,231,242,1);
    }
</style>
