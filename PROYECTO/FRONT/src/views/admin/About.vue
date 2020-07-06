<template>
  <div class="about">
    <vue-headful title="Sobre nosotros" description="Página sobre nosotros" />

    <MenuLoggedAdmin :username="username" v-on:cambiar="changeLocation" v-on:logout="logoutUser"></MenuLoggedAdmin>

    <div class="view">
      <h1>
        Proyecto Match Coder creado por
        <a
          href="https://www.linkedin.com/in/susanafragasoporte/"
        >Susana Fraga Rego</a>
      </h1>

      <img src="../../assets/emoji.jpg" alt="imagen" />

      <div class="aboutme">
        <div class="texto">
          <h1>¿Quién soy?</h1>Soy Administradora de sistemas informáticos y me considero una persona con afán por seguir formándome lo que me ha llevado a cursar un bootcamp de programación compaginándolo con el trabajo.
          <br />Siempre he tenido debilidad por la informática aunque también tengo estudios en idiomas.
        </div>

        <div class="texto">
          <h1>¿Por qué estoy aquí?</h1>Vine a Hack a Boss con la intención de aprender a programar.
          <br />Ahora me gustaría dedicarme al desarrollo y poder seguir aprendiendo e incorporar la programación a mi día a día.
        </div>

        <div class="columna3">
          <h1>¿Qué librerías he usado?</h1>
          <div class="columna4">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
import MenuLoggedAdmin from "../../components/menus/MenuLoggedAdmin.vue";
import FooterCustom from "@/components/FooterCustom.vue";

/* IMPORTAMOS FUNCIONES */
import { clearLogin } from "../../api/utils";

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
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  color: #142850;
}
.view {
  background-color: #27496d;
  color: #dae1e7;
  width: 1000px;
  padding: 1rem;
  margin: 1% auto;
  padding-top: 2rem;
  padding-bottom: 1rem;

  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
img {
  height: 200px;
  border-radius: 50%;
}
h1 {
  font-family: "serif";
}
ul {
  list-style: none;
  font-weight: normal;
}
.aboutme {
  display: grid;
  grid-template-columns: repeat(3, 33% 33% 33%);
  text-align: center;
}

li::before {
  /* Añadimos contenido antes de cada elemento de la lista */
  content: "\2A"; /* Insertamos el marcador */
  padding-right: 4px; /* Establecemos el espacio entre las viñetas y el list item */
  color: #00909e; /* Coloreamos la viñeta */
}
ul > li {
  margin: 0 auto;

  padding: 1rem;
}
a {
  text-decoration: none;
  color: #dae1e7;
}
.texto {
  width: 300px;
  margin: auto;
}
.columna1 {
  margin: 1.5rem;
}
.columna4 {
  columns: 2;
}
</style>