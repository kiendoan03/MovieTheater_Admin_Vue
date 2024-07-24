<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { fas } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    library.add(fas)
</script>

<template>
    <header>
        <div class="navbar navbar-expand-lg mt-0 fixed-top" style="background-color: transparent;">
                    <div class="container mx-auto p-0">
                        <RouterLink class="navbar-brand" to="/">
                            <img src="../assets/image/NetFnix Full logo.png" alt="" height="50" class="d-inline-block align-text-top">
                        </RouterLink>
                        <div class="dropdown">
                            <img class="col-12 border " v-if="auth" style="border-radius: 50%;object-fit: cover; overflow: hidden;height: 3vmax; width: 3vmax;" :src="image" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                height="" alt="">
                                <img class="col-12 border " v-if="!auth" style="border-radius: 50%;object-fit: cover; overflow: hidden;height: 3vmax; width: 3vmax;" src="../assets/image/Netflix-avt.png" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                height="" alt="">
                            <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                                <li><RouterLink v-if="!auth" to="/login" class="dropdown-item bg-dark text-light"><font-awesome-icon :icon="['fas', 'right-to-bracket']" style="color: #ffffff;" /> Login</RouterLink></li>
                                <li><b v-if="auth" class="dropdown-item bg-dark text-light"><font-awesome-icon :icon="['fas', 'user']" style="color: #ffffff;" /> {{ name }} - {{ role }}</b></li>
                                <li><Button v-if="auth" @click="logout" class="dropdown-item bg-dark text-light"><font-awesome-icon :icon="['fas', 'right-from-bracket']" style="color: #ffffff;" /> Logout</Button></li>
                            </ul>
                        </div>
                    </div>
        </div>
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

        <div class="wrapper" >
        <!-- <HelloWorld msg="You did it!" /> -->
        
        <nav class = "bg-dark mx-5  rounded ">
            <div class="btn-group-vertical my-3" role="group" aria-label="Basic example">
                <RouterLink to="/" class="btn border-0 rounded text-start" >Dashboard</RouterLink>
                <RouterLink to="/actor" class="btn border-0 rounded text-start " >Actors management</RouterLink>
                <RouterLink to="/customer" class="btn border-0 rounded text-start " >Customers management</RouterLink>
                <RouterLink to="/director" class="btn border-0 rounded text-start " >Directors management</RouterLink>
                <RouterLink to="/genre" class="btn border-0 rounded text-start " >Film genre management</RouterLink>
                <RouterLink to="/movie" class="btn border-0 rounded text-start " >Movies management</RouterLink>
                <RouterLink to="/room" class="btn border-0 rounded text-start " >Room management</RouterLink>
                <RouterLink to="/schedule" class="btn border-0 rounded text-start " >Schedules management</RouterLink>
                <RouterLink to="/staff" class="btn border-0 rounded text-start " >Staffs management</RouterLink>
            </div>
            <!-- <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink> -->
        </nav>
        </div>
  </header>
</template>

<script lang="ts">
import axios from 'axios';
    export default {
    name: 'HeaderAdmin',
    data: function() {
        return {
            auth: false,
            image: '',
            baseUrl: 'https://localhost:7071',
            name: localStorage.getItem('name_staff'),
            role: localStorage.getItem('role')
        }
    },
    mounted() {
      this.getStaffById(localStorage.getItem('id_staff'));
        this.auth = localStorage.getItem('role') != 'Customer' && localStorage.getItem('token') != null;
        console.log(this.auth);
    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('id_staff');
            localStorage.removeItem('name_staff');
            // this.$router.push('/login');
            window.location.href = '/login';
        },
        getStaffById(staffId){
          axios.get(`https://localhost:7071/api/Staffs/${staffId}`).then(response => {
                console.log(response.data);
                this.image = this.baseUrl + response.data.image;
            }).catch(error => {
                console.error('Error fetching staff:', error);
            });       
        }
    }
  }
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}


/* .logo {
  display: block;
  margin: 0 auto 2rem;
} */

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text-active);  
}

nav a:not(router-link-exact-active){
  color: var(--color-text); 
}
nav a:not(router-link-exact-active):hover{
  background-color: var(--color-hover);
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: var(--color-hover);
  color: var(--color-text);
}

nav a {
  display:inline-flex;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  height: 2em;
  align-items: center;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    height: 100%;
    /* place-items: center; */
    padding-right: calc(var(--section-gap) / 2);
  }

  /* .logo {
    margin: 0 2rem 0 0;
  } */

  /* header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  } */

  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
}
</style>