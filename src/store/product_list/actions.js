import { reqProList, reqProNameList } from '@/api/index'
import { message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue';

const v = new Vue()

export default {
  // 获取商品列表
  async getProList({ commit }, obj) {
    const res = await reqProList(obj)
    if (res.message.substring(0, 1) === '0') {
      Vue.use(message)
      v.$message(res.message.substring(2))
    }
    if (res.code === 200) {
      commit('handleProList', res.data.pageList)
      commit('handleTotal', res.data.page.total)
      commit('handleLoading')
    }
  },

  // 获取商品分类
  async getProClassication({ commit }, obj) {
    const res = await reqProNameList(obj.barId)
    if (res.data.length === 0) {
      const res2 = await reqProNameList(obj.parentId)
      commit('proClassication', res2.data)
    } else {
      commit('proClassication', res.data)
    }
  },
}
