   <template>
    <div class="container">
      <h2 class="text-light mb-4">Upload Movie</h2>
      <form @submit.prevent="saveMovie">
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
              <select id="language" class="form-select bg-dark border-0 shadow-none text-light" v-model="model.movie.language" required>
                <option value="English">English</option>
                <option value="Vietnamese">Vietnamese</option>
              </select>
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
                  <label :for="'genre_' + index" class="text-light">{{ genre.genreName }}{{ genre.id }}</label>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <p class="text-light">Actors</p>
              <div class="row hide-scrollbar p-3" style="max-height: 150px; overflow-y: scroll;">
                <div class="border rounded-3 col-5 p-3 mx-2 text-center" v-for="(cast, index) in casts" :key="index">
                  <input type="checkbox" :id="'cast_' + index" v-model="model.movie.casts[index]" :value="cast.id" />
                  <label :for="'cast_' + index" class="text-light mx-3">{{ cast.castName }}{{ cast.id }}</label>
                  <img style="border-radius: 50%; object-fit: cover; overflow: hidden; height: 80px; width: 80px;" :src="this.baseUrl + cast.castImage" />
                </div>
              </div>
            </div>
            <div class="mb-3">
              <p class="text-light">Directors</p>
              <div class="row hide-scrollbar p-3" style="max-height: 150px; overflow-y: scroll;">
                <div class="border rounded-3 col-5 p-3 mx-2 text-center" v-for="(director, index) in directors" :key="index">
                  <input type="checkbox" :id="'director_' + index" v-model="model.movie.directors[index]" :value="director.id" />
                  <label :for="'director_' + index" class="text-light mx-3">{{ director.directorName }}{{ director.id }}</label>
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
        <input type="submit" class="btn btn-danger my-2 col-2" value="Upload" name="submit_btn">
      </form>
    </div>
  </template>
  <script>
  import axios from 'axios';
  
  export default {
    name: 'MovieCreate',
    data() {
      return {
        model: {
          movie: {
            movieName: '',
            length: '',
            ageRestricted: '',
            language: '',
            rating: '5',
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
        baseUrl: 'https://localhost:7071'
      };
    },
    methods: {
      saveMovie() {
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

        this.model.movie.genres.forEach((isChecked, index) => {
          if (isChecked) {
            formData.append(`MovieGenres[${index}].GenreId`, this.genres[index].id);
          }
        });

        this.model.movie.casts.forEach((isChecked, index) => {
          if (isChecked) {
            formData.append(`MovieCasts[${index}].CastId`, this.casts[index].id);
          }
        });
        
        this.model.movie.directors.forEach((isChecked, index) => {
          if (isChecked) {
            formData.append(`MovieDirectors[${index}].DirectorId`, this.directors[index].id);
          }
        });
       
        axios.post('https://localhost:7071/api/Movies', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log(response.data);
          this.$router.push('/movie');
          alert('Movie added successfully');
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
    mounted() {
      this.fetchGenres();
      this.fetchCasts();
      this.fetchDirectors();
    }
  };
  </script>