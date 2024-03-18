<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <header>
        <div class="navbar navbar-expand-lg mt-0 fixed-top" style="background-color: transparent;">
                    <div class="container mx-auto p-0">
                        <RouterLink class="navbar-brand" to="/admin">
                            <img src="../../assets/image/NetFnix Full logo.png" alt="" height="50" class="d-inline-block align-text-top">
                        </RouterLink>
                        <div class="dropdown">
                            <img class="col-12 border " style="border-radius: 50%;object-fit: cover; overflow: hidden;height: 3vmax; width: 3vmax;" src="../../assets/image/Netflix-avt.png" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"
                                height="" alt="">
                            <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item bg-dark text-light" href="#">Login</a></li>
                            </ul>
                        </div>
                    </div>
        </div>
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

        <div class="wrapper" >
        <!-- <HelloWorld msg="You did it!" /> -->
        
        <nav class = "bg-dark mx-5  rounded ">
            <div class="btn-group-vertical my-3" role="group" aria-label="Basic example">
                <RouterLink to="/admin" class="btn border-0 rounded text-start" >Dashboard</RouterLink>
                <RouterLink to="/admin/actor" class="btn border-0 rounded text-start " >Actors management</RouterLink>
                <RouterLink to="/admin/customer" class="btn border-0 rounded text-start " >Customers management</RouterLink>
                <RouterLink to="/admin/director" class="btn border-0 rounded text-start " >Directors management</RouterLink>
                <RouterLink to="/admin/genre" class="btn border-0 rounded text-start " >Film genre management</RouterLink>
                <RouterLink to="/admin/movie" class="btn border-0 rounded text-start " >Movies management</RouterLink>
                <RouterLink to="/admin/room" class="btn border-0 rounded text-start " >Room management</RouterLink>
                <RouterLink to="/admin/schedule" class="btn border-0 rounded text-start " >Schedules management</RouterLink>
                <RouterLink to="/admin/staff" class="btn border-0 rounded text-start " >Staffs management</RouterLink>
            </div>
            <!-- <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink> -->
        </nav>
        </div>
  </header>
</template>

<script lang="ts">
    export default {
    name: 'HeaderAdmin',

    };
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