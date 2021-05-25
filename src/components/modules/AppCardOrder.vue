<template>
    <div id="AppCardOrder">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow bg-white" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
            <div class="display-flex space-between" style="margin-bottom: 20px;">
                <div class="display-flex">
                    <div style="margin-right: 10px;"><i class="fa fa-1x fa-shopping-bag fonts orange"></i></div>
                    <div class="display-flex mobile-hidden">
                        <div class="fonts fonts-10 grey">{{ dt.order.created_at }}</div>
                        <AppDote style="margin-top: 8px;" />
                        <div class="fonts fonts-10 grey">{{ dt.order.order_id }}</div>
                        <AppDote v-if="dt.table" style="margin-top: 8px;" />
                        <div class="fonts fonts-10 grey">{{ dt.table && dt.table.name }}</div>
                    </div>
                </div>
                <div v-if="type === 'owner'" class="display-flex">
                    <AppCapsuleMenu 
                        :title="dt.order.payment_status ? 'Paid' : 'Unpaid'"
                        :status="dt.order.payment_status ? 'active' : ''"
                        :onChange="(data) => onChangeStatus(data, dt.order.order_id, 'payment')" 
                        :data="[{label: 'Paid'}, {label: 'Unpaid'}]"
                    />
                    <AppCapsuleMenu 
                        :title="dt.order.status"
                        :status="(
                        dt.order.status === 'canceled' 
                            ? '' 
                            : dt.order.status === 'done' 
                                ? 'active' 
                                : dt.order.status === 'unconfirmed' || dt.order.status === 'confirmed'
                                    ? 'inactive' 
                                    : 'active'
                        )"
                        :onChange="(data) => onChangeStatus(data, dt.order.order_id, 'status')" 
                        :data="bizparCapsule"
                        style="margin-left: 5px;"
                    />
                </div>
                <div v-else class="display-flex">
                    <div 
                        class="card-capsule" 
                        style="margin-right: 5px;">
                        {{ 
                            dt.order.payment_status 
                                ? 'Paid' 
                                : 'Unpaid' 
                        }}
                    </div>
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
                                ? 'Unconfirmed' 
                                : dt.order.status === 'confirmed' 
                                    ? 'Confirmed'
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
            <div class="display-flex display-mobile" style="padding-top: 5px; padding-bottom: 20px;">
                <div class="width width-76 width-mobile border-right border-mobile-none">
                    <AppImageProduct :data.sync="dt.details" :to="1" />
                    <AppShowHide v-if="dt.details.length > 1" :title="'More Products (' + (dt.details.length - 1) + ')'">
                        <AppImageProduct :data.sync="dt.details" :from="1" :to="dt.details.length" />
                    </AppShowHide>
                </div>
                <div class="width width-24 width-mobile">
                    <div style="height: 90px; padding-left: 30px;" class="no-margin-padding">
                        <div class="post-top">
                            <div class="fonts fonts-10 grey" style="margin-bottom: 5px;">Total Payment</div>
                            <div class="fonts fonts-12 semibold">Rp {{ dt.order.total_price }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="type === 'owner'" class="display-flex row space-between">
                <div>
                    <button 
                        class="btn btn-grey with-hover" 
                        style="margin-right: 15px;" 
                        @click="onButtonDetail(dt)">
                        View Transaction Detail
                    </button>
                </div>
                <div class="display-flex">
                    <button 
                        v-if="!dt.order.payment_status" 
                        class="btn btn-main-reverse mobile-hidden" 
                        style="margin-right: 15px;"
                        @click="makeToast('You can conduct payment, after receiving or finishing this order..')">
                        Waiting for Payment
                    </button>
                    <AppButtonMenu :onChange="(data) => onChangeMenuOwner(data, dt.order.id)" :data="[{icon: 'fa fa-1x fa-pencil-alt', label: 'Edit'}, {icon: 'fa fa-1x fa-trash-alt', label: 'Delete'}, {icon: 'fa fa-1x fa-ellipsis-h', label: 'View'}]" />
                </div>
            </div>
            <div v-else class="display-flex row space-between">
                <div>
                    <button 
                        class="btn btn-grey with-hover" 
                        style="margin-right: 15px;"
                        @click="onButtonDetail(dt)">
                        View Transaction Detail
                    </button>
                </div>
                <div class="display-flex">
                    <button 
                        v-if="!dt.order.payment_status" 
                        class="btn btn-main-reverse mobile-hidden" 
                        style="margin-right: 15px;"
                        @click="makeToast('You can conduct payment, after receiving or finishing this order..')">
                        Waiting for Payment
                    </button>
                    <AppButtonMenu :onChange="(data) => onChangeMenu(data)" :data="[{label: 'Buy again'}, {label: 'Chat admin'}, {label: 'Help'}]" />
                </div>
            </div>
        </div> 

        <AppPopupForm
            v-if="visibleDetail"
            :enableRadius="true"
            :title="'Transaction Detail'"
            :onClose="onButtonDetail"
        >
            <div style="padding: 15px 0;">
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        ID
                    </div>
                    <div class="fonts fonts-10 semibold orange">
                        {{ selectedData.order.order_id }}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Status 
                    </div>
                    <div class="fonts fonts-10 semibold orange" style="text-transform: capitalize;">
                        {{ selectedData.order.status  }}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Order Date
                    </div>
                    <div class="fonts fonts-10 black semibold orange">
                        {{ selectedData.order.created_at  }}
                    </div>
                </div>
                <div style="margin-bottom: 15px;">
                    <div class="fonts fonts-10 grey">
                        Note
                    </div>
                    <div class="fonts fonts-10 black semibold orange">
                        # {{ selectedData.order.note  }}
                    </div>
                </div>

                <div class="border-top" style="padding-top: 15px; padding-bottom: 0;">
                    <div class="display-flex space-between" style="margin-bottom: 10px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Product</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 grey">Price</div>
                        </div>
                    </div>

                    <div v-for="(dt, index) in selectedData.details" :key="index" class="display-flex space-between" style="margin-bottom: 15px;">
                        <div class="width width-70 display-flex">
                            <div class="width width-18">
                                <div class="image image-padding">
                                    <img :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                                </div>
                            </div>
                            <div class="width width-2"></div>
                            <div class="width width-80">
                                <div class="fonts fonts-10 semibold black">
                                    {{ dt.product_name }}<AppDote style="position: relative; top: -2px;" />{{ dt.product_detail }}
                                </div>
                                <div class="fonts fonts-10 grey">
                                    {{ dt.quantity }} product x Rp {{ (dt.price + dt.toping_price) }}
                                </div>
                                <div v-if="dt.product_toping" class="fonts fonts-10 grey">
                                    {{ dt.product_toping }} Rp. {{ dt.toping_price }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-11 semibold orange">Rp. {{ dt.subtotal }}</div>
                        </div>
                    </div>
                </div>

                <div class="border-top" style="padding-top: 15px; padding-bottom: 15px;">
                    <div class="display-flex space-between" style="margin-bottom: 10px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Payment</div>
                        </div>
                        <div class="width width-30"></div>
                    </div>
                    <div class="display-flex space-between" style="margin-bottom: 5px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Total Price ({{ selectedData.order.total_item }} Product)</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 black">Rp. {{ selectedData.order.total_price }}</div>
                        </div>
                    </div>
                    <div class="display-flex space-between" style="margin-bottom: 5px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">PPN (0%)</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 black">Rp. 0</div>
                        </div>
                    </div>
                    <div class="display-flex space-between" style="margin-bottom: 5px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Total Payment</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 semibold orange">Rp. {{ selectedData.order.total_price }}</div>
                        </div>
                    </div>
                    <div class="display-flex space-between">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Payment Method</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 black">{{ selectedData.payment.name }}</div>
                        </div>
                    </div>
                </div>

                <div v-if="selectedData.table" class="border-top" style="padding-top: 15px;">
                    <div class="display-flex space-between" style="margin-bottom: 10px;">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Table</div>
                        </div>
                        <div class="width width-30"></div>
                    </div>
                    <div class="display-flex space-between">
                        <div class="width width-70 display-flex">
                            <div class="width width-18">
                                <div class="image image-padding">
                                    <img :src="tableImageThumbnailUrl + selectedData.table.image" alt="" class="post-center">
                                </div>
                            </div>
                            <div class="width width-2"></div>
                            <div class="width width-80">
                                <div class="fonts fonts-11 semibold black">
                                    {{ selectedData.table.name }}
                                </div>
                                <div class="fonts fonts-10 grey">
                                    {{ selectedData.table.code }} | {{ selectedData.table.description }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-30"></div>
                    </div>
                </div>
            </div>
        </AppPopupForm>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppPopupForm from './AppPopupForm'
import AppButtonMenu from './AppButtonMenu'
import AppDote from './AppDote'
import AppShowHide from './AppShowHide'
import AppImageProduct from './AppImageProduct'
import AppCapsuleMenu from './AppCapsuleMenu'

export default {
    name: 'AppCardOrder',
    data () {
        return {
            visibleDetail: false,
            selectedData: null,
            bizparOrder: [],
            bizparStatus: [],
            bizparCapsule: []
        }
    },
    mounted () {
        this.getBizpar()
    },
    components: {
        AppPopupForm,
        AppCapsuleMenu,
        AppButtonMenu,
        AppDote,
        AppShowHide,
        AppImageProduct
    },
    props: {
        type: {
            type: String,
            required: false
        },
        data: {
            required: true 
        },
        onView: {
            type: Function,
            required: false
        },
        onEdit: {
            type: Function,
            required: false
        },
        onDelete: {
            type: Function,
            required: false
        },
        onChangeStatus: {
            type: Function,
            required: false
        }
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
        onChangeMenuOwner (data, id) {
            switch (data) {
                case 1:
                    this.onDelete(id)
                    break
                case 2:
                    this.onView(id)
                    break
                default:
                    this.onEdit(id)
                    break
            }
        },
        onChangeMenu (data) {
            console.log('index', data)
        },
        onButtonDetail (data) {
            this.visibleDetail = !this.visibleDetail
            this.selectedData = data 
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