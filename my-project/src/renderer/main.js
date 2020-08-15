import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
console.log($)
// var MongoClient = require('mongodb').MongoClient
// var url = 'mongodb://localhost:27017/runoob'
// MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err
//   console.log("数据库已创建!")
//   db.close()
// })
