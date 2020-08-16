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
    <button @click="open()">
      登录
    </button>
    <button @click="open()">
      注册
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    open (index) {
      this.$store.commit('LogIn', this.name, this.password)
      this.$store.commit('SignIn', this.name, this.password)
      // getNews(this)
    }
  }
}
</script>