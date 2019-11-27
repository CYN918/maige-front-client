<template>
  <div>
    <div class="headers" v-if="receivGiftContainer.length>0">
      <div class="text">
        <div class="leaveMessageWrap" v-for="(item,indexs) in receivGiftContainer" :key="indexs">
          <div class="leaveMessage">
            <!-- 发表评论 -->
            <div class="leaveMessageLeft">
               <img :src=gifterUserId.headImgUrl alt="">
               <span>{{gifterUserId.userName}}</span>
            </div>
            <div class="leaveMessageRight">
              <div class="leaveMessageRightTop">
                <p class="username">亲爱的{{item.gifterUserName}}:</p>
                <p class="usertext">{{item.blessingWords}}</p>
                <p class="time">{{item.createTime}}</p>
              </div>
            </div>
          </div>
          <!-- 恢复的内容 -->
          <div v-if="item.childComment.length>0">
            <div class="leaveMessageClildrens"    v-for="(children,sunindex) in item.childComment" :key="sunindex">
              <div style="display: flex">
                <div class="leaveMessagechildrenLeft">
                  <img :src=gifterUserId.headImgUrl alt=""/>
                  <div class="time-select">
                    <p class="userName"> {{gifterUserId.userName}} </p>:
                    <p class="time">
                      <span>{{(children.createTime).slice(0,10)}}</span>
                      <span class="reply" @click="subComment(children,indexs,sunindex)">回复</span>
                    </p>
                  </div>
                </div>
                <div class="leaveMessagechildrenRight">
                   <p class="usertext"> {{children.comment}}</p>
                </div>
              </div>
              <!--子回复模块-->
              <div v-if="children.childReply.length>0" >
                <div class="childReply" v-for="(items,index) in children.childReply" :key="index" >
                <div style="display: flex">
                  <div class="leaveMessagechildrenLeft">
                    <img :src=gifterUserId.headImgUrl alt=""/>
                    <div class="time-select">
                      <p class="userName">
                        <span> {{gifterUserId.userName}}</span>
                        <span style="color: #000;">回复</span>
                        <span> {{children.userName}}</span>
                      </p>:
                      <p class="time">
                        <span>{{(items.createTime).slice(0,10)}}</span>
                        <span class="reply" @click="sunpubLish(index,item,sunindex)">回复</span>
                      </p>
                    </div>
                  </div>
                  <div class="leaveMessagechildrenRight">
                    <p class="usertext"> {{items.comment}}</p>
                  </div>
                </div>
                <div class="blessContainer" v-if="isshowPublish&&sunNum===index&&sunNumtype===sunindex">
                  <textarea class="bless-word" maxlength="150" placeholder="请输入你的留言!" v-model="sunContent" @input="sundescInput"></textarea>
                  <span class="word-number">
                </span>
                  <div class="submit">
                    <span  class="send-bless-msg-btn"  @click="sunpub(children,items)">回复</span>
                    <span  class="cancell"   @click="suncancell">取消</span>
                  </div>
                </div>
              </div>
            </div>
              </div>
          </div>
          <!--一级评论  -->
          <div class="leavingMessageWrap" >
            <p  class="comment"  @click="showComment(item,indexs)"   v-if="leavingMessage">
              <img src="@/assets/images/birthdayArea/icon_edit.png" alt=""/>
              <span>评论</span>
            </p>
            <div class="bless-word-Container" v-if="!leavingMessage&& num === indexs">
              <textarea id="bless-word" maxlength="300" placeholder="请输入你的留言!" v-model="blessingWords" @input="descInput"></textarea>
              <span class="word-number">
                  <i class="word-of-normal">{{wordCount}}</i>/300
                </span>
              <div  class="send-bless-msg-btn" :disabled='blessingWords===""' @click="pub(item)">发表评论</div>
              <div  class="cancell"   @click="cancell">取消留言</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getGift,getReceivGift,subComment  } from '@/api/index'
