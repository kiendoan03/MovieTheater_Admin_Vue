<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div>
    <h1>Room management page</h1>
    <RouterLink to="/admin/room/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New Room
    </RouterLink>
    <div class="mt-2">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Room name</th>
                    <th scope="col">Room type</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(room, index) in rooms" :key="room.id">
                    <th scope="row" class="col-1">{{ index + 1 }}</th>
                    <td class="col-3">{{ room.roomName}}</td>
                    <td class="col-3" v-if="room.roomTypeId == 1">Normal</td>
                    <td class="col-3" v-else>Vip</td>
                    <td class="col-3" v-if="room.roomTypeId == 1">66</td>
                    <td class="col-3" v-else>24</td>
                    <td class="col-2">
                        <RouterLink :to="'/admin/room/detail/' + room.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                          <font-awesome-icon :icon="['fas', 'eye']" />
                        </RouterLink>
                            <button @click ="deleteRoom(room.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
                                <FontAwesomeIcon :icon="['fas', 'trash']" />
                            </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'RoomView',
  data() {
    return {
      rooms: [],
    }
  },
  mounted() {
    this.getRooms();
  },
  methods: {
    getRooms() {
      axios.get('https://localhost:7071/api/Rooms').then(response => {
        this.rooms = response.data;
      });
    },
    deleteRoom(roomId){
        axios.delete(`https://localhost:7071/api/Rooms/${roomId}`).then(response => {
            console.log(response.data);
            alert('Room deleted successfully');
            this.getRooms();
        }).catch(error => {
            console.error('Error deleting room:', error);
        });
    }
  }
}
</script>

