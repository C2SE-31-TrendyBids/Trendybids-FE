import {
    Home, Login, Register, ForgotPassword, ResetPassword
} from '../pages/index';

import {
    NoHeaderAndFooter
} from '../layouts/index';


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: NoHeaderAndFooter, component: Login },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password', layout: NoHeaderAndFooter, component: ResetPassword },




];


export { router }