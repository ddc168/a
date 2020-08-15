<template>
    <!-- 首页 -->
    <div class="row">
        <!-- 动态 -->
        <div class="col-10"><news></news></div>
        <div class="col-2">
          <!-- 用户 -->
          <user></user>
         <!-- 应用程序 -->
          <app></app>

        </div>
        
    </div>
</template>
<script>
  import news from './Home/News'
import app from './Home/App'
import user from './Home/User'

  export default {
    name: 'landing-page',
    components: { news, app, user },
    methods: {
      // open (link) {
      //   this.$electron.shell.openExternal(link)
      // },
      a (link) {
        console.log(this.$store.state.Counter.main)
        this.$store.commit('INCREMENT_MAIN_COUNTER')
      }
    }
  }
</script>