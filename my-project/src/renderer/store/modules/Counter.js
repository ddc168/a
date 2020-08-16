// const MongoClient = require('mongodb').MongoClient

// const url = 'mongodb://localhost:27017/meteor'
const state = {
  main: 0,
  News: [],
  NewOne: {},
  user: false
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
  LogIn (state, name) {
    console.log(name)
    if (name[0]) {
      state.user = true
    } else { window.alert('用户不存在') }
  },
  SignIn (state, name) {
    console.log(name)
  },
  change (state) {
    state.user = true
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
  }
}

export default {
  state,
  mutations,
  actions
}
