<!--suppress ALL -->
<template>
  <div class="reviews">
      <div class="impressions" v-if="false">
        <span class="t1 impression_1">大家印象：</span>
        <span class="t2 impression">锅不错</span>
        <span class="t2 impression">外观漂亮</span>
        <span class="t2 impression">物美价廉</span>
        <span class="t2 impression">使用方便</span>
        <span class="t2 impression">功能多</span>
        <span class="t2 impression">还可以吧</span>
      </div>
      <div class="title_wrap">
        <div class="title_list" @click="handleClick">
          <span class="t1 title" :class="{selected: selectIndex === 4}" data-index="4">
            全部（{{commentCount?commentCount.counts:0}}）
          </span>
          <span class="t1 title" :class="{selected: selectIndex === 3}" data-index="3" >
            晒图（{{commentCount?commentCount.imgCount:0}}）
          </span>
          <span class="t1 title" :class="{selected: selectIndex === 0}" data-index="0">
            好评（{{commentCount?commentCount.goodCount:0}}）
          </span>
          <span class="t1 title" :class="{selected: selectIndex === 1}" data-index="1">
            中评（{{commentCount?commentCount.middleCount:0}}）
          </span>
          <span class="t1 title" :class="{selected: selectIndex === 2}" data-index="2">
            差评（{{commentCount?commentCount.negativeCount:0}}）
          </span>
        </div>
        <div>
          <!--<span class="t1 sorting">推荐排序</span>-->
          <span class="t1 sorting" @click="rankByTime">
            时间排序
          <i v-if="obj.dateSort === 'asc'" class="el-icon-top"></i>
          <i v-else class="el-icon-bottom"></i>
          </span>
        </div>
      </div>
      <ul class="review_list" v-if="commentList.length">
        <li class="review" v-for="(item,index) in commentList" :key="item.commentId + Math.random() ">
          <div class="avantar">
            <div class="avantar_img_wrap">
              <img class="avantar_img" :src="item.headImgUrl" alt="">
            </div>
            <p class="t1 username" :title="item.userName">{{item.userName}}</p>
          </div>
          <div class="review_content">
            <!-- 评分 -->
            <!--<el-rate v-model="3" colors="{#4C86F4}"></el-rate>-->
            <p class="t1 review_text">
              {{item.content}}
            </p>
            <ul class="review_img_list">
              <li class="review_img_wrap" :ref="`imgWrap${index}`"
                  v-for="(data,index2) in  item.galleryList" :key="index2"  @click="enlargeImg(data.imgUrl, index)">
                <img class="review_img" alt=""
                     :src="data.imgUrl"
                 >
              </li>          
            </ul>
            <div class="enlarge_img_container">
              <img class="enlarge_review_img" alt="" src="" :ref="`enlarge${index}`" @click="hideEnlargeImg(index)">
            </div>
            <p class="t2 time">{{item.creatTime | timeData}}</p>
            <div class="re_review" v-if="item.addComment.length">
              <p class="t2">【{{item.addComment[0].intervalTime == 0?'当天':(item.addComment[0].intervalTime + '天后')}}追评】</p>
              <p class="t1">{{item.addComment[0].content}}</p>
            </div>
            <div class="re_review" v-if="item.sysComment.length">
              <p class="t2">【系统回复】</p>
              <p class="t1">{{item.sysComment[0].content}}</p>
            </div>
          </div>
          <div class="review_right">
            <!-- <p class="t1">颜色分类：</p> -->
            <p class="t2">{{item.specValue}}</p>
          </div>
        </li>
      </ul>
      <Pagination v-if="commentList.length > 10" :items="count" :page-size="10" @index='pageindex'></Pagination>
      <div class="no-people" v-if="!commentList.length">
        <img src="../../../../assets/images/product_detail/nocomments.jpg" alt="">
      </div>
    </div>
</template>

<script>
import Pagination from './Pagination';
import { getComments } from '@/api/index'

