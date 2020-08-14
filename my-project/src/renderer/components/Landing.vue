<template>
  <div id="wrapper">
  </div>
</template>

<script>
  import Landing from './Navigation'

  export default {
    name: 'landing-page',
    components: { Landing },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      a (link) {
        console.log(this.$store.state.Counter.main)
        this.$store.commit('INCREMENT_MAIN_COUNTER')
      }
    }
  }
</script>