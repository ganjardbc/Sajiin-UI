<template>
    <div id="admin">
        <div :class="isSidebarSmall ? 'sidebar small' : 'sidebar'">
            <div class="header">
                <div class="header-content display-flex space-between">
                    <router-link :to="{name: 'home'}" class="logo" style="width: 150px; margin-left: -5px; margin-top: -8px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                    <button class="close btn btn-white btn-icon" @click="onSidebar()">
                        <i 
                            :class="isSidebarSmall ? 'fa fa-lg fa-bars' : 'fa fa-lg fa-times'" 
                            style="font-size: 18px; margin-top: 0;" />
                    </button>
                </div>
            </div>
            <div class="content">
                <AppListMenu :data.sync="sidebar" :isSidebarSmall.sync="isSidebarSmall" />
            </div>
        </div>
        <div class="main">
            <div class="header">
                <div class="set-padding display-flex space-between">
                    <div>
                        <form action="#" class="card-search mobile">
                            <button class="btn btn-icon btn-white" type="submite">
                                <i class="fa fa-1x fa-search" />
                            </button>
                            <input type="search" placeholder="Search products or orders.." required class="field" style="border-radius: 0;">
                        </form>
                    </div>
                    <div style="width: 100%;" class="display-flex right">
                        <router-link :to="{name: 'home'}" class="mobile-hidden" style="margin-left: 5px; margin-top: 1px;">
                            <button class="btn btn-white btn-radius">
                                WEBSITE
                            </button>
                        </router-link>
                        <router-link v-if="user && user.role_name === 'admin'" :to="{name: '404'}" style="margin-left: 5px;">
                            <button class="btn btn-white btn-icon btn-radius">
                                <i class="fa fa-lg fa-store" />
                            </button>
                        </router-link>
                        <router-link v-if="user && user.role_name === 'admin'" :to="{name: '404'}" style="margin-left: 5px;">
                            <button class="btn btn-white btn-icon btn-radius">
                                <i class="fa fa-lg fa-calendar-alt" />
                            </button>
                        </router-link>
                        <router-link :to="{name: '404'}" style="margin-left: 5px;">
                            <button class="btn btn-white btn-icon btn-radius">
                                <i class="fa fa-lg fa-bell" />
                                <span class="notif">0</span>
                            </button>
                        </router-link>
                        <router-link :to="{name: 'profile'}" class="card-small-profile" style="margin-left: 5px;">
                            <div class="image" style="text-align: center;">
                                <i v-if="!user.image" class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                <img v-else :src="user && user.image ? (adminImageThumbnailUrl + user.image) : ''" alt="">
                            </div>
                            <div class="label" style="text-transform: uppercase;">{{ user && user.name }}</div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="inner">
                <router-view />
            </div>
            <div class="footer display-flex space-between">
                <div>Version 0.0.1 - Beta</div>
                <div style="cursor: default;">
                    <router-link to="/" class="link-text bold small">About us</router-link> -
                    <router-link to="/" class="link-text bold small">Helps</router-link> -
                    <router-link to="/" class="link-text bold small">Terms & conditions</router-link>
                </div>
            </div>
        </div>

        <AppToast />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AppListMenu from '../modules/AppListMenu'
import logo from '@/assets/img/logo.png'
import AppToast from '../modules/AppToast'

