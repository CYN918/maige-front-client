import {activityHome} from '@/api/index'
export default {
    async getProList({ commit }) {
        const res = await activityHome()
        if (res.code === 200) {
            commit('handeleActivity',res.data)
         }
        },
}
