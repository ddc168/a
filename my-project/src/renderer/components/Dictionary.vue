<template>
<!-- 字典 -->
<div class="container-fiuled " style="width:2800px">
<div class="row ">
<div class="col=2"><version></version> </div>      
<div class="col=10">
  <adrg></adrg>
  <drg></drg>
  <mdc></mdc>
  <detail></detail>
</div>
</div>
</div>
</template>

<script>
import adrg from './Dictionary/Adrg'
import drg from './Dictionary/drg'
import mdc from './Dictionary/Mdc'
import detail from './Dictionary/Detail'
import version from './Dictionary/Version'
export default {
  name: 'landing-page',
  components: { adrg, drg, mdc, detail, version }
}
</script>