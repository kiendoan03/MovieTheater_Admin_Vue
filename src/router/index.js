import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActorView from '../views/Admin/Actor/ActorView.vue'
import CustomerView from '../views/Admin/Customer/CustomerView.vue'
import DirectorView from '../views/Admin/Director/DirectorView.vue'
import GenreView from '../views/Admin/Genre/GenreView.vue'
import MovieView from '../views/Admin/Movie/MovieView.vue'
import RoomView from '../views/Admin/Room/RoomView.vue'
import ScheduleView from '../views/Admin/Schedule/ScheduleView.vue'
import StaffView from '../views/Admin/Staff/StaffView.vue'
import ActorCreate from '../views/Admin/Actor/ActorCreate.vue'
import ActorEdit from '../views/Admin/Actor/ActorEdit.vue'
import CustomerDetail from '../views/Admin/Customer/CustomerDetail.vue'
import MovieCreate from '@/views/Admin/Movie/MovieCreate.vue'
import MovieEdit from '@/views/Admin/Movie/MovieEdit.vue'
import DirectorCreate from '@/views/Admin/Director/DirectorCreate.vue'
import DirectorEdit from '@/views/Admin/Director/DirectorEdit.vue'
import GenreCreate from '@/views/Admin/Genre/GenreCreate.vue'
import GenreEdit from '@/views/Admin/Genre/GenreEdit.vue'
import RoomCreate from '@/views/Admin/Room/RoomCreate.vue'
import RoomDetail from '@/views/Admin/Room/RoomDetail.vue'
import ScheduleCreate from '@/views/Admin/Schedule/ScheduleCreate.vue'
import ScheduleEdit from '@/views/Admin/Schedule/ScheduleEdit.vue'
import ScheduleDetail from '@/views/Admin/Schedule/ScheduleDetail.vue'
import StaffCreate from '@/views/Admin/Staff/StaffCreate.vue'
import StaffEdit from '@/views/Admin/Staff/StaffEdit.vue'
import AdminView from '@/views/Admin/DashboardAdmin.vue'

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
            path: '/admin',
            name: 'admin',
            component: AdminView
        },
        {
            path: '/admin/actor',
            name: 'actor',
            component: ActorView
        },
        {
            path: '/admin/actor/create',
            name: 'actorCreate',
            component: ActorCreate
        },
        {
            path: '/admin/actor/edit/:id',
            name: 'actorEdit',
            component: ActorEdit
        },
        {
            path: '/admin/customer',
            name: 'customer',
            component: CustomerView
        },
        {
            path: '/admin/customer/detail/:id',
            name: 'customerDetail',
            component: CustomerDetail
        },
        {
            path: '/admin/director',
            name: 'director',
            component: DirectorView
        },
        {
            path: '/admin/director/create',
            name: 'directorCreate',
            component: DirectorCreate
        },
        {
            path: '/admin/director/edit/:id',
            name: 'directorEdit',
            component: DirectorEdit
        },
        {
            path: '/admin/genre',
            name: 'genre',
            component: GenreView
        },
        {
            path: '/admin/genre/create',
            name: 'genreCreate',
            component: GenreCreate
        },
        {
            path: '/admin/genre/edit/:id',
            name: 'genreEdit',
            component: GenreEdit
        },
        {
            path: '/admin/movie',
            name: 'movie',
            component: MovieView
        },
        {
            path: '/admin/movie/create',
            name: 'movieCreate',
            component: MovieCreate
        },
        {
            path: '/admin/movie/edit/:id',
            name: 'movieEdit',
            component: MovieEdit
        },
        {
            path: '/admin/room',
            name: 'room',
            component: RoomView
        },
        {
            path: '/admin/room/create',
            name: 'roomCreate',
            component: RoomCreate
        },
        {
            path: '/admin/room/detail/:id',
            name: 'roomDetail',
            component: RoomDetail
        },
        {
            path: '/admin/schedule',
            name: 'schedule',
            component: ScheduleView
        },
        {
            path: '/admin/schedule/create',
            name: 'scheduleCreate',
            component: ScheduleCreate
        },
        {
            path: '/admin/schedule/edit/:id',
            name: 'scheduleEdit',
            component: ScheduleEdit
        },
        {
            path: '/admin/schedule/detail/:id',
            name: 'scheduleDeatil',
            component: ScheduleDetail
        },
        {
            path: '/admin/staff',
            name: 'staff',
            component: StaffView
        },
        {
            path: '/admin/staff/create',
            name: 'staffCreate',
            component: StaffCreate
        },
        {
            path: '/admin/staff/edit/:id',
            name: 'staffEdit',
            component: StaffEdit
        },
    ]
})

export default router