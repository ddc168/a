// const MongoClient = require('mongodb').MongoClient
// const url = 'mongodb://localhost:27017/meteor'
const state = {
  main: 0,
  News: [],
  NewOne: {}
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
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
    commit('Loading')
    commit('NewOne')
  }
}

export default {
  state,
  mutations,
  actions
}
