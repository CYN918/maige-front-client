<template>
  <div>
    <!--留言为空-->
    <div class="empty-gift-wrap">
      <div class="empty-gift-img">
        <img src="@/assets/images/birthdayArea/pic_empty.png" alt/>
      </div>
      <p class="word-of-empty">还没有人给你留言哦！</p>
    </div>
    <!--留言板-->
    <div class="blessing-message-box">
      <div class="blessing-message-head">
        <span>我的祝福</span>
        <span @click="$router.back(-1)">返回</span>
      </div>
        <!-- <div class="more-box">
        <a class="a-search-more">查看更多></a>
      </div> -->
    </div>  
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getReceivGift } from '@/api/index'
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapState(['activityId'])
  },
  async created(){
    const userId = JSON.parse(localStorage.getItem('userData')).userId
    const obj  = {
      userId,
      happyEventType:5,
      pageIndex:1,
      activityId:this.activityId,
    }
    const res = await getReceivGift(obj)
    if(res.code === 200){
      console.log(res.data)
    }
  }
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
.photo
  width 87px
  height 80px
.name
  font-size 20px
  line-height 40px
  color #666
  text-align center
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
