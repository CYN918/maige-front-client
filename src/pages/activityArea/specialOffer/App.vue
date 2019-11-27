<template>
    <div>
			<Header></Header>
        <div class="contentWrap">
					<div class="content">
					<header>
						<img src="@/assets/images/office_Area/img/tehui.png" alt="">
						<p>把最优惠的活动带给你</p>
					</header>
					<Fetured></Fetured>
        </div>
				</div>
      <Footer></Footer>
    </div>
</template>

<script>
// 特惠专区
import Header from '../../common/Header'
import Fetured from './compontens/specialOffer'
import Footer from '../../common/Footer'
export default {
	name: 'App',
  components: {
    Header,
    Footer,
    Fetured,
	},
}
</script>

<style lang="stylus" scoped>
.contentWrap
	width 100%
	background RGBA(244, 244, 244, 1)
	.content
		background RGBA(244, 244, 244, 1)
		width 1200px
		overflow hidden
		margin 0 auto
		header
			width 254px
			margin auto
			margin-top 31px
			img 
				width 100%
				height 51px
			p
				font-size 14px
				font-family Microsoft YaHei
				font-weight 400
				color rgba(102, 102, 102, 1)
				text-align center
				margin-top 19px
				letter-spacing 11px
		.bigImg
			margin-top 53px
</style>
