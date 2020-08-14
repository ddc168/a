<template>
    <!-- DRG -->
    <div>
      <list></list>
      <logic></logic>
      <query></query>  
    </div>
</template>

<script>
import list from './DRG/List'
import logic from './DRG/Logic'
import query from './DRG/QUery'
export default {
  name: 'landing-page',
  components: { list, logic, query }
}
</script>