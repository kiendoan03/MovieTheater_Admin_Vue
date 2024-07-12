<template>
  <main>
    <h1>Dashboard</h1>

    <!-- Tab buttons -->
    <div v-if="manager" class="tab-buttons">
      <button @click="currentTab = 'general'" :class="{ 'active': currentTab === 'general' }">General</button>
      <button @click="currentTab = 'revenue'" :class="{ 'active': currentTab === 'revenue' }">Revenue Statistics</button>
      <div class="active-tab-indicator" :style="{ left: activeTabIndicatorPosition }"></div>
    </div>

    <!-- Revenue Statistics tab -->
    <div v-if="manager && currentTab === 'revenue'" class="tab-content">
      <div>
        <PayOSChart />
      </div>
    </div>

    <!-- General Statistics tab -->
    <div v-if="manager && currentTab === 'general'" class="tab-content">
      <GeneralStatistics />
    </div>

    <!-- Unauthorized message -->
    <div v-if="!manager" class="unauthorized-message">
      <h2 class="text-center text-danger my-5">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        You are not authorized to access this page
      </h2>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import PayOSChart from '@/components/PayOSChart.vue';
import GeneralStatistics from '@/components/GeneralStatistics.vue';

library.add(fas);

export default defineComponent({
  name: 'HomeView',
  components: {
    FontAwesomeIcon,
    PayOSChart,
    GeneralStatistics,
  },
  data() {
    return {
      manager: localStorage.getItem('role') === 'Manager' && localStorage.getItem('token'),
      currentTab: 'general', // Default tab
    };
  },
  computed: {
    activeTabIndicatorPosition() {
      if (this.currentTab === 'revenue') {
        return '50%'; 
      } else {
        return '0%'; 
      }
    }
  }
});
</script>

<style scoped>
/* Dashboard layout */
main {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Arial', sans-serif;
}

/* Tab buttons */
.tab-buttons {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 20px;
  width: 100%; /* Ensure buttons take full width */
}

.tab-button {
  width: calc(50% - 10px); /* Adjust width based on your design */
}

.tab-buttons button {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  background-color: #000000;
  border: none;
  cursor: pointer;
  color: white;
  transition: background-color 0.3s;
}

.tab-buttons button.active {
  font-weight: bold;
  color: #ff2727;
  font-size: large;
  background-color: #000000;
}

.active-tab-indicator {
  position: absolute;
  bottom: 0;
  height: 3px; /* Height of the indicator */
  background-color: #ff2727; /* Color of the indicator */
  transition: left 0.3s, width 0.3s; /* Add width transition */
  width: calc(51.4% - 20px); /* Initial width of the indicator */
  left: 0%; /* Initial position of the indicator */
}

/* Tab content */
.tab-content {
  padding: 20px;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
  margin-bottom: 20px;
}

/* Unauthorized message */
.unauthorized-message {
  text-align: center;
  margin-top: 20px;
}

.text-center {
  text-align: center;
}

.text-danger {
  color: red;
}

.my-5 {
  margin-top: 5rem;
}

/* FontAwesome icon styling */
.font-awesome-icon {
  margin-right: 10px;
  font-size: 24px;
}
</style>
