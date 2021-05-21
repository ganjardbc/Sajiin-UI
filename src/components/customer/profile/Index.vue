<template>
    <div id="App" class="main-screen" style="padding-top: 10px;">
        <div class="width width-100">
            <div class="width width-100 width-mobile" style="margin-bottom: 15px;">
                <div style="padding: 0; width: 100%;">
                    <!-- <div class="display-flex border border-bottoms" style="padding-bottom: 15px;">
                        <div style="width: 45px; margin-right: 15px;">
                            <div class="image image-circle image-45px" style="margin: auto; text-align: center;">
                                <i v-if="!selectedCustomer" class="post-top fa fa-lg fa-user-circle" style="color: #999;" />
                                <img v-else :src="selectedCustomer && selectedCustomer.image ? (customerImageThumbnailUrl + selectedCustomer.image) : ''" alt="">
                            </div>
                        </div>
                        <div style="width: calc(100% - 95px);">
                            <div class="fonts fonts-13 semibold">{{ selectedCustomer && selectedCustomer.name }}</div>
                            <div class="fonts fonts-10 grey">{{ selectedCustomer && selectedCustomer.about }}</div>
                        </div>
                        <div class="display-flex space-between" style="width: 35px;">
                            <button class="btn btn-small-icon btn-sekunder">
                                <i class="fa fa-1x fa-cog"></i>
                            </button>
                        </div>
                    </div> -->

                    <!-- <AppShowHide :isVisible="false" title="Check In / Out" class="card box-shadow" style="margin-bottom: 15px;">
                        <AppLoader v-if="visibleLoaderCheck" />

                        <div v-else>
                            <div class="width width-100 width-mobile">
                                <div style="padding-bottom: 10px;">
                                    <div class="display-flex space-between" style="padding-bottom: 0;">
                                        <div class="fonts fonts-10 grey no-margin-padding">
                                            Choose the table to sit down
                                        </div>
                                        <div></div>
                                    </div>
                                    <div>
                                        <AppCardTable 
                                            :disableClick="formData.status === 'inactive' ? true : false"
                                            :column="6" 
                                            :selectedTable.sync="selectedTable" 
                                            :onChange="(data) => onChangeTable(data)" />
                                    </div>
                                </div>
                            </div>
                            <div class="width width-100 width-mobile">
                                <div style="padding-bottom: 0;">
                                    <div class="display-flex space-between" style="padding-bottom: 0;">
                                        <div class="fonts fonts-10 grey no-margin-padding">Check-in to make your first order</div>
                                        <div></div>
                                    </div>
                                    <div class="card-check-in check-in">
                                        <div class="icon">
                                            <i class="icn fa fa-lg fa-arrow-up" />
                                        </div>
                                        <div class="main">
                                            <div class="fonts fonts-10 black semibold">Check In</div>
                                            <div class="fonts fonts-9 grey">{{ formData.start_date ? formData.start_date : '-' }}</div>
                                        </div>
                                        <div class="detail">
                                            <div v-if="formData.table_id">
                                                <button 
                                                    v-if="!formData.start_date" 
                                                    @click="onCheckIn"
                                                    class="btn btn-small btn-sekunder" 
                                                    style="width: 100%;">
                                                    Check In
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="formData.start_date" class="card-check-in check-out">
                                        <div class="icon">
                                            <i class="icn fa fa-lg fa-arrow-down" />
                                        </div>
                                        <div class="main">
                                            <div class="fonts fonts-10 black semibold">Check Out</div>
                                            <div class="fonts fonts-9 grey">{{ formData.end_date ? formData.end_date : '-' }}</div>
                                        </div>
                                        <div class="detail">
                                            <button 
                                                v-if="!formData.end_date" 
                                                @click="onCheckOut"
                                                class="btn btn-small btn-sekunder" 
                                                style="width: 100%;">
                                                Check Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AppShowHide> -->

                    <div style="margin-top: 0;">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Choose Table</div>
                        <AppButtonTable 
                            :enableDetail="true"
                            :isFull="true" 
                            :onChange="(data) => onChangeSelectedTable(data)" 
                            style="width: 100%; margin-bottom: 15px;" />
                    </div>

                    <div v-if="dataOrder" class="border border-bottoms" style="padding-top: 5px; padding-bottom: 15px;">
                        <div class="fonts fonts-10 semibold" style="margin-bottom: 5px;">
                            You have an order
                        </div>
                        <div class="display-flex">
                            <router-link :to="{name: 'order'}" class="card-capsule active" style="width: 100%; text-align: center; padding-top: 10px; padding-bottom: 8px;">
                                Continue to check out ?
                            </router-link>
                        </div>
                    </div>

                    <div class="border border-bottoms">
                        <div class="fonts fonts-10 black semibold" style="margin-bottom: 10px;">Menus</div>
                        <AppListMenu :data.sync="sidebar" :isSidebarSmall="isSidebarSmall" :disableResponsive="true" />
                    </div>

                    <div style="margin-top: 15px;">
                        <button class="btn btn-primary btn-full" @click="onLogout">
                            LOGOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import M from 'moment'
