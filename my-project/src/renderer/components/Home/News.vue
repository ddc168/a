<template>
    <!-- 动态 -->
  <div>
    <ul id="example-1" >
      <li  v-for="(a, index) in News" @click="open('PageNews')" :key="index" >
        {{ a.id }} - {{ a.title }}
      </li>
    </ul>
  </div>
</template>

<script>
// import { getNews } from '../../mongo'
export default {
  data () {
    return {
      News: this.$store.state.Counter.News
    }
  },
  methods: {
    open (link) {
      this.$router.push(link)
      // getNews(this)
    }
  }
}
</script>