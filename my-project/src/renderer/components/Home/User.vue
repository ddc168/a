<template>
  <!-- 用户 -->
  <div>
    <div v-if="!user.type">
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
    <div v-if="user.type">
      <div class='row'>用户名：{{user.name}}</div>
      <div class='row'>密码：{{user.password}}</div>
    </div> 
    <button @click='UserOut()'>
      退出
    </button>
  </div>
</template>

<script>
import {LogIn, SignIn} from '../../mongo'
export default {
  data () {
    return {
      name: '',
      password: '',
      user: this.$store.state.Counter.user
    }
  },
  methods: {
    open (index) {
      if (index === 'LogIn') {
        LogIn(this, {name: this.name, password: this.password})
        // this.user.type = true
      } else {
        SignIn(this, {name: this.name, password: this.password})
      }
    },
    UserOut () {
      this.$store.commit('UserOut')
    }
  }
}
</script>