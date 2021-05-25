<template>
    <div id="form">
        <AppSideForm 
            :title="title" 
            :enableCreateButton="this.title === 'EDIT' ? selectedIndex === 6 ? true : false : false"
            :enableSaveButton="this.title !== 'VIEW' ? true : false"
            :onCreate="onButtonCreate"
            :onSave="onButtonSave"
            :onClose="onClose">

            <AppTabs 
                :selectedIndex="selectedIndex" 
                :path="'main-form-order'"
                :data="tabs" 
                :isScrollable="true" 
                :onChange="(data) => onChangeTabs(data)" 
                class="margin margin-bottom-15-px" />

            <div v-if="selectedIndex === 0">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="id" 
                        id="id" 
                        v-model="formData.order.id"
                        readonly>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ORDER ID</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="order_id" 
                        id="order_id" 
                        v-model="formData.order.order_id"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.order_id && formMessage.order_id[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">DELIVERY FEE</div>
                    <input 
                        v-if="dataUser.role_name === 'owner'"
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="delivery_fee" 
                        id="delivery_fee" 
                        @change="onChangeDeliveryFee"
                        v-model="formData.order.delivery_fee"
                        :readonly="this.title === 'EDIT' ? false : true">
                    <input 
                        v-else
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="delivery_fee" 
                        id="delivery_fee" 
                        style="text-transform: capitalize;"
                        :value="formData.order.delivery_fee"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.delivery_fee && formMessage.delivery_fee[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TOTAL PRICE</div>
                    <input 
                        type="text" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="total_price" 
                        id="total_price" 
                        v-model="formData.order.total_price"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.total_price && formMessage.total_price[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">TOTAL ITEM</div>
                    <input 
                        type="number" 
                        placeholder="" 
                        class="field field-sekunder" 
                        name="total_item" 
                        id="total_item" 
                        v-model="formData.order.total_item"
                        readonly>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.total_item && formMessage.total_item[0] }}
                    </div>
                </div>
                <!-- <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PROOF OF PAYMENT</div>
                    <div class="display-flex">
                        <label class="radio">
                            <input 
                                type="radio" 
                                name="proof_of_payment"
                                id="proofed"
                                value="1"
                                v-model="formData.order.proof_of_payment" />
                            <span class="checkmark" />
                            <span class="fonts micro">
                                Proofed
                            </span>
                        </label>

                        <label class="radio">
                            <input 
                                type="radio" 
                                name="proof_of_payment"
                                id="unfrooped"
                                value="0"
                                v-model="formData.order.proof_of_payment" />
                            <span class="checkmark" />
                            <span class="fonts micro">
                                Unproofed
                            </span>
                        </label>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.proof_of_payment && formMessage.proof_of_payment[0] }}
                    </div>
                </div> -->
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PAYMENT STATUS</div>
                    <div v-if="this.title === 'EDIT' ? true : false">
                        <div v-if="dataUser.role_name === 'owner'" class="display-flex">
                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="payment_status"
                                    id="paid"
                                    value="1"
                                    v-model="formData.order.payment_status" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Paid
                                </span>
                            </label>

                            <label class="radio">
                                <input 
                                    type="radio" 
                                    name="payment_status"
                                    id="unpaid"
                                    value="0"
                                    v-model="formData.order.payment_status" />
                                <span class="checkmark" />
                                <span class="fonts micro">
                                    Unpaid
                                </span>
                            </label>
                        </div>
                        <div v-else>
                            <div style="width: 100%;">
                                <input 
                                    type="text" 
                                    placeholder="" 
                                    class="field field-sekunder" 
                                    name="payment_status" 
                                    id="payment_status" 
                                    style="text-transform: capitalize;"
                                    :value="formData.order.payment_status ? 'Paid' : 'Unpaid'"
                                    readonly>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div style="width: 100%;">
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="payment_status" 
                                id="payment_status" 
                                style="text-transform: capitalize;"
                                :value="formData.order.payment_status ? 'Paid' : 'Unpaid'"
                                readonly>
                        </div>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.payment_status && formMessage.payment_status[0] }}
                    </div>
                </div>
                <!-- <div v-if="formData.order.status === 'confirmed' ? true : false" class="field-group margin margin-bottom-15-px">
                    <div class="field-label">PROOF OF PAYMENT</div>
                    <AppImage 
                        :image.sync="image"
                        :isEnable="this.title !== 'VIEW' ? true : false"
                        :onUpload="(data) => uploadImage(data)"
                        :onRemove="removeImage"
                    />
                </div> -->
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ORDER STATUS</div>
                    <div v-if="this.title === 'EDIT' ? true : false">
                        <select 
                            v-if="dataUser.role_name === 'owner'"
                            class="cf-input slc slc-sekunder"
                            name="status" 
                            id="status" 
                            v-model="formData.order.status"
                            :readonly="this.title === 'VIEW' ? true : false">
                            <option v-for="(ctr, index) in formBpStatus" :value="ctr.value" :key="index">
                                {{ ctr.value }}
                            </option>
                        </select>
                        <div v-else>
                            <input 
                                type="text" 
                                placeholder="" 
                                class="field field-sekunder" 
                                name="order_status" 
                                id="order_status" 
                                style="text-transform: capitalize;"
                                :value="formData.order.status"
                                readonly>
                        </div>
                    </div>
                    <div v-else>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="order_status" 
                            id="order_status" 
                            style="text-transform: capitalize;"
                            :value="formData.order.status"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.status && formMessage.status[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ORDER TYPE</div>
                    <div v-if="this.title !== 'VIEW' ? true : false">
                        <select 
                            class="cf-input slc slc-sekunder"
                            name="type" 
                            id="type" 
                            v-model="formData.order.type"
                            :readonly="this.title === 'VIEW' ? true : false">
                            <option v-for="(ctr, index) in formBpOrder" :value="ctr.value" :key="index">
                                {{ ctr.value }}
                            </option>
                        </select>
                    </div>
                    <div v-else>
                        <input 
                            type="text" 
                            placeholder="" 
                            class="field field-sekunder" 
                            name="type" 
                            id="type" 
                            style="text-transform: capitalize;"
                            :value="formData.order.type"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.type && formMessage.type[0] }}
                    </div>
                </div>
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">NOTE</div>
                    <textarea 
                        name="note" 
                        id="note" 
                        class="field field-sekunder field-textarea" 
                        v-model="formData.order.note"
                        :readonly="this.title === 'VIEW' ? true : false"></textarea>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.note && formMessage.note[0] }}
                    </div>
                </div>
            </div>

            <div v-if="selectedIndex === 1">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="table_id" 
                            id="table_id" 
                            v-model="formData.order.table_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonTable">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.table_id && formMessage.table_id[0] }}
                    </div>
                </div>
                <FormTable 
                    :data.sync="formData.table"
                    :enablePopup="openCreateTable"
                    :onChange="(data) => onChangeTable(data)"
                />
            </div>

            <div v-if="selectedIndex === 2">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="payment_id" 
                            id="payment_id" 
                            v-model="formData.order.payment_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonPayment">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="payment_id" 
                            id="payment_id" 
                            v-model="formData.order.payment_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.payment_id && formMessage.payment_id[0] }}
                    </div>
                </div>
                <FormPayment
                    :data.sync="formData.payment"
                    :enablePopup="openCreatePayment"
                    :onChange="(data) => onChangePayment(data)"
                />
            </div>

            <div v-if="selectedIndex === 3">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="shipment_id" 
                            id="shipment_id" 
                            v-model="formData.order.shipment_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonShipment">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="shipment_id" 
                            id="shipment_id" 
                            v-model="formData.order.shipment_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.shipment_id && formMessage.shipment_id[0] }}
                    </div>
                </div>
                <FormShipment
                    :data.sync="formData.shipment"
                    :enablePopup="openCreateShipment"
                    :onChange="(data) => onChangeShipment(data)"
                />
            </div>

            <div v-if="selectedIndex === 4">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="customer_id" 
                            id="customer_id" 
                            v-model="formData.order.customer_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonCustomer">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="customer_id" 
                            id="customer_id" 
                            v-model="formData.order.customer_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.customer_id && formMessage.customer_id[0] }}
                    </div>
                </div>
                <FormCustomer
                    :data.sync="formData.customer"
                    :enablePopup="openCreateCustomer"
                    :onChange="(data) => onChangeCustomer(data)"
                />
            </div>

            <div v-if="selectedIndex === 5">
                <div class="field-group margin margin-bottom-15-px">
                    <div class="field-label">ID</div>
                    <div v-if="this.title !== 'VIEW'" class="card-search full">
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field"
                            name="address_id" 
                            id="address_id" 
                            v-model="formData.order.address_id"
                            readonly>
                        <button class="btn btn-icon btn-white" @click="onButtonAddress">
                            <i class="fa fa-1x fa-search" />
                        </button>
                    </div>
                    <div v-else>
                        <input 
                            type="search" 
                            placeholder="" 
                            class="field field-sekunder"
                            style="width: 100%;"
                            name="address_id" 
                            id="address_id" 
                            v-model="formData.order.address_id"
                            readonly>
                    </div>
                    <div v-if="formMessage" class="fonts micro bold" style="color: red; margin-top: 5px;">
                        {{ formMessage && formMessage.address_id && formMessage.address_id[0] }}
                    </div>
                </div>
                <FormAddress
                    :data.sync="formData.address"
                    :customerId.sync="formData.customer.customer_id"
                    :enablePopup="openCreateAddress"
                    :onChange="(data) => onChangeAddress(data)"
                />
            </div>

            <div v-if="selectedIndex === 6">
                <FormProduct 
                    :selectedId.sync="formData.order.id"
                    :selectedOrderId.sync="formData.order.order_id"
                    :enableButton="title === 'EDIT' ? true : false"
                    :enablePopup="popupProductCreate"
                    :onCalculate="(data) => onCalculate(data)"
                />
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import AppSideForm from '../../modules/AppSideForm'
import AppTabs from '../../modules/AppTabs'
import AppImage from '../../modules/AppImage'
import FormCustomer from './FormCustomer'
import FormAddress from './FormAddress'
import FormShipment from './FormShipment'
import FormPayment from './FormPayment'
import FormTable from './FormTable'
import FormProduct from './FormProduct'

