import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error from "../views/Error.vue";

Vue.use(VueRouter);
/* ESPECIFICAMOS LAS RUTAS DE LAS PÁGINAS */

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",

    component: () => import("../views/About.vue"),
  },
  /* SE ESPECIFICA CON * QUE CUALQUIER PÁGINA QUE NO SEA NINGUNA DE LAS INDICADAS, IRÁ A LA PÁGINA DE ERROR */
  {
    path: "*",
    name: "Error",
    component: Error,
  },
  {
    path: "/toptracks",
    name: "Toptracks",

    component: () => import("../views/TopTracks.vue"),
  },
  {
    path: "/topartists",
    name: "Topartists",

    component: () => import("../views/TopArtists.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

/* 1. Se especifican las rutas de las página 2. importamos la página de error a la que irán los errores */
