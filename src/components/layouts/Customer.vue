<template>
    <div id="CustomerLayout" class="mobile">
        <div class="navbar-header border-bottom">
            <div class="navbar-header-content">
                <div class="left">
                    <router-link :to="{name: 'customer-main'}" style="position: relative; width: 100%; top: 0; left: -7.5px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                </div>
                <div class="right">
                    <div class="header-menu-content display-flex space-between display-mobile">
                        <div></div>
                        <div class="header-menu-list display-flex">
                            <router-link v-if="selectedTable.id" :to="{name: 'customer-chart'}" class="btn btn-icon btn-white" style="height: 14px;">
                                <i class="label-icon fa fa-lg fa-shopping-basket" style="font-size: 18px;" />
                                <span class="notif">{{ cart }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="body">
            <router-view />
        </div>
        <div style="padding-bottom: 70px;"></div>
        <div class="navbar-bottom">
            <div v-if="selectedTable.id" class="main-screen display-flex space-between">
                <ul class="menu-navbar">
                    <router-link :to="{name: 'customer-main'}">
                        <li>
                            <div class="icon">
                                <i class="label-icon fa fa-lg fa-home" />
                            </div>
                            <div class="label">
                                Home
                            </div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'customer-order-list'}">
                        <li>
                            <div class="icon">
                                <i class="label-icon fa fa-lg fa-list-ol" />
                                <span class="notif">{{ order }}</span>
                            </div>
                            <div class="label">
                                Orders
                            </div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'customer-profile'}">
                        <li>
                            <div class="icon">
                                <i class="label-icon fa fa-lg fa-user" />
                            </div>
                            <div class="label">
                                Customer
                            </div>
                        </li>
                    </router-link>
                </ul>
            </div>
            <div v-else class="main-screen display-flex space-between">
                <AppButtonTable 
                    :isFull="true" 
                    :onChange="(data) => onChangeTable(data)" 
                    style="width: 100%; margin-top: 7px;" />
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
import AppButtonTable from '../modules/AppButtonTable'

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

const table = {
    id: '',
    table_id: '',
    image: '',
    name: '',
    code: '',
    description: '',
    status: '',
    is_available: ''
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
            selectedTable: {...table},
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

        const tableData = this.$cookies.get('table')
        this.selectedTable = tableData ? tableData : table
        this.setDataTableSelected(this.selectedTable)

        const token = this.$cookies.get('token')
        console.log('token', token)

        this.getLocalCartCount()
        this.getLocalOrderCount()
        // this.getDataTable()
    },
    components: {
        AppButtonTable,
        AppToast,
        AppWrapper,
        AppButton,
        AppMenu,
        AppText,
        SearchField
    },
    methods: {
        ...mapActions({
            setDataTableSelected: 'table/setData',
            getDataTable: 'table/getData',
            getCount: 'cart/getCountCustomer',
            getCountOrder: 'order/getCountCustomer'
        }),
        onOpenMenu () {
            this.visibleMenu = !this.visibleMenu
        },
        onChangeTable (data) {
            this.getLocalCartCount()
            this.getLocalOrderCount()
            this.$router.push({ name: 'customer-main' })
            // console.log('onChangeTable', data)
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
            customer: 'customer/data',
            selectTable: 'table/selected'
        })
    },
    watch: {
        selectTable (props) {
            if (props) {
                this.selectedTable = props
            } else {
                this.selectedTable = null
            }
        },
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