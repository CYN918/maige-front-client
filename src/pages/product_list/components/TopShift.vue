<template>
  <div class="top-shift">
    <div class="row">
      <div class="left t1">已选条件：</div>
      <div class="right" ref="conditions">
        <span @click="clearCondition" v-for="(item, index) in conditions" :key="index" :data-lev="item.lev"
              class="selected-item t3 iconfont">
          {{item.text}}
        </span>
        <a @click="clearCondition" class="t2" v-show="conditions.length">清除条件</a>
      </div>
    </div>
    <div class="row">
      <div class="left t1">商品类别：</div>
      <ul class="right">
        <li class="all">
          <label for="classification_all" @click="clearCondition">
            <input type="radio" ref="classification" name="classification" id="classification_all" checked>
            <div class="t2" data-lev="0">全部</div>
          </label>
        </li>
        <li>
          <label :for="`classification_${item.barId}`" v-for="(item, index) in proClassication"
                 :key="item.barId"
                 @click="chooseClassification(item.barId, item.parentId, index, item.children, item.barName, item.catId)"
          >
            <input type="radio" name="classification" :id="`classification_${item.barId}`" :ref="'barId' + item.barId" >
            <span class="t2" data-lev="0">
              {{item.barName}}
            </span>
          </label>
        </li>
      </ul>
    </div>
    <div class="row" v-if="showScene">
      <div class="left t1">送礼场景：</div>
      <ul style="padding: 18px 0;border-bottom: 1px solid #eef4ff;">
        <li v-for="item in scene" :key="item.typeId" style="display: flex; margin-bottom: 14px;height: 32px;" :ref="`rs${item.typeId}`">
          <p class="t1" style="flex-shrink: 0; width: 90px; text-align: center;">{{item.typeName}}</p>
          <div style="width:894px;overflow: hidden; padding-right: 34px;">
            <label class="scene_type" :for="`scene_all${item.typeId}`" @click="clearCondition">
              <input type="radio" :ref="`a${item.typeId}`" :name="`scene${item.typeId}`" :id="`scene_all${item.typeId}`" checked>
              <span class="t2" :data-lev="`a${item.typeId}`">全部</span>
            </label>
            <label class="scene_type" :title="type.sceneName" @click="chooseSendScene(type.sceneId, type.sceneName, `a${item.typeId}`)" :for="type.sceneId" v-for="type in item.children" :key="type.sceneId">
              <input type="radio" :name="`scene${item.typeId}`" :id="type.sceneId" :ref="'sceneId' + type.sceneId">
              <span class="t2" :data-lev="`a${item.typeId}`" :data-sceneid="type.sceneId">{{type.sceneName}}</span>
            </label>
          </div>
          <div v-if="item.children.length > 10" class="more" @click="seeMore(item.typeId)" style="cursor: pointer">
            <p class="t4" style="display: inline-block">更多</p>
            <i class="t4 iconfont" ></i>
          </div>
        </li>
      </ul>
      <!--<ul class="right r-special" ref="rs"  @click="chooseSendScene">
        <li class="all">
          <label for="scene_all" @click="clearCondition">
            <input type="radio" ref="scene" name="scene" id="scene_all" checked>
            <div class="t2" data-lev="3">全部</div>
          </label>
        </li>
        <li class="scene" v-for="item in scene" :key="item.typeId">
          <p class="t1">{{item.typeName}}</p>
          <label :for="type.sceneId" v-for="type in item.children" :key="type.sceneId">
            <input type="radio" name="scene" :id="type.sceneId" :ref="'sceneId' + type.sceneId">
            <span class="t2" data-lev="3" :data-sceneid="type.sceneId">{{type.sceneName}}</span>
          </label>
        </li>
        <li class="more" @click="seeMore" v-if="maxHeight">
          <p class="t4">更多</p>
          <i class="t4 iconfont" :class="[isDrop ? 'icon-xiala1': 'icon-xiala1-copy']"></i>
        </li>
      </ul>-->
    </div>
    <div class="row">
      <div class="left t1">筛选价格：</div>
      <ul class="right" >
        <li class="all">
          <label for="price_all" @click="clearCondition">
            <input type="radio" ref="price" name="price" id="price_all" checked data-lev="6">
            <div class="t2" data-lev="6">全部</div>
          </label>
        </li>
        <li @click="fliterPrice">
          <label for="price_0">
            <input type="radio" name="price" id="price_0" ref="price_0">
            <span class="t2" data-lev="6" data-ref="price_0">150元</span>
          </label>
          <label for="price_1">
            <input type="radio" name="price" id="price_1" ref="price_1">
            <span class="t2" data-lev="6" data-ref="price_1">300元</span>
          </label>
          <label for="price_2">
            <input type="radio" name="price" id="price_2" ref="price_2">
            <span class="t2" data-lev="6" data-ref="price_2">400元</span>
          </label>
          <label for="price_3">
            <input type="radio" name="price" id="price_3" ref="price_3">
            <span class="t2" data-lev="6" data-ref="price_3">500元</span>
          </label>
          <label for="price_4">
            <input type="radio" name="price" id="price_4" ref="price_4">
            <span class="t2" data-lev="6" data-ref="price_4">600元</span>
          </label>
          <label for="price_5">
            <input type="radio" name="price" id="price_5" ref="price_5">
            <span class="t2" data-lev="6" data-ref="price_5">700元</span>
          </label>
          <label for="price_6">
            <input type="radio" name="price" id="price_6" ref="price_6">
            <span class="t2" data-lev="6" data-ref="price_6">800元</span>
          </label>
          <label for="price_7">
            <input type="radio" name="price" id="price_7" ref="price_7">
            <span class="t2" data-lev="6" data-ref="price_7">900元</span>
          </label>
          <label for="price_8">
            <input type="radio" name="price" id="price_8" ref="price_8">
            <span class="t2" data-lev="6" data-ref="price_8">1000元</span>
          </label>
          <input type="number" min="0" v-model="min_price">
          <i >~</i>
          <input type="number" v-model="max_price">
          <input type="button" value="确定" @click="choosePrice">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { parseUrl,addressUrl } from '@/assets/utils/utils'
