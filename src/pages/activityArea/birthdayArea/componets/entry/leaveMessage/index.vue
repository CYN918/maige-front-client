<template>
  <div>
    <!--留言为空-->
    <div v-if='receivGiftContainer.length==0' class="empty-gift-wrap">
      <div class="empty-gift-img">
        <img src="@/assets/images/birthdayArea/pic_empty.png" alt @click="leavingMessage=false" />
      </div>
      <p class="word-of-empty">还没有人留言哦，送给ta第一份祝福吧！</p>
    </div>
    <!--留言板-->
    <div class="blessing-message-box">
      <div class="blessing-message-head">
        <span>祝福留言</span>
        <span @click="$router.back(-1)">返回 ></span>
      </div>
      <div class="blessing-message-content">
        <div class="textarea-box">
          <div class="photo-box">
            <div class="photo">
              <img class="bless-msg-avantar" :src=gifterUserId.headImgUrl  alt />
            </div>
            <p class="name">{{gifterUserId.userName}}</p>
          </div>
          <textarea id="bless-word" maxlength="300" placeholder="请输入你的祝福吧!" v-model="blessingWords" @input="descInput"></textarea>
          <span class="word-number">
            <i class="word-of-normal">{{nums}}</i>/300
          </span>
          <span class="time">{{time}}</span>
          <div  class="send-bless-msg-btn" :disabled='blessingWords===""' @click="pub" >发表留言</div>
          <div  class="cancell"   @click="cancell">取消留言</div>
        </div>
        <moreBlessMsg :receivGiftContainer="receivGiftContainer" @submit="CommentRecovery"/>
        <div class="more-box">
          <a class="a-search-more" @click="seeore">查看更多></a>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
import moreBlessMsg from "../moreBlessMsg";
import {mapState} from 'vuex'
import { getGift,getReceivGift } from '@/api/index'
export default {
  components: {
    moreBlessMsg
  },
  data() {
    return {
      leavingMessage: true,  
      time:'',   // 当前发表评论的时间
      nums:0,   //输入的字数
      blessingWords:"" ,//收到的留言祝福
      receivGiftContainer:[], //整个回复的内容  
      num:1,
      userId:''
    };
  },
  computed:{
    ...mapState(['userInfo','activityId','entryUserId','receivGift','gifterUserId']),
  },
  async mounted(){
      // 获取改用户的留言信息
    const obj = {
      activityId: this.activityId,
      userId:this.entryUserId,
      happyEventType: 5,
      pageIndex: 1,
    }
    const res = await getReceivGift(obj)
    if (res.code === 200) {
      console.log(res.data)
      this.receivGiftContainer.push(...res.data.pageList)
      console.log(this.receivGiftContainer)
    }
  },
  methods: {
    //点击发表评论
    async pub() {
      if(this.blessingWords==='') return
      const obj = {
        activityId:this.activityId,  // 活动id
        gifterUserId:this.gifterUserId.userId,   //用户id
        happyEventType:5,   //活动类型
        userId:this.entryUserId,  //评论者id
        blessingWords:this.blessingWords,  //文本内容
        presentType:4      //祝福类型
      }
      const res = await getGift(obj)
      if(res.code === 200){   //发表内容
        const objs = {
          activityId: this.activityId,
          userId:this.entryUserId,
          happyEventType: 5,
          pageIndex: 1,
        }
        const result = await getReceivGift(objs)
      if (result.code === 200) {
        console.log(result.data)
        this.receivGiftContainer.unshift(...result.data.pageList)
      }
    }
      this.blessingWords = "";
      this.nums=0
    },
    //获取输入文字的长度
    descInput(){
      this.nums=this.blessingWords.length
      if(this.nums>=300){
        alert('只能输入300个文字')
      }
    },
    //取消留言
    cancell(){
      this.blessingWords="",   //重置内容
      this.nums=0    //重置文字的长度
    },
    //查看更多
    async seeore(){
      this.num++
      const objs = {
        activityId: this.activityId,
        userId: this.entryUserId,
        happyEventType: 5,
        pageSize:10,
        pageIndex:this.num,
      }
      const result = await getReceivGift(objs)
      if (result.code === 200) {
       this.receivGiftContainer.push(...result.data.pageList)
       if(result.data.pageList<=0){
         alert('已经全部加载')
       }
      }else{
        this.$message({
          type: 'info',
          message: `已经加载全部`
        });
      }
    },
    //点击子评论返回得
    CommentRecovery(data){
      this.receivGiftContainer=data
    },
  },
};
</script>
<style lang="stylus" scoped>
/* 留言 */
.blessing-message-box
  margin 0 auto
  width 1201px
  background #fff
  border-radius 10px
  overflow hidden
