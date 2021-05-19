<template>
    <div id="App" class="card-full-popup">
        <div class="post-middle-absolute">
            <div class="display-flex center" style="padding-bottom: 20px;">
                <i class="fa fa-2x fa-cog fa-spin" style="font-size: 48pt;" />
            </div>
            <div style="text-align: center;">
                <div class="fonts fonts-16 semibold black">
                    Entering Customer
                </div>
                <div class="fonts fonts-11 grey">
                    {{ visibleTitle }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            visibleTitle: 'connecting to server ..',
            token: ''
        }
    },
    mounted () {
        this.token = this.$route.params.token
        console.log('generateCustomertoken', this.token)
        this.getData()
    },
    methods: {
        ...mapActions({
            setCookieAuth: 'auth/setCookieCustomerAuth',
            getAdmin: 'auth/getAdmin'
        }),
        async getData () {
            this.visibleLoader = true
            this.visibleTitle = 'wait a minute ..'
            const response = await this.getAdmin(this.token)
            if (response) {
                const data = response.data.data
                const payload = {...data, token: this.token}
                this.visibleLoader = false
                this.visibleTitle = 'proceed success.'
                this.setCookieAuth(payload)
                this.$router.push({ name: 'customer-main' })

                console.log('getData', payload)
            } else {
                this.visibleLoader = false
                this.visibleTitle = 'there is an error, please try again.'
                alert('response', response)
            }
        }
    }
}
</script>