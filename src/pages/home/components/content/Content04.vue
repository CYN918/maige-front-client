<template>
  <div v-if="componentStatus&&componentStatus[0].componentStatus==0">
    <div class="prefer-area"  v-if="specialOffer" :style="{background:content.bgcolor||bgcolor}">
    <div class="left-more">
        <img :src=componentContents.picture||specialOffer.homePageImgUrl alt="" @click="gotoTimelimitedSpike">
    </div>
    <ul class="list clearfix">
      <li class="item" v-for="(item,index) in (((content.activityGoods.length>0&&content.activityGoods)||specialOffer.activityHomepageGoodsReturns)||[]).slice(0,5)" :key="index">
        <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${specialOffer.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
          <div class="image">
            <img :src=item.skuImg alt="" @mouseenter="handleCache(index)"  @mouseleave="leave" :class="index==selecteNum?'amplification':''" >
          </div>
          <p class="name">{{item.goodsName}}</p>
        </a>
        <p class="bottom">
          <span class="price">￥{{item.salePrice}}</span>
          <span  class="btn-cart" @click="addToShoppingcart(item)">
            <i class="iconfont icon-gouwuche"></i>
          </span>
        </p>
      </li>
    </ul>
  </div>
  </div>
</template>
<script>
import { isLogin ,throttleTipPop} from '@/assets/utils/utils'

import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart } from '@/api/index'
import PubSub from 'pubsub-js'

export default {
  name: 'Content04',
  props:['activity','componentStatus'],
  data(){
    return{
      selecteNum:null,
      specialOffer:'',
      componentName:'',
      content:'',
      bgcolor:'#5172ff',
      componentContents:''
    }
  },

  mounted(){
    this.componentName =  this.componentStatus[0].componentName||''
    this.componentContents = this.componentStatus[0].componentContents[0]
    this.content = JSON.parse(this.componentStatus[0].componentContents[0].content)||''
    this.activity.forEach(item=>{
        if(item.activityTypeNum==5){
          this.specialOffer = item
        }
    })
  },
  watch:{
    activity(val,oldval){
      if(val!==oldval){
        val.forEach(item => {
          if( item.activityTypeNum === 5){
            this.specialOffer = item
          }
        })
      }
    }
  },
   //加入购物车
 methods: {
   handleCache(index){
     this.selecteNum = index
     console.log(this.selecteNumm,index)
   },
   leave(){
     this.selecteNum = null
   },

   //跳转页面
   gotoTimelimitedSpike(){
     if(this.content&&this.content.zoneLink){
          window.location.href = this.content.zoneLink
     }else{
          window.location.href = `specialOffer.html?activityId=${this.specialOffer.activityId}&activityTypeNum=${this.specialOffer.activityTypeNum}`
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
        activityTypeNum:this.specialOffer.activityTypeNum
    }
      if (item.quantity < 1) {
        this.$message({
          type: 'warning',
          message: '库存不足',
        })
        return
      }
      // 判断是否登录
      const userInfo = isLogin()
      if (userInfo) {
        let res = {}
        try {
          res = await addShoppingCart(obj)
        } catch (e) {
          this.$alert(e)
        }
        // this.proDetail = res.data
        if (res.code === 200) {
          this.$bus.$emit('getShoppingCartNum')
          throttleTipPop(this, 'success', '加入购物车成功')
        } else {
          throttleTipPop(this, 'error', '添加失败')
        }
      } else {
        PubSub.publish(SHOW_LOGINPOP)
      }
    },
  }
};
</script>

<style scoped lang="stylus">
   .prefer-area {
    padding-bottom: 10px;
    background: #5172ff;
    border-top-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    width: 1200px;
    margin: 0 auto
  }

   .prefer-area .left-more {
    float: left;
    width: 200px;
    height: 275px;
    overflow: hidden;
  }

   .prefer-area .left-more img {
    width: 200px;
    height: 275px;
  }

   .prefer-area .list {
    margin-left: 200px;
  }

   .prefer-area .item {
    float: left;
    width: 200px;
    padding: 20px;
    height: 265px;
    box-sizing: border-box;
    background: #fff;
  }

   .prefer-area .item .image {
    position: relative;
    margin-bottom: 10px;
  }

   .prefer-area .item .image::after {
    display: block;
    content: '';
    width: 100%;
    padding-top: 100%;
  }

   .prefer-area .item .image img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

   .prefer-area .item .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 15px;
    text-align: center;
  }

   .prefer-area .item .name:hover {
    color: #b62323;
  }

   .prefer-area .item .bottom .price {
    color: #b62323;
    font-size: 16px;
    line-height: 26px;
  }

   .prefer-area .item .bottom .btn-cart {
    float: right;
  }
   .prefer-area .item .bottom .btn-cart .icon-gouwuche {
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