const sidebarAdmin = [
    {icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, menu: [
        {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 1, link: 'dashboard', permission: 'dashboard'},
    ]},
    {icon: 'fa fa-lg fa-database', label: 'MASTERDATA', value: 0, menu: [
        {icon: 'fa fa-lg fa-tag', label: 'Bizpars', value: 0, link: 'bizpar', permission: 'bizpars'},
        {icon: 'fa fa-lg fa-truck', label: 'Shipments', value: 0, link: 'shipment', permission: 'shipments'},
        {icon: 'fa fa-lg fa-calculator', label: 'Payments', value: 0, link: 'payment', permission: 'payments'}
    ]},
    {icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, menu: [
        {icon: 'fa fa-lg fa-users', label: 'Customers', value: 0, link: 'customer', permission: 'customers'},
        {icon: 'fa fa-lg fa-th-large', label: 'Tables', value: 0, link: 'table', permission: 'tables'},
        {icon: 'fa fa-lg fa-flag', label: 'Visitors', value: 0, link: 'visitor', permission: 'visitors'},
    ]},
    {icon: 'fa fa-lg fa-database', label: 'ORDERS', value: 0, menu: [
        {icon: 'fa fa-lg fa-receipt', label: 'Orders', value: 0, link: 'orderlist', permission: 'orders'},
        {icon: 'fa fa-lg fa-shopping-basket', label: 'Carts', value: 0, link: 'cartList', permission: 'carts'},
        {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'wishelist', permission: 'wiselists'},
        {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'feedback', permission: 'feedbacks'}
    ]},
    {icon: 'fa fa-lg fa-database', label: 'PRODUCT', value: 0, menu: [
        {icon: 'fa fa-lg fa-list-ol', label: 'Categories', value: 0, link: 'category', permission: 'categories'},
        {icon: 'fa fa-lg fa-bars', label: 'Toppings', value: 0, link: 'toping', permission: 'toppings'},
        {icon: 'fa fa-lg fa-utensils', label: 'Products', value: 0, link: 'listing', permission: 'products'}
    ]},
    {icon: 'fa fa-lg fa-database', label: 'WEBSITE', value: 0, menu: [
        {icon: 'fa fa-lg fa-newspaper', label: 'Articles', value: 0, link: 'articlelist', permission: 'articles'},
        {icon: 'fa fa-lg fa-check', label: 'Benefits', value: 0, link: 'benefit', permission: 'benefits'}
    ]},
    {icon: 'fa fa-lg fa-database', label: 'USER N ROLES', value: 0, menu: [
        {icon: 'fa fa-lg fa-lock', label: 'Permissions', value: 0, link: 'permission', permission: 'permissions'},
        {icon: 'fa fa-lg fa-flag', label: 'Roles', value: 0, link: 'role', permission: 'roles'},
        {icon: 'fa fa-lg fa-user', label: 'Users', value: 0, link: 'userlist', permission: 'users'}
    ]}
]

export default {
    name: 'admin',
    data () {
        return {
            permissions: null,
            logo: logo,
            sidebar: null,
            isSidebarSmall: false,
            classSidebar: 'sidebar smalls',
            classSidebarMenu: 'menu-list hover with-icon smalls'
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'home' })
        }
    },
    mounted () {
        const token = this.$cookies.get('token')
        console.log('token', token)

        const permissions = this.$cookies.get('permissions')
        this.permissions = permissions.permissions
        console.log('permissions', permissions)

        this.onCheckMenus(sidebarAdmin)
        this.getLocalCartCount()
        this.getLocalOrderCount()
    },
    components: {
        AppToast,
        AppListMenu
    },
    methods: {
        ...mapActions({
            getCount: 'cart/getCount',
            getCountOrder: 'order/getCount'
        }),
        onCheckSubmenus (data) {
            let menu = []
            data && data.map((dt) => {
                const stt = this.onCheckPermission(dt.permission)
                if (stt) {
                    menu.push({
                        ...dt
                    })
                }
            })
            return menu
        },
        onCheckMenus (data) {
            let menu = []
            data && data.map((dt) => {
                if (dt.menu) {
                    let submenu = this.onCheckSubmenus(dt.menu)
                    if (submenu.length > 0) {
                        let submenuPayload = []
                        submenu && submenu.map((sb) => {
                            submenuPayload.push({...sb})
                        })
                        if (submenuPayload.length > 0) {
                            menu.push({
                                ...dt,
                                menu: submenuPayload
                            })
                        }
                    }
                }
            })
            this.sidebar = menu
        },
        onCheckPermission (prm) {
            let stt = false
            const data = this.permissions
            data && data.map((dt) => {
                if (dt.permission_name === prm) {
                    stt = true
                }
            })
            return stt
        },
        onSetNotif (target, notif) {
            const data = this.sidebar
            data && data.map((dt, i) => {
                dt.menu && dt.menu.map((sb, j) => {
                    if (sb.permission === target) {
                        this.sidebar[i].menu[j].value = notif
                    }
                })
            })
        },
        onSidebar () {
            this.isSidebarSmall = !this.isSidebarSmall
        },
        getLocalCartCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCount(token)
        },
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            cart: 'cart/count',
            carts: 'cart/all',
            order: 'order/count',
            orders: 'order/all'
        })
    },
    watch: {
        orders (props) {
            let val = 0
            const data = this.$cookies.get('user')
            const role = data && data.role_name
            switch (role) {
                case 'admin':
                    val = props.allAdmin
                    break;
                default:
                    val = props.all
                    break;
            }

            this.onSetNotif('orders', val)
        },
        carts (props) {
            let val = 0
            const data = this.$cookies.get('user')
            const role = data && data.role_name
            switch (role) {
                case 'admin':
                    val = props.allAdmin
                    break;
                default:
                    val = props.all
                    break;
            }
            this.onSetNotif('carts', val)
        }
    }
}
</script>