<template>
    <div class="list">
      <div class="item">
        <img src="@/assets/images/product_detail/productDetail-panel-2-box-5-1.png" alt="">
        <div class="desc">
          <h2 class="title_word">正品行货</h2>
          <p style="text-align: left">消费者在商城购买带有"全国联保"标识商品后，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。</p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/product_detail/productDetail-panel-2-box-5-2.png" alt="">
        <div class="desc">
          <h2 class="title_word">全国联保</h2>
          <p style="text-align: left">消费者在商城购买带有"全国联保"标识商品后，可享受全国联保服务，与您亲临商场选购的商品享受相同的质量保证。 </p>
        </div>
      </div>
      <div class="item">
        <img src="@/assets/images/product_detail/productDetail-panel-2-box-5-3.png" alt="">
        <div class="desc">
          <h2 class="title_word">7天无忧退换货</h2>
          <p style="text-align: left">客户收到商城产品7日内（含7日，自客户收到商品之日起计算），在保证商品完好,不影响二次销售的前提下，可无理由退货。非质量问题造成的售后，需由客户承担来回快递费用;发错货物由发货方承担来回快递费用。（个别商品恕不接受退货，详情请提前咨询客服。）</p>
        </div>
      </div>
      <h3>声明：</h3>
      <p style="text-align: left">因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不
        能确保客户收到的货物与商城图片、产地、附件 说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！
      </p>
    </div>
</template>

<script>
export default {
  name: 'AfterSale',
  created() {
    //
  },
}
</script>

<style lang="stylus" scoped>
  .list
    padding 30px 30px
    border:1px solid rgba(214,222,239,1);
    .item
      display flex
      align-items center
      margin-bottom 30px
      img
        margin-right 20px
      .desc
        .title_word
          font-size:18px;
          font-family:Microsoft YaHei;
          font-weight:bold;
          color:rgba(51,51,51,1);
          line-height:24px;
        p
          width:800px;
          font-size:12px;
          color:rgba(102,102,102,1);
          line-height:20px;
      .desc:last-of-type
        img
          margin-bottom 10px

    h3
      font-size:16px;
      font-family:Microsoft YaHei;
      font-weight:bold;
      color:rgba(255,75,75,1);
      margin-bottom 12px
    p
      font-size:12px;
      color:rgba(102,102,102,1);
      line-height:24px;
</style>
