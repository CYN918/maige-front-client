<template>
  <div >
    <div class="fightGroupContainer">
      <div class="being">
        <span class="num" v-if="personList">{{personList.list.length}}人正在拼团</span>
        <!--外层弹框-->
        <el-button type="text" @click="viewAll" style="color: rgba(153, 153, 153, 1);">查看全部>></el-button>
        <el-dialog
          title="正在拼团"
          :visible.sync="dialogVisible"
          width="40%"
        >
          <el-dialog
            title="参与拼团"
            :visible.sync="isshowFightGroup"
            width="30%"
            append-to-body
          >
          <!--拼团内层弹框-->
          <div class="participate">
            <!-- 倒计时 ——---------->
            <countDown :productInformation ='productInformation' />
            <div class="personaImg">
              <img :src=productInformation.userHeadPhoto >
              <span>&</span>
              <img :src=user.headImgUrl alt="">
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
              <el-button @click="isshowFightGroup = false" type="danger">取 消</el-button>
              <el-button type="primary" @click="configfightGroup">确 定</el-button>
           </span>
        </el-dialog>
          <!--外层弹框信息-->
        <div class="numPeople" style="margin-top: 0">
            <div class="persona" v-for="(item,index) in personList.list" :key="index">
              <div class="personaLeft">
                <img :src=item.userHeadPhoto alt="">
                <span class="text">{{item.userName}}</span>
              </div>
              <div class="personaRight">
                <div class="personaRightText">
                  <!--倒计时-->
                  <countDown :time="true" :productInformation ='item' />
                </div>
                <!--内层开始拼团-->
                <el-button type="text" @click="startGroup(item)" class="goto" style="line-height: 0" >拼团</el-button>
              </div>
            </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" type="danger" >取 消</el-button>
          <el-button type="primary" @click="fightGroup">确 定</el-button>
        </span>
        </el-dialog>
      </div>
      <!--两个人-->
      <!--<div class="numPeople">-->
        <el-carousel  direction="vertical"  class="numPeople">
          <el-carousel-item v-for="(item,index) in swiperArr" :key="index">
             <div v-for="(children,index) in item" :key="index" class="persona">
               <div class="personaLeft">
                 <img :src=children.userHeadPhoto alt="">
                 <span class="text">{{children.userName}}</span>
               </div>
               <div class="personaRight">
                 <div class="personaRightText">
                   <countDown :time="true" :productInformation ='children' />
                 </div>
                 <!--外部发起拼团-->
                 <el-button type="text" @click="outfightGroup(children)" class="goto" style="line-height:0">去拼团</el-button>
               </div>
             </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 輪播圖拼團 -->
        <el-dialog
            title="参与拼团"
            :visible.sync="outerDialogVisible"
            width='30%'>
            <div class="participate">
               <!--倒计时-->
                  <countDown :productInformation ='userList' />
              <div class="personaImg">
                <img :src=userList.userHeadPhoto alt="">
                <span>&</span>
                <img :src=user.headImgUrl alt="">
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="outerDialogVisible = false"  type="danger" >取 消</el-button>
              <el-button type="primary" @click="confriMoutfightGroup">确 定</el-button>
            </span>
        </el-dialog>
    <!--</div>-->
    <div class="btn">
      <div class="alone" @click="alone">单独购买</div>
      <div class="initiate" @click="initiate">发起拼团</div>
    </div>
  </div>
