<template>
    <div class="general-statistics">
      <div class="grid-container">
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="film" />
          </div>
          <div class="stat-details">
            <h3>Total movies</h3>
            <p>{{ totalMovies }}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="play-circle" />
          </div>
          <div class="stat-details">
            <h3>Number of movies showing</h3>
            <p>{{ moviesNowShowing }}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="clock" />
          </div>
          <div class="stat-details">
            <h3>Upcoming movies</h3>
            <p>{{ upcomingMovies }}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="stop-circle" />
          </div>
          <div class="stat-details">
            <h3>Number of movies stopped showing</h3>
            <p>{{ moviesStoppedShowing }}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="ticket-alt" />
          </div>
          <div class="stat-details">
            <h3>Number of tickets sold</h3>
            <p>{{ ticketsSold }}</p>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <font-awesome-icon icon="dollar-sign" />
          </div>
          <div class="stat-details">
            <h3>Total revenue</h3>
            <p>{{ totalSales ? totalSales.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    name: 'GeneralStatistics',
    components: {
      FontAwesomeIcon
    },
    data() {
      return {
        totalMovies: 0,
        moviesNowShowing: 0,
        upcomingMovies: 0,
        moviesStoppedShowing: 0,
        ticketsSold: 0,
        totalSales: 0
      };
    },
    methods: {
      fetchTotalMovies() {
        axios.get('https://localhost:7071/api/Movies/count-movie')
          .then(response => {
            this.totalMovies = response.data;
          })
          .catch(error => {
            console.error('Error fetching total movies:', error);
          });
      },
      fetchMoviesNowShowing() {
        axios.get('https://localhost:7071/api/Movies/count-movie-showing')
          .then(response => {
            this.moviesNowShowing = response.data;
          })
          .catch(error => {
            console.error('Error fetching movies now showing:', error);
          });
      },
      fetchUpcomingMovies() {
        axios.get('https://localhost:7071/api/Movies/count-movie-upcomming')
          .then(response => {
            this.upcomingMovies = response.data;
          })
          .catch(error => {
            console.error('Error fetching upcoming movies:', error);
          });
      },
      fetchMoviesStoppedShowing() {
        axios.get('https://localhost:7071/api/Movies/count-movie-end')
          .then(response => {
            this.moviesStoppedShowing = response.data;
          })
          .catch(error => {
            console.error('Error fetching movies stopped showing:', error);
          });
      },
      fetchTicketsSold() {
        axios.get('https://localhost:7071/api/Tickets/count-tickets-sold')
          .then(response => {
            this.ticketsSold = response.data;
          })
          .catch(error => {
            console.error('Error fetching tickets sold:', error);
          });
      },
      fetchTotalSales() {
        axios.get('https://localhost:7071/api/Tickets/get-total-income')
          .then(response => {
            this.totalSales = response.data;
          })
          .catch(error => {
            console.error('Error fetching total sales:', error);
          });
      }
    },
    created() {
      this.fetchTotalMovies();
      this.fetchMoviesNowShowing();
      this.fetchUpcomingMovies();
      this.fetchMoviesStoppedShowing();
      this.fetchTicketsSold();
      this.fetchTotalSales();
    }
  };
  </script>
  
  <style scoped>
  .general-statistics {
    margin-top: 20px;
  }
  
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 20px; 
  }
  
  .stat-item {
    display: flex;
    align-items: center; 
    background-color: none;
    color: white;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  }
  
  .stat-icon {
    margin-right: 20px; 
    font-size: 32px; 
    color: red; 
  }
  
  .stat-details {
    flex: 1;
  }
  
  .stat-details h3 {
    margin-bottom: 10px;
  }
  
  .stat-details p {
    margin: 0;
  }
  </style>
  