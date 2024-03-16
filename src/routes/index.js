import {
    Home, Login, Register, ForgotPassword, ResetPassword, AboutUS, EditProfile, ManagementPost, NotFound ,Admin as AdminPage
     ,RegisterCensor,  ProductAuction, Contact,Censor, CensorDetail
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
    { path: '/contact', layout: Default, component: Contact },
    { path: '/login-success', layout: NoHeaderAndFooter, component: LoginGoogleSuccess },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/register-censor', layout: Default, component: RegisterCensor },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/about', layout: Default, component: AboutUS },
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/profile/management-post', layout: User , component: ManagementPost },
    { path: '/not-found', layout: Default, component: NotFound },
    { path: '/admin', layout: Admin, component: AdminPage },
    { path: '/censor', component: Censor },
    { path: '/censor/:censorId', component: CensorDetail },
    //product auction
    { path: '/product-auction', layout: Default, component: ProductAuction },

]

export { router }