import { reqSystemConfig, reqGiftScene, getInfoByCatId } from '@/api/index'
import { mapState } from 'vuex'

export default {
  name: 'TopShift',
  computed: {
    ...mapState(['proClassication', 'barId', 'goodsName']),
  },
  data() {
    return {
      showScene: true, // 显示送礼情景
      index: 0, // 当前分类所在父级分类的索引
      isDecend: true, // 价格降序
      height: 0,
      maxHeight: false,
      isDrop: true,
      lev: [],
      conditions: [],
      min_price: 0,
      max_price: 0,
      scene: [],
      goodsType:'',
      url:''
    }
  },
  async created() {
    this.url = addressUrl()
    // 获取场景
    const res = await reqGiftScene()
    if (res.code === 200) {
      this.scene = res.data
    }
  },
  mounted() {
    const query = window.location.search.substring(1)
    const queryObj = parseUrl(query)
    if (queryObj.conditions) {
      this.conditions = JSON.parse(decodeURI(queryObj.conditions))
    }
    this.min_price = queryObj.minPrice || 0
    this.max_price = queryObj.maxPrice || 0
    this.$nextTick(async () => {
      // this.checkIsDrop(queryObj.isDrop || true)
      // this.height = this.$refs.rs.offsetHeight
      /*if (this.height > 32) {
        this.maxHeight = true
      }*/
      if (queryObj.barId) {
        const result = await getInfoByCatId(queryObj.barId || 1)
        if (result.code === 200) {
          this.addCondition(result.data.barName, '0')
        }
      }
      if (queryObj.index) {
        this.index = queryObj.index
      }
      if (queryObj.sceneId) {
        const sceneIds = queryObj.sceneId.split(',')
        setTimeout(() => {
          sceneIds.forEach((item) => {
            if (this.$refs['sceneId' + item]) {
              this.$refs['sceneId' + item][0].checked = true
            }
          })
        },500)
      }
      if (queryObj.ref) {
        this.$refs[queryObj.ref].checked = true
      }
    })
    this.getSystemConfig()
  },
  updated() {
    const query = window.location.search.substring(1)
    const queryObj = parseUrl(query)
    if (queryObj.barId && this.$refs['barId' + queryObj.barId]) {
      this.$refs['barId' + queryObj.barId][0].checked = true
    }
  },
  methods: {
    // 查询系统配置
    async getSystemConfig () {
      const res = await reqSystemConfig('project_goods_category_gift')
      if (res.code === 200) {
        if (res.data.settingInfoList[0].key === 'open') {
          if (res.data.settingInfoList[0].checkValue === 'false') {
            this.showScene = false
          } else {
            this.showScene = true
          }
        } else if (res.data.settingInfoList[0].key === 'close') {
          if (res.data.settingInfoList[0].checkValue === 'true') {
            this.showScene = false
          } else {
            this.showScene = true
          }
        } else {
          this.showScene = true
        }
      }
    },
    // 检测是否为下拉状态 true为不下拉，false为下拉
    checkIsDrop(isDrop) {
      if (isDrop === 'true') {
        this.$refs.rs.style.height = '42px'
        this.isDrop = true
      } else if (isDrop === 'false') {
        this.$refs.rs.style.height = '100%'
        this.isDrop = false
      }
    },
    // 其它排序
    sorting(type) {
      this.changeSearch('rankType', type)
    },
    // 改变search值
    changeSearch(key, val, key2, val2, key3, val3, key4, val4, key5, val5, key6, val6, key7, val7, key8, val8) {
      const query = location.search
      const queryObj = parseUrl(decodeURI(query))
      let queryStr = ''
      queryObj[key] = val
      if (key2) {
        queryObj[key2] = val2
      }
      if (key3) {
        queryObj[key3] = val3
      }
      if (key4) {
        queryObj[key4] = val4
      }
      if (key5) {
        queryObj[key5] = val5
      }
      if (key6) {
        queryObj[key6] = val6
      }
      if (key7) {
        queryObj[key7] = val7
      }
      if (key8) {
        queryObj[key8] = val8
      }
      queryObj.pageIndex = 1
      Object.keys(queryObj).forEach((item) => {
        queryStr += `${item}=${queryObj[item]}&`
      })
      if (queryStr !== '') {
        queryStr = queryStr.substring(0, queryStr.lastIndexOf('&'))
      }
     location.search = queryStr
    },
    // 选择价格区间
    choosePrice() {
      this.$refs.price.checked = true
      const lev = this.$refs.price.dataset.lev
      this.conditions = this.conditions.filter(item => parseInt(item.lev, 10) !== parseInt(lev, 10))
      this.obj.maxPrice = this.max_price
      this.obj.minPrice = this.min_price
      this.obj.goodsName = this.goodsName || ''
      this.obj.barId = this.barId
      // this.updateProList(this.obj)
      this.changeSearch('maxPrice', this.max_price, 'minPrice', this.min_price, 'conditions', JSON.stringify(this.conditions), 'ref', 'price')
    },
    // 筛选价格
    fliterPrice() {
      const e = window.event
      if (e.target.nodeName.toLocaleLowerCase() === 'span') {
        const text = e.target.innerText
        const price = parseInt(text, 10)
        let minPrice = 0
        if (price === 300) {
          minPrice = 150
        } else if (price === 150) {
          minPrice = 0
        } else {
          minPrice = price - 100
        }
        const lev = e.target.dataset.lev
        const ref = e.target.dataset.ref
        this.obj.maxPrice = price
        this.obj.barId = this.barId
        this.obj.goodsName = this.goodsName || ''
        this.addCondition(text, lev)
        // this.updateProList(this.obj)
        this.changeSearch('maxPrice', price, 'minPrice', minPrice, 'conditions', JSON.stringify(this.conditions), 'ref', ref)
      }
    },
    //  选择送礼场景
    chooseSendScene(sceneId, sceneName, _lev) {
      let _sceneId = ''
      const text = sceneName
      const lev = _lev
      this.addCondition(text, lev, sceneId)
      this.conditions.forEach((item) => {
        if (item.sceneId) {
          _sceneId += (item.sceneId + ',')
        }
      })
      _sceneId = _sceneId.substring(0, _sceneId.length - 1)
      this.changeSearch('sceneId', _sceneId, 'conditions', JSON.stringify(this.conditions))
    },
    // 点击选择商品类别
    chooseClassification(barId, parentId, index, children, name, catId) {
      if(this.url){
        this.goodsType = this.url['goodsType']
      }
      const e = window.event
      // 更新当前商品列表展示的barId
      this.$store.commit('handleCatId', barId)
      // 当所选商品类别为最后一层级时不进行页面跳转
      if (children.length === 0) {
        if (e.target.nodeName.toLocaleLowerCase() === 'span') {
          const lev = e.target.dataset.lev
          this.addCondition(name, lev)
          this.updateProList(this.obj)
          this.changeSearch('barId', barId, 'parentId', parentId, 'catId', catId, 'conditions', JSON.stringify(this.conditions))
        }
      } else {
        // 点击商品类别跳转至相应页面
        if(this.goodsType){
          window.location.href = `product_list.html?barId=${barId}&parentId=${parentId}&index=${index}&catId=${catId}&goodsType=${this.goodsType}`
        }else{
          window.location.href = `product_list.html?barId=${barId}&parentId=${parentId}&index=${index}&catId=${catId}`
        }
      }
    },
    // 商品列表更新
    updateProList(obj) {
      this.$store.dispatch('getProList', obj)
    },
    // 将选别条件添加至已选条件
    addCondition(text, lev, sceneId) {
      const obj = {}
      obj.text = text
      obj.lev = lev
      obj.sceneId = sceneId
      this.conditions = this.conditions.filter(item => item.lev !== obj.lev)
      this.conditions.push(obj)
    },
    // 查看更多
    seeMore(typeId) {
      this.isDrop = !this.isDrop
      console.log(this.$refs[`rs${typeId}`]);
      const height = this.$refs[`rs${typeId}`][0].style.height
      this.$refs[`rs${typeId}`][0].style.height = (height !== 'auto' ? 'auto' : '32px')
    },
    // 清除/空筛选条件
    async clearCondition() {
      const e = window.event
      const { parentId = 1 } = this.getUrl()
      const res = await getInfoByCatId(parentId || '')
      let _sceneId = ''
      let catId = ''
      let barId = ''
      let preParentId = ''
      if (res.code === 200) {
        barId = res.data.barId || 1
        catId = res.data.catId || 1
        preParentId = res.data.parentId || 1
      }
      if (e.target.nodeName.toLocaleLowerCase() === 'span' || e.target.nodeName.toLocaleLowerCase() === 'div') {
        const lev = e.target.dataset.lev
        switch (lev) {
          // 清除价格条件
          case '6':
            delete this.obj.maxPrice
            // this.updateProList(this.obj)
            this.conditions = this.conditions.filter(item => parseInt(item.lev, 10) !== parseInt(lev, 10))
            this.$refs.price.checked = true
            this.changeSearch('maxPrice', '', 'conditions', JSON.stringify(this.conditions), 'ref', 'price')
            break
            // 清除商品类别细分条件
          case '0':
            this.$refs.classification.checked = true
            this.conditions = this.conditions.filter(item => parseInt(item.lev, 10) !== parseInt(lev, 10))
            this.changeSearch('barId', barId, 'parentId', preParentId, 'conditions', JSON.stringify(this.conditions), 'catId', catId, 'goodsName', '')
            // this.updateProList(this.obj)
            break
            // 清空送礼场景
          default :
            if (this.$refs[lev]) {
              this.$refs[lev].checked = true
            }
            this.conditions = this.conditions.filter(item => item.lev !== lev, 10)
            this.conditions.forEach((item) => {
              if (item.sceneId) {
                _sceneId += (item.sceneId + ',')
              }
            })
            _sceneId = _sceneId.substring(0, _sceneId.length - 1)
            this.changeSearch('sceneId', _sceneId, 'conditions', JSON.stringify(this.conditions))
            break

            // this.updateProList(this.obj)
        }
      }
      if (e.target.nodeName.toLocaleLowerCase() === 'a') {
        this.conditions = []
        // 回到全部
        this.changeSearch('barId', barId, 'catId', catId, 'parentId', preParentId, 'sceneId', '', 'maxPrice', '', 'conditions', JSON.stringify(this.conditions), 'ref', 'price')
      }
    },
    // 获取URL
    getUrl() {
      const query = window.location.search
      const res = parseUrl(query)
      return res
    },
  },
}
</script>

