import {
    Home, Profile, Admin as AdminPage
} from '../pages/index';

import {
    Admin,
    User
} from '../layouts/index';

const router = [
    {path: '/', component: Home},
    {path: '/profile', layout: User, component: Profile},
    {path: '/admin', layout: Admin, component: AdminPage},
];


export {router}