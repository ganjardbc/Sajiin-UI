import About from '@/components/About.vue';

// layouts
import AdminLayout from '@/components/layouts/Admin.vue';
import WebLayout from '@/components/layouts/Web.vue';
import CustomerLayout from '@/components/layouts/Customer.vue';
import AccountLayout from '@/components/layouts/Account.vue';

// admin
import Dashboard from '@/components/admin/Index.vue';
import NotFoundAdmin from '@/components/admin/404.vue';

// auth
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import GenerateCustomer from '@/components/auth/GenerateCustomer.vue';

// web
import Home from '@/components/web/Index.vue';
import NotFoundWeb from '@/components/web/404.vue';
import HowToOrders from '@/components/web/infos/HowToOrders.vue';
import HowToJoin from '@/components/web/infos/HowToJoin.vue';
import Pricing from '@/components/web/infos/Pricing.vue';
import AboutUs from '@/components/web/infos/AboutUs.vue';
import ArticlePublic from '@/components/web/articles/Index.vue';
import ArticlePublicList from '@/components/web/articles/List.vue';

// admin
import Bizpar from '@/components/admin/bizpar/Index.vue';
import Shipment from '@/components/admin/shipment/Index.vue';
import Payment from '@/components/admin/payment/Index.vue';
import Category from '@/components/admin/category/Index.vue';
import ProductAdmin from '@/components/admin/product/Index.vue';
import Toping from '@/components/admin/toping/Index.vue';
import Customer from '@/components/admin/customer/Index.vue';
import Partner from '@/components/admin/partner/Index.vue';
import OrderList from '@/components/admin/order/Index.vue';
import OrderUnconfirmedList from '@/components/admin/order/Unconfirmed.vue';
import ArticleList from '@/components/admin/article/Index.vue';
import Feedback from '@/components/admin/feedback/Index.vue';
import Benefit from '@/components/admin/benefit/Index.vue';
import Role from '@/components/admin/role/Index.vue';
import UserList from '@/components/admin/user/Index.vue';
import CartList from '@/components/admin/cart/Index.vue';
import WisheList from '@/components/admin/wishelist/Index.vue';
import Permission from '@/components/admin/permission/Index.vue';
import Profile from '@/components/admin/profile/Index.vue';
import TableList from '@/components/admin/tables/Index.vue';
import VisitorList from '@/components/admin/visitors/Index.vue';

// customer
import CustomerMain from '@/components/customer/Index.vue';
import CustomerHome from '@/components/customer/profile/Home.vue';
import CustomerAccount from '@/components/customer/profile/Order.vue';
import CustomerFeedback from '@/components/customer/profile/Feedback.vue';
import CustomerWhiselist from '@/components/customer/profile/Whiselist.vue';
import CustomerNotifications from '@/components/customer/notifications/Index.vue';
import CustomerChart from '@/components/customer/charts/Index.vue';
import CustomerOrder from '@/components/customer/orders/Index.vue';
import CustomerDetail from '@/components/customer/orders/Detail.vue';
import CustomerTracking from '@/components/customer/tracking/Index.vue';
import CustomerFinding from '@/components/customer/tracking/Finding.vue';
import CustomerProduct from '@/components/customer/products/Index.vue';
// import CustomerProductList from '@/components/customer/products/List.vue';

