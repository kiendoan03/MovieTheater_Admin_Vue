<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
     <div v-if="!manager">
        <h1>Edit Movie</h1>
        <h2 class="text-center my-5 text-danger">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager" class="container">
      <h2 class="text-light mb-4">Edit Movie</h2>
      <!-- <form @submit.prevent="updateMovie"> -->
        <div class="row">
          <div class="col-8">
            <div class="mb-3">
              <label for="movie_name" class="form-label text-light">Movie Name</label>
              <input type="text" class="form-control bg-dark border-0 shadow-none text-light" id="movie_name" v-model="model.movie.movieName" required>
            </div>
            <div class="mb-3">
              <label for="movie_length" class="form-label text-light">Length(m)</label>
              <input type="number" class="form-control bg-dark border-0 shadow-none text-light" id="movie_length" v-model="model.movie.length" required>
            </div>
            <div class="mb-3">
              <label for="movie_age" class="form-label text-light">Age Restricted</label>
              <input type="number" class="form-control bg-dark border-0 shadow-none text-light" id="movie_age" v-model="model.movie.ageRestricted" required>
            </div>
            <div class="mb-3">
              <label for="language" class="form-label text-light">Language</label>
              <input id="language" class="form-select bg-dark border-0 shadow-none text-light" v-model="model.movie.language" required>
            </div>
            <div class="mb-3">
              <label for="country" class="form-label text-light">Country</label>
              <input type="text" class="form-control bg-dark border-0 shadow-none text-light" id="country" v-model="model.movie.country" required>
            </div>
            <div class="mb-3">
              <p class="form-label text-light">Film Genre</p>
              <div class="d-flex flex-wrap hide-scrollbar p-3" style="max-height: 150px; overflow-y: scroll;">
                <div class="border col-4 mb-3 mx-2 p-2 rounded-3" v-for="(genre, index) in genres" :key="index">
                  <input type="checkbox" :id="'genre_' + index" v-model="model.movie.genres[index]" :value="genre.id" />
                  <label :for="'genre_' + index" class="text-light mx-3">{{ genre.genreName }}</label>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <p class="text-light">Actors</p>
              <div class="row hide-scrollbar p-3" style="max-height: 150px; overflow-y: scroll;">
                <div class="border rounded-3 col-5 p-3 mx-2 text-center" v-for="(cast, index) in casts" :key="index">
                  <input type="checkbox" :id="'cast_' + index" v-model="model.movie.casts[index]" :value="cast.id" />
                  <label :for="'cast_' + index" class="text-light mx-3">{{ cast.castName }}</label>
                  <img style="border-radius: 50%; object-fit: cover; overflow: hidden; height: 80px; width: 80px;" :src="this.baseUrl + cast.castImage" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <p class="text-light">Directors</p>
              <div class="row hide-scrollbar p-3" style="max-height: 150px; overflow-y: scroll;">
                <div class="border rounded-3 col-5 p-3 mx-2 text-center" v-for="(director, index) in directors" :key="index">
                  <input type="checkbox" :id="'director_' + index" v-model="model.movie.directors[index]" :value="director.id"  />
                  <label :for="'director_' + index" class="text-light mx-3">{{ director.directorName }}</label>
                  <img style="border-radius: 50%; object-fit: cover; overflow: hidden; height: 80px; width: 80px;" :src="this.baseUrl + director.directorImage" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="movie_release_date" class="form-label text-light">Release Date</label>
              <input type="date" class="form-control bg-dark border-0 shadow-none text-light" id="movie_release_date" v-model="model.movie.releaseDate" required>
            </div>
            <div class="mb-3">
              <label for="movie_end_date" class="form-label text-light">End Date</label>
              <input type="date" class="form-control bg-dark border-0 shadow-none text-light" id="movie_end_date" v-model="model.movie.endDate" required>
            </div>
            <div class="mb-3">
              <label for="movie_synopsis" class="form-label text-light">Synopsis</label>
              <textarea class="form-control bg-dark border-0 shadow-none text-light" id="movie_synopsis" v-model="model.movie.synopsis"></textarea>
            </div>
          </div>
          <div class="col-4">
            <div class="col-12">
              <div class="row mb-3">
                <label for="logo" class="form-label text-light">Logo</label>
                <input type="file" id="logo" class="form-control bg-dark border-0 shadow-none text-light" @change="showImage($event, 'logo')" required>
                <div class="row my-3">
                  <img id="logo_img" class="rounded-3" :src="previewImage.logo" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="movie_poster" class="form-label text-light">Poster</label>
                <input type="file" id="movie_poster" class="form-control bg-dark border-0 shadow-none text-light" @change="showImage($event, 'poster')" required>
                <div class="row my-3">
                  <img id="poster_img" class="rounded-3" :src="previewImage.poster" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="movie_thumbnail" class="form-label text-light">Thumbnail</label>
                <input type="file" id="movie_thumbnail" class="form-control bg-dark border-0 shadow-none text-light" @change="showImage($event, 'thumbnail')" required>
                <div class="row my-3">
                  <img id="thumbnail_img" class="rounded-3" :src="previewImage.thumbnail" />
                </div>
              </div>
              <div class="row mb-3">
                <label for="movie_trailer" class="form-label text-light">Trailer</label>
                <input type="file" id="movie_trailer" class="form-control bg-dark border-0 shadow-none text-light" @change="showVideo($event)" required>
                <div id="trailers_preview" class="my-3">
                    <video :src="previewImage.trailer" class="col-12 rounded-3" muted autoplay ></video>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" @click="updateMovie" class="btn btn-danger my-2 col-2" name="submit_btn">Update</button>
      <!-- </form> -->
    </div>
  </template>
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    name: 'MovieEdit',
    data() {
      return {
        model: {
          movie: {
            id: '',
            movieName: '',
            length: '',
            ageRestricted: '',
            language: '',
            genres: [],
            casts: [],
            directors: [],
            releaseDate: '',
            endDate: '',
            synopsis: '',
            country: '',
            logo: '',
            poster: '',
            thumbnail: '',
            trailer: '',
            movieGenres: [],
            movieCasts: [],
            movieDirectors: [],
          }
        },
        previewImage: {
          logo: '',
          poster: '',
          thumbnail: '',
          trailer: ''
        },
        genres: [],
        casts: [],
        directors: [],
        baseUrl: 'https://localhost:7071',
        manager: false,
      };
    },
    mounted() {
      this.movieId = this.$route.params.id;
      this.getMovie(this.$route.params.id); 
      this.fetchGenres();
      this.fetchCasts();
      this.fetchDirectors();
      this.isManager();
    },
    methods: {
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
        getMovie(movieId){
            axios.get('https://localhost:7071/api/Movies/get-movies-with-fk?id=' + movieId).then(response => {
                console.log(response.data);
                this.model.movie = response.data;
                // this.model.movie.genres.forEach((genre, index) => {
                //     this.model.movie.genres[index] = true;
                // });
                // this.model.movie.casts.forEach((cast, index) => {
                //     this.model.movie.casts[index] = true;
                // });
                // this.model.movie.directors.forEach((director, index) => {
                //     this.model.movie.directors[index] = true;
                // });
                this.model.movie.movieGenres.forEach(movieGenre => {
                    const index = this.genres.findIndex(genre => genre.id === movieGenre.genreId);
                    if (index !== -1) {
                    this.model.movie.genres[index] = true;
                    }
                });
                this.model.movie.movieCasts.forEach(movieCast => {
                    const index = this.casts.findIndex(cast => cast.id === movieCast.castId);
                    if (index !== -1) {
                    this.model.movie.casts[index] = true;
                    }
                });
                this.model.movie.movieDirectors.forEach(movieDirector => {
                    const index = this.directors.findIndex(director => director.id === movieDirector.directorId);
                    if (index !== -1) {
                    this.model.movie.directors[index] = true;
                    }
                });
                this.model.movie.releaseDate = this.formatDate(this.model.movie.releaseDate);
                this.model.movie.endDate = this.formatDate(this.model.movie.endDate);
                this.previewImage.logo = this.baseUrl + this.model.movie.logo;
                this.previewImage.poster = this.baseUrl + this.model.movie.poster;
                this.previewImage.thumbnail = this.baseUrl + this.model.movie.thumbnail;
                this.previewImage.trailer = this.baseUrl + this.model.movie.trailer;
            }).catch(error => {
                console.error('Error fetching movie:', error);
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
        updateMovie() {
            console.log('here');
            const formData = new FormData();
            for (let key in this.model.movie) {
            if (Array.isArray(this.model.movie[key])) {
                this.model.movie[key].forEach((value, index) => {
                formData.append(`${key}[${index}]`, value);
                });
            } else {
                formData.append(key, this.model.movie[key]);
            }
            }
            let genreIndex = 0;
            let castIndex = 0;
            let directorIndex = 0;
            this.model.movie.genres.forEach((isChecked, index) => {
            if (isChecked) {
                formData.append(`MovieGenres[${genreIndex}].GenreId`, this.genres[index].id);
                genreIndex++;
            }
            });

            this.model.movie.casts.forEach((isChecked, index) => {
            if (isChecked) {
                formData.append(`MovieCasts[${castIndex}].CastId`, this.casts[index].id);
                castIndex++;
            }
            });
            
            this.model.movie.directors.forEach((isChecked, index) => {
            if (isChecked) {
                formData.append(`MovieDirectors[${directorIndex}].DirectorId`, this.directors[index].id);
                directorIndex++;
            }
            });
            console.log(formData);
            console.log(this.model.movie);
        
            axios.put(`https://localhost:7071/api/Movies/${this.movieId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
            }).then(response => {
            console.log(response.data);
            this.$router.push('/movie');
            alert('Movie updated successfully');
            // Redirect or any other action after successful upload
            }).catch(error => {
            console.error('Error adding movie:', error);
            });
      },
      showImage(event, type) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = () => {
          this.model.movie[type] = file;
          this.previewImage[type] = reader.result;
        };
  
        reader.readAsDataURL(file);
      },
      showVideo(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.model.movie.trailer = file;
          this.previewImage.trailer = reader.result;
        };
        reader.readAsDataURL(file);
      },
      fetchGenres() {
        axios.get('https://localhost:7071/api/Genres')
          .then(response => {
            this.genres = response.data;
          })
          .catch(error => {
            console.error('Error fetching genres:', error);
          });
      },
      fetchCasts() {
        axios.get('https://localhost:7071/api/Casts')
          .then(response => {
            this.casts = response.data;
          })
          .catch(error => {
            console.error('Error fetching casts:', error);
          });
      },
      fetchDirectors() {
        axios.get('https://localhost:7071/api/Directors')
          .then(response => {
            this.directors = response.data;
          })
          .catch(error => {
            console.error('Error fetching directors:', error);
          });
      }
    },
  };
  </script>