<template>
    <div>
      <!-- <header>
        <h1>Revenue statistics</h1>
      </header> -->
      <div class="date-selector">
          <!-- <button v-for="(label, index) in dateOptions" :key="index" @click="setDateRange(index)" :class="{ active: selectedDateIndex === index }">
            {{ label }}
          </button> -->
            <button v-for="(label, index) in dateOptions" :key="index" @click="setDateRange(index)"
                :class="{ active: selectedDateIndex === index, disabled: isFetchingData }"
                :disabled="isFetchingData">
                    {{ label }}
            </button>
        </div>
        <section>
            <div v-if="revenueForBank.length" class="stat-item">
            <FontAwesomeIcon icon="chart-line" class="stat-icon" />
            <div class="stat-content">
                <h2>Total revenue</h2>
                <p>{{ revenueThisMonth.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}</p>
            </div>
            </div>
            <div v-if="revenueForBank.length" class="stat-item">
            <FontAwesomeIcon icon="ticket" class="stat-icon" />
            <div class="stat-content">
                <h2>Total tickets sold</h2>
                <p>{{ totalOrdersThisMonth }} ticket(s)</p>
            </div>
            </div>
            <div v-if="revenueForBank.length" class="stat-item">
            <FontAwesomeIcon icon="building" class="stat-icon" />
            <div class="stat-content">
                <h2>Revenue by bank <img :src="revenueForBank[0].logo" style="width: 100px;" alt=""></h2>
                <p>
                {{ parseFloat(revenueForBank[0].sum).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                - {{ revenueForBank[0].account_name }}
                </p>
                
            </div>
            </div>
            <div v-if="revenueForGateway.length" class="stat-item">
            <FontAwesomeIcon icon="credit-card" class="stat-icon" />
            <div class="stat-content">
                <h2>Revenue by payment channel</h2>
                <p>
                {{ parseFloat(revenueForGateway[0].sum).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) }}
                - <img :src="revenueForGateway[0].logo_url" style="height: 30px;" alt=""> {{ revenueForGateway[0].account_name }} {{ revenueForGateway[0].name }} 
                </p>
            </div>
            </div>
        </section>
      <div>
          <canvas id="payos-chart"></canvas>
        </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import dayjs from 'dayjs';
  import localeData from 'dayjs/plugin/localeData'; 
  dayjs.extend(localeData);
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

  
  Chart.register(...registerables);
  
  export default {
    name: 'PayOSChart',
    components: {
        FontAwesomeIcon
    },
    data() {
      return {
        chart: null,
        revenueThisMonth: 0,
        totalOrdersThisMonth: 0,
        revenueForBank: [],
        revenueForGateway: [],
        selectedDateIndex: 3, // Default to "Tháng này"
        // dateOptions: ["Hôm qua", "Hôm nay", "Tuần này", "Tháng này", "Tháng trước", "Năm này", "Năm trước"],
        dateOptions: ["Yesterday", "Today", "This week", "This month", "Last month", "This year", "Last year"],
        dateRanges: this.calculateDateRanges(),
        isFetchingData: false,
      };
    },
    mounted() {
        // if(localStorage.getItem('PayOSToken')){
        //     this.fetchPayOSData();
        // }else{
            this.autoLogin();
        // }   
    },
    methods: {
        async autoLogin() {
            try {
                const response = await fetch('https://api-app.payos.vn/auth/sign-in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: 'kiendoan444@gmail.com',
                    password: '85bf746d3fd0cf4b90898cff6c3df38ff653bd4bbc1cd4d9d8995dcbbf0a46c988c9cb6093579d09b4a89d5458fe9164785296f4d4de072dde12102e03dd2c2f'
                })
                });

                if (!response.ok) {
                throw new Error('Đăng nhập tự động không thành công');
                }
                const data = await response.json();
                console.log('data',data);
                const accessToken = data.data.token;

                localStorage.setItem('PayOSToken', accessToken);

                this.fetchPayOSData();
            } catch (error) {
                console.error('Lỗi đăng nhập tự động:', error);
            }
        },
      calculateDateRanges() {
        const now = dayjs();
        return [
          { fromDate: now.subtract(1, 'day').startOf('day').unix(), toDate: now.subtract(1, 'day').endOf('day').unix() },
          { fromDate: now.startOf('day').unix(), toDate: now.endOf('day').unix() },
          { fromDate: now.startOf('week').unix(), toDate: now.endOf('day').unix() },
          { fromDate: now.startOf('month').unix(), toDate: now.endOf('day').unix() },
          { fromDate: now.subtract(1, 'month').startOf('month').unix(), toDate: now.subtract(1, 'month').endOf('month').unix() },
          { fromDate: now.startOf('year').unix(), toDate: now.endOf('day').unix() },
          { fromDate: now.subtract(1, 'year').startOf('year').unix(), toDate: now.subtract(1, 'year').endOf('year').unix() },
        ];
      },
      setDateRange(index) {
        this.selectedDateIndex = index;
        // this.$forceUpdate();
        this.fetchPayOSData();
      },
      async fetchPayOSData() {
        this.isFetchingData = true; 
        try{
            const { fromDate, toDate } = this.dateRanges[this.selectedDateIndex];
            const response = await fetch(`https://api-app.payos.vn/organizations/8ae05a573d3b11ef99770242ac110002/statistics/payment-link/chart?fromDate=${fromDate}&toDate=${toDate}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('PayOSToken')}`,
                },
            });
            // console.log('response',response);
            const data = await response.json();
            // console.log('data111',data);
    
            this.revenueThisMonth = data.data.totalPrice;
            this.totalOrdersThisMonth = data.data.totalOrder;
            this.revenueForBank = data.data.revenueForBank;
            this.revenueForGateway = data.data.revenueForGateway;
    
            const chartData = this.prepareChartData(data.data.orders);
            console.log('chartData',chartData);
              this.renderChart(chartData);
        }catch(error){
            console.error('Lỗi khi lấy dữ liệu PayOS:', error);
        }
      },
    prepareChartData(orders) {
      console.log('orders',orders);
        const datasets = orders.map((order, index) => ({
        label: order.name,
        // data: order.data,
        data: order.data.map(item => ({ ...item })), 
        backgroundColor: this.getBackgroundColor(index),
        borderColor: this.getBorderColor(index),
        borderWidth: 1,
        }));
        console.log('asd',datasets);
        datasets.forEach((dataset) => {
          dataset.data = dataset.data.map((data) => ({
            ...data,
            x: this.formatXValue(data.x) // Gọi hàm formatXValue để định dạng x
          }));
        });
        
        return { datasets };
    },
    formatXValue(xValue) {
      switch (this.selectedDateIndex) {
        case 0:
        case 1:
          return dayjs(xValue).format('YYYY-MM-DD-HH') + 'h';
        case 2:
          xValue = xValue.substring(0,8);
          return `${dayjs(xValue).format('YYYY-MM-DD')} ${dayjs(xValue).format('ddd')}`;
        case 3:
        case 4:
          return dayjs(xValue).format('YYYY-MM-DD');
        case 5:
        case 6:
          return dayjs(xValue).format('YYYY-MM');
        default:
          return dayjs(xValue).format('YYYY-MM-DD');
      }
    },
      getBackgroundColor(index) {
        const colors = ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 99, 132, 0.2)'];
        return colors[index % colors.length];
      },
      getBorderColor(index) {
        const colors = ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(255, 99, 132, 1)'];
        return colors[index % colors.length];
      },
      renderChart(chartData) {
        const ctx = document.getElementById('payos-chart').getContext('2d');
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: chartData,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                stacked: true,
              },
              x: {
                stacked: true,
              },
            },
          },
        });
        setTimeout(() => {
            this.isFetchingData = false;
        }, 1300);
      },
    },
  };
  </script>
  
  <style scoped>
  .disabled {
    pointer-events: none;
    opacity: 0.6; 
    }

  /* header {
    text-align: center;
    margin-bottom: 20px;
  } */
  
  .date-selector {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .stat-item {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  background-color: none;
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.stat-item .stat-icon {
  font-size: 32px;
  margin-right: 20px;
  color: red; 
}

.stat-content {
  flex: 1; 
}

.stat-item h2 {
  margin-bottom: 10px;
}

.stat-item p {
  margin: 0;
  color: #ddd;
}

  .date-selector button {
    background: none;
    border: 1px solid #ccc;
    color: white;
    padding: 10px 20px;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .date-selector button.active {
    background: #6c5ce7;
    border-color: #6c5ce7;
  }
  
   section {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    gap: 20px;
    margin: 2em 0;
  }
    
  /*
  section div {
    background-color: #2c3e50;
    color: white;
    padding: 20px;
    margin: 10px;
    border-radius: 8px;
    text-align: center;
    flex: 1;
  } */
  
  canvas {
    max-width: 100%;
    /* max-height: 70%; */
    margin-bottom: 5em;
  }
  </style>
  