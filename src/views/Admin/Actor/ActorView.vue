<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div>
    <h1>Actor management page</h1>
    <RouterLink to="/admin/actor/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New actor
    </RouterLink>
    <div class="mt-2">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Actor name</th>
                    <th scope="col">Actor image</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(actor, index) in actors" :key="actor.id">
                    <th scope="row" class="col-1">{{ index + 1 }}</th>
                    <td class="col-5">{{ actor.castName}}</td>
                    <td class="col-4">
                        <img class="col-4" :src="actor.castImage" />
                    </td>
                    <td class="col-2">
                        <RouterLink :to="'/admin/actor/edit/' + actor.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </RouterLink>
                            <button @click ="deleteCast(actor.id)" type = "button" class="btn btn-outline-danger my-1 mx-1">
                                <FontAwesomeIcon :icon="['fas', 'trash']" />
                            </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'ActorView',
  data() {
    return {
      actors: [],
      baseUrl: 'https://localhost:7071'
    }
  },
  mounted() {
    this.getActors();
  },
  methods: {
    getActors() {
      axios.get('https://localhost:7071/api/Casts').then(response => {
        // Xử lý dữ liệu trả về
        this.actors = response.data.map(actor => ({
          castName: actor.castName,
          id: actor.id,
          castImage: this.baseUrl + actor.castImage 
        }));
        console.log(this.actors);
      }).catch(error => {
        console.error('Error fetching actors:', error);
      });
    },
    deleteCast(castId){
        axios.delete(`https://localhost:7071/api/Casts/${castId}`).then(response => {
            console.log(response.data);
            alert('Actor deleted successfully');
            this.getActors();
        }).catch(error => {
            console.error('Error deleting actor:', error);
        });
    }
  }
}
</script>

