import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vueHeadful from "vue-headful";
Vue.use(require("vue-moment"));
import VueFilterDateFormat from "@vuejs-community/vue-filter-date-format";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faSpinner);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueFilterDateFormat, {
  dayOfWeekNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayOfWeekNamesShort: ["Su", "Mo", "Tu", "We", "Tr", "Fr", "Sa"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
});

Vue.config.productionTip = false;
Vue.component("vue-headful", vueHeadful);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
