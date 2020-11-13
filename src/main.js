import "core-js/stable";
import "regenerator-runtime/runtime";
// import "@babel/polyfill";

import Vue from "vue";
import VueRouter from 'vue-router';
import App from "./App.vue";


// element-ui
import {
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
    Upload,
    Dialog,
} from 'element-ui';
import VueQuillEditor from 'vue-quill-editor';

import router from 'router/index.js';

import "./index.scss";
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

// mock
import './mock/index.js';

Vue.use(VueRouter);

// element-ui
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
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(VueQuillEditor);

new Vue({
    render: h => h(App),
    router
}).$mount('#app');