export const routes = [
    // admin
    {
        path: '/private',
        component: AdminLayout,
        children: [
            {
                name: 'dashboard',
                path: '/admin-dashboard',
                component: Dashboard
            },
            {
                name: 'profile',
                path: '/admin-profile',
                component: Profile
            },

            // admin
            {
                name: 'bizpar',
                path: '/admin-bizpar',
                component: Bizpar
            },
            {
                name: 'shipment',
                path: '/admin-shipment',
                component: Shipment
            },
            {
                name: 'payment',
                path: '/admin-payment',
                component: Payment
            },
            {
                name: 'category',
                path: '/admin-category',
                component: Category
            },
            {
                name: 'listing',
                path: '/admin-listing',
                component: ProductAdmin
            },
            {
                name: 'toping',
                path: '/admin-toping',
                component: Toping
            },
            {
                name: 'customer',
                path: '/admin-customer',
                component: Customer
            },
            {
                name: 'partner',
                path: '/admin-partner',
                component: Partner
            },
            {
                name: 'orderlist',
                path: '/admin-order-list',
                component: OrderList
            },
            {
                name: 'order-unconfirmed-list',
                path: '/admin-order-unconfirmed-list',
                component: OrderUnconfirmedList
            },
            {
                name: 'articlelist',
                path: '/admin-article-list',
                component: ArticleList
            },
            {
                name: 'feedback',
                path: '/admin-feedback',
                component: Feedback
            },
            {
                name: 'benefit',
                path: '/admin-benefit',
                component: Benefit
            },
            {
                name: 'role',
                path: '/admin-role',
                component: Role
            },
            {
                name: 'permission',
                path: '/admin-permission',
                component: Permission
            },
            {
                name: 'userlist',
                path: '/admin-user-list',
                component: UserList
            },
            {
                name: 'wishelist',
                path: '/admin-wishelist',
                component: WisheList
            },
            {
                name: 'cartList',
                path: '/admin-cart-list',
                component: CartList
            },
            {
                name: 'table',
                path: '/admin-tables',
                component: TableList
            },
            {
                name: 'visitor',
                path: '/admin-visitors',
                component: VisitorList
            },

            // info
            {
                name: '404',
                path: '/admin-not-found',
                component: NotFoundAdmin
            }
        ]
    },

    // web
    {
        path: '/',
        component: WebLayout,
        children: [
            {
                name: '404WEB',
                path: '/not-found-web',
                component: NotFoundWeb
            },
            // main
            {
                name: 'home',
                path: '/',
                component: Home
            },
            {
                name: 'home2',
                path: '/home',
                component: Home
            },

            // auth
            {
                name: 'login',
                path: '/login',
                component: Login
            },
            {
                name: 'register',
                path: '/register',
                component: Register
            },
            {
                name: 'generate-customer',
                path: '/generate-customer/:token',
                component: GenerateCustomer
            },

            // articles
            {
                name: 'articles',
                path: '/articles',
                component: ArticlePublicList
            },
            {
                name: 'article',
                path: '/article/:id',
                component: ArticlePublic
            },

            // info
            {
                name: 'about',
                path: '/about',
                component: About
            },
            {
                name: 'how-to-orders',
                path: '/how-to-orders',
                component: HowToOrders
            },
            {
                name: 'how-to-join',
                path: '/how-to-join',
                component: HowToJoin
            },
            {
                name: 'pricing',
                path: '/pricing',
                component: Pricing 
            },
            {
                name: 'about-us',
                path: '/about-us',
                component: AboutUs
            }
        ]
    },

    // customer
    {
        path: '/customer',
        component: CustomerLayout,
        children: [
            {
                name: 'customer-main',
                path: 'home',
                component: CustomerMain
            },

            // product
            {
                name: 'product',
                path: 'product/:id',
                component: CustomerProduct
            },

            // notification
            {
                name: 'customer-notifications',
                path: 'notifications',
                component: CustomerNotifications
            },

            // charts
            {
                name: 'customer-chart',
                path: 'carts',
                component: CustomerChart
            },

            // orders
            {
                name: 'order', 
                path: 'order',
                component: CustomerOrder
            },
            {
                name: 'order-detail', 
                path: 'order-detail',
                component: CustomerDetail
            },
            {
                name: 'tracking',
                path: 'order-tracking',
                component: CustomerTracking
            },
            {
                name: 'tracking-finding',
                path: 'order-tracking-finding',
                component: CustomerFinding
            },

            // account
            {
                path: 'account',
                name: 'customer-layout',
                component: AccountLayout,
                redirect: '/customer/account/home',
                children: [
                    {
                        name: 'customer-home',
                        path: 'home',
                        component: CustomerHome
                    },
                    {
                        name: 'customer-order',
                        path: 'orders',
                        component: CustomerAccount
                    },
                    {
                        name: 'customer-feedback',
                        path: 'feedback',
                        component: CustomerFeedback
                    },
                    {
                        name: 'customer-whiselist',
                        path: 'whiselist',
                        component: CustomerWhiselist
                    },
                ]
            },
        ]
    }
];