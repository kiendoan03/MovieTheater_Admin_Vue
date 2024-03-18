<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>

<template>
  <main>
    <h1>Dashboard</h1>
    <div v-if="manager">
      <h2>Welcome to the admin dashboard</h2>
      <p>Here you can manage the staff, actors, and customers</p>
    </div>
    <div v-if="!manager">
      <h2 class="text-center text-danger my-5">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        You are not authorized to access this page
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
  export default {
    name: 'HomeView',
    data() {
      return {
        manager: false,
      }
    },
    mounted() {
      this.manager = localStorage.getItem('role') == 'Manager' && localStorage.getItem('token') ;
      console.log(this.manager);
    },
  }
</script>
