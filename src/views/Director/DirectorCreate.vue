<template>
    <div>
        <h1>Add Director</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="actor_name" class="form-label text-light">Director name</label>
                    <input type="text" v-model="model.director.DirectorName" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12">
                    <div class="row">
                        <label for="image" class="form-label text-light">Director image</label>
                        <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="actor_img" accept="image/png, image/jpg, image/jpeg" @change="onFileChange" required>
                        <div class="row my-3" style="width: 15vmax;">
                            <img id="actor_img" class="rounded-3 object-fit-cover mx-auto" :src="previewImage"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" @click="saveDirector" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Save</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'DirectorCreate',
    data() {
        return {
            model: {
                director: {
                    DirectorName: '',
                    directorImage: null
                }
            },  
            previewImage: '',
        }
    },
    methods: {
        saveDirector() {
            const formData = new FormData();
            formData.append('directorName', this.model.director.DirectorName);
            formData.append('file', this.model.director.directorImage);

            axios.post('https://localhost:7071/api/Directors', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Director added successfully');
                this.$router.push('/director');
                this.resetForm();
            }).catch(error => {
                console.error('Error adding director:', error);
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.model.director.directorImage = file;
            this.previewImage = URL.createObjectURL(file);
        },
        resetForm() {
            this.model.director.DirectorName = '';
            this.model.director.directorImage = null;
            this.previewImage = '';
        }
    }
}
</script>
