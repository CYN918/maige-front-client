export default {
  // 获取生日的
  handlebirthdayArea(state, birthdayList) {
    state.birthdayList = birthdayList
  },
  // 获取生日活动的id
  handleActiveId(state, activityId) {
    state.activityId = activityId
  },
  // 当前评论者的userId
  handleUserId(state, userId) {
    state.userId = userId
  },
  // 当前生日人的信息
  handlepersonal(state, userName) {
    state.userName = userName
    window.sessionStorage.setItem('userName', JSON.stringify(userName))
  },
  handeleaddBlessing(state, addBlessing) {
    state.addBlessing = addBlessing
  },
  // 赠送礼物
  handeleGift(state, gift) {
    state.gift = gift
  },
  // 当前用户的信息
  handelegifterUserId(state, gifterUserId) {
    state.gifterUserId = gifterUserId
  },

// 当前结婚人的信息
marryPersonal(state, userName) {
  state.marryPersonal = userName
},

// 当前结婚人的id
marryUserId(state, userId) {
  state.marryUserId = userId
},
// 升职人的信息
promotionPersonal(state, userName) {
  state.promotionPersonal = userName
},

// 升职人的id
promotionUserId(state, userId) {
  state.promotionUserId = userId
},
// 生子的信息
childPersonal(state, userName) {
  state.childPersonal = userName
},

// 生子的id
childUserId(state, userId) {
  state.childUserId = userId
},

//入职的信息
entryPersonal(state, userName) {
  state.entryPersonal = userName
},
// 入职的id
entryUserId(state, userId) {
  state.entryUserId = userId
},
}