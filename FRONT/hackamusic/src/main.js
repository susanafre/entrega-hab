import Vue from "vue";
import App from "./App.vue";
import router from "./router";
/* IMPORTAMOS VUE-HEADFUL */
import vueHeadful from "vue-headful";

Vue.component("vue-headful", vueHeadful);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

/* 
1. Instalamos Vue-headful con el comando npm i vue-headful 
2. Lo importamos en esta página
*/
