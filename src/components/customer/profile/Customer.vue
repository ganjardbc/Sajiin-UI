<template>
    <div id="App">
            <div class="card border-full bg-white" style="overflow: unset;">
                <div class="display-flex row space-between" style="height: 40px; margin-bottom: 20px;">
                    <div class="width width-35">
                        <SearchField :placeholder="'Search customers ..'" />
                    </div>
                    <div class="display-flex">
                        <AppButtonMenu 
                            icon="fa fa-lg fa-sort"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onSingleMenu(data)" 
                            :data="[
                                {label: 'Current', icon: 'fa fa-lw fa-sort-numeric-down'}, 
                                {label: 'Old', icon: 'fa fa-lw fa-sort-numeric-up'}, 
                                {label: 'A to Z', icon: 'fa fa-lw fa-sort-alpha-down'}, 
                                {label: 'Z to A', icon: 'fa fa-lw fa-sort-alpha-up'}
                            ]" />
                        <AppButtonMenu 
                            icon="fa fa-lw fa-filter"
                            button="btn btn-white btn-icon btn-radius"
                            :onChange="(data) => onSingleMenu(data)" 
                            :data="[
                                {label: 'Active'}, 
                                {label: 'Inactive'}
                            ]" />
                        <button class="btn btn-white btn-icon btn-radius" @click="onShow('CREATE')">
                            <i class="fa fa-lg fa-plus" />
                        </button>
                    </div>
                </div>

                <div v-if="datas.length > 0">
                    <div v-for="(dt, i) in datas" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                        <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 20px;">
                            <div style="width: 60px; margin-right: 20px;">
                                <div class="image image-padding image-circle">
                                    <img :src="'/contents/customers/thumbnails/' + dt.customer.image" alt="" class="post-center">
                                </div>
                            </div>
                            <div style="width: calc(100% - 150px);">
                                <div class="fonts fonts-11 semibold" style="margin-bottom: 5px;">{{ dt.customer.name }}</div>
                                <div class="display-flex" style="margin-bottom: 5px;">
                                    <div style="width: 25px;">
                                        <i class="fa fa-lw fa-envelope" style="font-size: 14px; color: #555;" />
                                    </div>
                                    <div class="fonts fonts-10 grey">{{ dt.customer.email }}</div>
                                </div>
                                <div class="display-flex" style="margin-bottom: 5px;">
                                    <div style="width: 25px;">
                                        <i class="fa fa-lw fa-phone" style="font-size: 14px; color: #555;" />
                                    </div>
                                    <div class="fonts fonts-10 grey">{{ dt.customer.phone }}</div>
                                </div>
                                <div class="display-flex">
                                    <div style="width: 25px;">
                                        <i class="fa fa-lw fa-info-circle" style="font-size: 14px; color: #555;" />
                                    </div>
                                    <div class="fonts fonts-10 grey">{{ dt.customer.about }}</div>
                                </div>
                            </div>
                            <div class="display-flex column space-between" style="width: 90px; height: 100px;">
                                <div class="display-flex space-between">
                                    <div></div>
                                    <div 
                                        :class="'card-capsule ' + (
                                        dt.customer.status === 'active' 
                                            ? 'active' 
                                            : ''
                                        )" 
                                        style="margin-left: 15px; text-transform: capitalize;">
                                        {{ dt.customer.status }}
                                    </div>
                                </div>
                                <div class="display-flex space-between">
                                    <div></div>
                                    <AppButtonMenu :onChange="(data) => onChangeMenu(data, dt.customer.id)" :data="[{label: 'Edit'}, {label: 'Hapus'}]" />
                                </div>
                            </div>
                        </div>
                        <FormAddress 
                            :selectedId.sync="dt.customer.id"
                            :selectedCustomerId.sync="dt.customer.customer_id"
                            :enablePopup="popupCreate" />
                    </div>
                </div>

                <div v-else>
                    <AppEmpty />
                </div>
            </div>

        <FormCustomer 
            v-if="visiblePopup"
            :data.sync="selectedData"
            :message.sync="selectedMessage"
            :title="formTitle" 
            :uploadImage="(data) => uploadImage(data)"
            :removeImage="removeImage"
            :onSave="(data) => onFormSave(data)"
            :onClose="onClose" />
        
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
import SearchField from '../../modules/SearchField'
import FormCustomer from './forms/Customer'
import FormAddress from './forms/Address'
import AppAlert from '../../modules/AppAlert'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppEmpty from '../../modules/AppEmpty'

