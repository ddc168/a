<template>
    <!-- 版本列表 -->
  <div>
    <table>
      <th>版本列表</th>
      <tr v-for="(version, index) in version" :key="index" @click="open(version)">{{ version }}</tr>
    </table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        version: 1
      }
    },
    methods: {
      open (version) {
        console.log(version)
      }
    }
  }
</script>