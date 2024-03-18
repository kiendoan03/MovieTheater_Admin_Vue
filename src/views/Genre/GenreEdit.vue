<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
    <div v-if="!manager">
        <h1>Edit Genre</h1>
        <h2 class="text-center my-5 text-danger">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager">
        <h1>Edit Genre</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="genre_name" class="form-label text-light">Genre name</label>
                    <input type="text" v-model="model.genre.genreName" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="genre_name" required>
                </div>
            </div>
        </div>
        <button type="button" @click="UpdateGenre" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Update</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'GenreEdit',
    data() {
        return {
            model: {
                genre: {
                    genreName: '',
                }
            },  
            manager: false,
        }
    },
    mounted() {
        this.genreId = this.$route.params.id;
        this.getGenre(this.$route.params.id);
        this.isManager();
    },
    methods: {
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
       getGenre(genreId) {
        axios.get(`https://localhost:7071/api/Genres/${genreId}`).then(response => {
            console.log(response.data);
            this.model.genre = response.data;
        }).catch(error => {
            console.error('Error fetching genre:', error);
        });                
        },
        UpdateGenre() {
        axios.put(`https://localhost:7071/api/Genres/${this.genreId}`, this.model.genre).then(response => {
            console.log(response.data);
            alert('Genre updated successfully');
            this.$router.push('/genre');
        }).catch(error => {
            console.error('Error updating genre:', error);
        });
        }
    }
}
</script>