export default {
    name: 'App',
    data () {
        return {
            id: '',
            customerId: '',
            formTitle: 'CREATE',
            selectedForm: null,
            selectedData: null,
            selectedMessage: null,
            selectedIndex: null,
            isActive: true,
            visibleLoader: false,
            visibleLoaderAction: false,
            visiblePopup: false,
            visibleAlertDelete: false,
            visibleAlertSave: false,
            popupCreate: false,
            dataUser: null,
            datas: []
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.getData()
    },
    components: {
        AppEmpty,
        AppButtonMenu,
        AppAlert,
        FormAddress,
        FormCustomer,
        SearchField
    },
    methods: {
        onSingleMenu (data) {
            console.log('onSingleMenu', data)
        },
        onChangeMenu (data, index) {
            if (data == 0) {
                this.onShowEdit(index)
            } else {
                this.onShowHideDelete(index)
            }
        },
        onButtonCreate (id, customerId) {
            this.popupCreate = !this.popupCreate
            this.id = id 
            this.customerId = customerId
        },
        onShow (title) {
            this.selectedData = null 
            this.visiblePopup = true
            this.formTitle = title
        },
        onClose () {
            this.visiblePopup = false
            this.formTitle = 'CREATE'
        },
        onShowEdit (index) {
            this.selectedData = this.onSearchData(index)
            this.visiblePopup = true 
            this.formTitle = 'EDIT'
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
            this.selectedForm = data && data.customer ? data.customer : null
        },
        onSearchData (id) {
            let payload = null
            this.datas.map((dt) => {
                if (dt.customer.id === id) {
                    payload = {...dt}
                }
                return null 
            })
            return payload
        },
        onChangeImage (data) {
            this.selectedData = {
                ...this.selectedData,
                customer: {
                    ...this.selectedData.customer,
                    image: data
                }
            }
        },
        async uploadImage (data) {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.customer
            const url = '/api/customer/uploadImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);
            formData.append('image', data);

            const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

            if (rest && rest.status === 200) {
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data && data.image) {
                    this.onChangeImage(data && data.image)
                    this.getData()
                    this.selectedMessage = []
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
            }
        },
        async removeImage () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = this.selectedData.customer
            const url = '/api/customer/removeImage' 

            let formData = new FormData();
            formData.append('customer_id', payload.customer_id);

            var a = confirm('remove this image ?')
            if (a) {
                const rest = await axios.post(url, formData, { headers: { Authorization: token, 'Content-Type': 'multipart/form-data' } })

                if (rest && rest.status === 200) {
                    this.visibleLoaderAction = false

                    const data = rest.data.data
                    this.onChangeImage(data && data.image)
                    this.getData()
                } else {
                    alert('Proceed failed')
                }
            }
        },
        async removeData () {
            this.visibleLoaderAction = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const id = this.onSearchData(this.selectedIndex).customer.customer_id
            const payload = {
                customer_id: id
            }

            const rest = await axios.post('/api/customer/delete', payload, { headers: { Authorization: token } })
            console.log('rest', rest)

            if (rest && rest.status === 200) {
                this.onShowHideDelete()
                this.onClose()
                this.visibleLoaderAction = false

                const data = rest.data
                if (data.status === 'ok') {
                    this.getData()
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
            const url = this.formTitle === 'CREATE' ? '/api/customer/post' : '/api/customer/update' 

            const rest = await axios.post(url, payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                this.onShowHideSave()
                this.visibleLoaderAction = false

                const data = rest.data.data
                if (data.length !== 0) {
                    this.onClose()
                    this.getData()
                } else {
                    this.selectedMessage = rest.data.message
                }
            } else {
                alert('Proceed failed')
                this.visibleLoaderAction = false
            }
        },
        async getData () {
            this.visibleLoader = true

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: 1000,
                offset: 0,
                user_id: this.dataUser.id
            }
            
            const rest = await axios.post('/api/customer/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                this.datas = data
                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
            }

            console.log('rest', rest)
        }
    }
}
</script>