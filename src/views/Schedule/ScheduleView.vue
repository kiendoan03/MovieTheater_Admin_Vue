
<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import axios from 'axios';

library.add(fas)

</script>
<template>
  <main>
    <h1>Schedule  management page</h1>
    <RouterLink to="/schedule/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New schedule
    </RouterLink>
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
          <tr v-for="(schedule, index) in schedules" :key="schedule.id">
            <td scope="row" class ="col-1">{{ index + 1 }}</td>
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
    </div>
  </main>
</template>
<script lang="ts">
import axios from 'axios'; 

export default {
  name: 'ScheduleView',
  data() {
    return {
      schedules: []
    }
  },
  mounted() {
    this.getSchedules();
  },
  methods: {
    getSchedules() {
      axios.get('https://localhost:7071/api/Schedules/get-schedules-with-movie-room')
        .then(response => {
          console.log(response.data);
          this.schedules = response.data;
        })
        .catch(error => {
          console.error('Error fetching schedules:', error);
        });
    }
  }
}
</script>
