<template>
  <div>
      <!--生日-->
    <div class="birthday-card">
      <h3 class="birthday-card-title">生日</h3>
      <ul class="birthday-list">
        <li class="birthday-card-01">
          <div class="user-wrap">
            <div class="avantar-wrap">
              <img class="icon-crown" src="@/assets/images/birthdayArea/icon_crown.png" alt />
              <img class="birthday-avantar" :src='userName.sex==2?birthdayPhonto[1].img:birthdayPhonto[0].img' alt="寿星" />
            </div>
            <div class="birthday-name-wrap">
              <span class="birthday-name">{{userName.realName}}</span>
              <img
                class="icon-button"
                src="@/assets/images/birthdayArea/icon_button.png"
                alt
                @click="isshowMsg"
              />
            </div>
          </div>
          <h5 class="word-wrap">
            <a class="word-of-receive" href="moreBlessMsg.html">
              收到的祝福
              <span class="word-of-receive-sp">（{{addBlessing.blessCount}}）</span>
            </a>
          </h5>
          <h5 class="word-wrap">
            <a class="word-of-receive" href="receiveRedPacket.html">
              收到的红包
              <span class="word-of-receive-sp">（{{addBlessing.redPacketCount}}）</span>
            </a>
          </h5>
          <h5 class="word-wrap">
            <span class="word-of-receive" >
              收到的礼物
              <span class="word-of-receive-sp">（{{addBlessing.presentCount}}）</span>
            </span>
          </h5>
        </li>
        <li>
          <img
            class="pic-birthday-card birthday-item "
            src="@/assets/images/birthdayArea/jifu.png"
            alt="为TA集福"
            @click="gilr"
          />
        </li>
        <li>
          <img
            class="pic-birthday-card birthday-item "
            src="@/assets/images/birthdayArea/zhufu.png"
            alt="祝福留言"
            @click='blessingMessage'
          />
        </li>
        <li>
          <img class="pic-birthday-card birthday-item " src="@/assets/images/birthdayArea/liwu.png" alt="赠送礼物" @click="pickGift"/>
        </li>
        <li>
          <img class="pic-birthday-card birthday-item " src="@/assets/images/birthdayArea/hongbao.png" alt="打赏红包" @click="redEnvelope"/>
        </li>
      </ul>
    </div>

    <!--弹窗-选择人物-->
    <div class="mask-wrap" :class="{'scal':ishow}">
      <div class="pop-up">
        <h2 class="pop-up-title">选择人物</h2>
        <ul class="pop-up-content clearfix">
          <li
            class="pop-up-item"
            v-for="(item,index) in birthdayList"
            :key="index"
            @click="clilkpersonal(index)"
          >
            <i class="icon-select icon-selected" :class="{'active':num===index}"></i>
            <img class="select-avantar-pic" :src='item.sex===2?birthdayPhonto[1].img:birthdayPhonto[0].img' alt />
            <p class="selected-avantar-name">{{item.realName}}</p>
          </li>
        </ul>
         <el-pagination
            class="pagination"
            center
            small
            layout="prev, pager, next"
            :total="birthdayList.length">
          </el-pagination>
        <button class="selected-btn" @click="showMsg">确定</button>
      </div>
    </div>

    <!--集“福”赢礼券-->
    <div class="collect-bless-title">
      <span class="word-of-title">集“福”赢礼券</span>
    </div>
    <div class="collect-bless">
      <div class="word-of-desciption">
        同事生日前30天内，点击
        <span class="word-of-special">“为TA集福”</span>，
        <p>即可帮助TA获得福利哦！<span class="word-of-special">{{status}}</span></p>
        <p>福利券会于生日当天放入寿星的个人中心中，
        寿星佬不要忘记使用。 </p>
      </div>
      <ul class="lucky-bag">
        <li class="lucky-bag-item">
          <img src="@/assets/images/birthdayArea/10yuan.gif" alt="10元" v-show="!welfare1"/>
          <img src="@/assets/images/birthdayArea/10yuan.png" alt="10元" v-show="welfare1"/>
          <span class="word-of-coupon">10人可筹得</span>
        </li>
        <li class="lucky-bag-item">
          <img src="@/assets/images/birthdayArea/20yuan.gif" alt="20元" v-show="!welfare2"/>
          <img src="@/assets/images/birthdayArea/20yuan.png" alt="20元" v-show="welfare2"/>
          <span class="word-of-coupon">20人可筹得</span>
        </li>
        <li class="lucky-bag-item">
          <img src="@/assets/images/birthdayArea/30yuan.gif" alt="30元" v-show="!welfare3"/>
          <img src="@/assets/images/birthdayArea/30yuan.png" alt="30元" v-show="welfare3"/>
          <span class="word-of-coupon">30人可筹得</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {getGift ,getaddBlessings,getReceivGift}  from '@/api/index'
