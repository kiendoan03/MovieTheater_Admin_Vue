<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
    <div v-if="!manager">
        <h1>Room Detail</h1>
        <h2 class="text-center text-danger my-5">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager">
        <h1>{{this.model.room.roomName}}</h1>
        <div v-if ="this.model.room.roomTypeId == 1"  class="row mx-3 my-3">
            <div class="col-12">
                <div class="row screen mb-5">
                    <img src="../../assets/image/bg-screen.png" style="object-fit: cover; width: 100%;" alt="">
                </div>
                <div class="row seat d-flex col-12 " style="margin-top: 1vmax;">
                    <div class="col-1">
                        <div class="row">
                            <div class="col-12 text-center  fw-bolder fs-4" style="height: 2.5vmax;">
                            </div>
                           
                                <div  class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    A
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    B
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    C
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    D
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    E
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    F
                                </div>
                            </div>
                        </div>
                        <div class="col-11">
                                <div class="row mb-3">
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        1
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        2
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        3
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        4
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        5
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        6
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        7
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        8
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        9
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        10
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        11
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        12
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.seats" :key="seat.id" class="col-1">
                                        <div v-if="seat.seatTypeId == 1"  class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg=="></div>
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.seats" :key="seat.id" class="col-1">
                                        <div v-if="seat.seatTypeId == 2" class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3klEQVR4nO2ZS2xNQRjH+2AtoYIGi6ZRUY+VhJSVakKIRyXUVoSdZ1KxsusOVeq5IPFohERiZWHhkXhtPBMb9SoRxOaqaNGffPK/nFztvWfmnnvuIee3anpmvu/7z3wz883cioqUlJSUlJSUlH8XYBSwBjgBPAE+AENEh9kym4+B40Cr+YxaRBvwgvh5DqyNQkC1RqfcHAOqihFyhOTQ7StiNcljhU9KlWNNFKLXYnMRspTk0uIi5CjJpdtFyF2Sy20XITXAaKAWaAa6gEwZgs7I9yLFYjHVhBYygrgJwPkYRfSYT99gF8rAG2AA6APOAQv0vRLoiEFEh/kKE9NwddThAsYPqV1liWemRz5CxxQUUqjD745qP7FEayaTTSfXmLJT50KT+h0kerq8Y9JUunBWzhYTPc2y7R6TFpELfXJm22HU1Mq2e0zaCVz4biW16rEfRIfZqpZt8+HCgAl56+F0nEbuPdHxTjbHe/Tt88lHY4mcXiI6LhZRsP5aI00ed+9OOZ2j0rpYngEzZfOAY1+LfX52C+507PwZmOZVPuSvLBqAfsdY9gcNVHmIeQ2sK7qI+1OkLgPqgKnArZAzsW/Yu7xNEXCG8mD11WaVP4XWyWlgXpgRihsb3XrgAfBNZ9TLkRq7THUcPAVO6b6xHZgb+LYDWAXs1YPgteCZlSQhj4ApwDZgj3L9Ts7DnKVaO7AJmCVRiRNyFWjUE2mYtNsI7EqikGz6TAbuFSjrW3XWffIR8iUeLZwExuakVfCsatRsBOvBQRchD4mP6Xrdz2VIF7jc3avXRUjY21mxvAImBUqkj8D9wPc27Wx/3whDCqn3KKV9sINtvf62BwUTNQbYDXzVLwEbAu3tjKkLLURibG8vNZdVX7UAs/UwaKm0HJgBrAS2BNpvdRIRENOukSklF5Q+gzn/v6Kn237FsNNLRECMjVi5aShKREBMXpJu/78UcjOPn+sltn8jjJGfT8zJxA5Aeb8AAAAASUVORK5CYII="></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-for="seat in model.seats" :key="seat.id" class="col-2">
                                        <div v-if="seat.seatTypeId == 3" class="col-12 text-center mb-5"><img style="width: 2.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8ElEQVR4nO2aPWgUQRiGV6OoJEZMpRhR/AkKGn/Bf0khYqFR0EpCsDKCAU0s/MPkCsEipdhYGbCRIAqigj9djDYiaUQQtREEFb0gGBX1kQ++k2G5bOZuZu82YR7YIrMf774vMzezO5MoCgQCgUAgEAhUGaAR2AnscrhWAjWG5jRtc9EUTwt8Bp0LXMcfw4b2sCfNv8AtoME17BTgHp4x9H3zQDy7BN6Tgqk0Awu7XQKfnYCBz7gEzk3AwLkQ2BbgkM6AXjH0fSNeD1oHLAawGXjq05Wh7ZMh8VrK8tMUW9C3AfV6fxbwOMOBHwEzVbNevZtZmv4vV8D8hB78DnRo3WLgZwYDi6dFqncMGE0YAfOkaGAcwd/AahW8m8HAd1SrWb0mcUMKRyxEu1S0L4OB+1Sry6I2H5WytgE9ZC9wTynvDFGJgdcA94GHZV7PgX4jcL9+QAyVqSdemlMLnGXS6uEaYLvDt+uyIkaXO+iJl6lpBu7E/U3ovBH2Au4cTzNwDnfyRmCbFcKrt6hE0VYPLx9DRuBnjlriZV9qgbNMCOxpSO/39T7tCfHSmloPk9IOSJYnrRzZIwROIsKO0MNV4AfwIbbH9g3onmy/4U9Au2wzqYfZwFFgY2wd7pwMgfPACn32Ft3CWat/1wKHgTY5/9K2qxM98Dl97kWjTYb0JeC10fYeWKi9/zVJMALeZTjwKtl4A/5Y1F5RjzcTat5KwSkLsV4V66WyyE7pOsva2+rxWkJNd2FPugN4Arwpcr0EtqrYJuDVGHVpXDuAGcBHi8AnjR6O6wzqRFf+UWolkY/8ccJKqDqXB9QBSxKuRq+J7DwNJKzPG7TG9FhrKyxHFV8shtDptEPGfM0BXsQ8yGTWrvdPxO59tgoNTI9N+WPRVomgMW8NutVbCHtE2w8Av2L+ZK6psRVemnDeNFI4iagGOgIvA3uNf8uQYW0yWDhvKgldFlqMbdH11r+NCiHnXoa/lrKCBgKBQCAQCAQid/4BnQc5hEvJvewAAAAASUVORK5CYII="></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
        </div>
        <div v-if ="this.model.room.roomTypeId == 2"  class="row mx-3 my-3">
            <div class="col-12">
                <div class="row screen mb-5">
                    <img src="../../assets/image/bg-screen.png" style="object-fit: cover; width: 100%;" alt="">
                </div>
                <div class="row seat d-flex col-12 " style="margin-top: 1vmax;">
                    <div class="col-1">
                        <div class="row">
                            <div class="col-12 text-center  fw-bolder fs-4" style="height: 2.5vmax;">
                            </div>
                           
                                <div  class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    A
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    B
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    C
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    D
                                </div>
                            </div>
                        </div>
                        <div class="col-11">
                                <div class="row mb-3">
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        1
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        2
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        3
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        4
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        5
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        6
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.seats" :key="seat.id" class="col-2">
                                        <div class="col-12 text-center mb-5" ><font-awesome-icon :icon="['fas', 'couch']" size="2xl" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
        
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'RoomDetail',
    data() {
        return {
            model: {
                room: {
                    roomName: '',
                    roomTypeId:''
                },
                seats: []
            },  
            manager: false,
        }
    },
    mounted() {
        this.roomId = this.$route.params.id;
        this.getRoom(this.$route.params.id);
        this.getSeats(this.$route.params.id);
        this.isManager();
    },
    methods: {
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
        getRoom(roomId) {
        axios.get(`https://localhost:7071/api/Rooms/${roomId}`).then(response => {
                console.log(response.data);
                this.model.room = response.data;
                }).catch(error => {
                    console.error('Error fetching room:', error);
                });                
            },
        getSeats(roomId) {
            axios.get(`https://localhost:7071/api/Rooms/GetSeatsbyRoomId/${roomId}`).then(response => {
                console.log(response.data);
                this.model.seats = response.data;
            }).catch(error => {
                console.error('Error fetching seats:', error);
            });                
        }
    }
}
</script>