export default {
  name: 'Reviews',
  props: {
    commentCount: {
      type: Object,
    },
    comcommentNum: {
      type: Object,
    },
    shopId: {
      type: String,
    }
  },
  data() {
    return {
      commentList: [],
      selectIndex: 4,
      imgUrl: '',
      isEnlargeImg: false,
      index: '',
      imgId: '',
      targetImg: null,
      obj: {},
      count: 0,
    };
  },
  created() {
    this.getComments(4)
  },
  watch: {
    index(data) {
      this.$emit('pageindex', data);
    },
  },
  filters: {
    timeData(val) {
      return val.slice(0, 10);
    },
  },
  methods: {
    // 根据时间排序
    async rankByTime() {
      this.obj.dateSort === 'asc' ? this.obj.dateSort = 'desc' : this.obj.dateSort = 'asc'
      const res = await getComments(this.obj)
      if (res.code === 200) {
        this.commentList = res.data.pageList
        this.count = res.data.count
      }
    },
    // 获取各类评论
    async getComments(type) {
      type === 4 ? type =  '': type = type
      this.obj.goodsId = this.shopId
      this.obj.pageIndex = this.index
      this.obj.pageSize = 10
      this.obj.type = type
      const res = await getComments(this.obj)
      if (res.code === 200) {
        this.commentList = res.data.pageList
        this.count = res.data.count
        console.log(this.commentList)
      }
    },
    async pageindex(data) {
      this.obj.pageIndex = data;
      const res = await getComments(this.obj)
      if (res.code === 200) {
        this.commentList = res.data.pageList
      }
    },
    // 隐藏放大的图片
    hideEnlargeImg(index) {
      const imgWraps = this.$refs['imgWrap' + index]
      for(let i = 0; i < imgWraps.length; i++) {
        imgWraps[i].classList.remove('imgSelected')
      }
      this.$refs['enlarge' + index][0].parentNode.style.width = 0;
      this.$refs['enlarge' + index][0].parentNode.style.height = 0;
      this.$refs['enlarge' + index][0].parentNode.style.borderWidth = 0;
    },
    // 显示放大的图片
    showEnlargeImg(e, index) {
      this.$refs['enlarge' + index][0].src = e.src;
      this.$refs['enlarge' + index][0].parentNode.style.width = '262px';
      this.$refs['enlarge' + index][0].parentNode.style.height = '262px';
      this.$refs['enlarge' + index][0].parentNode.style.borderWidth = '1px';
    },
    // 放大图片
    enlargeImg(imgUrl, index) {
      const e = window.event;
      if (e.target.nodeName.toLocaleLowerCase() === 'img') { // 点击为图片时
        if (e.target.parentNode.classList.contains('imgSelected')) {
          e.target.parentNode.classList.remove('imgSelected')
          this.hideEnlargeImg(index)
        } else {
          e.target.parentNode.classList.add('imgSelected')
          this.showEnlargeImg(e.target, index)
        }
        if(this.imgId === index && this.targetImg !== e.target) { // 点击的是同一条评论里的图片,但不是同一张
          this.targetImg.parentNode.classList.remove('imgSelected')
        }
        this.targetImg = e.target
        this.imgId = index
      }
    },
    handleClick() {
      const e = window.event;
      if (e.target.nodeName.toLocaleLowerCase() === 'span') {
        this.selectIndex = e.target.dataset.index * 1;
        this.getComments(this.selectIndex)
      }
    },
  },
  components: {
    Pagination,
  },
  watch:{
    commentCount(val){
      console.log(val)
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  @import "~styles/varibles.styl"
  .username
    width 80px
    ellipsis()
  .time
    text-align left
  .enlarge_img_container
    display flex
    justify-content center
    align-items center
    width 0px
    height  0px
    border 1px solid #ececec
    border-width 0
    margin-bottom 10px
    transition all 0.5s ease
    .enlarge_review_img
      max-height 98%
      max-width 98%
      cursor pointer
  .t1
    normalFont()
  .t2
    color $lightTxC
    font-size 12px
  .impressions
    display flex
    align-items center
    padding 40px 0 47px 33px
    .impression_1
      margin-right 36px
    .impression
      display inline-block
      width 54px
      height 24px
      line-height 24px
      text-align center
      border 1px solid rgba(204,204,204,1)
      margin-right 15px
  .title_wrap
    padding 10px 22px 10px 33px
    margin-top 20px
    margin-bottom 10px
    display flex
    justify-content space-between
    .title
      margin-right 30px
      cursor pointer
    .selected
      color #FA6969
    .sorting
      margin-left 28px
      cursor pointer
  .review_list
    margin-bottom 50px
    .review
      display flex
      padding 20px 56px
      border-bottom 1px solid #E6E6E6
      position relative
      .avantar
        verticalCenter()
        margin-right 40px
        cursor pointer
        flex-shrink 0
        .avantar_img_wrap
          width 42px
          height 42px
          border-radius 50%
          background gray
          margin-bottom 12px
          img
            width 100%
            height 100%
      .review_right
        position absolute
        right 58px
        align-self: center
        flex-shrink 0
        p
          text-align center
        .t1
          margin-bottom 13px
      .review_img_list
        display flex
        margin-bottom 18px
        .review_img_wrap
          width 50px
          height 50px
          border 1px solid #E6E6E6
          margin-right 10px
          cursor pointer
          box-sizing border-box
          centered()
          .review_img
            imgSize()
        .imgSelected
          border 2px solid #4C86F4
  .review_text
        line-height 1.5em
        margin-bottom 10px
      .re_review
        .t2
          margin-top 25px
          margin-bottom 13px
  .largeImg_wrap
    centered()
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    margin auto
    width 306px;
    height 406px;
    background #fff
    border 1px solid rgba(230,230,230,1);
    box-shadow 2px 2px 10px #aaa
    .enlarge_img_wrap
      centered()
      width 293px;
      height 308px;
      img
        width 100%
    .iconfont
      font-size 28px
      color #1E9FFF
      text-shadow 2px 2px 5px rgba(30,132,209,0.58);
      cursor pointer
.no-people{
  text-align:center;
}
.reviews{
  border:1px solid rgba(214,222,239,1);
  padding-bottom: 20px;
}
</style>
