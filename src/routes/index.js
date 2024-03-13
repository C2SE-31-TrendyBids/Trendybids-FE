import {
    Home, Login, Register, ForgotPassword, ResetPassword, RegisterCensor, Profile, Admin as AdminPage, ProductAuction
} from '../pages/index';

import {
    Admin,
    Default,
    User,
    NoHeaderAndFooter
} from '../layouts/index';
import LoginGoogleSuccess from "../pages/LoginGoogleSuccess/LoginGoogleSuccess";


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: NoHeaderAndFooter, component: Login },
    { path: '/login-success', layout: NoHeaderAndFooter, component: LoginGoogleSuccess },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/register-censor', layout: Default, component: RegisterCensor },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/profile', layout: User, component: Profile },
    { path: '/admin', layout: Admin, component: AdminPage },

    //product auction
    { path: '/product-auction', layout: Default, component: ProductAuction },

]

export { router }