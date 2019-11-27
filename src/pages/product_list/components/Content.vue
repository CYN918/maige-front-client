<template>
  <div>
    <div v-if="!loading && proList.length === 0" class="empty_show">
      <img src="@/assets/images/product_list/blank.png" alt="">
    </div>
    <div class="content" v-else>
      <top-selling class="top-selling" :topFive="topFive" v-if="showHot && topFive.length > 0">
        <template>
          <div class="title_wrap">
            <img src="@/assets/images/product_list/topseling.jpg" alt="">
          </div>
        </template>
      </top-selling>
      <div>
        <!--<div class="row">
          <div class="left t1">排序：</div>
          <ul class="right" >
            <li class="all">
              <label for="sort" @click="sorting(0)">
                <input type="radio" ref="sort0" name="sort" id="sort" checked>
                <div class="t2">综合</div>
              </label>
            </li>
            <li>
              <label for="sort1" @click="sorting(1)">
                <input type="radio" name="sort" id="sort1" ref="sort1">
                <span class="t2" data-ref="sort1" >销量
              <i class="el-icon-bottom"></i>
            </span>
              </label>
              <label for="sort4" @click="sorting(4)">
                <input type="radio" name="sort" id="sort4" ref="sort4">
                <span class="t2" data-ref="sort4">商品评价
              <i class="el-icon-bottom"></i>
            </span>
              </label>
              <label for="sort5" @click="sorting(5)">
                <input type="radio" name="sort" id="sort5" ref="sort5">
                <span class="t2" data-ref="sort5">上架时间
              <i class="el-icon-bottom"></i>
            </span>
              </label>
              <label for="sort2" @click="sorting(2)" v-show="isDecend">
                <input type="radio" name="sort" id="sort2" ref="sort2">
                <span class="t2" data-ref="sort2">价格
              <i class="el-icon-bottom"></i>
            </span>
              </label>
              <label for="sort3" @click="sorting(3)" v-show="!isDecend">
                <input type="radio" name="sort" id="sort3" ref="sort3">
                <span class="t2" data-ref="sort3">价格
            </span>
              </label>
            </li>
          </ul>
        </div>-->
        <el-tabs type="border-card" v-model="rankType" @tab-click="sorting">
          <el-tab-pane name="0">
            <span slot="label">综合</span>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="新品"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
              <el-checkbox label="仅显示有货"></el-checkbox>
              <el-checkbox label="正品保障"></el-checkbox>
            </el-checkbox-group> -->
          </el-tab-pane>
          <el-tab-pane name="1">
            <span slot="label">销量<i class="el-icon-bottom"></i></span>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="新品"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
              <el-checkbox label="仅显示有货"></el-checkbox>
              <el-checkbox label="正品保障"></el-checkbox>
            </el-checkbox-group> -->
          </el-tab-pane>
          <el-tab-pane name="4">
            <span slot="label">商品评价<i class="el-icon-bottom"></i></span>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="新品"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
              <el-checkbox label="仅显示有货"></el-checkbox>
              <el-checkbox label="正品保障"></el-checkbox>
            </el-checkbox-group> -->
          </el-tab-pane>
          <el-tab-pane name="5">
            <span slot="label">上架时间<i class="el-icon-bottom"></i></span>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="新品"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
              <el-checkbox label="仅显示有货"></el-checkbox>
              <el-checkbox label="正品保障"></el-checkbox>
            </el-checkbox-group> -->
          </el-tab-pane>
          <el-tab-pane :name="price">
            <span slot="label">价格
              <i class="el-icon-bottom" v-show="!isDecend"></i>
              <i class="el-icon-top" v-show="isDecend"></i>
            </span>
            <!-- <el-checkbox-group v-model="checkList">
              <el-checkbox label="包邮"></el-checkbox>
              <el-checkbox label="新品"></el-checkbox>
              <el-checkbox label="货到付款"></el-checkbox>
              <el-checkbox label="仅显示有货"></el-checkbox>
              <el-checkbox label="正品保障"></el-checkbox>
            </el-checkbox-group> -->
          </el-tab-pane>
        </el-tabs>
        <ul class="list clearfix" v-loading="loading">
          <li class="item" v-for="item in proList" :key="item.goodsId" style="position: relative">
            <div v-if="item.isSaleOut !== 0" style="position: absolute;width: 100%;height: 60%;background: rgba(0,0,0,0.5);top:0">
              <div style="width: 100px;height: 100px;line-height: 100px;border-radius: 50%;background: #666;margin: 68px auto;text-align: center;font-size: 20px;color: #fff;">
                售罄
              </div>
            </div>
            <div>
              <a :href="`product_details.html?goodsId=${item.goodsId}&${query}`">
                <div class="img-wrap">
                  <img :src="item.goodsThumbnailImgUrl" :alt="item.brandName">
                </div>
                <p class="item-name" :title="`${item.brandName} ${item.goodsName}`">
                  {{item.goodsName}}
                </p>
              </a>
              <ul class="clearfix" style="margin-bottom: 16px;width: 100%;">
                <li class="product_type" >
                  <span v-if="item.goodsType === 0">自营</span>
                  <span v-else-if="item.goodsType === 1">京东</span>
                  <span v-else-if="item.goodsType === 2">网易</span>
                  <span v-else-if="item.goodsType === 3">苏宁</span>
                  <span v-else-if="item.goodsType === 4">平台商品</span>
                </li>
                <li class="product_type" v-if="item.isAssemble === 1">
                  团购
                </li>
                <li class="product_type" v-if="item.isGift === 1">
                  赠
                </li>
              </ul>
              <div class="price-wrap">
                <div style="display: flex;justify-content: space-between;margin-bottom: 16px">
                  <span class="price">商城价：{{item.shopPrice}}元</span>
                  <span class="ori-price" v-if="item.goodsType === 3">苏宁价：{{item.jdPrice}}元</span>
                  <span class="ori-price" v-else-if="item.goodsType === 2">网易价：{{item.jdPrice}}元</span>
                  <span class="ori-price" v-else-if="(item.goodsType === 1) && item.jdPrice">京东价：{{item.jdPrice}}元</span>
                  <span class="ori-price" v-else>市场价：{{item.costPrice}}元</span>
                </div>
                <div v-if="item.isSaleOut !== 0" style="width: 100%;height: 32px;line-height: 32px;background: #666;color: #fff;font-size: 16px;text-align: center;">
                  售  罄
                </div>
                <div v-else style="display: flex;justify-content: space-between">
                  <div class="btn" @click="addToShoppingcart(item)">加入购物车</div>
                  <div style="background: #ED4F48" class="btn" @click="buyRightNow(item)">立即购买</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <Pagination class="pagination" :pagePerItems="pagePerItems"
                    :catId="catId">
        </Pagination>
      </div>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import { isLogin, parseUrl, throttleTipPop } from '@/assets/utils/utils'
