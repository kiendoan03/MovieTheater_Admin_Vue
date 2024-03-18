<template>
    <h1>Edit schedule</h1>
    <div class="row">
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
        <button type="button" @click="editSchedule" class="btn btn-danger my-2 col-2" name="submit_btn">Add</button>
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
            movies: []
        }
    },
    mounted(){
        this.fetchRooms();
        this.fetchMovies();
        this.scheduleId = this.$route.params.id;
        this.getSchedule(this.$route.params.id);
    },
    methods:{
        getSchedule(scheduleId){
            axios.get(`https://localhost:7071/api/Schedules/${scheduleId}`).then(response => {
                this.model.schedule = response.data;
            // Chuyển đổi định dạng ngày từ dữ liệu lấy ra
            this.model.schedule.scheduleDate = this.formatDate(this.model.schedule.scheduleDate);
            // Chuyển đổi định dạng thời gian từ dữ liệu lấy ra
            this.model.schedule.startTime = this.convertTimeFormat(this.model.schedule.startTime);
                console.log(response.data);
            }).catch(error => {
                console.error('Error fetching schedule:', error);
            });
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
        editSchedule(){
            axios.put(`https://localhost:7071/api/Schedules/${this.scheduleId}`, this.model.schedule).then(response => {
                console.log(response.data);
                alert('Schedule updated successfully');
                this.$router.push('/admin/schedule');
            }).catch(error => {
                console.error('Error updating schedule:', error);
            });
        },
        // formatDate(date) {
        //     // Kiểm tra xem date có tồn tại không để tránh lỗi
        //     if (date) {
        //         const parts = date.split("/");
        //         return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
        //     } else {
        //         return ''; // Trả về chuỗi rỗng nếu không có date
        //     }
        // },
        formatDate(dateString) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month}-${day}`;
        },
        // Hàm chuyển đổi định dạng thời gian thành "HH:mm"
        convertTimeFormat(timeString) {
            const [time, period] = timeString.split(' '); 
            const [hours, minutes] = time.split(':'); 
            let hoursNumber = parseInt(hours, 10);
            if (hoursNumber === 12) {
                hoursNumber = period === 'SA' ? 0 : 12;
            } else {
                hoursNumber += period === 'CH' ? 12 : 0;
            }
            const formattedHours = hoursNumber.toString().padStart(2, '0');
            const formattedMinutes = minutes.padStart(2, '0');
            return `${formattedHours}:${formattedMinutes}`;
        },
    },
}
</script>