export default {
  data(){
    return{
      permission:false,
      userNames:'',   //生日人的id
      num:'', //toggle 选中的状态
      status: 0, //收到的祝福 默认为0
      ishow: true,
      welfare1:true,
      welfare2:true,
      welfare3:true,
      birthdayPhonto:[
        {img:require('@/assets/images/birthdayArea/birthday1.png')},
        {img:require('@/assets/images/birthdayArea/birthday2.png')}
      ],
    }
  },
  mounted(){

  },
  watch:{
   status(){
         //改变优惠劵红包的状态
      if(this.status===10&&this.status<20){
        this.welfare1=false
      }
      if(this.status>=20&&this.status<30){
        this.welfare2=false
        this.welfare1=true
      }
      if(this.status>=30){
        this.welfare3=false
        this.welfare2=true
      }
    },
    addBlessing(){
       this.status =this.addBlessing.goodLuckCount
    }
  },
  computed:{
    ...mapState(['birthdayList','userName','activityId','userId','addBlessing','gifterUserId'])
  },
  methods:{
    //选择人物
    clilkpersonal(index) {
      this.num = index;
      this.$store.commit('handlepersonal',this.birthdayList[this.num])
      this.$store.commit('handleUserId',this.birthdayList[this.num].userId)
    },
    //控制弹窗
    isshowMsg() {
      this.ishow = true;
    },
    //添加祝福
    async gilr() {
      if(!this.userId){
        this.$message({
            type: 'info',
            message: `请选择人物`
        });
         return false
      }
      const obj = {
        activityId:this.activityId,  // 活动id
        gifterUserId:this.gifterUserId.userId,   //用户id
        happyEventType:1,   //活动类型
        userId:this.userId ,  //评论者id
        presentType:1     //祝福类型
      }
      const result =await getGift(obj)
      if(result.code === 200){
        this.status = result.data
      }else{
        this.$message('亲 您已经赠送过了')
      }
    },
    //确认人物
  async  showMsg() {
      this.ishow = false;
      this.$store.commit('handleUserId',this.birthdayList[this.num].userId)
      await this.$store.dispatch('getaddBlessings',1)
      this.status =this.addBlessing.goodLuckCount
      this.userNames = JSON.parse( sessionStorage.getItem('userName'))
    },
    //送礼物
    pickGift(){
      if(!this.userId){
        this.$message({
              type: 'info',
              message: `请选择人物`
            });
         return false
      }
      this.$router.push('/pickGift')
    },
    //打赏红包
    redEnvelope(){
      if(!this.userId){
        this.$message({
              type: 'info',
              message: `请选择人物`
            });
         return false
      }
      this.$router.push('/redEnvelope')
    },
    //祝福留言
    blessingMessage(){
      if(!this.userId){
        this.$message({
              type: 'info',
              message: `请选择人物`
            });
         return false
      }
      this.$router.push({
        path:'/LeaveMessage',

    })
  },
   created(){
     if(this.handlepersonal){
       this.ishow=false
     }
     // 调用函数获取个人信息
    this.userNames = JSON.parse( sessionStorage.getItem('userName'))
    }
  }
}
</script>
<style lang='stylus' scoped>
/* 生日卡 */
.birthday-card
  height 597px
  padding 25px 0 25px 20px
  background rgba(255, 255, 255, 1)
  border-radius 10px
.birthday-card-title
  margin-bottom 20px
  font-size 24px
  font-family MicrosoftYaHei-Bold
  font-weight bold
  color rgba(252, 109, 81, 1)
.birthday-item
  display inline-block
  float left
  margin-bottom 21px
  margin-right 18px
.user-wrap, .birthday-item:hover
  opacity 0.8
  cursor pointer
