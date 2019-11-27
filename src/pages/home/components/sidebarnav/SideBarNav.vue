<template>
  <div class="cate container">
    <ul  class="cate-menu" id="cate-menu" @mouseleave="handleMouseLeave_1">
      <li :class="{'item': true, on: isOn === item.barId }" :style="height"
          v-for="(item, index) in commodityCategoryList" :key="item.barId"
          @mouseenter="handleMouseEnter_1(item.barId)"
      >
        <a class="link"
           :href="`./product_list.html?catId=${item.catId}&parentId=${item.parentId}&index=${index}&barId=${item.barId}`">
          {{item.barName}}
        </a>
      </li>
    </ul>
    <div class="cate-pop" id="cate-pop" v-show="isOn"
           @mouseenter="handleMouseEnter_2" @mouseleave="handleMouseLeave_2">
      <div class="cate-wrap">
        <div v-for="mainitems in commodityCategoryList" v-show="isOn === mainitems.barId"
             class="cate-part"
             :key="mainitems.barId"
        >
          <dl v-for="(items, index) in mainitems.children"
              :key="items.barId" class="part-item"
          >
            <dt class="item-tit">
              <a class="item-tit-lk"
                 :href="`product_list.html?catId=${items.catId}&parentId=${items.parentId}&index=${index}&barId=${items.barId}`"
              >
                {{items.barName}}
              </a>
            </dt>
            <dd  class="item-detail">
              <a class="item-detail-lk"
                 :href="`product_list.html?catId=${item.catId}&parentId=${item.parentId}&index=${index}&barId=${item.barId}`"
                 v-for="(item, index) in items.children" :key="item.barName" >
                {{item.barName}}
              </a>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqProNameList } from '@/api/index'

export default {
  name: 'SideBarNav',
  data() {
    return {
      commodityCategoryList: [],
      isOn: 0,
      isLeave: 0,
    }
  },
  created() {
    this.getGoodsClassifs();
  },
  computed: {
    height() {
      const number = this.commodityCategoryList.length
      let height = 10
      if (number > 10) {
        height = 100 / number
      }
      return `height: ${height}%`
    },
  },
  methods: {
    // 获取商品列表
    async getGoodsClassifs() {
      const res = await reqProNameList(1)
      this.commodityCategoryList = res.data
    },
    handleMouseEnter_1(_id) {
      this.isOn = _id
    },
    handleMouseEnter_2() {
      this.isOn = this.isLeave
    },
    handleMouseLeave_1() {
      this.isLeave = this.isOn
      this.isOn = 0
    },
    handleMouseLeave_2() {
      this.isOn = 0
      this.isLeave = 0
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import "~styles/varibles.styl"
  .cate {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
   .cate .cate-menu {
    position: absolute;
    left: 0;
    top: -493px;
    z-index: 100;
    width: 200px;
    height: 493px;
    background: rgba(21, 5, 30, 0.85);
    box-sizing: border-box;
  }

   .cate .cate-menu .item {
     display flex
     align-items center
     position: relative;
     padding: 0 12px;
     cursor: pointer;
     font-size: 0;
  }

   .cate .cate-menu .item.on {
    background: #fff;
  }

   .cate .cate-menu .item.on .link {
    color: #333;
    font-size: 14px;
  }

   .cate .cate-menu .item.on .link:hover {
    color: $btnColor ;
  }

   .cate .cate-menu .item.on P a {
    color: #333;
  }

   .cate .cate-menu .item.on P a:hover {
    color: $btnColor ;
  }

   .cate .cate-menu .item .link {
    display: inline-block;
    font-size: 14px;
    color: #f1f3f5;
  }

   .cate .cate-menu .item p a {
    font-size: 12px;
    margin-right: 8px;
    color: #f1f3f5;
  }

   .cate .cate-pop {
    position: absolute;
    width: 1000px;
    left: 200px;
    top: -493px;
    z-index: 99;
    height: 493px;
    overflow: auto;
    border-width: 1px;
    border-style: solid;
    background: #fff;
    box-sizing: border-box;
    border-color: #ddd #ddd #ddd transparent;
    -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    -webkit-transition: top .25s ease;
    -o-transition: top .25s ease;
    -moz-transition: top .25s ease;
    transition: top .25s ease;
  }
  .cate .cate-pop .cate-wrap {
    padding-bottom 30px
  }
  .cate .cate-pop .cate-part {
    padding: 16px 16px 0;
  }

   .cate .cate-pop .cate-part .part-item {
    position: relative;
    padding: 5px 0 5px 80px;
  }

   .cate .cate-pop .cate-part .part-item::after {
    position: absolute;
    content: '';
    left: 80px;
    bottom: 0;
    width: 586px;
    border-bottom: 1px dashed #ddd;
  }

   .cate .cate-pop .cate-part .part-item .item-tit {
    overflow: hidden;
    position: absolute;
    left: 0;
    top: 13px;
    width: 70px;
    text-align: right;
    font-weight: 700;
    white-space: nowrap;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
  }

   .cate .cate-pop .cate-part .part-item .item-tit .item-tit-lk {
    font-size: 12px;
    color: #666;
  }

   .cate .cate-pop .cate-part .part-item .item-tit .item-tit-lk:hover {
    color: #00a8ff;
  }

   .cate .cate-pop .cate-part .part-item .item-detail {
    overflow: hidden;
    padding: 5px 0;
  }

   .cate .cate-pop .cate-part .part-item .item-detail .item-detail-lk {
    float: left;
    margin: 3px 0;
    padding: 0 10px;
    height: 16px;
    border-left: 1px solid #e0e0e0;
    line-height: 16px;
    font-size: 12px;
    white-space: nowrap;
    color: #666;
  }

   .cate .cate-pop .cate-part .part-item .item-detail .item-detail-lk:hover {
    color: #00a8ff;
  }

</style>
