
<template>
    <h1>Add schedule</h1>
    <div v-if="!manager">
        <h2 class="text-danger text-center my-5">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager" class="row">
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="date" class="form-label text-light">Date</label>
                    <input type="date" v-model="model.schedule.scheduleDate" class="form-control bg-dark border-0 shadow-none text-light" id="date" name="date" required>
                </div>
                <div class="mb-3">
                    <label for="start_time" class="form-label text-light">Start</label>
                    <input type="time" v-model="model.schedule.startTime" class="form-control bg-dark border-0 shadow-none text-light" id="start_time" name="start_time" required>
                </div>
            </div>

            <div class="col-4">

                <div class="mb-3">
                    <label for="date" class="form-label text-light">Room</label>
                    <select name="room_id" id="room" v-model="model.schedule.roomId" class="form-select bg-dark border-0 shadow-none text-light">
                            <option v-for="room in rooms" :key="room.id" :value="room.id">{{ room.roomName }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="date" class="form-label text-light">Movie</label>
                    <select name="movie_id" id="movie" v-model="model.schedule.movieId" class="form-select bg-dark border-0 shadow-none text-light">
                            <option v-for="movie in movies" :key="movie.id" :value="movie.id">{{ movie.movieName }}</option>
                    </select>
                </div>

            </div>
        </div>
        <button type="button" @click="saveSchedule" class="btn btn-danger my-2 col-2" name="submit_btn">Add</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
export default{
    name: 'ScheduleCreate',
    data(){
        return{
            model: {
                schedule: {
                    scheduleDate: '',
                    startTime: '',
                    roomId: '',
                    movieId: ''
                }
            },
            rooms: [],
            movies: [],
            manager: false,
        }
    },
    mounted(){
        this.fetchRooms();
        this.fetchMovies();
        this.isManager();
    },
    methods:{
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
        fetchRooms(){
            axios.get('https://localhost:7071/api/Rooms').then(response => {
                this.rooms = response.data;
            }).catch(error => {
                console.error('Error fetching rooms:', error);
            });
        },
        fetchMovies(){
            axios.get('https://localhost:7071/api/Movies').then(response => {
                this.movies = response.data;
            }).catch(error => {
                console.error('Error fetching movies:', error);
            });
        },
        saveSchedule(){
            axios.post('https://localhost:7071/api/Schedules', this.model.schedule).then(response => {
                console.log(response.data);
                alert('Schedule added successfully');
                this.$router.push('/schedule');
            }).catch(error => {
                console.error('Error adding schedule:', error);
                alert('Error adding schedule: Schedule is conflicted with existing schedules!!!!');
            });
        },
    }
}
</script>
