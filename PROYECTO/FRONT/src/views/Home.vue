<template>
  <div class="Home">
    <vue-headful title="Página principal" description="Página principal de la plataforma" />

    <!-- ########## MENÚ ########## -->

    <!-- IMPORTAMOS EL MENÚ DONDE APARECERÁ EL LOGIN -->
    <!-- Al clickar en alguno de los botones, se abrirá un modal para loguearse -->

    <div class="background">
      <div v-show="usernotloged" class="usernotloged">
        <MenuPrincipal v-on:modalcoder="openModalLogCoder" v-on:modalcompany="openModalLogCompany"></MenuPrincipal>
      </div>

      <!-- SE CREA UN MENÚ PARA CUANDO UN USUARIO ESTÁ LOGUEADO Y ES CODER -->

      <div v-show="roleCoder" class="userloged">
        <MenuLoggedCoder :username="username" v-on:logout="logoutUser"></MenuLoggedCoder>
      </div>

      <!-- SE CREA UN MENÚ PARA CUANDO UN USUARIO ESTÁ LOGUEADO Y ES COMPANY -->

      <div v-show="roleCompany" class="userloged">
        <MenuLoggedCompany :username="username" v-on:logout="logoutUser"></MenuLoggedCompany>
      </div>

      <!-- SE CREA UN MENÚ PARA CUANDO UN USUARIO ESTÁ LOGUEADO Y ES ADMIN -->

      <div v-show="roleAdmin" class="userloged">
        <MenuLoggedAdmin
          :username="username"
          v-on:cambiar="changeLocation"
          v-on:logout="logoutUser"
        ></MenuLoggedAdmin>
      </div>

      <!-- ########### FILTRAR PROYECTOS ########## -->

      <!-- CREAMOS UN INPUT PARA INTRODUCIR LOS PARÁMETROS DE BÚSQUEDA -->

      <div class="filter">
        <div class="filtersmall">
          <p>
            <label for="bySearch">ENCUENTRA AQUÍ TU PROYECTO</label>
          </p>

          <input
            v-model="search"
            id="search"
            name="bySearch"
            type="search"
            placeholder="Nombre, tecnologías,lenguaje..."
          />

          <!-- AÑADIMOS DOS BOTONES -->
          <!-- Un botón será para que ejecute la búsqueda
          y otro para limpiar los resultado-->

          <button class="buttonfilter" @click="filterProjects()">Buscar</button>
          <button class="buttonclean" @click="clearSearch()">Limpiar búsqueda</button>
        </div>
      </div>
    </div>

    <!-- Exportamos el componente donde se filtran los proyectos -->

    <FilterProjects
      :projects="filteredChars"
      :companies="companies"
      :userloged="userloged"
      :roleCoder="roleCoder"
      v-on:mostrar="viewCompanyProfile"
      v-on:crear="createCandidature"
    ></FilterProjects>

    <!-- ########## VER EMPRESA DENTRO DE FILTRAR PROYECTOS ########### -->

    <!-- AQUÍ SE MUESTRA MÁS INFORMACIÓN SOBRE LAS EMPRESAS -->

    <div v-show="modalcompany" class="modalcompany">
      <div class="modalShowCompany">
        <!--  <p>
          <img :src="require(`../../../BACK/controllers/static/uploads/${companies.photo}`)" />
        </p>-->
        <p class="namecompany">{{ companies.name }}</p>
        <p>{{ companies.description }}</p>
        <p>TELÉFONO: {{ companies.phone_number }}</p>

        <!-- <p>FOTO: {{ photo }}</p> -->
        <p>PROVINCIA: {{ companies.province }}</p>
        <p>WEB: {{ companies.web }}</p>
        <button class="cerrarverempresa" @click="closeModalCompany()">CERRAR</button>
      </div>
    </div>

    <!-- ######### LOGIN CODER ############ -->

    <!-- MODAL PARA LOGIN CODER -->

    <div v-show="modal" class="modal">
      <div class="modalBox">
        <h1>Inicia sesión</h1>

        <div class="imagelogo">
          <img :src="require('@/assets/logo_solo.png')" alt="logo" />
        </div>
        <div class="inputlogin">
          <!-- INPUT PARA EMAIL Y CONTRASEÑA -->
          <label class="inputname" for="name">Correo electrónico</label>
          <p>
            <input type="text" name="email" placeholder="Introduce tu mail" v-model="email" />
          </p>
          <label for="password">Contraseña</label>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              v-model="password"
            />
          </p>

          <!-- BOTONES DE CERRAR EL MODAL Y DE HACER LOGIN -->

          <button class="login" @click="logCoder()">Acceder</button>
          <button class="closelogin" @click="closeModal()">Cerrar</button>

          <!-- SI NO ESTÁ REGISTRADO, LLEVA AL ÁREA DE REGISTRO -->

          <p>
            ¿No estás registrado? Haz click
            <router-link to="/register-coder">AQUÍ</router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- ########### LOGIN COMPANY ############# -->

    <!-- MODAL PARA LOGIN COMPANY -->

    <div v-show="modallogincompany" class="modallogincompany">
      <div class="modalBox">
        <h1>Inicia sesión</h1>

        <div class="imagelogo">
          <img :src="require('@/assets/logo_solo.png')" alt="logo" />
        </div>
        <div class="inputlogin">
          <label for="name">Correo electrónico</label>
          <p>
            <input type="text" name="email" placeholder="Introduce tu mail" v-model="email" />
          </p>

          <label for="password">Contraseña</label>
          <p>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              v-model="password"
            />
          </p>

          <!-- ESTO HACE LOGIN O CIERRA EL MODAL -->

          <button class="login" @click="logCompany()">Acceder</button>
          <button class="closelogin" @click="closeModalLogCompany()">Cerrar</button>

          <!-- SI NO ESTÁ REGISTRADO, LLEVA A LA VENTANA DE REGISTRO -->

          <p>
            ¿No estás registrado? Haz click
            <router-link to="/register-company">AQUÍ</router-link>
          </p>
        </div>
      </div>
    </div>

    <!-- AQUÍ APARECEN LAS OPCIONES EXPORTANDO EL COMPONENTE SHOWOPTIONS -->
    <div v-show="showOptions">
      <ShowOptions :options="options"></ShowOptions>
    </div>

    <!-- COMPONENTE PARA FOOTER -->

    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";
