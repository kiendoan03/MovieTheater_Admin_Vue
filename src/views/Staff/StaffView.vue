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
                <tr v-for="(staff, index) in paginatedStaffs" :key="staff.id">
                    <th scope="row" class="col-1">{{ index + 1 + (currentPage - 1) * pageSize }}</th>
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
          <div class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
          </div>
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
      auth: false,
      currentPage: 1,
      pageSize: 4,
      totalPages: 1,
    }
  },
  computed: {
    paginatedStaffs() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.staffs.slice(start, end);
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
        this.totalPages = Math.ceil(this.staffs.length / this.pageSize);
        console.log(this.staffs);
      }).catch(error => {
        console.error('Error fetching staffs:', error);
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
