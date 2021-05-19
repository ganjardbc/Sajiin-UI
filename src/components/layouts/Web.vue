<template>
    <div id="WebLayouts">
        <div id="header" class="box-shadow">
            <div id="header-container" class="header-mobile">
                <div class="left">
                    <router-link :to="{name: 'home'}" style="position: relative; width: 100%; top: -10px; left: -7.5px;">
                        <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                    </router-link>
                </div>
                <div class="right">
                    <div class="header-bar">
                        <button class="btn btn-icon btn-white" @click="onOpenMenu">
                            <i class="fa fa-lg fa-bars"></i>
                        </button>
                    </div>
                    <div :class="'header-menu ' + (visibleMenu ? 'show' : '')">
                        <div class="header-bar header-menu-bar">
                            <div class="display-flex space-between">
                                <div class="fonts fonts-14 semibold" style="padding-top: 6px;">
                                    Menu
                                </div>
                                <button class="btn btn-icon btn-white" @click="onOpenMenu">
                                    <i class="fa fa-lg fa-times"></i>
                                </button>
                            </div>
                        </div>
                        <div class="header-menu-content display-flex space-between display-mobile">
                            <div class="header-menu-list display-flex display-mobile">
                                <AppMenu :data="navbar" />
                            </div>
                            <div class="display-flex display-mobile">
                                <div class="header-menu-list display-flex display-mobile">
                                    <div v-if="!user ? false : true">
                                        <router-link v-if="!customer ? false : true" :to="{name: 'customer-main'}" style="display: block;" class="header-menu-mobile">
                                            <button class="btn btn-small btn-sekunder btn-mobile">
                                                CUSTOMER
                                            </button>
                                        </router-link>
                                    </div>
                                    <router-link v-if="!user ? false : true" :to="{name: 'dashboard'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-small btn-sekunder btn-mobile">
                                            DASHBOARD
                                        </button>
                                    </router-link>
                                    <router-link v-if="user ? false : true" :to="{name: 'login'}" style="display: block;" class="header-menu-mobile">
                                        <button class="btn btn-small btn-sekunder btn-mobile">
                                            LOGIN
                                        </button>
                                    </router-link>
                                    <router-link v-if="user ? false : true" :to="{name: 'register'}" style="display: block;" class="margin margin-left-5-px no-margin-padding">
                                        <button class="btn btn-small btn-main btn-mobile">
                                            REGISTER
                                        </button>
                                    </router-link>
                                </div>
                                <div class="header-menu-list header-search">
                                    <SearchField :placeholder="'Search article ..'" />
                                </div>
                            </div>
                        </div>
                    </div> 
                    
                </div>
            </div>
        </div>
        <div id="body">
            <router-view />
        </div>
        <div id="footer">
            <div id="footer-content" class="display-flex space-between display-mobile">
                <div class="width width-30 width-mobile" style="padding-bottom: 15px;">
                    <div style="position: relative; 
                                width: 150px;
                                margin-bottom: 20px;
                                margin-left: -13px;
                                overflow: hidden;
                                height: 46px;">
                        <img 
                            :src="logo" 
                            alt="SAJI-IN" 
                            style="
                                width: 100%;
                            ">
                    </div>
                    <AppText style="margin-bottom: 20px;">
                        <span style="font-size: 10pt;">This Site All Right Reserved @2020</span>
                    </AppText>
                </div>
                <div class="width width-70 width-mobile display-flex space-between display-mobile">
                    <div class="width width-60 width-mobile display-flex space-between" style="padding-bottom: 15px;">
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Products</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        Catalogs
                                    </a>
                                </li>
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        Topings
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">About</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        About Us
                                    </a>
                                </li>
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        Our Team
                                    </a>
                                </li>
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        Articles
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="width width-100">
                            <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Blogs</div>
                            <ul class="menu-list">
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        News
                                    </a>
                                </li>
                                <li class="ml-list">
                                    <a href="#" class="ml-link">
                                        Events
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="width width-20 width-mobile">
                        <div class="fonts fonts-13px semibold grey" style="margin-bottom: 15px;">Contacts</div>
                        <div class="display-flex" style="margin-bottom: 15px;">
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-facebook" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-instagram" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-whatsapp" />
                            </button>
                        </div>
                        <div class="display-flex">
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fab fa-lg fa-telegram-plane" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fa fa-lg fa-envelope" />
                            </button>
                            <button class="btn btn-icon btn-small-radius btn-sekunder" style="margin-right: 10px;">
                                <i class="fa fa-lg fa-phone" />
                            </button>
                        </div>
                    </div>
                </div>
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

const navbar = [
    {label: 'Home', link: 'home'},
    // {label: 'Catalogs', link: 'product-list'},
    {label: 'Articles', link: 'articles'},
    // {label: 'About Us', link: 'about-us'},
    {label: 'How to Create Orders ?', link: 'how-to-orders'},
    {label: 'How to Join ?', link: 'how-to-join'}
]

export default {
    name: 'WebLayouts',
    data () {
        return {
            visibleMenu: false,
            logo: logo,
            logo2: logo2,
            navbar: navbar,
            role: null,
            customer: null
        }
    },
    mounted () {
        const role = this.$cookies.get('role')
        this.role = role
        console.log('role', role)

        const token = this.$cookies.get('token')
        console.log('token', token)

        this.customer = this.$cookies.get('customer')

        this.getLocalCartCount()
        this.getLocalOrderCount()
    },
    components: {
        AppToast,
        AppWrapper,
        AppButton,
        AppMenu,
        AppText,
        SearchField
    },
    methods: {
        ...mapActions({
            getCount: 'cart/getCount',
            getCountOrder: 'order/getCount'
        }),
        onOpenMenu () {
            this.visibleMenu = !this.visibleMenu
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
            permissions: 'auth/permissions',
            token: 'auth/token',
            cart: 'cart/count',
            order: 'order/count'
        })
    }
}

</script>