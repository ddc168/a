<template>
  <div id="app"  style="width:2800px">
    <Landing></Landing>
    <router-view></router-view>
  </div>
</template>

<script>
import Landing from './components/Navigation'
export default {
  name: 'my-project',
  components: { Landing }
}
</script>

<style>
  /* CSS */
</style>
