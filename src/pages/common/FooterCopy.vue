<template>
  <div class="indexFoot">
    <ul class="list clearfix">
      <li class="item">
        <i class="label">多</i>
        <span class="word">品类齐全，轻松购物</span>
      </li>
      <li class="item">
        <i class="label">快</i>
        <span class="word">多仓直发，急速配送</span>
      </li>
      <li class="item">
        <i class="label">好</i>
        <span class="word">正品行货，精致服务</span>
      </li>
      <li class="item">
        <i class="label">省</i>
        <span class="word">天天低价，畅选无忧</span>
      </li>
    </ul>
    <div class="container">
      <div class="title clearfix">
        <ul class="clearfix list2">
          <li>
            <dl>
              <dt>{{list[0] && list[0].categoryName}}</dt>
              <dd v-for="(data,index2) in list[0] && list[0].children" :key="index2"><a :href="`./navigation_page.html?index=${index2}`">{{data.categoryName}}</a></dd>
            </dl>
          </li>
           <li>
            <dl>
              <dt>{{list[1] && list[1].categoryName}}</dt>
              <dd v-for="(data,index2) in list[1] && list[1].children" :key="index2"><a :href="`./navigation_page.html?index=${index2}#/Shipping`">{{data.categoryName}}</a></dd>
            </dl>
          </li>
           <li>
            <dl>
              <dt>{{list[2] && list[2].categoryName}}</dt>
              <dd v-for="(data,index2) in list[2] && list[2].children" :key="index2"><a :href="`./navigation_page.html?index=${index2}#/PaymentMethod`">{{data.categoryName}}</a></dd>
            </dl>
          </li>
           <li>
            <dl>
              <dt>{{list[3] && list[3].categoryName}}</dt>
              <dd v-for="(data,index2) in list[3] && list[3].children" :key="index2"><a :href="`./navigation_page.html?index=${index2}#/AfterService`">{{data.categoryName}}</a></dd>
            </dl>
          </li>
           <li>
            <dl>
              <dt>{{ list[4] && list[4].categoryName}}</dt>
              <dd v-for="(data,index2) in list[4] && list[4].children" :key="index2"><a :href="`./navigation_page.html?index=${index2}#/AboutUs`">{{data.categoryName}}</a></dd>
            </dl>
          </li>
          <!-- <li>
            <dl>
              <dt>配送与支付</dt>
              <dd><a href="">货到付款区域</a></dd>
              <dd><a href="">配送支付智能查询</a></dd>
              <dd><a href="">支付方式说明</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>会员中心</dt>
              <dd><a href="">资金管理</a></dd>
              <dd><a href="">我的收藏</a></dd>
              <dd><a href="">我的订单</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>服务保证</dt>
              <dd><a href="">退换货原则</a></dd>
              <dd><a href="">售后服务保证</a></dd>
              <dd><a href="">产品质量保证</a></dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>商业合作</dt>
              <dd><a href="">购买电子商城</a></dd>
              <dd><a href="">购买积分商城</a></dd>
              <dd><a href="">购买企业内购系统</a></dd>
              <dd><a href="">购买ERP</a></dd>
              <dd><a href="">寻求供应商</a></dd>
              <dd><a href="">成为供应商</a></dd>
            </dl>
          </li> -->
        </ul>
        <div class="indexFoot-logo">
          <img src="../../assets/images/QR_app.jpg" alt=""/>
          <p>下载APP</p>
        </div>
        <div class="indexFoot-logo">
          <img src="../../assets/images/QR_official-account.jpg" alt=""/>
          <p>商城微信公众号</p>
        </div>
      </div>
      <div class="last-link">
        <a href="">@Copyright 2018供应链管理平台 专利申请 版权所有</a>丨
        <a href="">粤ICP备17053705号-3</a>
      </div>
      <div class="last-link">
        <a href="">相关产品：员工福利系统</a>丨
        <a href="">积分兑换商城</a>丨
        <a href="">企业集采系统</a>
      </div>
      <div class="last-text">
        相关下载：供应商管理系统-APP下载
      </div>
    </div>
  </div>
</template>

<script>
import { reqFooterData } from '@/api/index'

export default {
  props:['componentStatus'],
  name: 'Footer',
  data() {
    return {
      list: [],
    }
  },
  async created() {
    const obj = {}
    obj.showInNav = 1
    const res = await reqFooterData(obj)
    this.list = res.data
  },
}
</script>

<style lang="stylus" scoped>
  .list2
    float left
  .indexFoot-logo
    float right
    margin-left 55px
    img
      width 112px
      margin-bottom 12px
    p
      text-align center
      font-size:12px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
  .list
    padding 30px 106px
    border-bottom 1px solid #EAEBED
    width: 1200px;
    margin: 0 auto;
    box-sizing border-box
    .item:not(:first-of-type) .label
      margin-left 51px
    .item
      float left
      .label
        display inline-block
        width 38px
        height 42px
        background url("../../assets/images/footer/frame.png") no-repeat
        background-size 100% 100%
        line-height 42px
        font-size:20px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(255,79,124,1);
        text-align center
      .word
        width:160px;
        height:18px;
        font-size:18px;
        font-family:Microsoft YaHei;
        font-weight:bold;
        color:rgba(102,102,102,1);
        line-height 42px
  .indexFoot {
    height: 390px;
    color: #999;
    background: #fff;
  }

  .indexFoot .container {
    position: relative;
    height: 390px;
    width: 1200px;
    margin: 0 auto;
  }

  .indexFoot .title {
    padding: 34px 106px 20px;
    border-bottom: 1px solid #EAEBED;
    margin-bottom 20px
  }

  .indexFoot .title li {
    float: left;
    margin-right: 45px;
  }

  .indexFoot .title li dt {
    color #666
    font-size: 12px;
    line-height: 20px;
    padding-bottom: 16px;
    font-weight bold
  }

  .indexFoot .title li dd {
    font-size: 12px;
    line-height: 16px;
    padding-bottom: 10px;
  }

  .indexFoot .title li dd a {
    color: #666;
  }

  .indexFoot .last-link {
    font-size: 12px;
    text-align: center;
    margin-bottom 12px
  }
  .indexFoot .last-link a {
    color: #999;
  }
  .indexFoot .last-text {
    color: #999;
    font-size: 12px;
    text-align: center;
  }

</style>
