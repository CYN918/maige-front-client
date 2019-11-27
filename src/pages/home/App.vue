<template>
    <div>
      <div v-for="(item,index) in comdata" :key="index" class="componetContainer">
        <component :is="item[0].componentCode"  :activity='activity' :componentStatus ='item'/>
      </div>
       <bigFixRightBar :nums="num"></bigFixRightBar>
      <!-- <top-nav></top-nav>
      <Header></Header>
      <Banner></Banner>
      <Content></Content>
      <Footer></Footer>
      -->
      <!-- <button @click="delebnnar">倒叙</button> -->
    </div>
</template>

<script>
import { reqShoppingCartNum , findindexbyproject , getprojectid,activityHome } from '@/api/index'
import big_top_nav from '../common/TopNav2' //顶部
import big_header from '../common/Header' // 搜索
import big_banner from './components/Banner' //轮播
// import big_content from './components/Content'  //内容
import big_footer from '../common/Footer' //底部
import top_categories from './components/content/Content01'   //f分类
import show_spike from './components/content/Content02'   //限时
import weekly_selection from './components/content/Content03'   //周周
import holiday_area from './components/content/Content03'   //周周
import birthday_area from './components/content/Content03'   //周周
import  special_area from './components/content/Content04'   //优惠
import discount_area from './components/content/Content05'   //折扣
import good_goods_snapped_up from './components/content/Content06'   // 好货
import fight_group from './components/content/Content06'   // 拼团
import bigFixRightBar from '../common/FixRightBar' //侧边

export default {
  name: 'home',
  components: {
    weekly_selection,
    holiday_area,
    birthday_area,
    big_top_nav,
    big_header,
    big_banner,
    show_spike,
    // big_content,
    big_footer,
    bigFixRightBar,
    top_categories,
    special_area,
    fight_group,
    discount_area,
    good_goods_snapped_up
  },
  data() {
    return {
      activity:[],
      num: 0,
      comdata:[
        // {componentCode:big_top_nav},
        // {componentCode:big_header},
        // {componentCode:big_banner},
        // {componentCode:big_content},
        // {componentCode:big_footer},
        // {componentCode:bigFixRightBar},
      ]
    }
  },
  methods:{
    async getActivity(){
        const result = await activityHome()
          if (result.code === 200) {
            this.activity = result.data
            if(result.data==[]||result.data.length<=0){
                return false
              }
          }
      },
    async findindexbyproject(val){
      const res = await findindexbyproject(val)
      if(res.code == 200){
        let  data = res.data.components
           let newArr = [];
                data.forEach((value, index, array) => {
                    if(newArr.length==0){
                        newArr.push([value]);
                    } else if(value.sortOrder==newArr[newArr.length-1][0].sortOrder){
                        newArr[newArr.length-1].push(value);
                    } else {
                        newArr.push([value]);
                    }
                })
               this.$set(this, "comdata", newArr);
          data.forEach(item=>{
            if(item.componentCode=='big_header'){
              window.localStorage.setItem('headerSearch',JSON.stringify(item))
            }else if(item.componentCode=='big_top_nav'){
              window.localStorage.setItem('headerNav',JSON.stringify(item))
            }else if(item.componentCode=='big_footer'){
              window.localStorage.setItem('bigFooter',JSON.stringify(item))
            }
          })
      }
      this.$forceUpdate()
    },
    async getprojectid(){
      const projectId = '220988752988737536'
       this.findindexbyproject(projectId)
    },

  },
  watch: {
    num(newVal) {
      if (newVal > 99) {
        this.num = '99+'
      }
    },
  },

  mounted() {
    this.getprojectid()
    this.$bus.$on('getShoppingCartNum', async () => {
      const res = await reqShoppingCartNum()
      if (res.code === 200) {
        this.num = res.data
      }
    })
  },
  created(){
     this.getActivity()
  }
}
</script>

<style lang='stylus' scoped>
.componetContainer
  margin-top 25px
  &:nth-child(3)
    margin-top 0
 &:nth-child(1)
    margin-top 0
</style>
