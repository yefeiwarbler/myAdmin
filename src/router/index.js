import Login from 'pages/Login.vue';
import Home from 'pages/Home.vue';
import VueRouter from 'vue-router';

const routes = [
    // 404
    {
        path: "*",
        component: Home
    },
    // 登录页面
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/",
        component: Home,
    },
];

const Router = new VueRouter({
    mode : "history",
    routes
});

export default Router;