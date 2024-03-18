<script setup lang = "ts">

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div v-if="!auth">
    <h1>Movies management page</h1>
    <h2 class="text-danger text-center my-5">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      You are not authorized to access this page
    </h2>
  </div>
  <main v-if="auth">
    <div class="row">
      <div class="col">
           <h2 class="text-light">Movies management site</h2>
      </div>
   </div>
        
  <div class="row">
    <div class="col-12">
      <RouterLink to="/movie/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> Upload new movie
    </RouterLink>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <table id="myTable" class="display table my-3 text-light table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Movie Name</th>
            <th scope="col">Rating</th>
            <th scope="col">Poster</th>
            <th scope="col">Release date</th>
            <th scope="col">End date</th>
            <th scope="col">Status</th>
            <th scope="col">Language</th>
            <th scope="col">Length</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(movie, index) in movies" :key="movie.id">
            <th scope="row" class="col-1">{{ index + 1 }}</th>
            <td class="col-2">{{ movie.movieName }}</td>
            <td class="col-1">{{movie.rating}}/5</td>
            <td class="col-2">
              <img class="col-12 rounded-3 w-75" :src="movie.poster">
            </td>
            <td class="col-1">
              {{ movie.releaseDate }}
            </td>
            <td class="col-1">
              {{ movie.endDate }}
            </td>
            <td v-if="formatDate(movie.releaseDate) <= today && today <= formatDate(movie.endDate)" class="col-1">
              Showing
            </td>
            <td v-else-if="formatDate(movie.releaseDate) > today" class="col-1">
              Upcoming
            </td>
            <td v-else-if="formatDate(movie.endDate) < today" class="col-1">
              End
            </td>
              <td class="col-1">
                {{movie.language}}
              </td>
                <td class="col-1">
                  {{movie.length}} minutes
                </td>
                <td class="col-2">
                  <RouterLink :to="'/movie/edit/' + movie.id"  type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </RouterLink>
                  <button @click="deleteMovie(movie.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
                    <FontAwesomeIcon :icon="['fas', 'trash']" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
</main>
</template>
<script lang="ts">

  export default {
    name: 'MovieView',
    data() {
      return {
        movies: [],
        baseUrl: 'https://localhost:7071',
        today: new Date().toISOString().split('T')[0],
        auth: false,
      }
    },
    mounted() {
      this.getMovies();
      this.isAuth();
    },
    methods:{
      isAuth(){
        if(localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
          this.auth = true;
        }
      },
      formatDate(dateString) {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
      },
      getMovies(){
        axios.get('https://localhost:7071/api/Movies').then(response => {
            this.movies = response.data.map(movie => ({
              movieName: movie.movieName,
              id: movie.id,
              rating: movie.rating,
              poster: this.baseUrl + movie.poster,
              releaseDate: movie.releaseDate,
              endDate: movie.endDate,
              status: movie.status,
              language: movie.language,
              length: movie.length
            }));
            console.log(this.today);
        }).catch(error => {
            console.error('Error fetching movies:', error);
        });
      },
      deleteMovie(movieId){
        if(localStorage.getItem('role') == 'Manager'){
          if(confirm('Are you sure to delete this movie?')){
             axios.delete(`https://localhost:7071/api/Movies/${movieId}`).then(response => {
            console.log(response.data);
            alert('Movie deleted successfully');
            this.getActors();
        }).catch(error => {
            console.error('Error deleting movie:', error);
        });
          }
        }else{
          alert('You are not authorized to delete movie');
        }
    }
    }
  }
</script>