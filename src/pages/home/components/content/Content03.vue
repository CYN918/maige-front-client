<template>
  <div class="special-area clearfix">
    <div v-if="componentStatus[0]&&componentStatus[0].componentStatus==0">
      <div class="special-item" v-if="birthday">
            <p class="sp-title">{{componentStatus[0].componentContents[0].title||birthday.activityTopic}}</p>
            <div class="image">
                <img  :src=(componentStatus[0]&&componentStatus[0].componentContents[0].picture)||birthday.homePageImgUrl alt="" @click="birthdayUrl">
            </div>
            <ul class="clearfix ulList" v-if="birthday&&birthday.activityHomepageGoodsReturns">
              <li class="item itemList" v-for="(item,index) in (((activityList[0].activityGoods.length>0&&activityList[0].activityGoods)||birthday.activityHomepageGoodsReturns)||[]).slice(0,2)" :key="index">
                <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${birthday.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                  <div class="pic">
                    <img :src=item.skuImg alt="" @mouseenter="handleCache1(index)" @mouseleave="leave1" :class="index==num1?'amplification':''">
                  </div>
                  <p class="name">{{item.goodsName}}   </p>
                  <p class="price">￥{{item.salePrice}} </p>
                </a>
              </li>
            </ul>
        </div>
    </div>
    <div v-if="componentStatus[1]&&componentStatus[1].componentStatus==0">
      <div class="special-item" v-if="festival">
            <p class="sp-title">{{componentStatus[1].componentContents[0].title||festival.activityTopic}}</p>
            <div class="image">
              <img  :src=(componentStatus[1]&&componentStatus[1].componentContents[0].picture)||festival.homePageImgUrl alt=""  @click="festivalUrl">
            </div>
            <ul class="clearfix ulList" v-if="festival&&festival.activityHomepageGoodsReturns">
              <li class="item itemList" v-for="(item,index) in (((activityList[1].activityGoods.length>0&&activityList[1].activityGoods)||festival.activityHomepageGoodsReturns)||[]).slice(0,2)" :key="index">
                <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${festival.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                  <div class="pic">
                    <img :src=item.skuImg alt="" @mouseenter="handleCache2(index)" @mouseleave="leave2" :class="index==num2?'amplification':''">
                  </div>
                  <p class="name">{{item.goodsName}}</p>
                  <p class="price">￥{{item.salePrice}} </p>
                </a>
              </li>
        </ul>
      </div>
    </div>
      <div v-if="componentStatus[2]&&componentStatus[2].componentStatus==0">
      <div class="special-item" v-if="seeklySelection">
        <p class="sp-title">{{componentStatus[2].componentContents[0].title||seeklySelection.activityTopic}} </p>
        <div class="image">
            <img v-if="seeklySelection.homePageImgUrl" :src=(componentStatus[2]&&componentStatus[2].componentContents[0].picture)||seeklySelection.homePageImgUrl alt="" @click="seeklySelectionlUrl">
        </div>
          <ul class="clearfix ulList"  v-if="seeklySelection&&seeklySelection.activityHomepageGoodsReturns">
            <li class="item itemList" v-for="(item,index) in (((activityList[2].activityGoods.length>0&&activityList[2].activityGoods)||seeklySelection.activityHomepageGoodsReturns)||[]).slice(0,2)" :key="index">
              <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${seeklySelection.activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                <div class="pic">
                  <img :src=item.skuImg alt="" @mouseenter="handleCache3(index)" @mouseleave="leave3" :class="index==num3?'amplification':''">
                </div>
                <p class="name">{{item.goodsName}}</p>
                <p class="price">￥{{item.salePrice}} </p>
              </a>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
 import { activityHome } from '@/api/index'
export default {
  name: 'Content03',
  props: ['activity','componentStatus'],
  data() {
    return {
      seeklySelection: '',
      birthday: '',
      festival: '',
      activityList:[],
      num1:null,
      num2:null,
      num3:null,
    }
  },

  mounted(){
    this.componentStatus.forEach(item=>{
      this.activityList.push(JSON.parse(item.componentContents[0].content))
    })
    this.activity.forEach(item=>{
        if(item.activityTypeNum === 2){
            this.seeklySelection = item
        }

        if(item.activityTypeNum === 3){
              this.birthday =  item
        }
         if(item.activityTypeNum === 4){
            this.festival = item
        }
    })
  },
  async created(){
    // const data = await activityHome()
    //   if(data.code === 200) {
    //     data.data.forEach(item=>{
    //       if(item.activityTypeNum ===2){
    //              this.seeklySelection = item
    //         }else if(item.activityTypeNum === 3){
    //             this.birthday = item
    //         }else if(item.activityTypeNum === 4){
    //             this.festival = item
    //         }
    //       })
    //   }

  },
  methods:{
    handleCache1(index){
      this.num1 = index
    },
    leave1(){
      this.num1=null
    },
    handleCache2(index){
      this.num2 = index
    },
    leave2(){
      this.num2=null
    },
    handleCache3(index){
      this.num3 = index
    },
    leave3(){
      this.num3=null
    },
    //生日跳转
    birthdayUrl(){
      if(this.activityList[0].zoneLink){
        window.location.href = this.activityList[0].zoneLink
      }else{
         window.location.href = `birthdayArea.html?activityId=${this.birthday.activityId}&activityTypeId=${this.birthday.activityTypeId}&activityTypeNum=${this.birthday.activityTypeNum}`
      }
    },
    // 节日跳转
    festivalUrl(){
      if(this.activityList[1].zoneLink){
        window.location.href = this.activityList[1].zoneLink
      }else{
         window.location.href = `festival.html?activityId=${this.festival.activityId}&activityTypeId=${this.festival.activityTypeId}&activityTypeNum=${this.festival.activityTypeNum}`
      }
    },
    //周周精选跳转

  seeklySelectionlUrl(){
      if(this.activityList[2].zoneLink){
        window.location.href = this.activityList[2].zoneLink
      }else{
         window.location.href = `weekly_selection.html?activityId=${this.seeklySelection.activityId}&activityTypeId=${this.seeklySelection.activityTypeId}&activityTypeNum=${this.seeklySelection.activityTypeNum}`
      }
    },
  },
  watch: {
    activity(val, oldval) {
      if (val != oldval) {
       this.seeklySelection = val.find(item => {
           if(item.activityTypeNum ===2){
                return  item
            }
        })
              // //生日专区
        this.birthday = val.find(item => {
          if(item.activityTypeNum === 3){
                return  item
            }
        })

//节日专区
       this.festival = val.find(item => {
          if(item.activityTypeNum === 4){
                return  item
            }
          })
      }
    },
  },
};
</script>

<style scoped lang='stylus'>
   .special-area {
     display flex
    margin-bottom: 30px;
    width:1200px;
    margin 0 auto
  }

   .special-area .special-item {
    float: left;
    width: 386px;
    padding: 20px 0 15px;
    box-sizing: border-box;
    background: #fff;
    margin-right: 21px;
    border-radius: 8px;
  }

   .special-area .special-item:nth-child(3n) {
    margin-right: 0;
  }

   .special-area .special-item .sp-title {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
    font-weight: 700;
  }

   .special-area .special-item .image {
    height: 183px;
    margin-bottom: 10px;
  }

   .special-area .special-item .image img {
    width: 100%;
    height: 183px;
  }

   .special-area .special-item .item {
    width 48%
    border:1px solid #cccccc;
    box-sizing :border-box
    padding:6px
  }

   .special-area .special-item .item:nth-child(3n) {
    margin-right: 0;
  }

   .special-area .special-item .item .pic {
    width: 112px;
    height: 112px;
    margin 0 auto
    margin-bottom: 10px;
  }

   .special-area .special-item .item .pic img {
    width: 112px;
    height: 112px;
  }

   .special-area .special-item .item .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    margin-bottom: 10px;
    font-size: 12px;
  }

   .special-area .special-item .item .name:hover {
    color: #b62323;
  }

   .special-area .special-item .item .price {
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    color: #b62323;
  }
.ulList
  overflow hidden
  .itemList
    box-sizing border-box
    &:nth-child(1)
      float: left
    &:nth-child(2)
      float: right
.amplification
  transform: scale(1.1)
</style>
