import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

//Cookies
import VueCookies from "vue-cookies";

//Player Video - Vue-Plyr
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

//Firebase
import { initializeApp } from "firebase/app";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlLkmtg08rDiE024RuoNwuD8oSpyC9JRY",
  authDomain: "myleveling.firebaseapp.com",
  databaseURL: "https://myleveling-default-rtdb.firebaseio.com",
  projectId: "myleveling",
  storageBucket: "myleveling.appspot.com",
  messagingSenderId: "820639981359",
  appId: "1:820639981359:web:1aa37b82dd7051dce50bda"
};

//Initialize Firebase
initializeApp(firebaseConfig);

//Cookies configuration
Vue.use(VueCookies);
Vue.$cookies.config("1h");

//Vue-plyr - Player Video - Configuration
Vue.use(VuePlyr);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
