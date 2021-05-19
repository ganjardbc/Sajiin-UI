<template>
    <div id="CustomerLayout">
        <div id="header" class="border-bottom">
            <div id="header-container" class="header-mobile">
                <div class="left">
                    <router-link :to="{name: 'customer-main'}" style="position: relative; width: 100%; top: -10px; left: -7.5px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                </div>
                <div class="right">
                    <div class="header-menu-content display-flex space-between display-mobile">
                        <div></div>
                        <div class="header-menu-list display-flex">
                            <router-link v-if="selectedCustomer.id" :to="{name: 'customer-notifications'}" class="btn btn-icon btn-white" style="height: 14px;">
                                <i class="label-icon fa fa-lg fa-bell" style="font-size: 20px;" />
                                <span class="notif">0</span>
                            </router-link>
                            <div class="header-search mobile">
                                <SearchField :enableResponsive="true" :placeholder="'Search products ..'" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="body">
            <router-view />
        </div>
        <div style="padding-bottom: 80px;"></div>
        <div class="navbar-bottom">
            <div v-if="selectedCustomer.id" class="main-screen display-flex space-between">
                <router-link :to="{name: 'customer-main'}" class="btn btn-icon btn-mobile btn-white" style="height: 16px;">
                    <i class="label-icon fa fa-lg fa-home" style="font-size: 18px;" />
                    <span class="label-text">Home</span>
                </router-link>
                <router-link :to="{name: 'customer-chart'}" class="btn btn-icon btn-mobile btn-white" style="height: 16px;">
                    <i class="label-icon fa fa-lg fa-shopping-basket" style="font-size: 18px;" />
                    <span class="label-text">Carts</span>
                    <span class="notif">{{ cart }}</span>
                </router-link>
                <router-link :to="{name: 'customer-layout'}" class="btn btn-icon btn-mobile btn-white" style="height: 16px;">
                    <i class="label-icon fa fa-lg fa-user" style="font-size: 18px;" />
                    <span class="label-text">Me</span>
                    <span class="notif">{{ order }}</span>
                </router-link>
            </div>
            <div v-else class="main-screen display-flex space-between">
                <router-link :to="{name: 'customer-main'}" class="btn btn-icon btn-mobile btn-white" style="height: 13px;">
                    <i class="label-icon fa fa-lg fa-home" style="font-size: 18px;" />
                    <span class="label-text">Home</span>
                </router-link>
                <AppButtonScanner title="Register Customer" icon="fa fa-lg fa-plus-circle" :isFull="true" :onChange="(data) => onChangeCustomer(data)" style="width: 100%;" />
            </div>
        </div>

        <AppToast />
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import logo from '@/assets/img/logo.png'
import logo2 from '@/assets/img/icon.png'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppMenu from "../modules/AppMenu"
import AppText from "../modules/AppText"
import SearchField from '../modules/SearchField'
import AppToast from '../modules/AppToast'
import AppButtonScanner from '../modules/AppButtonScanner'

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

const navbar = [
    {label: 'Catalogs', link: 'customer-main'},
    {label: 'How to orders ?', link: 'home'},
    // {label: 'Saji-in', link: 'home'}
]

export default {
    name: 'CustomerLayout',
    data () {
        return {
            visibleMenu: false,
            selectedCustomer: {...customer},
            dataUser: null,
            logo: logo,
            logo2: logo2,
            navbar: navbar
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'home' })
        }
    },
    mounted () {
        const customerData = this.$cookies.get('customer')
        this.selectedCustomer = customerData ? customerData : customer
        this.dataUser = this.$cookies.get('admin')

        const token = this.$cookies.get('token')
        console.log('token', token)

        this.getLocalCartCount()
        this.getLocalOrderCount()
        this.getDataTable()
    },
    components: {
        AppButtonScanner,
        AppToast,
        AppWrapper,
        AppButton,
        AppMenu,
        AppText,
        SearchField
    },
    methods: {
        ...mapActions({
            getDataTable: 'table/getData',
            getCount: 'cart/getCountCustomer',
            getCountOrder: 'order/getCountCustomer'
        }),
        onOpenMenu () {
            this.visibleMenu = !this.visibleMenu
        },
        onChangeCustomer (data) {
            this.getLocalCartCount()
            this.getLocalOrderCount()
            this.$router.push({ name: 'customer-main' })
            console.log('onChangeCustomer', data)
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
            user: 'auth/admin',
            permissions: 'auth/permissions',
            token: 'auth/token',
            cart: 'cart/countCustomer',
            order: 'order/countCustomer',
            customer: 'customer/data'
        })
    },
    watch: {
        customer (props) {
            if (props) {
                this.selectedCustomer = props
            } else {
                this.selectedCustomer = customer
            }
        }
    }
}

</script>