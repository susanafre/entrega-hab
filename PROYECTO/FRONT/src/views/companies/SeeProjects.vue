<template>
  <div class="projects">
    <vue-headful title="Ver proyectos" description="Página para ver proyectos" />

    <!-- IMPORTAMOS EL COMPONENTE MENÚ -->
    <MenuLoggedCompany :username="username" v-on:cambiar="changeState" v-on:logout="logoutUser"></MenuLoggedCompany>

    <!-- SE MUESTRAN LOS PROYECTOS DE LA EMPRESA -->

    <div class="explanation">
      <p>* Aquí puedes ver tus proyectos, las candidaturas de cada uno y gestionar el estado de las candidaturas. *</p>
    </div>

    <!-- COMPONENTE QUE MUESTRA LOS PROYECTOS -->

    <showProjects
      :projects="projects"
      :candidatures="candidatures"
      :vercandidaturas="vercandidaturas"
      v-on:opciones="selectOptions"
      v-on:mostrarPerfil="getProfileCoder"
      v-on:cerrarModal="closeModalCandidatures"
      v-on:cambiar="changeState"
      v-on:cerrarCandidaturas="closeCandidatures"
    ></showProjects>

    <!-- COMPONENTE QUE ELIMINA LAS CANDIDATURAS QUE DECIDA EL USUARIO -->

    <!-- MODAL QUE MUESTRA EL PERFIL DE LOS CODERS QUE HAN PRESENTADO SU CANDIDATURA A UN PROYECTO -->

    <div class="modal" v-show="modalProfileCoder">
      <div class="profile">
        <!--   <img :src="require(`../../../../BACK/controllers/static/uploads/${coders.photo}`)" /> -->

        <h1>{{ coders.name }} {{ coders.surname }}</h1>
        <td>
          <tr>
            <h2>Datos personales</h2>
          </tr>
          <tr>
            <p>
              <b>EMAIL:</b>
              {{ coders.email }}
            </p>
          </tr>
          <tr>
            <p>
              <b>TELÉFONO:</b>
              {{ coders.phone_number }}
            </p>
          </tr>
          <tr>
            <p>
              <b>PROVINCIA:</b>
              {{ coders.province }}
            </p>
          </tr>
        </td>

        <td>
          <tr>
            <h2 class="space">Datos técnicos</h2>
          </tr>
          <tr>
            <div class="architecture">
              Arquitectura:
              <div
                class="arch"
                :class="{frontend: coders.architecture === 'FrontEnd' | coders.architecture === 'Front End',backend:coders.architecture === 'BackEnd' | coders.architecture === 'Back End'}"
              >#{{ coders.architecture }}</div>
            </div>
          </tr>
          <tr>
            <div class="language">
              Lenguaje:
              <div
                class="lang"
                :class="{html:coders.language === 'HTML, CSS, Javascript',python:coders.language === 'Python',node:coders.language === 'Javascript node',php:coders.language === 'PHP',sql:coders.language === 'SQL'}"
              >#{{ coders.language }}</div>
            </div>
          </tr>
          <tr>
            <div class="technology">
              Tecnología:
              <div
                class="tech"
                :class="{react:coders.technology === 'React JS',angular:coders.technology === 'Angular',bootstrap:coders.technology === 'Bootstrap',redux:coders.technology === 'Redux',django:coders.technology === 'Django',vue:coders.technology === 'Vue js',node:coders.technology === 'Node js',laravel:coders.technology === 'Laravel',workbench:coders.technology === 'MySQL Workbench'}"
              >#{{ coders.technology }}</div>
            </div>
          </tr>
        </td>

        <p>
          <button class="closemodal" @click="closeModalProfileCoder()">Cerrar ventana</button>
        </p>
      </div>
    </div>

    <!-- MODAL PARA EDITAR LOS PROYECTOS -->

    <div class="modal" v-show="modal">
      <div class="modalBox">
        <h1>EDITA TU PROYECTO</h1>

        <p class="name">
          <label for="name">Nombre</label>
          <input v-model="newName" placeholder="Nombre" />
        </p>

        <p>
          <label class="description" for="description">Descripción:</label>
          <textarea
            name="description"
            cols="30"
            rows="10"
            v-model="newDescription"
            placeholder="Descripción"
          ></textarea>
        </p>

        <p>
          <label for="province">Provincia:</label>
          <input v-model="newProvince" placeholder="Provincia" />
        </p>

        <p>
          <label for="language">Lenguaje:</label>
          <input v-model="NewLanguage" placeholder="Lenguaje" />
        </p>

        <p>
          <label for="technology">Tecnología:</label>
          <input v-model="newTechnology" placeholder="Tecnología" />
        </p>

        <p>
          <label for="architecture">Arquitectura:</label>
          <input v-model="newArchitecture" placeholder="Arquitectura" />
        </p>

        <button @click="updateProject()">Actualizar</button>
        <button class="closemodal" @click="closeModal()">Cancelar</button>
      </div>
    </div>
    <FooterCustom></FooterCustom>
  </div>
