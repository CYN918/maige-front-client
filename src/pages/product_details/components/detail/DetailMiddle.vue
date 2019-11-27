<template>
  <div class="bix-box">
    <div class="box-1">
      <div class="boxWrap" ref="startImg">
        <div class="smallBox" @mouseleave="handleMouseLeave" @mousemove="moveFloatBox">
          <div class="floatBox" ref="floatBox" v-show="isShow"></div>
          <img class="smallImg" ref="smallImg" :src="price.thumbnailImgUrl" />
        </div>
        <div class="bigBox" v-show="isShow">
          <img class="bigImg" ref="bigImg" :src="price.thumbnailImgUrl" />
        </div>
      </div>
      <div class="imgList">
        <div class="prev" :class="{off: canPrev}" @click="moveToPrev"></div>
        <div class="swiper-container" ref="container">
          <ul class="swiperList" ref="swiperList" @mouseover="handleMouseOver">
            <li
              :class="{imgSwiper:true, on:isOn===index}"
              :ref="`imgSwiper${index}`"
              :data-index="index"
              v-for="(item, index) in imgArr"
              :key="index"
            >
              <img :src="item.imgUrl" />
            </li>
          </ul>
        </div>
        <div class="next" :class="{off: canNext}" @click="moveToNext"></div>
    </div>
      <div class="ping">
        <div class="item middle">
          <span class="t1">支付方式</span>
          <i class="iconfont icon-tubiaoku-"></i>
          <span class="t2">支付宝</span>
          <i class="iconfont icon-weixin1"></i>
          <span class="t2">微信</span>
          <i class="iconfont icon-wangshangyinhang"></i>
          <span class="t2">网上银行</span>
          <i class="iconfont icon-gongsizhuanzhang"></i>
          <span class="t2">公司转账</span>
        </div>
        <div class="item">
          <span class="t1">服务</span>
          <span class="t2">售后服务电话:</span>
          <span style="font-weight:Bold;color:#FA6969;font-size:18px">400-930-0158</span>
        </div>
      </div>
    </div>
    <div class="box-2" id="box-2">
      <div class="title_1" style="line-height: 1.5">{{data.goodsName}}</div>
      <ul class="list">
        <li class="item item_bc1" v-if="isShowSku">
              <span class="t1" style="font-size: 16px">优惠价</span>
              <span class="t1-colon">：</span>
              <span class="tr-label">¥</span>
              <span class="tr">{{price.goodsPrice}}</span>
              <span class="t1" style="font-size: 16px;margin-left: 46px;">市场价</span>
              <span class="t1-colon">：</span>
              <span class="tr-label">¥</span>
              <span class="tr" style="text-decoration: line-through">{{price.costPrice}}</span>
          <!-- <p class="plusContai">
             PLUS价
            <span class="plus">PLUS:</span>
            <span class="rmb" style="margin-top:5px">¥</span>
            <span class="plusPrice">176.0</span>
          </p> -->
        </li>
         <li class="item item_bc1 pintuan" style="padding-top:0px" v-else >
            <div class="fightGroup">
              <span class="bigSize">活动</span>
              <span class="line">|</span>
              <img src="@/assets/images/product_detail/naozhong.png" alt="">
              <span class="jiesu">距拼团结束时间还有</span>
              <span class="time">{{d}}天{{h}}时{{m}}分{{s}}秒</span>
              <span class="num">已团{{num||0}}件</span>
            </div>
            <div style=" width: 100%;display: flex;">
              <span class="t1">活动价</span>
              <span class="t1-colon">：</span>
              <span class="tr-label" style="margin-top:5px">¥</span>
              <span class="tr">{{price.goodsPrice}}</span>
              <!-- PLUS价-->
              <!--<span class="tb">PLUS价：</span>
              <span class="tr-label">¥</span>
              <span class="tr">176.0</span>-->
              <!-- PLUS价-->
              <span>原价:</span>
              <span class="td" style="margin-left:9px">¥{{price.costPrice}}</span>
            </div>
        </li>
        <!-- <li class="item item_bc1">
            <span class="t1">优惠价</span>
            <span class="t1-colon">：</span>
            <span class="tr-label">¥</span>
            <span class="tr">{{price.goodsPrice||price.salePrice}}</span> -->
            <!-- PLUS价-->
            <!--<span class="tb">PLUS价：</span>
            <span class="tr-label">¥</span>
            <span class="tr">176.0</span>-->
            <!-- PLUS价-->
            <!-- <span>市场价：</span>
            <span class="td">¥{{price.costPrice}}</span>
        </li> -->
        <!-- 优惠券-->
        <!--<li class="item item_bc2 item_youhui">
            <span class="t1">优惠券</span>
            <span class="t1-colon">：</span>
            <div class="preferential">
              <span class="symbol">¥</span>
              <span class="symbol_number">155</span>
              <span class="symbol_price">满100使用</span>
              <p class="timer">有效期：2019-09-31到期</p>
            </div>
            <div class="preferential">
              <span class="symbol">¥</span>
              <span class="symbol_number">155</span>
              <span class="symbol_price">满100使用</span>
              <p class="timer">有效期：2019-09-31到期</p>
            </div>
            <div class="preferential">
              <span class="symbol">¥</span>
              <span class="symbol_number">155</span>
              <span class="symbol_price">满100使用</span>
              <p class="timer">有效期：2019-09-31到期</p>
            </div>
        </li>-->
        <!-- 优惠券-->
        <li class="item">
          <span class="t1">商品货号</span>
          <span class="t1-colon">：</span>
          <span class="t2 item_number" :title="data.goodsSn">{{data.goodsSn}}</span>
          <span class="t1">来源</span>
          <span class="t1-colon">：</span>
          <!-- <span class="t2">{{data.goodsType== 0 ?'自营':data.goodsType== 1?'京东':data.goodsType== 2?'网易':'苏宁'}}</span> -->
          <span class="t2">{{data.goodsType}}</span>
        </li>
        <li class="item">
          <span class="t1">配送地址</span>
          <span class="t1-colon">：</span>
          <el-select v-model="ruleForm.province" placeholder="请选择省份" style="width:23%" size='medium' @change="provincefunc">
            <el-option
              v-for="item in addressArr"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId">
            </el-option>
          </el-select>

          <el-select v-model="ruleForm.city" placeholder="请选择市" style="width:23%;margin-left:10px" @change="cityfunc" size='medium'>
            <el-option
              v-for="item in cityArr"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId">
            </el-option>
          </el-select>

          <el-select v-model="ruleForm.district" placeholder="请选择地区" style="width:23%;margin-left:10px" size='medium'>
            <el-option
              v-for="item in districtArr"
              :key="item.regionId"
              :label="item.regionName"
              :value="item.regionId">
            </el-option>
          </el-select>
        </li>
        <li class="item middle">
          <span class="t1">数量</span>
          <span class="t1-colon">：</span>
          <i class="decrease" @click.prevent="decrease">-</i>
          <input
            type="text"
            class="number"
            name="number"
            @keydown.up="increase"
            @keydown.down="decrease"
            ref="number"
            v-model="number"
            @input="handleNumInput"
          />
          <i class="increase" @click.prevent="increase">+</i>
          <span class="t2 storage" style="text-align: center;line-height: 1.2">{{price.quantity ? `库存${price.quantity}件` : '库存不足'}}</span>
        </li>
        <li class="item item-specification" v-for="(item,index) in data.skuList" :key="index">
          <span class="t1" style="flex-shrink: 0">{{item.specName}}</span>
          <span class="t1-colon" style="flex-shrink: 0">：</span>
          <ul class="clearfix">
            <li
              class="specification"
              :for="`${item.specName}${index2}`"
              v-for="(data,index2) in item.specValues"
              :key="index2"
              @click="ShowPrice(data,index,index2,item)"
            >
              <input
                :checked="index2=== item.index"
                type="radio"
                :name="index+'color_classify'"
                :id="`${item.specName}${index2}`"
              />
              <span class="t2 color my-radio">{{data.value}}</span>
            </li>
          </ul>
        </li>
        <li class="item item-sp" v-if="isShowSku">
          <input
            id="buy"
            type="button"
            :disabled="price.quantity==0"
            :class="price.quantity==0 ?'gray':''"
            value="立即购买"
            @click="buyRightNow"
          />
          <input
            id="add2shoppingCart"
            :disabled="price.quantity==0"
            :class="price.quantity==0?'gray':''"
            type="button"
            @click="addToShoppingCart"
            value="加入购物车"
          />
        </li>

        <li class="item" v-show=" false">
          <span class="t1">服务</span>
          <span class="t1-colon">:</span>
          <span class="t2">售后服务电话：</span>
          <span >400-930-0158</span>
        </li>
      </ul>
      <!--拼团活动-->
      <div>
        <FightGroup v-if="!isShowSku" :number="number" :data="data" :skuId='this.price.skuId'></FightGroup>
      </div>
    </div>
    <div class="box-3" v-if="price.jdPrice   || price.tmallPrice ">
      <div class="title-2">商家比价</div>
      <div class="right_div1">
        <div class="product-1" v-if=" price.jdPrice ">
          <div class="contrast_product">
            <a :href="price.jdGoodsUrl" target="_blank" class="img-wrap" @mouseenter="moveTip" @mouseleave="leaveTip">
              <img :src="price.jdImgUrl" />
              <div class="tip" :class="this.tipIndex==true?'':'tipActive'">
                <span>点开对比</span>
              </div>
            </a>
            <p class="product-name" :title="price.jdGoodsName">{{price.jdGoodsName}}</p>
            <p class="text">对比价：{{(price.jdPrice === 0 || price.jdPrice === '' || price.jdPrice === null)?'暂无':price.jdPrice+'元'}}</p>
          </div>
        </div>
        <div class="product-1" v-if=" price.tmallPrice">
          <div class="contrast_product">
            <a
              target="_blank"
              :href="price.tmailGoodsUrl"
              class="img-wrap"
              @mouseenter="moveTips"
              @mouseleave="leaveTips"
            >
              <img :src="price.tmailImgUrl" />
              <div class="tip" :class="this.tipIndexs==true?'':'tipActive'">
                <span>点开对比</span>
              </div>
            </a>
            <p class="product-name" :title="price.tmailGoodsName">{{price.tmailGoodsName}}</p>
            <p class="text">对比价：{{(price.tmallPrice === 0 || price.tmallPrice === '' ||  price.tmallPrice === null)?'暂无':price.tmallPrice+'元'}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PubSub from 'pubsub-js'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import { addShoppingCart, obtainSku ,getGroupTime , reqAddressCascader } from '@/api/index'
import { isLogin, throttleTipPop,addressUrl} from '@/assets/utils/utils'
import FightGroup from './fightGroup'

export default {
  name: "DetailMiddle",
  props: ["data", "skuList"],
  components: {
    FightGroup
  },
  data() {
    return {
      number: 1,
      price: {},
      storeId: "", // 商品组合id
      show: false,
      isShow: false,
      isOn: 0,
      ulLeft: 0,
      width: 60,
      margin: 6,
      maxLeft: 0,
      imgArr: [], // 商品拼接相册
      tipIndex: true,
      tipIndexs: true,
      skuidList: "",
      isShowSku: true,
      activity_id:'',
      activity_goods_id:'',
      activity_type_num:'',
      d:'',
      h:'',
      m:'',
      s:'',
      flag:false,
      num:'',
      cityArr:[],
      addressArr:[],
      districtArr:[],
      ruleForm:{
        district:'',
        city:'',
        province:''
      }
    }
  },
  created(){
    reqAddressCascader(1).then(res => {
      this.addressArr = res.data.list;
    })
  },
  async mounted(){
    const  url = addressUrl()
    //拼团详情页面跳转过来
    this.num = url.num
    const  activityTypeNum =url.activityTypeNum
    this.activity_id = url.activityId
    this.activity_goods_id = url.activityGoodsId
    this.activity_type_num=url.activityTypeNum
    if(activityTypeNum == 7){
      this.isShowSku=false
     const res = await  getGroupTime(url.activityId)
      if(res.code === 200 ){
          let time = setInterval(()=>{
          if(this.flag == true){
            clearInterval(time)
          }
          const { entTime } = res.data
          this.timeDown(entTime)
        },1000)
      }
    }
  },
  methods: {
    // 拼团进来计时器
     timeDown (data) {
      const endTime = new Date(data)
      const startTime = new Date();
      let leftTime = parseInt((endTime.getTime()-startTime.getTime())/1000)
      let d=this.formate(parseInt(leftTime/(24 * 60 * 60)))
      let h = this.formate(parseInt(leftTime/(60*60)%24))
      let m = this.formate(parseInt(leftTime/60%60))
      let s = this.formate(parseInt(leftTime%60))
      if(leftTime <= 0){
        this.flag = true
      }
      this.d = d
      this.h=h
      this.m=m
      this.s=s
    },
    formate (time) {
      if(time>=10){
        return time
      }else{
        return `0${time}`
      }
    },

    // 組合商品相冊
    ImageArr(data) {
      this.imgArr = [];
      this.imgArr.push({
        imgUrl: data.thumbnailImgUrl
      });
      if (this.data.galleryList.length) {
        this.data.galleryList &&
          this.data.galleryList.forEach(item => {
            this.imgArr.push({
              imgUrl: item.imgUrl
            });
          });
      }
    },

    // 立即购买
    buyRightNow() {
      if (this.number < 1) {
        throttleTipPop(this, "error", "添加至购物车的商品数量不得少于1");
        return;
      }
      let obj;
      if (this.activity_type_num == 7) {
        obj = {
          goodsId: this.data.goodsId,
          quantity: this.number,
          skuId: this.price.skuId
        };
      } else {
        obj = {
          goodsId: this.data.goodsId,
          quantity: this.number,
          skuId: this.price.skuId,
          activityId: this.activity_id,
          activityGoodsId: this.activity_goods_id,
          activityTypeNum: this.activity_type_num
        };
      }

      if (!this.price.skuId) {
        // 页面没有SKUID时
        return;
      }
      if (this.number > this.price.quantity) {
        throttleTipPop(this, "error", "库存不足");
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
    // 添加商品至购物车
    async addToShoppingCart() {
      if (this.number < 1) {
        throttleTipPop(this, "error", "添加至购物车的商品数量不得少于1");
        return;
      }
      const obj = {
        goodsId: this.data.goodsId,
        goodsName: this.data.goodsName,
        goodsSn: this.data.goodsSn,
        goodsPrice: this.price.goodsPrice,
        quantity: this.number,
        supplierId: this.data.supplierId,
        skuId: this.price.skuId,
        activityId: this.activity_id,
        activityGoodsId: this.activity_goods_id,
        activityTypeNum: this.activity_type_num
      };
      if (this.number > this.price.quantity) {
        throttleTipPop(this, "error", "库存不足");
        return;
      }
      // console.log(obj)
      // 判断是否登录
      const userInfo = isLogin();
      if (userInfo) {
        let res = {};
        try {
          res = await addShoppingCart(obj);
        } catch (e) {
          console.log(e)
        }
        // this.proDetail = res.data
        if (res.code === 200) {
          throttleTipPop(this, "success", "加入购物车成功！");
          this.$emit("getShoppingCartNum");
        } else {
          this.$message(res.message);
        }
      } else {
        // 需要登录
        PubSub.publish(SHOW_LOGINPOP);
      }
    },
    // 点击变动价格
    ShowPrice(data, index, index2, item) {
        item.index = index2
        const arr = this.storeId.split('_')
        arr.splice(index, 1, data.valueId)
        this.findData(arr.join('_'))
        this.storeId = arr.join('_')
    },
    decrease() {
      this.number = parseInt(this.number, 10) - 1;
      if (this.number < 1) {
        this.number = 1;
      }
    },
    increase() {
      // console.log(this.price)
      this.number = parseInt(this.number, 10) + 1;
    },
    handleNumInput() {
      const reg = /^(\s|\d|([1-9]\d+))$/;
      if (reg.test(this.number)) {
        this.number = this.number;
      } else {
        this.number = 1;
      }
    },
    // 筛选sku信息
    findData(value) {
      let arr = this.data.skuDetailList || [];
        // 商品进入
        for (let i = 0; i < arr.length; i++) {
          if (arr[i].specValueIds === value) {
            this.price = arr[i];
            this.ImageArr(arr[i]);
            return;
          } else if (i === arr.length - 1 && arr[i].specValueIds !== value) {
            this.price = {};
            return false;
          }
        }
      },
    moveFloatBox(e) {
      this.isShow = true;
      const smallImgSize = this.$refs.smallImg.offsetWidth;
      const bigImgSize = this.$refs.bigImg.offsetWidth;
      const index = bigImgSize / smallImgSize;
      const eleWidth = this.$refs.startImg.offsetWidth;
      const eleHeight = this.$refs.startImg.offsetHeight;
      const mouseLeft = e.clientX - this.$refs.startImg.offsetLeft;
      const mouseTop = e.clientY + document.documentElement.scrollTop;
      const mouseTopInEle = mouseTop - this.$refs.startImg.offsetTop;
      const width = this.$refs.floatBox.offsetWidth;
      const height = this.$refs.floatBox.offsetHeight;
      const halfWidth = width / 2;
      const halfHeight = height / 2;
      const maxTop = eleHeight - height;
      const maxLeft = eleWidth - width;
      let top = mouseTopInEle - halfWidth;
      let left = mouseLeft - halfHeight;
      if (top < 0) {
        top = 0;
      } else if (top > maxTop) {
        top = maxTop;
      }
      if (left < 0) {
        left = 0;
      } else if (left > maxLeft) {
        left = maxLeft;
      }
      this.$refs.floatBox.style.left = `${left}px`;
      this.$refs.floatBox.style.top = `${top}px`;
      this.$refs.bigImg.style.left = `${-left * index}px`;
      this.$refs.bigImg.style.top = `${-top * index}px`;
    },
    handleMouseLeave() {
      this.isShow = false;
    },
    calcMaxLeft() {
      const ulWidth = this.$refs.swiperList.offsetWidth;
      const containerWidth = this.$refs.container.offsetWidth;
      const maxLeft = ulWidth - containerWidth - this.margin;
      this.maxLeft = maxLeft;
    },
    moveToPrev() {
      this.ulLeft = this.$refs.swiperList.style.left.split("px")[0] * 1;
      const left = this.ulLeft + this.margin;
      if (left > 0) {
        this.ulLeft = 0;
        return;
      }
      this.$refs.swiperList.style.left = `${left + this.width}px`;
      this.ulLeft = this.$refs.swiperList.style.left.split("px")[0] * 1;
    },
    moveToNext() {
      this.ulLeft = this.$refs.swiperList.style.left.split("px")[0] * 1;
      const left = this.ulLeft - this.margin;
      if (left < -this.maxLeft) {
        this.ulLeft = -this.maxLeft;
        return;
      }
      this.$refs.swiperList.style.left = `${left - this.width}px`;
      this.ulLeft = this.$refs.swiperList.style.left.split("px")[0] * 1;
    },
    handleMouseOver() {
      const e = window.event;
      if (e.path[1].nodeName.toLowerCase() === "li") {
        const ele = e.path[1];
        const src = ele.childNodes[0].src;
        this.isOn = ele.dataset.index * 1;
        this.$refs.smallImg.src = src;
        this.$refs.bigImg.src = src;
      }
    },
    //选择省份触发
    provincefunc(val) {
      this.cityArr = [];
      this.districtArr = [];
      this.ruleForm.city = "";
      this.ruleForm.district = "";
      reqAddressCascader(val).then(res => {
        this.cityArr = res.data.list;
      });
    },
    //选择市触发
    cityfunc(val) {
      this.districtArr = [];
      this.ruleForm.district = "";
      reqAddressCascader(val).then(res => {
        this.districtArr = res.data.list;
      });
    },
    // 移到图片给与提示
    moveTip() {
      this.tipIndex = false;
    },
    // 移开隐藏
    leaveTip() {
      this.tipIndex = true;
    },
    moveTips() {
      this.tipIndexs = false;
    },
    // 移开隐藏
    leaveTips() {
      this.tipIndexs = true;
    }
  },
  updated() {
    this.calcMaxLeft();
  },
  // 活动页传的商品skuid
  watch: {
    price(val) {
      if (JSON.stringify(val) === "{}") {
        throttleTipPop(this, "error", "该规格商品库存不足，请等待商家补货！");
        this.price = {
          quantity: 0
        };
      }
    },
    data(val) {
      if (!this.show) {
        let str = "";
        val.skuList &&
          val.skuList.forEach(item => {
            str += item.specValues[0].valueId + "_";
          });
        const value = str.substring(0, str.length - 1);
        this.storeId = value;
        this.findData(value);
        this.show = true;
      }
    }
  },
  computed: {
    canNext() {
      return this.ulLeft === -this.maxLeft;
    },
    canPrev() {
      return this.ulLeft === 0;
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.contrast_product
  border: 1px solid #d7e0f1;
.specification {
  float: left;
  margin-bottom: 6px;
}

.bix-box {
  display: flex;
}

.box-2 {
  margin-left: 27px;
  width: 536px;
  .title_1 {
    font-size: 16px;
    color: #333;
    margin-bottom: 17px;
    font-weight: bold;
  }

  .list {
    .item {
      position: relative;
      display: flex;
      align-items: baseline;
      margin-bottom: 16px;

      .t1 {
        display: inline-block;
        width: 68px;
        font-size: 14px;
        color: #999;
        text-align: justify;
        text-align-last: justify;
        margin-left: 22px;
        flex-shrink: 0;
      }

      .t1-colon {
        font-size: 14px;
        color: rgba(153, 153, 153, 1);
        margin-right: 20px;
      }

      .t2 {
        display: inline-block;
        font-size: 14px;
        color: #999;
      }

      .tr-label, .tr {
        font-weight: bold;
        color: rgba(250, 105, 105, 1);
      }

      .tr-label {
        font-size: 12px;
        margin-right: 4px;
      }

      .tr {
        font-size: 18px;
        width: 100px;
      }

      .tb {
        font-size: 14px;
        font-weight: bold;
        color: rgba(30, 159, 255, 1);
      }

      .td {
        font-size: 14px;
        font-weight: 400;
        text-decoration: line-through;
        color: rgba(102, 102, 102, 1);
      }

      .coupon {
        width: 90px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: rgba(166, 214, 250, 1);
        border: 1px solid rgba(101, 169, 220, 1);
        border-radius: 2px;
        font-size: 12px;
        color: rgba(51, 112, 213, 1);
        margin-right: 7px;
      }

      .coupon:before, .coupon:after {
        position: relative;
        display: inline-block;
        content: '';
        width: 6px;
        height: 6px;
        background: #fff;
        border-radius: 2px;
        border-left: 1px solid rgba(101, 169, 220, 1);
        border-bottom: 1px solid rgba(101, 169, 220, 1);
      }

      .coupon:before {
        transform: rotate(225deg);
        left: -8px;
      }

      .coupon:after {
        transform: rotate(45deg);
        right: -9px;
      }

      .number {
        width: 45px;
        height: 36px;
        border: 2px solid rgba(98, 149, 244, 1);
        box-sizing: border-box;
        padding: 0 6px;
        color: #333;
        text-align: center;
      }

      .decrease, .increase {
        width: 18px;
        height: 34px;
        line-height: 34px;
        background: rgba(91, 144, 243, 1);
        border: 1px solid rgba(98, 149, 244, 1);
        text-align: center;
        color: white;
        font-size: 16px;
      }

      .decrease {
        border-right: none;
      }

      .increase {
        border-left: none;
      }

      .increase, .decrease, my-radio, #buy, #add2shoppingCart, .city_select, .title, .city_item {
        cursor: pointer;
      }

      .storage {
        margin-left: 20px;
      }

      .item_number {
        display: inline-block;
        width: 136px;
        ellipsis();
      }

      input[type=radio] {
        visibility: hidden;
        position: absolute;
      }

      .my-radio {
        position: relative;
        display: inline-block;
        padding: 0 12px;
        height: 34px;
        line-height: 34px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        margin-right: 10px;
        cursor: pointer;
      }

      input[type=radio]:checked+.my-radio {
        color: rgba(30, 159, 255, 1);
        border: 1px solid rgba(76, 134, 244, 1);
      }

      input[type=radio]:checked+.my-radio:after {
        position: absolute;
        bottom: 0;
        right: 0;
        display: inline-block;
        content: '';
        width: 0px;
        height: 0px;
        border-bottom: 9px solid #4C86F4;
        border-right: 9px solid #4C86F4;
        border-top: 9px solid transparent;
        border-left: 9px solid transparent;
      }

      input[type=radio]:checked+.my-radio:before {
        position: absolute;
        bottom: 4px;
        right: 1px;
        display: inline-block;
        content: '';
        width: 8px;
        height: 3px;
        border-bottom: 1.5px solid #fff;
        border-left: 1.5px solid #fff;
        z-index: 1;
        transform: rotate(-45deg);
      }

      #buy, #add2shoppingCart {
        position: relative;
        width: 140px;
        height: 38px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        line-height: 34px;
        font-family: MicrosoftYaHei;
      }

      #buy {
        background: #5b90f3;
        margin-left: 111px;
      }

      #add2shoppingCart {
        background: rgba(250, 105, 105, 1);
        margin-left: 21px;
      }

      #buy:active, #add2shoppingCart:active {
        top: 2px;
      }

      .iconfont {
        margin-right: 4px;
        font-size: 18px;
      }

      .icon-tubiaoku-, .icon-wangshangyinhang {
        color: #65A9DC;
      }

      .icon-gongsizhuanzhang {
        color: #6FC55C;
        font-size: 16px;
      }

      .icon-weixin1 {
        color: #6FC55C;
      }
    }

    .item-specification {
      align-items: flex-start;
    }

    .item_bc1, .item_bc2 {
      background: #F7FAFF;
      margin: 0;
    }

    .item_bc1 {
      padding: 24px 0 24px 0;
      margin-bottom: 20px;
    }

    .item_bc2 {
      position: relative;
      padding: 12px 0 24px 0;
      margin-bottom: 20px;
    }

    .middle {
      align-items: center;
    }

    .item-sp {
      padding: 30px 0 54px 0;
      border-bottom: 1px solid #D8D8D8;
    }
  }
}

.box-3 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 33px;

  .title-2 {
    width: 160px;
    height: 39px;
    background: url('../../../../assets/images/product_detail/comparative_price.png');
    background-size: 100%;
    text-align: center;
    color: #fff;
    font-family: MicrosoftYaHei;
    font-weight: bold;
    text-align: center;
    line-height: 39px;
    font-size: 18px;
  }
  .right_div1{
    padding-bottom: 0;
    box-sizing: border-box;
    width: 158px;
  }
   .product-1 {
     width 100%
     margin-bottom 12px
    .img-wrap {
      centered();
      width: 132px;
      height: 132px;
      margin: 3px auto 12px;
      position: relative;
      cursor: pointer;
      overflow: hidden;

      img {
        max-height: 100%;
        max-width: 100%;
      }

      .tip {
        width: 68px;
        height: 23px;
        position: absolute;
        top: 12px;
        right: 1px;
        background: linear-gradient(to right, #FF4E4E, #FF9696);
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: #FFFFFF;
        border-radius: 12px 0px 0px 12px;
        opacity: 0;
        transition: all 0.4s linear;
      }

      .tipActive {
        transition: all 0.4s linear;
        opacity: 1;
      }
    }

    .product-name {
      padding: 0 6px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      color: rgba(102, 102, 102, 1);
      line-height: 24px;
      text-align: center;
      ellipsis();
    }

    .text {
      padding: 0 6px;
      font-size: 12px;
      font-family: Microsoft YaHei;
      color: rgba(255, 0, 0, 1);
      line-height: 24px;
      text-align: center;
      padding-bottom: 10px;
    }
  }
}

.box-1 {
  width: 404px;

  .boxWrap {
    width: 380px;
    height: 380px;
    position: relative;
    margin-bottom: 12px;
    left: 1px;
    border: 1px solid rgba(223, 231, 242, 1);

    .smallBox {
      width: 380px;
      height: 380px;
      position: relative;
      z-index: 50;
      cursor: move;

      .smallImg {
        width: 100%;
        height: 100%;
      }

      .floatBox {
        width: 200px;
        height: 200px;
        position: absolute;
        background: #ffffcc;
        border: 1px solid #ccc;
        opacity: 0.5;
      }
    }

    .bigBox {
      display: block;
      width: 400px;
      height: 400px;
      position: absolute;
      left: 410px;
      top: 0;
      z-index: 50;
      overflow: hidden;
      border: #ccc solid 1px;

      .bigImg {
        position: absolute;
        z-index: 100;
      }
    }
  }

  .imgList {
    display: flex;
    height: 60px;
    width: 384px;
    position: relative;
    overflow: hidden;

    .swiper-container {
      position: relative;
      width: 330px;
      overflow: hidden;
    }
    .swiperList {
      transition: all 0.3s linear;
      position: relative;
      float: left;
      display: flex;
      left:0;
    }

    .prev {
      margin-right: 6px;
    }

    .next {
      margin-left: 6px;
    }

    .prev, .next {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 60px;
    }

    .prev:hover, .next:hover {
      cursor: pointer;
      background: #ececec;
    }

    .prev:after, .next:after {
      display: inline-block;
      content: '';
      width: 12px;
      height: 12px;
      border-bottom: 2px solid #1E9FFF;
      border-left: 2px solid #1E9FFF;
    }

    .off:after, .off:after {
      border-bottom: 2px solid #999;
      border-left: 2px solid #999;
    }

    .prev:after {
      transform: rotate(45deg);
      margin-left: 8px;
    }

    .next:after {
      transform: rotate(-135deg);
      margin-right: 8px;
    }

    .imgSwiper {
      height: 60px;
      width: 60px;
      border: #ccc solid 1px;
      margin-right: 6px;
      cursor: pointer;
      background: #F7FAFF;
      flex-shrink: 0;
      box-sizing: border-box;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .on {
      border: #65a9dc solid 2px;
    }
  }
}

.preferential {
  width: 139px;
  height: 71px;
  background: url('../../../../assets/images/product_detail/coupons.png');
  margin-right: 5px;
  position: relative;
  background-size: cover;
  border-radius: 2px;
  font-family: Microsoft YaHei;

  .timer {
    font-size: 12px;
    -webkit-transform: scale(0.84);
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #666;
    position: absolute;
    bottom: 4px;
  }

  .symbol {
    display: inline-block;
    font-size: 10px;
    -webkit-transform: scale(0.84);
    margin-left: 3px;
    margin-top: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  .symbol_number {
    display: inline-block;
    font-size: 22px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 6px;
  }

  .symbol_price {
    display: inline-block;
    font-size: 10px;
    -webkit-transform: scale(0.84);
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    top: 18px;
    left: 66px;
  }
}

.gray {
  background: #ccc !important;
}

.item_youhui {
  align-items: normal !important;
}

.ping {
  margin-top: 47px;

  .item {
    position: relative;
    display: flex;
    align-items: baseline;
    margin-bottom: 20px;

    .t1 {
      margin-right: 12px;
      display: inline-block;
      width: 58px;
      font-size: 14px;
      color: rgba(153, 153, 153, 1);
      text-align: justify;
      text-align-last: justify;
      margin-right: 30px;
    }

    .t2 {
      margin-right: 12px;
      display: inline-block;
      font-size: 14px;
      color: rgba(102, 102, 102, 1);
    }
  }

  .service {
    .t2 {
      color: rgba(71, 159, 255, 1);
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
    }
  }

  .iconfont {
    margin-right: 4px;
    font-size: 18px;
  }

  .icon-tubiaoku-, .icon-wangshangyinhang {
    color: #65A9DC;
  }

  .icon-gongsizhuanzhang {
    color: #6FC55C;
    font-size: 16px;
  }

  .icon-weixin1 {
    color: #6FC55C;
  }
}
.pintuan
  display flex
  flex-direction column
  .fightGroup
    display flex
    width:537px;
    height:39px;
    line-height 39px
    background:#FF4E4E;
    border-radius:20px 0px 0px 0px;
    color white
    margin-bottom 25px
    .bigSize
      margin-left 19px
      font-size:22px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    .line
      margin 0 13px
      width 6px
      height 23px
    img
      width 16px
      height 16px
      margin-right: 13px;
      margin-top: 11px;
    .jiesu
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    .time
      margin 0 84px 0 16px
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    .num
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
      margin-right 15px
.plusContai
  .plus
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(102,102,102,1);
  .rmb
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(76,134,244,1);
  .plusPrice
    font-size:18px;
    font-family:Microsoft YaHei;
    font-weight:bold;
    color:rgba(76,134,244,1);
/deep/ .el-input__inner{
    border-radius:0;
    background:rgba(255,255,255,1);
    border:1px solid rgba(76,134,244,1);
}
/deep/ .el-input__icon{
  color:#5B90F3 !important;
}
</style>
