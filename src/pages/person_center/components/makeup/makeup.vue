<template>
	<div class="makeupContener">
			<header class="makeupHeader">
				<span class="">设置</span>
			</header>
			 <div  class="makeup_item" style="padding-bottom: 20px">
				 <ul class="makeup_list unselectable">
					 <li :class="{'on':num===index}" v-for="(item,index) in makeupImg" :key="index" @click="changeView(makeupArr[index],index)">
						 <div>
							 <img :src=item.img alt="" class="imgs">
							 <span class="title_span" :style={color:item.color}>{{item.title}}</span>
						 </div>
					 </li>
				 </ul>
				 <component :is="currentView"></component>
			 </div>
	</div>
</template>
<script>
import accountSecurity from './accountSecurity/accountSecurity'
import harvestAddress from './harvestAddress/harvestAddress'
import personalnformation from './personalnformation/personalnformation'

export default {
  components: {
    accountSecurity,
    harvestAddress,
    personalnformation,
  },
  data() {
    return {
      currentView: 'personalnformation',
      num: 0,
      makeupArr: ['personalnformation', 'harvestAddress', 'accountSecurity'],

      makeupImg: [
        {
          img: require('@/assets/images/person_center/image/图标-08@2x.png'),
          title: '个人信息',
          color: 'rgba(255, 87, 75, 1)',
        },
        {
          img: require('@/assets/images/person_center/image/图标-05@2x.png'),
          title: '账户安全',
          color: 'rgba(255, 130, 129, 1)',
        },
        {
          img: require('@/assets/images/person_center/image/图标-06@2x.png'),
          title: '收货地址',
          color: 'rgba(137, 146, 252, 1)',
        },
      ],
    }
  },
  methods: {
    changeView(componen, index) {
      this.currentView = componen
      this.num = index
    },
  },
}
</script>
<style lang="stylus" scoped>
  .makeupContener
    margin-left 20px
    .makeupHeader
      height 54px
      line-height 54px
      background rgba(255,255,255,1)
      border 1px solid rgba(215,224,241,1)
      span
        border-left 4px solid #4A99FA
        padding-left 21px
        font-weight 400
        font-family Microsoft YaHei
        font-size:18px;
        color:rgba(51,51,51,1);
    .makeup_item
        margin-top 19px
        .makeup_list
          width 1100px
          overflow hidden
          .on
            height 118px
          li
            align-items center
            display flex
            justify-content center
            background rgba(255,255,255,1)
            width 200px
            height 100px
            margin-right 30px
            float left
            cursor pointer
            span
              display inline-block
              vertical-align middle
              width 66px
              font-size 16px
              margin-left 3px
              vertical-align middle
            img
              display inline-block
              vertical-align middle
              width 35px
              height 50px
  .title_span{
    font-size:20px;
  }
</style>
