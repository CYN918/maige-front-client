import { getBirthday, getaddBlessing } from '@/api/index'

export default {
  // 获取生日用户信息用户信息
  async getPeosonal({ commit }, activityId) {
    const res = await getBirthday(activityId)
    if (res.code === 200) {
      const result = res.data
      commit('handlebirthdayArea', result)
    }
  },
  //获取所有的祝福
  async getaddBlessings({ commit, state },happyEventType) {
    const userId = JSON.parse(sessionStorage.getItem('userName')).userId
    let {activityId } = state
    const obj = {
      activityId: activityId,
      userId: userId,
      happyEventType:happyEventType
    }
    const res = await getaddBlessing(obj)
    if (res.code === 200) {
      const result = res.data
      commit('handeleaddBlessing', result)
    }
  },
}
