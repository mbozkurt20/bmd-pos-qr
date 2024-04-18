import {createRouter, createWebHistory} from 'vue-router';

import auth from '../middleware/auth';
import log from '../middleware/log';

import Index from '../views/Home.vue'
import Login from "../views/Auth/Login/Login.vue";
import EmployerLogin from "../views/Auth/EmployerLogin/EmployerLogin.vue";
import Online from '../views/Online/index.vue'
import Current from '../views/Current/index.vue'
import Tables from '../views/Table/Index.vue'
import Order from '../views/Order/index.vue'
import Bill from '../views/Bill/index.vue'
import FastSell from '../views/FastSell/index.vue'
import PackageDetail from '../views/Packages/index.vue'
import PackageList from '../views/Packages/List/index.vue'
import Settings from '../views/Setting/index.vue'
import Menu from "../views/Menu/index.vue"
import Stocks from "../views/Stocks/index.vue"
import Report from "../views/Report/index.vue"
// changes

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        meta: {
            title: 'Restaurant Girişi',
            middleware: [auth]
        }
    },
    {
        path: '/employer-login',
        name: 'EmployerLogin',
        component: EmployerLogin,
        meta: {
            title: 'Garson Girişi',
            middleware: [auth]
        }
    },
    {
        path: '/online',
        name: 'Online',
        component: Online,
        meta: {
            title: 'Online Siparişler',
            auth: [1],
            middleware: [auth]
        }
    },

    {
        path: '/fast-sell',
        name: 'FastSell',
        component: FastSell,
        meta: {
            title: 'Gel Al',
            auth: [1],
            middleware: [auth]
        }
    },

    {
        path: '/packages',
        name: 'Packages',
        template: `<router-view />`,
        meta: {
            title: 'Paketler',
            auth: [1],
            middleware: [auth]
        },
        children: [
            {
                path: "",
                component: PackageList
            },
            {
                path: "new",
                component: PackageDetail
            },
            {
                path: ":id",
                template: `<router-view />`,
                children: [
                    {
                        path: "",
                        component: PackageDetail,
                        meta: {
                            auth: [1],
                        }
                    },
                ]
            }
        ]
    },
    {
      path: '/menu',
      name: 'Menu',
      component: Menu,
      meta: {
          title: 'Menü',
          auth: [1],
          middleware: [auth]
      }
    },
    {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
            headerClass: 'header',
            sidebarClass: '',
            auth: [1],
            title: 'İstatistikler',
            middleware: [auth, log]
        }
    },

    {
        path: '/currents',
        name: 'Current',
        component: Current,
        meta: {
            headerClass: 'header',
            sidebarClass: '',
            auth: [1],
            title: 'Cari Hesaplar',
            middleware: [auth, log]
        }
    },

    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            headerClass: 'header',
            sidebarClass: '',
            auth: [1],
            title: 'Ayarlar',
            middleware: [auth, log]
        }
    },
    {
        path: '/tables',
        name: 'Tables',
        template: `<router-view />`,
        meta: {
            headerClass: 'header',
            sidebarClass: '',
            title: 'Masalar',
            middleware: [auth, log]
        },
        children: [
            {
                path: "",
                component: Tables,
                meta: {
                    auth: [1, 3],
                }
            },
            {
                path: ":id",
                template: `<router-view />`,
                children: [
                    {
                        path: "",
                        component: Order,
                        meta: {
                            auth: [1, 3],
                        }
                    },
                    {
                        path: "bill",
                        component: Bill,
                        meta: {
                            auth: [1],
                        }
                    }
                ]
            }
        ]
    },
    {
        path: '/stocks',
        name: "Stocks",
        component: Stocks,
        meta: {
            title: 'Stoklar',
            auth: [1],
            middleware: [auth]
        }
    },
    {
        path: '/report',
        name: 'report',
        component: Report,
        meta: {
            title: 'Raporlar',
            auth: [1],
            middleware: [auth]
        }
      },
];


const router = createRouter({
    history: createWebHistory('/'),
    linkActiveClass: 'active',
    routes,
});

const default_title = 'Restauran Yazılımı';
router.beforeEach((to, from, next) => {
    document.title = to.meta.title || default_title;
    next();
});

function nextFactory(context, middleware, index) {

    const subsequentMiddleware = middleware[index];

    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {

        context.next(...parameters);

        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    }
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});


export default router;



