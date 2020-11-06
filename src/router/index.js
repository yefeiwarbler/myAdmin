import Login from 'pages/login/index.vue';
import Layout from 'components/Layout.vue';
import VueRouter from 'vue-router';

import Product from "pages/product/index.vue";
import Order from "pages/order/index.vue";
import User from "pages/user/index.vue";
import Home from "pages/home/index.vue";

const routes = [
    // 404
    {
        path: "*",
        component: Layout
    },
    // 登录页面
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "/product",
                component: Product,
            },
            {
                path: "/order",
                component: Order,
            },
            {
                path: "/user",
                component: User,
            },
            {
                path: "/",
                component: Home,
            },
        ]
    },
];

const router = new VueRouter({
    mode : "history",
    routes,
});

export default router;