<template>
    <div>
        <h1>Add Genre</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="genre_name" class="form-label text-light">Genre name</label>
                    <input type="text" v-model="model.genre.genreName" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="genre_name" required>
                </div>
            </div>
        </div>
        <button type="button" @click="saveGenre" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Save</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'GenreCreate',
    data() {
        return {
            model: {
                genre: {
                    genreName: '',
                }
            },  
        }
    },
    methods: {
        saveGenre() {
            axios.post('https://localhost:7071/api/Genres', this.model.genre).then(response => {
                console.log(response.data);
                alert('Genre added successfully');
                this.$router.push('/genre');
                this.resetForm();
            }).catch(error => {
                console.error('Error adding genre:', error);
            });
        },
        resetForm() {
            this.model.genre.genreName = '';
        }
    }
}
</script>
