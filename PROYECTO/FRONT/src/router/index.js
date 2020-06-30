import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error from "../views/Error.vue";
import axios from "axios";
import Swal from "sweetalert2";

/* importamos funciones */

import { isLoggedIn } from "../api/utils";
import { checkAdminRole } from "../api/utils";
import { checkCompanyRole } from "../api/utils";
import { checkCoderRole } from "../api/utils";

Vue.use(VueRouter);

axios.defaults.headers.common["Authorization"] = localStorage.getItem(
  "authorization"
);

const routes = [
  /* #### ALL USERS #### */

  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      allowAnonymous: true,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowAnonymous === true && checkCoderRole()) {
        next({
          path: "/home-coder",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowAnonymous === true && checkCompanyRole()) {
        next({
          path: "/projects",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/home-coder",
    name: "HomeCoder",
    component: () => import("../views/coders/HomeCoder.vue"),
    meta: {
      allowAnonymous: false,
      allowNoCompany: true,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCompany === false && !checkCompanyRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/register-coder",
    name: "RegisterCoder",

    component: () => import("../views/coders/RegisterCoder.vue"),
    meta: {
      allowAnonymous: true,
    },
  },
  {
    path: "/register-company",
    name: "RegisterCompany",

    component: () => import("../views/companies/RegisterCompany.vue"),
    meta: {
      allowAnonymous: true,
    },
  },

  /* ### PÁGINA DE ERROR ### */

  /* SE ESPECIFICA CON * QUE CUALQUIER PÁGINA QUE NO SEA NINGUNA DE LAS INDICADAS, IRÁ A LA PÁGINA DE ERROR */
  {
    path: "*",
    name: "Error",
    component: Error,
  },

  /* #### CODERS #### */

  {
    path: "/candidatures-coder",
    name: "CandidaturesCoder",

    component: () => import("../views/coders/CandidaturesCoder.vue"),
    meta: {
      allowAnonymous: false,

      allowNoCoder: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCoder === false && !checkCoderRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  {
    path: "/view-coder-profile",
    name: "ProfileCoder",

    component: () => import("../views/coders/CoderProfile.vue"),
    meta: {
      allowAnonymous: false,
      allowNoCompany: true,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCompany === false && !checkCompanyRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  /* #### COMPANIES #### */

  {
    path: "/company-profile",
    name: "ProfileCompany",

    component: () => import("../views/companies/CompanyProfile.vue"),
    meta: {
      allowAnonymous: false,
      allowNoCompany: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCompany === false && !checkCompanyRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  {
    path: "/projects",
    name: "ProjectsCompany",

    component: () => import("../views/companies/SeeProjects.vue"),
    meta: {
      allowAnonymous: false,
      allowNoCompany: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCompany === false && !checkCompanyRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },

  {
    path: "/createprojects",
    name: "CreateProjects",

    component: () => import("../views/companies/CreateProject.vue"),
    meta: {
      allowAnonymous: false,
      allowNoCompany: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoCompany === false && !checkCompanyRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  /* #### ADMIN #### */

  {
    path: "/view-coders",
    name: "AdminViewCoders",
    component: () => import("../views/admin/AdminViewCoders.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdminRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/view-companies",
    name: "AdminViewCompanies",
    component: () => import("../views/admin/AdminViewCompanies.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdminRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/view-projects",
    name: "AdminViewProjects",
    component: () => import("../views/admin/AdminViewProjects.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdminRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/view-candidatures",
    name: "AdminViewCandidatures",
    component: () => import("../views/admin/AdminViewCandidatures.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdminRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/admin/About.vue"),
    meta: {
      allowAnonymous: false,
      allowNoAdmin: false,
    },
    beforeEnter: (to, from, next) => {
      if (to.meta.allowNoAdmin === false && !checkAdminRole()) {
        next({
          path: "/",
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
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
