<template>
    <div v-if="!manager">
        <h1>Add Staff</h1>
        <h2 class="text-center text-danger my-5">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager">
        <h1>Add Staff</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="staff_name" class="form-label text-light">Staff name</label>
                    <input type="text" v-model="model.staff.name" class="form-control bg-dark border-0 shadow-none text-light" id="staff" name="staff_name" required>
                </div>
                <div class="mb-3">
                    <label for="staff_name" class="form-label text-light">Staff username</label>
                    <input type="text" v-model="model.staff.userName" class="form-control bg-dark border-0 shadow-none text-light" id="staff" name="staff_name" required>
                </div>
                <div class="mb-3">
                    <label for="staff_name" class="form-label text-light">Staff date of birth</label>
                    <input type="date" v-model="model.staff.dob" class="form-control bg-dark border-0 shadow-none text-light" id="staff" name="staff_name" required>
                </div>
                <div class="mb-3">
                    <label for="actor_name" class="form-label text-light">Staff email</label>
                    <input type="text" v-model="model.staff.email" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                </div>
                <div class="mb-3">
                    <label for="actor_name" class="form-label text-light">Staff phonenumber</label>
                    <input type="text" v-model="model.staff.phonenumber" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                </div>
                <div class="mb-3">
                    <label for="actor_name" class="form-label text-light">Staff address</label>
                    <input type="text" v-model="model.staff.address" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                </div>
                <div class="mb-3">
                    <label for="actor_name" class="form-label text-light">Staff password</label>
                    <input type="text" v-model="model.staff.password" class="form-control bg-dark border-0 shadow-none text-light" id="actor" name="actor_name" required>
                </div>
                <div class="mb-3">
                    <label for="staff_role" class="form-label text-light">Staff Role</label>
                    <select v-model="model.staff.role" class="form-select bg-dark border-0 shadow-none text-light" id="staff_role" name="staff_role" required>
                        <option value="1">Staff</option>
                        <option value="0">Manager</option>
                    </select>
                </div>
            </div>
            <div class="col-4">
                <div class="col-12">
                    <div class="row">
                        <label for="image" class="form-label text-light">Staff image</label>
                        <input class="form-control bg-dark border-0 shadow-none text-light" type="file" id="image" name="staff_img" accept="image/png, image/jpg, image/jpeg" @change="onFileChange" required>
                        <div class="row my-3" style="width: 15vmax;">
                            <img id="staff_img" class="rounded-3 object-fit-cover mx-auto" :src="previewImage"  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button type="button" @click="saveStaff" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Save</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'DirectorCreate',
    data() {
        return {
            model: {
                staff: {
                    name: '',
                    image: null,
                    userName: '',
                    dob: '',
                    email: '',
                    phonenumber: '',
                    address: '',
                    password: '',
                    role: '',
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
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        validatePhoneNumber(phoneNumber) {
            const re = /^\d{10,15}$/;
            return re.test(phoneNumber);
        },
        validatePassword(password) {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
            return re.test(password);
        },
        checkDuplicateStaff() {
            axios.get('https://localhost:7071/api/Customers/check-duplicate-staff?username=' + this.model.staff.username + '&email=' + this.model.staff.email)
            .then(response => {
                // if (response.status === 200) {
                //   alert('Username or email already exists');
                //   return ;
                // }
                return response.data;
            })
            .catch(error => {
                console.error('Error checking duplicate staff:', error.response.data);
            });
        },
        saveStaff() {
            if(this.model.staff.name == '' || this.model.staff.userName == '' || this.model.staff.dob == '' || this.model.staff.email == '' || this.model.staff.phonenumber == '' || this.model.staff.address == '' || this.model.staff.password == '' || this.model.staff.role == ''){
                alert('Please fill all fields');
                return;
            }
            if(!this.validateEmail(this.model.staff.email)){
                alert('Invalid email');
                return;
            }
            if(!this.validatePhoneNumber(this.model.staff.phonenumber)){
                alert('Invalid phone number');
                return;
            }
            if(!this.validatePassword(this.model.staff.password)){
                alert('Invalid password');
                return;
            }
            // if(this.checkDuplicateStaff()){
            //     alert('Username or email already exists');
            //     return;
            // }
            const formData = new FormData();
            formData.append('name', this.model.staff.name);
            formData.append('userName', this.model.staff.userName);
            formData.append('DOB', this.model.staff.dob);
            formData.append('email', this.model.staff.email);
            formData.append('phoneNumber', this.model.staff.phonenumber);
            formData.append('address', this.model.staff.address);
            formData.append('passwordHash', this.model.staff.password);
            formData.append('staffRole', this.model.staff.role);
            formData.append('file', this.model.staff.image);

            axios.post('https://localhost:7071/api/Staffs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Staff added successfully');
                this.$router.push('/staff');
            }).catch(error => {
                console.error('Error adding staff:', error);
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.model.staff.image = file;
            this.previewImage = URL.createObjectURL(file);
        },
    }
}
</script>
