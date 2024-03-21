<script setup lang = "ts">
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)

</script>
<template>
    <div v-if="!auth">
        <h1>Schedule Detail</h1>
        <h2 class="my-5 text-danger text-center">
            <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            You are not authorized to access this page
        </h2>
    </div>
    <div v-if="auth">
        <h1>{{this.model.room.roomName}}</h1>
        <div v-if ="this.model.room.roomTypeId == 1"  class="row mx-3 my-3">
            <div class="col-12">
                <div class="row screen mb-5">
                    <img src="../../assets/image/bg-screen.png" style="object-fit: cover; width: 100%;" alt="">
                </div>
                <div class="row seat d-flex col-12 " style="margin-top: 1vmax;">
                    <div class="col-1">
                        <div class="row">
                            <div class="col-12 text-center  fw-bolder fs-4" style="height: 2.5vmax;">
                            </div>
                           
                                <div  class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    A
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    B
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    C
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    D
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    E
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    F
                                </div>
                            </div>
                        </div>
                        <div class="col-11">
                                <div class="row mb-3">
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        1
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        2
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        3
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        4
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        5
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        6
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        7
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        8
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        9
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        10
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        11
                                    </div>
                                    <div class="col-1 text-center text-secondary fw-bolder fs-4">
                                        12
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.tickets" :key="seat.id" class="col-1">
                                        <div v-if="seat.seats.seatTypeId == 1  && seat.status == 0"  class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAr0lEQVR4nO2QQQrCMBBFc4EWdO+6Z5FuCsVLSsE72Eu4rt0q6AWeBFIRaWxnmkKlecsh89/kGxNZLcAOqIAncuzOCcg00hvTudssidj+NBRHiVhTr4+HRByUKP5VdQIUwGVCww1Q2qzRVX8csHEBGulWIsqBFrgCezc7KMSlL68X9+B9tZulCnHiy+vle9s3H2Iob/liLf8nDo2J4o71Vm0CM0ZcA+cZxPUcuZFl8wJRIS97SX64DQAAAABJRU5ErkJggg=="></div>
                                        <div v-if="seat.seats.seatTypeId == 1  && seat.status == 1"  class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVR4nO2UUQqCQBCGvUDFjM89dxNnRIggOl2Rs0ovIXSHukTP1WtBXaDYyAhyaVctivxgXkT/b/1x9LyGvwWmQRcUZ6DohIrPLqOfAaGFn1LPWYqK967CpxE66Cx7seKssvQu57mD2L1eY+1CR2txbW97m0ZsxJ/0W34SDkB4XaHiDcbBUGdZV53TmUVwDSghbY8DtBZBTBEo2oHQFiQMrx9awiNncRwMTXmF6BseT62vYcptV3Feb1FeIaY1KLs+1muF3yYuy++J8VO/TmzE6l+q9mrmtVhohcLL2sXyntyG7+YCA4EH4/PVpiIAAAAASUVORK5CYII="></div>
                                        <div v-if="seat.seats.seatTypeId == 1  && seat.status == 2"  class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA5klEQVR4nO2UUQqCQBCGvUDFjM89dxNnRIggOl2Rs0ovIXSHukTP1WtBXaDYyAhyaVctivxgXkT/b/1x9LyGvwWmQRcUZ6DohIrPLqOfAaGFn1LPWYqK967CpxE66Cx7seKssvQu57mD2L1eY+1CR2txbW97m0ZsxJ/0W34SDkB4XaHiDcbBUGdZV53TmUVwDSghbY8DtBZBTBEo2oHQFiQMrx9awiNncRwMTXmF6BseT62vYcptV3Feb1FeIaY1KLs+1muF3yYuy++J8VO/TmzE6l+q9mrmtVhohcLL2sXyntyG7+YCA4EH4/PVpiIAAAAASUVORK5CYII="></div>
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.tickets" :key="seat.id" class="col-1">
                                        <div v-if="seat.seats.seatTypeId == 2 && seat.status == 0" class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC3klEQVR4nO2ZS2xNQRjH+2AtoYIGi6ZRUY+VhJSVakKIRyXUVoSdZ1KxsusOVeq5IPFohERiZWHhkXhtPBMb9SoRxOaqaNGffPK/nFztvWfmnnvuIee3anpmvu/7z3wz883cioqUlJSUlJSUlH8XYBSwBjgBPAE+AENEh9kym4+B40Cr+YxaRBvwgvh5DqyNQkC1RqfcHAOqihFyhOTQ7StiNcljhU9KlWNNFKLXYnMRspTk0uIi5CjJpdtFyF2Sy20XITXAaKAWaAa6gEwZgs7I9yLFYjHVhBYygrgJwPkYRfSYT99gF8rAG2AA6APOAQv0vRLoiEFEh/kKE9NwddThAsYPqV1liWemRz5CxxQUUqjD745qP7FEayaTTSfXmLJT50KT+h0kerq8Y9JUunBWzhYTPc2y7R6TFpELfXJm22HU1Mq2e0zaCVz4biW16rEfRIfZqpZt8+HCgAl56+F0nEbuPdHxTjbHe/Tt88lHY4mcXiI6LhZRsP5aI00ed+9OOZ2j0rpYngEzZfOAY1+LfX52C+507PwZmOZVPuSvLBqAfsdY9gcNVHmIeQ2sK7qI+1OkLgPqgKnArZAzsW/Yu7xNEXCG8mD11WaVP4XWyWlgXpgRihsb3XrgAfBNZ9TLkRq7THUcPAVO6b6xHZgb+LYDWAXs1YPgteCZlSQhj4ApwDZgj3L9Ts7DnKVaO7AJmCVRiRNyFWjUE2mYtNsI7EqikGz6TAbuFSjrW3XWffIR8iUeLZwExuakVfCsatRsBOvBQRchD4mP6Xrdz2VIF7jc3avXRUjY21mxvAImBUqkj8D9wPc27Wx/3whDCqn3KKV9sINtvf62BwUTNQbYDXzVLwEbAu3tjKkLLURibG8vNZdVX7UAs/UwaKm0HJgBrAS2BNpvdRIRENOukSklF5Q+gzn/v6Kn237FsNNLRECMjVi5aShKREBMXpJu/78UcjOPn+sltn8jjJGfT8zJxA5Aeb8AAAAASUVORK5CYII="></div>
                                        <div v-if="seat.seats.seatTypeId == 2 && seat.status == 1" class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADvElEQVR4nO1Z3WtUVxC/jfUtmsy5roovYgmKIIj4oKKlVpM7s7FSaBU/3vwPRPx4XB9EH/sRrR9JvDM3mkq0IKVQ+lToB5FCQUUfLBgFo4iiIFEx8WPLnN00UTfuPbs3d1PZgXlYdu+Z32/mN+fOOet5datb3epWt7rVrW7/Y/v1kw8N0yZg7ALGq4bxvmF6ZYTyibiuxXjfCF0xQp0mDL7UmIlyAMZthvFmYqDj+w2Q7JbqGfRtnmazkz6B/OvVwhNeLtdQMQ8jdKzmJGTU8bsKSeAXtQdPr7kv+Lm7pGrTE/l3S4wGFFtsHiDUXnPQMiGZwEVWx2sOWBLoFRD8q/aAqaQD44XYRBpPfzbLO758ut/VOs8ItoJQBzANpQ+ahjS2H9J6xaKYLLZqbHbvujmGqS81IoxnNGZFYJt78GNdAIRuG8ZhEBw0jN+D0Br7g7z3gWE8lAKJQxorFqYSc9TRMosfsbOPJTOJlWE8Y0m4YBq1sg+Mf9DzvEzYPncyegaYhkbl5IqpUDqXYGF2tT4HTIcTJyLUUTEmLaVjwF6bsShoS15a2FqoRgWYbBM5ZQ0HNVhha06WiK9bbGGycMekO4FTQMYXdqS2Iz6+TLAaL+0clcs1aAxHTMOq9TuuQWfIet9KQPBeUkSA6a6u2dhNGednixVx1WMeOJstNvz5BIn8UMXA2utpx7uevUHoG7u7RMFSHa0TkNV1iNqWFJKD37rJil6B4Cq7BSswx+w9niXZhV7C5vfgIhB84pjUr8dWyOUa3MngLYhoa9VDXHFIBQm2G8YfrcetBONXJc/yWiLDdDop3Tsm5lpjZ/tiP8quA6aojBRPmZBWls1QTYgI7rJ3ZkL/mKhtxbt+G7vU6RHAe3rZB4L9zV3t84HxUVH3a0DwrBG8VOruYEoRAaGDTULL9EbRcLBDj7BmrDq/6KWg3YpDWumHuHb8zjqliOjVDghKDMkNzu2jzJQlor0wMwpaQHD/hO8xpj/nRBsXgNC5iqQFjE9T6pMHPgefAuOBEpXobz6lfUN/v/HdiENF8HJKRPIQ4l4QOvl2NfCm7aG3qzQQn0jc01kCbsGO7Uw/Fe8ERvTzzM6NLYbxYckTYRzLREGL8yhdoTf2UUbPH/pmB8FV+jdCgRxd1P9jtE/GVeN5U/eGjzwX0xdUKtIS3KOJKwyLOHq++bmJNyyHMKA3Zq+dTiT+I8O0zwg+S0tmZkLHZ8C026t2Iq01Eb8HF3lJWLlAU33995EI/jFhIKbfJnd9/D3OIv8CqtwTGaSLUnQAAAAASUVORK5CYII="></div>
                                        <div v-if="seat.seats.seatTypeId == 2 && seat.status == 2" class="col-12 text-center mb-5"><img style="width: 1.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADvElEQVR4nO1Z3WtUVxC/jfUtmsy5roovYgmKIIj4oKKlVpM7s7FSaBU/3vwPRPx4XB9EH/sRrR9JvDM3mkq0IKVQ+lToB5FCQUUfLBgFo4iiIFEx8WPLnN00UTfuPbs3d1PZgXlYdu+Z32/mN+fOOet5datb3epWt7rVrW7/Y/v1kw8N0yZg7ALGq4bxvmF6ZYTyibiuxXjfCF0xQp0mDL7UmIlyAMZthvFmYqDj+w2Q7JbqGfRtnmazkz6B/OvVwhNeLtdQMQ8jdKzmJGTU8bsKSeAXtQdPr7kv+Lm7pGrTE/l3S4wGFFtsHiDUXnPQMiGZwEVWx2sOWBLoFRD8q/aAqaQD44XYRBpPfzbLO758ut/VOs8ItoJQBzANpQ+ahjS2H9J6xaKYLLZqbHbvujmGqS81IoxnNGZFYJt78GNdAIRuG8ZhEBw0jN+D0Br7g7z3gWE8lAKJQxorFqYSc9TRMosfsbOPJTOJlWE8Y0m4YBq1sg+Mf9DzvEzYPncyegaYhkbl5IqpUDqXYGF2tT4HTIcTJyLUUTEmLaVjwF6bsShoS15a2FqoRgWYbBM5ZQ0HNVhha06WiK9bbGGycMekO4FTQMYXdqS2Iz6+TLAaL+0clcs1aAxHTMOq9TuuQWfIet9KQPBeUkSA6a6u2dhNGednixVx1WMeOJstNvz5BIn8UMXA2utpx7uevUHoG7u7RMFSHa0TkNV1iNqWFJKD37rJil6B4Cq7BSswx+w9niXZhV7C5vfgIhB84pjUr8dWyOUa3MngLYhoa9VDXHFIBQm2G8YfrcetBONXJc/yWiLDdDop3Tsm5lpjZ/tiP8quA6aojBRPmZBWls1QTYgI7rJ3ZkL/mKhtxbt+G7vU6RHAe3rZB4L9zV3t84HxUVH3a0DwrBG8VOruYEoRAaGDTULL9EbRcLBDj7BmrDq/6KWg3YpDWumHuHb8zjqliOjVDghKDMkNzu2jzJQlor0wMwpaQHD/hO8xpj/nRBsXgNC5iqQFjE9T6pMHPgefAuOBEpXobz6lfUN/v/HdiENF8HJKRPIQ4l4QOvl2NfCm7aG3qzQQn0jc01kCbsGO7Uw/Fe8ERvTzzM6NLYbxYckTYRzLREGL8yhdoTf2UUbPH/pmB8FV+jdCgRxd1P9jtE/GVeN5U/eGjzwX0xdUKtIS3KOJKwyLOHq++bmJNyyHMKA3Zq+dTiT+I8O0zwg+S0tmZkLHZ8C026t2Iq01Eb8HF3lJWLlAU33995EI/jFhIKbfJnd9/D3OIv8CqtwTGaSLUnQAAAAASUVORK5CYII="></div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div v-for="seat in model.tickets" :key="seat.id" class="col-2">
                                        <div v-if="seat.seats.seatTypeId == 3 && seat.status == 0" class="col-12 text-center mb-5"><img style="width: 2.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC8ElEQVR4nO2aPWgUQRiGV6OoJEZMpRhR/AkKGn/Bf0khYqFR0EpCsDKCAU0s/MPkCsEipdhYGbCRIAqigj9djDYiaUQQtREEFb0gGBX1kQ++k2G5bOZuZu82YR7YIrMf774vMzezO5MoCgQCgUAgEAhUGaAR2AnscrhWAjWG5jRtc9EUTwt8Bp0LXMcfw4b2sCfNv8AtoME17BTgHp4x9H3zQDy7BN6Tgqk0Awu7XQKfnYCBz7gEzk3AwLkQ2BbgkM6AXjH0fSNeD1oHLAawGXjq05Wh7ZMh8VrK8tMUW9C3AfV6fxbwOMOBHwEzVbNevZtZmv4vV8D8hB78DnRo3WLgZwYDi6dFqncMGE0YAfOkaGAcwd/AahW8m8HAd1SrWb0mcUMKRyxEu1S0L4OB+1Sry6I2H5WytgE9ZC9wTynvDFGJgdcA94GHZV7PgX4jcL9+QAyVqSdemlMLnGXS6uEaYLvDt+uyIkaXO+iJl6lpBu7E/U3ovBH2Au4cTzNwDnfyRmCbFcKrt6hE0VYPLx9DRuBnjlriZV9qgbNMCOxpSO/39T7tCfHSmloPk9IOSJYnrRzZIwROIsKO0MNV4AfwIbbH9g3onmy/4U9Au2wzqYfZwFFgY2wd7pwMgfPACn32Ft3CWat/1wKHgTY5/9K2qxM98Dl97kWjTYb0JeC10fYeWKi9/zVJMALeZTjwKtl4A/5Y1F5RjzcTat5KwSkLsV4V66WyyE7pOsva2+rxWkJNd2FPugN4Arwpcr0EtqrYJuDVGHVpXDuAGcBHi8AnjR6O6wzqRFf+UWolkY/8ccJKqDqXB9QBSxKuRq+J7DwNJKzPG7TG9FhrKyxHFV8shtDptEPGfM0BXsQ8yGTWrvdPxO59tgoNTI9N+WPRVomgMW8NutVbCHtE2w8Av2L+ZK6psRVemnDeNFI4iagGOgIvA3uNf8uQYW0yWDhvKgldFlqMbdH11r+NCiHnXoa/lrKCBgKBQCAQCAQid/4BnQc5hEvJvewAAAAASUVORK5CYII="></div>
                                        <div v-if="seat.seats.seatTypeId == 3 && seat.status == 1" class="col-12 text-center mb-5"><img style="width: 2.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6UlEQVR4nO2aX4hUdRTHf2qhke3M+c0sFRqKmhRk/wwqzbaH9Z4zs2pB7UtI9FRBQWkP/SPXh6AHn0J6sGzvOXfsoZEoCAv8gy/r1kuELyGE+hIEGrUS2G6kG+fOzuw0Obt37tw73o3fF36wc/fHuefzO7+/53eNcXJycnJycnJyus6yFVqZ5/LjVnAwfinfbarDSxpGTw7coM+6sRn6xEMrEgPNfToEVvCQFZpOpuDpRiMKnk7EJtNVYPyi72PPdkc7bRZZwa+Tg62VWeBk7QLTUfU5Ni/4HiXtVJrAM9H2YgNbxrcWGjAIvRk/woJ7Fx4w7nXAUWWZntEZcMFEWH31vacjA15L1qdHQPDbzAMzjauvJpKmzaKilNY3L+jglzbbCvXpv1dWh28CxhNZBQbB46v8gWWhzQr1hb43sRSltL6xXBUreHu7CALjZWB8UevlfFxtGacyB8w4lT9UXqX2QPAlEPqzXQ/o98u3aaXD8xj8G0ZLG0IHGY9kD5i+Ult5pnvV13nqf2aA8VIEo7tqDuK+zAEL7qsFg3ZFqD9hOlnbrNCe7AHTnk72DKYT4Hzg3WeFvgGmYzHL9yAodWD9OzxAMI3Hsae+aFdODTjLSge4OrwEhB6Le3btD7x1rY4WRwfvjGtPfTEjI4tTA7bsvdLVeKvt2t6pw1rBd7sdw4UAX04NGJI5TEw0umGUFSJh30wnRguMO7refDCNNwF/150tnMoHtD29MZxhOWBJoksLPpnUfjqRwjilwyy1CENKGZDMTlrggMlF2LouTQk1Ak6C4C/NOTZg+gMEd/+/xjDjRcul5zTNFK4UB3fcAkwvFKT0UPM6HHXbazIOPFHwvbtm3v2opnByfvl+/X1rsPVmEO/ZPNNOvf+qQeNHCxuY8e3wvYzvzT6jq5bxfWD6qcm/n2HUu0OjbwV/nw/4fFaBIdh6jyberOCVCI3zYa1x6PP2deicAfFen98YjdS6DI30ElgzpTmhByI1DtOXM72B5wjc7jAnralYy3TKCp5tLcD4IwTephA4KD8MTGeuVS+Nkq/gFvMBLbWCFyJAvzYb4f/YGtOJrqur1F5KD/lzw+LZ/urA8tgv6K8OLM99MrSmXdHPH0yP1T5/jpNF9jZqnWYfdRY3UaRXFZbxtwhj5g3TQ8GBwZwV/KEF9oqu0aHfjK+2zDu/RoM+sPHG5im/XdH1z/RY+g2HpnobsAE+r88LQekpK/RXS0DO/OsDmjkNM62d477pUv0m4noovCwT2p8Xb9vsZxk42RL5sfp9U0fSZaHg4xONW7gKPhh5bPRIeu9V9099jQXq5OTk5OTk5ORkutc/H+IWmsAjGBIAAAAASUVORK5CYII="></div>
                                        <div v-if="seat.seats.seatTypeId == 3 && seat.status == 2" class="col-12 text-center mb-5"><img style="width: 2.5vmax;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD6UlEQVR4nO2aX4hUdRTHf2qhke3M+c0sFRqKmhRk/wwqzbaH9Z4zs2pB7UtI9FRBQWkP/SPXh6AHn0J6sGzvOXfsoZEoCAv8gy/r1kuELyGE+hIEGrUS2G6kG+fOzuw0Obt37tw73o3fF36wc/fHuefzO7+/53eNcXJycnJycnJyus6yFVqZ5/LjVnAwfinfbarDSxpGTw7coM+6sRn6xEMrEgPNfToEVvCQFZpOpuDpRiMKnk7EJtNVYPyi72PPdkc7bRZZwa+Tg62VWeBk7QLTUfU5Ni/4HiXtVJrAM9H2YgNbxrcWGjAIvRk/woJ7Fx4w7nXAUWWZntEZcMFEWH31vacjA15L1qdHQPDbzAMzjauvJpKmzaKilNY3L+jglzbbCvXpv1dWh28CxhNZBQbB46v8gWWhzQr1hb43sRSltL6xXBUreHu7CALjZWB8UevlfFxtGacyB8w4lT9UXqX2QPAlEPqzXQ/o98u3aaXD8xj8G0ZLG0IHGY9kD5i+Ult5pnvV13nqf2aA8VIEo7tqDuK+zAEL7qsFg3ZFqD9hOlnbrNCe7AHTnk72DKYT4Hzg3WeFvgGmYzHL9yAodWD9OzxAMI3Hsae+aFdODTjLSge4OrwEhB6Le3btD7x1rY4WRwfvjGtPfTEjI4tTA7bsvdLVeKvt2t6pw1rBd7sdw4UAX04NGJI5TEw0umGUFSJh30wnRguMO7refDCNNwF/150tnMoHtD29MZxhOWBJoksLPpnUfjqRwjilwyy1CENKGZDMTlrggMlF2LouTQk1Ak6C4C/NOTZg+gMEd/+/xjDjRcul5zTNFK4UB3fcAkwvFKT0UPM6HHXbazIOPFHwvbtm3v2opnByfvl+/X1rsPVmEO/ZPNNOvf+qQeNHCxuY8e3wvYzvzT6jq5bxfWD6qcm/n2HUu0OjbwV/nw/4fFaBIdh6jyberOCVCI3zYa1x6PP2deicAfFen98YjdS6DI30ElgzpTmhByI1DtOXM72B5wjc7jAnralYy3TKCp5tLcD4IwTephA4KD8MTGeuVS+Nkq/gFvMBLbWCFyJAvzYb4f/YGtOJrqur1F5KD/lzw+LZ/urA8tgv6K8OLM99MrSmXdHPH0yP1T5/jpNF9jZqnWYfdRY3UaRXFZbxtwhj5g3TQ8GBwZwV/KEF9oqu0aHfjK+2zDu/RoM+sPHG5im/XdH1z/RY+g2HpnobsAE+r88LQekpK/RXS0DO/OsDmjkNM62d477pUv0m4noovCwT2p8Xb9vsZxk42RL5sfp9U0fSZaHg4xONW7gKPhh5bPRIeu9V9099jQXq5OTk5OTk5ORkutc/H+IWmsAjGBIAAAAASUVORK5CYII="></div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
        </div>
        <div v-if ="this.model.room.roomTypeId == 2"  class="row mx-3 my-3">
            <div class="col-12">
                <div class="row screen mb-5">
                    <img src="../../assets/image/bg-screen.png" style="object-fit: cover; width: 100%;" alt="">
                </div>
                <div class="row seat d-flex col-12 " style="margin-top: 1vmax;">
                    <div class="col-1">
                        <div class="row">
                            <div class="col-12 text-center  fw-bolder fs-4" style="height: 2.5vmax;">
                            </div>
                           
                                <div  class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    A
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    B
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    C
                                </div>
                                <div class="col-12 text-center text-secondary fw-bolder fs-4" style="height: 4vmax;">
                                    D
                                </div>
                            </div>
                        </div>
                        <div class="col-11">
                                <div class="row mb-3">
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        1
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        2
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        3
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        4
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        5
                                    </div>
                                    <div class="col-2 text-center text-secondary fw-bolder fs-4">
                                        6
                                    </div>
                                </div>
                                <div  class="row">
                                    <div v-for="seat in model.tickets" :key="seat.id" class="col-2">
                                        <div v-if="seat.status == 0" class="col-12 text-center mb-5" ><font-awesome-icon :icon="['fas', 'couch']" size="2xl" /></div>
                                        <div v-if="seat.status == 1" class="col-12 text-center mb-5" ><font-awesome-icon :icon="['fas', 'couch']" size="2xl" style="color: #63E6BE;" /></div>
                                        <div v-if="seat.status == 2" class="col-12 text-center mb-5" ><font-awesome-icon :icon="['fas', 'couch']" size="2xl" style="color: #63E6BE;" /></div>
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

