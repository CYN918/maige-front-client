<template>
  <div class="app">
      <header class="header">
          <img :src=bgImg.imgUrl alt="" class="banner">
      </header>
     <div class="contenContainer">
      <div style="background:white;">
        <div class="tuijjian">
        <p class="tuijiansize" v-if="recommend">{{recommend.goodsTypeName}}</p>
        <!-- <p class="tuijianEgl">Explosion recommendation</p> -->
        <img v-if="recommend.goodsTypeImgUrl" :src="recommend.goodsTypeImgUrl" alt="">
      </div>
      <!-- 爆款推荐 -->
     <div class="produnctWrap">
        <div class="produnct" style="margin:20px 0">
        <span>推荐产品</span>
          <p style="display:flex">
            <span class="left"  @click="toggletop">
              <i class="el-icon-caret-left"></i>
            </span>
            <span class="right" @click="toggledow">
              <i class="el-icon-caret-right"></i>
            </span>
          </p>
       </div>
       <div class="productConTainer">
         <ul class="productList" ref="ulWidth" :style="{left:toleft+'px'}">
           <li v-for="(item,index) in recommend.activityHomepageGoodsReturns" :key="index" class="productItems">
              <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                <img :src=item.skuImg :title="item.goodsBrief" class="productImg" width="115" height="115">
              </a>
             <!-- <p class="product">{{item.goodsBrief}}</p> -->
             <span class="xiangqing">{{item.goodsName}}</span>
             <p class="price">
               <span>￥{{item.salePrice}}</span>
               <img src="@/assets/images/home/images/shoupCart.png" alt="" @click="addToShoppingcart(item)">
             </p>
           </li>
         </ul>
       </div>
     </div>
      </div>
     <!-- 热销产品 -->
     <div class="hotProductsContainer">
        <div class="title">
          <p class="chinese">{{hotProducts.goodsTypeName}}</p>
          <!-- <p class="english">Hot commodities</p> -->
        </div>
        <div class="hotProductsList">
          <img v-if="hotProducts.goodsTypeImgUrl" :src=hotProducts.goodsTypeImgUrl  alt="" class="hotProductsImg">
            <div class="productConTainer">
              <ul class="productIem">
                <li v-for="(item,index) in hotProducts.activityHomepageGoodsReturns " :key="index"  class="producList">
                  <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                    <img :src=item.skuImg :title="item.goodsBrief" class="productImg" width="210" height="210">
                  </a>
                  <!-- <p class="product">{{item.goodsBrief}}</p> -->
                  <span class="xiangqing">{{item.goodsName}}</span>
                  <p class="price">
                    <span>￥{{item.salePrice}}</span>
                      <img src="@/assets/images/home/images/shoupCart.png" alt="" @click="addToShoppingcart(item)">
                  </p>
                </li>
              </ul>
              <p class='viewAll' @click="viewAll">查看更多》</p>
            </div>
        </div>
     </div>
     <!--商品Nav-->
      <div class="productNav">
          <ul class="productNavItem">
            <li ref="name" v-for="(item,index) in navList" :key="index" class="productLists" @click="handleName(index)">
             {{item.goodsTypeName}}
              <p :class="{'line':num==index}" ></p>
            </li>
          </ul>
         	<FestivalApp :navList='navList[num]'/>		
      </div>
     </div>
  </div>
</template>

