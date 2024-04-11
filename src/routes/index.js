import {
    Home, Login, Register, ForgotPassword,
    ResetPassword,
    AboutUS,
    EditProfile,
    ManagementPost,
    ChangePassword,
    NotFound,
    Admin as AdminPage
    ,
    RegisterCensor,
    ProductAuction,
    Contact,
    Censor,
    CensorDetail,
    PostAuction,
    ApproveProduct,
    ProductAuctionDetail,
    ApproveCensor,
    ManagementAccount, AuctionLive,
    LoginGoogleSuccess, AuctionSession,
    Message,
    NewMessage
} from '../pages/index';

import {
    Admin,
    Default,
    User,
    NoHeaderAndFooter,
    CensorLayout,
    MessageLayout
} from '../layouts/index';

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
    { path: '/auction-session', layout: CensorLayout, component: AuctionSession },
    { path: '/product-auction', layout: Default, component: ProductAuction },
    { path: '/product-auction/:productAuctionId', layout: Default, component: ProductAuctionDetail },
    { path: '/censor', component: Censor },
    { path: '/censor/:censorId', component: CensorDetail },
    { path: '/auction-live/:productAuctionId', layout: Default, component: AuctionLive },
    { path: '/product-auction', layout: Default, component: ProductAuction },
]

const routerAdmin = [
    { path: '/admin', layout: Admin, component: AdminPage },
    { path: '/Approve-Censor', layout: Admin, component: ApproveCensor },
    { path: '/Account', layout: Admin, component: ManagementAccount },
]

const routerUser = [
    { path: '/register-censor', layout: Default, component: RegisterCensor },
    { path: '/profile/management-post', layout: User, component: ManagementPost },
    { path: '/changepassword', layout: User, component: ChangePassword },
]

const routerCensor = [
    { path: '/product-approve', layout: CensorLayout, component: PostAuction },
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/all-product', layout: CensorLayout, component: ApproveProduct },
    { path: '/auction-session', layout: CensorLayout, component: AuctionSession },
]

const routerAllRole = [
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/messages', layout: MessageLayout, component: Message },
    { path: '/messages/:conversationId', layout: MessageLayout, component: Message },
    { path: '/messages/new', layout: MessageLayout, component: NewMessage },
]

export { publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole }