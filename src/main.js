window.Vue = require('vue');
 
import App from './components/App.vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import VueCookies from 'vue-cookies';
import Vuex from 'vuex';
import axios from 'axios';
import {routes} from './router';
import store from './store';
import SmartTable from 'vuejs-smart-table';
import jquery from 'jquery';
// import "./assets/sass/app.css";
// import "./assets/icons/fontawesome/css/all.min.css";
import Vue from 'vue';

const url = window.location.protocol+'//'+window.location.host;
// const api = "http://localhost:8000";
const api = "http://sajiin.kebunbegonialembang.com/";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = api;

window.$ = jquery;
 
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueCookies);
Vue.use(SmartTable);


Vue.$cookies.config('7d');
Vue.prototype.apiUrl = api
Vue.prototype.initUrl = url
Vue.prototype.adminImageThumbnailUrl = api + '/contents/users/thumbnails/'
Vue.prototype.adminImageCoverUrl = api + '/contents/users/covers/'
Vue.prototype.benefitImageThumbnailUrl = api + '/contents/benefits/thumbnails/'
Vue.prototype.benefitImageCoverUrl = api + '/contents/benefits/covers/'
Vue.prototype.productImageThumbnailUrl = api + '/contents/products/thumbnails/'
Vue.prototype.productImageCoverUrl = api + '/contents/products/covers/'
Vue.prototype.articleImageThumbnailUrl = api + '/contents/articles/thumbnails/'
Vue.prototype.articleImageCoverUrl = api + '/contents/articles/covers/'
Vue.prototype.categoryImageThumbnailUrl = api + '/contents/categories/thumbnails/'
Vue.prototype.categoryImageCoverUrl = api + '/contents/categories/covers/'
Vue.prototype.paymentImageThumbnailUrl = api + '/contents/payments/thumbnails/'
Vue.prototype.paymentImageCoverlUrl = api + '/contents/payments/covers/'
Vue.prototype.shipmentImageThumbnaiUrl = api + '/contents/shipments/thumbnails/'
Vue.prototype.shipmentImageCoverUrl = api + '/contents/shipments/covers/'
Vue.prototype.customerImageThumbnailUrl = api + '/contents/customers/thumbnails/'
Vue.prototype.customerImageCoverUrl = api + '/contents/customers/covers/'
Vue.prototype.tableImageThumbnailUrl = api + '/contents/tables/thumbnails/'
Vue.prototype.tableImageCoverUrl = api + '/contents/tables/covers/'
Vue.prototype.feedbackImageThumbnailUrl = api + '/contents/feedbacks/thumbnails/'
Vue.prototype.feedbackImageCoverUrl = api + '/contents/feedbacks/covers/'

const token = Vue.$cookies.get('token'); 
const router = new VueRouter({
    mode: 'history',
    routes: routes,
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
});
 
const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
});

store.dispatch('auth/me', token).then(() => {
    app
});