export default {
    name: 'ScheduleDetail',
    data() {
        return {
            model: {
                schedule: {
                    scheduleDate: '',
                    startTime: '',
                    endTime: '',
                    roomId: '',
                    movieId: ''
                },
                tickets: [],
                room: {
                    roomName: '',
                    roomTypeId: ''
                },
               
            },
            auth: false
        }
    },
    mounted() {
        this.scheduleId = this.$route.params.id;
        this.getSchedule(this.$route.params.id);
        this.getTickets(this.$route.params.id);
        this.isAuth();
    },
    methods: {
        isAuth() {
            if (localStorage.getItem('token') != null) {
                this.auth = true;
            }
        },
        getSchedule(scheduleId) {
        axios.get(`https://localhost:7071/api/Schedules/${scheduleId}`).then(response => {
                console.log(response.data);
                this.model.schedule = response.data;
                this.getRoom(this.model.schedule.roomId);
                }).catch(error => {
                    console.error('Error fetching schedule:', error);
                });                
            },
        getRoom(roomId) {
            console.log(roomId);
            axios.get(`https://localhost:7071/api/Rooms/${roomId}`).then(response => {
                console.log(response.data);
                this.model.room = response.data;
            }).catch(error => {
                console.error('Error fetching room:', error);
            });                
        },
        getTickets(scheduleId) {
            axios.get(`https://localhost:7071/api/Tickets/get-tickets-by-schedule?scheduleId=${scheduleId}`).then(response => {
                console.log(response.data);
                this.model.tickets = response.data;
            }).catch(error => {
                console.error('Error fetching tickets:', error);
            });                
        }
    }
}
</script>
