<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div v-if="!auth">
    <h1>Director management page</h1>
    <h2 class="text-danger text-center my-5">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      You are not authorized to access this page
    </h2>
  </div>
  <div v-if="auth">
    <h1 >Director management page</h1>
    <RouterLink to="/director/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New director
    </RouterLink>
    <div class="mt-2">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Director name</th>
                    <th scope="col">Director image</th>
                    <th scope="col" >Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(director, index) in directors" :key="director.id">
                    <th scope="row" class="col-1">{{ index + 1 }}</th>
                    <td class="col-5">{{ director.directorName}}</td>
                    <td class="col-4">
                        <img class="col-4" :src="director.directorImage" />
                    </td>
                    <td class="col-2" >
                        <RouterLink :to="'/director/edit/' + director.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </RouterLink>
                            <button @click ="deleteDirector(director.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
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
  name: 'DirectorView',
  data() {
    return {
      directors: [],
      baseUrl: 'https://localhost:7071',
      auth: false,
    }
  },
  mounted() {
    this.getDirectors();
    this.isAuth();
  },
  methods: {
    isAuth(){
      if(localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
        this.auth = true;
      }
    },
    getDirectors() {
      axios.get('https://localhost:7071/api/Directors').then(response => {
        // Xử lý dữ liệu trả về
        this.directors = response.data.map(director => ({
          directorName: director.directorName,
          id: director.id,
          directorImage: this.baseUrl + director.directorImage 
        }));
        console.log(this.directors);
      }).catch(error => {
        console.error('Error fetching directors:', error);
      });
    },
    deleteDirector(directorId){
        axios.delete(`https://localhost:7071/api/Directors/${directorId}`).then(response => {
            console.log(response.data);
            alert('Director deleted successfully');
            this.getActors();
        }).catch(error => {
            console.error('Error deleting director:', error);
        });
    }
  }
}
</script>

