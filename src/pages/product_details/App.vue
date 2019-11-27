<template>
  <div style="background:#F9FBFF">
    <top-nav></top-nav>
    <Header></Header>
    <BreadcrumbsNav>
      <template>
        <el-breadcrumb-item :to="{ path: '/' }" class="place">
          <span @click="toProList">商品列表</span>
        </el-breadcrumb-item>
        <el-breadcrumb-item class="place">
          商品详情
        </el-breadcrumb-item>
      </template>
    </BreadcrumbsNav>
    <Detail :Detail='proDetail' :skuList = 'skuList' @getShoppingCartNum="getShoppingCartNum"></Detail>
    <Content :proDetai='proDetail' :id='shopId'></Content>
    <Footer></Footer>
    <fix-right-bar :nums="num"></fix-right-bar>
  </div>
</template>

<script>
import { parseUrl, isLogin,addressUrl, throttleTipPop } from '@/assets/utils/utils'
import { calcProClickNum, getProDetail, reqShoppingCartNum,obtainSku,getActivityDetail } from '@/api/index'
import TopNav from '../common/TopNav2'
import Header from '../common/Header'
import BreadcrumbsNav from './components/BreadcrumbsNav'
import Detail from './components/Detail'
import Content from './components/Content'
import Footer from '../common/Footer'
import FixRightBar from '../common/FixRightBar'

export default {
  name: 'App',
  data() {
    return {
      proDetail: [],
      shopId: '', // 商品id
      num: 0,
      url: '',
      goodsId:'',
      skuList:'',
      activityGoodsId:'',
      activityId:'',
    }
  },
  components: {
    TopNav,
    Header,
    Footer,
    FixRightBar,
    BreadcrumbsNav,
    Detail,
    Content,
  },
  watch: {
    num(newVal) {
      if (newVal > 99) {
        this.num = '99+'
      }
    },
  },
  async created() {
    const url = addressUrl()
    this.activityGoodsId = url.activityGoodsId
    this.activityId = url.activityId
    const query = window.location.search
    const beginIndex = query.indexOf('&')
    this.url = query.substring(beginIndex + 1)
    const { goodsId } = parseUrl(query)
    this.calcProClickNum(goodsId)
    this.shopId = goodsId
    await this.getProDetail()
    const userInfo = isLogin()
    if (userInfo) {
      this.getShoppingCartNum()
    }
    //活动页面跳转过来
    function parseUrl(){
      let url=location.href;
      let i=url.indexOf('?');
      if(i==-1)return;
      let querystr=url.substr(i+1);
      let arr1=querystr.split('&');
      let arr2=new Object();
      for  (i in arr1){
        let ta=arr1[i].split('=');
        arr2[ta[0]]=ta[1];
      }
      return arr2;
    }
  },
  methods: {
    async calcProClickNum(id) {
      const res = await calcProClickNum(id)
    },
    // 跳去列表页
    toProList() {
      window.location.href = 'product_list.html?'
    },
    async getShoppingCartNum() {
      const res = await reqShoppingCartNum()
      if (res.code === 200) {
        this.num = res.data
      }
    },
    async getProDetail() {
      let res
      if(this.activityId==''||!this.activityId){
         res = await getProDetail(this.shopId)
      }else{
        res = await getActivityDetail(this.activityGoodsId)
      }
      if (res.code === 200) {
        this.proDetail = res.data
      } else {
        throttleTipPop(this,'error', res.message)
        setTimeout(function () {
          location.href = 'product_list.html'
        },1500)
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
  .place >>> .el-icon-arrow-right:before
    content "/"

  .centerMiddle 
    width 100%
    height 39px
    background rgba(247,250,255,1)  
</style>