import { reqSystemConfig, getTopFive, addShoppingCart, goodsfindbasictotype } from '@/api/index'
import { mapState } from 'vuex'
import TopSelling from './TopSelling'
import Pagination from './Pagination'

export default {
  name: 'Content',
  data() {
    return {
      showHot: true,
      rankType: '0', // 排序
      checkList: [], // 搜索复选框集合
      isDecend: true, // 降序
      firstEnter: true, // 首次触发
      timer: null, // 定时器
      topFive: [],
      topdata:[],
      query: '',
    }
  },
  computed: {
    ...mapState(['proList', 'catId', 'pagePerItems', 'goodsName','loading']),
    price() {
      const price = this.isDecend ? '2' : '3'
      return price
    }
  },
  created() {
    this.query = window.location.search.substring(1)
    const queryObj = parseUrl(this.query)
    this.rankType = queryObj.rankType
    if (this.rankType === '2') {
      this.isDecend = false
      this.rankType = '3'
    } else if (this.rankType === '3') {
      this.isDecend = true
      this.rankType = '2'
    } else {
      this.isDecend = false
    }
    let queryObj2 = {}
    queryObj.pageSize = queryObj.pageSize || 20
    this.getTopFive()
    // this.goodsfindbasictotype()
    if (queryObj.conditions) {
      Object.keys(queryObj).forEach((item) => {
        if (item !== 'conditions' && item !== 'ref' && item !== 'isDrop') {
          queryObj2[item] = queryObj[item]
        }
      })
    } else {
      queryObj2 = queryObj
    }
    this.$store.dispatch('getProList', queryObj2)
  },
  mounted() {
    this.getSystemConfig()
  },
  methods: {
    // 查询系统配置
    async getSystemConfig () {
      const res = await reqSystemConfig('project_goods_top_ranking')
      if (res.code === 200) {
        if (res.data.settingInfoList[0].key === 'open') {
          if (res.data.settingInfoList[0].checkValue === 'false') {
            this.showHot = false
          } else {
            this.showHot = true
          }
        } else if (res.data.settingInfoList[0].key === 'close') {
          if (res.data.settingInfoList[0].checkValue === 'true') {
            this.showHot = false
          } else {
            this.showHot = true
          }
        } else {
          this.showHot = true
        }
      }
    },
    // 其它排序
    sorting() {
      this.changeSearch('rankType', this.rankType)
    },
    // 改变search值
    changeSearch(key, val, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6, key7, val7, key8, val8) {
      const query = location.search
      const queryObj = parseUrl(decodeURI(query))
      let queryStr = ''
      queryObj[key] = val
      if (key2) {
        queryObj[key2] = val2
      }
      if (key3) {
        queryObj[key3] = val3
      }
      if (key4) {
        queryObj[key4] = val4
      }
      if (key5) {
        queryObj[key5] = val5
      }
      if (key6) {
        queryObj[key6] = val6
      }
      if (key7) {
        queryObj[key7] = val7
      }
      if (key8) {
        queryObj[key8] = val8
      }
      queryObj.pageIndex = 1
      Object.keys(queryObj).forEach((item) => {
        queryStr += `${item}=${queryObj[item]}&`
      })
      if (queryStr !== '') {
        queryStr = queryStr.substring(0, queryStr.lastIndexOf('&'))
      }
      location.search = queryStr
    },
    // 立即购买
    buyRightNow(item) {
      const obj = {
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        goodsSn: item.goodsSn,
        goodsPrice: item.shopPrice,
        quantity: 1,
        supplierId: item.supplierId,
        skuId: item.skuId,
      }
      if (item.quantity < 1) {
        throttleTipPop(this, 'error', '库存不足')
        return
      }
      if (!item.skuId) {
        // 页面没有SKUID时
        return;
      }
      const userInfo = isLogin();
      if (userInfo) {
        // 登录则跳转至选择地址页面
        localStorage.setItem("justBuyProduct", JSON.stringify(obj));
        window.location.href = "shopping_cart.html?justBuy=true#/address";
      } else {
        // 需要登录
        PubSub.publish(SHOW_LOGINPOP);
      }
    },
    // 同类排行
    async goodsfindbasictotype(val){
      const  msg  = await goodsfindbasictotype(val.catId,val.goodsName,3,3) //同类商品
      this.topdata = msg
    },
    // 加入购物车
    async addToShoppingcart(item) {
      const obj = {
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        goodsSn: item.goodsSn,
        goodsPrice: item.shopPrice,
        quantity: 1,
        supplierId: item.supplierId,
        skuId: item.skuId,
      }
      if (item.quantity < 1) {
        throttleTipPop(this, 'error', '库存不足')
        return
      }
      // 判断是否登录
      const userInfo = isLogin()
      if (userInfo) {
        let res = {}
        res = await addShoppingCart(obj)
        // this.proDetail = res.data
        if (res.code === 200) {
          this.$emit('getShoppingCartNum')
          throttleTipPop(this, 'success', '加入购物车成功')
        } else {
          throttleTipPop(this, 'error', '添加失败')
        }
      } else {
        // 需要登录
        PubSub.publish(SHOW_LOGINPOP)
      }
    },
    // 获取热销排行
    async getTopFive() {
      const obj = {
        catId: this.catId,
      }
      const res = await getTopFive(obj)
      this.topFive = res
    },
  },
  components: {
    TopSelling,
    Pagination,
  },
}
</script>