export default {
  props: ["receivGiftContainer"],
  data() {
    return {
      isshowPublish:false,   //回复框的显示隐藏
      leavingMessage: true,
      wordCount:0,   //写入的字数
      num:'',   //当前的子评论
      blessingWords:"" ,
      parentId:'',  //一级评论的id
      ishowMsg:true,
      realName:'' ,  //当前用户
      publishType:'', //评论的状态
      childrenNum:'',
      sunNum:'',
      sunNumtype:'',
      sunContent:''   //子回复内容
    }
  },
  created(){
  },
  mounted(){
  },
  computed:{
    ...mapState(['activityId','promotionPersonal','gifterUserId','promotionUserId'])
  },
  methods: {
    //评论
    async pub(item) {
      if(this.blessingWords==='') return
      //一级评论
      let obj
      if(this.publishType===1&&this.gifterUserId){
        obj = {
          userId:this.gifterUserId.userId ,  ////用户id
          userName:this.gifterUserId.userName,
          comment:this.blessingWords,  //文本内容
          happyEventId:item.happyEventId,  //评论的id
          isParentLevel:1,   //是父级评论
        }   //一级回复
      }else if(this.publishType===2&&this.gifterUserId){
         obj = {
          replyUserId:item.childComment[this.childrenNum].userId,   //用户id
          replyUserName:item.childComment[this.childrenNum].userName, //用户姓名
          userId:this.gifterUserId.userId ,  //评论者id
          userName:this.gifterUserId.userName,
          comment:this.blessingWords,  //文本内容
          happyEventId:item.happyEventId,  //评论的id
          isParentLevel:0,   // 回复评论
          parentId : item.childComment[this.childrenNum].commentId,
        }
      }
        const res = await subComment(obj)
        if(res.code === 200){   //获取内容
         const objs = {
          activityId: this.activityId,
          userId:this.promotionUserId,
          happyEventType:4,
          pageIndex: 1,
        }
        const result = await getReceivGift(objs)
        if (result.code === 200) {
          this.$emit('submit',result.data.pageList)
        }
        this.blessingWords = "";
        this.wordCount=0,
        this.leavingMessage = true
      }
    },
    //一级回复
    subComment(item,indexs,index){
      this.publishType = 2 //一级回复
      this.leavingMessage = false
      this.num = indexs   //一级评论的下表
      this.childrenNum= index //一级回复的下标
    },
    //限制一级评论的文字的长度
    descInput(){
      this.wordCount=this.blessingWords.length
      if(this.wordCount===300){
        this.$message({
          type: 'info',
          message: '只能输入300个文字'
        });
      }
    },

    //限制二级回复的字数限制
    sundescInput(){
      const sunContenlength=this.sunContent.length
      if(sunContenlength===150){
        this.$message({
          type: 'info',
          message: '只能输入150个文字'
        });
      }
    },
    // 点击二级回复
    sunpubLish(index,item,indexs){
      this.isshowPublish = true
      this.sunNum = index
      this.sunNumtype = indexs
    },
    //二级回复
    async sunpub(children,item){
      if(this.sunContent==='') return this.$message('请输入内容')
      const obj = {
        replyUserId:item.userId,   //用户id
        replyUserName:item.userName, //用户姓名
        userId:this.gifterUserId.userId ,  //评论者id
        userName:this.gifterUserId.userName,  //
        comment:this.sunContent,  //文本内容
        happyEventId:item.happyEventId,  //评论的id
        isParentLevel:0,   // 回复评论
        parentId : children.commentId,
      }
       const res = await subComment(obj)
        if(res.code === 200){   //获取内容
         const objs = {
          activityId: this.activityId,
          userId:this.promotionUserId,
          happyEventType:4,
          pageIndex: 1,
        }
        const result = await getReceivGift(objs)
        if (result.code === 200) {
          this.$emit('submit',result.data.pageList)
        }
      }
       this.isshowPublish = false
      this.sunContent = ''
    },
    suncancell(){
      this.isshowPublish = false
    },
    //取消留言
    cancell(){
      this.blessingWords="",   //重置内容
      this.wordCount=0 ,   //重置文字的长度
      this.leavingMessage=true
      this.num = ''
    },
    //点击评论
    showComment(item,indexs){
      this.leavingMessage=false
      this.num=indexs
      this.publishType = 1    //一级评论
    }
  },
};
</script>
<style lang="stylus" scoped>
.headers
  width 100%
  .text
    width 100%
    .leaveMessageWrap
      width 100%
      overflow hidden
      border-bottom: 1px solid #efefef;
      .leaveMessage
        width 100%
        display flex
        padding-left 35px
        box-sizing border-box
        margin-top 46px
        padding-bottom 20px
        .leaveMessageLeft
          width 126px
          text-align center
          img
            width 67px
            height 73px
          span
            display inline-block
            margin-left 12px
            margin-top 4px
            font-size:20px
            font-family:Microsoft YaHei
            font-weight:400
            color:rgba(102,102,102,1)
        .leaveMessageRight
          border-bottom  1px solid rgba(224, 224, 224, 0.5)
          width 987px
          margin-left 61px
          font-size:18px;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(77,77,77,1);
          .leaveMessageRightTop
            padding-bottom 20px
            .usertext
              width 100%
              text-indent:2em
              word-wrap : break-word
              margin-top 16px
              font-size 18px
            .time
              float right
              width 100%
              text-align right
              margin-top 13px
    .leaveMessageClildrens
      padding 20px 0
      width 80%
      display flex
      flex-direction column
      margin-left 221px
      .leaveMessagechildrenLeft
        display flex
        img
          width 50px
          height: 50px
        .time-select
          margin 0 10px
          .userName
            font-size:18px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color: rgb(209,150,21)
            display inline-block
          .time
            margin-top 10px
            .reply
              color rgb(209,150,21)
              margin-left 5px
            .reply:hover
              cursor pointer
      .leaveMessagechildrenRight
        padding-bottom  20px
        font-size:16px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(77,77,77,1);
        word-break: normal;
        width 508px
.leavingMessageWrap
  margin-bottom 20px
.comment
  margin-top 20px
  cursor pointer
  img
    margin-left 208px
.bless-word-Container 
  position relative
  width 81%
  padding-left 217px
  #bless-word
    float left
    box-sizing border-box
    border 1px solid #cccccc
    border-radius 10px
    resize none
    width 100%
    height 100px
    box-shadow inset #f5f5f5 0px 5px 5px 0.01px
    padding 25px
    font-size 18px
    color #4d4d4d
    line-height 30px
  .word-number
    position absolute
    text-align center
    color #a0a0a0
    top 76px
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
    margin 35px 0 0 30px
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
 .childReply
    display flex
    flex-direction column
    margin-top 20px
    margin-left 60px
    .reply
      margin-left 5px
.blessContainer
  width 865px
  margin-top 20px
  .bless-word
     resize none
     border 1px solid #ccc
     width 100%
     height 80px
     padding 10px
     box-sizing border-box
  .submit
    display flex
    margin-top 20px
    .send-bless-msg-btn
      margin-right 20px
    .send-bless-msg-btn:hover
      cursor pointer
    .cancell:hover
      cursor pointer
</style>
