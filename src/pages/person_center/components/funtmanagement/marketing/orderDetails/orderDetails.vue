<template>
    <div>
      <div class="searchContainer">
        <div class="block">
            <!-- 日期 -->
            <span class="demonstration">下单时间: </span>
           <el-date-picker
							v-model="value"
							type="daterange"
							start-placeholder="时间开始"
							end-placeholder="时间结束"
							default-value="2010-10-01">
						</el-date-picker>
        </div>
        <!-- 模糊搜索 -->
        <div>
						<span class="demonstration demonstration_L">关键字: </span>
            <el-autocomplete
						style="width:160px"
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
            ></el-autocomplete>
        </div>
				<el-button type="primary" @click="search"  class="search">搜索</el-button>
      </div>
			<Detail/>
    </div>
</template>
<script>
import Detail from './details/detail'
export default {
		name:'OrderDetails',
		components:{
			Detail
		},
    data(){
        return{
						value: '',    
            //模糊搜索
            restaurants: [],
            state: '',   //搜索的内容
            timeout:  null
        }
		},
		
        methods: {
					//模拟数据
					loadAll() {
							return [
								{ "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
								{ "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
								{ "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
								{ "value": "泷千家(天山西路店)", "address": "天山西路438号" },
								{ "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
								{ "value": "贡茶", "address": "上海市长宁区金钟路633号" },
								{ "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
								{ "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
								{ "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
								{ "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
								{ "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
							]
					},
					//返回输入建议的方法 当输入数据成功时 通过回调来返回他
					 querySearchAsync(queryString, cb) {
						var restaurants = this.restaurants;
						var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

						//模拟请求时加载的状态
						clearTimeout(this.timeout);
						this.timeout = setTimeout(() => {
							cb(results);
						}, 1000 * Math.random());
						},
						createStateFilter(queryString) {
							return (state) => {
								return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
							};
						},
						//点击输入框时触发
						handleSelect(item) {
							console.log(item);
					},

						// 发送请求
						search(){

						}
		},
		 mounted() {
      this.restaurants = this.loadAll();
    }
}
</script>
<style lang="stylus" scoped>


/deep/.searchContainer
	margin-bottom 20px
	display flex
	.demonstration
		margin-right 12px
	.demonstration_L
		margin-left 39px
	.el-input__inner,.el-button--primary
		height :32px
		.el-range-separator,.el-range__icon
			margin-top -5px
	.el-button--primary
		position relative
		margin-left 25px
		width 55px
		span 
			position absolute
			left 50%
			top 50%
			transform translate(-50%,-50%)
</style>