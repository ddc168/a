// const MongoClient = require('mongodb').MongoClient

// const url = 'mongodb://localhost:27017/meteor'
const state = {
  main: 0,
  News: [],
  NewOne: {},
  user: {type: false, name: '', password: ''}
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  Loading (state, result) {
    state.News = result
    // [
    //   { message: '1', title: '2' },
    //   { message: '3', title: '4' }
    // ]
  },
  NewOne (state, index) {
    state.NewOne = state.News[index]
  },
  LogIn (state, user) {
    console.log(user)
    if (user[0]) {
      state.user = user
      state.user.type = true
    } else { window.alert('用户不存在') }
    console.log(state.user)
  },
  SignIn (state, name) {
    console.log(name)
  },
  change (state) {
    state.user.type = true
  },
  UserOut (state) {
    state.user.type = false
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
    commit('Loading')
    commit('NewOne')
    commit('LogIn')
    commit('SignIn')
    commit('UserOut')
  }
}

export default {
  state,
  mutations,
  actions
}
