<template>
    <div>
        <h1>Add new Room</h1>
        <div class="row">
            <div class="col-8">
                <div class="mb-3">
                    <label for="room_name" class="form-label text-light">Room name</label>
                    <input type="text" v-model="model.room.roomName" class="form-control bg-dark border-0 shadow-none text-light" id="room" name="room_name" required>
                </div>
                <div class="mb-3">
                    <label for="room_name" class="form-label text-light">Room type</label>
                    <select class="form-select bg-dark border-0 shadow-none text-light" v-model="model.room.roomTypeId" id="room" name="room_type" required>
                        <option value="1">Normal</option>
                        <option value="2">VIP</option>
                    </select>
                </div>
            </div>
        </div>
        <button type="button" @click="saveRoom" class="btn btn-danger my-2 col-2" value="Add" name="submit_btn">Save</button>
    </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
    name: 'RoomCreate',
    data() {
        return {
            model: {
                room: {
                    roomName: '',
                    roomTypeId:''
                }
            },  
        }
    },
    methods: {
        saveRoom() {
            axios.post('https://localhost:7071/api/Rooms', this.model.room).then(response => {
                console.log(response.data);
                alert('Room added successfully');
                this.$router.push('/admin/room');
                this.resetForm();
            }).catch(error => {
                console.error('Error adding room:', error);
            });
        },
        resetForm() {
            this.model.room.roomName = '';
        }
    }
}
</script>
