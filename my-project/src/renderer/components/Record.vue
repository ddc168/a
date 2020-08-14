<template>
    <!-- 病案 -->
    <div>
     <classify></classify>
     <date></date>
     <detail></detail>
     <name></name>
     <other></other>
     <recordlist></recordlist>   
    </div>
</template>

<script>
import classify from './Record/Classify'
import date from './Record/Date'
import detail from './Record/Detail'
import name from './Record/Name'
import other from './Record/Other'
import recordlist from './Record/Recordlist'
export default {
  name: 'landing-page',
  components: { classify, date, detail, name, other, recordlist }
}
</script>