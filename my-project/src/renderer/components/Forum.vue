<template>
    <!-- 论坛 -->
    <div>
      <tab></tab>
      <tables></tables>
      <posting></posting>  
    </div>
</template>

<script>
import tab from './Forum/Tab'
import tables from './Forum/Table'
import posting from './Forum/Posting'
export default {
  name: 'landing-page',
  components: { posting, tables, tab }
}
</script>