/* IMPORTAMOS COMPONENTES */
/* Componente de menú principal */
import MenuPrincipal from "../components/menus/MenuPrincipal.vue";
/* Componente que muestra un menú u otro según el usuario */
/* es coder, company o admin */
import MenuLoggedCoder from "../components/menus/MenuLoggedCoder.vue";
import MenuLoggedCompany from "../components/menus/MenuLoggedCompany.vue";
import MenuLoggedAdmin from "../components/menus/MenuLoggedAdmin.vue";
/* Componente de Footer */
import FooterCustom from "@/components/FooterCustom.vue";
/* Componente para los proyectos filtrados */
import FilterProjects from "@/components/FilterProjects.vue";
/* Componente para mostrar las opciones */
import ShowOptions from "@/components/ShowOptions.vue";

/* IMPORTAMOS FUNCIONES DE UTILS.JS */
import { clearLogin } from "../api/utils";
import { loginCoders } from "../api/utils";
import { loginCompanies } from "../api/utils";
import { getRole } from "../api/utils";
import { isLoggedIn } from "../api/utils";

export default {
  name: "Home",
  components: {
    FooterCustom,
    FilterProjects,
    MenuPrincipal,
    MenuLoggedCoder,
    MenuLoggedCompany,
    MenuLoggedAdmin,
    ShowOptions
  },

  data() {
    return {
      /* Array para la descripción de la web */
      options: [
        {
          titulo: "Si eres desarrollador...",
          cuerpo:
            "En FI.Coder trabajamos para que los desarrolladores puedan encontrar “el proyecto” con el que trabajar. Puedes filtrar los proyectos en la barra de búsqueda y presentar tu candidatura al que creas más afín a tus posibilidades.Esta plataforma ha ayudado a muchos desarrolladores a encontrar su proyecto perfecto y ha ayudado a muchas empresas.Sólo necesitas registrarte para poder presentar tu candidatura y ver el progreso de las mismas.¡Busca tu oportunidad!",
          icono: "icono5.png"
        },
        {
          titulo: "Para las empresas",
          cuerpo:
            "Si tienes un proyecto en mente pero necesitas ayuda para llevarlo a cabo, has llegado al lugar ideal. En FI.Coder podrás encontrar un desarrollador para tu proyecto. Sólo necesitas registrarte y publicar tu proyecto. Deberás indicar los requisitos de tu proyecto y en qué consiste, cuanta más información, más fácil será el proceso. Los desarrolladores que estén interesados presentarán su candidatura y podrás decidir a cual escoger. ",
          icono: "icono6.png"
        }
      ],
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fgrupohereda.com%2Fes%2Fgenealogia-sucesoria%2Ficono-lupa%2F&psig=AOvVaw3qSoSuOdq4syBkqGkoDWm-&ust=1593549797471000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJDv5Pzxp-oCFQAAAAAdAAAAABAD",
      /* Arrays para la lista de empresas y proyectos */
      companies: [],
      projects: [],
      project: [],
      /* Variable para filtrar proyectos */
      search: "",
      /* Variable que muestra el nombre del usuario */
      username: "",
      /* ID's */
      id: null,
      id1: "",
      id2: null,
      /* Variables donde se guardarán email y contraseña */
      email: "",
      password: "",
      /* Variables para los modales */
      modal: false,
      modallogincompany: false,
      modalcompany: false,
      showOptions: true,
      /* Variables para v-show  */
      userloged: false,
      usernotloged: true,

      /* Variables que checkean el rol del usuario */
      roleCoder: false,
      roleCompany: false,
      roleAdmin: false
    };
  },
  /* MOUNTED */
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  /* CREATED */
  created() {
    this.checkLogin();
    this.checkCoderRole();
    this.checkCompanyRole();
    this.checkAdminRole();
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */
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
    /* CREA CANDIDATURAS */
    /* CreateCandidature.js */
    createCandidature(data2) {
      if (localStorage.id) this.id1 = localStorage.id;
      this.id2 = data2;
      axios
        .post(
          "http://localhost:3000/users/" +
            this.id1 +
            "/candidatures/" +
            this.id2,
          {
            id1: this.id,
            id2: this.id2
          }
        )
        .then(async function(response) {
          await Swal.fire("Se ha creado la candidatura");
          location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    /* LOGIN PARA CODERS */
    /* LoginCoders.js */
    async logCoder() {
      try {
        //INTENTO HACER LOGIN
        await loginCoders(this.email, this.password);
        this.email = "";
        this.password = "";
        //location.reload();
        this.closeModal();

        location.reload();
        this.$router.push("/home-coder");

        //SI HAY LOGIN, QUE ME LLEVE AL HOME
      } catch (err) {
        alert(`Error: ${err}`);
      }
    },

    /* LOGIN PARA EMPRESAS */
    /* LoginCompanies.js */
    async logCompany() {
      try {
        //INTENTO HACER LOGIN
        await loginCompanies(this.email, this.password);
        this.email = "";
        this.password = "";
        location.reload();
        this.closeModalLogCompany();

        //SI HAY LOGIN, QUE ME LLEVE AL HOME
      } catch (err) {
        alert(`Error: ${err}`);
      }
    },

    /* VER MÁS INFORMACIÓN SOBRE UNA EMPRESA */
    /* searchCompanies.js */
    viewCompanyProfile(data) {
      this.id = data;

      axios
        .get("http://localhost:3000/companies/" + this.id, {
          id: this.id
        })

        //SI SALE BIEN
        .then(response => {
          this.openModalCompany();
          console.log(response.data);

          this.companies = response.data.data;
          console.log("Esto es this.companies", this.companies);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* BÚSQUEDA DE PROYECTOS */
    /* filterProjects.js */
    filterProjects() {
      axios
        .get("http://localhost:3000/projects/")
        //SI SALE BIEN
        .then(response => {
          console.log(response);
          this.showOptions = false;
          this.projects = response.data.data;
          console.log("Esto es projects", this.projects);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* #### FUNCIONES "AUXILIARES" #### */

    buttonProfileCompany() {
      this.$router.push("/company-profile");
    },

    /* FUNCIONES QUE CHECKEAN EL ROL DEL USUARIO */

    checkCoderRole() {
      if (localStorage.role === "coder") {
        this.roleCoder = true;
        console.log("Esto es roleCoder:", this.roleCoder);
      }
    },
    checkCompanyRole() {
      if (localStorage.role === "company") {
        this.roleCompany = true;
        console.log("Esto es roleCompany:", this.roleCompany);
      }
    },
    checkAdminRole() {
      if (localStorage.role === "admin") {
        this.roleAdmin = true;
        console.log("Esto es roleAdmin:", this.roleAdmin);
      }
    },

    /* FUNCION QUE CHECKEA SI EL USUARIO ESTÁ LOGUEADO */

    checkLogin() {
      if (isLoggedIn()) {
        this.userloged = true;
        this.usernotloged = false;
      }
      console.log(this.usernotloged);
      console.log(this.userloged);
    },

    /* FUNCIÓN QUE DESLOGUEA AL USUARIO */

    logoutUser() {
      return clearLogin(location.reload());
    },

    /* FUNCIÓN QUE LIMPIA EL CUADRO DE BÚSQUEDA */

    clearSearch() {
      this.project = [];
      this.showOptions = true;
      location.reload();
    },

    /* FUNCIONES QUE ABREN Y CIERRAN MODALES */

    closeModal() {
      this.email = "";
      this.password = "";

      this.modal = false;
    },
    openModalLogCoder() {
      this.modal = true;
    },
    closeModalCompany() {
      this.modalcompany = false;
    },
    openModalCompany() {
      this.modalcompany = true;
    },
    openModalLogCompany() {
      this.modallogincompany = true;
    },
    closeModalLogCompany() {
      this.email = "";
      this.password = "";

      this.modallogincompany = false;
    }
  },
  computed: {
    /* FUNCIÓN PARA FILTRAR LOS PROYECTOS */

    filteredChars() {
      //SI SEARCH ESTÁ VACÍO
      if (!this.search) {
        return this.projects;
      }
      //SI SEARCH TIENE ALGO
      console.log(this.search);

      return this.projects.filter(
        project =>
          project.project_name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          project.language.toLowerCase().includes(this.search.toLowerCase()) ||
          project.technology
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          project.delivery_date.includes(this.search)
      );
    }
  }
};
</script>

<style scoped>
/* ESTILOS */
@font-face {
  font-family: "serif";
  src: url("../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../assets/Ubuntu-Regular.ttf");
}
.Home {
  background-color: #dae1e7;
  color: #27496d;
  font-family: "sans-serif";
}

/* BOTONES */

button {
  color: #dae1e7;
  background-color: #27496d;
  font-weight: bold;
  height: 2rem;
  border: 0;
  margin-right: 1rem;
  box-shadow: 2px 2px #27496d;
}
button:hover {
  background: #dae1e7;
  color: #27496d;
}
.filter > button {
  background: #27496d;
  color: #dae1e7;
  font-weight: bold;
}
/* BOTONES FILTRAR PROYECTOS */

.buttonclean {
  color: #27496d;
  background-color: #dae1e7;
  font-weight: bold;
  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
}
.buttonclean:hover {
  background-color: #27496d;
  color: #dae1e7;
}
a {
  text-decoration: underline;
  color: #dae1e7;
  font-weight: bold;
}
/* LABEL */

label {
  font-weight: bold;
}

/* INPUT */

input {
  background: #dae1e7;

  border: 2px solid #27496d;
  box-shadow: 2px 2px #27496d;
  width: 400px;
  height: 2rem;
  text-align: center;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}

.background {
  background-image: url("https://www.sosmatic.es/wp-content/uploads/2019/08/ilya-pavlov-wbXdGS_D17U-unsplash.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
/* FILTER */

.filter {
  margin-top: 4rem;
  padding: 2rem;
  font-weight: bold;
  font-size: 1.5rem;

  height: 400px;
  color: #dae1e7;
}
.buttonfilter:hover {
  border-radius: 0;
}
.filtersmall {
  background-color: #dae1e7;
  opacity: 0.9;
  padding-top: 5px;
  padding-bottom: 1.5rem;
  width: 700px;

  margin: 0 auto;
  margin-top: 4rem;
}
.filtersmall > p > label {
  font-family: "serif";
  color: #27496d;
}
.namecompany {
  font-family: "serif";
  font-weight: bold;
  font-size: 40px;
  text-decoration: underline;
}

/* MODAL */

.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modalBox {
  background: #27496d;
  color: #dae1e7;
  margin: 10% auto;
  padding: 20px;

  width: 50%;
  height: 400px;
  background-size: 25%;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
  columns: 2;
}
.modalShowCompany {
  background: #27496d;
  color: #dae1e7;
  margin: 10% auto;
  padding: 20px;

  width: 50%;
  height: 50%;
  background-size: 25%;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.imagelogo {
  border-right: 1px solid #dae1e7;
}
.imagelogo > img {
  height: 300px;
}
.inputlogin {
  padding-top: 5rem;
}
.modalBox > h1 {
  font-family: "serif";
  font-size: 2rem;

  opacity: 0.9;
}
.login {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
.login:hover {
  background-color: #00909e;
  color: #dae1e7;
}
.closelogin {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 1rem;
}
.closelogin:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}
.logCompany {
  font-size: 1rem;
  box-shadow: 2px 2px #dae1e7;
}
.logCompany:hover {
  background-color: #dae1e7;
  color: #00909e;
}
.closelogCompany {
  background-color: #dae1e7;
  color: #00909e;
  font-size: 12px;
  box-shadow: 2px 2px #27496d;
}
.closelogCompany:hover {
  background: #27496d;
  color: #dae1e7;
}
.cerrarverempresa {
  background-color: #dae1e7;
  color: #27496d;

  border: 1px solid #27496d;
}
.cerrarverempresa:hover {
  background: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
.modalcompany {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.modallogincompany {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
</style>
