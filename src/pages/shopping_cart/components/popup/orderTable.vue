<template>
    <div>
        <div class="margin">
          <div class="mbottom">
            <div class="goods-fitter">
              <el-form label-width="100px" size="small">
              </el-form>
            </div>
          </div>
          <div class="mcard othertable">
            <el-table :data="tableData1"  border :header-cell-style="getRowClass" ref="table" @select-all="handleSelectionChangeAll" @select="handleSelection">
              <el-table-column align="center" type="selection" width="55" ></el-table-column>
              <el-table-column label="商品名称" align="center" width='360'>
                  <template slot-scope="scope" style="height:800px">
                    <a :href="`product_details.html?goodsId=${scope.row.goodsId}`" target="_blank">
                      <div class="information"   v-if='scope.row.activityContent ==""'>
                        <div class="manjian">
                          <img style="" src="@/assets/images/shopping_cart/manjian.png" alt="">
                          <div class="text">满减</div>
                        </div>
                        <span class="tent_span">活动商品购满2件，即可享受满减</span>
                        <router-link to='#'><span style="color:#939399;font-family:MicrosoftYaHei;font-weight:400;">去凑单></span></router-link>
                      </div>
                      <div  :class="scope.row.activityContent !=''?'content':'marTop content'" style="display: flex">
                        <img class="content_img" style="vertical-align:middle;" :src="scope.row.thumbnailImgUrl" alt="">
                        <span class='name'>{{scope.row.goodsName}}</span>
                      </div>
                    </a>
                  </template>
              </el-table-column>
              <el-table-column label="规格" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'" style="padding:0">{{scope.row.goodsAttr}}</div>
                </template>
              </el-table-column>
              <el-table-column label="商城价" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{scope.row.goodsPrice}}</div>
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center" >
                <template slot-scope="scope">
                    <div :class="scope.row.activityContent !=''?'content computed':'marTop content computed'">
                        <div class="reduce" @click="reduceGoods(scope.row.cartId,scope.$index)">-</div>
                        <input class="text number" @change="inputChange(scope.row.cartId,scope.$index)" type="number" v-model.number="scope.row.quantity">
                        <div class="add" @click="addGoods(scope.row.cartId,scope.$index)">+</div>
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="结算价" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{scope.row.specialPrice.toFixed(2)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="合计" align="center" >
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{(scope.row.specialPrice * scope.row.quantity).toFixed(2)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="状态/操作" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">
                    <a :href="`product_details.html?goodsId=${scope.row.goodsId}`" target="_blank">
                      <el-button style="color:#939399;padding:0px 15px;"  type="text" size="mini">查看详情</el-button>
                    </a>
                    <el-button style="color:#939399;padding:0px 15px;"
                    @click.native.prevent="deleteRow(scope.$index, scope.row.cartId)"
                    type="text"
                    size="small">
                     删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div v-if="tableData2.length" style="margin: 30px 0 10px; font-size: 18px"><img style="width: 42px" src="@/assets/images/shopping_cart/lose_efficient.png" alt=""> 已失效商品</div>
            <el-table v-if="tableData2.length" :data="tableData2"  border :header-cell-style="getRowClass">
              <el-table-column align="center" :selectable="selectable" type="selection" width="55" ></el-table-column>
              <el-table-column label="商品名称" align="center" width='360'>
                <template slot-scope="scope" style="height:800px">
                  <a :href="`product_details.html?goodsId=${scope.row.goodsId}`" target="_blank">
                    <div class="information"   v-if='scope.row.activityContent ==""'>
                      <div class="manjian">
                        <img style="" src="@/assets/images/shopping_cart/manjian.png" alt="">
                        <div class="text">满减</div>
                      </div>
                      <span class="tent_span">活动商品购满2件，即可享受满减</span>
                      <router-link to='#'><span style="color:#939399;font-family:MicrosoftYaHei;font-weight:400;">去凑单></span></router-link>
                    </div>
                    <div  :class="scope.row.activityContent !=''?'content':'marTop content'" style="display: flex">
                      <img class="content_img" style="vertical-align:middle;" :src="scope.row.thumbnailImgUrl" alt="">
                      <span class='name'>{{scope.row.goodsName}}</span>
                    </div>
                  </a>
                </template>
              </el-table-column>
              <el-table-column label="规格" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'" style="padding:0">{{scope.row.goodsAttr}}</div>
                </template>
              </el-table-column>
              <el-table-column label="商城价" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{scope.row.goodsPrice}}</div>
                </template>
              </el-table-column>
              <el-table-column label="数量" align="center" >
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content computed':'marTop content computed'">
                    <div class="reduce" @click="reduceGoods(scope.row.cartId,scope.$index)">-</div>
                    <input class="text number" @change="inputChange(scope.row.cartId,scope.$index)" type="number" v-model.number="scope.row.quantity">
                    <div class="add" @click="addGoods(scope.row.cartId,scope.$index)">+</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="结算价" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{scope.row.specialPrice.toFixed(2)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="合计" align="center" >
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">{{(scope.row.specialPrice * scope.row.quantity).toFixed(2)}}</div>
                </template>
              </el-table-column>
              <el-table-column label="状态/操作" align="center">
                <template slot-scope="scope">
                  <div :class="scope.row.activityContent !=''?'content':'marTop content'">
                    <span>已失效</span>
                    <el-button style="color:#939399;padding:0px 15px;"
                               @click.native.prevent="deleteRow(scope.$index, scope.row.cartId)"
                               type="text"
                               size="small">
                      删除
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
    @import "~styles/cart_header.styl"
    @import "~styles/mixins.styl"
    .img
        margin-right 24px
        img
            margin-left 24px
            margin-right 20px
    .computed
        .reduce,.add
            border 1px  solid #DFE7F2
            display inline-block
            width 17px
            height 17px
            text-align center
            line-height 16px
            color #939399
            cursor pointer
        .text
            color #939399
            font-size 14px
            font-family MicrosoftYaHei
            display inline-block
        .number
          width 30px
          text-align center
    .goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}

.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}

