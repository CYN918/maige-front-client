<template>
  <div class="fightGroupContainer">
    <div class="fightGroupWrap">
      <header class="fightGroupHeader">
        <span class="text">拼团尽享优惠</span>
        <span class="zimu"></span>
      </header>
      <div class="commodityContainer">
         <ul class="commodityList">
           <li v-for="(item,index) in groupBuy.pageList" :key="index">
              <div class="commodityContent">
                <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityGoodsId=${item.activityGoodsId}&activityTypeNum=${activityTypeNum}&groupMenber=${groupMenber}&num=${item.goodsNumber-item.enableQuantity}`">
                  <img :src=item.skuImg :title=item.goodsName>
                </a>
                <p class="text">{{item.goodsName}}</p>
                <div class="schedule">
                  <p class="progress">
                    <i :style="`width:${((item.goodsNumber-item.enableQuantity)/item.goodsNumber).toFixed(2)*100}%`"></i>
                  </p>
                  <span>已拼{{item.goodsNumber-item.enableQuantity}}件</span>
                </div>
                <p class="fightingPrice">
                  <span class="price">拼团价 </span>
                  <i>¥</i>
                  <span class="newPrice">{{item.salePrice}}</span>
                  <span class="oldPrice">¥{{item.ustomaryPrice}}</span>
                </p>
                <p class="persona">
                  <span class="personaLeft">{{groupMenber}}人团</span>
                  <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityGoodsId=${item.activityGoodsId}&activityTypeNum=${activityTypeNum}&groupMenber=${groupMenber}&num=${item.goodsNumber-item.enableQuantity}`" class="personaRight">去参团</a>
                </p>
              </div>
           </li>
         </ul>
          <p class="addAll" @click="addAll">查看更多>></p>
      </div>
    </div>
  </div>
</template>
<script>
  import  { groupBuy ,pagination} from '@/api/index'
  import { addressUrl } from '@/assets/utils/utils'
export default {
  data(){
    return{
      groupBuy:'',
      groupMenber:'', //活动人数
      num:'',
      enableQuantity:'',
      activityTypeNum:'',
      groupMenber:'',
      flag:true,
      pageIndex:2,
      activityId:''
    }
  },
  async  created(){
      const url= addressUrl()
       this.activityId =url.activityId
      this.groupMenber= url.groupMenber
      this.activityTypeNum =url.activityTypeNum
      this.groupMenber = url.groupMenber
      const obj={
        activityId:this.activityId,
        pageSize:12,
      }
      const result = await  groupBuy(obj)
      if(result.code === 200){
        this.groupBuy = result.data
      }else{
        this.$message('获取商品失败')
      }
     this.enableQuantity= this.groupBuy.pageList.map( item =>{
       if(item.enableQuantity>999){
         return this.num='999+'
       }else{
         return item.enableQuantity
       }
     })
  },
  methods:{
  //  查看更多
  async addAll() {
    this.pageIndex++
      const obj={
        activityId:this.activityId,
        pageSize:12,
        pageIndex:this.pageIndex,
      }
      const result = await  groupBuy(obj)
      if(result.code === 200){
        this.groupBuy.push(...res.data.pageList)
      }else{
        this.$message({
          type:'warning',
          message:'已经加载全部商品'
        })
      }

   }
  }
}
</script>
<style lang="stylus">
.fightGroupContainer
  width 100%
  background RGBA(247, 250, 255, 1)
  .fightGroupWrap
    padding-bottom 107px
    width 1200px
    margin 0 auto
    background white
    .fightGroupHeader
      display flex
      justify-content center
      align-items center
      flex-direction column
      .text
        margin-top 31px
        display inline-block
        width 434px
        height:95px
        text-align center
        line-height 95px
        font-size:30px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(255,255,255,1)
        background url("~@/assets/images/groupBuy/biaoti.png")
      .zimu
        margin-top 11px
        display inline-block
        width 228px
        height 13px
        background url("~@/assets/images/groupBuy/yinwen.png")
    .commodityContainer
      width 100%
      margin-top 10px
      .commodityList
        width 100%
        overflow hidden
      li
        float  left
        width 292px
        .commodityContent
          width 100%
          text-align center
          img
            margin-top 23px
            width 207px
            height:207px
          .text
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
            width 241px
            height:39px
            font-size 14px
            font-family Microsoft YaHei
            font-weight 400
            color rgba(51,51,51,1)
            text-align left
            margin 0 auto
            margin-top 37px
          .schedule
            display flex
            justify-content center
            box-sizing border-box
            margin-top 20px
            .progress
              width 148px
              height: 7px;
              margin-bottom: 15px;
              border-radius: 3px;
              background: #e8e8e8;
              i
                display: block;
                height: 100%;
                background: #ed4f48;
                border-radius: 3px;
            span
              margin-right 12px
              font-size:14px
              font-family Microsoft YaHei
              font-weight 400
              color rgba(153,153,153,1)
              margin-left 12px
              margin-top -3px
          .fightingPrice
            text-align center
            font-family:Microsoft YaHei;
            font-weight:400;
            .price
              font-size 14px
              color rgba(102,102,102,1)
            i
              font-size 14px
              color:rgba(249, 63, 59, 1)
            .newPrice
              font-size 24px
              color:rgba(249, 63, 59, 1)
            .oldPrice
              font-size 14px
              font-family Microsoft YaHei
              font-weight 400
              text-decoration line-through
              color rgba(153,153,153,1)
              margin-right 8px
          .persona
            margin 23px auto
            width 121px
            height: 26px
            line-height 26px
            display flex
            .personaLeft
              font-size:12px
              font-family:Microsoft YaHei
              font-weight:400
              color:rgba(251,11,0,1)
              display inline-block
              width 56px
              height 26px
              border 1px solid rgba(255, 73, 73, 1)
              border-right none
              box-sizing border-box
            .personaRight
              cursor pointer
              display inline-block
              height 26px
              width 64px
              font-size:12px;
              font-family:Microsoft YaHei;
              font-weight:400;
              color:rgba(255,255,255,1);
              background linear-gradient(90deg,rgba(255,73,73,1),rgba(255,149,97,1))
      .addAll
        text-align right
        font-size 14px
        color rgba(86, 83, 83, 1)
        cursor pointer
        padding-right: 88px;
        margin-top: 41px;
        &:hover
          color red
</style>

