<template>
    <div>
      <div id="all_order_tab">
        <el-table
            :data="tableData"
            :header-cell-style="getRowClass"
            border
            ref="tab_1"
            :span-method="arraySpanMethod">
            <el-table-column :resizable="false" type="selection" align="left" width="50">
                <template slot-scope="scope">
                  <div class="scrollX">
                     <div class="order_no">
                      <span class="tent_span" >订购单号：{{scope.row.orderNo}}</span>
                      <span class="tent_span">下单时间：{{scope.row.orderTime}} </span>
                      <div class="button">
                        <el-button class="text" type="primary" size="mini" @click.stop="handleCheck">查看地址</el-button>
                        <el-button class="text" type="primary" size="mini" >申请售后</el-button>
                        <el-button class="text" type="primary" size="mini" >查看详情</el-button>
                        <el-button class="text" type="primary" size="mini" @click="isChecked = !isChecked" >包裹/售后</el-button>
                        <el-button type="text" size="medium" class="el-icon-delete"></el-button>
                    </div>
                </div>
                  </div>
                <div class="order_goods" v-for="(item,index) in scope.row.child" :key="index">
                    <el-checkbox style="width:45px;text-align: center;"></el-checkbox>
                    <span style="width:252px;margin-left:17px;">
                        <img class="content_img" src="@/assets/images/person_center/image/goods.png" alt="">
                        <span class="good_info">{{item.goodsInfo}}</span>
                    </span>
                    <span style="width:70px;text-align: center;">{{item.sku}}</span>
                    <span style="width:65px;text-align: center;">{{item.marketPrice}}</span>
                    <span style="width:65px;text-align: center;">{{item.number}}</span>
                    <span style="width:65px;text-align: center;">{{item.nowPrice}}</span>
                    <span style="width:91px;text-align: center;">{{item.paymentMethod}}</span>
                    <span style="width:80px;text-align: center;">{{item.kuaidi}}</span>
                    <span style="width:140px;text-align: center;">{{item.order}}</span>
                    <span style="width:140px;text-align: center;">{{item.state}}</span>
                </div>
                <!-- <div v-show="isChecked" style="background:#f7faff;padding:15px 9px 12px 12px;">
                    <package></package>
                </div> -->
            </template>
            </el-table-column>
            <el-table-column :resizable="false" label="商品详情" align="center" width='252'>
            </el-table-column>
            <el-table-column :resizable="false" min-width="70" label="SKU" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="70" label="商城价" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="65" label="数量" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="65" label="结算价" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="65" label="合计" align="center" ></el-table-column>
            <el-table-column :resizable="false" min-width="80" label="支付方式" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="90" label="物流公司" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="80" label="物流单号" align="center"></el-table-column>
            <el-table-column :resizable="false" min-width="90" label="状态/操作" align="center"></el-table-column>
            <el-table-column type="expand" width="1">
            </el-table-column>
        </el-table>
        <div class="paging clearfix">
            <div class="block" style="float:right; color:#606266;padding:12px 10px 84px 0px;margin-top:95px">
                <el-pagination
                    background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="ChargeDetail"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, sizes, prev, pager, next, jumper"
					:total="400">
				</el-pagination>
            </div>
        </div>
    </div>
    </div>
</template>
<style lang="stylus" scoped>
    .clearfix:after{display:block; content:""; clear:both;}
    #all_order_tab{
        /deep/ .cell{
            padding 0px
            
        }
        /deep/ td{
            padding:0px;
        }
        /deep/ .el-table__body-wrapper{
            overflow auto
        }
        
    }
    .order_no{
      background:#f7faff;
      height:56px;
      box-sizing:border-box;
      padding:11px 0px 0px 10px;
    }
    .tent_span{
        padding 0 5px
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(147,147,153,1);
    }
    .text{
        width:65px;
        height:25px;
        background:rgba(64,158,255,1);
        border-radius:4px;
        font-size 12px
        text-align center
        padding 5px 5px
    }
    .button{
        display: inline-block;
        padding-left: 25px;
        float: right;
        margin-right: 16px;
    }
    .order_goods{
        font-size: 0px;
        padding: 36px 0px;
        .content_img{
            display:inline-block;
            vertical-align:middle;
        }
        .goevaluation{
          text-align center
          margin-left:16px
        }
        .good_info{
            display:inline-block;
            width:165px;
            vertical-align:middle;
        }
        
    }
    .order_goods>span
        display inline-block
        word-spacing:0;
        font-size: 12px;
  
</style>
<script>
export default {
    name:'detail',
    components: {
    },
    data(){
        return {
            ChargeDetail:1, //默认选中第一页
             tableData:[
                {
                    orderNo:'990000201506125880',
                    orderTime:'2019-07-23 11：30：30',
                    userName:'刘德华',
                    address:'XXXXXXXXX',
                    phone:'123456789111',
                    num:'5',
                    totalPrice:'1440',
                    child:[
                    {
                        goodsInfo: 'Ztajkbdhfsdfhjak hjdshafjdjsfba AhjfsdjbfEhjdf sdhhfdsk',
                        sku:'23423',
                        marketPrice:'23',
                        number:'4',
                        nowPrice:'13',
                        pay:'积分兑换',
                        paymentMethod:"微信支付",
                        kuaidi:'顺丰快递',
                        order:'1423532546325',
                        state:'已发货',
                        isChecked:false,
                    },
                    {
                        goodsInfo: 'Ztajkbdhfsd',
                        sku:'23423',
                        marketPrice:'23',
                        number:'4',
                        nowPrice:'13',
                        pay:'积分兑换',
                        paymentMethod:"微信支付",
                        kuaidi:'顺丰快递',
                        order:'1423532546325',
                        state:'已发货',
                        isEvaluation:true
                        
                    },
                     {
                        goodsInfo: 'Ztajkbdhfsd',
                        sku:'23423',
                        marketPrice:'23',
                        number:'4',
                        nowPrice:'13',
                        pay:'积分兑换',
                        paymentMethod:"微信支付",
                        kuaidi:'顺丰快递',
                        order:'1423532546325',
                        state:'已发货',
                        isEvaluation:true
                        
                    },
                     {
                        goodsInfo: 'Ztajkbdhfsd',
                        sku:'23423',
                        marketPrice:'23',
                        number:'4',
                        nowPrice:'13',
                        pay:'积分兑换',
                        paymentMethod:"微信支付",
                        kuaidi:'顺丰快递',
                        order:'1423532546325',
                        state:'已发货',
                        isEvaluation:true
                        
                    },
                    ]
                },
            ],
            iSelect : true,
            isChecked:false,
            currentPage1:1
        }
    },
    mounted(){
    },
    methods:{
       arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex % 1 === 0) {
                if (columnIndex === 0) {
                return [1, 11];
                } else{
                return [0, 0];
                }
            }
        },
        //设置表头样式
      getRowClass ({ row, column, rowIndex, columnIndex }) {
          if (rowIndex === 0) {
              return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;text-align:center;height:50px;'
          } else {
              return ''
          }
          if (columnIndex === 0) {
              return 'display:none;'
          }
      },
      //点击查看地址
      handleCheck() {
      
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}

</script>
