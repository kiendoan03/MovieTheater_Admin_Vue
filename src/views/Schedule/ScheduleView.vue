
<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
  <div v-if="!auth">
    <h1 class="text-light">Schedule management page</h1>
    <h2 class="my-5 text-danger text-center">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      You are not authorized to access this page
    </h2>
  </div>
  <main v-if="auth">
    <h1>Schedule  management page</h1>
    <div class="header-container">
      <RouterLink to="/schedule/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New schedule
      </RouterLink>
      <input type="date" v-model="filterDate" class="form-control mb-3 date-input" @change="onDateChange"/>
    </div>
    <div class="mt-2">
      <table class="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Movie</th>
            <th scope="col">Room</th>
            <th scope="col">Date</th>
            <th scope="col">Start time</th>
            <th scope="col">End time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in paginatedSchedules" :key="schedule.id">
            <td scope="row" class ="col-1">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="col-3">{{schedule.movie.movieName}}</td>
            <td class="col-2">{{schedule.room.roomName}}</td>
            <td class="col-2">{{ schedule.scheduleDate }}</td>
            <td class="col-1">{{ schedule.startTime }}</td>
            <td class="col-1">{{ schedule.endTime }}</td>
            <td class="col-2">
              <RouterLink :to="'/schedule/edit/' + schedule.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
              </RouterLink> 
              <RouterLink :to="'/schedule/detail/' + schedule.id" type="button" class="btn btn-outline-light my-1 mx-1" tabindex="-1" role="button" aria-disabled="true">
                <font-awesome-icon :icon="['fas', 'eye']" />
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
          </div>
    </div>
  </main>
</template>
<script lang="ts">
import axios from 'axios'; 

export default {
  name: 'ScheduleView',
  data() {
    return {
      schedules: [],
      auth: false,
      currentPage: 1,
      pageSize: 4,
      totalPages: 1,
      filterDate: null,
    }
  },
  computed: {
    paginatedSchedules() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.schedules.slice(start, end);
    }
  },
  mounted() {
    this.getSchedules();
    this.isAuth();
  },
  methods: {
    isAuth(){
      if(localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
        this.auth = true;
      }
    },
    getSchedules() {
      axios.get('https://localhost:7071/api/Schedules/get-schedules-with-movie-room')
        .then(response => {
          console.log(response.data);
          this.schedules = response.data;
          if (this.filterDate) {
            this.schedules = this.schedules.filter(schedule => {
              const [day, month, year] = schedule.scheduleDate.split('/');
              const scheduleDate = new Date(`${year}-${month}-${day}`);
              return scheduleDate.toDateString() === new Date(this.filterDate).toDateString();
            });
          }
          this.totalPages = Math.ceil(this.schedules.length / this.pageSize);
        })
        .catch(error => {
          console.error('Error fetching schedules:', error);
        });
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    onDateChange() {
      this.getSchedules();
    }
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-input {
  width: 200px;
  background-color: gray;
  color: white; 
  border: none;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #343a40;
  color: white;
  border: 1px solid #6c757d;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  color: white;
}
</style>