<template>
    <div id="App" class="main-screen" style="padding-top: 20px;">
        <div class="card card-banner box-shadow border-radius" style="margin-top: 20px; margin-bottom: 40px;">
            <div class="display-flex display-mobile" style="padding-top: 15px; padding-bottom: 15px;">
                <div class="width width-70 width-mobile">
                    <div class="display-flex space-between display-mobile">
                        <div class="card-banner-padding card-banner-center width width-20 width-mobile">
                            <div class="image image-100px image-center border border-full" style="text-align: center; overflow: hidden;">
                                <i v-if="!user.image" class="post-top fa fa-lg fa-user-circle" style="font-size: 32px; color: #999;" />
                                <img v-else :src="user && user.image ? (adminImageThumbnailUrl + user.image) : ''" alt="">
                                <!-- <div class="status"></div> -->
                            </div>
                        </div>
                        <div class="card-banner-padding width width-75 width-mobile">
                            <div class="card-banner-center display-flex" style="margin-bottom: 10px;">
                                <div class="fonts fonts-12 semibold" style="margin-right: 13px;">{{ user && user.name }}</div>
                                <div class="card-verified" style="margin-right: 6px;">
                                    <i class="icn fa fa-lw fa-check"></i>
                                </div>
                                <div class="card-verified not">
                                    <i class="icn fa fa-lw fa-info"></i>
                                </div>
                            </div>
                            <div class="display-flex display-mobile" style="margin-bottom: 15px;">
                                <div class="card-banner-padding card-banner-center display-flex">
                                    <div class="card-capsule active" style="margin-right: 10px;">Open</div>
                                </div>
                                <div class="card-banner-center display-flex">
                                    <div class="btn btn-micro btn-white btn-no-hover" style="margin-right: 5px;">
                                        <i class="icn icn-left far fa-lg fa-clock"></i> 7:00 - 22:00 WIB
                                    </div>
                                    <div class="btn btn-micro btn-white btn-no-hover">
                                        <i class="icn icn-left fa fa-lg fa-map-marker-alt"></i> Jl. mana we lah
                                    </div>
                                </div>
                                <!-- <div class="fonts fonts-10 grey">Customer About</div> -->
                            </div>
                            <div class="display-flex space-between">
                                <button class="btn btn-sekunder" style="margin-right: 10px;">
                                    Restaurant Info
                                </button>
                                <div class="display-flex">
                                    <button class="btn btn-icon btn-sekunder" style="margin-right: 10px;">
                                        <i class="far fa-lg fa-comment-alt"></i>
                                    </button>
                                    <button class="btn btn-icon btn-sekunder">
                                        <i class="fa fa-lg fa-phone"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="width width-5"></div>
                    </div>
                </div>
                <div class="width width-30 width-mobile display-flex border border-left border-mobile-none">
                    <div style="width: calc(100% - 30px); padding: 10px 15px;">
                        <div class="display-flex space-between">
                            <div v-for="(dt, index) in infos" :key="index" style="width: 100%;">
                                <div class="display-flex column space-between" style="text-align: center; height: 85px;">
                                    <div class="fonts fonts-10 grey">{{ dt.title }}</div>
                                    <div class="fonts fonts-42 semibold" style="line-height: 0.5">{{ dt.qty }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        <!-- <div class="display-flex space-between display-mobile" style="margin-bottom: 40px;">
            <div style="width: 100%;">
                <div class="card border border-full" style="max-height: 200px; overflow-y: auto;">
                    <div class="fonts fonts-10 semibold" style="padding-bottom: 0px;">Notes</div>
                    <div v-for="(dt, index) in notes" :key="index" class="card-notes">
                        <div class="icon">
                            <i :class="dt.icon"></i>
                        </div>
                        <div class="desc">
                            <div class="fonts fonts-10 black">{{ dt.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%;"></div>
        </div> -->

        <div>
            <div class="display-flex space-between">
                <div class="display-flex">
                    <button class="btn btn-sekunder" style="margin-right: 10px;">
                        Category <i class="icn fa fa-lg fa-list"></i>
                    </button>
                    <button class="btn btn-sekunder">
                        Higher Price <i class="icn fa fa-lg fa-arrow-up"></i>
                    </button>
                </div>
                <div>
                    <button class="btn btn-sekunder">
                        Sort By <i class="icn fa fa-lg fa-sort"></i>
                    </button>
                </div>
            </div>
            <AppCardPostGrid :data="products" />
            <AppLoader v-if="visibleLoader" style="margin-top: 20px;" />
        </div>

        <div v-if="!visibleLoader" class="display-flex center">
            <button v-if="visibleLoadMore" class="btn btn-sekunder" style="margin-top: 20px;" @click="onMore">
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import AppWrapper from '../modules/AppWrapper'
import AppButton from '../modules/AppButton'
import AppText from '../modules/AppText'
import AppCardPostGrid from '../modules/AppCardPostGrid'
import AppCardGrid from '../modules/AppCardGrid'
import AppCardList from '../modules/AppCardList'
import AppLoader from '../modules/AppLoader'

const infos = [
    {title: 'Ordered Products', qty: '120'},
    {title: 'Visitors', qty: '34'},
    // {title: 'On Orders', qty: '12'}
]

const notes = [
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '},
    {icon: 'fa fa-lg fa-info-circle', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, dolore magna aliqua. '}
]

export default {
    name: 'App',
    data () {
        return {
            visibleLoader: false,
            limit: 9,
            offset: 0,
            visibleLoadMore: false,
            products: [],
            dataUser: null,
            dataOrder: null,
            selectedCustomer: null,
            notes: notes,
            infos: infos
        }
    },
    mounted () {
        this.selectedCustomer = this.$cookies.get('customer')
        this.dataOrder = this.$cookies.get('orderItem')
        this.dataUser = this.$cookies.get('admin')
        this.getProduct(this.limit, this.offset)

        console.log('dataUser', this.dataUser)
    },
    components: {
        AppLoader,
        AppCardPostGrid,
        AppCardList,
        AppCardGrid,
        AppWrapper,
        AppButton,
        AppText
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/admin',
            token: 'auth/token',
            order: 'order/count'
        })
    },
    methods: {
        async getProduct (limit, offset) {
            this.visibleLoader = true 

            let product = []

            if (offset > 0) {
                product = Object.assign([], this.products)
            } else {
                product = []
            }

            const payload = {
                limit: limit,
                offset: offset,
                user_id: this.dataUser.id
            }

            const rest = await axios.post('/api/public/product', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data
                data && data.map((dt) => {
                    return product.push({
                        ...dt,
                        id: dt.product.id,
                        product_id: dt.product.product_id,
                        image: dt.images[0] ? this.productImageThumbnailUrl + dt.images[0].image : '',
                        title: dt.product.name,
                        price: dt.details[0] ? dt.details[0].price : 0,
                        is_available: dt.product.is_available,
                        available: dt.product.is_available ? 'Available' : 'Unavailable',
                        category: dt.product.ctr_name,
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
        },
        onMore () {
            this.getProduct(this.limit, this.offset)
        }
    }
}
</script>

<style scoped>
.self-padding {
    padding-top: 50px;
    padding-bottom: 50px;
}
</style>
