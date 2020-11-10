import Login from 'pages/login/index.vue';
import Layout from 'components/Layout.vue';
import VueRouter from 'vue-router';

import Product from "pages/product/index.vue";
import ProductCategory from "pages/product/productCategory.vue";
import ProductSave from "pages/product/productSave.vue";
import ProductDetail from "pages/product/productDetail.vue";
import Order from "pages/order/index.vue";
import User from "pages/user/index.vue";
import Home from "pages/home/index.vue";
import PageError from "pages/error/index.vue";

const routes = [
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
                path: "/product-category",
                component: ProductCategory,
            },
            {
                path: "/product/save/:id",
                component: ProductSave,
            },
            {
                path: "/product/detail/:id",
                component: ProductDetail,
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
            // 404页面
            {
                path: "*",
                component: PageError,
            }
        ]
    },
];

const router = new VueRouter({
    mode : "history",
    routes,
});

export default router;