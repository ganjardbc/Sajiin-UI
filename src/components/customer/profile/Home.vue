<template>
    <div id="App">
        <div class="card space-bettween border border-full" style="overflow: unset;">
            <div style="padding-top: 15px; padding-bottom: 15px;">
                <AppShowHide :isVisible="true" title="Check In / Out" class="border border-bottom" style="padding-bottom: 15px; margin-bottom: 25px;">
                    <AppLoader v-if="visibleLoaderCheck" />

                    <div v-else class="display-flex display-mobile">
                        <div class="width width-50 width-mobile border-right border-mobile-none">
                            <div style="padding: 10px 0; padding-right: 20px; margin-bottom: 10px;">
                                <div class="display-flex space-between" style="padding-bottom: 10px;">
                                    <div class="fonts fonts-10 grey no-margin-padding" style="padding-left: 5px;">
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
                        <div class="width width-50 width-mobile">
                            <div style="padding: 10px 0; padding-left: 20px;" class="no-margin-padding">
                                <div class="display-flex space-between" style="padding-bottom: 10px;">
                                    <div class="fonts fonts-10 grey no-margin-padding" style="padding-left: 5px;">Check-in to make your first order</div>
                                    <div></div>
                                </div>
                                <div class="card-check-in check-in">
                                    <div class="icon">
                                        <i class="icn fa fa-lg fa-arrow-up" />
                                    </div>
                                    <div class="main">
                                        <div class="fonts fonts-11 black semibold">Check In</div>
                                        <div class="fonts fonts-10 grey">{{ formData.start_date ? formData.start_date : '-' }}</div>
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
                                        <div class="fonts fonts-11 black semibold">Check Out</div>
                                        <div class="fonts fonts-10 grey">{{ formData.end_date ? formData.end_date : '-' }}</div>
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
                </AppShowHide>

                <div class="display-flex row space-between" style="height: 40px; margin-bottom: 20px;">
                    <div class="width width-35">
                        <SearchField :placeholder="'Search orders ..'" :enableResponsive="true" :onChange="(data) => onChangeMenu(data)" />
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            icon="fa fa-lg fa-sort"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[
                                {label: 'Current', icon: 'fa fa-lw fa-sort-numeric-down'}, 
                                {label: 'Old', icon: 'fa fa-lw fa-sort-numeric-up'}, 
                                {label: 'A to Z', icon: 'fa fa-lw fa-sort-alpha-down'}, 
                                {label: 'Z to A', icon: 'fa fa-lw fa-sort-alpha-up'}
                            ]" />
                        <AppButtonMenu 
                            icon="fa fa-lw fa-filter"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[
                                {label: 'Name of product'}, 
                                {label: 'Price of product'}
                            ]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="getRefresh()">
                            <i class="fa fa-lg fa-retweet"></i>
                        </button>
                    </div>
                </div>

                <div v-if="!visibleLoader">
                    <div v-if="formOrder.length > 0">
                        <AppCardOrder :data.sync="formOrder" />
                    </div>
                    <div v-else>
                        <AppEmpty />
                    </div>
                </div>

                <AppLoader v-if="visibleLoader" style="margin-top: 20px;" />

            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import M from 'moment'
import axios from 'axios'
import AppCardOrder from '../../modules/AppCardOrder'
import SearchField from '../../modules/SearchField'
import AppCardTable from '../../modules/AppCardTable'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppDote from '../../modules/AppDote'
import AppEmpty from '../../modules/AppEmpty'
import AppShowHide from '../../modules/AppShowHide'
import AppLoader from '../../modules/AppLoader'
import CardProfileProduct from './forms/Product'

const payload = {
    id: '',
    start_date: null,
    end_date: null,
    status: "active",
    owner_id: '',
    table_id: '',
    user_id: ''
}

export default {
    name: 'App',
    data () {
        return {
            visibleLoaderCheck: false,
            visibleLoader: false,
            selectedTable: null,
            selectedCustomer: null,
            selectedVisitor: null,
            formData: {...payload},
            formOrder: [],
            dataOrder: null,
            dataUser: null ,
            dataVisitor: null
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('user')
        this.formData = {
            ...this.formData,
            owner_id: this.selectedCustomer.id
        }
        this.getData()
        this.getDataOrder()
    },
    components: {
        SearchField,
        AppLoader,
        AppCardOrder,
        AppButtonMenu,
        AppDote,
        AppEmpty,
        AppShowHide,
        AppCardTable,
        CardProfileProduct
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        getRefresh () {
            this.getDataOrder()
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
        onChangeTable (data) {
            this.formData = {
                ...this.formData,
                table_id: data.id
            }
            this.saveData(this.formData)
            // console.log('onChangeTable', this.formData)
        },
        async changeStatusOrder (id, status) {
            var a = confirm('Change this order status ?')
            if (a) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    order_id: id,
                    status: status
                }
                
                const rest = await axios.post('/api/order/postOrderStatus', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    this.getDataOrder()
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false
                }
            }
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
        },
        async getDataOrder () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                owner_id: this.selectedCustomer.id
            }
            
            const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.formOrder = data
                this.visibleLoader = false 
                console.log('getDataOrder', data)
            } else {
                this.visibleLoader = false
            }
        },
    }
}
</script>