import axios from 'axios'
import AppTabs from '../../modules/AppTabs'
import AppButton from '../../modules/AppButton'
import AppListMenu from '../../modules/AppListMenu'
import AppShowHide from '../../modules/AppShowHide'
import AppLoader from '../../modules/AppLoader'
import AppCardTable from '../../modules/AppCardTable'
import AppButtonTable from '../../modules/AppButtonTable'

const payload = {
    id: '',
    start_date: null,
    end_date: null,
    status: "active",
    owner_id: '',
    table_id: '',
    user_id: ''
}

const sidebarCustomer = [
    // {icon: 'fa fa-lg fa-home', label: 'Home', value: 0, link: 'customer-home'},
    {icon: 'fa fa-lg fa-list-ol', label: 'Orders', value: 0, link: 'customer-order'},
    {icon: 'fa fa-lg fa-star', label: 'Feedbacks', value: 0, link: 'customer-feedback'},
    {icon: 'fa fa-lg fa-heart', label: 'Wiselists', value: 0, link: 'customer-whiselist'}
]

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderCheck: false,
            sidebar: sidebarCustomer,
            selectedCustomer: null,
            selectedVisitor: null,
            dataUser: null,
            dataOrder: null,
            isSidebarSmall: false,
            formData: {...payload}
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.sidebar[0].value = this.order
        // this.getData()
    },
    components: {
        AppButtonTable,
        AppCardTable,
        AppLoader,
        AppShowHide,
        AppListMenu,
        AppTabs,
        AppButton,
    },
    methods: {
        ...mapActions({
            removeCookieAuth: 'auth/removeCookieCustomerAuth',
            signOut: 'customer/removeData',
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onLogout() {
            var a = confirm('Logout customer ?')
            if (a) {
                this.removeCookieAuth()
                this.signOut()
                this.$router.push({ name: 'home' })
            }
        },
        onBuilded () {
            alert('still builded !')
        },
        onCheckIn () {
            const tableID = this.formData.table_id
            if (tableID) {
                var a = confirm('are you sure you want to check in ?')
                if (a) {
                    const time = M().format('YYYY-MM-DD hh:mm:ss')
                    this.formData = {
                        ...this.formData,
                        start_date: time,
                        status: 'active'
                    }
                    this.saveData(this.formData)
                    console.log('onCheckIn', this.formData)
                }
            } else {
                alert('choose table first !')
            }
        },
        onCheckOut () {
            var a = confirm('are you sure you want to check out ?')
            if (a) {
                const time = M().format('YYYY-MM-DD hh:mm:ss')
                this.formData = {
                    ...this.formData,
                    end_date: time,
                    status: 'inactive'
                }
                this.saveData(this.formData)
                // console.log('onCheckOut', this.formData)
            }
        },
        onChangeSelectedTable (data) {
            // this.getLocalCartCount()
            // this.getLocalOrderCount()
            console.log('onChangeSelectedTable', data)
        },
        onChangeTable (data) {
            this.formData = {
                ...this.formData,
                table_id: data.id
            }
            this.saveData(this.formData)
            // console.log('onChangeTable', this.formData)
        },
        async saveData (payload) {
            // this.visibleLoaderCheck = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const api = payload.id ? '/api/visitor/update' : '/api/visitor/post'
            
            const rest = await axios.post(api, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.getData()
                this.makeToast('Visitor updated')
                // this.visibleLoaderCheck = false 
            } else {
                // this.visibleLoaderCheck = false
            }
        },
        async getData () {
            // this.visibleLoaderCheck = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1,
                offset: 0,
                owner_id: this.selectedCustomer.id
            }
            
            const rest = await axios.post('/api/visitor/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.dataVisitor = data[0] ? data[0] : null 
                this.selectedTable = this.dataVisitor ? this.dataVisitor.table : null
                this.selectedVisitor = this.dataVisitor ? this.dataVisitor.visitor : null
                this.formData = {
                    ...this.formData,
                    id: this.selectedVisitor.id,
                    start_date: this.selectedVisitor.start_date,
                    end_date: this.selectedVisitor.end_date,
                    status: this.selectedVisitor.status,
                    owner_id: this.selectedVisitor.owner_id,
                    table_id: this.selectedVisitor.table_id,
                    user_id: this.selectedVisitor.user_id
                }
                // this.visibleLoaderCheck = false 
                // console.log('getdata', this.dataVisitor)
            } else {
                // this.visibleLoaderCheck = false
            }
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