<script>
import { holidayArea,matching,eventGoods,addShoppingCart } from '@/api/index'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import { isLogin ,throttleTipPop,addressUrl} from '@/assets/utils/utils'
import FestivalApp from './components/festivalApp'
export default {
  name: 'App',
  components:{
	  FestivalApp
  },
  data(){
     return{
      toleft:0,
      wid:'',
      widList:'',
      bgImg:'' , //大图
      activityId:'',
      activityTypeNum:'',
      num:0,
      recommend:'',
      hotProducts:'', //热销
      navList:'',
      index:1,
      widListdiff:''
	  }
  },
   created(){
		let v = addressUrl();//解析所有参数
		this.activityTypeNum =v['activityTypeNum'] 
		this.activityId = v['activityId']
		this.activityIdImg(v['activityId'])
		this.holidayArea(v['activityId'])
  },
  mounted(){
    
  },
  methods:{
    // 点击切换上一页
    toggletop(){
       if(this.widList-this.wid*4<=-this.toleft){
            return
         }
      this.toleft-=this.wid
      this.$refs.ulWidth.style.transition = 1+'s'
    },
    // 点击切换下一页
    toggledow(){
     
      if(this.toleft>=0){
            return
         }
      this.toleft+=this.wid
      this.$refs.ulWidth.style.transition = 1+'s'
    },
	//查看更多
	async viewAll(){
		const obj={
			activityId:this.activityId,
			pageIndex:this.index,
			pageSize:8,
			activityGoodsTypeId:this.hotProducts.activityGoodsTypeId
		}
		const res =await eventGoods(obj)
		if(res === 200 ){
			this.hotProducts[0].activityHomepageGoodsReturns.push(...res.data.pageList)
		}else{
			this.$message({
				type:'warning',
				message:'已经加载全部'
			})
		}
	},
    handleName(index){
      this.num=index
	},
	async activityIdImg(activityId){
		const res =await matching(activityId)
		if(res.code === 200){
			this.bgImg=res.data[0]
		 }
	},
	async holidayArea(activityId){
	const res= await holidayArea(activityId)
		if(res.code === 200 ){
			this.recommend = res.data[0]
			this.hotProducts =res.data[1]
      this.navList = res.data.slice(2)
      this.wid=  307
      this.widList = this.wid*this.recommend.activityHomepageGoodsReturns.length
      this.toleft = -(this.widList - this.wid*4)
		}	
	},
	async addToShoppingcart(item) {
	  const obj = {
          goodsId: item.goodsId,
          goodsName: item.goodsName,
          goodsSn: item.goodsSn,
          goodsPrice: item.salePrice,
          quantity: 1,
          supplierId: item.supplierId,
          skuId: item.skuId,
          activityId:item.activityId,
          activityGoodsId:item.activityGoodsId,
          activityTypeNum:item.activityTypeNum
				}
				if (item.quantity < 1) {
					this.$message({
						type: 'warning',
						message: '库存不足',
					})
					return
				}
				// 判断是否登录
				const userInfo = isLogin()
				if (userInfo) {
					let res = {}
					try {
						res = await addShoppingCart(obj)
					} catch (e) {
            console.log(e)
					}
					// this.proDetail = res.data
					if (res.code === 200) {
						this.$bus.$emit('getShoppingCartNum')
						this.$message({
							message: '加入购物车成功',
							type: 'success',
						})
					} else {
						this.$message(res.message)
					}
				} else {
          PubSub.publish(SHOW_LOGINPOP)
				}
			},
  },	
}
</script>
<style scoped lang="stylus">
body,p{
  margin: 0;
  padding: 0
}
ul,li{
  padding: 0
}
ul li{

  list-style: none;
}
.app{
  background:rgba(249,249,249,1);
  width: 100%
}
.header{
  width: 100%;
  height: 598px;
}
.banner{
  width: 100%;
  height: 100%;
}
.contenContainer{
  width: 1200px;
  margin: 60px auto;
}
.tuijjian{
  width: 100%
}
.tuijjian  .tuijiansize{
  margin 35px 0
  font-size:28px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(34,34,34,1);
}
.tuijjian .tuijianEgl{
  font-size:18px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(34,34,34,1);
}
.tuijjian img{
  width:100%;
  height:250px;
}
.product{
  margin-bottom: 31px;
  padding-left: 26px;
  padding-right: 22px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  display: block
}
.produnct span{
  font-size:22px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(51,51,51,1);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  display: block
}
.produnct p span{
  color #F8513B
  border:1px solid #F8513B
  cursor: pointer;
  display: inline-block;
  width: 27px;
  margin-right: 10px;
  height: 27px;
  line-height 27px;
  text-align center
  white-space:nowrap;
  overflow:hidden;
 text-overflow:ellipsis;
  display: block
  
}
.produnct{
  display: flex;
  justify-content: space-between;
}
.produnctWrap .productConTainer{
    position:relative;
    width: 100%;
    overflow: hidden;
  	margin-top 35px;
    height 332px
}
.productList{
  position:absolute;
  display: flex;
  justify-content: start;
  padding:0;
  overflow hidden
  right:0;
  top:0;
}
.productList .productItems{
  float: left;
  padding: 27px;
  width:262px;
  margin-right: 48px;
  padding-top: 0;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  box-sizing: border-box
}
.productList .productItems .productImg{
  padding-top: 15px;
  border-top: 3px solid #FF612B;
  width:213px;
  height:213px;
}
.product{
  font-size:18px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(51,51,51,1);
}
.xiangqing{
  display: block;
  margin-top: 15px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(153,153,153,1);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
.price{
  margin-top: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between
}
.price span{
  font-size:16px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,45,45,1);
}
.productList .price img{
  cursor: pointer;
  width:22px;
  height:20px;
}
.hotProductsContainer{
  width: 100%
}
.hotProductsContainer .hotProductsList{
  width: 100%
}
.hotProductsContainer .hotProductsList .hotProductsImg{
  width: 100%;
  height: 220px;
  margin-top: 20px
}
.hotProductsContainer .hotProductsList .productConTainer{
  margin-top: 30px;
  width: 100%;
  overflow: hidden;
} 
.productIem{
   overflow: hidden;
   width: 1300px
}
.hotProductsContainer .hotProductsList .productConTainer .productIem .producList{
   float: left;
  padding: 27px;
  width:262px;
  margin-right: 48px;
  padding-top: 0;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 9px 0px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  margin-bottom:20px
}
.hotProductsContainer .title .chinese{
  margin-top: 60px;
  font-size:28px;
  font-family:Microsoft YaHei;
  font-weight:bold;
  color:rgba(34,34,34,1);
}
.hotProductsContainer .viewAll{
  cursor: pointer;
  text-align: right;
  padding-right: 20px;
  color: rgba(153,153,153,1)
}
.hotProductsContainer .title .english{
  font-size:18px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(34,34,34,1)
}
.productNav{
  width: 100%;
  margin-top: 50px
}
.productNav .productNavItem{
  width: 100%;
  height: 100px;
  line-height: 100px;
  display: flex;
  justify-content: space-around;
  background:rgba(255,255,255,1);
}
.productNav .productNavItem .productList{
  cursor: pointer;
  font-size:18px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  position: relative;
}
.productNav{
  padding:20px
}
.productNav .productNavItem .productList .line{
  width:50px;
  height:6px;
  background:rgba(248,81,59,1);
  border-radius:3px;
  position:absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto
}
.productNav .productTitle{
  background: white
}
.productNav .productTitle .mimian p{
  text-align: center;
  font-size:24px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  height: 80px;
  line-height: 80px
}
.productNav .productTitle  img{
  width: 100%;
  height:280px;
}
.productNav .productTitle .mimianList{
  width: 100%;
  overflow: hidden;
}
.productNav .productTitle .mimianList .mimianListItem{
  overflow: hidden;
  width: 1300px;
  margin-top: -1px
}
.productNav .productTitle .mimianList .mimianListItem li {
  border-right:1px solid rgba(230,230,230,1);
  border-top: 1px solid rgba(230,230,230,1);
  float: left;
}
.productNav .productTitle .mimianList .mimianListItem li img{
  width: 115px;
  height: 115px;
}
.productNav .productTitle .mimianList .mimianListItem .shujuxian .weiken{
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  display: inline-block
}
.productNav .productTitle .mimianList .mimianListItem .shujuxian{
  padding:40px
}
.productNav .productTitle .mimianList .mimianListItem .shujuxian .price{
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(235,76,76,1);
}
.productNav .productTitle .mimianList .mimianListItem li .weiken{
  margin-top: 15px
}
.productLists{
  cursor pointer
}
</style>
