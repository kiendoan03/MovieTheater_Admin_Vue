import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActorView from '../views/Actor/ActorView.vue'
import CustomerView from '../views/Customer/CustomerView.vue'
import DirectorView from '../views/Director/DirectorView.vue'
import GenreView from '../views/Genre/GenreView.vue'
import MovieView from '../views/Movie/MovieView.vue'
import RoomView from '../views/Room/RoomView.vue'
import ScheduleView from '../views/Schedule/ScheduleView.vue'
import StaffView from '../views/Staff/StaffView.vue'
import ActorCreate from '../views/Actor/ActorCreate.vue'
import ActorEdit from '../views/Actor/ActorEdit.vue'
import CustomerDetail from '../views/Customer/CustomerDetail.vue'
import MovieCreate from '@/views/Movie/MovieCreate.vue'
import MovieEdit from '@/views/Movie/MovieEdit.vue'
import DirectorCreate from '@/views/Director/DirectorCreate.vue'
import DirectorEdit from '@/views/Director/DirectorEdit.vue'
import GenreCreate from '@/views/Genre/GenreCreate.vue'
import GenreEdit from '@/views/Genre/GenreEdit.vue'
import RoomCreate from '@/views/Room/RoomCreate.vue'
import RoomDetail from '@/views/Room/RoomDetail.vue'
import ScheduleCreate from '@/views/Schedule/ScheduleCreate.vue'
import ScheduleEdit from '@/views/Schedule/ScheduleEdit.vue'
import ScheduleDetail from '@/views/Schedule/ScheduleDetail.vue'
import StaffCreate from '@/views/Staff/StaffCreate.vue'
import StaffEdit from '@/views/Staff/StaffEdit.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ('../views/AboutView.vue')
        },
        {
            path: '/actor',
            name: 'actor',
            component: ActorView
        },
        {
            path: '/actor/create',
            name: 'actorCreate',
            component: ActorCreate
        },
        {
            path: '/actor/edit/:id',
            name: 'actorEdit',
            component: ActorEdit
        },
        {
            path: '/customer',
            name: 'customer',
            component: CustomerView
        },
        {
            path: '/customer/detail/:id',
            name: 'customerDetail',
            component: CustomerDetail
        },
        {
            path: '/director',
            name: 'director',
            component: DirectorView
        },
        {
            path: '/director/create',
            name: 'directorCreate',
            component: DirectorCreate
        },
        {
            path: '/director/edit/:id',
            name: 'directorEdit',
            component: DirectorEdit
        },
        {
            path: '/genre',
            name: 'genre',
            component: GenreView
        },
        {
            path: '/genre/create',
            name: 'genreCreate',
            component: GenreCreate
        },
        {
            path: '/genre/edit/:id',
            name: 'genreEdit',
            component: GenreEdit
        },
        {
            path: '/movie',
            name: 'movie',
            component: MovieView
        },
        {
            path: '/movie/create',
            name: 'movieCreate',
            component: MovieCreate
        },
        {
            path: '/movie/edit/:id',
            name: 'movieEdit',
            component: MovieEdit
        },
        {
            path: '/room',
            name: 'room',
            component: RoomView
        },
        {
            path: '/room/create',
            name: 'roomCreate',
            component: RoomCreate
        },
        {
            path: '/room/detail/:id',
            name: 'roomDetail',
            component: RoomDetail
        },
        {
            path: '/schedule',
            name: 'schedule',
            component: ScheduleView
        },
        {
            path: '/schedule/create',
            name: 'scheduleCreate',
            component: ScheduleCreate
        },
        {
            path: '/schedule/edit/:id',
            name: 'scheduleEdit',
            component: ScheduleEdit
        },
        {
            path: '/schedule/detail/:id',
            name: 'scheduleDeatil',
            component: ScheduleDetail
        },
        {
            path: '/staff',
            name: 'staff',
            component: StaffView
        },
        {
            path: '/staff/create',
            name: 'staffCreate',
            component: StaffCreate
        },
        {
            path: '/staff/edit/:id',
            name: 'staffEdit',
            component: StaffEdit
        },
    ]
})

export default router