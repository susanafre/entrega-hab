<template>
  <div class="Home">
    <vue-headful title="Página principal coder" description="Página principal de la plataforma" />

    <!-- ########## MENÚ ########## -->

    <MenuLoggedCoder :username="username" v-on:logout="logoutUser"></MenuLoggedCoder>

    <!-- ########### FILTRAR PROYECTOS ########## -->

    <div class="explanation">
      <p>* Aquí puedes filtrar los proyectos por nombre, tecnologías, lenguaje o fecha de entrega. *</p>
    </div>

    <!-- CREAMOS UN INPUT PARA INTRODUCIR LOS PARÁMETROS DE BÚSQUEDA -->

    <div class="filter">
      <div class="filtersmall">
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
      <div class="modalBox">
        <p>
          <!--  <img
            :src="
              require(`../../../BACK/controllers/static/uploads/${companies.photo}`)
            "
          />-->
        </p>
        <p class="namecompany">{{ companies.name }}</p>
        <p>{{ companies.description }}</p>
        <p>
          <b>TELÉFONO:</b>
          {{ companies.phone_number }}
        </p>

        <!-- <p>FOTO: {{ photo }}</p> -->
        <p>
          <b>PROVINCIA:</b>
          {{ companies.province }}
        </p>
        <p>
          <b>WEB:</b>
          {{ companies.web }}
        </p>
        <button class="cerrarverempresa" @click="closeModalCompany()">CERRAR</button>
      </div>
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

import MenuLoggedCoder from "../../components/menus/MenuLoggedCoder.vue";

/* Componente de Footer */
import FooterCustom from "../../components/FooterCustom.vue";
/* Componente para los proyectos filtrados */
import FilterProjects from "../../components/FilterProjects.vue";

/* IMPORTAMOS FUNCIONES DE UTILS.JS */
import { clearLogin } from "../../api/utils";
import { loginCoders } from "../../api/utils";

import { isLoggedIn } from "../../api/utils";

export default {
  name: "HomeCoder",
  components: {
    FooterCustom,
    FilterProjects,

    MenuLoggedCoder
  },

  data() {
    return {
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
    this.filterProjects();
    this.checkLogin();
    this.checkCoderRole();
    this.checkCompanyRole();
    this.checkAdminRole();
  },
  methods: {
    /* #### FUNCIONES PRINCIPALES #### */

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
          if ((error = 404)) {
            Swal.fire({
              icon: "error",

              text: "Ya existe esta candidatura"
            });
          } else {
            console.log(error);
          }
        });
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
  src: url("../../assets/LibreBaskerville-Regular.ttf");
}
@font-face {
  font-family: "sansSerif";
  src: url("../../assets/Ubuntu-Regular.ttf");
}
.Home {
  background-color: #00909e;
  color: #dae1e7;
  font-family: "sans-serif";
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  opacity: 0.8;
}

/* FILTER */

.filter {
  border-top: 1px solid #dae1e7;
  background: #dae1e7;
  padding: 2rem;
  font-weight: bold;
  font-size: 1.5rem;

  color: #dae1e7;
}

/* INPUT FILTRAR PROYECTOS */

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

.namecompany {
  font-family: "serif";
  font-weight: bold;
  font-size: 40px;
  text-decoration: underline;
}

/* MODAL */

.modalcompany {
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
  margin: 13% auto;
  padding: 20px;

  width: 50%;
  background-size: 25%;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}

.modalBox > h1 {
  font-family: "serif";
  font-size: 2rem;

  opacity: 0.9;
}

.cerrarverempresa {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
.cerrarverempresa:hover {
  background-color: #00909e;
  color: #dae1e7;
}
</style>
