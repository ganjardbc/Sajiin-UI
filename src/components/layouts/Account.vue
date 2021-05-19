<template>
    <div id="App" class="main-screen" style="padding-top: 40px;">
        <div class="display-flex display-mobile space-between">
            <div class="width width-25 width-mobile" style="margin-bottom: 30px;">
                <div class="card box-shadow bg-white">
                    <div class="display-flex border border-bottoms" style="padding-bottom: 15px;">
                        <div style="width: 45px; margin-right: 15px;">
                            <div class="image image-circle image-45px" style="margin: auto; text-align: center;">
                                <i v-if="!selectedCustomer" class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                <img v-else :src="selectedCustomer && selectedCustomer.image ? (customerImageThumbnailUrl + selectedCustomer.image) : ''" alt="">
                            </div>
                        </div>
                        <div style="width: calc(100% - 125px);">
                            <div class="fonts fonts-13 semibold">{{ selectedCustomer && selectedCustomer.name }}</div>
                            <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.about }}</div>
                        </div>
                        <div class="display-flex space-between" style="width: 65px;">
                            <button class="btn btn-small-icon btn-sekunder">
                                <i class="fa fa-1x fa-cog"></i>
                            </button>
                            <button class="btn btn-small-icon btn-sekunder" @click="onLogout">
                                <i class="fa fa-1x fa-power-off"></i>
                            </button>
                        </div>
                    </div>

                    <div v-if="dataOrder" class="border border-bottoms" style="padding-top: 15px; padding-bottom: 15px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have a drafts
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue make order ?
                            </router-link>
                        </div>
                    </div>

                    <div class="border border-bottoms">
                        <AppShowHide title="Menus" :isVisible="false">
                            <AppListMenu :data.sync="sidebar" :isSidebarSmall="isSidebarSmall" :disableResponsive="true" />
                        </AppShowHide>
                    </div>
                </div>
            </div>
            <div class="width width-70 width-mobile">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppTabs from '../modules/AppTabs'
import AppButton from '../modules/AppButton'
import AppListMenu from '../modules/AppListMenu'
import AppShowHide from '../modules/AppShowHide'

const sidebarCustomer = [
    {icon: 'fa fa-lg fa-home', label: 'Home', value: 0, link: 'customer-home'},
    // {icon: 'fa fa-lg fa-list-ol', label: 'Orders', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'customer-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'customer-whiselist'}
]

export default {
    name: 'App',
    data () {
        return {
            sidebar: sidebarCustomer,
            selectedCustomer: null,
            dataUser: null,
            dataOrder: null,
            isSidebarSmall: false
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.sidebar[0].value = this.order
    },
    components: {
        AppShowHide,
        AppListMenu,
        AppTabs,
        AppButton,
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieAuth',
            signOut: 'customer/removeData'
        }),
        onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                this.signOut()
                // this.$router.push({ name: 'home' })
                // this.$router.push({ name: 'customer-main' })
                window.location = this.initUrl
            }
        },
        onBuilded () {
            alert('still builded !')
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            order: 'order/countCustomer'
        })
    },
    watch: {
        order (props) {
            this.sidebar[0].value = props
        }
    }
}
</script>