<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .product_type
    margin-right 9px
    float left
    padding 0 5px
    height:20px;
    line-height:20px;
    border:1px solid rgba(237,79,72,1);
    border-radius:3px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(237,79,72,1);
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item
    color #333
  /deep/ .el-tabs--border-card
    box-shadow: none;
    // margin-left: 6px;
    // width: 954px;
    border: none;
    box-sizing border-box
  /deep/ .el-tabs--border-card>.el-tabs__header
    background-color rgb(249, 251, 255)
    box-sizing border-box
  /deep/ .el-tabs--border-card>.el-tabs__header .el-tabs__item:first-child
    margin-left 0
  /deep/ .el-tabs__content
    box-sizing border-box
    border 1px solid rgb(238, 244, 255)
    border-top none
  /deep/ .el-tabs__item
    box-sizing border-box
  /deep/ .el-tabs__item.is-active
    top 1px
    box-sizing border-box
    border-top: 1px solid;
    border-bottom: none;
    border-color rgb(238, 244, 255)!important
  /deep/ .el-tabs--border-card>.el-tabs__header
    border-bottom 1px solid rgb(238, 244, 255)
  .empty_show
    padding 40px 0
    display flex
    justify-content center
    img
      width 300px
  .content
    position relative
    display flex
    box-sizing border-box
    padding 20px 8px 0
    autoMargin()
    .top-selling
      margin-right 6px
      .title_wrap
        width 200px
        height 116px
        img
          width 100%
    .list
      padding: 20px 0 0 12px;
      background: #fff;
      // margin-left: 6px;
      // width 954px
      min-height 1100px
      .item:hover
        box-shadow 5px 5px 10px #ececec
      .item:not(:nth-of-type(4n))
        // margin-right 18px
      .item
        float left
        height 394px
        width:225px;
        margin-right 9px
        border:1px solid #eef4ff;
        display flex
        flex-direction column
        align-items center
        padding 25px 9px 20px
        margin-bottom 30px
        box-sizing border-box
      .img-wrap
        width 194px
        height 194px
        margin-bottom 24px
        centered()
        img
          imgSize()
      .item-name
        ellipsis()
        width:189px;
        font-size:12px;
        color:rgba(102,102,102,1);
        line-height:24px;
        text-align center
        margin-bottom 12px
      .price-wrap
        width 100%
        .price
          font-size:12px;
          font-weight:bold;
          color:rgba(248,60,58,1);
          line-height:18px;
        .ori-price
          font-size:12px;
          text-decoration:line-through;
          color:rgba(102,102,102,1);
          line-height:18px;
        .btn
          width:80px;
          height:28px;
          line-height:28px;
          background:#4C86F4
          border-radius:14px;
          font-size:12px;
          font-family:MicrosoftYaHei;
          color:rgba(255,255,255,1);
          text-align center
          cursor pointer
    .pagination >>> .pagination
      margin 10px auto
</style>
