<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div v-if="!auth">
    <h1>Staff manager page</h1>
    <h2 class="text-center text-danger my-5">
      <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
      You are not authorized to access this page
    </h2>
  </div>
  <div v-if="auth">
    <h1>Staff management page</h1>
    <RouterLink to="/staff/create" type="button" class="btn btn-outline-light my-4" tabindex="-1" role="button" aria-disabled="true">
        <font-awesome-icon :icon="['fas', 'fa-plus']"></font-awesome-icon> New staff
    </RouterLink>
    <div class="mt-2">
        <table class="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">No</th>
                    <th scope="col">Full name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Image</th>  
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="(staff, index) in staffs" :key="staff.id">
                    <th scope="row" class="col-1">{{ index + 1 }}</th>
                    <td class="col-3">{{ staff.name}}</td>
                    <td class="col-3">{{ staff.email}}</td>
                    <td class="col-3">
                        <img class="col-4" :src="staff.image" />
                    </td>
                    <td class="col-3" v-if="staff.staffRole == 0">Manager</td>
                    <td class="col-3" v-if="staff.staffRole == 1">Staff</td>
                    <td class="col-2">
                        <RouterLink :to="'/staff/edit/' + staff.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                            <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                        </RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>  
  </div>
</template>

<script lang="ts">

export default {
  name: 'StaffView',
  data() {
    return {
      staffs: [],
      baseUrl: 'https://localhost:7071',
      auth: false
    }
  },
  mounted() {
    this.getStaffs();
    this.isAuth();
  },
  methods: {
    isAuth() {
      if (localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
        this.auth = true;
      }
    },
    getStaffs() {
      axios.get('https://localhost:7071/api/Staffs').then(response => {
        // Xử lý dữ liệu trả về
        this.staffs = response.data.map(staff => ({
          id: staff.id,
          name: staff.name,
          email: staff.email,
          staffRole: staff.staffRole,
          image: this.baseUrl + staff.image
        }));
        console.log(this.staffs);
      }).catch(error => {
        console.error('Error fetching staffs:', error);
      });
    },
  }
}
</script>

