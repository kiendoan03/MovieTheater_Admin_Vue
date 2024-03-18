<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
    <div>
        <div v-if="!manager">
            <h1>Add Actor</h1>
            <h2 class="text-center my-5 text-danger">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
                You are not authorized to access this page
            </h2>
        </div>
        <div v-if="manager">
            <h1>Add Actor</h1>
            <div class="row">
                <div class="col-8">
                    <div class="mb-3">
                        <label for="actor_name" class="form-label text-light">Actor name</label>
                        <input type="text" v-model="model.actor.castName" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                    </div>
                </div>
                <div class="col-4">
                    <div class="col-12">
                        <div class="row">
                            <label for="image" class="form-label text-light">Actor image</label>
                            <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="actor_img" accept="image/png, image/jpg, image/jpeg" @change="onFileChange" required>
                            <div class="row my-3" style="width: 15vmax;">
                                <img id="actor_img" class="rounded-3 object-fit-cover mx-auto" :src="previewImage"  />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" @click="saveActor" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'ActorCreate',
    data() {
        return {
            model: {
                actor: {
                    castName: '',
                    castImage: null
                }
            },  
            previewImage: '',
            manager: false,
        }
    },
    mounted() {
        this.isManager();
    },
    methods: {  
        isManager(){
            if(localStorage.getItem('role') == 'Manager'){
                this.manager = true;
            }
        },
        saveActor() {
            const formData = new FormData();
            formData.append('castName', this.model.actor.castName);
            formData.append('file', this.model.actor.castImage);

            axios.post('https://localhost:7071/api/Casts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Actor added successfully');
                this.$router.push('/actor');
                this.resetForm();
            }).catch(error => {
                console.error('Error adding actor:', error);
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.model.actor.castImage = file;
            this.previewImage = URL.createObjectURL(file);
        },
        resetForm() {
            this.model.actor.castName = '';
            this.model.actor.castImage = null;
            this.previewImage = '';
        }
    }
}
</script>
