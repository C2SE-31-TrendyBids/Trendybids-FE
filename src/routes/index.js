import {
    Home, Login, Register, ForgotPassword, ResetPassword, RegisterCensor, Profile, Admin as AdminPage
} from '../pages/index';

import {
    Admin,
    Default,
    User,
    NoHeaderAndFooter
} from '../layouts/index';


const router = [
    { path: '/', component: Home },
    { path: '/login', layout: NoHeaderAndFooter, component: Login },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/register-censor', layout: Default, component: RegisterCensor },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/profile', layout: User, component: Profile },
    { path: '/admin', layout: Admin, component: AdminPage },

]

export { router }