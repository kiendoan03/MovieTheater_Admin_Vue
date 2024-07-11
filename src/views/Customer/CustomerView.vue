<script setup lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

library.add(fas)
</script>

<template>
  <div class="mb-5">
    <div v-if="!auth">
      <h1 class="text-light">Customer management page</h1>
      <h2 class="my-5 text-danger text-center">
        <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
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
                  <tr v-for="(customer, index) in paginatedCustomers" :key="customer.id">
                      <th scope="row" class="col-1">{{ index + 1 + (currentPage - 1) * pageSize }}</th>
                      <td class="col-3">{{ customer.name }}</td>
                      <td class="col-3">{{ customer.email }}</td>
                      <td class="col-3">
                          <img class="col-4" :src="customer.image" />
                      </td>
                      <td class="col-2">
                          <RouterLink :to="'/customer/detail/' + customer.id" type="button" class="btn btn-outline-light my-1" tabindex="-1" role="button" aria-disabled="true">
                              <font-awesome-icon :icon="['fas', 'eye']" />
                          </RouterLink>
                      </td>
                  </tr>
              </tbody>
          </table>
          <div class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
          </div>
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
      currentPage: 1,
      pageSize: 4,
      totalPages: 1,
    }
  },
  computed: {
    paginatedCustomers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.customers.slice(start, end);
    }
  },
  mounted() {
    this.getCustomers();
    this.isAuth();
  },
  methods: {
    isAuth() {
      if (localStorage.getItem('token') && localStorage.getItem('role') != 'Customer') {
        this.auth = true;
        console.log('auth', this.auth);
      }
    },
    getCustomers() {
      axios.get('https://localhost:7071/api/Customers').then(response => {
        this.customers = response.data.map(customer => ({
          id: customer.id,
          name: customer.name,
          email: customer.email,
          image: this.baseUrl + customer.image
        }));
        this.totalPages = Math.ceil(this.customers.length / this.pageSize);
        console.log(this.customers);
      }).catch(error => {
        console.error('Error fetching customers:', error);
      });
    },
    changePage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #343a40;
  color: white;
  border: 1px solid #6c757d;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  color: white;
}
</style>