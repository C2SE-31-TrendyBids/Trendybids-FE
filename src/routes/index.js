import {
    Home, Login, Register, ForgotPassword, ResetPassword, AboutUS, EditProfile, ManagementPost, NotFound ,Admin as AdminPage
} from '../pages/index';

import {
    Admin,
    User,
    Default
} from '../layouts/index';


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: User, component: Login },
    { path: '/register', layout: User, component: Register },
    { path: '/forgot-password', layout: User, component: ForgotPassword },
    { path: '/reset-password', layout: User, component: ResetPassword },
    { path: '/about', layout: Default, component: AboutUS },
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/profile/management-post', layout: User , component: ManagementPost },
    { path: '/not-found', layout: Default, component: NotFound },
    { path: '/admin', layout: Admin, component: AdminPage },



]

export { router }