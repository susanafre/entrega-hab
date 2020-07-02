<template>
  <div class="about">
    <vue-headful title="Sobre nosotros" description="Página sobre nosotros" />

    <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>

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
    changeLocation(event) {
      console.log(event.target.value);
      if (event.target.value === "coders") {
        this.$router.push("/view-coders");
      } else if (event.target.value === "projects") {
        this.$router.push("/view-projects");
      } else if (event.target.value === "candidatures") {
        this.$router.push("/view-candidatures");
      } else if (event.target.value === "companies") {
        this.$router.push("/view-companies");
      } else if (event.target.value === "about") {
        this.$router.push("/about");
      }
    },
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
ul {
  list-style: none;
  font-weight: normal;

  column-count: 2;
}

li::before {
  /* Añadimos contenido antes de cada elemento de la lista */
  content: "\2A"; /* Insertamos el marcador */
  padding-right: 4px; /* Establecemos el espacio entre las viñetas y el list item */
  color: #00909e; /* Coloreamos la viñeta */
}
ul > li {
  margin: 0 auto;
  width: 20%;
  padding: 1rem;
}
a {
  text-decoration: none;
  color: #142850;
}
</style>