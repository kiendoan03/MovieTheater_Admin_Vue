<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
    <div v-if="!manager">
        <h1>Edit Director</h1>
            <h2 class="text-center text-danger my-5">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
                You are not authorized to access this page
            </h2>
    </div>
    <div v-if="manager">
        <h1>Edit Director</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="director_name" class="form-label text-light">Director name</label>
                    <input type="text" v-model="model.director.directorName" class="form-control bg-dark border-0 shadow-none text-light" id="director" name="director_name" required>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12">
                    <div class="row">
                        <label for="image" class="form-label text-light">Director image</label>
                        <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="director_img" accept="image/png, image/jpg, image/jpeg" @change="onFileChange" >
                        <div class="row my-3" style="width: 15vmax;">
                            <img id="director_img" class="rounded-3 object-fit-cover mx-auto" :src="previewImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" @click="updateDirector" class="btn btn-danger my-2 col-2" value="Update" name="submit_btn">Update</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'DirectorEdit',
    data() {
        return {
            model: {
                director: {
                    directorId: '',
                    directorName: '',
                    directorImage: ''
                }
            },
            baseUrl: 'https://localhost:7071',
            previewImage: '',
            manager: false,
        };
    },
    mounted() {
        this.directorId = this.$route.params.id;
        this.getDirector(this.$route.params.id);
        this.isManager();
    },
    methods: {
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
        getDirector(directorId) {
            axios.get(`https://localhost:7071/api/Directors/${directorId}`).then(response => {
                console.log(response.data);
                this.model.director = response.data;
                this.previewImage = this.baseUrl + this.model.director.directorImage;
            }).catch(error => {
                console.error('Error fetching director:', error);
            });                
        },
        updateDirector() {
            const formData = new FormData(); 
            formData.append('id', this.directorId);
            formData.append('directorName', this.model.director.directorName);
            formData.append('file', this.model.director.directorImage);
            axios.put(`https://localhost:7071/api/Directors/${this.directorId}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Director updated successfully');
                this.$router.push('/director');
            }).catch(error => {
                console.error('Error updating director:', error);
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if(file == null){
                this.model.director.directorImage = this.previewImage;
            }
            this.model.director.directorImage = file;
            this.previewImage = URL.createObjectURL(file);
        }
    }
}
</script>
