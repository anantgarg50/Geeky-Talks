// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "babel-polyfill";
import App from "./App";
import RegisterDialog from "./components/RegisterDialog";
import LoginDialog from "./components/LoginDialog";

Vue.config.productionTip = false;

Vue.use(Vuetify);

Vue.component("register-dialog", RegisterDialog);
Vue.component("login-dialog", LoginDialog);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: {
    App
  },
  template: "<App/>"
});
