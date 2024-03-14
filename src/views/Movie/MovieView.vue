<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <main>
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
            <td class="col-1">
              Showing
            </td>
              <td class="col-1">
                English - VietSub
              </td>
                <td class="col-1">
                  {{movie.length}} minutes
                </td>
                <td class="col-2">
                  <a  type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                  </a>
                  <button type = "button" class="btn btn-outline-danger my-1 mx-1">
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
        baseUrl: 'https://localhost:7071'
      }
    },
    mounted() {
      this.getMovies();
    },
    methods:{
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
        }).catch(error => {
            console.error('Error fetching movies:', error);
        });
      },
      deleteCast(movieId){
        axios.delete(`https://localhost:7071/api/Movies/${movieId}`).then(response => {
            console.log(response.data);
            alert('Movie deleted successfully');
            this.getActors();
        }).catch(error => {
            console.error('Error deleting movie:', error);
        });
    }
    }
  }
</script>