<template>
    <div>
        <h1 class="text-center">Login Admin</h1>
        <div class="row justify-content-center my-5">
            <div class="col-8">
                <div class="mb-3">
                    <label for="username" class="form-label text-light">Username</label>
                    <input type="text" v-model="model.account.username" class="form-control bg-dark border-0 shadow-none text-light" id="username" name="username" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label text-light">Password</label>
                    <input type="password" v-model="model.account.password" class="form-control bg-dark border-0 shadow-none text-light" id="password" name="password" required>
                </div>
                <button type="button" @click="handleLogin" class="btn btn-danger shadow-none">Login</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

    export default {
        name: 'LoginView',
        data (){
            return {
                model: {
                    account: {
                        username: '',
                        password: '',
                        role: ''
                    }
                }
            }
        },
        methods: {
            validatePassword(password) {
                const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
                return re.test(password);
            },
            handleLogin() {
                if(this.model.account.username == '' || this.model.account.password == '') {
                    alert('Please fill in all fields');
                    return;
                }
                if(!this.validatePassword(this.model.account.password)) {
                    alert('Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, and be between 8-15 characters');
                    return;
                }
                axios.post('https://localhost:7071/api/Account/login', this.model.account).then(response => {
                    if(response.data.role == 'Customer' ) {
                        alert('You are not admin');
                        this.$router.push('/login');
                        this.freshForm();
                        return;
                    }else{
                        if(response.data.role == 'Staff'){
                            console.log(response.data);
                            alert('Login successfully - Staff');
                            // this.$router.push('/');
                            window.location.href = '/';
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('role', response.data.role);
                            localStorage.setItem('id_staff', response.data.id);
                            localStorage.setItem('name_staff', response.data.name);
                        }else if(response.data.role == 'Manager'){
                            console.log(response.data);
                            alert('Login successfully - Manager');
                            // this.$router.push('/');
                            window.location.href = '/';
                            localStorage.setItem('token', response.data.token);
                            localStorage.setItem('role', response.data.role);
                            localStorage.setItem('id_staff', response.data.id);
                            localStorage.setItem('name_staff', response.data.name);
                        }
                    }
                }).catch(error => {
                    console.error('Error login:', error);
                });
            },
            freshForm() {
                this.model.account.username = '';
                this.model.account.password = '';
            }
        }
    }

</script>

<style scoped>

</style>