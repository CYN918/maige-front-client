<template>
<div v-if="componentStatus&&componentStatus[0].componentStatus==0">
  <div class="sale-area" v-if="discount" :style="{background:content.bgcolor||bgcolor}">
    <ul class="list clearfix">
      <li class="item" v-for="(item,index) in (((content.activityGoods.length>0&&content.activityGoods)||discount.activityHomepageGoodsReturns)||[]).slice(0,5)" :key="index">
          <div class="image">
              <a :href=" `product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${discount.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                 <img :src=item.skuImg alt=""  @mouseenter="handleCache(index)"  @mouseleave="leave" :class="index==selecteNum?'amplification':''">
              </a>
          </div>
          <p class="name">{{item.goodsName}}</p>
        <p class="bottom">
          <span class="price">￥{{item.salePrice}}</span>
          <span  @click="addToShoppingcart(item)" class="btn-cart">
            <i class="iconfont icon-gouwuche"></i>
          </span>
        </p>
      </li>
    </ul>
    <div class="left-more">
        <img :src=componentContents.picture||discount.homePageImgUrl alt="" @click="gotoTimelimitedSpike">
    </div>
  </div>
</div>
</template>
<script>
import PubSub from 'pubsub-js'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import { isLogin, throttleTipPop,addressUrl } from '@/assets/utils/utils'
import { addShoppingCart } from '@/api/index'
import {mapState } from 'vuex'
export default {
  name: 'Content05',
  props: ['activity','componentStatus'],
  data() {
    return {
      selecteNum:null,
      discount:'',
      componentName:'',
      content:'',
      bgcolor:'#ff5a81',
      componentContents:'',

    }
  },
  watch:{
    activity(val,oldVal){
      if(val!==oldVal){
         val.forEach(item => {
          if( item.activityTypeNum === 6){
            this.discount =  item
          }
        })
      }
    }
  },
 mounted(){
    this.componentName =  this.componentStatus[0].componentName||''
    this.componentContents = this.componentStatus[0].componentContents[0]
    this.content = JSON.parse(this.componentStatus[0].componentContents[0].content)||''
    this.activity.forEach(item=>{
      if( item.activityTypeNum === 6){
            this.discount =  item
          }
    })
  },

  // 加入购物车
  methods: {
    handleCache(index){
      this.selecteNum = index
      console.log(this.selecteNumm,index)
    },
    leave(){
      this.selecteNum = null
    },

    //跳转链接
  gotoTimelimitedSpike(){
    if(this.content&&this.content.zoneLink){
            window.location.href = this.content.zoneLink
      }else{
            window.location.href =`discount.html?activityId=${this.discount.activityId}&activityTypeNum=${this.discount.activityTypeNum}`
      }
    },
    // 加入购物车
    async addToShoppingcart(item) {
      const obj = {
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        goodsSn: item.goodsSn,
        goodsPrice: item.salePrice,
        quantity: 1,
        supplierId: item.supplierId,
        skuId: item.skuId,
        activityId:item.activityId,
        activityGoodsId:item.activityGoodsId,
        activityTypeNum:this.discount.activityTypeNum
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
          this.$bus.$emit('getShoppingCartNum')
          throttleTipPop(this, 'success', '加入购物车成功')
        } else {
          throttleTipPop(this, 'error', '添加失败')
        }
      } else {
        // 需要登录
        PubSub.publish(SHOW_LOGINPOP)
      }
    },
  },
}
</script>

<style scoped lang="stylus">
   .sale-area {
    padding-bottom: 10px;
    margin-bottom: 30px;
    background: #ff5a81;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto
  }
   .sale-area .left-more {
    float: right;
    width: 200px;
    height: 275px;
    margin-top: -275px;
    overflow: hidden;
  }

   .sale-area .left-more img {
    width: 200px;
    height: 275px;
  }

   .sale-area .list {
    margin-right: 200px;
  }

   .sale-area .item {
    float: left;
    width: 200px;
    padding: 20px;
    height: 265px;
    box-sizing: border-box;
    background: #fff;
  }

   .sale-area .item .image {
    position: relative;
    margin-bottom: 10px;
  }

   .sale-area .item .image::after {
    display: block;
    content: '';
    width: 100%;
    padding-top: 100%;
  }

   .sale-area .item .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

   .sale-area .item .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    text-align: center;
  }

   .sale-area .item .name:hover {
    color: #b62323;
  }

   .sale-area .item .bottom .price {
    color: #b62323;
    font-size: 16px;
    line-height: 26px ;
  }

   .sale-area .item .bottom .btn-cart {
    float: right;
  }
   .sale-area .item .bottom .btn-cart .icon-gouwuche {
     display: inline-block;
     width: 26px;
     height: 26px;
     line-height: 26px;
     background: #ed4f48;
     border-radius: 50%;
     text-align: center;
     font-size: 14px;
     color: #fff;
   }
   .amplification
     transform: scale(1.1)
</style>
