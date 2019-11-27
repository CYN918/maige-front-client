<template>
  <div class="purchaseContainer">
    <header class="purchaseHeader">
      <p>
        <span></span>
        <span>好货抢先购</span>
      </p>
    </header>
    <div class="banner">
      <img :src=activityIdImg alt="">
      <div class="semicircle"></div>
    </div>
    <!--内容-->
    <div class="carefullySelectedContainer">
      <div class="carefullySelected">
        <div class=" phonePurchase" v-for="(item,index) in phoneCompany" :key="index">
          <div class="phonePurchaseHeader">
            <img src="@/assets/images/groupBuy/xixuan.png" alt="" class="text">
            <div class="phone">
              <span class="textCenter">{{item.goodsTypeName}}</span>
             
            </div>
          </div>
          <div class="phonePurchaseItem" >
            <img class="showimg" :src=item.goodsTypeImgUrl alt="">
            <div class="phonePurchaseList" v-for="(children,index) in item.activityHomepageGoodsReturns" :key="index">
              <a :href="`product_details.html?goodsId=${children.goodsId}&activityId=${children.activityId}&activityGoodsId=${children.activityGoodsId}&activityTypeNum=${activityTypeNum}`">
                <img :src=children.skuImg :title=children.goodsName >
              </a>
              <p class="shuoming">{{children.goodsName}}</p>
              <p class="price">
                <span class="newPrice">￥{{children.salePrice}}</span>
                <span class="oldPrice">￥{{children.ustomaryPrice}}</span>
              </p>
              <a :href="`product_details.html?goodsId=${children.goodsId}&activityId=${children.activityId}&activityGoodsId=${children.activityGoodsId}&activityTypeNum=${activityTypeNum}`">
                <span class="goto">马上抢购</span>
              </a>
            </div>
          </div>
           <p class="addMore" @click="addAll(item,index)">
                <span>查看更多</span>
                <i class="el-icon-circle-plus"></i>
              </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { preemptivePurchaseDetails,matching ,pagination} from '@/api/index'
  import  {addressUrl} from '@/assets/utils/utils.js'
  export default {
   name:'preemptivePurchase',
    data(){
     return{
       phoneCompany:[],
       activityIdImg:'',
       pageIndex:2,  //分页获取
       flag:true,
       activityTypeNum:''
     }
    },
    async created() {
      const url = addressUrl()
      this.activityTypeNum = url['activityTypeNum']
      const search = window.location.search
      const activityId = search.split('=')[1]
      const result = await  preemptivePurchaseDetails(activityId,7)
      if(result.code ===200){
        this.phoneCompany = result.data
      }else{
        alert('获取商品失败')
      }
      const res = await matching(activityId)
      if(res.code === 200){
        this.activityIdImg = res.data[0].thumbnailUrl
      }
    },
    methods:{
      //查看更多
      async addAll(item,index){
          if(!this.flag) return this.$message('点击的太快')
          this.flag = false
          const { activityId ,activityGoodsTypeId} = item
          this.pageIndex++
          const obj={
            activityId,
            activityGoodsTypeId,
            pageIndex:this.pageIndex,
            pageSize:7
          }
      const res = await pagination(obj)
        if(res.code === 200){
          this.phoneCompany[index].activityHomepageGoodsReturns.push(...res.data.pageList)
        }else{
          this.$message({
            type:'warning',
            message:'已经加载全部'
          })
        }
        //  限制用户快速点击
        setTimeout(()=>{
          this.flag=true
        },1000)
      }
    }
  }
</script>
<style lang="stylus" scoped>
.purchaseContainer
  width 100%
  .purchaseHeader
    width 100%
    height:121px
    overflow hidden
    p
      text-align center
      margin-top 70px
      span
        &:nth-child(1)
          display inline-block
          width 37px
          height 37px
          background url("~@/assets/images/groupBuy/icon@2x.png")
          vertical-align middle
          margin-right 9px
        &:nth-child(2)
          font-size:28px
          font-family:Microsoft YaHei
          font-weight:bold
          color:rgba(51,51,51,1)
          vertical-align middle
  .banner
    width 100%
    position relative
    img
      width 100%
      height:453px
    .semicircle
      position absolute
      top 340px
      z-index -1
      width 100%
      height 253px
      background:rgba(68, 68, 67, 1);
      border-radius 50%
  .carefullySelectedContainer
    width 100%
    background
    background rgba(242, 242, 242, 1)
    .carefullySelected
      width 1200px
      margin 37px auto
      background white
      border-radius:20px;
      .phonePurchase
        width 100%
        margin-top 62px
        box-shadow:0px 0px 250px 0px rgba(0, 0, 0, 0.14);
        .phonePurchaseHeader
          width 100%
          padding-top 60px
          height:142px
          .text
            width:197px;
            height:59px;
            margin-top 40px
          .phone
            display flex
            flex-direction column
            display inline-block
            width 230px
            text-align center
            margin -50px auto
            margin-left 270px
            .textCenter
              width 100%
              height:35px
              font-size:36px;
              font-family:Microsoft YaHei;
              font-weight:bold;
              color:rgba(51,51,51,1);
           
        .phonePurchaseItem
          width 100%
          overflow hidden
          padding-left 90px
          box-sizing border-box
          .showimg
            width 608px
            height 331px
            float  left
            margin-right 10px
          .phonePurchaseList
            margin-right 10px
            margin-bottom 10px
            text-align center
            float left
            box-sizing border-box
            padding 10px
            width 196px
            border:1px solid rgba(241,241,241,1)
            img
              width 119px
              height:119px
              margin-top 52px
            .shuoming
              overflow: hidden;
              text-overflow: ellipsis;
              white-space:nowrap;
              line-height 16px
              margin-top 40px
              text-align left
              font-size:12px;
              font-family:Microsoft YaHei
              font-weight:400
              color:rgba(51,51,51,1)
            .price
              margin-top 17px
              font-family:Microsoft YaHei;
              .newPrice
                font-family:Microsoft YaHei;
                font-weight:400;
                fomt-size 14px
                color:rgba(254,77,78,1);
              .oldPrice
                color rgba(153, 153, 153, 1)
                font-size 12px
                text-decoration:line-through;
            .goto
              margin-top 20px
              width:176px;
              height:31px;
              text-align center
              display inline-block
              background:linear-gradient(0deg,rgba(254,77,78,1),rgba(254,134,102,1));
              border-radius:4px;
              line-height 31px
              color  rgba(255,255,255,1);
 .addMore
    padding-bottom 50px
    cursor pointer
    margin-top 20px
    text-align center
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
    span
      margin-right 5px
</style>
