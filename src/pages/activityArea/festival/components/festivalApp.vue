<template>
         <div>
             <div class="productTitle"  :key="index">
              <div class="mimian">
                <p>{{navListS.goodsTypeName}}</p>
                      <img v-if="navListS.goodsTypeImgUrl" :src=navListS.goodsTypeImgUrl  alt=""> 
                    </div>
                    <div class="mimianList">
                    <ul class="mimianListItem">
                    <li v-for="(item,index) in navListS.activityHomepageGoodsReturns" :key="index" class="shujuxian">
                      <a :href="`product_details.html?goodsId=${item.goodsId}&activityId=${item.activityId}&activityTypeNum=${activityTypeNum}&activityGoodsId=${item.activityGoodsId}`">
                        <img :src=item.skuImg alt="">
                      </a>
                          <p class="weiken">{{item.goodsName}}</p>
                          <p class="price">积分 {{item.salePrice}}</p>
                      </li>
                    </ul>
                    
                    </div>
                </div>
             <p class='viewAll' @click="viewAll">查看更多》</p>
         </div>
</template>
<script>
import { isLogin ,throttleTipPop} from '@/assets/utils/utils'
import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
import {  addShoppingCart,eventGoods } from '@/api/index'
import {addressUrl  } from "@/assets/utils/utils";
export default {
		props:['navList'],
		data(){
			return{		
                activityTypeNum:'',
                navListS:[],
                index:1
			}
        },
        watch:{
            navList(val,oldval){
                if(val!==oldval){
                    this.navListS = val
                }
            }
        },
		created(){
			const v = addressUrl()
            this.activityTypeNum = v['activityTypeNum']
            this.activityId = v['activityId']
        },
        
		methods:{
                //查看更多
async viewAll(){
		const obj={
			activityId:this.activityId,
			pageIndex:this.index,
			pageSize:8,
			activityGoodsTypeId:this.navListS.activityGoodsTypeId
		}
		const res =await eventGoods(obj)
		if(res === 200 ){
			this.navListS.activityHomepageGoodsReturns.push(...res.data.pageList)
		}else{
			this.$message({
				type:'warning',
				message:'已经加载全部'
			})
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
					activityTypeNum:this.activityTypeNum
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
		}
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
  cursor: pointer;
  display: inline-block;
  width: 27px;
  margin-right: 10px;
  height: 27px;
  background: #F8513B;
  white-space:nowrap;
  overflow:hidden;
 text-overflow:ellipsis;
  display: block
  
}
.produnctContainer{
  width: 100%
}
.produnct{
  display: flex;
  justify-content: space-between;
}
.productConTainer{
    margin-top 40px
    width: 100%;
    overflow: hidden;
}
.productList{
  display: flex;
  justify-content: start;
  padding:0
  
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
}
.productNav .productTitle .mimianList .mimianListItem .shujuxian{
  cursor pointer
  padding:40px
}
.productNav .productTitle .mimianList .mimianListItem .shujuxian .price{
  font-size:12px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(235,76,76,1);
}
.productNav .productTitle .mimianList .mimianListItem li .weiken{
  margin-top: 15px;
  width: 160px;
  text-align center
}	
.viewAll{
    text-align right ;
    padding-right 20px
    margin 40px 0
    cursor pointer
}
</style>
