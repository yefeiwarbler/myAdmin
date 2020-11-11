import "@babel/polyfill";

import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";

import "./index.css";

// element-ui
import {
    Container,
    Aside,
    Header,
    Main,
    Menu,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Row,
    Col,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    Button,
    Link,
    Breadcrumb,
    BreadcrumbItem,
    Table,
    TableColumn,
    Pagination,
    Loading,
    Tag,
} from 'element-ui';

import router from 'router/index.js';

// mock
import './mock/index.js';

Vue.use(VueRouter);

// element-ui
Vue.use(Container);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(MenuItemGroup);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Input);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Link);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Select);
Vue.use(Option);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');