<style lang="stylus" scoped>
  @import "~styles/mixins.styl"
  @import "~styles/varibles.styl"
  .scene_type
    display inline-block
    width 78px
    height 26px
    text-align center
    ellipsis()
  input[type=radio]
    position absolute
    top -10000px
  input[type=radio]:checked+.t2
    background $btnColor
    border-radius 20px
    color #fff!important
  .top-shift >>> .selected-item
    padding 0 10px
    height 24px
    border 1px solid rgba(38,161,255,1);
    border-radius 12px;
    margin-right 20px
  .top-shift >>> .selected-item:after
    display inline-block
    content: "\e61b"
    margin-left 6px
  .top-shift >>> .t3
    font-size 14px
    color $btnColor
  line-height 24px
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance none !important
    margin 0
  input[type=button]
    width 58px
    height 30px
    border 1px solid rgba(230,230,230,1)
    background #fff
    color #333
    cursor pointer
  input[type=number]
    width 50px
    height 30px
    border 1px solid rgba(230,230,230,1)
    padding 0 7px
    color $grayTxC
  span,a
    display inline-block
    cursor pointer
  .t1
    font-size:12px;
    font-weight:bold;
    color:rgba(102,102,102,1);
    line-height 26px
    padding 0 9px
  .t2
    font-size 14px
    color rgba(102,102,102,1)
    line-height 26px
    margin-right 12px
    padding 0 9px
    cursor pointer
  .t3
    font-size 14px
    color $btnColor
    line-height 24px
  .t4
    font-size 14px
    color #FF7B10
    line-height 24px
  .top-shift
    background: #fff;
    autoMargin()
    margin-bottom 20px
    .row
      display flex
      .left
        flex-shrink 0
        text-align center
        padding 18px 0
        width:95px;
        background: #F1F5FF;
      .r-special
        height 42px
        overflow hidden
      .right
        display flex
        align-items: baseline
        min-height 28px
        padding 18px 24px
        width 100%
        .scene
          width 20%
          span
            min-width: 56px;
            margin-right: 0px;
            margin-bottom: 2px;
            text-align: left;
        .all
          flex-shrink 0
        .selected-item
          padding 0 10px
          height 24px
          border 1px solid rgba(38,161,255,1);
          border-radius 12px;
          margin-right 20px
        .selected-item:after
          display inline-block
          content: "\e61b"
          margin-left 6px
        .more
          display flex
          flex-shrink 0
          cursor pointer
          i
            font-size 18px
      .row:not(:last-of-type) .right
        border-bottom 1px solid #EEF4FF
</style>
