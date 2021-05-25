<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="bg-white box-shadow">
                <div class="display-flex row space-between border-bottom padding padding-10-px" style="height: 40px;">
                    <div>
                        <AppTabs 
                            :selectedIndex="selectedTabIndex" 
                            :path="'main-topic'"
                            :data="tabs" 
                            :isScrollable="false" 
                            :onChange="(data) => onChangeTabs(data)" 
                            class="margins margin-bottom-15-px" />
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            class="mobile-hidden"
                            :icon="'fa fa-lw fa-filter'"
                            :button="'btn btn-icon btn-white'"
                            :onChange="(data) => onChangeMenu(data)" 
                            :data="[{label: 'By ID'}, {label: 'By Total Price'}, {label: 'By Payment Status'}, {label: 'By Order Status'}]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                        <SearchField :placeholder="'Search orders ..'" :enableResponsive="true" style="margin-left: 5px;" />
                    </div>
                </div>
                
                <div class="table-container">
                    <v-table 
                        :data="datas ? datas : []" 
                        :filters="filters" 
                        :currentPage.sync="currentPage" 
                        :pageSize="limitPage" 
                        @totalPagesChanged="totalPages = $event">
                        <thead slot="head">
                            <v-th class="small-col hide-icon">NO</v-th>
                            <v-th sortKey="order.order_id">Order ID</v-th>
                            <v-th sortKey="order.total_price">Total Price</v-th>
                            <v-th sortKey="table.name">Table</v-th>
                            <v-th sortKey="order.payment_status">Payment Status</v-th>
                            <v-th sortKey="order.status" class="normal-col">Order Status</v-th>
                            <th class="medium-col"></th>
                        </thead>
                        <tbody slot="body" slot-scope="{displayData}">
                            <AppLoader v-if="visibleLoader" />

                            <tr v-for="(row, index) in displayData" :key="index">
                                <td class="small-col">{{ (index + 1) }}</td>
                                <td>{{ row.order && row.order.order_id }}</td>
                                <td>{{ row.order && row.order.total_price }}</td>
                                <td>{{ row.table && row.table.name }}</td>
                                <td>
                                    <AppCapsuleMenu 
                                        :title="row.order.payment_status ? 'Paid' : 'Unpaid'"
                                        :status="row.order.payment_status ? 'active' : ''"
                                        :onChange="(data) => onChangeStatus(data, row.order.order_id, 'payment')" 
                                        :data="[{label: 'Paid'}, {label: 'Unpaid'}]"
                                    />
                                </td>
                                <td class="normal-col">
                                    <AppCapsuleMenu 
                                        :title="row.order.status"
                                        :status="(
                                        row.order.status === 'canceled' 
                                            ? '' 
                                            : row.order.status === 'done' 
                                                ? 'active' 
                                                : row.order.status === 'unconfirmed' || row.order.status === 'confirmed'
                                                    ? 'inactive' 
                                                    : 'active'
                                        )"
                                        :onChange="(data) => onChangeStatus(data, row.order.order_id, 'status')" 
                                        :data="bizparCapsule"
                                    />
                                </td>
                                <td class="medium-col">
                                    <div class="display-flex justify-content">
                                        <button 
                                            v-if="user.role_name === 'admin'" 
                                            class="btn btn-transparent btn-small-icon btn-radius" 
                                            @click="onShow('EDIT', row.order.id)">
                                            <i class="fa fa-lw fa-pencil-alt" />
                                        </button>
                                        <button 
                                            v-if="user.role_name === 'admin'"
                                            class="btn btn-transparent btn-small-icon btn-radius" 
                                            @click="onShowHideDelete(row.order.id)">
                                            <i class="fa fa-lw fa-trash-alt" />
                                        </button>
                                        <button 
                                            v-if="user.role_name === 'customer' && row.order.status === 'unconfirmed'" 
                                            class="btn btn-transparent btn-small-icon btn-radius" 
                                            @click="onShow('EDIT', row.order.id)">
                                            <i class="fa fa-lw fa-pencil-alt" />
                                        </button>
                                        <button class="btn btn-transparent btn-small-icon btn-radius" @click="onShow('VIEW', row.order.id)">
                                            <i class="fa fa-lw fa-ellipsis-v" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>

                <div class="padding padding-10-px" style="height: 40px;">
                    <smart-pagination
                        :currentPage.sync="currentPage"
                        :totalPages="totalPages"
                    />
                </div>
            </div>
        </div>

        <div class="right">
            <Form 
                :data.sync="selectedData"
                :message.sync="selectedMessage"
                :bizparOrder.sync="bizparOrder"
                :bizparStatus.sync="bizparStatus"
                :title="formTitle" 
                :onSave="(data) => onFormSave(data)"
                :onClose="onClose">
            </Form>
        </div>

        <AppAlert 
            v-if="visibleAlertDelete" 
            :isLoader="visibleLoaderAction"
            :title="'This action will remove data permanently, delete this data ?'" 
            :onClose="onShowHideDelete" 
            :onSave="removeData" />
        
        <AppAlert 
            v-if="visibleAlertSave" 
            :isLoader="visibleLoaderAction"
            :title="'Proceed this data ?'" 
            :onClose="onShowHideSave" 
            :onSave="saveData" />
    </div>
