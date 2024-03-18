
<template>
    <div>
        <div v-if="!manager">
            <h1 class="text-light">Customer Detail</h1>
            <h2 class="text-center text-danger my-5">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
                You are not authorized to access this page
            </h2>
        </div>
        <div v-if="manager">
            <div class="row">
                <div class="col">
                    <h2 class="text-light mb-4">Customer's information</h2>
                </div>
            </div>
            <div class="row">
                <div class="col">
                        <div class="row">
                            <div class="col-6">
                                <div class="mb-3">
                                    <label for="user_name" class="form-label text-light">User name</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="cus_username" name="cus_username" v-model="model.customer.username" required>
                                </div>
                                <div class="mb-3">
                                    <label for="fn" class="form-label text-light">Full name</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="fn" name="cus_full_name" v-model = "model.customer.name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="dob" class="form-label text-light">Date of birth</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="dob" name="cus_dob" v-model ="model.customer.dob" required>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label text-light">Email address</label>
                                    <input type="email" class="form-control text-light bg-dark border-0 shadow-none" readonly id="exampleInputEmail1" v-model ="model.customer.email" aria-describedby="emailHelp" name="cus_email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="pn" class="form-label text-light">Phonenumber</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="pn" name="cus_phonenumber" v-model ="model.customer.phoneNumber" required>
                                </div>
                                <div class="mb-5">
                                    <label for="address" class="form-label text-light">Address</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="a" name="cus_address" v-model ="model.customer.address" required>
                                </div>

                                <button type="submit" class="btn btn-danger shadow-none">Reset password (123456)</button>
                            </div>
                            <div class="col-3">
                                <div class="mb-3">
                                    <label for="address" class="form-label text-light">Purchased tickets</label>
                                    <input type="text" class="form-control text-light bg-dark border-0 shadow-none" readonly id="a" name="cus_address" value="12" required>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="col-12">
                                    <div class="row">
                                        <label for="image" class="form-label text-light">Customer image</label>
                                        <div class="row my-3" style="width: 20vmax;">
                                            <img id="cus_img" class="col-12 rounded-3 object-fit-cover mx-auto" :src="customer_image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>       
        </div>
    </div>
    
</template>

<script lang="ts">
    import axios from 'axios';
    export default{
        name: 'CustomerDetail',
        data(){
            return{
            model: {
                customer: {
                    username: '',
                    name: '',
                    dob: '',
                    email: '',
                    phoneNumber: '',
                    address: '',
                    image: '',
                }
            },
                customer_image: '',
                baseUrl: 'https://localhost:7071',
                manager: false,
            };
        },
        mounted(){
            this.getCustomer(this.$route.params.id);
            this.isManager();
        },
        methods:{
            isManager(){
                if(localStorage.getItem('role') == 'Manager'){
                    this.manager = true;
                }
            },
            getCustomer(customerId){
                axios.get(`https://localhost:7071/api/Customers/${customerId}`).then(response => {
                    this.model.customer = response.data;
                    this.customer_image = this.baseUrl + this.model.customer.image;
                    console.log(this.model.customer);
                }).catch(error => {
                    console.error('Error fetching customer:', error);
                });
            },
        }
    }

</script>