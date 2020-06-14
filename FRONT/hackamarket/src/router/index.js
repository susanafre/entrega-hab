/* IMPORTAMOS COMPONENTES, FUNCIONES Y PÁGINAS NECESARIAS */

import Vue from "vue";
import VueRouter from "vue-router";
import Productos from "../views/Productos.vue";
import { isLoggedIn } from "../api/utils";
import { checkAdmin } from "../api/utils";
import Error from "../views/Error.vue";

Vue.use(VueRouter);

const routes = [
  /* ### PRODUCTOS ###  */

  {
    path: "/productos",
    name: "Productos",
    component: Productos,
    meta: {
      //RUTA PRIVADA
      allowAnonymous: false,
    },
  },

  /* ### PÁGINA DE ERROR ### */

  /* SE ESPECIFICA CON * QUE CUALQUIER PÁGINA QUE NO SEA NINGUNA DE LAS INDICADAS, IRÁ A LA PÁGINA DE ERROR */
  {
    path: "*",
    name: "Error",
    component: Error,
  },

  /* ### CLIENTES ### */

  {
    path: "/clientes",
    name: "Clientes",
    component: () => import("../views/Clientes.vue"),
    meta: {
      //RUTA PRIVADA Y EXCLUSIVA DE ADMIN
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        next({
          path: "/clientes",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  /*  ### ADD CLIENTS ### */

  {
    path: "/add-clients",
    name: "AddClients",
    component: () => import("../views/AddClients.vue"),
    meta: {
      //RUTA PRIVADA Y EXCLUSIVA DE ADMIN
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdmin()) {
        next({
          path: "/clientes",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  /* ### REGISTER ### */

  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
    },
  },

  /*  ### LOGIN ### */

  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: {
      //RUTA PÚBLICA
      allowAnonymous: true,
    },
  },

  /* ### ABOUT ### */

  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      //RUTA PRIVADA
      allowAnonymous: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

// COMPROBANDO CADA PÁGINA POR SI LA PERSONA ESTÁ LOGUEADA

router.beforeEach((to, from, next) => {
  //Si la ruta es privada y la persona no tiene token
  if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: "/",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