</template>

<script>
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
import AppTabs from '../../modules/AppTabs'
import AppLoader from '../../modules/AppLoader'
import AppAlert from '../../modules/AppAlert'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppCapsuleMenu from '../../modules/AppCapsuleMenu'
import Form from './Form'

export default {
    name: 'App',
    data () {
        return {
            visibleAlertDelete: false,
            visibleAlertSave: false,
            visibleLoader: false,
            visibleLoaderAction: false,
            formTitle: 'CREATE',
            formClass: false,
            datas: [],
            tabs: [
                {label: 'Active', status: 'active'},
                {label: 'Done', status: ''},
                {label: 'Canceled', status: ''},
            ],
            bizparCapsule: [],
            bizparOrder: [],
            bizparStatus: [],
            selectedTabIndex: null,
            selectedIndex: null,
            selectedForm: null,
            selectedData: null,
            selectedMessage: null,
            filters: {
                name: { value: '', keys: ['name'] }
            },
            limitPage: 10,
            currentPage: 1,
            totalPages: 0,
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData()
        this.getBizpar()
    },
    components: {
        AppTabs,
        AppAlert,
        AppLoader,
        AppCapsuleMenu,
        AppButtonMenu,
        SearchField,
        Form
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            token: 'auth/token'
        })
    },
    methods: {
        ...mapActions({
            getCountOrder: 'order/getCount'
        }),
        getLocalOrderCount () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            this.getCountOrder(token)
        },
        onChangeTabs (index) {
            this.selectedTabIndex = index
            switch (index) {
                case 1:
                    this.getDataByStatus('done')
                    break;
                case 2:
                    this.getDataByStatus('canceled')
                    break;
                default:
                    this.getData()
                    break;
            }
        },
        onChangeMenu (index) {
            console.log('onChange', index)
        },
        nameLength (row) {
            return row.key.length
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.order.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            console.log(payload)
            return payload
        },
        onSave () {
            this.visibleAlertDelete = false
            this.visibleAlertSave = false
            this.formClass = false
        },
        onClose () {
            this.formClass = false
        },
        onShow (title, index = null) {
            this.formClass = true
            this.formTitle = title
            this.selectedData = index >= 0 ? this.onSearchData(index) : null
            this.selectedMessage = null 
        },
        onShowHideDelete (index = null) {
            this.visibleAlertDelete = !this.visibleAlertDelete
            this.selectedIndex = index
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
        },
        onFormSave (data = null) {
            this.onShowHideSave()
            this.selectedForm = data && data.order ? data.order : null
        },
        onChangeStatus (index, id, type) {
            let data = null
            switch (type) {
                case 'status':
                    data = this.bizparCapsule[index].label
                    this.changeStatusOrder(id, data)
                    break;
                default:
                    data = index === 0 ? true : false 
                    this.changeStatusPayment(id, data)
                    break;
            }
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
                    this.getData()
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false
                }
            }
        },
        async changeStatusPayment (id, status) {
            var a = confirm('Change this payment status ?')
            if (a) {
                this.visibleLoader = true 

                const token = 'Bearer '.concat(this.$cookies.get('token'))
                const payload = {
                    order_id: id,
                    payment_status: status
                }
                
                const rest = await axios.post('/api/order/postOrderPaymentStatus', payload, { headers: { Authorization: token } })

                if (rest && rest.status === 200) {
                    this.getData()
                    this.visibleLoader = false 
                } else {
                    this.visibleLoader = false
                }
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).order.order_id
            const payload = {
                order_id: id
            }

            const rest = await axios.post('/api/order/delete', payload, { headers: { Authorization: token } })
            console.log('rest', rest)

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.onChangeTabs(this.selectedTabIndex)
                    this.getLocalOrderCount()
                } else {
                    alert('Proceed failed')
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async saveData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedForm
            const url = this.formTitle === 'CREATE' ? '/api/order/post' : '/api/order/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.onChangeTabs(this.selectedTabIndex)
                    this.getLocalOrderCount()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getDataByStatus (type) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0,
                status: type
            } : {
                limit: 1000,
                offset: 0,
                status: type,
                user_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/order/getByStatus', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false
            }
        },
        async getData () {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.dataUser.role_name === 'admin' ? {
                limit: 1000,
                offset: 0
            } : {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/order/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false
            }
        },
        async getBizpar () {
            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                type: ''
            }

            const rest = await axios.post('/api/bizpar/getByType', {...payload, type: 'order'}, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.bizparOrder = data
            }

            const response = await axios.post('/api/bizpar/getByType', {...payload, type: 'orderstatus'}, { headers: { Authorization: token } })

            if (response && response.status === 200) {
                const data = response.data.data
                this.bizparStatus = data
                this.bizparCapsule = data && data.map((dt) => {
                    return {
                        label: dt.value
                    }
                })
            }
        }
    }
}
</script>