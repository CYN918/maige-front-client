<template>
  <div class="pagination">
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="this.items">
      </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    items: Number,
    pagePerItems: Number,
  },
  data() {
    return {
      number: 1,
      page_index: 0,
      currentPage4: 1,
    }
  },

  methods: {

    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.$emit('index', val)
    },
  },
}
</script>

<style lang="stylus" scoped>
    .pagination
      display flex
      justify-content center

</style>