.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.detail{
    font-size: 14px;
    color: #606266;
}
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
   .small_top{
    margin-top: 10px;
  }
  .addfocus{
    position: absolute;
    margin-left: 892px;
  }
  .content{
    width: 100%;
    padding: 6px;
    text-align: center;
    align-items: center;

    .name{
      margin-left: 16px;
      display:inline-block;
      vertical-align:middle;
      ellipsis2()
      text-align left
      color: #333;
    }
  }
  .filter{
    color:rgba(1,1,1,0)
  }
  .information{
    position: absolute;
    width: 700%;
    background: #f3f7fc;
    z-index: 10;
    top: -2px;
    left: 0px;
    height: 56px;
    line-height: 56px;
    text-align: left;
    display: flex;
    .tent_span{
      margin-right: 10px;
      color:#939399;
      font-family:MicrosoftYaHei;
      font-weight:400;
    }
    .tent_span:first-child{
      margin-left: 1%;
    }
    .manjian{
      width:70px;
      height:57px;
      position relative
      img{
        height:33px
        position:absolute;
        top:15px
      }
      .text{
        position:absolute;
        top:0px;
        left:11px;
        color:#fff;
      }
    }
  }
  .btn_right{
    padding-left:10px
  }
  .el-table__expanded-cell{
    left:-111px;
    top:-37px;
    border:none

  }
  .marTop{
    margin-top:56px
  }
  .content_img{
      width: 60px;
      height: 60px;
      margin-left: 2%
      flex-shrink 0
  }