.birthday-card-01
  display flex
  flex-direction column
  align-items center
  float left
  width 360px
  height 508px
  padding-top 17px
  margin-right 22px
  box-sizing border-box
  background-image url('~@/assets/images/birthdayArea/pic_background01.png')
  background-size 100%
.pic-birthday-card
  width 378px
  height 243px
.avantar-wrap
  display flex
  flex-direction column
  align-items center
  height 134px
  margin-bottom 12px
.icon-crown
  width 48px
  height 32px
.birthday-avantar
  width 101px
  height 109px
.birthday-name
  font-size 22px
  font-family MicrosoftYaHei
  color rgba(51, 51, 51, 1)
  font-weight normal
.user-wrap
  margin-bottom 22px
.icon-button
  margin-left 6px
.word-wrap
  margin-bottom 24px
.word-of-receive
  font 16px MicrosoftYaHei
  color #999
.word-of-receive-sp
  color #FFA453
/* 集“福”赢礼券 */
.collect-bless-title
  height 76px
  text-align center
  background-image url('~@/assets/images/birthdayArea/icon_titel.png')
  background-repeat no-repeat
  background-position center center
.word-of-title
  font-size 22px
  font-family MicrosoftYaHei-Bold
  font-weight bold
  color rgba(252, 109, 81, 1)
  line-height 76px
.collect-bless
  display flex
  width 1032px
  height 147px
  padding 60px 64px
  background rgba(253, 234, 234, 1)
  border 20px white solid
  border-radius 10px
  margin-bottom 105px
.word-of-desciption
  width 425px
  height 148px
  font-size 22px
  font-family MicrosoftYaHei
  font-weight 400
  color rgba(102, 102, 102, 1)
  line-height 1.8em
.word-of-special
  font-weight bold
  color #FC6D51
.lucky-bag
  display flex
  justify-content space-around
  width calc(100% - 425px)
.lucky-bag-item
  display flex
  flex-direction column
  align-items center
  img
    &:nth-child(1)
     max-height 150px
     margin-top: -32px;
     margin-bottom: 33px;
.word-of-coupon
  font-size 20px
  font-family MicrosoftYaHei
  font-weight 400
  color rgba(102, 102, 102, 1)
  margin-top -16px
/* 选择人物弹窗 */
.mask-wrap
  position fixed
  top 0
  left 0
  background rgba(0, 0, 0, 0.5)
  width 100%
  height 100%
  z-index 1000
  transform scale(0)
  transition all 1s
  &.scal
    transform scale(1)
    transition all 1s
.pop-up
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  margin auto
  width 823px
  height 626px
  background #FAFAFA
  border-radius 8px
.pop-up-title
  width 100%
  height 44px
  background #F54D7F
  border-radius 8px 8px 0 0
  font 18px / 44px MicrosoftYaHei
  text-align center
  color white
.pop-up-content
  padding 82px 80px 66px 33px
.pop-up-item
  float left
  position relative
  display flex
  flex-direction column
  justify-content space-around
  align-items center
  width 130px
  height 130px
  padding 10px
  margin 0 0 40px 47px
  box-sizing border-box
  background rgba(255, 255, 255, 1)
  box-shadow 0px 5px 12px 0px rgba(153, 153, 153, 0.24)
  border-radius 6px
.select-avantar-pic
  max-width 60px
  max-height 66px
.selected-avantar-name
  font 18px MicrosoftYaHei
  text-align center
  color #333
/* 选中按钮 */
.icon-select
  position absolute
  top 5px
  right 5px
  width 20px
  height 20px
  border-radius 50%
  border 1px solid #CCC
  box-sizing border-box
.icon-selected
  &.active
    background-image url('~@/assets/images/birthdayArea/icon_seceted.png')
    background-size 100%
.selected-btn
  margin 0 336px
  width 150px
  height 46px
  background linear-gradient(45deg, rgba(235, 29, 89, 1), rgba(244, 53, 133, 1))
  box-shadow 0px 5px 12px 1px rgba(245, 77, 127, 0.41)
  border-radius 30px
  font 18px / 46px MicrosoftYaHei
  text-align center
  color white
  outline none
  border none
.pagination
  text-align: center;
  margin-top: -49px;
  margin-bottom: 38px;
</style>
