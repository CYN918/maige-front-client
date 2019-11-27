<template>
  <div class="wrapper" v-show="componentStatus&&componentStatus[0].componentStatus==0">
    <div class="header">
      <div class="logo">
        <a href="index.html">
          <img :src="content.logoImg||logoImg" alt="" style="width: 120px;height: 40px">
          <div class="border-line"></div>
          <span class="title">{{title}}</span>
        </a>
      </div>
      <div class="search" ref="search">
        <div class="search-wrap">
          <input @input="handleInput" v-model="text" @keyup.enter="handleConfirm"
                 class="search-input" type="text"
                 placeholder="请输入您想搜索的商品名称">
          <button class="search-btn" @click="handleConfirm">
            <i class="iconfont icon-ICon-"></i>
            搜索
          </button>
        </div>
        <transition name="search">
          <ul class="search_result" v-show="result.length">
            <li v-for="(item, index) in result" :key="index" @click="linkTo(item.goodsName)">
              <a class="item">{{item.goodsName}}</a>
            </li>
            <li class="close"><span @click="closeSearchWrap">关闭</span></li>
          </ul>
        </transition>
        <div class="tips-word-wrap" @click="handleTipsWord">
            <span class="tips-word" v-for="(item,index) in tableData" :key="index">
              {{item.categoryName}}
            </span>
        </div>
      </div>
      <div class="hotline">
        <i class="iconfont icon-fuwurexian"></i>
        <div class="hotline-wrap">
          <p class="hotline-word">服务热线：</p>
          <p class="hotline-number">{{content.telephone||'400-108-8710'}}</p>
        </div>
      </div>
    </div>
    <div style="width: 1200px; margin: 0 auto;">
      <ul class="list clearfix">
        <li class="_item"><a href="index.html" style="color: #fff">全部分类</a></li>
        <li class="_item">京东</li>
        <li class="_item">苏宁易购</li>
        <li class="_item">网易严选</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { parseUrl } from '@/assets/utils/utils';
  import { reqProList } from '@/api/index';

  export default {
    name: 'Header',
    props:['componentStatus'],
    data() {
      return {
        text: '',
        timer: null,
        result: [],
        title:'',
        logoImg:require('@/assets/images/logo_fuyuanai.png'),
        content:'',
        tableData:''
      };
    },
    mounted() {
      this.title = this.componentStatus[0].componentContents[0].title||''
      this.content = JSON.parse(this.componentStatus[0].componentContents[0].content||'')
      this.tableData = this.content.tableData.sort(this.compare('sort'))
      let query = decodeURI(window.location.search);
      query = parseUrl(query);
      this.text = query.goodsName || '';
    },
    watch: {
      result(newVal) {
        if (newVal.length > 0) {
          window.addEventListener('mouseover', this.hideSearchWrap);
        } else {
          window.removeEventListener('mouseover', this.hideSearchWrap);
        }
      },
    },
    methods: {
    //排序
      compare(property){
          return function(a,b){
              let value1 = a[property];
              let value2 = b[property];
              return value1 - value2;
          }
        },

      hideSearchWrap() {
        const e = window.event;
        if (!this.$refs.search.contains(e.target)) {
          this.result = [];
        }
      },
      // 搜索跳转
      async linkTo(goodsName) {
        this.text = goodsName;
        const obj = {
          goodsName,
          catId: 1,
        };
        const res = await reqProList(obj);
        if (res.code === 200) {
          this.result = res.data.pageList.slice(0, 9);
        }
        window.location.href = 'product_list.html?goodsName=' + goodsName;
      },
      closeSearchWrap() {
        this.result = [];
      },
      async getProList() {
        const obj = {
          goodsName: this.text,
          catId: 1,
        };
        const res = await reqProList(obj);
        if (res.code === 200) {
          this.result = res.data.pageList.slice(0, 9);
        }
      },
      // 输入内容提示
      handleInput() {
        this.debounce(this.getProList, 800)();
      },
      // 函数防抖
      debounce(fn, delay) {
        return () => {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            fn.apply(this);
          }, delay);
        };
      },
      // 点击提示文字搜索
      handleTipsWord() {
        const e = window.event;
        if (e.target.nodeName.toLocaleLowerCase() === 'span') {
          this.text = e.target.innerText;
          window.location.href = 'product_list.html?goodsName=' + this.text;
        }
      },
      // 确定搜索内容
      handleConfirm() {
        this.text = this.text.replace(/^\s*|\s*$/g, '');
        if (!this.text) {
          window.location.href = 'product_list.html';
        }
        window.location.href = 'product_list.html?goodsName=' + this.text;
      },
    },
  };
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  @import "~styles/varibles.styl"
  ._item
    float left
    height 40px
    line-height 40px
    font-size 16px
    cursor pointer
  ._item:not(:first-of-type)
    margin-left 50px
  ._item:first-of-type
    background url("../../assets/images/product_list/quanbu@2x.png") no-repeat
    background-size: 100%;
    font-weight: bold;
    color: #fff;
    width: 200px;
    padding: 0;
    text-align: center;
  .wrapper
    border-bottom 4px solid $btnColor
  .search-enter-active, .search-leave-active
    transition opacity 0.3s ease
  .search-enter, .search-leave-to
    opacity 0
  .header
    display flex
    justify-content space-between
    width 1200px
    padding 28px calc((100% - 1200px) / 2) 10px
    background: #fff;
    margin 0 auto
    .logo
      a
        height 80%
        display flex
        align-items center

        .border-line
          height 40px
          width 1px
          background #DBDBDB
          margin 0 16px

    .search
      position relative

      .search-wrap
        margin-bottom 6px

        .search-input
          width 466px
          height 36px
          background #fff
          border 3px solid rgba(255, 78, 124, 1)
          padding 6px
          box-sizing border-box
          color #666

        .search-btn
          position relative
          left -5px
          width 84px;
          height 36px
          line-height 36px
          background #FF4E7C
          color #fff
          font-size 14px

          .icon-ICon-
            margin-right 6px

        .search-btn:hover
          cursor: pointer

        .search-btn:active
          border 1px solid #aa4E7C

      .tips-word
        font-size 12px;
        font-weight 400;
        color rgba(153, 153, 153, 1);
        line-height 35px;
        margin-right 24px
        cursor pointer

      .search_result
        overflow: hidden;
        position: absolute;
        top: 36px;
        left: 0;
        width: 462px;
        max-height 320px
        border: 1px solid #ccc;
        background: #fff;
        z-index 999

        li
          height 10%

        .item
          display block
          padding 4px 6px
          color #666

        .item:hover
          background rgb(255, 223, 198)

        .close
          width calc(100% - 12px)
          padding 0 6px
          line-height 22px
          border-top 1px solid #efefef
          background white
          color #666
          text-align right

          span
            cursor pointer

    .hotline
      display flex
      align-items center

      .icon-fuwurexian
        color #333
        font-size 22px
        margin-right 6px

      .hotline-word
        color #333
        font-size 13px
        margin-bottom 6px

      .hotline-number
        color #FF4E7C
        font-size 15px
        font-weight bold
        font-style italic
.title
  font-family: MicrosoftYaHei;
  font-weight: 1000;
  font-size: 28px;
  color: #ff4e7c;
</style>
