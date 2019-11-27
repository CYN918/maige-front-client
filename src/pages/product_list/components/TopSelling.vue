<template>
  <div class="top_selling">
    <div class="title">热销排行</div>
    <ul class="list">
      <li v-for="(item, index) in topFive" :key="index">
        <a class="item" :href="`product_details.html?goodsId=${item?item.goodsId:''}`">
          <!-- <div class="label">
            <span class="top">TOP</span>
            <span class="line"></span>
            <span class="num">{{index + 1}}</span>
          </div>-->
          <div class="img_wrap">
            <img class="img" :src="item?item.goodsThumbnailImgUrl:''" alt />
          </div>
          <div class="item_title">
            <p
              class="item_name"
              :title="`${item?item.brandName:''}${item?item.goodsName:''}`"
            >{{item?item.goodsName:''}}</p>
            <p class="item_price">商城价：{{item?item.shopPrice: '0.00'}}元</p>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TopSelling",
  props:{
    topFive:{},
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/mixins.styl';
.top_selling {
  margin-right: 26px;
  margin-bottom: 30px;
  height: 100%;
  .title {
    width: 100%;
    height: 48px;
    background: url('../../../assets/images/product_detail/top_sell_title.png');
    background-size 100%
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    line-height: 48px;
  }
.title2{
  background: url('../../../assets/images/product_detail/hot_sell_title.png');
  background-size: 100%;
  margin-top 30px;
}
  .list {
    border: 1px solid rgba(214, 222, 239, 1);
    margin-left: 1px;
    width: 224px;
    background:rgba(255,255,255,1);
    padding 12px
    padding-bottom 0
    box-sizing border-box
    .item {
      position: relative;
      display: inline-block;
      width:198px;
      height:264px;
      border:1px solid rgba(214,222,239,1);
      margin-bottom 12px
      .label {
        position: absolute;
        top: 0;
        left: 0;
        width: 74px;
        height: 76px;
        background: url('../../../assets/images/product_detail/label.png') no-repeat;
        background-size: 100%;

        .top {
          display: inline-block;
          margin-top: 2px;
          margin-left: 0px;
          font-size: 14px;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          font-style: italic;
        }

        .line {
          display: inline-block;
          width: 46px;
          height: 2px;
          transform: rotate(-45deg);
          background: #fff;
          position: relative;
          left: -3px;
          top: -14px;
        }

        .num {
          font-size: 26px;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          font-style: italic;
          position: relative;
          left: -36px;
          bottom: -5px;
        }
      }

      .img_wrap {
        width: 157px;
        height: 157px;
        margin: 30px auto 6px;
        centered();

        .img {
          imgSize();
        }
      }

      .item_title {
        padding: 0 12px;
        margin-bottom: 6px;

        .item_name {
          width: 176px;
          display: inline-block;
          font-size: 12px;
          font-family: Microsoft YaHei;
          color: rgba(102, 102, 102, 1);
          margin-bottom: 10px;
          line-height: 20px;
          ellipsis();
        }

        .item_price {
          font-size: 15px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(255, 32, 32, 1);
          line-height: 1;
        }
      }
    }
  }
}
</style>
