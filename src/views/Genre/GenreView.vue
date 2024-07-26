<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
    <div v-if="!auth">
      <h1 class="text-light">Genre management page</h1>
      <h2 class="my-5 text-danger text-center">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        You are not authorized to access this page
      </h2>
    </div>
  <div v-if="auth">
    <h1>Genre management page</h1>
    <RouterLink to="/genre/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New genre
    </RouterLink>
    <div class="mt-2">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Genre name</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(genre, index) in paginatedGenres" :key="genre.id">
                    <th scope="row" class="col-1">{{ index + 1 + (currentPage - 1) * pageSize }}</th>
                    <td class="col-5">{{ genre.genreName}}</td>
                    <td class="col-2">
                        <RouterLink :to="'/genre/edit/' + genre.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </RouterLink>
                            <button @click ="deleteGenre(genre.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
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
  name: 'GenreView',
  data() {
    return {
      genres: [],
      auth: false,
      currentPage: 1,
      pageSize: 4,
      totalPages: 1,
    }
  },
  computed: {
    paginatedGenres() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.genres.slice(start, end);
    }
  },
  mounted() {
    this.getGenres();
    this.isAuth();
  },
  methods: {
    isAuth(){
        if(localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
            this.auth = true;
        }
    },
    getGenres() {
      axios.get('https://localhost:7071/api/Genres').then(response => {
        // Xử lý dữ liệu trả về
        this.genres = response.data.map(genre => ({
          genreName: genre.genreName,
          id: genre.id,
        }));
        this.totalPages = Math.ceil(this.genres.length / this.pageSize);
        console.log(this.genres);
      }).catch(error => {
        console.error('Error fetching genres:', error);
      });
    },
    deleteGenre(genreId){
        if(localStorage.getItem('role') != 'Manager'){
            alert('You are not authorized to delete genre');
            return;
        }else{
            if(confirm('Are you sure you want to delete this genre?')){
                  axios.delete(`https://localhost:7071/api/Genres/${genreId}`).then(response => {
                  console.log(response.data);
                  alert('Genre deleted successfully');
                  this.getGenres();
              }).catch(error => {
                  console.error('Error deleting genre:', error);
              });
            }
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

