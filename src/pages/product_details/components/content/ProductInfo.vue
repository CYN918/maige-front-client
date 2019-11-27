<template>
  <div class="info_div">
    <div class="product_info">
      <h3>{{taild.goodsName}}</h3>
      <div class="info_detail">
        <div>
          <p :title="taild.brandName">品牌：{{taild.brandName}}</p>
        </div>
        <div>
          <p :title="taild.goodsSn">货号：{{taild.goodsSn}}</p>
        </div>
        <div v-for="item in taild.attrList" :key="item.catId">
          <p :title="item.attrValue">{{item.attrName}}：{{item.attrValue}}</p>
        </div>
      </div>
      <!-- <button class="btn">加入方案</button> -->
    </div>
    <div  v-html="taild.goodsDesc" class="detil">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductInfo',
  props: {
    taild: {
    },
    id: {
      type: String,
    },
  },
  data() {
    return {
    }
  },
  mounted() {
    // console.log(this.taild)
  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  .img
    margin 0 auto
    display block
    width 750px
  .product_info
    position relative
    padding 40px 0 20px 40px
    box-sizing border-box
    h3
      margin-bottom 20px
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(102,102,102,1);
      ellipsis()
    .info_detail
      display flex
      flex-wrap wrap
      p
        width 186px
        font-size 12px
        line-height 1.5
        color #666
        margin-bottom 12px
        margin-right 30px
        ellipsis()
    .btn
      position absolute
      top 13px
      right 38px
      width:90px;
      height:30px;
      background:rgba(250,105,105,1);
      font-size 12px
      color #fff
      cursor pointer
    .btn:active
      top 15px
.detil{
  width 760px
  margin 0 auto 
}
.detil >>> img
    width:100%
.info_div{
  border:1px solid rgba(214,222,239,1);
}
</style>
