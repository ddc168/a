<template>
  <!-- 动态内容   -->
  <div>
    {{News.desc}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      News: this.$store.state.Counter.NewOne
    }
  }
}
</script>