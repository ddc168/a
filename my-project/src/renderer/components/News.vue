<template>
  <!-- 动态内容   -->
  <div>
    <ul id="example-1">
      <li v-for="(a, index) in News" :key="index">
        {{ index+1 }} - {{ a.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      News: this.$store.state.Counter.News
    }
  }
}
</script>