</style>
<script>
import { throttleTipPop } from '@/assets/utils/utils'
import { mapState, mapActions } from 'vuex'
import { checkShop, updateShop, deleteShop } from '@/api/index'
import {addressUrl} from '@/assets/utils/utils'
export default {
  data() {
    return {
      multipleSelection: [],
      totalPrice: 0,
      quantity: 0,
    }
  },
 
  computed: {
    ...mapState(['tableData1', 'tableData2', 'checkedTableData']),
  },
  methods: {
    ...mapActions(['queryShop']),
    // 处理表格数据
    selectable(row, index) {
      if (row.onSale === 0) {
        return false
      } else {
        return true
      }
    },
    // 初始化选择状态
    handleSelectionChange() {
      this.checkedTableData.forEach((item, index) => {
        this.$refs.table.toggleRowSelection(this.checkedTableData[index], true)
        this.totalPrice += (item.specialPrice * item.quantity)
      })
      // 初始化总价
      this.$store.commit('handleTotalPrice', this.totalPrice)
    },
    // 选中商品 选中第一个参数返回的信息与第二个参数相同 不选中则第一个参数为空
    async handleSelection(selection, row) {
      const res = await checkShop(row.cartId, row.checked === 0 ? 1 : 0)
      if (res.code === 200) {
        this.updataPrice()
      }
    },
    // 得新计算选中的商品列表
    async updataPrice() {
      await this.queryShop()
      this.totalPrice = 0
      this.checkedTableData.forEach((item, index) => {
        this.$refs.table.toggleRowSelection(this.checkedTableData[index], true)
        this.totalPrice += (item.specialPrice * item.quantity)
      })
      this.$store.commit('handleTotalPrice', this.totalPrice)
    },
    // 选择/ 取消全选
    async handleSelectionChangeAll() {
      let cartIds = ''
      let checked = 0
      this.tableData1.forEach((item, index) => {
        if (item.checked === 0) {
          checked = 1
        }
        if (index !== this.tableData1.length - 1) {
          cartIds = cartIds + item.cartId + ','
        } else {
          cartIds = cartIds + item.cartId
        }
      })
      const res = await checkShop(cartIds, checked)
      if (res.code === 200) {
        this.updataPrice()
      }
    },
    // 删除商品
    async deleteRow(index, id) {
      this.$confirm('此操作将从购物车删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await deleteShop(id)
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          await this.updataPrice()
          this.$emit('changeShoppingcartNum')
        } else {
          this.$message(res.message)
        }
      })
    },
    // 输入改变商品数量
    async inputChange(id, index) {
      const formData = new FormData()
      this.tableData1.forEach(async (item) => {
        if (item.cartId === id) {
          if (item.checked === 0) {
            const res = await checkShop(item.cartId, 1)
          }
          item.quantity = item.quantity * 1
          if (item.quantity < 1) {
            item.quantity = 1
            return
          } if (item.quantity > item.goodsNumber) {
            item.quantity = item.goodsNumber
            throttleTipPop(this, 'error', '库存不足')
          }
          formData.append('cartId', id)
          formData.append('quantity', item.quantity)
          formData.append('goodsId', item.goodsId)
          formData.append('skuId', item.skuId)
          const res2 = await this.checkStock(formData)
          if (!res2) {
            item.quantity = item.goodsNumber
            const res = await checkShop(item.cartId, 0)
          }
        }
        await this.updataPrice()
        this.$emit('changeShoppingcartNum')
      })
    },
    // 增加商品数量
    async addGoods(id) {
      this.$emit('changeShoppingcartNum')
      const formData = new FormData()
      this.tableData1.forEach(async (item) => {
        if (item.cartId === id) {
          if (item.checked === 0) {
            const res = await checkShop(item.cartId, 1)
          }
          item.quantity += 1
          if (item.quantity > item.goodsNumber) {
            item.quantity = item.goodsNumber
            throttleTipPop(this, 'error', '库存不足')
          }
          formData.append('cartId', id)
          formData.append('quantity', item.quantity)
          formData.append('goodsId', item.goodsId)
          formData.append('skuId', item.skuId)
          const res2 = await this.checkStock(formData)
          if (!res2) {
            item.quantity = item.goodsNumber
            const res = await checkShop(item.cartId, 0)
          }
          await this.updataPrice()
          this.$emit('changeShoppingcartNum')
        }
      })
    },
    // 减少商品数量
    async reduceGoods(id, index) {
      this.$emit('changeShoppingcartNum')
      const formData = new FormData()
      this.tableData1.forEach(async (item) => {
        if (item.cartId === id) {
          item.quantity -= 1
          if (item.quantity < 1) {
            item.quantity = 1
            return
          }
          if (item.checked === 0) {
            const res = await checkShop(item.cartId, 1)
          }
          formData.append('cartId', id)
          formData.append('quantity', item.quantity)
          formData.append('goodsId', item.goodsId)
          formData.append('skuId', item.skuId)
          const res2 = await this.checkStock(formData)
          if (!res2) {
            item.quantity = item.goodsNumber
          }
          await this.updataPrice()
          this.$emit('changeShoppingcartNum')
        }
      })
    },
    // 检测库存
    async checkStock(formData) {
      const res = await updateShop(formData)
      if (res.code !== 200) {
        this.$message(res.message)
        return false
      }
      return true
    },
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'color:#939399;font-family:MicrosoftYaHei;font-weight:400;background:#f7faff;text-align:center;'
      }
      return ''
    },
  },
  async created() {
      //  const url = addressUrl()
      // const activityTypeNum = url.activityTypeNum.split('#')[0]
      // const goodsIds = url.goodsIds.split(',')
    await this.queryShop()
    this.$nextTick(this.handleSelectionChange)
  
  },
}
</script>

