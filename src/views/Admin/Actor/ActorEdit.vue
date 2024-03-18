<!-- <template>
    <div>
        <h1>Edit Actor</h1>
        <div class="row">
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
                                <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="actor_img"  accept="image/png, image/jpg, image/jpeg" onchange="show_img()" required>
                                <div class="row my-3" style="width: 15vmax;">
                                    <img id="actor_img" class=" rounded-3 object-fit-cover mx-auto" :src="model.actor.castImage" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <button type="button" @click ="updateActor"  class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Update</button>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from 'axios';
    export default {
    name: 'ActorEdit',
    data() {
        return {
        model: {
            actor: {
            actorId: '',
            castName: '',
            castImage: ''
            }
        }
        };
    },
    mounted() {
        this.actorId = this.$route.params.id;
        this.getActor(this.$route.params.id);
        // console.log(this.$route.params.id);
    },
    methods: {
        getActor(actorId) {
        axios.get(`https://localhost:7071/api/Casts/${actorId}`).then(response => {
            console.log(response.data);
            this.model.actor = response.data;
        }).catch(error => {
            console.error('Error fetching actor:', error);
        });                
        },
        updateActor() {
        axios.put(`https://localhost:7071/api/Casts/${this.actorId}`, this.model.actor).then(response => {
            console.log(response.data);
            alert('Actor updated successfully');
            this.$router.push('/actor');
        }).catch(error => {
            console.error('Error updating actor:', error);
        });
        }
    }
    }
</script> -->
<template>
    <div>
        <h1>Edit Actor</h1>
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
                        <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="actor_img" accept="image/png, image/jpg, image/jpeg" @change="onFileChange" >
                        <div class="row my-3" style="width: 15vmax;">
                            <img id="actor_img" class="rounded-3 object-fit-cover mx-auto" :src="previewImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" @click="updateActor" class="btn btn-danger my-2 col-2" value="Update" name="submit_btn">Update</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'ActorEdit',
    data() {
        return {
            model: {
                actor: {
                    actorId: '',
                    castName: '',
                    castImage: ''
                }
            },
            baseUrl: 'https://localhost:7071',
            previewImage: '',
        };
    },
    mounted() {
        this.actorId = this.$route.params.id;
        this.getActor(this.$route.params.id);
    },
    methods: {
        getActor(actorId) {
            axios.get(`https://localhost:7071/api/Casts/${actorId}`).then(response => {
                console.log(response.data);
                this.model.actor = response.data;
                this.previewImage = this.baseUrl + this.model.actor.castImage;
            }).catch(error => {
                console.error('Error fetching actor:', error);
            });                
        },
        updateActor() {
            const formData = new FormData();
            formData.append('castName', this.model.actor.castName);
            formData.append('file', this.model.actor.castImage);
            formData.append('id', this.actorId);
            axios.put(`https://localhost:7071/api/Casts/${this.actorId}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Actor updated successfully');
                this.$router.push('/admin/actor');
            }).catch(error => {
                console.error('Error updating actor:', error);
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if(file == null){
                this.model.actor.castImage = this.previewImage;
            }
            this.model.actor.castImage = file;
            this.previewImage = URL.createObjectURL(file);
        }
    }
}
</script>
