<template>
    <div class="restPassword">
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="修改密码" name="first">
					<setPassword/>
				</el-tab-pane>
        <el-tab-pane label="修改手机号" name="second">
					<setPhone/>
				</el-tab-pane>
    </el-tabs>
    </div>
</template>
<script>
import setPassword from './setPassword/setPassword'
import setPhone from './setPhone/setPhone'

export default {
  components: {
    setPassword,
    setPhone,
  },
  data() {
    return {
      activeName: 'first',
    };
  },
  methods: {
    handleClick(tab, event) {

    },
  },
}
</script>
<style  lang="stylus" scoped>
  /deep/	.el-tabs__nav
            transform:translateX(55px) !important
  /deep/	.el-steps--horizontal
            width: 820px;
  /deep/	.el-step__title
            font-size 14px
  .restPassword
    background white
</style>
