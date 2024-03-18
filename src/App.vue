<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderAdmin from './components/HeaderAdmin.vue'
</script>

<template> 

 <HeaderAdmin />

<main>
    <RouterView />
</main>

</template>

<script lang="ts">
  export default {
    name: 'AdminView',
    components: {
      HeaderAdmin
    }
  }

</script>

<style scoped>

</style>
