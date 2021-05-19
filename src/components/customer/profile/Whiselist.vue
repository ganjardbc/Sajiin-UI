<template>
    <div id="App">
        <div class="card border-full bg-white" style="overflow: unset;">
            <div class="display-flex row space-between" style="height: 40px; margin-bottom: 20px;">
                <div class="width width-35">
                    <SearchField :enableResponsive="true" :placeholder="'Search wishelists ..'" />
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
                </div>
            </div>
            <div style="width: 100%;">
                <AppLoader v-if="visibleLoader" style="margin-top: 40px;" />

                <div v-else>
                    <div v-if="products.length > 0">
                        <AppCardPostGrid :data.sync="products" :isListView="true" />
                    </div>
                    <div v-else>
                        <AppEmpty />
                    </div>
                </div>

                <div v-if="!visibleLoader" class="display-flex center">
                    <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 40px;" @click="onMore">
                        Load More
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import AppCardPostGrid from '../../modules/AppCardPostGrid'
import AppLoader from '../../modules/AppLoader'
import SearchField from '../../modules/SearchField'
import AppButtonMenu from '../../modules/AppButtonMenu'
import AppEmpty from '../../modules/AppEmpty'

export default {
    name: 'App',
    data() {
        return {
            limit: 10,
            offset: 0,
            visibleLoader: false,
            visibleLoadMore: false,
            products: [],
            dataUser: null,
            selectedCustomer: null 
        }
    },
    mounted() {
        const customerData = this.$cookies.get('customer')
        this.selectedCustomer = customerData ? customerData : customer
        this.dataUser = this.$cookies.get('user')
        this.getProduct(this.limit, this.offset)
    },
    components: {
        SearchField,
        AppEmpty,
        AppButtonMenu,
        AppLoader,
        AppCardPostGrid
    },
    methods: {
        onSingleMenu (data) {
            console.log('onSingleMenu', data)
        },
        onMore () {
            this.getProduct(this.limit, this.offset)
        },
        async getProduct (limit, offset) {
            this.visibleLoader = true 

            const token = 'Bearer '.concat(this.$cookies.get('token'))
            const payload = {
                limit: limit,
                offset: offset,
                owner_id: this.selectedCustomer.id
            }

            let product = []

            if (offset > 0) {
                product = Object.assign([], this.products)
            } else {
                product = []
            }

            const rest = await axios.post('/api/wishelist/getAll', payload, { headers: { Authorization: token } })

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    console.log('data', dt)
                    return product.push({
                        id: dt.product.prod_id,
                        product_id: dt.product.product_id,
                        image: dt.images[0] ? '/contents/products/thumbnails/' + dt.images[0].image : '',
                        title: dt.product.name,
                        price: dt.details[0] ? dt.details[0].price : 0,
                        is_available: dt.product.is_available,
                        available: dt.product.is_available ? 'Available' : 'Unavailable',
                        category: dt.product.description ? dt.product.description.substring(0, 50) + ' ...' : '',
                        description: dt.product.description
                    })
                })
                this.products = product
                this.visibleLoader = false 

                if (data.length > 0) {
                    this.offset += this.limit
                }

                if (data.length < this.limit) {
                    this.visibleLoadMore = false
                } else {
                    this.visibleLoadMore = true
                }
            } else {
                this.visibleLoader = false 
            }

            // console.log('getProduct', rest)
        }
    }
}
</script>