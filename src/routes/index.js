import {
    Home, Login, Register, ForgotPassword,
    ResetPassword,
    AboutUS,
    EditProfile,
    ManagementPost,
    ChangePassword,
    NotFound,
    Admin as AdminPage
    , Dashboard,
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
    DashboardCensor,
    NewMessage, RevenueManagement,RuleManagement
    , PaymentCancel, PaymentSuccess, Checkout, EWallet,

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
    { path: '/payment-success', layout: NoHeaderAndFooter, component: PaymentSuccess },
    { path: '/payment-cancel', layout: NoHeaderAndFooter, component: PaymentCancel },
    { path: '/contact', layout: Default, component: Contact },
    { path: '/checkout', layout: Default, component: Checkout },
    { path: '/e-wallet', layout: Default, component: EWallet },
    { path: '/login-success', layout: NoHeaderAndFooter, component: LoginGoogleSuccess },
    { path: '/register', layout: NoHeaderAndFooter, component: Register },
    { path: '/forgot-password', layout: NoHeaderAndFooter, component: ForgotPassword },
    { path: '/reset-password/:email', layout: NoHeaderAndFooter, component: ResetPassword },
    { path: '/about', layout: Default, component: AboutUS },
    { path: '/not-found', layout: Default, component: NotFound },
    { path: '/auction-session', layout: CensorLayout, component: AuctionSession },
    { path: '/product-auction', layout: Default, component: ProductAuction },
    { path: '/product-auction/:productAuctionId', layout: Default, component: ProductAuctionDetail },
    { path: '/censors', component: Censor },
    { path: '/censors/:censorId', component: CensorDetail },
    { path: '/auction-live/:productAuctionId', layout: Default, component: AuctionLive },
    // { path: '/product-auction', layout: Default, component: ProductAuction },
]

const routerAdmin = [
    { path: '/admin', layout: Admin, component: AdminPage },
    { path: '/admin/approve-censor', layout: Admin, component: ApproveCensor },
    { path: '/admin/account', layout: Admin, component: ManagementAccount },
    { path: '/admin/dashboard', layout: Admin, component: RevenueManagement },
    { path: '/admin/rule', layout: Admin, component: RuleManagement },
]

const routerUser = [
    { path: '/register-censor', layout: User, component: RegisterCensor },
    { path: '/profile/management-post', layout: User, component: ManagementPost },
    { path: '/change-password', layout: User, component: ChangePassword },
    { path: '/dashboard', layout: User, component: Dashboard },
]

const routerCensor = [
    { path: '/censor/auction-summary', layout: CensorLayout, component: DashboardCensor },
    { path: '/censor/product-approve', layout: CensorLayout, component: PostAuction },
    { path: '/censor/all-product', layout: CensorLayout, component: ApproveProduct },
    { path: '/censor/auction-session', layout: CensorLayout, component: AuctionSession },
]

const routerAllRole = [
    { path: '/profile', layout: User, component: EditProfile },
    { path: '/messages', layout: MessageLayout, component: Message },
    { path: '/messages/:conversationId', layout: MessageLayout, component: Message },
    { path: '/messages/new', layout: MessageLayout, component: NewMessage },
]

export { publicRouter, routerUser, routerCensor, routerAdmin, routerAllRole }