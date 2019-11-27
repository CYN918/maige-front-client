<template>
  <div class="content_div">
    <div>
      <span
        @click="ckencknum(index)"
        v-for="(item,index) in dataArr"
        :class="index == num?'no_span select_span':'no_span'"
        :key="item.value"
      >{{item.name}}</span>
    </div>
    <!-- 解决样式问题 -->
    <div class="top_div" v-if="num == 0">
      <div class="span_div"  @click="leftbtn">
        <span class="left_span"></span>
      </div>
      <ul class="shop_ul" ref="shopul">
        <li v-for="item in goodsArr" :key="item.goodsId">
          <a class="item" :href="`product_details.html?goodsId=${item?item.goodsId:''}`">
            <div class="li_div">
              <img :src="item.goodsThumbnailImgUrl" :title="item.goodsName" alt />
            </div>
            <div class="name_div" :title="item.goodsName">{{item.goodsName}}</div>
            <div class="price_div">
              <div style="width:60%">商城价：{{item.shopPrice}}</div>
              <div style="width:40%" v-if="item.goodsType === 3">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else-if="item.goodsType === 2">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else-if="(item.goodsType === 1 || item.goodsType === 0 ) && item.jdPrice">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else>{{item.costPrice}}元</div>
            </div>
          </a>
        </li>
      </ul>
      <div class="right_div1" @click="rightbtn">
        <span class="right_span"></span>
      </div>
    </div>
    <!-- 解决样式问题 -->
    <div class="top_div" v-if="num == 1">
      <div class="span_div"  @click="leftbtn">
        <span class="left_span"></span>
      </div>
      <ul class="shop_ul" ref="shopul">
        <li v-for="item in goodsArr" :key="item.goodsId">
          <a class="item" :href="`product_details.html?goodsId=${item?item.goodsId:''}`">
            <div class="li_div">
              <img :src="item.goodsThumbnailImgUrl" :title="item.goodsName" alt />
            </div>
            <div class="name_div" :title="item.goodsName">{{item.goodsName}}</div>
            <div class="price_div">
              <div style="width:60%">商城价：{{item.shopPrice}}</div>
              <div style="width:40%" v-if="item.goodsType === 3">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else-if="item.goodsType === 2">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else-if="(item.goodsType === 1 || item.goodsType === 0 ) && item.jdPrice">{{item.jdPrice}}元</div>
              <div style="width:40%" v-else>{{item.costPrice}}元</div>
            </div>
          </a>
        </li>
      </ul>
      <div class="right_div1" @click="rightbtn">
        <span class="right_span"></span>
      </div>
    </div>
    <div class="content">
      <top-selling :topFive="proArr" :topdata='topdata'></top-selling>
      <content-right :data="proDetai" :commentCount="proDetai.commentCount" :shopId="id"></content-right>
    </div>
  </div>
</template>

<script>
import { getTopFive , goodsfindbasictotype } from "@/api/index";
import TopSelling from "../../common/TopSelling";
import ContentRight from "./content/ContentRight";

export default {
  name: "Content",
  data() {
    return {
      proArr: [],
      num: 0,
      dataArr: [
        { name: "看了又看", value: 1 },
        { name: "猜你喜欢", value: 2 },
        // { name: "为你搭配", value: 3 }
      ],
      goodsArr: [],
      arrlength:0,
      rightpx:0,
      topdata:[],
    };
  },
  props: {
    proDetai: {},
    id: {
      type: String
    }
  },
  components: {
    TopSelling,
    ContentRight
  },
  methods: {
    async getTopFive(data) {
      const obj = {};
      obj.catId = data.catId;
      // obj.goodsName = data.goodsName
      // console.log(obj)
      const res = await getTopFive(obj);
      this.proArr = res;
    },
    leftbtn(){
      if(this.arrlength < this.goodsArr.length){
        this.rightpx += (210)
        this.$refs.shopul.style.left = (this.rightpx)+'px'
        this.arrlength ++
      }
    },
    rightbtn(){
      if(this.arrlength>=6){
        this.rightpx += (-210)
        this.$refs.shopul.style.left = (this.rightpx)+'px'
        this.arrlength --
      }
    },
    ckencknum(val){
      this.rightpx = 0
      this.$refs.shopul.style.left = 0
      this.num = val
      this.goodsfindbasictotype(this.proDetai)
      console.log(this.proDetai)
    },
    async goodsfindbasictotype(val){
      const  data  = await goodsfindbasictotype(val.catId,val.goodsName,this.num+1,7)
      const  msg  = await goodsfindbasictotype(val.catId,val.goodsName,3,3) //同类商品
      this.topdata = msg
      this.goodsArr  = data
      this.arrlength = data.length
    }
  },
  created(){
    
  },
  watch: {
    proDetai(Data) {
      this.goodsfindbasictotype(Data)
      this.proArr = Data;
      this.getTopFive(Data);
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';

.content {
  display: flex;
}

.content_div {
  width: 1160px;
  background: white;
  margin: 0 auto;
  padding: 0 20px;
  padding-top: 20px;
}

.top_div {
  margin-bottom: 30px;
  border: 1px solid rgba(215, 224, 241, 1);
  position: relative;
  overflow: hidden;
  padding: 10px 28px;
  padding-right:30px;
}

.no_span {
  display: inline-block;
  width: 111px;
  height: 36px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: center;
  line-height: 36px;
  cursor: pointer;
}

.select_span {
  border: 1px solid rgba(214, 222, 239, 1);
  color: rgba(76, 134, 244, 1);
  position: relative;
  background: white;
  top: 1px;
  border-bottom: none;
  z-index:10;
}

.shop_ul {
  height: 250px;
  display flex;
  position:relative;
  left:0;
  transition all 0.4s linear
}

.shop_ul li {
  list-style: none;
  width: 207px;
  height: 250px;
  border: 1px solid rgba(214, 222, 239, 1);
  margin-right: 13px;
}
.li_div {
  width: 168px;
  padding: 10px 20px;
  height: 146px;
}

.li_div img {
  width: 157px;
  height: 157px;
}

.name_div {
  padding 0 15px;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height:21px;
  height:42px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.price_div{
  display:flex;
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(255,32,32,1);
  line-height:24px;
  margin-top:7px;
}
.price_div div:first-of-type{
  padding-left:12px;
}
.price_div div:last-of-type{
  text-decoration:line-through;
  color:rgba(102,102,102,1);
  font-weight:400;
}
.left_span{
  border-bottom: 2px solid #999;
  border-left: 2px solid #999;
  width: 12px;
  height: 12px;
  display: inline-block;
  transform: rotate(45deg);
  position: absolute;
  left: 10px;
  top: 49%;
  z-index:10;
}
.right_span{
  border-bottom: 2px solid #999;
  border-right: 2px solid #999;
  width: 12px;
  height: 12px;
  display: inline-block;
  transform: rotate(-45deg);
  position: absolute;
  right: 10px;
  top: 49%;
}
.span_div{
  width: 28px;
  background: #fff;
  z-index: 10;
  height: 272px;
  left: 0;
  position: absolute;
}
.right_div1{
  position absolute
  height 272px
  z-index:10;
  width: 28px;
  background: #fff;
  z-index: 10;
  right: 0;
  top:0;
}
</style>