</template>

<script>
/* IMPORTAMOS MÓDULOS */
import axios from "axios";
import Swal from "sweetalert2";

/* IMPORTAMOS COMPONENTES */
import showProjects from "@/components/showProjects.vue";
import MenuLoggedCompany from "../../components/menus/MenuLoggedCompany.vue";
import FooterCustom from "@/components/FooterCustom.vue";

import { clearLogin } from "../../api/utils";

export default {
  name: "SeeProjects",
  components: {
    showProjects,
    MenuLoggedCompany,
    FooterCustom
  },
  data() {
    return {
      /* Array de projects, candidatures y coders */

      projects: [],
      candidatures: [],
      coders: [],

      /* Variables para ID's */
      id1: "",
      id: null,
      id2: null,
      id3: null,
      /* Variable para username */
      username: "",
      /* Variables para cambiar los datos de los proyectos */
      name: "",
      newName: "",
      description: "",
      newDescription: "",
      delivery_date: "",
      newDelivery: "",
      province: "",
      newProvince: "",
      language: "",
      NewLanguage: "",
      technology: "",
      newTechnology: "",
      architecture: "",
      newArchitecture: "",
      /* Variable para crear proyectos */
      correctData: false,
      required: false,

      /* Variable para modal */
      modal: false,
      modalProject: false,
      modalCandidature: false,
      emptyProjects: false,
      modalcreateproject: false,
      modalProfileCoder: false,
      vercandidaturas: false
    };
  },
  methods: {
    /*  #### FUNCIONES PRINCIPALES #### */

    validatingData() {
      if (
        this.name === "" ||
        this.description === "" ||
        this.delivery_date === "" ||
        this.province === "" ||
        this.language === "" ||
        this.technology === "" ||
        this.architecture === ""
      ) {
        this.correctData = false; //NO ENVIAR
        this.required = true;
      } else {
        this.correctData = true; //SÍ ENVIAR
        this.required = false;
      }
    },

    /* Vaciar campos */

    emptyFields() {
      this.name = "";
      this.description = "";
      this.delivery_date = "";
      this.province = "";
      this.language = "";
      this.technology = "";
      this.architecture = "";
    },

    /* SELECT */
    selectOptions(event, data) {
      console.log(event.target.value);

      /* EDITAR PROYECTO */

      if (event.target.value === "editar") {
        /* Editar datos de un proyecto */

        this.openModal();
        this.newName = data.name;
        this.newDescription = data.description;

        this.newDelivery = data.delivery_date;
        this.newProvince = data.province;
        this.NewLanguage = data.language;
        this.newTechnology = data.technology;
        this.newArchitecture = data.architecture;
        this.id = data.PK_project;

        /* VER CANDIDATURAS */
      } else if (event.target.value === "candidaturas") {
        this.vercandidaturas = true;
        if (localStorage.id) this.id1 = localStorage.id;

        console.log("Esto es data", data.PK_project);
        this.id2 = data.PK_project;
        axios
          .get(
            "http://localhost:3000/companies/" +
              this.id2 +
              "/candidatures/" +
              this.id1,
            {
              id1: this.id1,
              id2: this.id2
            }
          )
          .then(response => {
            console.log(response.data);
            console.log(
              "este es el response de candidatures",
              response.data.data
            );
            this.candidatures = response.data.data;

            this.modalCandidature = true;
          })
          .catch(function(error) {
            Swal.fire({
              icon: "error",
              text: "No hay candidaturas para este proyecto"
            });
          });

        /* CERRAR PROCESO */
      } else if (event.target.value === "cerrar") {
        if (localStorage.id) this.id1 = localStorage.id;
        this.id2 = data.PK_project;
        axios
          .put(
            "http://localhost:3000/companies/" +
              this.id1 +
              "/candidatures/" +
              this.id2 +
              "/all",
            {
              id1: this.id1,
              id2: this.id2
            }
          )
          .then(async function(response) {
            await Swal.fire(
              "Se han cerrado todas las candidaturas de este proyecto"
            );
            location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });

        /* ELIMINAR PROYECTO */
      } else if (event.target.value === "eliminar") {
        console.log("Esto es data", data.PK_project);
        this.id = data.PK_project;
        axios
          .delete("http://localhost:3000/projects/" + this.id, {
            id: this.id
          })
          //SI SALE BIEN
          .then(async function(response) {
            await Swal.fire("Se ha borrado el proyecto");

            location.reload();
          })
          //SI SALE MAL
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    /* SELECT PARA CAMBIAR EL ESTADO DE LA CANDIDATURA */
    /* Indicar que estamos interesados en un coder */
    changeState(event, dataCand) {
      console.log(event.target.value);
      /* Cambiar candidatura a sigues en el proceso */
      if (event.target.value === "interested") {
        if (localStorage.id) this.id1 = localStorage.id;
        console.log("esto es id1", this.id1);
        console.log("esto es id2", this.id2);
        console.log("esto es id3", this.id3);
        console.log("Esto es dataCand", dataCand);
        this.id3 = dataCand.id_coder;
        axios
          .put(
            "http://localhost:3000/companies/" +
              this.id1 +
              "/candidatures/interested/" +
              this.id2 +
              "/" +
              this.id3,
            {
              id1: this.id1,
              id2: this.id2,
              id3: this.id3
            }
          )
          .then(async function(response) {
            await Swal.fire(
              "Se ha enviado un mail al desarrollador y se ha cambiado el estado de la candidatura"
            );
            location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
        /* Cambiar candidatura a no sigues en el proceso */
      } else if (event.target.value === "closed") {
        if (localStorage.id) this.id1 = localStorage.id;
        console.log("esto es id1", this.id1);
        console.log("esto es id2", this.id2);
        console.log("esto es id3", this.id3);
        console.log("Esto es dataCand", dataCand);
        this.id3 = dataCand.id_coder;
        axios
          .put(
            "http://localhost:3000/companies/" +
              this.id1 +
              "/candidatures/" +
              this.id2 +
              "/" +
              this.id3,
            {
              id1: this.id1,
              id2: this.id2,
              id3: this.id3
            }
          )
          .then(async function(response) {
            await Swal.fire("Se ha cerrado la candidatura a este proyecto");
            location.reload();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    /* Ver proyectos */

    viewProjects() {
      if (localStorage.id) this.id1 = localStorage.id;
      axios
        .get("http://localhost:3000/projects/companies/" + this.id1, {
          id1: this.id1
        })
        //SI SALE BIEN
        .then(response => {
          console.log(response.data);

          this.projects = response.data.data;
          console.log(this.projects);
          if (!this.projects) this.emptyProjects = true;
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },

    /* Editar datos de un proyecto */

    updateProject() {
      var self = this;
      axios
        .put("http://localhost:3000/projects/" + this.id, {
          name: this.newName,
          description: this.newDescription,
          delivery_date: this.newDelivery,
          province: this.newProvince,
          language: this.NewLanguage,
          technology: this.newTechnology,
          architecture: this.newArchitecture
        })
        //Si sale bien
        .then(async function(response) {
          await Swal.fire("Se ha modificado el proyecto");
          self.closeModal();
          location.reload();
        })
        //Si sale mal
        .catch(function(error) {
          console.log(error);
        });
    },

    getProfileCoder(dataCand) {
      this.id = dataCand.id_coder;
      axios
        .get("http://localhost:3000/coders/" + this.id)

        //SI SALE BIEN
        .then(response => {
          this.modalCandidature = false;
          this.modalProfileCoder = true;
          this.coders = response.data.data;
          console.log("Esto es coders", this.coders);
        })
        //SI SALE MAL
        .catch(function(error) {
          console.log(error);
        });
    },
    /* #### FUNCIONES "AUXILIARES" */

    /* Desloguearse */
    logoutUser() {
      return clearLogin(location.reload());
    },
    /* Ir al perfil de la empresa */
    buttonProfileCompany() {
      this.$router.push("/company-profile");
    },

    /* Ir a Home */

    buttonHome() {
      this.$router.push("/");
    },

    /* Funciones para abrir y cerrar modales */
    openModal() {
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },
    closeModalCandidatures() {
      this.modalCandidature = false;
    },
    openModalCreateProject() {
      this.modalcreateproject = true;
    },
    closeModalCreateProject() {
      this.emptyFields();
      this.modalcreateproject = false;
    },
    closeModalProfileCoder() {
      this.modalProfileCoder = false;
    },
    closeCandidatures() {
      this.vercandidaturas = false;
    }
  },
  mounted() {
    if (localStorage.name) this.username = localStorage.name;
  },
  created() {
    this.viewProjects();
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
.projects {
  font-family: "sansSerif";
  background-color: #00909e;
  color: #dae1e7;
  background: url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjEyMDd9");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 600px;
  width: 100%;
}
.explanation {
  background-color: #00909e;
  color: #dae1e7;
  padding: 1.5rem;
  opacity: 0.8;
}
h1 {
  font-family: "serif";
  padding: 1rem;

  color: #27496d;
}

label {
  font-weight: bold;
  margin: 0.5rem;
  color: #27496d;
}
input {
  text-align: center;
  color: #27496d;
}
::-webkit-input-placeholder {
  color: #27496d;
  text-align: center;
}
::placeholder {
  color: #27496d;
}
.profile td {
  display: inline-block;
  margin: 2rem;
}

/* BOTONES */

button {
  color: #27496d;
  background-color: #dae1e7;
  border: 1px solid #dae1e7;
  padding: 0.3rem;
  border-radius: 5px;
  margin: 1rem;
  font-weight: bold;
}
button:hover {
  background-color: #00909e;
  color: #dae1e7;
}

/* MODALES */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}

.modalBox {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 9.5% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
  box-shadow: 6px 6px 6px #142850;
  border-radius: 0.5rem;
}
.modalBox > h1 {
  color: #dae1e7;
}
.modalBox > p > label {
  color: #dae1e7;
}
.modalBox input {
  border-radius: 4px;
  border: 0;
  height: 30px;
  width: 300px;
}
.modalBox textarea {
  border-radius: 4px;
  border: 0;
}
.cancel {
  background-color: #dae1e7;
  color: #27496d;
}
.cancel:hover {
  background-color: #27496d;
  color: #dae1e7;
  border: 1px solid #dae1e7;
}
.name input {
  width: 300px;
  margin: auto;
}
.createproject {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
}
.create {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 6% auto;
  width: 900px;
  background-color: #dae1e7;
}

.profile {
  padding-top: 2rem;
  padding-bottom: 1rem;
  margin: 10% auto;
  width: 900px;
  background-color: #27496d;
  color: #dae1e7;
}
.profile h1 {
  color: #dae1e7;
}
.closemodal {
  color: #dae1e7;
  background-color: #27496d;
  border: 1px solid #dae1e7;
  border-radius: 5px;
  padding: 0.3rem;
  margin: 1rem;
}
.closemodal:hover {
  background-color: #dae1e7;
  color: #00909e;
  border: 1px solid #dae1e7;
}

.architecture {
  display: inline-flex;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.frontend {
  font-weight: bold;
  color: #142850;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.backend {
  font-weight: bold;
  color: #00909e;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}

.language {
  display: inline-flex;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.html {
  font-weight: bold;
  color: orange;
  background: #dae1e7;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.python {
  font-weight: bold;
  color: yellow;
  background: #4a7aa5;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.node {
  font-weight: bold;
  color: white;
  background: #5bcf51;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.php {
  font-weight: bold;
  color: white;
  background: #8f6cb6;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.sql {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.technology {
  display: inline-flex;
  font-weight: bold;
  margin-top: 0.8rem;
}
.react {
  font-weight: bold;
  color: #398eb0;
  background: black;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.angular {
  font-weight: bold;
  color: red;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.bootstrap {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.redux {
  font-weight: bold;
  color: #4126b2;
  background: white;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.django {
  font-weight: bold;
  color: white;
  background: #4126b2;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.vue {
  font-weight: bold;
  color: #59b686;
  background: #434e68;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.laravel {
  font-weight: bold;
  color: white;
  background: #e15518;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
.workbench {
  font-weight: bold;
  color: #e5a609;
  background: #398eb0;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  padding: 4px;
  border-radius: 20px;
}
</style>