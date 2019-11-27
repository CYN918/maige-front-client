<template>
  <div class="container">
    <div class="header-wrapper">
      <!--首屏轮播-->
      <div class="swiper-container first-banner-wrap">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <a href="javascript:;">
              <img class="banner_fist_screen" src="@/assets/images/birthdayArea/banner_first.png" alt="喜事连连" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
    <!--喜事列表-->
      <ul class="happy-event-list" v-show="$route.meta.label">
        <li v-for="(item,index) in career" :key="index" @click="toggleCarerr(index)">
            <img class="pic-happy-event" :src=item.img  alt="" />
            <span class="word-of-list">{{item.name}}</span>
        </li>
      </ul>
      <keep-alive>
         <router-view></router-view>
      </keep-alive>
   </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import { getaddBlessing } from '@/api/index'
export default {
data() {
    return {
      userName:'',
      nums:'',
      ishow: false,  //默认显示弹窗
      routerLinkeArr:['/birthday','/marry','/child','/promotion','/entry'],
      birthdayPhonto:[
        {img:require('@/assets/images/birthdayArea/birthday1.png')},
        {img:require('@/assets/images/birthdayArea/birthday2.png')}
      ],
      career:[
        {
          name:'生日',
          img:require('@/assets/images/birthdayArea/icon_birthday.png')
        },
        {
          name:'结婚',
          img:require('@/assets/images/birthdayArea/icon_wedding.png')
        },
        {
          name:'生子',
          img:require('@/assets/images/birthdayArea/icon_newborn.png')
        },
        {
          name:'升职',
          img:require('@/assets/images/birthdayArea/icon_promotion.png')
        },
        {
          name:'入职司龄',
          img:require('@/assets/images/birthdayArea/icon_workyear.png')
        }
      ],
      num:'',  //切换组件
    };
  },
  computed:{
    ...mapState(['birthdayList','userId'])
  },
  methods: {
    toggleCarerr(index){
      this.num = index
      this.$router.push({
        path: this.routerLinkeArr[index],
      })
    },

  },
  mounted(){
  },
  created(){
    //获取30天内生日的人数
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
      let v = parseUrl();//解析所有参数
      const activityId = v['activityId']
      this.$store.commit('handleActiveId',activityId) // 存储活动id
      this.$store.dispatch('getPeosonal',v['activityId'])  //获取生日的人数
      this.userName = JSON.parse(localStorage.getItem('userName'))
  },
};
</script>
<style lang="stylus" scoped>
/* 通用样式 */
*
  margin 0
  padding 0
  text-decoration none
  list-style none
body
  background #f5f5f5
.container
  background  RGBA(245, 245, 245, 1)
a:hover
  opacity 0.8
.header-wrapper
  position relative
  background #ffebf2
  height 460px
.content-wrapper
  width 1200px
  margin 0 auto
  padding-bottom 100px
.clearfix:after
  display block
  content ''
  clear both
.clearfix
  zoom 1
/* 首屏轮播 */
.first-banner-wrap
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  width 1200px
  max-height 436px
  margin auto
.banner_fist_screen
  width 100%
.content-wrapper
  width 1200px
  margin 0 auto
  padding-bottom 100px
.clearfix:after
  display block
  content ''
  clear both
.clearfix
  zoom 1
/* 首屏轮播 */
.first-banner-wrap
  position absolute
  top 0
  bottom 0
  right 0
  left 0
  width 1200px
  max-height 436px
  margin auto
.banner_fist_screen
  width 100%
/* 喜事列表 */
.happy-event-list
  display flex
  justify-content space-around
  align-items center
  height 180px
  margin 35px auto
  background white
  border-radius 10px
  li
    display flex
    flex-direction column
.happy-event-item
  display flex
  flex-direction column
  justify-content flex-end
  align-items center
.word-of-list
  text-align center
  font-size 22px
  font-family MicrosoftYaHeiLight
  color #333
.pic-happy-event
  max-width 90px
  margin-bottom 10px
.mask-wrap
  position fixed
  top 0
  left 0
  background rgba(0, 0, 0, 0.5)
  width 100%
  height 100%
  z-index 1000
  &.scal
    transform scale(0)
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
  cursor pointer
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
.bottomPager
  position absolute
  bottom 55px
  .pagination
    text-align: center;
    margin-top: -49px;
    margin-bottom: 38px;
  .selected-btn
    cursor pointer
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
</style>
