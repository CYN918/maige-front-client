<template>
  <div class="cardBookContainer">
    <div class="cardBookWrap"  v-for="(item,index) in color" :key="index">
      <p class="cardBookHeader">
        <span :style="{color:item}">| 礼品卡册定制</span>
       <a href="">查看更多》</a>
      </p>
      <div class="cardBookContent">
        <div class="cardBookLeft">
        </div>
        <div class="cardBookRight" >
          <ul class="cardBookItem">
            <li class="cardBookList">
              <img src="@/assets/images/office_Area/img/chuju.png" alt="">
            </li>
            <li class="cardBookList">
              <img src="@/assets/images/office_Area/img/chuju.png" alt="">
            </li>
            <li class="cardBookList">
              <img src="@/assets/images/office_Area/img/chuju.png" alt="">
            </li>
            <li class="cardBookList">
              <img src="@/assets/images/office_Area/img/chuju.png" alt="">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
 data(){
   return{
     arr:[1,2,3],
     color:['rgba(253, 102, 140, 1)','rgba(93, 177, 255, 1)','rgba(255, 168, 56, 1)']
   }
 }
}
</script>>
<style lang='stylus' scoped>
.cardBookContainer
  width 100%
  .cardBookWrap
    .cardBookHeader
      display flex
      margin-left 27px
      width 1200px
      height 55px
      line-height 55px
      justify-content space-between
      span 
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(253,102,140,1);
      a
        font-size:12px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(153,152,153,1);
        margin-top: 11px;
        margin-right: 22px;
    .cardBookContent
      display flex
      background:rgba(255,255,255,1);
      border-radius:10px;
      padding 25px 19px 0 19px
      .cardBookLeft
        background url('~@/assets/images/office_Area/img/chuju.png')
        width 528px
        height 370px
      .cardBookRight
        width 672px
        .cardBookItem
          overflow hidden
          .cardBookList
            position relative
            width 300px
            height 175px
            background rgba(245, 245, 245, 1)
            float left
            margin-left 20px
            margin-bottom 25px
            img 
              position absolute
              left 0
              top 0
              bottom 0
              right 0
              margin auto
              width 227px
              height 143px
            
        

</style>
