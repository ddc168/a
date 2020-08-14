<template>
    <!-- 用户 -->
    <div>
     <tab></tab>
     <tables></tables>
     <user></user>   
    </div>
</template>

<script>
import tab from './User/Tab'
import tables from './User/Table'
import user from './User/User'
export default {
  name: 'landing-page',
  components: { tab, tables, user }
}
</script>