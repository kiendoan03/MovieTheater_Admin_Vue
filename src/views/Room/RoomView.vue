<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div v-if="!auth">
    <h1>Room management page</h1>
    <h2 class="text-center text-danger my-5">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      You are not authorized to access this page
    </h2>
  </div>
  <div v-if="auth">
    <h1>Room management page</h1>
    <RouterLink to="/room/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
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
                <tr v-for="(room, index) in paginatedRooms" :key="room.id">
                    <th scope="row" class="col-1">{{ index + 1 + (currentPage - 1) * pageSize }}</th>
                    <td class="col-3">{{ room.roomName}}</td>
                    <td class="col-3" v-if="room.roomTypeId == 1">Normal</td>
                    <td class="col-3" v-else>Vip</td>
                    <td class="col-3" v-if="room.roomTypeId == 1">66</td>
                    <td class="col-3" v-else>24</td>
                    <td class="col-2">
                        <RouterLink :to="'/room/detail/' + room.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                          <font-awesome-icon :icon="['fas', 'eye']" />
                        </RouterLink>
                            <button @click ="deleteRoom(room.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
                                <FontAwesomeIcon :icon="['fas', 'trash']" />
                            </button>
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
  </div>
</template>

<script lang="ts">

export default {
  name: 'RoomView',
  data() {
    return {
      rooms: [],
      auth: false,
      currentPage: 1,
      pageSize: 4,
      totalPages: 1,
    }
  },
  computed: {
    paginatedRooms() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.rooms.slice(start, end);
    }
  },
  mounted() {
    this.getRooms();
    this.isAuth();
  },
  methods: {
    isAuth(){
      if(localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
        this.auth = true;
      }
    },
    getRooms() {
      axios.get('https://localhost:7071/api/Rooms').then(response => {
        this.rooms = response.data;
        this.totalPages = Math.ceil(this.rooms.length / this.pageSize);
      });
    },
    deleteRoom(roomId){
      if(localStorage.getIten('role') == 'Manager'){
        if(confirm('Are you sure to delete this room?')){
           axios.delete(`https://localhost:7071/api/Rooms/${roomId}`).then(response => {
            console.log(response.data);
            alert('Room deleted successfully');
            this.getRooms();
          }).catch(error => {
              console.error('Error deleting room:', error);
          });
        }
      }else{
        alert('You are not authorized to delete this room');
      }
       
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
}
</script>

<style scoped>
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

