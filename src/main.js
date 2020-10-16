import Vue from "vue";
import App from "./App.vue";
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
    Col
} from 'element-ui';
import Logo from './components/Logo.vue';

Vue.use(Logo);
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

new Vue({
    render: h => h(App),
}).$mount('#app');