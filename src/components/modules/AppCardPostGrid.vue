<template>
    <div :class="isMobileCard ? '' : 'display-flex wrap'" id="AppCardGrid">
        <div 
            v-for="(dt, index) in datas" 
            :key="index" 
            :class="(isMobileCard ? 'column-1' : 'column-3')"
            :style="'position: relative; padding: 0;'"
        >
            <div :class="isMobileCard ? '' : 'column-margin'">
                <div :class="'card no-padding ' + (isMobileCard && 'card-mobile ') + ' box-shadow'" :style="isMobileCard ? 'margin-top: 15px;' : 'margin-top: 30px;'">
                    <div class="left">
                        <router-link :to="{name: 'product', params: {id: dt.product_id}}">
                            <div class="cover">
                                <img :src="dt.image" alt="product" class="post-center" style="width: 100%;">
                            </div>
                        </router-link>
                    </div>
                    <div class="right">
                        <div style="position: relative; width: 100%; margin-bottom: 10px;">
                            <router-link :to="{name: 'product', params: {id: dt.product_id}}" class="fonts fonts-10 semibold black" style="margin-top: 0;">
                                {{ dt.title }}
                            </router-link>
                            <div class="fonts fonts-9 grey" style="margin-top: 3px;">{{ dt.category }}</div>
                            <div class="fonts fonts-10 semibold black" style="margin-top: 3px;">Rp {{ dt.price }}</div>
                        </div>
                        <div class="display-flex space-between">
                            <div class="display-flex">
                                <div :class="dt.is_available ? 'card-capsule active' : 'card-capsule'" style="margin-top: 4px; margin-right: 10px;">{{ dt.available }}</div>
                            </div>
                            <!-- <div>
                                <AppLikeButton :productID.sync="dt.id" />
                            </div> -->
                            <router-link :to="{name: 'product', params: {id: dt.product_id}}" class="btn btn-small btn-main-reverse" style="display: block; padding-top: 5px; padding-bottom: 5px; padding-right: 5px; padding-left: 5px;">
                                Detail <i class="icn fa fa-1x fa-arrow-right" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppWrapper from './AppWrapper'
import AppButton from './AppButton'
import AppText from './AppText'
import AppLikeButton from './AppLikeButton'

export default {
    name: 'AppCardGrid',
    data () {
        return {
            icon: '',
            datas: this.data
        }
    },
    components: {
        AppLikeButton,
        AppWrapper,
        AppButton,
        AppText
    },
    props: {
        isMobileCard: {
            type: Boolean,
            required: false
        },
        isListView: {
            type: Boolean,
            required: false
        },
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
        },
    },
    watch: {
        data: function (props, prevProps) {
            if (props) {
                this.datas = props
            } else {
                this.datas = []
            }
        }
    }
}
</script>