</template>
<script>
  import PubSub from 'pubsub-js'
  import { queryGroup ,obtainSku,getPrimaryKeyId} from '@/api/index'
  import  countDown from './countDown.vue'
  import { SHOW_LOGINPOP } from '@/assets/utils/pubsubEvent'
  import { isLogin,addressUrl } from '@/assets/utils/utils'
  export  default {
    props:['number','skuId'],
    components:{
      countDown
    },
    data(){
      return{
        //查看所有
        dialogVisible: false,
        //内层弹框拼团
        isshowFightGroup:false,
        //外层弹框
        outerDialogVisible:false,
        personList:'',
        swiperArr:[],
        user:'',   //当前用户信息
        goodsinformation:'',   //商品信息
        activityId:'' ,
        activityGoodsId:'',
        activityTypeNum:'',
        productInformation:'',
        goodsId:"",
        userList:'',
        groupId:''
      }
    },

    async created(){
     const res = await getPrimaryKeyId()
     if(res.code === 200 ){
       this.groupId = res.data
     }
    },
    async mounted(){
        let v = addressUrl();//解析所有参数
        this.activityId = v['activityId']
        this.activityGoodsId = v['activityGoodsId']
        this.activityTypeNum=v['activityTypeNum']
        this.goodsId= v['goodsId']
        const obj={
          activityId:this.activityId,
          pageSize:10,
          pageNum:1,
          status:0,
          activityGoodsId:this.activityGoodsId
        }
        const result =await queryGroup(obj)
        if(result.code === 200){
          this.personList = result.data
          for(let i=0;i<result.data.list.length;i+=2){
            this.swiperArr.push(result.data.list.slice(i,i+2));
          }
        }
      //  获取登录这信息
      const userData = this.getCookie('userData')
      this.user= JSON.parse(userData)
      //获取skuId
    },
    methods: {
      //轮播确认
      confriMoutfightGroup(){
          this.outerDialogVisible = false
          const groupId = this.productInformation.groupId
          this.common(groupId)
      },
      
      // 輪播圖去拼圖
      outfightGroup(item){
          this.outerDialogVisible = true
          this.userList = item
          this.productInformation = item
      },
      //获取当前登录者 的信息
      getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
          var c = ca[i].trim();
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
      },
      //去拼团
      gofightGroup(item){
        this.outerDialogVisible = true
        this.productInformation=item
      },

      //轮播图弹框确认拼团
      banneranniu(){
        this.outerDialogVisible = false
        const groupId = this.productInformation.groupId
        this.common(groupId)
      },
      //外层确认按钮选择拼团
      fightGroup(){

      },
      common(groupId){
        this.dialogVisible=false
        const userInfo = isLogin()
        if(userInfo){
          const obj={
            quantity:this.number,
            activityGoodsId:this.activityGoodsId,
            groupId,
            activityId:this.activityId,
            activityTypeNum:this.activityTypeNum,
            goodsId:this.goodsId,
            skuId:this.skuId
          }
          localStorage.setItem('justBuyProduct', JSON.stringify(obj))
          window.location.href=`shopping_cart.html?justBuy=true#/address`
        }else{
          // 需要登录
          PubSub.publish(SHOW_LOGINPOP)
        }
      },
      //发起拼团
      initiate(){
        const groupId= this.groupId
        this.common(groupId)
      },
      //内层开始拼团-
      startGroup(item){
        this.dialogVisible = false
        this.isshowFightGroup = true
        this.productInformation = item
      },
      //查看全部的拼团
      viewAll(){
        this.dialogVisible = true
      },
      //查看全不得去确认拼团
      configfightGroup(){
        this.isshowFightGroup = false
        const { groupId } =this.productInformation
        this.common(groupId)
      },
      //单独购买  直接调用父组件的函数
      alone(){
        this.$parent.buyRightNow();
      }
    }
  }
</script>
<style lang="stylus">
.fightGroupContainer
  width 511px
  background rgba(247, 250, 255, 1)
  .being
    display flex
    justify-content space-between
    box-sizing border-box
    padding 0 23px
    width 100%
    height:43px
    border-bottom 1px solid RGBA(223, 231, 242, 1)
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(153,153,153,1);
    .num
      line-height 43px
  .numPeople
    display flex
    flex-direction column
    justify-content space-around
    margin-top 16px
    box-sizing border-box
    padding-left 11px
    padding-right 19px
    width 100%
    .persona
      margin 15px 0
      display flex
      justify-content space-between
      .personaLeft
        img
          margin-right 13px
          width 35px
          height 35px
          border-radius 50%
          vertical-align middle
        .text
          font-size:14px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(102,102,102,1);
          vertical-align middle
      .personaRight
        display flex
        .personaRightText
          display flex
          flex-direction column
          justify-content space-around
          span
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            &:nth-child(1)
              color:rgba(102,102,102,1);
            &:nth-child(2)
              color:rgba(153,153,153,1);
        .goto
          margin-top 4px
          cursor pointer
          margin-left 10px
          width:72px;
          height:26px;
          color white
          text-align center
          line-height 26px
          background:linear-gradient(90deg,rgba(248,56,56,1),rgba(255,98,72,1));
.btn
  margin-top 35px
  display flex
  justify-content center
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  .alone
    background rgba(30, 159, 255, 1)
    width 140px
    height:34px
    text-align center
    line-height 34px
    cursor pointer
  .initiate
    margin-left 21px
    background rgba(250, 105, 105, 1)
    width 140px
    height:34px
    text-align center
    line-height 34px
    cursor pointer
.participate
  .personaImg
    display flex
    justify-content center
    justify-items center
    margin-top 40px
    padding-bottom 35px
    img
      width 59px
      height:59px
      border-radius 50%
    span
      display inline-block
      height 59px
      line-height 59px
      font-size:14px;
      font-family:Microsoft YaHei;
      font-weight:400;
      color:rgba(102,102,102,1);
      margin 0 24px
.numPeople
  /deep/ .el-carousel__container
            height 122px
</style>
