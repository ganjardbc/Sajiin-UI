<template>
    <div id="AppCardOrder">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
            <div class="display-flex space-between" style="margin-bottom: 20px;">
                <div class="display-flex">
                    <div style="margin-right: 10px;"><i class="fa fa-1x fa-shopping-bag fonts main"></i></div>
                    <div class="display-flex mobile-hidden">
                        <div class="fonts fonts-10 grey">{{ dt.order.created_at }}</div>
                        <AppDote style="margin-top: 8px;" />
                        <div class="fonts fonts-10 grey">{{ dt.order.order_id }}</div>
                    </div>
                </div>
                <div class="display-flex">
                    <div class="card-capsule" style="margin-right: 5px;">{{ dt.order.payment_status ? 'Paid' : 'Unpaid' }}</div>
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
                    <AppShowHide v-if="dt.details.length > 1" :title="'View More Products (' + (dt.details.length - 1) + ')'">
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
            <div class="display-flex row space-between">
                <div>
                    <!-- <button 
                        v-if="dt.order.status === 'delivered'" 
                        class="btn btn-main with-hover" 
                        style="margin-right: 15px;"
                        @click="changeStatusOrder(dt.order.order_id, 'received')">
                        Food Received
                    </button> -->
                    <button 
                        v-if="!dt.order.payment_status" 
                        class="btn btn-main with-hover" 
                        style="margin-right: 15px;"
                        @click="makeToast('You can conduct payment, after receiving or finishing this order..')">
                        Waiting for Payment
                    </button>
                </div>
                <div class="display-flex">
                    <button class="btn btn-main-reverse with-hover mobile-hidden" style="margin-right: 15px;">
                        View Transaction Detail
                    </button>
                    <!-- <button 
                        v-if="dt.order.status !== 'unconfirmed' && dt.order.status !== 'confirmed' && dt.order.status !== 'done' && dt.order.status !== 'canceled'" 
                        class="btn btn-main" 
                        style="margin-right: 15px;">
                        Track Order
                    </button> -->
                    <AppButtonMenu :onChange="(data) => onChangeMenu(data)" :data="[{label: 'Buy again'}, {label: 'Chat admin'}, {label: 'Help'}]" />
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppButtonMenu from './AppButtonMenu'
import AppDote from './AppDote'
import AppShowHide from './AppShowHide'
import AppImageProduct from './AppImageProduct'

export default {
    name: 'AppCardOrder',
    components: {
        AppButtonMenu,
        AppDote,
        AppShowHide,
        AppImageProduct
    },
    props: {
        data: {
            required: true 
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
        }
    }
}
</script>