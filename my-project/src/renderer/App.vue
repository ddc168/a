<template>
  <div id="app"  style="width:2800px">
    <Landing></Landing>
    <router-view></router-view>
  </div>
</template>

<script>
import Landing from './components/Navigation'
import { getNews } from './mongo'
export default {
  name: 'my-project',
  components: { Landing },
  created: function () {
    getNews(this)
  }
}
</script>

<style>
  /* CSS */
</style>
