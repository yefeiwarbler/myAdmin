import Vue from "vue";
// vue-router
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// element-ui
import {
    Row,
    Col,
    Link,
    Loading,
} from 'element-ui';

Vue.use(Row);
Vue.use(Col);
Vue.use(Link);
Vue.use(Loading);

// babel-polyfill
import "core-js/stable";
import "regenerator-runtime/runtime";

import App from "./App.vue";
// 路由
import router from 'router/index.js';
// 样式
import "./index.scss";
// mock
import './mock/index.js';

new Vue({
    render: h => h(App),
    router
}).$mount('#app');