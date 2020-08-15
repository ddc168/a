<template>
    <!-- 动态 -->
  <div>
    <ul id="example-1" >
      <li  v-for="(a, index) in News" :key="index" @click="open(index)">
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
    open (index) {
      this.$router.push('PageNews')
      this.$store.commit('NewOne', index)
      // getNews(this)
    }
  }
}
</script>