<template>
  <div class="about">
    <vue-headful title="Sobre nosotros" description="Página sobre nosotros" />

    <MenuLoggedAdmin :username="username" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <h1>
      Proyecto Match Coder creado por
      <a
        href="https://www.linkedin.com/in/susanafragasoporte/"
      >Susana Fraga Rego</a>
    </h1>

    <h2>
      Se han usado las siguientes librerías para hacer posible esta plataforma:
      <ul>
        <li>
          <a href="https://www.npmjs.com/package/axios">Axios</a>
        </li>
        <li>
          <a href="https://sweetalert2.github.io/">Sweet Alert</a>
        </li>

        <li>
          <a href="https://www.npmjs.com/package/vue-moment">Vue-Moment</a>
        </li>

        <li>
          <a href="https://www.npmjs.com/package/vue-headful">Vue-headful</a>
        </li>

        <li>
          <a href="https://expressjs.com/">Express</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/mysql2">Mysql2</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/morgan">Morgan</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a>
        </li>
        <li>
          <a href="https://github.com/lovell/sharp">Sharp</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/jwt-decode">Jwt-decode</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/jsonwebtoken">JsonWebToken</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/nodemon">Nodemon</a>
        </li>
      </ul>
    </h2>
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
import MenuLoggedAdmin from "../../components/menus/MenuLoggedAdmin.vue";
import FooterCustom from "@/components/FooterCustom.vue";

export default {
  name: "About",
  components: {
    MenuLoggedAdmin,
    FooterCustom
  },
  data() {
    return {
      username: ""
    };
  },
  methods: {
    /* FUNCIÓN QUE DESLOGUEA AL USUARIO */

    logoutUser() {
      return clearLogin(location.reload());
    }
  },
  /* MOUNTED */
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  }
};
</script>

<style scoped>
@font-face {
  font-family: "serif";
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
.about {
  font-family: "sansSerif";
  background-color: #dae1e7;
  color: #142850;
}
h1 {
  font-family: "serif";
}

ul > li {
  margin: 0 auto;
  width: 20%;
  padding: 1rem;
  list-style: none;
}
a {
  text-decoration: none;
  color: #142850;
}
</style>