<template>
    <div v-if="!manager">
        <h1>Eidt Staff</h1>
        <h2 class="text-center text-danger my-5">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="manager">
        <h1>Edit Staff</h1>
        <div v-if="errorMessage" class="text-danger">{{ errorMessage }}</div>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label class="form-label text-light">Staff name</label>
                    <input type="text" v-model="model.staff.name" class="form-control bg-dark border-0 shadow-none text-light" required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff username</label>
                    <input type="text" v-model="model.staff.username" class="form-control bg-dark border-0 shadow-none text-light" required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff date of birth</label>
                    <input type="date" v-model="model.staff.dob" class="form-control bg-dark border-0 shadow-none text-light"  required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff email</label>
                    <input type="text" v-model="model.staff.email" class="form-control bg-dark border-0 shadow-none text-light"  required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff phonenumber</label>
                    <input type="text" v-model="model.staff.phoneNumber" class="form-control bg-dark border-0 shadow-none text-light"  required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff address</label>
                    <input type="text" v-model="model.staff.address" class="form-control bg-dark border-0 shadow-none text-light"  required>
                </div>
                <div class="mb-3">
                    <label class="form-label text-light">Staff password</label>
                    <input type="password" v-model="model.staff.password" class="form-control bg-dark border-0 shadow-none text-light" >
                </div>
                <div v-if="errorPassword" class="text-danger">{{ errorPassword }}</div>
                <div class="mb-3">
                    <label for="staff_role" class="form-label text-light">Staff Role</label>
                    <select v-model="model.staff.staffRole" class="form-select bg-dark border-0 shadow-none text-light" id="staff_role" name="staff_role" required>
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
        <button type="button" @click="updateStaff" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Update</button>
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
                    username: '',
                    dob: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    password: '',
                    staffRole: '',
                }
            },  
            previewImage: '',
            baseUrl: 'https://localhost:7071',
            errorMessage: '',
            errorPassword: '',
            manager: false
        }
    },
    mounted() {
        this.staffId = this.$route.params.id;
        this.getStaff(this.$route.params.id);
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
        getStaff(staffId) {
            axios.get(`https://localhost:7071/api/Staffs/${staffId}`).then(response => {
                console.log(response.data);
                this.model.staff = response.data;
                this.previewImage = this.baseUrl + this.model.staff.image;
                this.model.staff.dob = this.formatDate(this.model.staff.dob);
            }).catch(error => {
                console.error('Error fetching staff:', error);
            });                
        },
        updateStaff(){
            // if(this.model.staff.name == '' || this.model.staff.username == '' || this.model.staff.dob == '' || this.model.staff.email == '' || this.model.staff.phoneNumber == '' || this.model.staff.address == '' || this.model.staff.staffRole == ''){
            //     alert('Please fill all fields');
            //     return;
            // }
            if(!this.validateEmail(this.model.staff.email)){
                alert('Invalid email');
                return;
            }
            if(!this.validatePhoneNumber(this.model.staff.phoneNumber)){
                alert('Invalid phone number');
                return;
            }
            if(this.model.staff.password){
                if(!this.validatePassword(this.model.staff.password)){
                    alert('Invalid password');
                    return;
                }
            }
            // if(this.checkDuplicateStaff()){
            //     alert('Username or email already exists');
            //     return;
            // }
            const formData = new FormData();
            formData.append('id', this.staffId);
            formData.append('name', this.model.staff.name);
            formData.append('username', this.model.staff.username);
            formData.append('dob', this.model.staff.dob);
            formData.append('email', this.model.staff.email);
            formData.append('phoneNumber', this.model.staff.phoneNumber);
            formData.append('address', this.model.staff.address);
            if (typeof this.model.staff.password !== 'undefined' && this.model.staff.password !== '') {
                formData.append('passwordHash', this.model.staff.password);
            } else {
                formData.append('passwordHash', ''); // Hoặc giá trị mặc định khác bạn muốn truyền
            }
            formData.append('staffRole', this.model.staff.staffRole);
            formData.append('file', this.model.staff.image);

            axios.put(`https://localhost:7071/api/Staffs/${this.staffId}`, formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log(response.data);
                alert('Staff updated successfully');
                this.$router.push('/staff');
            }).catch(error => {
                console.error('Error updating staff:', error);
                alert('Error updating staff: ' + error.response.data);
                if (error.response && error.response.data && error.response.data.errors && error.response.data.errors.PasswordHash) {
                    this.errorPassword = error.response.data.errors.PasswordHash.join(', '); 
                } else {
                    this.errorMessage = 'An error occurred while updating staff.'; 
                }
            });
        },
        onFileChange(event) {
            const file = event.target.files[0];
            this.model.staff.image = file;
            this.previewImage = URL.createObjectURL(file);
        },
        // formatDate(date) {
        //     // Kiểm tra xem date có tồn tại không để tránh lỗi
        //     if (date) {
        //         const parts = date.split("/");
        //         return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
        //     } else {
        //         return ''; // Trả về chuỗi rỗng nếu không có date
        //     }
        // },
        formatDate(dateString) {
            const [day, month, year] = dateString.split('/');
            return `${year}-${month}-${day}`;
        },
    }
}
</script>
