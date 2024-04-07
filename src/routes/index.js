import {
    Home, Login, Register, ForgotPassword, ResetPassword, AboutUS, EditProfile, ManagementPost, NotFound, Admin as AdminPage
    , RegisterCensor, ProductAuction, Contact, Censor, CensorDetail, PostAuction, ApproveProduct, ApproveCensor, ManagementAccount
} from '../pages/index';

import {
    Admin,
    Default,
    User,
    NoHeaderAndFooter,
    CensorLayout
} from '../layouts/index';
import LoginGoogleSuccess from "../pages/LoginGoogleSuccess/LoginGoogleSuccess";
import AuctionSession from "../pages/AuctionSession/AuctionSession";
import Message from "../pages/Message/Message";
import MessageLayout from "../layouts/MessageLayout";

const publicRouter = [
    { path: '/', component: Home },
    { path: '/login', layout: NoHeaderAndFooter, component: Login },
    { path: '/contact', layout: Default, component: Contact },
    { path: '/login-success', layout: NoHeaderAndFooter, component: LoginGoogleSuccess },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/about', layout: Default, component: AboutUS },
    { path: '/not-found', layout: Default, component: NotFound },
    { path: '/censor', component: Censor },
    { path: '/censor/:censorId', component: CensorDetail },
]

const routerAdmin = [
    { path: '/admin', layout: Admin, component: AdminPage },
    { path: '/Approve-Censor', layout: Admin, component: ApproveCensor },
    { path: '/Account', layout: Admin, component: ManagementAccount },
]

const routerUser = [
    { path: '/register-censor', layout: Default, component: RegisterCensor },
    { path: '/profile/management-post', layout: User, component: ManagementPost },
]

const routerCensor = [
    { path: '/product-approve', layout: CensorLayout, component: PostAuction },
    { path: '/all-product', layout: CensorLayout, component: ApproveProduct },
    { path: '/auction-session', layout: CensorLayout, component: AuctionSession },
]

const routerAllRole = [
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/messages', layout: MessageLayout, component: Message },
    { path: '/messages/:conversationId', layout: MessageLayout, component: Message },
]

export { publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole }