<template>
    <div id="App">
            <div class="card border-full bg-white" style="overflow: unset;">
                <div class="display-flex row space-between" style="height: 40px; margin-bottom: 20px;">
                    <div class="width width-35">
                        <SearchField :placeholder="'Search orders ..'" />
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
                        <button class="btn btn-white btn-icon btn-radius" @click="getRefresh(tabs[selectedIndex].target)">
                            <i class="fa fa-lg fa-retweet"></i>
                        </button>
                    </div>
                </div>

                <AppTabs 
                    :selectedIndex="selectedIndex" 
                    :data="tabs" 
                    :isScrollable="false" 
                    :isFull="true"
                    :onChange="(data) => onChangeTabs(data)" 
                    class="margin margin-bottom-30-px" />

                <div v-if="datas.length > 0">
                    <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                        <div class="display-flex space-between" style="margin-bottom: 20px;">
                            <div class="display-flex">
                                <div style="margin-right: 10px;"><i class="fa fa-1x fa-shopping-bag fonts main"></i></div>
                                <div class="fonts fonts-10 grey">{{ dt.order.created_at }}</div>
                                <AppDote style="margin-top: 8px;" />
                                <div class="fonts fonts-10 grey">{{ dt.order.order_id }}</div>
                            </div>
                            <div>
                                <div 
                                    :class="'card-capsule ' + (
                                    dt.order.status === 'canceled' 
                                        ? '' 
                                        : dt.order.status === 'done' 
                                            ? 'active' 
                                            : dt.order.status === 'unconfirmed' || dt.order.status === 'confirmed' 
                                                ? 'inactive' 
                                                : 'active'
                                    )"  
                                    style="text-transform: capitalize;">
                                    {{ 
                                        dt.order.status === 'unconfirmed' 
                                            ? 'Waiting for Confirmation' 
                                            : dt.order.status === 'confirmed' 
                                                ? 'Waiting for Payment'
                                                : dt.order.status 
                                    }}
                                </div>
                            </div>
                        </div>
                        <div v-if="dt.order.note">
                            <div class="fonts fonts-10 grey">
                                # {{ dt.order.note }}
                            </div>
                        </div>
                        <div class="display-flex" style="padding-top: 5px; padding-bottom: 20px;">
                            <div style="width: 100%; padding-right: 15px;" class="border-right">
                                <CardProfileProduct :data.sync="dt.details" :to="1" />
                                <AppShowHide v-if="dt.details.length > 1" :title="'View More Products (' + (dt.details.length - 1) + ')'">
                                    <CardProfileProduct :data.sync="dt.details" :from="1" :to="dt.details.length" />
                                </AppShowHide>
                            </div>
                            <div style="width: 180px; height: 120px; padding-left: 15px; margin-left: 15px;">
                                <div class="post-top">
                                    <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Total Belanja</div>
                                    <div class="fonts fonts-12 semibold">Rp {{ dt.order.total_price }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="display-flex row space-between">
                            <div>
                                <button 
                                    v-if="dt.order.status === 'confirmed'" 
                                    class="btn btn-main with-hover" 
                                    style="margin-right: 15px;">
                                    Upload Proof of Payment
                                </button>
                            </div>
                            <div class="display-flex">
                                <button class="btn btn-main-reverse with-hover" style="margin-right: 15px;">
                                    View Transaction Detail
                                </button>
                                <button 
                                    v-if="dt.order.status !== 'unconfirmed' && dt.order.status !== 'confirmed' && dt.order.status !== 'done' && dt.order.status !== 'canceled'" 
                                    class="btn btn-main" 
                                    style="margin-right: 15px;">
                                    Track Order
                                </button>
                                <AppButtonMenu :onChange="(data) => onChangeMenu(data)" :data="[{label: 'Buy again'}, {label: 'Chat admin'}, {label: 'Help'}]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <AppEmpty />
                </div>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import SearchField from '../../modules/SearchField'
import AppTabs from '../../modules/AppTabs'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppDote from '../../modules/AppDote'
import AppEmpty from '../../modules/AppEmpty'
import AppShowHide from '../../modules/AppShowHide'
import CardProfileProduct from './forms/Product'

const tabs = [
    {label: 'Unconfirmed', target: 'unconfirmed', val: 0, status: 'active'},
    {label: 'Payment', target: 'confirmed', val: 0, status: ''},
    {label: 'Cooking', target: 'cooking', val: 0, status: ''},
    {label: 'Packing', target: 'packing', val: 0, status: ''},
    {label: 'Shipping', target: 'shipping', val: 0, status: ''},
    {label: 'Done', target: 'done', val: 0, status: ''},
    {label: 'Canceled', target: 'canceled', val: 0, status: ''}
]

export default {
    name: 'App',
    data () {
        return {
            datas: [],
            tabs: tabs,
            selectedIndex: 0,
            dataUser: null,
            isSidebarSmall: false,
            selectedCustomer: null 
        }
    },
    mounted () {
        const customerData = this.$cookies.get('customer')
        this.selectedCustomer = customerData ? customerData : customer

        this.dataUser = this.$cookies.get('user')
        this.getData('unconfirmed')

        this.tabs[0].val = this.orders.unconfirmed
        this.tabs[1].val = this.orders.confirmed
        this.tabs[2].val = this.orders.cooking
        this.tabs[3].val = this.orders.packing
        this.tabs[4].val = this.orders.shipping
        this.tabs[5].val = this.orders.done
        this.tabs[6].val = this.orders.canceled
    },
    components: {
        CardProfileProduct,
        SearchField,
        AppTabs,
        AppButtonMenu,
        AppDote,
        AppEmpty,
        AppShowHide
    },
    methods: {
        ...mapActions({
            signOut: 'auth/signOut',
            getCountOrder: 'order/getCount'
        }),
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        getRefresh (type) {
            this.getData(type)
            this.getLocalOrderCount()
        },
        async getData (type) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                status: type,
                owner_id: this.selectedCustomer.id
            }
            
            const rest = await axios.post('/api/order/getByStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false 
                // console.log('getdata', data)
            } else {
                this.visibleLoader = false
            }
        },
        onChangeTabs (data) {
            this.selectedIndex = data
            this.getData(this.tabs[data].target)
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        }
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token',
            orders: 'order/allCustomer'
        })
    },
    watch: {
        orders (props) {
            this.tabs[0].val = props.unconfirmed
            this.tabs[1].val = props.confirmed
            this.tabs[2].val = props.cooking
            this.tabs[3].val = props.packing
            this.tabs[4].val = props.shipping
            this.tabs[5].val = props.done
            this.tabs[6].val = props.canceled
        }
    }
}
</script>