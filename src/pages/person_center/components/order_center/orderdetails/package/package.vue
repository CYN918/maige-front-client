<template>
    <div class="addreesContiner">
        <p>包裹信息</p>
        <p>
            <span>供货方</span>
            <span>物流信息：{{information}}  {{numBering}}</span>
        </p>
       <div class="addrees" style="padding-left:6px">
					<el-timeline>
							<el-timeline-item
							v-for="(activity, index) in activities"
							:key="index"
							:icon="activity.icon"
							:type="activity.type"
							:color="activity.color"
							:size="activity.size"
							:timestamp="activity.timestamp"
							style="height:100px"
							>
							<span v-if=" index == 0">{{activity.content}}</span>
							<span v-if=" index != 0">{{activity.content}}</span>
							</el-timeline-item>
					</el-timeline>
					</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            num:1, //当前的进度
            information:"京东快递",
            numBering:'20011185421011106',
						 activities: [
							{
								content: "深圳市顺丰公司 已收件 ",
								timestamp: "2019-02-17 06:42:30",
								color: "#4A99FA",
								size: "large"
							},
							{
								content: "已发货",
								timestamp: " 2019-02-16 06:42:30",
								size: "large"
							},		
						],
        }
    }
}
</script>>
<style lang="stylus" scoped>
.addreesContiner
	p
		margin  10px 0
		font-size 14px;
		font-family Microsoft YaHei
		font-weight 400
		color rgba(51,51,51,1)
	.addrees
		margin-top 30px
</style>