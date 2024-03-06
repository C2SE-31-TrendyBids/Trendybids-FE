import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile, Admin as AdminPage
} from '../pages/index';

import {
    Admin,
    User
} from '../layouts/index';


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: User, component: Login },
    { path: '/register', layout: User, component: Register },
    { path: '/forgot-password', layout: User, component: ForgotPassword },
    { path: '/reset-password', layout: User, component: ResetPassword },
    { path: '/profile', layout: User, component: Profile },
    { path: '/admin', layout: Admin, component: AdminPage },



]

export { router }