.blessing-message-head
  display flex
  justify-content space-between
  height 67px
  background #ffebf2
  padding-left 30px
  padding-right 30px
  color #f54d7f
  font-size 24px
  line-height 67px
  span 
    &:nth-child(2)
      cursor pointer
.blessing-message-content
  padding 35px 25px 0 25px
  box-sizing border-box
.textarea-box
  height 337px
  border-bottom 1px solid #efefef
  position relative
.photo-box
  float left
  margin-right 23px
  width 87px
  height 177px
.photo
  width 87px
  height 80px
.bless-msg-avantar
  display block
  width 100%
  height 100%
.name
  font-size 20px
  line-height 40px
  color #666
  text-align center
.my-name
  font-size 20px
  line-height 40px
  color #666
  text-align center
#bless-word
  float left
  box-sizing border-box
  border 1px solid #cccccc
  border-radius 10px
  resize none
  width 1000px
  height 181px
  margin-left 30px
  box-shadow inset #f5f5f5 0px 5px 5px 0.01px
  padding 25px
  font-size 18px
  color #4d4d4d
  line-height 30px
.word-number
  position absolute
  text-align center
  color #a0a0a0
  top 145px
  right 35px
.word-of-normal
  font-style normal
.time
  padding-top 10px
  padding-right 25px
  box-sizing border-box
  float right
  color #a0a0a0
  font-size 18px
  height 33px
.bless-msg-item
  height 177px
  border-bottom 1px solid #efefef
  list-style none
.more-box
  height 58px
.top
  height 140px
  margin-top 35px
.message-box
  width 980px
  height 90px
  float left
  margin 35px 0px 0px 30px
  box-sizing border-box
  font-size 18px
  color #4d4d4d
  line-height 30px
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 3
  overflow hidden
.send-bless-msg-btn
  display inline-block
  width:150px;
  height:46px;
  background:linear-gradient(45deg,rgba(235,29,89,1),rgba(244,53,133,1));
  box-shadow:0px 5px 12px 1px rgba(245,77,127,0.41);
  text-align center
  border none
  border-radius 22.5px
  text-align center
  font-size 18px
  line-height 46px
  color #fff
  margin 35px 0 0 130px
.send-bless-msg-btn:hover
  cursor pointer
.cancell
  display inline-block
  width:150px;
  height:46px;
  margin 35px 0 0 21px
  text-align center
  line-height 46px
  border-radius 22.5px
  font-family:SourceHanSansCN;
  font-size:18px;
  font-weight:400;
  color:RGBA(243, 51, 128, 1)
  border:1px solid RGBA(247, 109, 167, 1);
.cancell:hover
  cursor pointer
.margin-left
  margin-left 10px
.a-search-more
  cursor pointer
  font-size 16px
  float right
  color #f54d7f
  line-height 58px
  margin-right 10px
/* 留言为空 */
.empty-gift-wrap
  margin-top 42px
  text-align center
.word-of-empty
  text-align center
  margin-top 24px
  font 20px MicrosoftYaHei
  color #B3B3B3
</style>