const tabs = [
    {label: 'Data', status: 'active'},
    {label: 'Table', status: ''},
    {label: 'Payment', status: ''},
    {label: 'Shipment', status: ''},
    {label: 'Customer', status: ''},
    {label: 'Address', status: ''},
    {label: 'Products', status: ''}
]

const time = new Date().getTime()

const payload = {
    order: {
        id: '',
        order_id: 'ODR-' + time.toString(),
        delivery_fee: 0,
        total_price: 0,
        total_item: 0,
        payment_status: 0,
        proof_of_payment: '',
        status: 'unconfirmed',
        type: '',
        note: '',
        table_id: '',
        customer_id: '',
        address_id: '',
        shipment_id: '',
        payment_id: ''
    },
    details: [],
    customer: {},
    address: {},
    shipment: {},
    payment: {},
    table: {}
}

export default {
    name: 'form',
    data () {
        return {
            image: '',
            openCreateTable: false,
            openCreatePayment: false,
            openCreateShipment: false,
            openCreateAddress: false,
            openCreateCustomer: false,
            popupProductCreate: false,
            selectedIndex: 0,
            isView: false,
            tabs: tabs,
            formData: {...payload},
            formMessage: [],
            formBpOrder: [],
            formBpStatus: [],
            dataUser: null 
        }
    },
    mounted () {
        this.dataUser = this.$cookies.get('user')
        this.formData = {...payload}
    },
    components: {
        AppImage,
        FormTable,
        FormProduct,
        FormPayment,
        FormShipment,
        FormAddress,
        FormCustomer,
        AppSideForm,
        AppTabs
    },
    props: {
        uploadImage: {
            type: Function,
            required: false,
        },
        removeImage: {
            type: Function,
            required: false,
        },
        bizparOrder: {
            required: true
        },
        bizparStatus: {
            required: true
        },
        data: {
            required: true
        },
        message: {
            required: false
        },
        title: {
            type: String,
            required: true
        },
        onSave: {
            type: Function,
            required: true
        },
        onClose: {
            type: Function,
            required: true
        }
    },
    methods: {
        onButtonTable () {
            this.openCreateTable = !this.openCreateTable
        },
        onButtonPayment () {
            this.openCreatePayment = !this.openCreatePayment
        },
        onButtonShipment () {
            this.openCreateShipment = !this.openCreateShipment
        },
        onButtonAddress () {
            this.openCreateAddress = !this.openCreateAddress
        },
        onButtonCustomer () {
            this.openCreateCustomer = !this.openCreateCustomer
        },
        onButtonCreate () {
            this.popupProductCreate = !this.popupProductCreate
        },
        onButtonSave () {
            const newPayload = this.formData
            this.onSave(newPayload)
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        onChangeCustomer (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    customer_id: data.id
                },
                customer: {
                    ...data
                }
            }
        },
        onChangeAddress (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    address_id: data.id
                },
                address: {
                    ...data
                }
            }
        },
        onChangeShipment (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    shipment_id: data.id
                },
                shipment: {
                    ...data
                }
            }
        },
        onChangePayment (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    payment_id: data.id
                },
                payment: {
                    ...data
                }
            }
        },
        onChangeTable (data) {
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    table_id: data.id
                },
                table: {
                    ...data
                }
            }
        },
        onChangeDeliveryFee () {
            let ttl = (parseInt(this.formData.order.total_price) + parseInt(this.formData.order.delivery_fee))
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    total_price: ttl,
                }
            }
        },
        onCalculate (data) {
            var quantity = 0
            var subtotal = 0
            data && data.map((dt) => {
                quantity += dt.quantity
                subtotal += dt.subtotal
            })
            this.formData = {
                ...this.formData,
                order: {
                    ...this.formData.order,
                    total_price: (subtotal + this.formData.order.delivery_fee),
                    total_item: quantity
                }
            }
        }
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.formData = {
                    ...this.formData,
                    order: {
                        ...this.formData.order,
                        id: props.order.id,
                        order_id: props.order.order_id,
                        delivery_fee: props.order.delivery_fee,
                        total_price: props.order.total_price,
                        total_item: props.order.total_item,
                        payment_status: props.order.payment_status,
                        proof_of_payment: props.order.proof_of_payment,
                        status: props.order.status,
                        type: props.order.type,
                        note: props.order.note,
                        table_id: props.order.table_id,
                        customer_id: props.order.customer_id,
                        address_id: props.order.address_id,
                        shipment_id: props.order.shipment_id,
                        payment_id: props.order.payment_id
                    },
                    details: [
                        ...props.details
                    ],
                    customer: {
                        ...props.customer
                    },
                    address: {
                        ...props.address
                    },
                    shipment: {
                        ...props.shipment
                    },
                    payment: {
                        ...props.payment
                    },
                    table: {
                        ...props.table
                    }
                }
            } else {
                this.formData = {...payload}
            }
            this.onChangeTabs(0)
        },
        bizparOrder: function (props, prevProps) {
            if (props) {
                this.formBpOrder = props
            } else {
                this.formBpOrder = []
            }
        },
        bizparStatus: function (props, prevProps) {
            if (props) {
                this.formBpStatus = props
            } else {
                this.formBpStatus = []
            }
        },
        message: function (props, prevProps) {
            if (props) {
                this.formMessage = props
            } else {
                this.formMessage = []
            }
        }
    }
}
</script>