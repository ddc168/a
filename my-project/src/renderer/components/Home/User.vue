<template>
  <!-- 用户 -->
  <div>
    <form role="form">
      <div class="form-group">
        <label for="name">名称</label>
        <input type="text" class="form-control" v-model='name' placeholder="请输入名称">
      </div>
      <div class="form-group">
        <label for="name">密码</label>
        <input type="text" class="form-control" v-model="password" placeholder="请输入密码">
      </div>
    </form>
    <button @click="open('LogIn')">
      登录
    </button>
    <button @click="open('SignIn')">
      注册
    </button>
  </div>
</template>

<script>
import {LogIn, SignIn} from '../../mongo'
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    open (index) {
      if (index === 'LogIn') {
        LogIn(this, {name: this.name, password: this.password})
      } else {
        SignIn(this, {name: this.name, password: this.password})
      }
    }
  }
}
</script>