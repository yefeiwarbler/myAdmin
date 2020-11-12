import VueRouter from 'vue-router';

const Login = () => import(/* webpackChunkName: "page.login.index" */"pages/login/index.vue");
const Layout = () => import(/* webpackChunkName: "layout" */"components/Layout.vue");

const Product = () => import(/* webpackChunkName: "page.product" */"pages/product/index.vue");
const ProductCategory = () => import(/* webpackChunkName: "page.product" */"pages/product/productCategory.vue");
const ProductSave = () => import(/* webpackChunkName: "page.product" */"pages/product/productSave.vue");
const ProductDetail = () => import(/* webpackChunkName: "page.product" */"pages/product/productDetail.vue");

const Order = () => import(/* webpackChunkName: "page.order.index" */"pages/order/index.vue");
const User = () => import(/* webpackChunkName: "page.user.index" */"pages/user/index.vue");
const Home = () => import(/* webpackChunkName: "page.home.index" */"pages/home/index.vue");
const PageError = () => import(/* webpackChunkName: "page.error.index" */"pages/error/index.vue");

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
                path: "/product/save/",
                component: ProductSave,
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