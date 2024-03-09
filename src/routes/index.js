import {
    Home, Login, Register, ForgotPassword, ResetPassword, Profile, Admin as AdminPage
} from '../pages/index';

import {
    Admin,
    User,
    NoHeaderAndFooter
} from '../layouts/index';
import LoginGoogleSuccess from "../pages/LoginGoogleSuccess/LoginGoogleSuccess";


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: NoHeaderAndFooter, component: Login },
    { path: '/login-success', layout: NoHeaderAndFooter, component: LoginGoogleSuccess },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/profile', layout: User, component: Profile },
    { path: '/admin', layout: Admin, component: AdminPage },

]

export { router }