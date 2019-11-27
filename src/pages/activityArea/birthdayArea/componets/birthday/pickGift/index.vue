<template>
  <div>
      <div class="gift-wrap">
        <h2 class="gift-title">赠送礼物</h2>
        <div class="gift-content" v-for="(item,index) in pageList" :key="index" >
         <div v-if="pageList&&pageList.length>0">
            <div class="banner-wrap">
              <img :src=pageListDic[index].goodsTypeImgUrl alt="">
          </div>
          <ul class="gift-list clearfix">
            <li class="gift-item"  v-for="(items,indexs) in item" :key="indexs" @click="select(items,index,indexs)">
              <div class="gift-item-pic-wrap">
                  <img :src=items.skuImg alt="" class="gift-item-pic">
                  <i :class="items.ischeked?'on':'off'"></i>
              </div>
              <h4 class="gift-item-name">{{items.goodsName}}</h4>
              <h4 class="gift-item-price">{{items.salePrice}}元</h4>
            </li>
          </ul>
          <p class="addView" @click="addAll(pageListDic,index)">查看更多>></p>
          <div class="one-pixel-line"></div>
        </div>
         </div>
        <button class="confirm-send-btn" @click="jump">确定赠送</button>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { addressUrl }  from '@/assets/utils/utils'
import {specialOffer, eventGoods,matching,addShoppingCart,deleteShop ,queryShop} from '@/api/index'
export default {
  data(){
    return{
      activityId:'',
      pageList:[],  //第一个分页
      num1:[],  //  第一个分页选中的数组
      activityImg:'',
      arr:[],
      shopCart:'',
      num:1,  //分頁
      pageListDic:'',
      num2 :''
    }
  },
  methods:{
      //查看更多
      async addAll(item,index){
        this.num+=1
        const { activityId } = this
        const obj={
            activityId:activityId,
            pageIndex:this.num,
            pageSize:8,
            activityGoodsTypeId:item[index].activityGoodsTypeId,
        }
        const res = await eventGoods(obj)
        if(res.code === 200 ){
          this.pageList[index].push(...res.data.pageList)
        }else{
          this.$message({
            type:'warning',
            message:'已加载全部'
          })
        }
      },
    select(items,index,num){
       console.log(items)
      let ischeked = items.ischeked;
    items.ischeked= ischeked === true ? false : true;
      this.num1 = this.pageList[0].filter((item)=>{
          return item.ischeked
        })
       this.num2 = this.pageList[1].filter((item)=>{
          return item.ischeked
        })
        if(items.ischeked){   //添加购物车
          this.addCart(items)
        }else{                              //删除商品      
          this.deleteCart(items,index)
        }
    },
    //添加购物车
    async addCart(item){
      const obj = {
        goodsId: item.goodsId,
        goodsName: item.goodsName,
        goodsSn: item.goodsSn,
        goodsPrice: item.salePrice,
        quantity: 1,
        supplierId: item.supplierId,
        skuId: item.skuId,
        activityId:item.activityId,
        activityTypeNum:JSON.parse(this.activityTypeNum),
        activityGoodsId:item.activityGoodsId
      }
      const res = await addShoppingCart(obj)
      if(res.code === 200){
        this.arr.push(item)
        const shopCart =await  queryShop()
        if(shopCart.code ===200){
          this.shopCart =shopCart.data
          }
      }
    },
    //删除购物车
    async deleteCart(item,index){
      const shopCarts =  this.shopCart.find((items,index)=>{
        return items.goodsId===item.goodsId
      })
      const cartIds = shopCarts.cartId
      const result =await  deleteShop(cartIds)
      if(result.code === 200){
         this.$message({
            type: 'info',
            message: '已取消商品'
          }); 
      }
    },
    //赠送礼物
    jump(){
      const num = [...this.num1,...this.num2]
      this.$store.commit('handeleGift',num)
      if(num.length>0){
        this.$router.push('/gift')
      }else{
        this.$message({
            type: 'info',
            message: '请选择礼物'
          }); 
      }
    },
  },
  async created(){
      const v=  addressUrl()
       this.activityId=  v['activityId']
      this.activityTypeNum = v['activityTypeNum'].split('#')[0]
        const obj={
          pageNum:1,
          pageSize:10,
          activityId: this.activityId
        }
      //获取所有商品
      const result = await specialOffer(obj)
      if(result.code === 200){
        this.pageListDic = result.data
        console.log(this.pageListDic[0].goodsTypeImgUrl)
        this.pageList = result.data.map(item=>{
         return item.activityHomepageGoodsReturns.map(item=>{
               return {...item,ischeked:false}
          })
        })
      }
  }
}
</script>
<style lang="stylus" scoped>
.addView{
  margin-top :30px;
  text-align:right;
  cursor :default;
      padding-right: 100px
}
.gift-title {
    height: 67px;
    padding: 0 30px;
    background: rgba(255,235,242,1);
    border-radius: 10px 10px 0 0;
    font: 24px/67px MicrosoftYaHei;
    color: #F54D7F;
}
.gift-wrap {
    background: white;
    border-radius: 0 0 10px 10px;
    padding-bottom: 34px;
}
.gift-content {
    padding: 35px 0 0 30px;
}
.banner-wrap {
    width: 423px;
    height: 250px;
    margin-right: 30px;
    float: left;
    img{
      width :100%;
      height :100%
    }
}
.one-pixel-line {
    width: 1144px;
    margin-top: 30px;
    border-bottom: rgba(224,224,224,0.5) 1px solid;
}
.gift-item {
    float: left;
    height: 250px;
}
.gift-item:hover {
    cursor: pointer;
}
.gift-item:nth-of-type(-n+4) {
     width: 145px;
    margin-right: 34px;
}
.gift-item:nth-of-type(n+4) {
    width: 135px;
    margin-right: 30px;
}
.gift-item-pic-wrap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
    height: 145px;
    background: rgba(255,255,255,1);
    border: 2px solid rgba(230,230,230,1);
    box-sizing: border-box;
    margin-top: 21px;
    margin-bottom: 12px;
}
.gift-item-pic {
    width: 100%;
}
.off{
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  background url("~@/assets/images/birthdayArea/icon_unselected.png");
  width: 48px;
  height: 48px;
}
.on{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    background : url("~@/assets/images/birthdayArea/icon_selected02.png");
}
.gift-item-name {
    margin-bottom: 12px;
    font: 20px MicrosoftYaHei;
    color: rgba(51,51,51,1);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
}
.gift-item-price {
    font: 22px MicrosoftYaHei;
    text-align: center;
    color: #EF5252;
}

.confirm-send-btn {
    width: 150px;
    height: 46px;
    margin: 28px 526px 0;
    background:linear-gradient(45deg,rgba(235,29,89,1),rgba(244,53,133,1));
    box-shadow:0px 5px 12px 1px rgba(245,77,127,0.41);
    border-radius: 23px;
    outline: none;
    border: none;
    font: 18px/46px SourceHanSansCN-Normal;
    text-align: center;
    color: white;
    cursor: pointer;
}
.confirm-send-btn:active {
    opacity: 0.8;
}

</style>
