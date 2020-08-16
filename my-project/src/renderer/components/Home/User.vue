<template>
  <!-- 用户 -->
  <div>
    <form role="form">
      <div class="form-group">
        <label for="name">名称</label>
        <input type="text" class="form-control" v-model="name" placeholder="请输入名称">
      </div>
      <div class="form-group">
        <label for="name">密码</label>
        <input type="text" class="form-control" v-model="password" placeholder="请输入密码">
      </div>
      <button @click="LogIn">
        登录
      </button>
      <button @click="SignIn">
        注册
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data(){
     return {
      name: '',
      password: ''
    }
  },
  methods: {
    open (index) {
      this.$store.commit('LogIn', {name, password})
      this.$store.commit('SignIn', {name, password})
      // getNews(this)
    }
  }
}
</script>