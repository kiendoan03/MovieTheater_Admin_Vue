<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)

</script>

<template>
  <div>
    <div v-if="!auth">
      <h1 class="text-light">Customer management page</h1>
      <h2 class="my-5 text-danger text-center">
        You are not authorized to access this page
      </h2>
    </div>
    <div v-if="auth">
      <h1>Customer management page</h1>
      <div class="mt-5">
          <table class="table table-dark table-hover">
              <thead>
                  <tr>
                      <th scope="col">No</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                  </tr>
              </thead>
              <tbody class="table-group-divider">
                  <tr v-for="(customer, index) in customers" :key="customer.id">
                      <th scope="row" class="col-1">{{ index + 1 }}</th>
                      <td class="col-3">{{ customer.name}}</td>
                      <td class="col-3">{{ customer.email}}</td>
                      <td class="col-3">
                          <img class="col-4" :src="customer.image" />
                      </td>
                      <td class="col-2">
                          <RouterLink v-if="manager" :to="'/customer/detail/' + customer.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                              <font-awesome-icon :icon="['fas', 'eye']" />
                          </RouterLink>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>  
    </div>
    
  </div>
</template>

<script lang="ts">

export default {
  name: 'CustomerView',
  data() {
    return {
      customers: [],
      baseUrl: 'https://localhost:7071',
      auth: false,
      manager: false,
    }
  },
  mounted() {
    this.getCustomers();
    this.isAuth();
    this.isManager();
  },
  methods: {
    isAuth() {
      if (localStorage.getItem('token') && localStorage.getItem('role') != 'Customer'){
        this.auth = true;
        console.log('auth', this.auth);
      }
    },
    isManager(){
      if(localStorage.getItem('role') == 'Manager'){
        this.manager = true;
      }
    },
    getCustomers() {
      axios.get('https://localhost:7071/api/Customers').then(response => {
        // Xử lý dữ liệu trả về
        this.customers = response.data.map(customer => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          image: this.baseUrl + customer.image
        }));
        console.log(this.customers);
      }).catch(error => {
        console.error('Error fetching customers:', error);
      });
    },
  }
}
</script>

