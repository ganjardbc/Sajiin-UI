<template>
    <div id="App">
        <button :class="'btn btn-main ' + (buttonFull ? 'btn-full' : '')" style="margin-left: 0; margin-right: 10px;" @click="onButtonCustomer">
            {{ title ? title : 'Scan Restaurant QR'}} <i :class="'icn ' + (icon ? icon : 'fa fa-lg fa-qrcode')" />
        </button>

        <AppPopupForm
            v-if="openCreateCustomer"
            :enableRadius="true"
            :title="'Scan This QR-Code'"
            :onClose="onButtonCustomer"
        >
            <div style="padding: 15px 0;">
                <div class="content-center" style="width: 300px; margin: auto; padding-bottom: 15px;">
                    <div class="image image-padding" style="background-color: #f5f5f5;">
                        <VueQrcode :value="validCode" />
                    </div>
                </div>
                <div class="content-center" style="padding-bottom: 30px;">
                    <div class="fonts fonts-11 black semibold">Scan this QR-code to make an order</div>
                    <div class="fonts fonts-11 grey">{{ validCode }}</div>
                </div>
                <router-link :to="{name: 'customer-main'}" class="btn btn-sekunder">
                    Navigate To Customer Dashboard (For Development)
                </router-link>
            </div>
        </AppPopupForm>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import AppPopupForm from './AppPopupForm'
import VueQrcode from 'vue-qrcode'

const customer = {
    id: '',
    customer_id: '',
    image: '',
    name: '',
    email: '',
    phone: '',
    about: '',
    status: ''
}

export default {
    name: 'App',
    data () {
        return {
            validCode: '',
            openCreateCustomer: false,
            selectedCustomer: {...customer},
        }
    },
    mounted () {
        const customerData = this.$cookies.get('customer')
        this.selectedCustomer = customerData ? customerData : customer
        this.validCode = this.code ? this.code : 'https://www.instagram.com/ganjar_hadiatna/'
    },
    components: {
        VueQrcode,
        AppPopupForm,
    },
    props: {
        buttonFull: {
            type: Boolean,
            required: false,
        },
        code: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        icon: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            customer: 'customer/data'
        })
    },
    methods: {
        ...mapActions({
            setCustomer: 'customer/setData',
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onButtonCustomer () {
            const user = this.$cookies.get('user')
            if (user) {
                this.openCreateCustomer = !this.openCreateCustomer
            } else {
                this.makeToast('Scan QR restaurant that you will visit.')
            }
        },
        onChangeCustomer (data) {
            this.selectedCustomer = data
            this.setCustomer(this.selectedCustomer)
            this.onChange(data)
        },
    },
    watch: {
        code (props) {
            if (props) {
                this.validCode = props
            }
        }
    }
}
</script>