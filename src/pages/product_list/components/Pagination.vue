<template>
  <div class="pagination">
    <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[20, 40 , 60]"
          :page-size="this.pagePerItems"
          layout="total, sizes, prev, pager, next, jumper"
          :total="this.total">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import { parseUrl } from '@/assets/utils/utils'
import { mapState } from 'vuex'

export default {
  name: 'Pagination',
  data() {
    return {
      pagePerItems: 24,
      currentPage4: 1,
    }
  },
  created() {
    this.query = window.location.search.substring(1)
    const queryObj = parseUrl(this.query)
    this.currentPage4 = parseInt(queryObj.pageIndex, 10) || 1
    this.pagePerItems = parseInt(queryObj.pageSize, 10) || 24
  },
  computed: {
    ...mapState(['goodsName', 'catId', 'total']),

    pages() {
      return this.total
    },
  },

  methods: {
    // 改变search值
    changeSearch(key, val, key2, val2) {
      const query = location.search
      const queryObj = parseUrl(decodeURI(query))
      let queryStr = ''
      queryObj[key] = val
      if (key2) {
        queryObj[key2] = val2
      }
      Object.keys(queryObj).forEach((item) => {
        queryStr += `${item}=${queryObj[item]}&`
      })
      if (queryStr !== '') {
        queryStr = queryStr.substring(0, queryStr.lastIndexOf('&'))
      }
      location.search = queryStr
    },
    getProInfo(index) {
      /* const obj = {
        catId: this.catId,
        pageIndex: index,
        pageSize: this.pagePerItems,
        goodsName: this.goodsName,
      } */
      this.changeSearch('pageIndex', index)
      // this.$store.dispatch('getProList', obj)
    },
    handleSizeChange(val) {
      /* const obj = {
        catId: this.catId,
        pageIndex: 0,
        pageSize: val,
        goodsName: this.goodsName,
      } */
      this.changeSearch('pageSize', val, 'pageIndex', 1)
      // this.$store.dispatch('getProList', obj)
    },
    handleCurrentChange(val) {
      this.getProInfo(val)
    },
  },
}
</script>

<style lang="stylus" scoped>
  .pagination
    display flex
    justify-content center
    background #fff
    padding-bottom: 30px;
</style>
